import React from 'react';
import {
    Checkbox,
    Stack,
    Text,
    PrimaryButton,
    DefaultButton,
    Image,
    TextField,
    Dropdown,
    IDropdownOption,
} from '@fluentui/react';
import { Form, Formik, FormikErrors, FormikProps } from 'formik';
import RouterConfig from 'src/app/RouterConfig';
import headerIcon from 'src/assets/Notifications/NotificationsSubscribeHeaderIcon.svg';
import { getErrorMessagePhone, formatPhoneNumber, sanitizePhoneNumber } from 'src/utils/utils';
import { useFeedbackService } from 'src/services/FeedbackService';
import { ERROR_MESSAGES } from 'src/app/Strings';
import { useNavigate } from 'react-router';
import { isValidPhone } from 'src/utils/validators';
import { timeZonesToDropdownOptions } from 'src/utils/dates';
import { Toast } from 'src/common/components';
import {
    useGetUserAppProfileInfoQuery,
    useGetAvailableUserTimeZonesQuery,
    useCaregiverNotificationSettingsUpdateMutation,
    useCareGiverCareCircleNotificationSettingsDefaultsMutation,
    CareGiverNotificationSettingsUpdateInput,
    CareGiverCarecircleNotificationSettingsDefaultsInput,
} from 'src/graphQL/serverMocks/graphQLGeneratedCode';
import { getClassNames } from './NotificationsSubscribe.classNames';

interface FormValues {
    smsEnabled: boolean;
    phone: string;
    timezone: IDropdownOption;
    emailEnabled: boolean;
    email: string;
}

const validate = (values: FormValues): FormikErrors<FormValues> => {
    const errors: any = {};
    if (values.smsEnabled) {
        if (!values.phone) {
            errors.phone = 'Please enter a phone number';
        } else if (!isValidPhone(values.phone)) {
            errors.phone = 'Please enter a valid phone number';
        }
        if (!values.timezone) {
            errors.timezone = 'Please select a time zone';
        }
    }
    return errors;
};

const shouldDisableSubmit = (formik: FormikProps<FormValues>) => {
    if (formik.isSubmitting) {
        return true;
    } else if (!formik.values.smsEnabled && !formik.values.emailEnabled) {
        return true;
    } else if (!formik.isValid) {
        return true;
    } else if (!formik.dirty) {
        const errors = validate(formik.values);
        return Object.keys(errors).length > 0;
    }

    return false;
};

