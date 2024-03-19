import { mergeStyleSets } from '@fluentui/react';

interface ICarePlanClassNames {
    'wc-PhotoUpload--Persona': string;
}

export const getClassNames = (): ICarePlanClassNames => {
    return mergeStyleSets({
        'wc-PhotoUpload--Persona': { paddingLeft: 40 },
    });
};
