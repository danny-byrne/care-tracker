import { mergeStyleSets } from '@fluentui/react';
import { colors } from 'src/common/styles/colors';

interface IDocumentCardToastClassNames {
    'wc-DocumentCardToast--toastWrapper': string;
    'wc-DocumentCardToast--textContainer': string;
}

export const getClassNames = (): IDocumentCardToastClassNames => {
    return mergeStyleSets({
        'wc-DocumentCardToast--toastWrapper': {
            padding: '16px',
        },
        'wc-DocumentCardToast--textContainer': {
            margin: '12px 0px',
            fontSize: '1rem',
            color: colors.fabric.neutrals.gray160,
        },
    });
};
