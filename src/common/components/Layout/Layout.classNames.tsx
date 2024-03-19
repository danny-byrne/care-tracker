import { mergeStyleSets } from '@fluentui/react';
import { colors } from 'src/common/styles/colors';

import { BREAKPOINTS, MAX_HEIGHT_BREAKPOINT } from 'src/app/Breakpoints';
import { BOTTOM_NAV_HEIGHT } from 'src/common/components/Navigation/BottomMenu/BottomMenu.classNames';

interface ILayoutClassNames {
    'wc-Layout--appBody': string;
    'wc-Layout--pageAndNavigationContainer': string;
    'wc-Layout--page': string;
}

export const getClassNames = (): ILayoutClassNames => {
    return mergeStyleSets({
        'wc-Layout--appBody': {
            minHeight: '100%',
            display: 'flex',
            flexDirection: 'column',
            [BREAKPOINTS.MOBILE]: {
                marginBottom: 'env(safe-area-inset-bottom)',
            },
            [BREAKPOINTS.DESKTOP_HEIGHT]: {
                height: `${MAX_HEIGHT_BREAKPOINT}px`,
                overflow: 'scroll',
            },
        },
        'wc-Layout--pageAndNavigationContainer': {
            [BREAKPOINTS.DESKTOP_SMALL]: {
                flexDirection: 'row',
                height: '100%',
            },
            flexgrow: 1,
            width: '100%',
            height: `calc(calc(100%)-${BOTTOM_NAV_HEIGHT})`,
            overflow: 'hidden',
        },
        'wc-Layout--page': {
            width: '100%',
            height: '100%',
            flexgrow: 1,
            overflow: 'auto',
            background: colors.windcrest.pageBackground,
            [BREAKPOINTS.MOBILE]: {
                boxShadow: '0px 0.6px 1.8px rgba(0, 0, 0, 0.1), 0px 3.2px 7.2px rgba(0, 0, 0, 0.13);',
            },
        },
        'wc-Layout--footerContainer': {
            width: '100%',
            position: 'sticky',
            bottom: 'env(safe-area-inset-bottom)',
            boxShadow: '0px -1px 6px rgba(0,0,0,0.1)',
        },
    });
};
