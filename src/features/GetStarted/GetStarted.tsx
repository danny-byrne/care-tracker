import { useEffect, useRef } from 'react';
import { useFeedbackService } from 'src/services/FeedbackService';
import { useNavigate } from 'react-router-dom';
import {
    useCreateCareRecipientProfileMutation,
    useGetAvailableUserTimeZonesQuery,
    useGetCareRecipientProfileBasicQuery,
    useUpdateCareRecipientTimezoneMutation,
} from 'src/graphQL/serverMocks/graphQLGeneratedCode';

import { Stack, TextField, PrimaryButton, Text, Dropdown } from '@fluentui/react';
import { Formik, Form } from 'formik';

import { onKeyDown } from '../CareRecipient/CareRecipientUtils';
import { getClassNames } from './GetStarted.className';

import RouterConfig from 'src/app/RouterConfig';
import { ERROR_MESSAGES, LOCAL_STORAGE_KEYS } from 'src/app/Strings';
import { timeZonesToDropdownOptions } from 'src/utils/dates';
import { firstNameRegex } from 'src/utils/validators';

const GetStarted = () => {
    const { setErrorToast } = useFeedbackService();
    const classNames = getClassNames();
    const navigate = useNavigate();
    const formikRef = useRef(null);

    const [createCareRecipientProfile, { loading: loadingProfile }] = useCreateCareRecipientProfileMutation({
        errorPolicy: 'all',
        refetchQueries: ['GetCareRecipientProfile'],
        onError: () => {
            setErrorToast(ERROR_MESSAGES.CREATE_CARE_RECIPIENT);
        },
    });
    const { data: careRecipientProfileData } = useGetCareRecipientProfileBasicQuery();

    const [updateCareRecipientTimezone, { loading: loadingTimezone }] = useUpdateCareRecipientTimezoneMutation({
        refetchQueries: ['GetCareRecipientProfile'],
        onError: () => {
            setErrorToast(ERROR_MESSAGES.CREATE_CARE_RECIPIENT);
        },
    });

    const loading = loadingProfile || loadingTimezone;

    const { data: timezoneData } = useGetAvailableUserTimeZonesQuery({
        onError: () => {
            setErrorToast(ERROR_MESSAGES.GET_TIMEZONES);
        },
    });

    useEffect(() => {
        if (
            formikRef.current?.values.firstName.length == 0 &&
            careRecipientProfileData?.careRecipientProfile?.firstName.length > 0
        ) {
            formikRef.current?.setFieldValue('firstName', careRecipientProfileData?.careRecipientProfile?.firstName);
        }
    }, [careRecipientProfileData]);

    useEffect(() => {
        if (formikRef.current?.values.timezone == undefined && timezoneData) {
            const timezoneDropdownOptions = timeZonesToDropdownOptions(timezoneData);
            const browserTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
            const browserTimezoneDropdownOption = timezoneDropdownOptions.find((tzo) => tzo.key === browserTimezone);
            formikRef.current?.setFieldValue('timezone', browserTimezoneDropdownOption);
        }
    }, [timezoneData]);

    // Set local storage and navigate away if somebody else has already set the recipient name
    useEffect(() => {
        if (careRecipientProfileData?.careRecipientProfile?.firstName) {
            localStorage.setItem(LOCAL_STORAGE_KEYS.RECIPIENT_NAME_GIVEN, 'true');
            navigate(RouterConfig.Goals, { replace: true });
        }
    }, [careRecipientProfileData, navigate]);

    const timezoneDropdownOptions = timezoneData ? timeZonesToDropdownOptions(timezoneData) : undefined;

    return (
        <>
            <Formik
                innerRef={formikRef}
                validate={(values) => {
                    const errors: any = {};
                    if (!values.firstName) {
                        errors.firstName = 'Required';
                    }
                    if (!values.timezone) {
                        errors.timezone = 'Required';
                    }
                    return errors;
                }}
                initialValues={{
                    firstName: '',
                    timezone: undefined,
                }}
                onSubmit={async (values) => {
                    await createCareRecipientProfile({ variables: { firstName: values.firstName } });
                    await updateCareRecipientTimezone({ variables: { timezoneId: values.timezone.key as string } });
                    localStorage.setItem(LOCAL_STORAGE_KEYS.RECIPIENT_NAME_GIVEN, 'true');
                    navigate(RouterConfig.Goals, { replace: true });
                }}
            >
                {(formik) => (
                    <Form className={classNames['wc-GetStarted--form']}>
                        <Stack className={classNames['wc-GetStarted--container']} tokens={{ childrenGap: 10 }}>
                            <Text className={classNames['wc-GetStarted--headerText']}>First, tell us</Text>
                            <Text className={classNames['wc-GetStarted--subHeaderText']}>Who do you care for?</Text>
                            <Stack className={classNames['wc-GetStarted--stack']} tokens={{ childrenGap: 10 }}>
                                <TextField
                                    label="Preferred name"
                                    resizable={false}
                                    {...formik.getFieldProps('firstName')}
                                    name="firstName"
                                    onKeyDown={(ev) => onKeyDown(ev, firstNameRegex)}
                                    className={classNames['wc-GetStarted--nameField']}
                                    required
                                />
                                <Dropdown
                                    className={classNames['wc-GetStarted--timezoneField']}
                                    label="Time Zone"
                                    aria-label="Time Zone"
                                    selectedKey={formik.values.timezone?.['key']}
                                    placeholder="Select time zone"
                                    options={timezoneDropdownOptions}
                                    {...formik.getFieldProps('timezone')}
                                    required
                                />
                                <PrimaryButton
                                    onClick={() => {
                                        formik.handleSubmit();
                                    }}
                                    disabled={!formik.isValid || loading || formik.isSubmitting}
                                    className={classNames['wc-GetStarted--continueButton']}
                                >
                                    Continue
                                </PrimaryButton>
                            </Stack>
                        </Stack>
                    </Form>
                )}
            </Formik>
        </>
    );
};

export default GetStarted;
