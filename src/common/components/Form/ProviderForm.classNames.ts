import { FontWeights, mergeStyleSets } from '@fluentui/react';

interface IActionsClassNames {
    'wc-ProviderForm--editProviderName': string;
    'wc-ProviderForm--providerNameFields': string;
}

export const getClassNames = (): IActionsClassNames => {
    return mergeStyleSets({
        'wc-ProviderForm--editProviderName': {
            fontWeight: FontWeights.semibold,
            fontSize: '1.5rem',
        },
        'wc-ProviderForm--providerNameFields': {
            flex: 1,
        },
    });
};
