import { mergeStyleSets, FontWeights } from '@fluentui/react';
import { colors } from 'src/common/styles/colors';

interface IConditionAddClassNames {
    'wc-ConditionListItem--itemCell': string;
    'wc-ConditionListItem--name': string;
    'wc-ConditionListItem--timeframe': string;
    'wc-ConditionListItem--noStartDate': string;
    'wc-ConditionListItem--ConditionCard': string;
    'wc-ConditionListItem--container': string;
}

export const getClassNames = (): IConditionAddClassNames => {
    return mergeStyleSets({
        'wc-ConditionListItem--itemCell': [
            {
                minHeight: 54,
                paddingTop: 16,
                boxSizing: 'border-box',
                display: 'flex',
            },
        ],
        'wc-ConditionListItem--name': {
            fontSize: '1rem',
            fontWeight: FontWeights.semibold,
        },
        'wc-ConditionListItem--timeframe': {
            fontSize: '1rem',
            whiteSpace: 'pre',
        },
        'wc-ConditionListItem--noStartDate': {
            fontSize: '1rem',
            whiteSpace: 'pre',
            color: colors.fabric.neutrals.WCprimary,
        },
        'wc-ConditionListItem--ConditionCard': {
            ':hover': {
                boxShadow: '0px 0.6px 1.8px rgba(0, 0, 0, 0.1), 0px 3.2px 7.2px rgba(0, 0, 0, 0.13);',
                cursor: 'pointer',
            },
        },
        'wc-ConditionListItem--container': {
            margin: '16px',
        },
    });
};
