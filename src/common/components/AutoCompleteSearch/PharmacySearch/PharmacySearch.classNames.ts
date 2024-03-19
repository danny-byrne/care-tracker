import { mergeStyleSets } from '@fluentui/react';

interface IProviderSearchClassNames {
    'wc-PharmacySearch--spinner': string;
    'wc-PharmacySearch--oneSuggestion': string;
    'wc-PharmacySearch--defaultSuggestion': string;
    'wc-PharmacySearch--defaultSuggestion-nonClickable': string;
}

const suggestionProperties = {
    margin: '2px',
    width: '95%',
    marginLeft: '16px',
    marginTop: '8px',
    marginBottom: '8px',
};

export const getClassNames = (): IProviderSearchClassNames => {
    return mergeStyleSets({
        'wc-PharmacySearch--spinner': {
            position: 'relative',
            right: '2rem',
        },
        'wc-PharmacySearch--oneSuggestion': {
            ...suggestionProperties,
        },
        'wc-PharmacySearch--defaultSuggestion': {
            ...suggestionProperties,
            paddingLeft: '0px !important',
        },
        'wc-PharmacySearch--defaultSuggestion-nonClickable': {
            ...suggestionProperties,
            paddingLeft: '0px !important',
            pointerEvents: 'none',
        },
    });
};
