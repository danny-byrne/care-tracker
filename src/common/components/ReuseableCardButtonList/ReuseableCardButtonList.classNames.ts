import { mergeStyleSets } from '@fluentui/react';
import { BREAKPOINTS } from 'src/app/Breakpoints';

interface IReuseableCardButtonListClassNames {
    'wc-ReuseableCardButtonList--list': string;
    'wc-ReuseableCardButtonList--separatorColorContainer': string;
    'wc-ReuseableCardButtonList--separatorMarginContainer': string;
    'wc-ReuseableCardButtonList--separator': string;
}

export const getClassNames = (): IReuseableCardButtonListClassNames => {
    return mergeStyleSets({
        'wc-ReuseableCardButtonList--list': {
            width: '100%',
            boxShadow: '0px 0.3px 0.9px rgba(0, 0, 0, 0.1), 0px 1.6px 3.6px rgba(0, 0, 0, 0.13);',
            borderRadius: '12px',
            [BREAKPOINTS.DESKTOP_SMALL]: {
                width: 440,
                marginLeft: 8,
                marginRight: 8,
            },
        },
        'wc-ReuseableCardButtonList--separatorColorContainer': {
            backgroundColor: 'white',
            height: '2px',
        },
        'wc-ReuseableCardButtonList--separatorMarginContainer': {
            marginLeft: '16px',
            height: '1px',
            [BREAKPOINTS.MOBILE]: {
                marginLeft: '0px',
            },
        },
        'wc-ReuseableCardButtonList--separator': {
            padding: '0px',
            height: '1px',
        },
    });
};
