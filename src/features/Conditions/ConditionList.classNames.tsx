import { mergeStyleSets } from '@fluentui/react';

interface IConditionAddClassNames {
    'wc-ConditionList--container': string;
}

export const getClassNames = (): IConditionAddClassNames => {
    return mergeStyleSets({
        'wc-ConditionList--container': {
            position: 'relative',
            top: -20,
        },
    });
};