const NotificationsSubscribe: React.FC = () => {
    const classNames = getClassNames();
    const navigate = useNavigate();
    const { setErrorToast, hasToast } = useFeedbackService();

    // Fetch timezone data
    const { data: timezoneData } = useGetAvailableUserTimeZonesQuery({
        onError: () => {
            setErrorToast(ERROR_MESSAGES.GET_TIMEZONES);
        },
    });
    const timezoneDropdownOptions = timezoneData ? timeZonesToDropdownOptions(timezoneData) : [];

    // Use the current timezone as default
    const currentTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const currentTimezoneDropdownOption = timezoneDropdownOptions.find((tzo) => tzo.key === currentTimezone);

    const { data: userProfileData } = useGetUserAppProfileInfoQuery();

    const [updateNotificationData] = useCaregiverNotificationSettingsUpdateMutation({
        onError: () => {
            setErrorToast(ERROR_MESSAGES.NOTIFICATIONS_UPDATE);
        },
    });

    const [updateNotificationSettings] = useCareGiverCareCircleNotificationSettingsDefaultsMutation({
        onCompleted: () => {
            finish();
        },
        onError: () => {
            setErrorToast(ERROR_MESSAGES.NOTIFICATIONS_UPDATE);
        },
    });

    const finish = () => {
        navigate(RouterConfig.TermsSuccess);
    };

    const onSubmit = async (values: FormValues, { setSubmitting }) => {
        setSubmitting(true);

        if (values.smsEnabled) {
            const sanitizedPhoneNumber = sanitizePhoneNumber(values.phone);
            const variables: CareGiverNotificationSettingsUpdateInput = {
                mobileNumber: sanitizedPhoneNumber,
                timeZoneID: values.timezone.key as string,
            };
            await updateNotificationData({ variables });
        }

        const variables: CareGiverCarecircleNotificationSettingsDefaultsInput = {
            enableSMSChannelOnAllNotifications: values.smsEnabled,
            enableEmailChannelOnAllNotifications: values.emailEnabled,
        };
        await updateNotificationSettings({ variables });

        setSubmitting(false);
    };

    const formattedPhoneNumber = formatPhoneNumber(userProfileData?.me?.mobile);

    const initialValues: FormValues = {
        smsEnabled: true,
        phone: formattedPhoneNumber,
        timezone: currentTimezoneDropdownOption,
        emailEnabled: true,
        email: userProfileData?.me?.email,
    };

    return (
        <div className={classNames['wc-NotificationsSubscribe--pageContainer']}>
            <Stack
                className={classNames['wc-NotificationsSubscribe--content']}
                tokens={{ childrenGap: 10 }}
                horizontalAlign="center"
            >
                <Image
                    className={classNames['wc-NotificationsSubscribe--imageContainer']}
                    src={headerIcon}
                    alt="Windcrest header icon"
                    height={140}
                />
                <Text className={classNames['wc-NotificationsSubscribe--titleText']} variant="xLarge">
                    Would you like to Subscribe to Updates?
                </Text>
                <Text className={classNames['wc-NotificationsSubscribe--subtitleText']} variant="medium">
                    Notifications can be managed in your app settings.
                </Text>

                <Formik initialValues={initialValues} enableReinitialize validate={validate} onSubmit={onSubmit}>
                    {(formik) => (
                        <Form className={classNames['wc-NotificationsSubscribe--form']}>
                            <Stack tokens={{ childrenGap: 10 }}>
                                <Checkbox
                                    label="SMS Notifications"
                                    name="smsEnabled"
                                    checked={formik.values.smsEnabled}
                                    {...formik.getFieldProps('smsEnabled')}
                                    onChange={(_, checked) => {
                                        formik.setFieldValue('smsEnabled', checked);
                                    }}
                                />
                                <TextField
                                    name="phone"
                                    placeholder="Phone number"
                                    {...formik.getFieldProps('phone')}
                                    onChange={(_, value) => {
                                        const formattedPhoneNumber = formatPhoneNumber(value);
                                        formik.setFieldValue('phone', formattedPhoneNumber);
                                    }}
                                    onGetErrorMessage={getErrorMessagePhone}
                                    deferredValidationTime={1000}
                                    required={formik.values.smsEnabled}
                                    disabled={!formik.values.smsEnabled}
                                />
                                <Dropdown
                                    selectedKey={formik.values.timezone?.['key']}
                                    placeholder="Select time zone"
                                    options={timezoneDropdownOptions}
                                    {...formik.getFieldProps('timezone')}
                                    onChange={(_, value) => {
                                        formik.setFieldValue('timezone', value);
                                    }}
                                    required={formik.values.smsEnabled}
                                    disabled={!formik.values.smsEnabled}
                                />
                                <Checkbox
                                    name="emailEnabled"
                                    label="Email Notifications"
                                    checked={formik.values.emailEnabled}
                                    {...formik.getFieldProps('emailEnabled')}
                                    onChange={(_, checked) => {
                                        formik.setFieldValue('emailEnabled', checked);
                                    }}
                                />
                                <TextField
                                    name="email"
                                    placeholder="Email address"
                                    required={formik.values.emailEnabled}
                                    disabled
                                    {...formik.getFieldProps('email')}
                                    deferredValidationTime={1000}
                                />
                                <Stack
                                    className={classNames['wc-NotificationsSubscribe--buttonContainer']}
                                    horizontal
                                    horizontalAlign="center"
                                    tokens={{ childrenGap: 15 }}
                                >
                                    <DefaultButton
                                        className={classNames['wc-NotificationsSubscribe--button']}
                                        text="Not Now"
                                        onClick={() => finish()}
                                    />
                                    <PrimaryButton
                                        className={classNames['wc-NotificationsSubscribe--button']}
                                        type="submit"
                                        text="Confirm"
                                        disabled={shouldDisableSubmit(formik)}
                                    />
                                </Stack>
                            </Stack>
                        </Form>
                    )}
                </Formik>
            </Stack>
            {hasToast && <Toast />}
        </div>
    );
};

export default NotificationsSubscribe;
