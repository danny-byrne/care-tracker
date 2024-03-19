import { FontWeights, mergeStyleSets } from '@fluentui/react';
import { colors } from 'src/common/styles/colors';
interface IAnnotationEmptyStateClassNames {
    'wc-AnnotationEmptyState--horizontalLine': string;
}

const sidePadding = 40;

export const getClassNames = (): IAnnotationEmptyStateClassNames => {
    return mergeStyleSets({
        'wc-AnnotationEmptyState--horizontalLine': {
            backgroundColor: colors.windcrest.gray,
            height: '1px',
            width: '100%',
            position: 'relative',
            top: 5,
        },
        'wc-AnnotationEmptyState--labelText': {
            fontWeight: FontWeights.semibold,
            color: '#67676D',
        },
        'wc-AnnotationEmptyState--icon': {
            position: 'relative',
            top: 2,
        },
        'wc-AnnotationEmptyState--instructionText': {
            color: '#67676D',
            fontWeight: FontWeights.regular,
            fontSize: 18,
            width: '70%',
            textAlign: 'center',
            letterSpacing: -0.5,
        },
        'wc-AnnotationEmptyState--exampleBox': {
            backgroundColor: colors.fabric.neutrals.gray20,
            color: '#383966',
            fontWeight: FontWeights.regular,
            maxWidth: '100%',
            height: 65,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            fontStyle: 'italic',
            borderRadius: 10,
            paddingLeft: sidePadding,
            paddingRight: sidePadding,
        },
    });
};
