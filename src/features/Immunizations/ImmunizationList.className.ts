import { FontWeights, mergeStyleSets } from '@fluentui/react';

interface IImmunizationListClassNames {
    'wc-ImmunizationList--immunizationTitle': string;
}

export const getClassNames = (): IImmunizationListClassNames => {
    return mergeStyleSets({
        'wc-ImmunizationList--immunizationTitle': {
            fontWeight: FontWeights.semibold,
            fontSize: '1rem',
        },
    });
};
