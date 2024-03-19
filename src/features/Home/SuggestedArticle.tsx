/*eslint-disable*/

import React from 'react';
import { SearchBox, Stack, Text, Image, PrimaryButton } from '@fluentui/react';

import { getClassNames } from './SuggestedArticle.classNames';

export type WebPageResource = {
    webPageID?: string;
    webPageName?: string;
    webPageUrl?: string;
    thumbnailUrl?: string;
    snippet?: string;
};

interface ISuggestedArticleProps {
    resources?: WebPageResource[];
}

const classNames = getClassNames();
const SuggestedArticle: React.FC<ISuggestedArticleProps> = ({ resources }) => {
    return (
        <Stack tokens={{ childrenGap: 10 }} className={classNames['wc-SuggestedArticle--container']}>
            <div className={classNames['wc-SuggestedArticle--toolkitText']}>{`Suggested Article${
                resources.length > 1 ? 's' : ''
            }:`}</div>
            {resources?.map((resource, index) => {
                return <ArticlePreview article={resource} key={resource.webPageID + index} />;
            })}
        </Stack>
    );
};

interface IArticlePreviewProps {
    article: WebPageResource;
}

const ArticlePreview: React.FC<IArticlePreviewProps> = ({ article }) => {
    return (
        <a
            className={classNames['wc-SuggestedArticle--articlePreviewContainer']}
            href={article.webPageUrl}
            target="_blank"
            rel="noopener noreferrer"
        >
            <Stack
                horizontal
                tokens={{ childrenGap: 18 }}
                className={classNames['wc-SuggestedArticle--imageAndTitleContainer']}
            >
                {article.thumbnailUrl ? (
                    <Image src={article.thumbnailUrl} className={classNames['wc-SuggestedArticle--image']} />
                ) : (
                    null
                )}
                <div className={classNames['wc-SuggestedArticle--articleTitle']}>{article.webPageName}</div>
            </Stack>
            <div className={classNames['wc-SuggestedArticle--articlePreview']}>{article.snippet}</div>
        </a>
    );
};

export default SuggestedArticle;
