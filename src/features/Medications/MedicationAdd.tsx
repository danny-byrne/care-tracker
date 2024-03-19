import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Stack, Dropdown, IDropdownOption, Label, Image, ResponsiveMode } from '@fluentui/react';
import { Formik, Form } from 'formik';
import { FormErrorBar, FormErrorMessage, FormFieldGap } from 'src/common/components/Form';
import { PanelContainerWithHeader } from 'src/common/components/Panel/PanelContainerWithHeader';

import RouterConfig from 'src/app/RouterConfig';
import { getClassNames } from './MedicationAdd.classNames';
import {
    useAddMedicationMutation,
    useMedicationSearchLazyQuery,
    useDispensableDrugsLazyQuery,
} from 'src/graphQL/serverMocks/graphQLGeneratedCode';

import { MedicationCreateVariables } from 'src/types/Medication';

import MedicationSearch from './MedicationSearch';
import { ISuggestionItem } from 'src/common/components/AutoCompleteSearch';

import {
    validateMedicationsForm,
    handleMedicationSubmit,
    createStrengthDropdownOptionKey,
} from 'src/helpers/medications';
import MedicationForm from './MedicationForm';
import defaultMedication from 'src/assets/MedicationPage/defaultMedication.jpg';
import { useFeedbackService } from 'src/services/FeedbackService';
import { ERROR_MESSAGES } from 'src/app/Strings';
import { trackFieldChanged } from 'src/wcpConsentInit';
import { useIsMobile } from 'src/common/hooks/useMediaQueries';
import { useQueryStringParams } from 'src/common/hooks/useQueryStringParams';
import { getInitialMedicationValues } from './constants';
import { inputErrorStyles } from 'src/features/Medications/constants';
import { useGetTimezoneInfo } from 'src/common/hooks/useGetTimezoneInfo';

//Figma Link: https://www.figma.com/file/iKU0KE0nZ14MqB6oBFw99c/MEDMGR%2FMedication-List?node-id=278%3A213590
interface IMedicationAddProps {
    onDismiss: () => void;
}

