import { mergeStyleSets, FontWeights } from '@fluentui/react';
import { BREAKPOINTS } from 'src/app/Breakpoints';
interface ICarePlanClassNames {
    'wc-CarePlan--landingPage': string;
    'wc-CarePlan--accordion': string;
    'wc-CarePlan--title': string;
    'wc-CarePlan--Stack': string;
    'wc-CarePlan--accordionContainer': string;
    'wc-CarePlan--nextStepsContainer': string;
}

export const getClassNames = (): ICarePlanClassNames => {
    return mergeStyleSets({
        'wc-CarePlan--landingPage': {
            marginTop: 20,
            padding: 24,
            width: '100%',
            paddingBottom: '5rem',
            overflow: 'hidden',
        },
        'wc-CarePlan--accordion': {
            marginBottom: 14,
            [BREAKPOINTS.DESKTOP_SMALL]: {
                width: 440,
                marginLeft: 8,
                marginRight: 8,
            },
            width: '120%',
        },
        'wc-CarePlan--title': {
            fontWeight: FontWeights.semibold,
            fontSize: '1.5rem',
            marginBottom: '1rem',
            textTransform: 'capitalize',
        },
        'wc-CarePlan--Stack': {
            width: '100%',
            [BREAKPOINTS.DESKTOP_SMALL]: {
                width: 'auto',
                align: 'start',
            },
        },
        'wc-CarePlan--accordionContainer': {
            width: '100%',
            [BREAKPOINTS.DESKTOP_SMALL]: {
                width: 'auto',
            },
        },
        'wc-CarePlan--nextStepsContainer': {
            justifyContent: 'center',
            width: '100%',
            maxWidth: 480,
        },
    });
};
