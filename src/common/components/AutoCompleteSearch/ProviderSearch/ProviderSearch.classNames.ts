import { mergeStyleSets } from '@fluentui/react';

interface IProviderSearchClassNames {
    'wc-ProviderSearch--spinner': string;
    'wc-ProviderSearch--oneSuggestion': string;
    'wc-ProviderSearch--defaultSuggestion': string;
    'wc-ProviderSearch--defaultSuggestion-nonClickable': string;
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
        'wc-ProviderSearch--spinner': {
            position: 'relative',
            right: '2rem',
        },
        'wc-ProviderSearch--oneSuggestion': {
            margin: '2px',
            width: '95%',
            marginLeft: '16px',
            marginTop: '8px',
            marginBottom: '8px',
        },
        'wc-ProviderSearch--defaultSuggestion': {
            ...suggestionProperties,
            paddingLeft: '0px !important',
        },
        'wc-ProviderSearch--defaultSuggestion-nonClickable': {
            ...suggestionProperties,
            paddingLeft: '0px !important',
            pointerEvents: 'none',
        },
    });
};
