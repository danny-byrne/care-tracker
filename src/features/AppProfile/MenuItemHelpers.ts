import { isConsentRequired, manageConsent } from 'src/wcpConsentInit';
import RouterConfig from 'src/app/RouterConfig';
import { NavigateFunction } from 'react-router';

// iconNames are placeholders while determining where to find icons from Figma
// nav('/') is a placeholder until new pages are set up
export const getMenuItems = (navigateToMenuItem: (menuItem: string) => void) => {
    const firstHalf = [
        //disabling setting notificaitons preferences for now
        // {
        //     title: APP_PROFILE_PAGE_NAMES['notifications'],
        //     iconName: 'Ringer',
        //     onClick: () => navigateToMenuItem('notifications'),
        // },
        {
            title: APP_PROFILE_PAGE_NAMES['dataStorage'],
            iconName: 'OfflineStorage',
            onClick: () => navigateToMenuItem('dataStorage'),
        },
        {
            title: APP_PROFILE_PAGE_NAMES['privacy'],
            iconName: 'Lock',
            onClick: () => navigateToMenuItem('privacy'),
        },
        {
            title: APP_PROFILE_PAGE_NAMES['featureFlags'],
            iconName: 'Lock',
            onClick: () => navigateToMenuItem('featureFlags'),
        },
    ];

    // const secondHalf = [
    //     {
    //         title: APP_PROFILE_PAGE_NAMES['terms'],
    //         iconName: 'Document',
    //         onClick: setShowComingSoon,
    //     },
    //     {
    //         title: APP_PROFILE_PAGE_NAMES['about'],
    //         iconName: 'Info',
    //         onClick: setShowComingSoon,
    //     },
    // ];

    // Cookie banner dialog will only show if consent is required from the ip address
    if (isConsentRequired()) {
        return [
            ...firstHalf,
            {
                title: APP_PROFILE_PAGE_NAMES['cookies'],
                iconName: 'Lock',
                onClick: () => manageConsent(),
            },
            // ...secondHalf,
        ];
    }

    return [
        ...firstHalf,
        // ...secondHalf
    ];
};

export const getDataAndStorageMenuItems = (
    navigateToMenuItem: (menuItem: string) => void,
    isMobile: boolean,
    navigate: NavigateFunction,
) => {
    const items = [
        {
            title: DATA_STORAGE_PAGE_NAMES.faq,
            onClick: () => (isMobile ? navigateToMenuItem(DATA_STORAGE_PAGE_NAMES.faq) : navigate(RouterConfig.FAQ)),
        },
        //hiding these for pre-alpha while we figure out compliance
        // {
        //     title: DATA_STORAGE_PAGE_NAMES.dataProtectionNotice,
        //     onClick: () => navigateToMenuItem(DATA_STORAGE_PAGE_NAMES.dataProtectionNotice),
        // },
        // {
        //     title: DATA_STORAGE_PAGE_NAMES.privacyDataManagement,
        //     onClick: setShowComingSoon,
        // },
    ];
    return items;
};

export const APP_PROFILE_PAGE_NAMES = {
    notifications: 'Notifications',
    dataStorage: 'Data & Storage',
    privacy: 'Privacy & Terms',
    cookies: 'Cookies',
    terms: 'Terms of Use',
    about: 'About',
    featureFlags: 'Experimental Features',
};

export const DATA_STORAGE_PAGE_NAMES = {
    faq: 'FAQ',
    dataProtectionNotice: 'Data Protection Notice',
    privacyDataManagement: 'Privacy Data Management',
};
