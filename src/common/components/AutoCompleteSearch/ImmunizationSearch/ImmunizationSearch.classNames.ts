import { mergeStyleSets } from '@fluentui/react';

interface IImmunizationSearchClassNames {
    'wc-ImmunizationSearch--spinner': string;
    'wc-ImmunizationSearch--oneSuggestion': string;
    'wc-ImmunizationSearch--defaultSuggestion': string;
    'wc-ImmunizationSearch--defaultSuggestion-nonClickable': string;
}

const suggestionProperties = {
    margin: '2px',
    width: '95%',
    marginLeft: '16px',
    marginTop: '8px',
    marginBottom: '8px',
};

export const getClassNames = (): IImmunizationSearchClassNames => {
    return mergeStyleSets({
        'wc-ImmunizationSearch--spinner': {
            position: 'relative',
            right: '2rem',
        },
        'wc-ImmunizationSearch--oneSuggestion': {
            margin: '2px',
            width: '95%',
            marginLeft: '16px',
            marginTop: '8px',
            marginBottom: '8px',
        },
        'wc-ImmunizationSearch--defaultSuggestion': {
            ...suggestionProperties,
            paddingLeft: '0px !important',
        },
        'wc-ImmunizationSearch--defaultSuggestion-nonClickable': {
            ...suggestionProperties,
            paddingLeft: '0px !important',
            pointerEvents: 'none',
        },
    });
};
