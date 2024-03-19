import { feedbackIsProduction, PRIVACY_AND_COOKIES_URI } from 'src/app/Constants';

import {
    FeedbackAgeGroup,
    FeedbackAuthenticationType,
    FeedbackHostPlatformType,
    FeedbackPolicyValue,
    FeedbackUiType,
    IFeedbackInitOptions,
} from './FeedbackTypes';

import { M365ThemeKind } from '@ms/centro-hvc-loader';

const feedbackPPEAppId = 50134;
const feedbackProductionAppId = 2705;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function onDismissPrint(_isFeedbackSent?: boolean) {
    // This function is required because of a but in OCV. If this function is not defined, the cancel button fails.
}

export const InitialFeedbackData: IFeedbackInitOptions = {
    appId: feedbackIsProduction ? feedbackProductionAppId : feedbackPPEAppId,
    clientName: 'Project Windcrest',
    authenticationType: FeedbackAuthenticationType.MSA,
    ageGroup: FeedbackAgeGroup.Adult,
    callbackFunctions: {
        onDismiss: onDismissPrint, // without this defined, the framework errors and won't close on cancel
    },

    feedbackConfig: {
        isEmailCollectionEnabled: true,
        isFeedbackForumEnabled: false, // matches initial implementation
        //isMyFeedbackEnabled: true,
        isScreenshotEnabled: false, // disabled at request of OCV team per Task 178402
        isScreenRecordingEnabled: false, // disabled at request of OCV team per Task 178402
        privacyUrl: PRIVACY_AND_COOKIES_URI,
        feedbackUiType: FeedbackUiType.SidePane,
        hostPlatform: FeedbackHostPlatformType.Web,
        complianceChecks: {
            connectedExperiences: FeedbackPolicyValue.Enabled,
            policyAllowFeedback: FeedbackPolicyValue.Enabled,
            policyAllowSurvey: FeedbackPolicyValue.Enabled,
            policyAllowScreenshot: FeedbackPolicyValue.Disabled,
            policyAllowContact: FeedbackPolicyValue.Enabled,
            policyAllowContent: FeedbackPolicyValue.Disabled,
        },
    },
    isProduction: feedbackIsProduction,
    themeOptions: { baseTheme: M365ThemeKind.PPACLight },
};
