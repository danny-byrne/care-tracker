import React from 'react';
import { useNavigate } from 'react-router';
import { ERROR_MESSAGES } from 'src/app/Strings';
import { trackFieldChanged } from 'src/wcpConsentInit';
import {
    useGetCareRecipientProfileQuery,
    useUpdateCareRecipientAddressMutation,
    useUpdateCareRecipientMeasurementsMutation,
    useUpdateCareRecipientProfileMutation,
    useUpdateCareRecipientMeasurementSystemMutation,
    MeasurementSystem,
    CareRecipient,
    useGetAvailableUserTimeZonesQuery,
    useUpdateCareRecipientTimezoneMutation,
} from 'src/graphQL/serverMocks/graphQLGeneratedCode';
import { useFeedbackService } from 'src/services/FeedbackService';
import { Formik, Form } from 'formik';
import { PanelContainerWithHeader } from 'src/common/components/Panel/PanelContainerWithHeader';
import {
    ChoiceGroup,
    DatePicker,
    DayOfWeek,
    Dropdown,
    Label,
    MessageBar,
    MessageBarType,
    ResponsiveMode,
    Stack,
    TextField,
    defaultDatePickerStrings,
} from '@fluentui/react';
import Accordion from 'src/common/components/Accordion/Accordion';
import { Header } from 'src/common/components';
import { getClassNames } from './CareRecipient.classNames';
import RouterConfig from 'src/app/RouterConfig';
import AddressSearch from 'src/common/components/AutoCompleteSearch/AddressSearch/AddressSearch';
import {
    setInitValues,
    onKeyDown,
    getErrorMessageEmail,
    bloodTypeDropDown,
    centimetersToInches,
    kilogramsToPounds,
    measurementSystemPreferenceChoiceGroupOptions,
    HeightWeightFields,
} from './CareRecipientUtils';
import PhotoUpload from 'src/common/components/PhotoUpload/PhotoUpload';
import { getDateAtMidday, getToday, timeZonesToDropdownOptions } from 'src/utils/dates';
import { formatPhoneNumber, getErrorMessagePhone, sanitizePhoneNumber } from 'src/utils/utils';
import {
    isValidFeet,
    isValidInches,
    isValidPhone,
    emailRegexValidCharacters,
    dateRegex,
    isValidEmail,
} from 'src/utils/validators';

interface ICareRecipientEditProps {
    onDismiss: () => void;
}

