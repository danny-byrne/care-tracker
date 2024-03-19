import { mergeStyleSets } from '@fluentui/react';

interface ITimelineListItemClassNames {
    'wc-TimelineListItem--container': string;
    'wc-TimelineListItem--dateContainer': string;
    'wc-TimelineListItem--date': string;
    'wc-TimelineListItem--hr': string;
    'wc-TimelineListItem--verticalLine': string;
    'wc-TimelineListItem--iconContainer': string;
    'wc-TimelineListItem--text': string;
}

export const getClassNames = (isLast: boolean, showDate: boolean): ITimelineListItemClassNames => {
    return mergeStyleSets({
        'wc-TimelineListItem--container': {
            height: '70px',
        },
        'wc-TimelineListItem--dateContainer': {
            width: '30%',
        },
        'wc-TimelineListItem--date': {
            marginLeft: '16px',
        },
        'wc-TimelineListItem--hr': {
            color: 'red',
            backgroundColor: 'Gray',
            height: '.1px',
            width: '100%',
        },
        'wc-TimelineListItem--verticalLine': {
            marginLeft: '20px',
            height: isLast ? (showDate ? '44px' : '35px') : '70px',
            borderLeft: '1px dashed Gray',
            alignSelf: isLast ? 'flex-start' : undefined,
        },
        'wc-TimelineListItem--iconContainer': {
            width: 36,
            height: 36,
        },
        'wc-TimelineListItem--text': {
            display: '-webkit-box',
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
        },
    });
};
