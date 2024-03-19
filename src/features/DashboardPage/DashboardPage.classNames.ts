import { mergeStyleSets, FontWeights } from '@fluentui/react';
import { BREAKPOINTS } from 'src/app/Breakpoints';
import { colors } from 'src/common/styles/colors';

interface IDashboardPageClassNames {
    'wc-DashboardPage--root': string;
    'wc-DashboardPage--pageContainer': string;
    'wc-DashboardPage--welcomeTextContainer': string;
    'wc-DashboardPage--welcomeHeaderTextComponent': string;
    'wc-DashboardPage--welcomeBodyTextComponent': string;
    'wc-DashboardPage--temporaryDebugButtonContainer': string;
    'wc-DashboardPage--clearCareCircleDataButton': string;
    'wc-DashboardPage--clearCareCircleDataText': string;
}

export const getClassNames = (): IDashboardPageClassNames => {
    return mergeStyleSets({
        'wc-DashboardPage--root': {
            [BREAKPOINTS.DESKTOP_SMALL]: {
                flexDirection: 'row',
            },
        },
        'wc-DashboardPage--pageContainer': {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },
        'wc-DashboardPage--welcomeTextContainer': {
            marginTop: 16,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },
        'wc-DashboardPage--welcomeHeaderTextComponent': {
            fontSize: 28,
            fontWeight: FontWeights.semibold,
            lineHeight: '2.25rem',
            marginBottom: 0,
        },
        'wc-DashboardPage--welcomeBodyTextComponent': {
            fontSize: 14,
            fontWeight: FontWeights.regular,
            lineHeight: '1.25rem',
            marginTop: 13,
            marginBottom: 29,
        },
        'wc-DashboardPage--temporaryDebugButtonContainer': {
            display: 'flex',
            flexDirection: 'column',
            paddingLeft: 12,
            paddingRight: 12,
            width: 295,
            marginTop: 50,
            [BREAKPOINTS.DESKTOP_SMALL]: {
                width: 440,
            },
        },
        'wc-DashboardPage--clearCareCircleDataButton': {
            marginBottom: 8,
            color: colors.windcrest.red,
            borderColor: colors.windcrest.red,
        },
        'wc-DashboardPage--clearCareCircleDataText': {
            fontWeight: FontWeights.regular,
            fontSize: 14,
            lineHeight: '1.25rem',
            color: colors.windcrest.red,
            borderColor: colors.windcrest.red,
        },
    });
};
