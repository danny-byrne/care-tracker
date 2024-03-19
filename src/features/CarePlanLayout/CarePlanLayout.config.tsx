import RouterConfig from 'src/app/RouterConfig';
import { SubNavigationButtonProps } from 'src/types/SubNavigation';

export const carePlanSubNavigationsButtons: SubNavigationButtonProps[] = [
    {
        key: 'profile',
        label: 'Profile',
        url: RouterConfig.CarePlan,
    },
    {
        key: 'documents',
        label: 'Documents',
        url: RouterConfig.Documents,
    },
    {
        key: 'timeline',
        label: 'Timeline',
        url: RouterConfig.Timeline,
    },
];
