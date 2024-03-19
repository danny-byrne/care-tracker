import { FontWeights, mergeStyleSets } from '@fluentui/react';
import { colors } from 'src/common/styles/colors';

interface IDocumentAnswerClassNames {
    'wc-DocumentAnswer--questionText': string;
    'wc-DocumentAnswer--answerText': string;
    'wc-DocumentAnswer--explainButton': string;
    'wc-DocumentAnswer--lineContainer': string;
    'wc-DocumentAnswer--helpfulStack': string;
    'wc-DocumentAnswer--helpfulText': string;
    'wc-DocumentAnswer--foundInStack': string;
    'wc-DocumentAnswer--foundInTitleText': string;
    'wc-DocumentAnswer--foundInDocumentTitle': string;
    'wc-DocumentAnswer--foundInText': string;
}

export const getClassNames = (): IDocumentAnswerClassNames => {
    return mergeStyleSets({
        'wc-DocumentAnswer--questionText': {
            fontSize: '1.25rem',
            fontWeight: FontWeights.bold,
            lineHeight: '1.375rem',
        },
        'wc-DocumentAnswer--answerText': {
            lineHeight: '1.375rem',
        },
        'wc-DocumentAnswer--explainButton': {
            width: '40%',
        },
        'wc-DocumentAnswer--helpfulStack': {
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        'wc-DocumentAnswer--lineContainer': {
            width: '100vw',
        },
        'wc-DocumentAnswer--helpfulText': {
            fontSize: '0.75rem',
            lineHeight: '1rem',
        },
        'wc-DocumentAnswer--foundInStack': {
            display: 'inline',
        },
        'wc-DocumentAnswer--foundInTitleText': {
            fontSize: '0.875rem',
            fontWeight: FontWeights.semibold,
        },
        'wc-DocumentAnswer--foundInDocumentTitle': {
            fontSize: '0.875rem',
            fontWeight: FontWeights.semibold,
            color: colors.fabric.neutrals.WCprimary,
        },
        'wc-DocumentAnswer--foundInText': {
            lineHeight: '1.375rem',
            fontStyle: 'italic',
            whiteSpace: 'pre-wrap',
        },
    });
};
