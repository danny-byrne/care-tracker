import { mergeStyleSets } from '@fluentui/react';
interface ISearchBoxClassNames {
    'wc-SearchBox--oneSuggestion': string;
    'wc-SearchBox--searchContainer': string;
    'wc-SearchBox--clearButtonHidden': string;
    'wc-SearchBox--suggestionBox': string;
}

export const getClassNames = (hasError): ISearchBoxClassNames => {
    return mergeStyleSets({
        'wc-SearchBox--oneSuggestion': {
            margin: '2px',
            width: '95%',
            marginLeft: '16px',
            marginTop: '8px',
            marginBottom: '8px',
        },
        'wc-SearchBox--searchContainer': {
            width: '100%',
            margin: 'auto',
            border: hasError ? '1px solid red' : null,
            borderRadius: hasError ? 14 : null,
            ':focus': { border: hasError ? '1.2px solid #A80000' : null },
        },
        'wc-SearchBox--clearButtonHidden': {
            display: 'none',
        },
        'wc-SearchBox--suggestionBox': {
            marginTop: '8px',
            marginBottom: '8px',
        },
    });
};
