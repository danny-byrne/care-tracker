import { mergeStyleSets } from '@fluentui/react';

interface IAppProfileClassNames {
    'wc-NotificationsPreference--toggleGroupHeader': string;
}

export const getClassNames = (): IAppProfileClassNames => {
    return mergeStyleSets({
        'wc-NotificationsPreference--toggleGroupHeader': {
            paddingTop: '10px',
        },
    });
};
