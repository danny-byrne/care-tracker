import React from 'react';
import { MessageBar, MessageBarType, Shimmer, Stack } from '@fluentui/react';
import { getClassNames } from './NotificationsPreference.classNames';
import { useFeedbackService } from 'src/services/FeedbackService';
import Accordion from 'src/common/components/Accordion/Accordion';
import { Header, ToggleRow } from 'src/common/components';
import { ERROR_MESSAGES } from 'src/app/Strings';
import {
    useGetNotificationPreferencesQuery,
    useNotificationPreferenceUpdateMutation,
    Channel,
    UserNotificationPreferences,
    UserNotificationChannelPreferences,
    NotificationPreferencesUpdateInput,
    Feature,
} from 'src/graphQL/serverMocks/graphQLGeneratedCode';

const featureTitle = (feature: Feature): string => {
    switch (feature) {
        case Feature.MedicationRefills:
            return 'Caregiver Refill Reminders';
        case Feature.NewMembers:
            return 'Care Circle Members';
    }
};

const LoadingShimmer: React.FC = () => {
    const channel = (
        <Stack tokens={{ childrenGap: 10 }}>
            <Shimmer width="50%" />
            <Shimmer />
            <Shimmer />
            <Shimmer />
        </Stack>
    );
    return (
        <Stack tokens={{ childrenGap: 20 }}>
            {channel}
            {channel}
            {channel}
        </Stack>
    );
};

const NotificationPreferences: React.FC = () => {
    const classNames = getClassNames();
    const { setErrorToast } = useFeedbackService();

    const { loading, error, data, refetch } = useGetNotificationPreferencesQuery();

    const [updatePreference] = useNotificationPreferenceUpdateMutation({
        onCompleted: () => {
            refetch();
        },
        onError: () => {
            setErrorToast(ERROR_MESSAGES.NOTIFICATIONS_UPDATE);
        },
    });

    const togglePreference = (preference: UserNotificationChannelPreferences, channel: Channel) => {
        const updatedPreference: NotificationPreferencesUpdateInput = {
            notificationFeature: preference.notification.feature,
            sMSEnabled: preference.userChannelSelections.sMSEnabled,
            emailEnabled: preference.userChannelSelections.emailEnabled,
            inAppEnabled: preference.userChannelSelections.inAppEnabled,
        };

        switch (channel) {
            case Channel.Sms:
                updatedPreference.sMSEnabled = !preference.userChannelSelections.sMSEnabled;
                break;
            case Channel.Email:
                updatedPreference.emailEnabled = !preference.userChannelSelections.emailEnabled;
                break;
            case Channel.InApp:
                updatedPreference.inAppEnabled = !preference.userChannelSelections.inAppEnabled;
                break;
        }

        updatePreference({ variables: updatedPreference });
    };

    if (loading) {
        return <LoadingShimmer />;
    }

    if (error) {
        return (
            <MessageBar messageBarType={MessageBarType.error}>{ERROR_MESSAGES.NOTIFICATIONS_DISPLAY_ERROR}</MessageBar>
        );
    }

    const preferences: UserNotificationPreferences = data.notificationPreferences;

    return (
        <Stack>
            {preferences?.notificationsPreferences.map((preference) => {
                return (
                    <Accordion
                        key={preference.notification.feature}
                        header={<Header text={featureTitle(preference.notification.feature)} />}
                    >
                        <Stack
                            className={classNames['wc-NotificationsPreference--toggleGroupHeader']}
                            tokens={{
                                childrenGap: 10,
                            }}
                        >
                            {preference.notification.availableChannels.includes(Channel.Sms) && (
                                <ToggleRow
                                    text="SMS"
                                    onOffText
                                    checked={preference.userChannelSelections.sMSEnabled}
                                    onChange={() => togglePreference(preference, Channel.Sms)}
                                    testId={`${preference.notification.feature}-sms`}
                                />
                            )}
                            {preference.notification.availableChannels.includes(Channel.Email) && (
                                <ToggleRow
                                    text="Email"
                                    onOffText
                                    checked={preference.userChannelSelections.emailEnabled}
                                    onChange={() => togglePreference(preference, Channel.Email)}
                                    testId={`${preference.notification.feature}-email`}
                                />
                            )}
                            {preference.notification.availableChannels.includes(Channel.InApp) && (
                                <ToggleRow
                                    text="In-App Notifications"
                                    onOffText
                                    checked={preference.userChannelSelections.inAppEnabled}
                                    onChange={() => togglePreference(preference, Channel.InApp)}
                                    testId={`${preference.notification.feature}-in-app`}
                                />
                            )}
                        </Stack>
                    </Accordion>
                );
            })}
        </Stack>
    );
};

export default NotificationPreferences;
