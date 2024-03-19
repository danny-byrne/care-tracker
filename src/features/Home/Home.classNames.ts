import { FontWeights, mergeStyleSets } from '@fluentui/react';

interface IImmunizationViewClassNames {
    'wc-Home--container': string;
    'wc-Home--header': string;
    'wc-Home--questionsHeader': string;
    'wc-Home--resourceHeader': string;
    'wc-Home--resourceContainer': string;
    'wc-Home--resourceTitle': string;
    'wc-Home--resourceText': string;
}

export const getClassNames = (): IImmunizationViewClassNames => {
    return mergeStyleSets({
        'wc-Home--container': {
            paddingBottom: '100px',
        },
        'wc-Home--header': {
            fontWeight: FontWeights.bold,
            fontSize: '1.875rem',
            lineHeight: '30x',
        },
        'wc-Home--questionsHeader': {
            fontWeight: FontWeights.semibold,
            fontSize: '1rem',
            lineHeight: '22px',
            padding: '16px 0px',
        },
        'wc-Home--resourceHeader': {
            fontWeight: FontWeights.semibold,
            fontSize: '0.875rem',
            paddingTop: '25px',
        },
        'wc-Home--resourceContainer': {
            background: '#FFFFFF',
            boxShadow: '0px 0.3px 0.9px rgba(0, 0, 0, 0.1), 0px 1.6px 3.6px rgba(0, 0, 0, 0.13)',
            borderRadius: '12px',
            padding: '16px',
        },
        'wc-Home--resourceTitle': {
            fontWeight: FontWeights.semibold,
            fontSize: '1rem',
        },
        'wc-Home--resourceText': {
            fontSize: '0.875rem',
        },
    });
};
