import { mergeStyleSets } from '@fluentui/react';

interface INavigationClassNames {
    'wc-Navigation--itemContainer': string;
    'wc-Navigation--itemText': string;
}

export const getClassNames = (): INavigationClassNames => {
    return mergeStyleSets({
        'wc-Navigation--itemContainer': {
            alignItems: 'center',
            height: '65px',
            paddingTop: '8px',
            width: '60px',
        },

        'wc-Navigation--itemText': {
            fontSize: '11px',
            lineHeight: '16px',
        },
    });
};
