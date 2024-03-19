import { FontWeights, mergeStyleSets } from '@fluentui/react';

interface IProviderListClassNames {
    'wc-ProviderList--providerTitle': string;
}

export const getClassNames = (): IProviderListClassNames => {
    return mergeStyleSets({
        'wc-ProviderList--providerTitle': {
            fontWeight: FontWeights.semibold,
            fontSize: '1rem',
        },
    });
};
