import RouterConfig from 'src/app/RouterConfig';
import { SubNavigationButtonProps } from 'src/types/SubNavigation';

export const TogetherTimeSubNavigationButtons: SubNavigationButtonProps[] = [
    // Below buttons are commented out until features are implemented
    // {
    //     key: 'feed',
    //     label: 'Feed',
    //     // url: RouterConfig.TogetherFeed,
    // },
    {
        key: 'activites',
        label: 'Activities',
        url: RouterConfig.Activities,
    },
    {
        key: 'care-circle',
        label: 'Care Circle',
        url: RouterConfig.Members,
    },
];
