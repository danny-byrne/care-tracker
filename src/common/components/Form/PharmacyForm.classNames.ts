import { FontWeights, mergeStyleSets } from '@fluentui/react';

interface IActionsClassNames {
    'wc-PharmacyForm--editPharmacyName': string;
    'wc-PharmacyForm--pharmacyNameFields': string;
}

export const getClassNames = (): IActionsClassNames => {
    return mergeStyleSets({
        'wc-PharmacyForm--editPharmacyName': {
            fontWeight: FontWeights.semibold,
            fontSize: '1.5rem',
        },
        'wc-PharmacyForm--pharmacyNameFields': {
            flex: 1,
        },
    });
};
