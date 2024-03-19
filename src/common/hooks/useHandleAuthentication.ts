import { useEffect, useState } from 'react';
import { useFeedbackService } from 'src/services/FeedbackService';

import { AuthService } from 'src/services/AuthService';
import { useFirstPartyAuth } from 'src/app/Constants';

import { ERROR_MESSAGES, LOCAL_STORAGE_KEYS } from 'src/app/Strings';

import { useMsal } from '@azure/msal-react';
import { EventType } from '@azure/msal-browser';

const clearLocalStorage = (keepFeatureFlags = false) => {
    const homePageState = localStorage.getItem(LOCAL_STORAGE_KEYS.HOME_PAGE_FEATURE_FLAG);
    const annotationFeatureFlag = localStorage.getItem(LOCAL_STORAGE_KEYS.ANNOTATION_FEATURE_FLAG);
    const welcomeMessageFeatureFlag = localStorage.getItem(LOCAL_STORAGE_KEYS.WELCOME_MESSAGE_FEATURE_FLAG);
    const todayViewFeatureFlag = localStorage.getItem(LOCAL_STORAGE_KEYS.TODAY_VIEW_FEATURE_FLAG);
    const sixMonthToolkitFeatureFlag = localStorage.getItem(LOCAL_STORAGE_KEYS.SIX_MONTH_TOOLKIT_FEATURE_FLAG);
    const suggestedArticleFeatureFlag = localStorage.getItem(LOCAL_STORAGE_KEYS.SUGGESTED_ARTICLE_FEATURE_FLAG);
    const positivitySlotFeatureFlag = localStorage.getItem(LOCAL_STORAGE_KEYS.POSITIVITY_SLOT_FEATURE_FLAG);

    localStorage.clear();

    if (keepFeatureFlags) {
        localStorage.setItem(LOCAL_STORAGE_KEYS.HOME_PAGE_FEATURE_FLAG, homePageState);
        localStorage.setItem(LOCAL_STORAGE_KEYS.ANNOTATION_FEATURE_FLAG, annotationFeatureFlag);
        localStorage.setItem(LOCAL_STORAGE_KEYS.WELCOME_MESSAGE_FEATURE_FLAG, welcomeMessageFeatureFlag);
        localStorage.setItem(LOCAL_STORAGE_KEYS.TODAY_VIEW_FEATURE_FLAG, todayViewFeatureFlag);
        localStorage.setItem(LOCAL_STORAGE_KEYS.SIX_MONTH_TOOLKIT_FEATURE_FLAG, sixMonthToolkitFeatureFlag);
        localStorage.setItem(LOCAL_STORAGE_KEYS.SUGGESTED_ARTICLE_FEATURE_FLAG, suggestedArticleFeatureFlag);
        localStorage.setItem(LOCAL_STORAGE_KEYS.POSITIVITY_SLOT_FEATURE_FLAG, positivitySlotFeatureFlag);
    }
};

const KEEP_FEATURE_FLAGS = true;

export const useHandleAuthentication = () => {
    const { instance } = useMsal();
    const { setErrorFullscreen } = useFeedbackService();

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [hasStoredInviteCode, setHasStoredInviteCode] = useState(false);

    const LOGIN_SUCCESS_EVENTS = [EventType.ACQUIRE_TOKEN_SUCCESS, EventType.LOGIN_SUCCESS];
    const LOGIN_FAILURE_EVENTS = [EventType.ACQUIRE_TOKEN_FAILURE, EventType.LOGOUT_FAILURE];

    useEffect(() => {
        // This code is adding an event callback to the MSAL instance. Once we receive an event signifying
        // a successful login, we run through our own authentication logic.
        const callbackId = instance.addEventCallback((message) => {
            if (LOGIN_SUCCESS_EVENTS.includes(message.eventType)) {
                if (message.interactionType === 'redirect') {
                    const { state } = message.payload;
                    let hasRequestedMsGraphConsent = '';
                    if (useFirstPartyAuth) {
                        hasRequestedMsGraphConsent = 'true';
                    } else {
                        hasRequestedMsGraphConsent = localStorage.getItem(
                            LOCAL_STORAGE_KEYS.HAS_REQUESTED_MS_GRAPH_CONSENT,
                        );
                    }

                    // Due to our 2nd call to MS Graph for 3rd party apps, we're going to hit this callback twice.
                    if (state && !useFirstPartyAuth) {
                        // Remove any stale data on 1st log in.
                        clearLocalStorage(KEEP_FEATURE_FLAGS);

                        // The 1st call will have a state with the invite code. We need to store this code
                        // (in the LoginLoadingPage) and trigger the 2nd call.
                        localStorage.setItem(LOCAL_STORAGE_KEYS.INVITE_CODE, state);
                        setHasStoredInviteCode(true);
                    } else if (hasRequestedMsGraphConsent === 'true') {
                        // eslint-disable-next-line max-len
                        // The 2nd call will not include an invite code, but we will have set HAS_REQUESTED_MS_GRAPH_CONSENT
                        // prior to the call. At this point we're authenticated.

                        // 1st party auth will only hit this if statement, logic from previous if statement copied here
                        // TODO: Clean this up once we confirm it works
                        if (useFirstPartyAuth) {
                            clearLocalStorage(KEEP_FEATURE_FLAGS);
                            localStorage.setItem(LOCAL_STORAGE_KEYS.INVITE_CODE, state);
                            setHasStoredInviteCode(true);
                        }

                        AuthService.setActiveAccount();
                        setIsAuthenticated(true);
                    } else {
                        // If neither of those conditions are true, we error out.
                        setErrorFullscreen(ERROR_MESSAGES.USER_AUTHENTICATION);
                    }
                } else {
                    AuthService.setActiveAccount();
                    setIsAuthenticated(true);
                }
            } else if (LOGIN_FAILURE_EVENTS.includes(message.eventType)) {
                setErrorFullscreen(ERROR_MESSAGES.USER_AUTHENTICATION);
            }
        });

        return () => {
            if (callbackId) {
                instance.removeEventCallback(callbackId);
            }
        };
    }, []);

    return { isAuthenticated, hasStoredInviteCode };
};
