import { FontWeights, mergeStyleSets } from '@fluentui/react';
import { colors } from 'src/common/styles/colors';
import { BREAKPOINTS } from 'src/app/Breakpoints';

interface IFAQClassNames {
    'wc-FAQ--question': string;
    'wc-FAQ--answer': string;
    'wc-FAQ--label': string;
    'wc-FAQ--listContainer': string;
    'wc-FAQ--link': string;
    'wc-FAQ--panelHeader': string;
    'wc-FAQ--removeButton': string;
    'wc-FAQ--desktopPageContainer': string;
    'wc-FAQ--separator': string;
    'wc-FAQ--questionAndAnswer': string;
}

const desktopHeightOffset: number = 60;

export const getClassNames = (height?: number): IFAQClassNames => {
    const DESKTOP_HEIGHT_OFFSET = height - desktopHeightOffset;
    return mergeStyleSets({
        'wc-FAQ--desktopPageContainer': {
            height: DESKTOP_HEIGHT_OFFSET,
            borderRadius: '12px 0px 0px',
            backgroundColor: colors.windcrest.pageBackground,
            [BREAKPOINTS.MOBILE]: {
                padding: '0 10px',
            },
        },
        'wc-FAQ--listContainer': {
            backgroundColor: colors.windcrest.pageBackground,
            padding: '10px 40px 0px 70px',
            fontSize: '16px',
            overflowY: 'auto',
            [BREAKPOINTS.MOBILE]: {
                padding: '0px',
                height: '100%',
            },
        },
        'wc-FAQ--question': {
            fontWeight: FontWeights.bold,
        },
        'wc-FAQ--answer': {},
        'wc-FAQ--label': {
            fontSize: '30px',
        },
        'wc-FAQ--link': {
            textDecoration: 'none',
            color: colors.fabric.neutrals.WCprimary,
        },
        'wc-FAQ--panelHeader': {
            height: '40px',
            padding: '0px 21px',
            marginTop: '12px',
            fontSize: '16px',
            fontWeight: FontWeights.semibold,
            justifyContent: 'space-between',
            borderRadius: '12px 0px 0px',
        },
        'wc-FAQ--removeButton': {
            color: colors.fabric.neutrals.WCprimary,
            borderRadius: '100px',
            border: '1px solid',
            height: '40px',
            width: '40px',
        },
        'wc-FAQ--separator': {
            padding: '0px 0px',
        },
        'wc-FAQ--questionAndAnswer': {
            flex: 1,
        },
    });
};
