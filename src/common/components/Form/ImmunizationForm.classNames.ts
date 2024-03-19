import { FontWeights, mergeStyleSets } from '@fluentui/react';

interface IActionsClassNames {
    'wc-ImmunizationForm--editImmunizationName': string;
    'wc-ImmunizationForm--immunizationNameFields': string;
}

export const getClassNames = (): IActionsClassNames => {
    return mergeStyleSets({
        'wc-ImmunizationForm--editImmunizationName': {
            fontWeight: FontWeights.semibold,
            fontSize: '1.5rem',
        },
        'wc-ImmunizationForm--immunizationNameFields': {
            flex: 1,
        },
    });
};
