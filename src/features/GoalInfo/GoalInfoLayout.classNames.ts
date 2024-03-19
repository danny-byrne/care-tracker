import { mergeStyleSets, FontWeights } from '@fluentui/react';
import { BREAKPOINTS, MAX_HEIGHT_BREAKPOINT } from 'src/app/Breakpoints';

interface IGoalInfoCarePlanClassNames {
    'wc-GoalInfoLayout--pageContainer': string;
    'wc-GoalInfoLayout--cardContainer': string;
    'wc-GoalInfoLayout--contentContainer': string;
    'wc-GoalInfoLayout--persona': string;
    'wc-GoalInfoLayout--title': string;
    'wc-GoalInfoLayout--subtitle': string;
    'wc-GoalInfoLayout--button': string;
    'wc-GoalInfoLayout--disclaimerText': string;
    'wc-GoalInfoLayout--backButtonContainer': string;
    'wc-GoalInfoLayout--backButtonText': string;
}

export const getClassNames = (themeColor, disclaimerText): IGoalInfoCarePlanClassNames => {
    return mergeStyleSets({
        'wc-GoalInfoLayout--pageContainer': {
            height: '100vh',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            overflow: 'scroll',
            [BREAKPOINTS.DESKTOP_SMALL]: {
                alignItems: 'center',
            },
            [BREAKPOINTS.DESKTOP_HEIGHT]: {
                height: `${MAX_HEIGHT_BREAKPOINT}px`,
            },
        },
        'wc-GoalInfoLayout--cardContainer': {
            marginTop: '127px',
            background: 'white',
            marginLeft: '24px',
            marginRight: '24px',
            marginBottom: '24px',
            borderRadius: '12px',
            // constant height so cards are consistent between screens
            height: '424px',
            justifyContent: 'center',
            position: 'relative',
            [BREAKPOINTS.DESKTOP_SMALL]: {
                marginTop: '184px',
                marginLeft: '228px',
                marginRight: '228px',
                maxWidth: '439px',
            },
        },
        'wc-GoalInfoLayout--contentContainer': {
            alignItems: 'center',
            padding: '0 24px',
        },
        'wc-GoalInfoLayout--persona': {
            marginLeft: '40px',
            marginTop: '40px',
        },
        'wc-GoalInfoLayout--title': {
            marginTop: '40px',
            fontWeight: FontWeights.semibold,
            fontSize: '1.75rem',
            whiteSpace: 'pre-line',
            lineHeight: '36px',
            color: themeColor,
            textAlign: 'center',
        },
        'wc-GoalInfoLayout--subtitle': {
            fontWeight: FontWeights.semibold,
            fontSize: '1rem',
            lineHeight: '20px',
            marginTop: '16px',
            whiteSpace: 'pre-line',
            color: themeColor,
            textAlign: 'center',
            opacity: '0.8',
        },
        'wc-GoalInfoLayout--button': {
            marginTop: '24px',
            width: '162px',
            // Margin below button is different if no disclaimer text is given
            marginBottom: disclaimerText === undefined ? '40px' : '24px',
        },
        'wc-GoalInfoLayout--disclaimerText': {
            marginBottom: '40px',
            whiteSpace: 'pre-line',
            lineHeight: '20px',
            color: themeColor,
            textAlign: 'center',
        },
        'wc-GoalInfoLayout--backButtonContainer': {
            cursor: 'pointer',
            position: 'absolute',
            left: '16px',
            top: '16px',
        },
        'wc-GoalInfoLayout--backButtonText': {
            color: themeColor,
            fontSize: '1rem',
            fontWeight: FontWeights.semibold,
        },
    });
};
