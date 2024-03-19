import { mergeStyleSets } from '@fluentui/react';

interface IAccordionClassNames {
    'wc-Accordion--chevron': string;
}

export const getClassNames = (): IAccordionClassNames => {
    return mergeStyleSets({
        'wc-Accordion--chevron': {
            alignSelf: 'center',
            cursor: 'pointer',
            marginTop: '24px',
            fontSize: '12px',
        },
    });
};
