import { FontWeights, mergeStyleSets } from '@fluentui/react';

interface ISuggestedArticleNames {
    'wc-SuggestedArticle--container': string;
    'wc-SuggestedArticle--toolkitText': string;
    'wc-SuggestedArticle--articlePreviewContainer': string;
    'wc-SuggestedArticle--imageAndTitleContainer': string;
    'wc-SuggestedArticle--image': string;
    'wc-SuggestedArticle--articleTitle': string;
    'wc-SuggestedArticle--articlePreview': string;
}

export const getClassNames = (): ISuggestedArticleNames => {
    return mergeStyleSets({
        'wc-SuggestedArticle--container': {
            marginTop: 20,
        },
        'wc-SuggestedArticle--toolkitText': {
            fontWeight: FontWeights.regular,
            fontSize: '16px',
            lineHeight: '32px',
        },
        'wc-SuggestedArticle--articlePreviewContainer': {
            height: '230px',
            maxWidth: '327px',
            boxShadow: '0px 0.3px 0.9px rgba(0, 0, 0, 0.1), 0px 1.6px 3.6px rgba(0, 0, 0, 0.13)',
            borderRadius: '12px',
            overflow: 'hidden',
            padding: '18px 18px 18px 18px',
            textDecoration: 'none',
        },
        'wc-SuggestedArticle--imageAndTitleContainer': {
            width: '100%',
        },
        'wc-SuggestedArticle--image': {
            borderRadius: '12px',
            flexShrink: 0,
            boxShadow: '0px 0.3px 0.9px rgba(0, 0, 0, 0.1), 0px 1.6px 3.6px rgba(0, 0, 0, 0.13)',
        },
        'wc-SuggestedArticle--articleTitle': {
            fontSize: '16px',
            fontWeight: FontWeights.semibold,
        },
        'wc-SuggestedArticle--articlePreview': {
            fontSize: '14px',
            fontWeight: FontWeights.regular,
            width: '100%',
            color: '#292827',
            marginTop: 12,
        },
    });
};
