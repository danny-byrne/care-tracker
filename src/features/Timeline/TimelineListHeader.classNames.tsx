import { mergeStyleSets } from '@fluentui/react';

interface ITimelineListHeaderClassNames {
    'wc-TimelineListHeader--text': string;
}

export const getClassNames = (): ITimelineListHeaderClassNames => {
    return mergeStyleSets({
        'wc-TimelineListHeader--text': {
            borderStyle: 'solid',
            borderWidth: '2px',
            borderColor: '#CBD9F3',
            borderRadius: '6px',
        },
    });
};
