import { mergeStyleSets } from '@fluentui/react';
import { colors } from 'src/common/styles/colors';
import { palette } from 'src/theme/Palette';

interface IDocumentQuestionInputClassNames {
    'wc-DocumentQuestionInput--stack': string;
    'wc-DocumentQuestionInput--historyButton': string;
    'wc-DocumentQuestionInput--textFieldContainer': string;
    'wc-DocumentQuestionInput--pills': string;
}

export const getClassNames = (): IDocumentQuestionInputClassNames => {
    return mergeStyleSets({
        'wc-DocumentQuestionInput--stack': {
            width: '100%',
            // height: '240px',
            padding: '16px',
            backgroundColor: colors.windcrest.headerBackground,
        },
        'wc-DocumentQuestionInput--historyButton': {
            color: palette.themePrimary,
        },
        'wc-DocumentQuestionInput--textFieldContainer': {
            position: 'relative',
            display: 'inline-block',
        },
        'wc-DocumentQuestionInput--pills': {},
    });
};