const MedicationAdd: React.FC<IMedicationAddProps> = ({ onDismiss }) => {
    const navigate = useNavigate();
    const feedbackService = useFeedbackService();
    const { getSearchParam } = useQueryStringParams();
    const id = getSearchParam('id');
    const drugName = getSearchParam('drugName');

    const isMobile = useIsMobile();
    const classNames = getClassNames();

    const [addMedication, { loading, error }] = useAddMedicationMutation({
        refetchQueries: [
            'GetMedication',
            'GetProviders',
            'GetPharmacies',
            'GetPrescriptionsWithSchedule',
            'GetCareRecipientConditions',
            'GetCareRecipientTimeline',
        ],
        errorPolicy: 'all',
        onCompleted: () => {
            navigate(RouterConfig.Medications + '?status=added', { replace: true });
        },
    });

    const [MedicationSearchQuery, { loading: searchLoading }] = useMedicationSearchLazyQuery({
        errorPolicy: 'all',
        onError: () => {
            feedbackService.setErrorToast(ERROR_MESSAGES.SEARCH_MEDICATION);
        },
    });
    const [dataResult, setDataResult] = useState<any>();

    const onDebounceComplete = async (searchTermDebounce: string) => {
        if (searchTermDebounce.length > 0) {
            try {
                const result = await MedicationSearchQuery({ variables: { searchText: searchTermDebounce } });
                setDataResult(result?.data.medicationSearch.result?.items);
                setStrengthDropDown([]);
            } catch (error) {
                setDataResult(null);
                setStrengthDropDown([]);
            }
        }
        if (searchTermDebounce.length === 0) {
            setDataResult(null);
            setStrengthDropDown([]);
        }
    };

    const [strengthDropDown, setStrengthDropDown] = useState<IDropdownOption[]>([]);

    const [isStrengthAvailableForMedication, setIsStrengthAvailableForMedication] = useState(true);

    const [getDrugInfo] = useDispensableDrugsLazyQuery({
        errorPolicy: 'all',
        onError: () => {
            feedbackService.setErrorToast(ERROR_MESSAGES.SEARCH_MEDICATION);
        },
    });

    const handleGetDrugInfoStrengthDropdownOptions = (res) => {
        const strengthInfo = res?.data?.dispensableDrugs.result?.items;

        //adding dispensableDrugId to the key in order to use when selecting strength
        const strengthFormatted = strengthInfo
            ?.filter((val) => val.medStrength !== null)
            ?.map((val: any) => [
                {
                    key: createStrengthDropdownOptionKey(val),
                    text: val.medStrength + val.medStrengthUnit,
                },
            ])
            .flat();

        // If the medication has no strength then allow saving without strength
        if (strengthFormatted.length === 0) {
            setIsStrengthAvailableForMedication(false);
        } else {
            setIsStrengthAvailableForMedication(true);
        }
        setStrengthDropDown(strengthFormatted);
    };

    // WIP for pulling in med data from FTUE
    useEffect(() => {
        const getDrugInfoWrapper = async () => {
            if (id) {
                const res = await getDrugInfo({ variables: { routedDoseFormDrugId: id } });
                handleGetDrugInfoStrengthDropdownOptions(res);
                setRoutedDoseFormDrugId(id);
            }
        };

        getDrugInfoWrapper();
    }, []);

    const [routedDoseFormDrugId, setRoutedDoseFormDrugId] = useState<string | undefined>();
    const [dispensableDrugId, setDispensableDrugId] = useState<string | undefined>();
    const onSuggestionClicked = async (suggestion: ISuggestionItem) => {
        const clickId = suggestion.getSearchId().toString();

        const res = await getDrugInfo({ variables: { routedDoseFormDrugId: clickId } });
        handleGetDrugInfoStrengthDropdownOptions(res);
        setRoutedDoseFormDrugId(clickId);
    };

    const { careRecipientTimezone } = useGetTimezoneInfo();

    const initialMedicationValues = getInitialMedicationValues();

    return (
        <>
            <Formik
                validate={(values) => validateMedicationsForm(values, isStrengthAvailableForMedication)}
                initialValues={initialMedicationValues}
                onSubmit={async (values) => {
                    let variables = handleMedicationSubmit({
                        values,
                        type: 'add',
                        routedDoseFormDrugId,
                        dispensableDrugId,
                        strengthDropDown,
                        careRecipientTimezone,
                    }) as MedicationCreateVariables;

                    await addMedication({ variables });
                }}
            >
                {(formik) => {
                    const strengthDropdownHasError = formik.touched.strength && formik.errors?.strength;
                    const nameHasError = formik.touched.name && formik.errors?.name;
                    return (
                        <Form>
                            <PanelContainerWithHeader
                                title={'Add Medication'}
                                onClose={onDismiss}
                                {...{ formik }}
                                actionButtonText={'Save'}
                                loading={loading}
                                onClickActionButton={formik.handleSubmit}
                            >
                                <Stack
                                    horizontal={!isMobile}
                                    className={classNames['wc-MedicationAdd--contentSubContainer']}
                                >
                                    <div className={classNames['wc-MedicationAdd--medicationImage']}>
                                        {/* Image will be updated once backend allows users to include images */}
                                        <Image
                                            aria-label="Default medication image: purple and pink pill"
                                            src={defaultMedication}
                                        />
                                    </div>
                                    <Stack
                                        className={classNames['wc-MedicationAdd--formContainer']}
                                        tokens={{ childrenGap: FormFieldGap }}
                                    >
                                        <div>
                                            <Label required>Name</Label>
                                            <MedicationSearch
                                                data={dataResult}
                                                updateSearchTerm={onDebounceComplete}
                                                onSuggestionClicked={onSuggestionClicked}
                                                formik={formik}
                                                searchLoading={searchLoading}
                                                // Used for setting drug name if navigated to from first time experience
                                                defaultTerm={drugName}
                                                aria-label="Medication search"
                                                hasError={Boolean(nameHasError)}
                                            />
                                            <FormErrorMessage error={nameHasError} />
                                        </div>

                                        {strengthDropDown?.length > 0 && (
                                            <>
                                                <Dropdown
                                                    data-testid="strength-dropdown"
                                                    id="strength"
                                                    label="Strength"
                                                    selectedKey={formik.values.strength}
                                                    onChange={(_, item) => {
                                                        trackFieldChanged('strength-dropdown');
                                                        formik.setFieldValue('strength', item.key);
                                                        // removing stength from the DispensableDrugId
                                                        setDispensableDrugId(
                                                            item?.key?.toString().split(',')[0].trim(),
                                                        );
                                                    }}
                                                    required
                                                    placeholder="Select medication strength"
                                                    options={strengthDropDown}
                                                    responsiveMode={ResponsiveMode.large}
                                                    onBlur={() =>
                                                        formik.setTouched({ ...formik.touched, strength: true })
                                                    }
                                                    errorMessage={strengthDropdownHasError}
                                                    styles={strengthDropdownHasError ? inputErrorStyles.dropdown : null}
                                                />
                                            </>
                                        )}
                                        <MedicationForm
                                            formik={formik}
                                            setProvidersAvailable={() =>
                                                formik.setFieldValue('provider.providersAvailable', true)
                                            }
                                        />
                                    </Stack>
                                </Stack>
                                <FormErrorBar error={error?.message} />
                            </PanelContainerWithHeader>
                        </Form>
                    );
                }}
            </Formik>
        </>
    );
};

export default MedicationAdd;
