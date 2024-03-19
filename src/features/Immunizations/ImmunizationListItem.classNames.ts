import { FontWeights, mergeStyleSets } from '@fluentui/react';

interface IImmunizationListItemClassNames {
    'wc-ImmunizationListItem--name': string;
    'wc-ImmunizationListItem--itemCell': string;
    'wc-ImmunizationListItem--immunizationCard': string;
    'wc-ImmunizationListItem--container': string;
}

export const getClassNames = (): IImmunizationListItemClassNames => {
    return mergeStyleSets({
        'wc-ImmunizationListItem--name': {
            fontSize: '1rem',
            fontWeight: FontWeights.semibold,
        },
        'wc-ImmunizationListItem--itemCell': [
            {
                minHeight: 54,
                paddingTop: 16,
                boxSizing: 'border-box',
                display: 'flex',
            },
        ],
        'wc-ImmunizationListItem--container': {
            margin: '16px',
        },
        'wc-ImmunizationListItem--immunizationCard': {
            ':hover': {
                boxShadow: '0px 0.6px 1.8px rgba(0, 0, 0, 0.1), 0px 3.2px 7.2px rgba(0, 0, 0, 0.13);',
                cursor: 'pointer',
            },
        },
    });
};
