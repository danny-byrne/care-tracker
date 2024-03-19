import { mergeStyleSets } from '@fluentui/react';
import { colors } from 'src/common/styles/colors';
import { palette } from 'src/theme/Palette';

interface IAnnotationInputClassNames {
    'wc-AnnotationInput--stack': string;
    'wc-AnnotationInput--historyButton': string;
    'wc-AnnotationInput--textFieldContainer': string;
    'wc-AnnotationInput--pills': string;
    'wc-AnnotationInput--inputContainer': string;
}

export const getClassNames = (): IAnnotationInputClassNames => {
    return mergeStyleSets({
        'wc-AnnotationInput--stack': {
            width: '100%',
            height: '240px',
            padding: '16px',
            backgroundColor: colors.windcrest.headerBackground,
        },
        'wc-AnnotationInput--historyButton': {
            color: palette.themePrimary,
        },
        'wc-AnnotationInput--textFieldContainer': {
            position: 'relative',
            display: 'inline-block',
        },
        'wc-AnnotationInput--pills': {
            borderRadius: '0', // Set border-radius to 0 for straight corners
            borderColor: '#D1D1D1',
            color: '#323130',
            fontWeight: 400,
        },
        'wc-AnnotationInput--inputContainer': {},
    });
};
