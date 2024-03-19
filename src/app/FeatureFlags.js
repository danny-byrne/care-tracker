import { LOCAL_STORAGE_KEYS } from './Strings';

export const FeatureFlags = {
    HOMEPAGE: localStorage.getItem(LOCAL_STORAGE_KEYS.HOME_PAGE_FEATURE_FLAG) === 'true',
};
