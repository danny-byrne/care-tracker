import { FontWeights, mergeStyleSets } from '@fluentui/react';

interface IImmunizationListClassNames {
    'wc-AllergyList--allergyTitle': string;
}

export const getClassNames = (): IImmunizationListClassNames => {
    return mergeStyleSets({
        'wc-AllergyList--allergyTitle': {
            fontWeight: FontWeights.semibold,
            fontSize: '1rem',
        },
    });
};
