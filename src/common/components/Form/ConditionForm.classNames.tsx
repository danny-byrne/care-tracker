import { FontWeights, mergeStyleSets } from '@fluentui/react';

interface IConditionFormClassNames {
    'wc-ConditionForm--conditionName': string;
    'wc-ConditionForm--conditionNameContainer': string;
    'wc-ConditionForm--separator': string;
}

export const getClassNames = (): IConditionFormClassNames => {
    return mergeStyleSets({
        'wc-ConditionForm--conditionName': {
            marginTop: 20,
            fontSize: '24px',
            lineHeight: '32px',
            fontWeight: FontWeights.semibold,
        },
        'wc-ConditionForm--conditionNameContainer': {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            alignContent: 'center',
            justifyContent: 'center',
        },
        'wc-ConditionForm--separator': {
            ':not(:first-child)': {
                marginTop: 0,
            },
        },
    });
};
