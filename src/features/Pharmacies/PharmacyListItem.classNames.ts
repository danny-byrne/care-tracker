import { FontWeights, mergeStyleSets } from '@fluentui/react';
import { colors } from 'src/common/styles/colors';

interface IPharmacyListItemClassNames {
    'wc-PharmacyListItem--name': string;
    'wc-PharmacyListItem--phone': string;
    'wc-PharmacyListItem--itemCell': string;
    'wc-PharmacyListItem--pharmacyCard': string;
    'wc-PharmacyListItem--container': string;
}

export const getClassNames = (): IPharmacyListItemClassNames => {
    return mergeStyleSets({
        'wc-PharmacyListItem--name': {
            fontSize: '1rem',
            fontWeight: FontWeights.semibold,
        },
        'wc-PharmacyListItem--phone': {
            fontWeight: FontWeights.semibold,
            color: colors.fabric.neutrals.WCprimary,
            // Making phone width shorter to prevent accidental clicks on link
            width: '35%',
            textDecoration: 'none',
        },
        'wc-PharmacyListItem--itemCell': [
            {
                minHeight: 54,
                paddingTop: 16,
                boxSizing: 'border-box',
                display: 'flex',
            },
        ],
        'wc-PharmacyListItem--container': {
            margin: '16px',
        },
        'wc-PharmacyListItem--pharmacyCard': {
            ':hover': {
                boxShadow: '0px 0.6px 1.8px rgba(0, 0, 0, 0.1), 0px 3.2px 7.2px rgba(0, 0, 0, 0.13);',
                cursor: 'pointer',
            },
        },
    });
};
