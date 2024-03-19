import { mergeStyleSets } from '@fluentui/react';

interface IViewMedicationsClassNames {
    'wc-MedicationEdit--formContainer': string;
}

export const getClassNames = (): IViewMedicationsClassNames => {
    return mergeStyleSets({
        'wc-MedicationEdit--formContainer': {
            padding: '15px 0px',
        },
    });
};
