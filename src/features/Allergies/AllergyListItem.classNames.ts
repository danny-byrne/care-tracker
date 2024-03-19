import { FontWeights, mergeStyleSets } from '@fluentui/react';

interface IAllergyListItemClassNames {
    'wc-AllergyListItem--name': string;
    'wc-AllergyListItem--itemCell': string;
    'wc-AllergyListItem--allergyCard': string;
    'wc-AllergyListItem--container': string;
}

export const getClassNames = (): IAllergyListItemClassNames => {
    return mergeStyleSets({
        'wc-AllergyListItem--name': {
            fontSize: '1rem',
            fontWeight: FontWeights.semibold,
        },
        'wc-AllergyListItem--itemCell': [
            {
                minHeight: 54,
                paddingTop: 16,
                boxSizing: 'border-box',
                display: 'flex',
            },
        ],
        'wc-AllergyListItem--container': {
            margin: '16px',
        },
        'wc-AllergyListItem--allergyCard': {
            ':hover': {
                boxShadow: '0px 0.6px 1.8px rgba(0, 0, 0, 0.1), 0px 3.2px 7.2px rgba(0, 0, 0, 0.13);',
                cursor: 'pointer',
            },
        },
    });
};
