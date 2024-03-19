import { FontSizes, FontWeights, mergeStyleSets } from '@fluentui/react';
import { BREAKPOINTS } from 'src/app/Breakpoints';
import { colors } from 'src/common/styles/colors';

interface IWindcrestPageHeaderClassNames {
    'wc-WindcrestPageHeader--container': string;
    'wc-WindcrestPageHeader--appProfileButton': string;
    'wc-WindcrestPageHeader--mobileTitleText': string;
    'wc-WindcrestPageHeader--iconItem': string;
}

export const getClassNames = (): IWindcrestPageHeaderClassNames => {
    return mergeStyleSets({
        'wc-WindcrestPageHeader--container': {
            height: '56px',
            backgroundColor: colors.windcrest.headerBackground,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0px 16px',
            [BREAKPOINTS.DESKTOP_SMALL]: {
                padding: '0px 4px',
            },
        },
        'wc-WindcrestPageHeader--appProfileButton': {
            backgroundColor: 'transparent',
            border: 'none',
            cursor: 'pointer',
            minWidth: '0px',
            padding: '0px',
        },
        'wc-WindcrestPageHeader--mobileTitleText': {
            fontWeight: FontWeights.semibold,
            fontSize: FontSizes.size16,
            display: 'flex',
            alignItems: 'center',
            paddingLeft: '8px',
        },
        'wc-WindcrestPageHeader--iconItem': {
            i: {
                height: '25px',
            },
        },
    });
};
