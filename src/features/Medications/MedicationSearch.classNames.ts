import { mergeStyleSets } from '@fluentui/react';

interface IViewTodayClassNames {
    'wc-MedicationSearch--spinner': string;
}

export const getClassNames = (): IViewTodayClassNames => {
    return mergeStyleSets({
        'wc-MedicationSearch--spinner': {
            position: 'relative',
            right: '2rem',
        },
    });
};
