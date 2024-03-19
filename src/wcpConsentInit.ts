/* eslint-disable no-console */
/* eslint-disable no-undef */
///<reference types="@wcp/wcp-consent" />
import { ActionType, ApplicationInsights, Behavior } from '@microsoft/1ds-analytics-web-js';
import { telemetryEnabled, telemetryKey } from './app/Constants';

const telemetryAndFeedback = () => {
    let siteConsent: WcpConsent.SiteConsent = null;
    let analytics: ApplicationInsights;

    const InitTelemetry = () => {
        if (telemetryEnabled) {
            analytics = new ApplicationInsights();
            var config = {
                instrumentationKey: telemetryKey,
                channelConfiguration: {
                    // Post channel configuration
                    eventsLimitInMem: 5000,
                },
                propertyConfiguration: {
                    callback: {
                        userConsentDetails: siteConsent ? siteConsent.getConsent : null,
                    },
                },
                webAnalyticsConfiguration: {
                    enableAutoRouteTracking: true,
                    // Web Analytics Plugin configuration
                    autoCapture: {
                        scroll: true,
                        pageView: true,
                        onLoad: true,
                        onUnload: true,
                        click: false,
                        resize: true,
                        jsError: true,
                    },
                },
            };
            //Initialize SDK
            analytics.initialize(config, []);
        }
    };

    const initConsent = () => {
        //Init method
        WcpConsent &&
            WcpConsent.init(
                'en-US',
                'cookie-banner',
                (err, _siteConsent) => {
                    if (err) {
                        alert(err);
                    } else {
                        // eslint-disable-next-line @typescript-eslint/no-unused-vars
                        siteConsent = _siteConsent;

                        InitTelemetry();
                        // console.log('getConsent()', siteConsent.getConsent());
                        // console.log('getConsent().Required', siteConsent.getConsent().Required);
                    }
                },
                onConsentChanged,
            );
    };

    //call back method when consent is changed by user
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    function onConsentChanged(newConsent: Record<WcpConsent.consentCategories, boolean>) {
        // console.log('onConsentChanged', newConsent);
        // console.log('getConsent()', siteConsent.getConsent());
        // console.log(
        //     'getConsentFor(wcpConsentCategory.Required)',
        //     siteConsent.getConsentFor(WcpConsent.consentCategories.Required),
        // );
        // console.log(
        //     'getConsentFor(wcpConsentCategory.ThirdPartyAnalytics)',
        //     siteConsent.getConsentFor(WcpConsent.consentCategories.Analytics),
        // );
        // console.log(
        //     'getConsentFor(wcpConsentCategory.SocialMedia)',
        //     siteConsent.getConsentFor(WcpConsent.consentCategories.SocialMedia),
        // );
        // console.log(
        //     'getConsentFor(wcpConsentCategory.Advertising)',
        //     siteConsent.getConsentFor(WcpConsent.consentCategories.Advertising),
        // );
    }

    const manageConsent = () => {
        if (siteConsent) {
            siteConsent.manageConsent();
        }
    };

    const isConsentRequired = () => {
        if (siteConsent) {
            return siteConsent.isConsentRequired;
        }
    };

    const trackClick = (testId) => {
        if (telemetryEnabled) {
            analytics?.trackPageAction({
                targetUri: window.location.origin + window.location.pathname,
                actionType: ActionType.CLICKLEFT,
                behavior: Behavior.CLICK,
                isLoggedIn: true,
                content: { testId: testId },
            });
        }
    };

    const trackFieldChanged = (testId) => {
        if (telemetryEnabled) {
            analytics?.trackPageAction({
                targetUri: window.location.origin + window.location.pathname,
                actionType: ActionType.OTHER,
                behavior: Behavior.TEXTBOXINPUT,
                isLoggedIn: true,
                content: { testId: testId },
            });
        }
    };

    return { manageConsent, analytics, trackClick, initConsent, trackFieldChanged, isConsentRequired };
};

export const { manageConsent, analytics, trackClick, initConsent, trackFieldChanged, isConsentRequired } =
    telemetryAndFeedback();
