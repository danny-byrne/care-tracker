import { FontWeights, mergeStyleSets } from '@fluentui/react';

interface IActionsClassNames {
    'wc-Header--textStyle': string;
}

export const getClassNames = (): IActionsClassNames => {
    return mergeStyleSets({
        'wc-Header--textStyle': {
            fontWeight: FontWeights.semibold,
            marginBottom: '0.25rem',
            marginRight: '0.5rem',
            fontSize: '1rem',
            marginTop: '24px',
        },
    });
};
