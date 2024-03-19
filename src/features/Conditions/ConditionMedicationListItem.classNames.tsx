import { mergeStyleSets, FontWeights } from '@fluentui/react';
import { BREAKPOINTS } from 'src/app/Breakpoints';

interface IConditionMedicationListItemClassNames {
    'wc-ConditionMedicationListItem--firstSection': string;
    'wc-ConditionMedicationListItem--itemHeader': string;
    'wc-ConditionMedicationListItem--itemContent': string;
    'wc-ConditionMedicationListItem--itemCell': string;
    'wc-ConditionMedicationListItem--medicationCard': string;
    'wc-ConditionMedicationListItem--container': string;
    'wc-ConditionMedicationListItem--medicationName': string;
}

export const getClassNames = (): IConditionMedicationListItemClassNames => {
    return mergeStyleSets({
        'wc-ConditionMedicationListItem--firstSection': {
            flex: 1,
            overflowX: 'hidden',
            width: 'auto',
            [BREAKPOINTS.DESKTOP_SMALL]: {
                width: '30%',
            },
        },
        'wc-ConditionMedicationListItem--itemHeader': {
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            fontSize: '1rem',
            fontWeight: FontWeights.semibold,
        },
        'wc-ConditionMedicationListItem--itemContent': {
            flex: '1 1 auto',
            overflow: 'hidden',
            marginLeft: 10,
        },
        'wc-ConditionMedicationListItem--itemCell': [
            {
                minHeight: 54,
                paddingTop: 16,
                boxSizing: 'border-box',
                display: 'flex',
            },
        ],
        'wc-ConditionMedicationListItem--medicationCard': {
            ':hover': {
                boxShadow: '0px 0.6px 1.8px rgba(0, 0, 0, 0.1), 0px 3.2px 7.2px rgba(0, 0, 0, 0.13);',
                cursor: 'pointer',
            },
        },
        'wc-ConditionMedicationListItem--container': {
            margin: '16px',
        },
        'wc-ConditionMedicationListItem--medicationName': {
            width: '200px',
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            whiteSspace: 'nowrap',
        },
    });
};
