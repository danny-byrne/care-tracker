import RouterConfig from 'src/app/RouterConfig';

export const NavButtonInfoList: NavButtonInfo[] = [
    {
        fullPageName: 'Home',
        shortenedPageName: 'Home',
        icon: 'Home',
        selectedIcon: 'HomeSolid',
        navigationUrl: RouterConfig.DashboardPage,
    },
    {
        fullPageName: 'Med Manager',
        shortenedPageName: 'Meds',
        icon: 'Pill',
        selectedIcon: 'Pill',
        navigationUrl: RouterConfig.Medications,
    },
    {
        fullPageName: 'Together Time',
        shortenedPageName: 'Time',
        icon: 'Group',
        selectedIcon: 'Group',
        navigationUrl: RouterConfig.TogetherTimeLayout,
    },
];

export type NavButtonInfo = {
    fullPageName: string;
    shortenedPageName: string;
    icon: any;
    selectedIcon: any;
    navigationUrl: string;
};
