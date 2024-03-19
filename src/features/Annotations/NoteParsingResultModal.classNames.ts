import { mergeStyleSets } from '@fluentui/react';

interface INoteParsingResultModalClassNames {
    'wc-NoteParsingResultModal--container': string;
    'wc-NoteParsingResultModal--resultCategory': string;
}

export const getClassNames = (): INoteParsingResultModalClassNames => {
    return mergeStyleSets({
        'wc-NoteParsingResultModal--container': {
            marginLeft: '12px',
            marginRight: '12px',
            marginBottom: '30px',
        },
        'wc-NoteParsingResultModal--resultCategory': {
            marginBottom: '30px',
        },
    });
};
