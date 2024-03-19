import { env } from 'src/env';
import RouterConfig from './RouterConfig';

export let BASE_REDIRECT_URI;
export let BACKEND_API_URI;
export let SIGNALR_URI;
export let feedbackIsProduction = false;
export let telemetryEnabled = true;
export let useFirstPartyAuth = false;

// Not secrets publicly visible.
const devTelemetryKey = '9e509dd18e0a4ff2b817b908cfb6bff3-9c026cfc-2c98-419c-8695-e56cf651bbaa-7409';
export let telemetryKey = devTelemetryKey;

// This section explained:
// https://learn.microsoft.com/en-us/azure/active-directory/develop/msal-client-application-configuration
export let msalConfig = {
    auth: {
        clientId: 'c39de688-7cc1-407b-bae5-7b6c133db1fa',
        authority: 'https://login.microsoftonline.com/consumers',
        postLogoutRedirectUri: `${BASE_REDIRECT_URI}${RouterConfig.LandingPage}`,
        navigateToLoginRequestUrl: false,
    },
    cache: {
        cacheLocation: 'sessionStorage',
        storeAuthStateInCookie: false,
    },
};
export let loginRequest = {
    scopes: ['api://c39de688-7cc1-407b-bae5-7b6c133db1fa/access_as_user'],
};

export let graphRequest = {
    scopes: ['User.Read'],
};

switch (env.REACT_APP_ENV) {
    case 'prod':
        feedbackIsProduction = true;
        useFirstPartyAuth = true;
        BASE_REDIRECT_URI = 'https://projectwindcrest.microsoft.com';
        BACKEND_API_URI = 'https://projectwindcrestapi.microsoft.com/graphql';
        SIGNALR_URI = 'https://projectwindcrestapi.microsoft.com/signalr/InAppNotifications';
        msalConfig = {
            auth: {
                clientId: 'a59e70c4-deae-4064-a3c8-d54baa891916',
                authority: 'https://login.microsoftonline.com/consumers',
                postLogoutRedirectUri: `${BASE_REDIRECT_URI}${RouterConfig.LandingPage}`,
                navigateToLoginRequestUrl: false,
            },
            cache: {
                cacheLocation: 'sessionStorage',
                storeAuthStateInCookie: false,
            },
        };
        loginRequest = {
            scopes: ['api://a59e70c4-deae-4064-a3c8-d54baa891916/access_as_user'],
        };
        telemetryKey = '44f29447ae0443148664eaca0eea4c27-94b68e1f-7e40-4e3f-b1b7-5051e3370ca5-7081';
        break;
    case 'staging':
        BASE_REDIRECT_URI = 'https://projectwindcrest-staging.microsoft.com';
        BACKEND_API_URI = 'https://projectwindcrestapi-staging.microsoft.com/graphql/';
        SIGNALR_URI = 'https://projectwindcrestapi-staging.microsoft.com/signalr/InAppNotifications';
        telemetryKey = '7ffb190fbc2d4db98fbb46a175eb159c-4d44432b-467b-45db-b737-362cf82a53db-7704';
        break;
    case 'stable':
        BASE_REDIRECT_URI = 'https://windcrest-app-stable.azureedge.net';
        BACKEND_API_URI = 'https://app-wcapi-stable.azurewebsites.net/graphql/';
        SIGNALR_URI = 'https://app-wcapi-stable.azurewebsites.net/signalr/InAppNotifications';
        telemetryKey = '1b285b03b1bf49428eb03fa1c9cc8248-fcb61702-cdc5-4466-b9bf-6dfce298b308-7851';
        break;
    case 'qa':
        BASE_REDIRECT_URI = 'https://windcrest-app-qa.azureedge.net';
        BACKEND_API_URI = 'https://app-wcapi-qa.azurewebsites.net/graphql/';
        SIGNALR_URI = 'https://app-wcapi-qa.azurewebsites.net/signalr/InAppNotifications';
        telemetryKey = 'e842df27f235414aa71e70b6978d9cab-713a78f6-6e82-4941-8f18-a2fc6de9c0df-7365';
        break;
    case 'dev':
        BASE_REDIRECT_URI = 'https://windcrest-app-dev.azureedge.net';
        BACKEND_API_URI = 'https://app-wcapi-dev.azurewebsites.net/graphql/';
        SIGNALR_URI = 'https://app-wcapi-dev.azurewebsites.net/signalr/InAppNotifications';
        break;
    case 'windowsDev':
        telemetryEnabled = false;
        BASE_REDIRECT_URI = 'https://localhost:443';
        BACKEND_API_URI = 'http://localhost:7110/graphql/';
        SIGNALR_URI = 'https://localhost:7110/signalr/InAppNotifications';
        break;
    case undefined:
        telemetryEnabled = false;
        BASE_REDIRECT_URI = 'https://localhost:443';
        BACKEND_API_URI = 'https://localhost:7110/graphql/';
        SIGNALR_URI = 'https://localhost:7110/signalr/InAppNotifications';
        break;
    default:
        BASE_REDIRECT_URI = `https://windcrest-app-${env.REACT_APP_ENV}.azureedge.net`;
        BACKEND_API_URI = `https://app-wcapi-${env.REACT_APP_ENV}.azurewebsites.net/graphql/`;
        SIGNALR_URI = `https://app-wcapi-${env.REACT_APP_ENV}.azurewebsites.net/signalr/InAppNotifications`;
}

export const DEFAULT_INVITE_CODE = 'defaultCode';

export const PAGE_TITLES = {
    FEEDBACK_TITLE: 'Feedback',
    TOGETHER_TIME_TITLE: 'Together Time',
    TOGETHER_TIME_VIEW_TITLE: 'Profile',
    MED_MANAGER_TITLE: 'Medications',
    MED_MANAGER_VIEW_TITLE: 'Medication Details',
    HOME_TITLE: 'Windcrest',
    CARE_PLAN: 'Care Plan',
    CONDITIONS: 'Conditions',
    CONDITION: 'Condition',
    ADD_CONDITION: 'Add Condition',
    PROVIDER: 'Provider',
    GET_STARTED: 'Get Started',
    RECIPIENT_PROFILE: 'Care Recipient Profile',
    PHARMACY: 'Pharmacy',
    IMMUNIZATION: 'Immunization',
    ALLERGY: 'Allergy',
    PENDING: 'Pending',
    HOME: 'For You',
    ANNOTATION: 'Annotation',
};

export const SIDE_MENU_WIDTH = 52;

export const SUPPORT_EMAIL = 'windcrest-support@microsoft.com';

export const PRIVACY_AND_COOKIES_URI = 'https://privacy.microsoft.com/en-us/privacystatement';

export const TERMS_OF_USE_PDF_PATH = `${window.location.origin}/WINDCREST_TERMS_OF_USE.pdf`;

export const MILLISECONDS_IN_A_SECOND = 1000;
export const DEFAULT_POLLING_INTERVAL_IN_SECONDS = 10;
export const DEFAULT_POLLING_INTERVAL = DEFAULT_POLLING_INTERVAL_IN_SECONDS * MILLISECONDS_IN_A_SECOND;
export const MEDICATIONS_POLLING_INTERVAL = DEFAULT_POLLING_INTERVAL;
export const CARE_TEAM_POLLING_INTERVAL = DEFAULT_POLLING_INTERVAL;