const CareRecipientEdit: React.FC<ICareRecipientEditProps> = ({ onDismiss }) => {
    const navigate = useNavigate();
    const feedbackService = useFeedbackService();
    const classNames = getClassNames();
    const [photoChanged, setPhotoChanged] = React.useState(false);

    const { data } = useGetCareRecipientProfileQuery({
        onError: () => {
            feedbackService.setErrorToast(ERROR_MESSAGES.GET_CARE_RECIPIENT);
        },
    });

    const { data: timezoneData } = useGetAvailableUserTimeZonesQuery({
        onError: () => {
            feedbackService.setErrorToast(ERROR_MESSAGES.GET_TIMEZONES);
        },
    });

    const [updateCareRecipientProfile, { loading }] = useUpdateCareRecipientProfileMutation({
        refetchQueries: ['GetCareRecipientProfile', 'GetCareRecipientTimeline'],
        errorPolicy: 'all',
        onError: () => {
            feedbackService.setErrorToast(ERROR_MESSAGES.EDIT_CARE_RECIPIENT);
        },
    });

    const [updateCareRecipientAddress, { loading: addressLoading }] = useUpdateCareRecipientAddressMutation({
        refetchQueries: ['GetCareRecipientProfile'],
        errorPolicy: 'all',
        onError: () => {
            feedbackService.setErrorToast(ERROR_MESSAGES.EDIT_CARE_RECIPIENT);
        },
    });

    const [updateCareRecipientMeasurements, { loading: measurementsLoading }] =
        useUpdateCareRecipientMeasurementsMutation({
            refetchQueries: ['GetCareRecipientProfile'],
            errorPolicy: 'all',
            onError: () => {
                feedbackService.setErrorToast(ERROR_MESSAGES.EDIT_CARE_RECIPIENT);
            },
        });

    const [UpdateCareRecipientMeasurementSystem, { loading: measurementSystemLoading }] =
        useUpdateCareRecipientMeasurementSystemMutation({
            refetchQueries: ['GetCareRecipientProfile'],
            errorPolicy: 'all',
            onError: () => {
                feedbackService.setErrorToast(ERROR_MESSAGES.EDIT_CARE_RECIPIENT);
            },
        });

    const [updateCareRecipientTimezone, { loading: timezoneLoading }] = useUpdateCareRecipientTimezoneMutation({
        refetchQueries: ['GetCareRecipientProfile'],
        errorPolicy: 'all',
        onError: () => {
            feedbackService.setErrorToast(ERROR_MESSAGES.CREATE_CARE_RECIPIENT);
        },
    });

    const currentDate = getToday();
    const minimumAgeBirthDate = getDateAtMidday(
        new Date(currentDate.getFullYear() - 13, currentDate.getMonth(), currentDate.getDate()),
    );

    //figure out where and what 'saveState' is
    const dataProfile: Partial<CareRecipient> = data?.careRecipientProfile;

    const timezoneDropdownOptions = timezoneData ? timeZonesToDropdownOptions(timezoneData) : undefined;
    const userTimezone = dataProfile.timeZoneID;
    const userTimezoneDropdownOption = userTimezone
        ? timezoneDropdownOptions?.find((tzo) => tzo.key === userTimezone)
        : undefined;

    return (
        <>
            <Formik
                validate={(values) => {
                    const errors: any = {};
                    if (!values.firstName) {
                        errors.firstName = 'Required';
                    }
                    if (values.phone && !isValidPhone(values.phone)) {
                        errors.phone = 'Please enter a valid phone number';
                    }
                    if (values.feet && !isValidFeet(values.feet)) {
                        errors.feet = 'Height in feet must be less than 9';
                    }
                    if (values.inches && !isValidInches(values.inches)) {
                        errors.inches = 'Height in inches must be less than or equal to 12';
                    }
                    if (values.dOB && new Date(values.dOB) > minimumAgeBirthDate) {
                        errors.dOB = 'Care recipient must be at least 13 years old';
                    }
                    if (values.email && !isValidEmail(values.email)) {
                        errors.email = 'Please enter a valid email address';
                    }
                    return errors;
                }}
                enableReinitialize
                initialValues={setInitValues(dataProfile, photoChanged, userTimezoneDropdownOption)}
                onSubmit={async (values) => {
                    const sanitizedPhone = values?.phone ? sanitizePhoneNumber(values.phone) : null;
                    const heightChanged =
                        (values?.feet &&
                            (values.feet !== dataProfile?.height?.feet ||
                                values.inches !== dataProfile?.height?.inches)) ||
                        (values?.centimeters && values.centimeters !== dataProfile?.height?.centimeters);
                    const weightChanged =
                        (values?.pounds && values.pounds !== dataProfile?.weight) ||
                        (values?.kilograms && values.kilograms !== dataProfile?.weight);

                    await updateCareRecipientProfile({
                        variables: {
                            firstName: values?.firstName,
                            lastName: values?.lastName ?? null,
                            email: values?.email ?? null,
                            phone: sanitizedPhone ?? null,
                            dOB: values?.dOB?.toISOString() ?? null,
                            bloodType: values?.bloodType ?? null,
                        },
                    });
                    await updateCareRecipientAddress({
                        variables: {
                            addressLine1: values.address?.addressLine1 ?? null,
                            city: values.address?.city ?? null,
                            country: values.address?.country ?? null,
                            state: values.address?.state ?? null,
                            zipCode: values.address?.zipCode ?? null,
                            freeTextAddress: values.address?.displayAddress ?? null,
                        },
                    });
                    await UpdateCareRecipientMeasurementSystem({
                        variables: {
                            measurementSystem: values?.measurementSystemPreference ?? null,
                        },
                    });
                    if (values?.measurementSystemPreference === MeasurementSystem.Imperial) {
                        await updateCareRecipientMeasurements({
                            variables: {
                                height: heightChanged
                                    ? Number(
                                          (
                                              (Number(values?.feet) * 12 + Number(values.inches)) *
                                              centimetersToInches
                                          ).toFixed(2),
                                      )
                                    : null,
                                weight: weightChanged
                                    ? Number((Number(values?.pounds) / kilogramsToPounds).toFixed(2))
                                    : null,
                            },
                        });
                    } else {
                        await updateCareRecipientMeasurements({
                            variables: {
                                height: heightChanged
                                    ? Number(Number(values?.centimeters) + Number(values.meters) * 100)
                                    : null,
                                weight: weightChanged ? Number(Number(values?.kilograms).toFixed(2)) : null,
                            },
                        });
                    }

                    if (values.timezone?.key !== userTimezone) {
                        await updateCareRecipientTimezone({ variables: { timezoneId: values.timezone.key as string } });
                    }

                    navigate(RouterConfig.RecipientProfile + '?status=updated', { replace: true });
                }}
            >
                {(formik) => (
                    <Form>
                        <PanelContainerWithHeader
                            title={'Edit Profile'}
                            onClose={onDismiss}
                            {...{ formik }}
                            actionButtonText={'Save'}
                            loading={
                                loading ||
                                addressLoading ||
                                measurementsLoading ||
                                measurementSystemLoading ||
                                timezoneLoading
                            }
                            onClickActionButton={formik.handleSubmit}
                        >
                            <Stack className={classNames['wc-CareRecipient--formContainer']} horizontalAlign="center">
                                <Stack
                                    className={classNames['wc-CareRecipient--contentSubContainer']}
                                    tokens={{ childrenGap: '16px' }}
                                >
                                    <PhotoUpload
                                        setPhotoChanged={setPhotoChanged}
                                        name="photoChanged"
                                        {...formik.getFieldProps('photoChanged')}
                                        formik={formik}
                                    />

                                    <TextField
                                        label="First Name"
                                        name="firstName"
                                        onKeyDown={(ev) => onKeyDown(ev, /^[0-9a-zA-Z\-.', \b]+$/)}
                                        required
                                        {...formik.getFieldProps('firstName')}
                                    />
                                    <TextField
                                        label="Last Name"
                                        onKeyDown={(ev) => onKeyDown(ev, /^[0-9a-zA-Z\-.', \b]+$/)}
                                        name="lastName"
                                        {...formik.getFieldProps('lastName')}
                                    />
                                    <TextField
                                        label="Phone"
                                        name="phone"
                                        placeholder="(xxx) xxx-xxxx"
                                        {...formik.getFieldProps('phone')}
                                        onChange={(e, value) => {
                                            const formattedPhoneNumber = formatPhoneNumber(value);
                                            formik.setFieldValue('phone', formattedPhoneNumber);
                                        }}
                                        onGetErrorMessage={getErrorMessagePhone}
                                        deferredValidationTime={1000}
                                    />
                                    <TextField
                                        label="Email"
                                        name="email"
                                        onKeyDown={(ev) => onKeyDown(ev, emailRegexValidCharacters)}
                                        {...formik.getFieldProps('email')}
                                        onGetErrorMessage={getErrorMessageEmail}
                                        deferredValidationTime={1000}
                                    />
                                    <Stack>
                                        <Label>Address</Label>
                                        <AddressSearch
                                            formik={formik}
                                            defaultTerm={formik.values.address.displayAddress}
                                            aria-label="Address Search"
                                        />
                                    </Stack>
                                    <Dropdown
                                        className={classNames['wc-GetStarted--timezoneField']}
                                        label="Time Zone"
                                        aria-label="Time Zone"
                                        selectedKey={formik.values.timezone?.['key']}
                                        placeholder="Select time zone"
                                        options={timezoneDropdownOptions}
                                        {...formik.getFieldProps('timezone')}
                                        onChange={(_, value) => {
                                            formik.setFieldValue('timezone', value);
                                        }}
                                        required
                                    />
                                </Stack>
                                <Stack
                                    className={classNames['wc-CareRecipient--contentSubContainer']}
                                    tokens={{ childrenGap: '16px' }}
                                >
                                    <Accordion header={<Header text="Additional Details" />}>
                                        <DatePicker
                                            id="dOB"
                                            className={classNames['wc-CareRecipient--birthDate']}
                                            label="Birthday"
                                            firstDayOfWeek={DayOfWeek.Sunday}
                                            placeholder="Enter mm/dd/yyyy"
                                            allowTextInput
                                            strings={defaultDatePickerStrings}
                                            onSelectDate={(date) => {
                                                trackFieldChanged('dOB');
                                                formik.setFieldValue('dOB', getDateAtMidday(date));
                                            }}
                                            {...formik.getFieldProps('dOB')}
                                            maxDate={minimumAgeBirthDate}
                                            textField={{
                                                onGetErrorMessage: (value) => {
                                                    if (dateRegex.test(value)) {
                                                        const date = new Date(value);
                                                        formik.setFieldValue('dOB', getDateAtMidday(date));
                                                        if (date > minimumAgeBirthDate) {
                                                            return 'Care Recipient must be at least 13 years old';
                                                        }
                                                    }
                                                    return undefined;
                                                },
                                            }}
                                            initialPickerDate={minimumAgeBirthDate}
                                        />
                                        {formik.errors.dOB && (
                                            <MessageBar messageBarType={MessageBarType.error}>
                                                {formik.errors.dOB}
                                            </MessageBar>
                                        )}
                                        <Dropdown
                                            id="bloodType"
                                            className={classNames['wc-CareRecipient--bloodType']}
                                            label="Blood Type"
                                            selectedKey={formik.values.bloodType}
                                            onChange={(_, item) => {
                                                trackFieldChanged('bloodType');
                                                formik.setFieldValue('bloodType', item.key);
                                            }}
                                            placeholder="Select one"
                                            options={bloodTypeDropDown}
                                            responsiveMode={ResponsiveMode.large}
                                        />
                                        <Stack>
                                            <ChoiceGroup
                                                label={'Measurement System'}
                                                options={measurementSystemPreferenceChoiceGroupOptions}
                                                selectedKey={formik.values?.measurementSystemPreference}
                                                onChange={(_, item) => {
                                                    trackFieldChanged('measurementSystemPreference');
                                                    formik.setFieldValue('measurementSystemPreference', item.key);
                                                    console.log(formik.values?.measurementSystemPreference);
                                                    formik.setFieldValue('feet', '');
                                                    formik.setFieldValue('inches', '');
                                                    formik.setFieldValue('pounds', '');
                                                    formik.setFieldValue('meters', '');
                                                    formik.setFieldValue('centimeters', '');
                                                    formik.setFieldValue('kilograms', '');
                                                }}
                                                required={
                                                    formik.values?.pounds !== '' ||
                                                    formik.values?.kilograms !== '' ||
                                                    formik.values?.feet !== '' ||
                                                    formik.values?.meters !== ''
                                                }
                                            />
                                            <HeightWeightFields {...formik} />
                                        </Stack>
                                    </Accordion>
                                </Stack>
                            </Stack>
                        </PanelContainerWithHeader>
                    </Form>
                )}
            </Formik>
        </>
    );
};

export default CareRecipientEdit;
