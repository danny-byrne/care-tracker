import { FontWeights, mergeStyleSets } from '@fluentui/react';

interface IPharmacyListClassNames {
    'wc-PharmacyList--pharmacyTitle': string;
}

export const getClassNames = (): IPharmacyListClassNames => {
    return mergeStyleSets({
        'wc-PharmacyList--pharmacyTitle': {
            fontWeight: FontWeights.semibold,
            fontSize: '1rem',
        },
    });
};
