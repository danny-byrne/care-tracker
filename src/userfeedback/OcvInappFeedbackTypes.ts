/* eslint-disable max-len */
export interface IInAppFeedbackInitOptions {
    appId: number;
    application?: IInAppFeedbackApplication;
    callbackFunctions?: ICallbackFunctions; // Set of callback funtions which can be used to control teh behaviour on sucess or error
    clientFeedbackId?: string /** Must be an uuid, if not provided it will be generated and retuned onDismiss*/;
    complianceChecks: IInAppFeedbackComplianceChecks;
    email?: string;
    featureSettings?: IInAppFeedbackInitFeatureSettings;
    uiOptions?: IUiOptions;
    initialFeedbackType?: InAppFeedbackType;
    isProduction?: boolean;
    sdkVersion?: string;
    retentionDurationDays?: number;
    screenshotInfo?: IHostScreenshotInfo;
    telemetry?: IInAppFeedbackTelemetry;
    uiState?: boolean;
    web?: IWebData;
}

export interface ICallbackFunctions {
    onDismiss?: (isFeedbackSent?: boolean) => void; // when feedback is dismissed true if feedback was sent otherwise false( UI )
    onSuccess?: (clientFeedbackId: string) => void; // when feedback is sent
    onError?: (errorMessage?: string) => void; // when feedback was failed
    provideDynamicScreenshot?: () => IHostScreenshotInfo; // called if the screen shot is provided by the host application dynamically on this call
}

export enum InAppFeedbackType {
    Smile = 'Smile',
    Frown = 'Frown',
    Idea = 'Idea',
}

export enum InAppFeedbackAgeGroup {
    Undefined = 'Undefined',
    MinorWithoutParentalConsent = 'MinorWithoutParentalConsent',
    MinorWithParentalConsent = 'MinorWithParentalConsent',
    NotAdult = 'NotAdult',
    Adult = 'Adult',
    MinorNoParentalConsentRequired = 'MinorNoParentalConsentRequired',
}

export enum InAppFeedbackAuthenticationType {
    MSA = 'MSA',
    AAD = 'AAD',
    Unauthenticated = 'Unauthenticated',
}

export enum InAppFeedbackPolicyValue {
    Enabled = 'Enabled',
    Disabled = 'Disabled',
    NotConfigured = 'Not Configured',
}

export enum HostScreenshotInfoImageFormat {
    JPEG = 'jpeg',
    PNG = 'png',
}

export enum ScreenshotSourceType {
    AutoCapture, // Default: used for normal web integration where the SDK is responsible for taking screenshot.
    ProvidedAtInitialization, // Used when hostapp provides the screeenshot one time when it is initialzed mainly used in mobile scenarios.
    DynamicallyProvided, // When screenshot is provided dynamically using callback, used in Win32 and Mac Scenarios.
}

export enum InAppFeedbackUiType {
    SidePane, // Default: Used for side pane/detail view
    Modal, // Used for modal view
    NoSurface, // Used when the surface is provided by the host app
    CallOut, // Used for inscreen pop up dialogue
}

export interface IHostScreenshotInfo {
    providedScreenshotType?: ScreenshotSourceType;
    screenshotImageFormat?: HostScreenshotInfoImageFormat;
    screenshotBase64?: string;
}

export interface IInAppFeedbackInitFeatureSettings {
    // Categories to show up in the dropdown part
    featureAreas?: string[];
    // if my feedback fourm url for the product is avialable
    feedbackForumUrl?: string;
    // to enable email colection
    isEmailCollectionEnabled?: boolean;
    // to enable feedback forum link
    isFeedbackForumEnabled?: boolean;
    // to enble my feedback link
    isMyFeedbackEnabled?: boolean;
    // to enable screenshot function
    isScreenshotEnabled?: boolean;
    // to disable thank you page
    isThankYouPageDisabled?: boolean;
    // if my feedback url for the product is avialable
    myFeedbackUrl?: string;
    // For setting custom privacy URL
    privacyUrl?: string;
}

export interface IInAppFeedbackTelemetry {
    audience?: string;
    audienceGroup?: string;
    channel?: string;
    clientCountryCode?: string;
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
    loggableUserId?: string;
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
    sku?: string;
    sourceContext?: string;
    systemProductName?: string;
    systemManufacturer?: string;
    tenantId?: string;
}

// Details of the compliance checks https://www.owiki.ms/wiki/Working_with_feedback_policies
export interface IInAppFeedbackComplianceChecks {
    // AAD, MSA, unautheticated
    authenticationType: InAppFeedbackAuthenticationType;
    // Default to undefined
    ageGroup: InAppFeedbackAgeGroup;
    // For MSA users rest of the variables are not valid
    // Allow the use of connected experiences in Office
    connectedExperiences?: InAppFeedbackPolicyValue;
    // Allow users to submit feedback to Microsoft
    policyAllowFeedback?: InAppFeedbackPolicyValue;
    // Allow users to receive and respond to in-product surveys from Microsoft
    policyAllowSurvey?: InAppFeedbackPolicyValue;
    // Allow users to include screenshots and attachments when they submit feedback to Microsoft
    policyAllowScreenshot?: InAppFeedbackPolicyValue;
    // Allow Microsoft to follow up on feedback submitted by users
    policyAllowContact?: InAppFeedbackPolicyValue;
    // Allow users to include log files and content samples when feedback is submitted to Microsoft
    policyAllowContent?: InAppFeedbackPolicyValue;
}

export interface IInAppFeedbackApplication {
    // Custom data which can be set by the SDK user
    appData?: string;
    // Custom data which can be set by the SDK user
    extendedManifestData?: string;
}

export interface IWebData {
    // Browser name.
    browser?: string;
    // Browser version number.
    browserVersion?: string;
    // Data center identifier.
    dataCenter?: string;
    // Source web page name.
    sourcePageName?: string;
    // Source web page URI.
    sourcePageURI?: string;
}

export interface IUiOptions {
    type?: InAppFeedbackUiType;
    isBlocking?: boolean;
    minWidth?: number; // applicable for model , pop up and side panel
    minHeight?: number; // applicable for model and pop up
    maxWidth?: number; // applicable for model , pop up and side panel
    maxHeight?: number; // applicable for model and pop up
    width?: number; // applicable for model and pop up
    callOutTargetID?: string; // used for callout type surface targetting
}
