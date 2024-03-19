import { FontWeights, mergeStyleSets } from '@fluentui/react';

interface IActionsClassNames {
    'wc-AllergyForm--editAllergynName': string;
    'wc-AllergyForm--allergyNameFields': string;
}

export const getClassNames = (): IActionsClassNames => {
    return mergeStyleSets({
        'wc-AllergyForm--editAllergynName': {
            fontWeight: FontWeights.semibold,
            fontSize: '1.5rem',
        },
        'wc-AllergyForm--allergyNameFields': {
            flex: 1,
        },
    });
};
