import { mergeStyleSets } from '@fluentui/react';

interface IConditionSearchClassNames {
    'wc-ConditionSearch--oneSuggestion': string;
    'wc-ConditionSearch--spinner': string;
}

export const getClassNames = (): IConditionSearchClassNames => {
    return mergeStyleSets({
        'wc-ConditionSearch--oneSuggestion': {
            margin: '2px',
            width: '95%',
            marginLeft: '16px',
            marginTop: '8px',
            marginBottom: '8px',
        },
        'wc-ConditionSearch--spinner': {
            position: 'relative',
            right: '2rem',
        },
    });
};
