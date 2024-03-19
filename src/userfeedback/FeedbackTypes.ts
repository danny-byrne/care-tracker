import { Theme } from '@fluentui/react';
import { M365ThemeKind } from '@ms/centro-hvc-loader';

export interface IFeedbackInitOptions {
    ageGroup?: FeedbackAgeGroup; // Default to undefined, Required except when unauth
    appId: number; // Required
    authenticationType?: FeedbackAuthenticationType; // AAD, MSA, unautheticated, Required
    callbackFunctions?: IFeedbackCallbackFunctions; // Set of callback funtions
    clientName?: string; // Name of your product. Mandatory if you want File upload and Screen Recroding feature.
    feedbackConfig?: IFeedbackConfig; // Settings of feedback
    isProduction?: boolean;
    telemetry?: IFeedbackTelemetry;
    userId?: string; // Required except when unauth
    tenantId?: string; // Must be provided when AAD,
    themeOptions?: IThemeOptions;
}

export const enum FeedbackType {
    Smile = 'Smile',
    Frown = 'Frown',
    Idea = 'Idea',
}

export const enum FeedbackAgeGroup {
    Undefined = 'Undefined',
    MinorWithoutParentalConsent = 'MinorWithoutParentalConsent',
    MinorWithParentalConsent = 'MinorWithParentalConsent',
    NotAdult = 'NotAdult',
    Adult = 'Adult',
    MinorNoParentalConsentRequired = 'MinorNoParentalConsentRequired',
}

export const enum FeedbackAuthenticationType {
    MSA = 'MSA',
    AAD = 'AAD',
    Unauthenticated = 'Unauthenticated',
}

export const enum FeedbackPolicyValue {
    Enabled = 'Enabled',
    Disabled = 'Disabled',
    NotConfigured = 'Not Configured',
}

export const enum FeedbackScreenshotInfoImageFormat {
    JPEG = 'jpeg',
    PNG = 'png',
}

// All enums should be string
export const enum FeedbackScreenshotSourceType {
    AutoCapture = 'AutoCapture',
    AutoCaptureWithHtml2Canvas = 'AutoCaptureWithHtml2Canvas',
    ProvidedAtInitialization = 'ProvidedAtInitialization',
    DynamicallyProvided = 'DynamicallyProvided',
}

export const enum FeedbackUiType {
    SidePane = 'SidePane', // Default: Used for side pane/detail view
    Modal = 'Modal', // Used for modal view
    NoSurface = 'NoSurface', // Used when the surface is provided by the host app
    CallOut = 'CallOut', // Used for inscreen pop up dialogue
}

export const enum FeedbackHostPlatformType {
    Windows = 'Windows',
    iOS = 'iOS',
    Android = 'Android',
    WacTaskPane = 'WacTaskPane',
    MacOS = 'MacOS',
    Web = 'Web',
}

export type ThemeType = M365ThemeKind | string | Theme;

export interface IThemeOptions {
    baseTheme?: ThemeType; // Predfined theme or a custom theme
    colorScheme?: ThemeType; // undefined , Predefined theme color or a new color theme.
}

export interface IFeedbackScreenshotInfo {
    providedScreenshotType?: FeedbackScreenshotSourceType;
    screenshotImageFormat?: FeedbackScreenshotInfoImageFormat;
    screenshotBase64?: string;
}

export interface IFeedbackCallbackFunctions {
    attachDiagnosticsLogs?: (diagnosticsUploadId: string, diagnosticsEndpoint: string) => void;
    onDismiss?: (isFeedbackSent?: boolean) => void;
    onSuccess?: (clientFeedbackId: string) => void;
    onError?: (errorMessage?: string) => void;
    provideDynamicScreenshot?: () => Promise<IFeedbackScreenshotInfo>;
    supportCallback?: () => void;
}

