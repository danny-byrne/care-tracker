import { mergeStyleSets } from '@fluentui/react';

interface IMedicationsTodayListClassNames {
    'wc-MedicationsTodayContainer--group': string;
    'wc-MedicationsTodayContainer--daytimeWrapper': string;
}

export const getClassNames = (): IMedicationsTodayListClassNames => {
    return mergeStyleSets({
        'wc-MedicationsTodayContainer--group': {},
        'wc-MedicationsTodayContainer--daytimeWrapper': {
            marginTop: '24px',
            marginRight: '0.5rem',
        },
    });
};
