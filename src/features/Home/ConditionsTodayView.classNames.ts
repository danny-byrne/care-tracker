import { FontWeights, mergeStyleSets } from '@fluentui/react';

interface IConditionsTodayViewNames {
    'wc-ConditionsTodayView--container': string;
    'wc-ConditionsTodayView--todayLabel': string;
    'wc-ConditionsTodayView--todayInstructions': string;
    'wc-ConditionsTodayView--showMoreText': string;
    'wc-ConditionsTodayView--ellipses': string;
    'wc-ConditionsTodayView--infoIcon': string;
}

export const getClassNames = (): IConditionsTodayViewNames => {
    return mergeStyleSets({
        'wc-ConditionsTodayView--container': {
            marginTop: 20,
        },
        'wc-ConditionsTodayView--todayLabel': {
            fontWeight: FontWeights.semibold,
            fontSize: '16px',
        },
        'wc-ConditionsTodayView--conditionLabel': {
            fontWeight: FontWeights.regular,
            fontSize: '16px',
        },
        'wc-ConditionsTodayView--todayInstructions': {
            fontWeight: FontWeights.regular,
            fontSize: '16px',
            position: 'relative',
            top: 2,
        },
        'wc-ConditionsTodayView--showMoreText': {
            fontWeight: FontWeights.semibold,
            fontSize: '14px',
            color: '#4426D9',
        },
        'wc-ConditionsTodayView--ellipses': {
            position: 'relative',
            fontSize: '16px',
            top: -4,
        },
        'wc-ConditionsTodayView--infoIcon': {
            position: 'relative',
            top: 2,
        },
    });
};