// IFeedbackConfig
export interface IFeedbackConfig {
    appData?: string;
    calloutTargetID?: string; // used for callout type surface targetting
    complianceChecks?: IFeedbackComplianceChecks;
    diagnosticsExplanationUrl?: string;
    email?: string;
    featureAreas?: string[]; // Categories to show up in the dropdown part
    feedbackForumUrl?: string; // if my feedback fourm url for the product is avialable
    feedbackUiType?: FeedbackUiType;
    hostPlatform?: FeedbackHostPlatformType;
    initialFeedbackType?: FeedbackType;
    isDisplayed?: boolean;
    isEmailCollectionEnabled?: boolean; // to enable email colection
    isFeedbackForumEnabled?: boolean; // to enable feedback forum link
    isFileUploadEnabled?: boolean; // to enable file upload function, pre-release only (unavailable for production use)
    isMyFeedbackEnabled?: boolean; // to enble my feedback link
    isScreenRecordingEnabled?: boolean; // to enable screen recording function, pre-release only
    isScreenshotEnabled?: boolean; // to enable screenshot function
    isThankYouPageDisabled?: boolean; // to disable thank you page
    maxHeight?: number; // applicable for modal and callout
    maxWidth?: number; // applicable for modal , callout and side panel
    minHeight?: number; // applicable for modal and callout
    minWidth?: number; // applicable for modal , callout and side panel
    myFeedbackUrl?: string; // if my feedback url for the product is avialable
    privacyUrl?: string; // For setting custom privacy URL
    retentionDurationDays?: number;
    screenshotInfo?: IFeedbackScreenshotInfo;
    width?: number; // applicable for modal and callout
}

export interface IFeedbackTelemetry {
    audience?: string;
    audienceGroup?: string;
    browser?: string; // Browser name.
    browserVersion?: string; // Browser version number.
    channel?: string;
    clientCountryCode?: string;
    dataCenter?: string; // Data center identifier.
    deviceId?: string;
    deviceType?: string;
    errorClassification?: string;
    errorCode?: string;
    errorName?: string;
    featureArea?: string;
    flights?: string;
    flightSource?: string;
    fundamentalArea?: string;
    installationType?: string;
    isLogIncluded?: boolean;
    isUserSubscriber?: boolean;
    officeArchitecture?: string;
    officeBuild?: string;
    officeEditingLang?: number;
    officeUILang?: number;
    osBitness?: number;
    osBuild?: string;
    osUserLang?: number;
    platform?: string;
    processSessionId?: string;
    ringId?: number;
    sdkVersion?: string; // DO NOT expose to client
    sku?: string;
    sourceContext?: string;
    sourcePageName?: string; // Source web page name.
    sourcePageURI?: string; // Source web page URI.
    systemManufacturer?: string;
    systemProductName?: string;

    // Do not expose these
    // Relate to extendedManifestData
    cid?: string;
    diagnosticsEndPoint?: string;
    diagnosticsUploadId?: string;
    feedbackUIContext?: string;
    licenseCategory?: number;
    licenseId?: string;
    msoAppId?: number;
    msoPlatformId?: number;
    osUserLocale?: string;
    sqmMachineId?: string;
    sqmUserId?: string;
    uILocale?: string;
}

// Details of the compliance checks https://www.owiki.ms/wiki/Working_with_feedback_policies
export interface IFeedbackComplianceChecks {
    // For MSA users rest of the variables are not valid
    // Allow the use of connected experiences in Office
    connectedExperiences?: FeedbackPolicyValue;
    // Allow users to submit feedback to Microsoft
    policyAllowFeedback: FeedbackPolicyValue;
    // Allow users to receive and respond to in-product surveys from Microsoft
    policyAllowSurvey?: FeedbackPolicyValue;
    // Allow users to include screenshots and attachments when they submit feedback to Microsoft
    policyAllowScreenshot: FeedbackPolicyValue;
    // Allow Microsoft to follow up on feedback submitted by users
    policyAllowContact: FeedbackPolicyValue;
    // Allow users to include log files and content samples when feedback is submitted to Microsoft
    policyAllowContent?: FeedbackPolicyValue;
}

export interface InAppFeedbackFormData {
    comment: string;
    email: string;
    featureArea?: string;
    feedbackType: FeedbackType;
    isEmailSelected: boolean;
}
