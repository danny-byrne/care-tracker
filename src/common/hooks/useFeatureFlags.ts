import { useState } from 'react';
import { LOCAL_STORAGE_KEYS } from 'src/app/Strings';

const setAnnotationEnabled = (value: boolean) => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.ANNOTATION_FEATURE_FLAG, value.toString());
    window.dispatchEvent(new Event('storage'));
};

const setHomePageEnabled = (value: boolean) => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.HOME_PAGE_FEATURE_FLAG, value.toString());
    window.dispatchEvent(new Event('storage'));
};

const setWelcomeMessageEnabled = (value: boolean) => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.WELCOME_MESSAGE_FEATURE_FLAG, value.toString());
    window.dispatchEvent(new Event('storage'));
};

const setTodayViewEnabled = (value: boolean) => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.TODAY_VIEW_FEATURE_FLAG, value.toString());
    window.dispatchEvent(new Event('storage'));
};

const setSixMonthToolkitEnabled = (value: boolean) => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.SIX_MONTH_TOOLKIT_FEATURE_FLAG, value.toString());
    window.dispatchEvent(new Event('storage'));
};

const setSuggestedArticleEnabled = (value: boolean) => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.SUGGESTED_ARTICLE_FEATURE_FLAG, value.toString());
    window.dispatchEvent(new Event('storage'));
};

const setPositivitySlotEnabled = (value: boolean) => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.POSITIVITY_SLOT_FEATURE_FLAG, value.toString());
    window.dispatchEvent(new Event('storage'));
};

const getHomePageLocalStorageState = () => {
    return localStorage.getItem(LOCAL_STORAGE_KEYS.HOME_PAGE_FEATURE_FLAG) === 'true';
};

const getAnnotationLocalStorageState = () => {
    return localStorage.getItem(LOCAL_STORAGE_KEYS.ANNOTATION_FEATURE_FLAG) === 'true';
};

const getWelcomeMessageLocalStorageState = () => {
    return localStorage.getItem(LOCAL_STORAGE_KEYS.WELCOME_MESSAGE_FEATURE_FLAG) === 'true';
};

const getTodayViewLocalStorageState = () => {
    return localStorage.getItem(LOCAL_STORAGE_KEYS.TODAY_VIEW_FEATURE_FLAG) === 'true';
};

const getSixMonthToolkitLocalStorageState = () => {
    return localStorage.getItem(LOCAL_STORAGE_KEYS.SIX_MONTH_TOOLKIT_FEATURE_FLAG) === 'true';
};

const getSuggestedArticleLocalStorageState = () => {
    return localStorage.getItem(LOCAL_STORAGE_KEYS.SUGGESTED_ARTICLE_FEATURE_FLAG) === 'true';
};

const getPositivitySlotLocalStorageState = () => {
    return localStorage.getItem(LOCAL_STORAGE_KEYS.POSITIVITY_SLOT_FEATURE_FLAG) === 'true';
};

// localStorage custom react hook.
export const useFeatureFlags = () => {
    const [homePageState, setHomePageState] = useState(getHomePageLocalStorageState());
    const [annotationState, setAnnotationState] = useState(getAnnotationLocalStorageState());
    const [welcomeMessageState, setWelcomeMessageState] = useState(getWelcomeMessageLocalStorageState());
    const [todayViewState, setTodayViewState] = useState(getTodayViewLocalStorageState());
    const [sixMonthToolkitState, setSixMonthToolkitState] = useState(getSixMonthToolkitLocalStorageState());
    const [suggestedArticleState, setSuggestedArticleState] = useState(getSuggestedArticleLocalStorageState());
    const [positivitySlotState, setPositivitySlotState] = useState(getPositivitySlotLocalStorageState());

    window.addEventListener('storage', () => {
        const homePageFlag = localStorage.getItem(LOCAL_STORAGE_KEYS.HOME_PAGE_FEATURE_FLAG) === 'true';
        setHomePageState(homePageFlag);

        const annotationFlag = localStorage.getItem(LOCAL_STORAGE_KEYS.ANNOTATION_FEATURE_FLAG) === 'true';
        setAnnotationState(annotationFlag);

        const welcomeMessageFlag = localStorage.getItem(LOCAL_STORAGE_KEYS.WELCOME_MESSAGE_FEATURE_FLAG) === 'true';
        setWelcomeMessageState(welcomeMessageFlag);

        const todayViewFlag = localStorage.getItem(LOCAL_STORAGE_KEYS.TODAY_VIEW_FEATURE_FLAG) === 'true';
        setTodayViewState(todayViewFlag);

        const sixMonthToolkitFlag = localStorage.getItem(LOCAL_STORAGE_KEYS.SIX_MONTH_TOOLKIT_FEATURE_FLAG) === 'true';
        setSixMonthToolkitState(sixMonthToolkitFlag);

        const suggestedArticleFlag = localStorage.getItem(LOCAL_STORAGE_KEYS.SUGGESTED_ARTICLE_FEATURE_FLAG) === 'true';
        setSuggestedArticleState(suggestedArticleFlag);

        const positivitySlotFlag = localStorage.getItem(LOCAL_STORAGE_KEYS.POSITIVITY_SLOT_FEATURE_FLAG) === 'true';
        setPositivitySlotState(positivitySlotFlag);

        if (
            annotationFlag === false &&
            welcomeMessageFlag === false &&
            todayViewFlag === false &&
            sixMonthToolkitFlag === false &&
            suggestedArticleFlag === false &&
            positivitySlotFlag === false &&
            homePageFlag
        ) {
            setHomePageEnabled(false);
        } else if (
            homePageFlag === false &&
            (annotationFlag === true ||
                welcomeMessageFlag === true ||
                todayViewFlag === true ||
                sixMonthToolkitFlag === true ||
                suggestedArticleFlag === true ||
                positivitySlotFlag === true)
        ) {
            setHomePageEnabled(true);
        }
    });

    return {
        homePageState,
        annotationState,
        setAnnotationEnabled,
        setHomePageEnabled,
        welcomeMessageState,
        setWelcomeMessageEnabled,
        todayViewState,
        setTodayViewEnabled,
        sixMonthToolkitState,
        setSixMonthToolkitEnabled,
        suggestedArticleState,
        setSuggestedArticleEnabled,
        positivitySlotState,
        setPositivitySlotEnabled,
    };
};
