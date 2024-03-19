import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    useRefillDeleteMutation,
    useDispensableDrugsLazyQuery,
    useUpdateMedicationMutation,
    useRefillUpdateMutation,
} from 'src/graphQL/serverMocks/graphQLGeneratedCode';

import { Formik, Form } from 'formik';
import { Stack, Image, Text, IDropdownOption, Dropdown, ResponsiveMode } from '@fluentui/react';
import { FormErrorBar, FormFieldGap } from 'src/common/components/Form';
import { PanelContainerWithHeader } from 'src/common/components/Panel/PanelContainerWithHeader';
import RouterConfig from 'src/app/RouterConfig';
import MedicationForm from './MedicationForm';

import { Prescription, UpdateMedicationVariables } from 'src/types/Medication';
import {
    validateMedicationsForm,
    setInitValues,
    getRefillUpdateVariables,
    handleMedicationSubmit,
} from 'src/helpers/medications';
import { getClassNames } from './MedicationAdd.classNames';
import defaultMedication from 'src/assets/MedicationPage/defaultMedication.jpg';
import { useIsMobile } from 'src/common/hooks/useMediaQueries';
import { ERROR_MESSAGES } from 'src/app/Strings';
import { useFeedbackService } from 'src/services/FeedbackService';
import { trackFieldChanged } from 'src/wcpConsentInit';
import { useGetTimezoneInfo } from 'src/common/hooks/useGetTimezoneInfo';

//Figma Link: https://www.figma.com/file/iKU0KE0nZ14MqB6oBFw99c/MEDMGR%2FMedication-List?node-id=278%3A213590
interface MedicationEditItemProps {
    onDismiss: () => void;
    prescription: Prescription;
}

