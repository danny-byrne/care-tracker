import { FontWeights, mergeStyleSets } from '@fluentui/react';

interface IAnnotationListItemClassNames {
    'wc-AnnotationListItem--row': string;
    'wc-AnnotationListItem--card': string;
    'wc-AnnotationListItem--container': string;
    'wc-AnnotationListItem--type': string;
    'wc-AnnotationListItem--date': string;
    'wc-AnnotationListItem--text': string;
    'wc-AnnotationListItem--deleteButton': string;
}

export const getClassNames = (): IAnnotationListItemClassNames => {
    return mergeStyleSets({
        'wc-AnnotationListItem--row': [
            {
                minHeight: 54,
                paddingTop: 16,
                boxSizing: 'border-box',
                display: 'flex',
            },
        ],
        'wc-AnnotationListItem--card': {
            ':hover': {
                boxShadow: '0px 0.6px 1.8px rgba(0, 0, 0, 0.1), 0px 3.2px 7.2px rgba(0, 0, 0, 0.13);',
                cursor: 'pointer',
            },
        },
        'wc-AnnotationListItem--container': {
            margin: '16px',
        },
        'wc-AnnotationListItem--type': {
            fontSize: '1rem',
            fontWeight: FontWeights.semibold,
        },
        'wc-AnnotationListItem--date': {
            fontSize: '0.85rem',
            fontWeight: FontWeights.semibold,
        },
        'wc-AnnotationListItem--text': {
            fontSize: '1rem',
            fontWeight: FontWeights.semibold,
        },
        'wc-AnnotationListItem--deleteButton': {
            marginRight: '16px',
        },
    });
};
