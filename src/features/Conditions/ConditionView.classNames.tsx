import { FontWeights, mergeStyleSets } from '@fluentui/react';

interface IConditionAddClassNames {
    'wc-ConditionView--viewContainer': string;
    'wc-ConditionView--conditionName': string;
    'wc-ConditionView--activeStatus': string;
    'wc-ConditionView--actionButtons': string;
    'wc-ConditionView--label': string;
    'wc-ConditionView--dateText': string;
    'wc-ConditionView--dateLabel': string;
}

export const getClassNames = (): IConditionAddClassNames => {
    return mergeStyleSets({
        'wc-ConditionView--viewContainer': {},
        'wc-ConditionView--nameAndStatusContainer': {
            alignItems: 'center',
        },
        'wc-ConditionView--conditionName': {
            marginTop: 20,
            fontSize: '24px',
            lineHeight: '32px',
            fontWeight: FontWeights.semibold,
        },
        'wc-ConditionView--activeStatus': {
            fontSize: '14px',
            lineHeight: '20px',
            fontWeight: FontWeights.semibold,
        },
        'wc-ConditionView--seperator': {},
        'wc-ConditionView--timeframeContainer': {
            paddingTop: '5px',
            paddingBottom: '5px',
        },
        'wc-ConditionView--timeframeLabel': {
            fontSize: '14px',
            fontWeight: FontWeights.regular,
            lineHeight: '20px',
        },
        'wc-ConditionView--dateLabel': {
            fontSize: '16px',
            lineHeight: '22px',
            fontWeight: FontWeights.regular,
        },
        'wc-ConditionView--dateText': {
            fontSize: '16px',
            lineHeight: '22px',
            fontWeight: FontWeights.semibold,
        },
        'wc-ConditionView--actionButtons': {
            paddingBottom: '20px',
        },
        'wc-ConditionView--label': {
            fontSize: '16px',
            fontWeight: FontWeights.semibold,
            lineHeight: '22px',
        },
    });
};
