import { mergeStyleSets, FontWeights } from '@fluentui/react';
import { BREAKPOINTS, MAX_HEIGHT_BREAKPOINT } from 'src/app/Breakpoints';
import { colors } from 'src/common/styles/colors';

interface IGoalsPageClassNames {
    'wc-GoalsPage--container': string;
    'wc-GoalsPage--headerText': string;
    'wc-GoalsPage--subHeaderText': string;
    'wc-GoalsPage--goalStackContainer': string;
    'wc-GoalsPage--goalChoiceContainer': string;
    'wc-GoalsPage--goalChoiceSubContainer': string;
    'wc-GoalsPage--goalChoiceButton': string;
    'wc-GoalsPage--goalChoiceText': string;
}

export const getClassNames = (): IGoalsPageClassNames => {
    return mergeStyleSets({
        'wc-GoalsPage--container': {
            height: '100vh',
            background: colors.windcrest.pageBackground,
            display: 'flex',
            alignItems: 'center',
            paddingTop: '48px',
            overflow: 'scroll',
            [BREAKPOINTS.DESKTOP_HEIGHT]: {
                height: `${MAX_HEIGHT_BREAKPOINT}px`,
            },
        },
        'wc-GoalsPage--headerText': {
            fontSize: '1rem',
        },
        'wc-GoalsPage--subHeaderText': {
            fontSize: '1.5rem',
            fontWeight: FontWeights.semibold,
        },
        'wc-GoalsPage--goalStackContainer': {
            width: '100%',
            paddingLeft: '24px',
            paddingRight: '24px',
            paddingTop: '16px',
            paddingBottom: '16px',
            [BREAKPOINTS.DESKTOP_SMALL]: {
                paddingRight: '93.5px',
                paddingLeft: '40px',
                maxWidth: '741px',
            },
        },
        'wc-GoalsPage--goalChoiceContainer': {
            width: '100%',
            borderRadius: '12px',
            height: '9.25rem',
        },
        'wc-GoalsPage--goalChoiceSubContainer': {
            width: '100%',
            paddingLeft: '24px',
            height: '100%',
            display: 'block',
            position: 'relative',
        },
        'wc-GoalsPage--goalChoiceButton': {
            backgroundColor: 'white',
            width: '106px',
            bottom: '16px',
            position: 'absolute',
            border: 'none',
        },
        'wc-GoalsPage--goalChoiceText': {
            fontWeight: FontWeights.semibold,
            fontSize: '1.5rem',
            lineHeight: '2rem',
            position: 'absolute',
            top: '16px',
            whiteSpace: 'pre-line',
        },
    });
};
