import { FontWeights, mergeStyleSets } from '@fluentui/react';
import { colors } from 'src/common/styles/colors';

interface IProviderListItemClassNames {
    'wc-ProviderListItem--name': string;
    'wc-ProviderListItem--phone': string;
    'wc-ProviderListItem--itemCell': string;
    'wc-ProviderListItem--providerCard': string;
    'wc-ProviderListItem--container': string;
}

export const getClassNames = (): IProviderListItemClassNames => {
    return mergeStyleSets({
        'wc-ProviderListItem--name': {
            fontSize: '1rem',
            fontWeight: FontWeights.semibold,
        },
        'wc-ProviderListItem--phone': {
            fontWeight: FontWeights.semibold,
            color: colors.fabric.neutrals.WCprimary,
            // Making phone width shorter to prevent accidental clicks on link
            width: '35%',
            textDecoration: 'none',
        },
        'wc-ProviderListItem--itemCell': [
            {
                minHeight: 54,
                paddingTop: 16,
                boxSizing: 'border-box',
                display: 'flex',
            },
        ],
        'wc-ProviderListItem--container': {
            margin: '16px',
        },
        'wc-ProviderListItem--providerCard': {
            ':hover': {
                boxShadow: '0px 0.6px 1.8px rgba(0, 0, 0, 0.1), 0px 3.2px 7.2px rgba(0, 0, 0, 0.13);',
                cursor: 'pointer',
            },
        },
    });
};