const MedicationEdit: React.FC<MedicationEditItemProps> = ({ onDismiss, prescription }) => {
    const navigate = useNavigate();
    const classNames = getClassNames();
    const isMobile = useIsMobile();
    const feedbackService = useFeedbackService();

    const [updateMedication, { loading, error }] = useUpdateMedicationMutation({
        refetchQueries: [
            'GetPrescriptionsWithSchedule',
            'GetMedication',
            'GetProviders',
            'GetPharmacies',
            'GetCareRecipientConditions',
            'GetCareRecipientTimeline',
        ],
        onCompleted: () => {
            navigate(RouterConfig.Medication(prescription.id) + '?status=edited', { replace: true });
        },
    });

    const [RefillDelete] = useRefillDeleteMutation({
        refetchQueries: ['GetMedication', 'GetProviders', 'GetPharmacies', 'GetPrescriptionsWithSchedule'],
    });

    const [RefillUpdate] = useRefillUpdateMutation({
        refetchQueries: ['GetMedication', 'GetProviders', 'GetPharmacies', 'GetPrescriptionsWithSchedule'],
    });

    const [isStrengthAvailableForMedication, setIsStrengthAvailableForMedication] = useState(true);
    const [dispensableDrugId, setDispensableDrugId] = useState<string | undefined>();

    const [strengthDropDown, setStrengthDropDown] = useState<IDropdownOption[]>([]);

    const [getDrugInfo] = useDispensableDrugsLazyQuery({
        errorPolicy: 'all',
        onError: () => {
            feedbackService.setErrorToast(ERROR_MESSAGES.SEARCH_MEDICATION);
        },
    });

    // Only get strengths on launch.
    useEffect(() => {
        if (prescription) {
            const setStrength = async () => {
                const { data } = await getDrugInfo({
                    variables: { routedDoseFormDrugId: prescription.medication?.routedDoseFormDrugId },
                });

                const strengthInfo = data?.dispensableDrugs.result?.items;
                const strengthFormatted = strengthInfo
                    ?.filter((val) => val.medStrength !== null)
                    ?.map((val: any) => [
                        {
                            key: val.dispensableDrugID?.toString() + ',' + val.medStrength + val.medStrengthUnit,
                            text: val.medStrength + val.medStrengthUnit,
                        },
                    ])
                    .flat();

                setStrengthDropDown(strengthFormatted);
                if (prescription.medication?.dispensableDrugId) {
                    setDispensableDrugId(prescription.medication.dispensableDrugId);
                }
                // If the medication has no strength then allow saving without strength
                if (strengthFormatted.length === 0) {
                    setIsStrengthAvailableForMedication(false);
                } else {
                    setIsStrengthAvailableForMedication(true);
                }
            };
            void setStrength();
        } else if (prescription.strengthValue) {
            // Show strength if value is set but there isn't an rxNormId set.
            setStrengthDropDown([{ key: prescription.strengthValue, text: prescription.strengthValue }]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const { careRecipientTimezone } = useGetTimezoneInfo();

    const initialMedicationValues = setInitValues({ prescription, careRecipientTimezone });

    return (
        <Formik
            validate={(values) => validateMedicationsForm(values, isStrengthAvailableForMedication)}
            // setInitValues is a helper function specifically for meds
            initialValues={initialMedicationValues}
            onSubmit={async (values) => {
                let variables = handleMedicationSubmit({
                    values,
                    type: 'edit',
                    routedDoseFormDrugId: prescription.medication?.routedDoseFormDrugId,
                    dispensableDrugId,
                    strengthDropDown,
                    careRecipientTimezone,
                }) as UpdateMedicationVariables;

                const refillDateUpdated =
                    values.refillDate?.toString() !== prescription.refills?.[0]?.refillDate?.toString();
                const pharmacyUpdated = values.pharmacy?.id !== prescription.refills?.[0]?.pharmacy?.id;
                const refillUpdated =
                    values.refillChecked && prescription.refills?.[0]?.id && (refillDateUpdated || pharmacyUpdated);

                if (prescription.refills?.[0]?.id && !values.refillChecked) {
                    await RefillDelete({ variables: { id: prescription.refills?.[0]?.id } });
                }

                if (refillUpdated) {
                    const refillVariables = getRefillUpdateVariables(values);
                    await RefillUpdate({
                        variables: refillVariables,
                    });
                    variables.prescription.refill = { id: refillVariables.refill?.id };
                }

                await updateMedication({ variables });
            }}
        >
            {(formik) => (
                <Form>
                    <PanelContainerWithHeader
                        title={'Edit Medication'}
                        onClose={onDismiss}
                        {...{ formik }}
                        actionButtonText={'Save'}
                        loading={loading}
                        onClickActionButton={formik.handleSubmit}
                    >
                        <Stack horizontal={!isMobile} className={classNames['wc-MedicationAdd--contentSubContainer']}>
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
                                <Text className={classNames['wc-MedicationAdd--medicationNameText']}>
                                    {prescription.medication?.name}
                                </Text>
                                {strengthDropDown?.length > 0 && (
                                    <Dropdown
                                        data-testid="strength-dropdown"
                                        id="strength"
                                        label="Strength"
                                        selectedKey={formik.values.strength}
                                        onChange={(_, item) => {
                                            trackFieldChanged('strength-dropdown');
                                            formik.setFieldValue('strength', item.key);
                                            const dispensableDrug = item?.key?.toString().split(',')[0].trim();
                                            setDispensableDrugId(dispensableDrug);
                                        }}
                                        required
                                        placeholder="Select medication strength"
                                        options={strengthDropDown}
                                        responsiveMode={ResponsiveMode.large}
                                    />
                                )}
                                <MedicationForm
                                    formik={formik}
                                    setProvidersAvailable={() =>
                                        formik.setFieldValue('provider.providersAvailable', true)
                                    }
                                />
                            </Stack>
                            <FormErrorBar error={error?.message} />
                        </Stack>
                    </PanelContainerWithHeader>
                </Form>
            )}
        </Formik>
    );
};

export default MedicationEdit;
