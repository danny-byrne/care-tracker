import { FontWeights, mergeStyleSets } from '@fluentui/react';
import { BREAKPOINTS } from 'src/app/Breakpoints';
import { colors } from 'src/common/styles/colors';

interface IActivitiesClassNames {
    'wc-Activities--accordion': string;
    'wc-Activities--header': string;
    'wc-Activities--subHeader': string;
    'wc-Activities--container': string;
    'wc-Activities--allActivitiesHeader': string;
    'wc-Activities--activityCardList': string;
    'wc-Activities--activityCard': string;
    'wc-Activities--cardContainer': string;
    'wc-Activities--cardTitle': string;
    'wc-Activities--cardText': string;
    'wc-Activities--ftueContainer': string;
    'wc-Activities--newActivityButton': string;
}

export const getClassNames = (): IActivitiesClassNames => {
    return mergeStyleSets({
        'wc-Activities--accordion': {
            marginBottom: 14,
            [BREAKPOINTS.DESKTOP_SMALL]: {
                width: 440,
                marginLeft: 8,
                marginRight: 8,
            },
            width: '120%',
        },
        'wc-Activities--header': {
            fontWeight: FontWeights.semibold,
            fontSize: '1.5rem',
        },
        'wc-Activities--subHeader': {
            fontSize: '1rem',
        },
        'wc-Activities--container': {
            alignItems: 'center',
            paddingBottom: '3rem',
        },
        'wc-Activities--allActivitiesHeader': {
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            paddingBottom: 10,
        },
        'wc-Activities--activityCardList': {
            width: '100%',
        },
        'wc-Activities--fabContainer': {
            position: 'fixed',
            bottom: 130,
            right: 16,
            left: 0,
            backgroundColor: colors.windcrest.pageBackground,
        },
        'wc-Activities--cardContainer': {
            // 100% height doesn't account for padding, calc to remove 16px from top and bottom
            height: 'calc(calc(100%) - 32px)',
            padding: '16px',
            ':hover': {
                boxShadow: '0px 0.6px 1.8px rgba(0, 0, 0, 0.1), 0px 3.2px 7.2px rgba(0, 0, 0, 0.13);',
                cursor: 'pointer',
            },
        },
        'wc-Activities--cardTitle': {
            fontSize: '1rem',
            fontWeight: FontWeights.semibold,
            color: colors.fabric.neutrals.WCprimary,
        },
        'wc-Activities--cardText': {},
        'wc-Activities--ftueContainer': {
            paddingTop: '24px',
        },
        'wc-Activities--newActivityButton': {
            ':hover': {
                backgroundColor: colors.fabric.neutrals.gray20,
            },
        },
        'wc-Activities--activityCard': {
            paddingBottom: 10,
        },

        'wc-Activities--printableContainer': {
            overflow: 'scroll',
        },
    });
};

interface IActivityCardClassNames {
    'wc-ActivityCard--list': string;
    'wc-ActivityCard--container': string;
    'wc-ActivityCard--title': string;
    'wc-ActivityCard--section': string;
    'wc-ActivityCard--mobileCard': string;
    'wc-ActivityCard--itemCell': string;
    'wc-ActivityCard--sectionTitle': string;
    'wc-ActivityCard--availability': string;
    'wc-ActivityCard--icon': string;
    'wc-ActivityCard--phoneNumber': string;
    'wc-ActivityCard--address': string;
}

// Activity card section width has to be calculated
export const getActivityCardClassNames = (numberOfSections: number): IActivityCardClassNames => {
    return mergeStyleSets({
        'wc-ActivityCard--list': {
            width: '100%',
        },
        'wc-ActivityCard--container': {
            width: '100%',
            padding: '16px',
            ':hover': {
                boxShadow: '0px 0.6px 1.8px rgba(0, 0, 0, 0.1), 0px 3.2px 7.2px rgba(0, 0, 0, 0.13);',
                cursor: 'pointer',
            },
        },
        'wc-ActivityCard--title': {
            flex: 1,
            fontWeight: FontWeights.semibold,
            fontSize: '1rem',
        },
        'wc-ActivityCard--section': {
            flex: 1,
            maxWidth: `calc(100%/${numberOfSections})`,
        },
        'wc-ActivityCard--mobileCard': {
            width: '100%',
        },
        'wc-ActivityCard--itemCell': {
            minHeight: 54,
            paddingTop: 16,
            boxSizing: 'border-box',
            display: 'flex',
        },
        'wc-ActivityCard--sectionTitle': {
            fontWeight: FontWeights.semibold,
        },
        'wc-ActivityCard--availability': {
            whiteSpace: 'nowrap',
            maxWidth: '100%',
            overflow: 'hidden',
        },
        'wc-ActivityCard--icon': {
            alignSelf: 'center',
            fontSize: '0.875rem',
        },
        'wc-ActivityCard--phoneNumber': {
            fontWeight: FontWeights.semibold,
            fontSize: '0.875rem',
            color: colors.fabric.neutrals.WCprimary,
            textDecoration: 'none',
        },
        'wc-ActivityCard--address': {
            fontWeight: FontWeights.semibold,
            fontSize: '0.875rem',
            width: '50%',
        },
        'wc-ActivityCard--semiBoldText': {
            fontWeight: FontWeights.semibold,
        },
    });
};
