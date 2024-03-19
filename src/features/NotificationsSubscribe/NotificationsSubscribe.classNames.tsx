import { FontWeights, mergeStyleSets } from '@fluentui/react';

import { colors } from 'src/common/styles/colors';
import { BREAKPOINTS, MAX_HEIGHT_BREAKPOINT } from 'src/app/Breakpoints';

interface INotificationsSubscribeClassNames {
    'wc-NotificationsSubscribe--pageContainer': string;
    'wc-NotificationsSubscribe--content': string;
    'wc-NotificationsSubscribe--titleText': string;
    'wc-NotificationsSubscribe--subtitleText': string;
    'wc-NotificationsSubscribe--form': string;
    'wc-NotificationsSubscribe--buttonContainer': string;
    'wc-NotificationsSubscribe--button': string;
}

export const getClassNames = (): INotificationsSubscribeClassNames => {
    return mergeStyleSets({
        'wc-NotificationsSubscribe--pageContainer': {
            width: '100%',
            height: '100vh',
            overflow: 'scroll',
            backgroundColor: colors.windcrest.headerBackground,
            [BREAKPOINTS.DESKTOP_HEIGHT]: {
                height: `${MAX_HEIGHT_BREAKPOINT}px`,
            },
        },
        'wc-NotificationsSubscribe--content': {
            margin: 'auto',
            paddingTop: '10%',
            width: '80%',
            maxWidth: '500px',
        },
        'wc-NotificationsSubscribe--titleText': {
            textAlign: 'center',
            verticalAlign: 'middle',
            fontWeight: FontWeights.semibold,
        },
        'wc-NotificationsSubscribe--subtitleText': {
            textAlign: 'center',
            marginTop: '10px',
        },
        'wc-NotificationsSubscribe--form': {
            width: '100%',
            paddingTop: '20px',
        },
        'wc-NotificationsSubscribe--buttonContainer': {
            paddingTop: '20px',
            paddingBottom: '20px',
        },
        'wc-NotificationsSubscribe--button': {
            height: '35px',
            width: '140px',
            minWidth: '20px',
        },
    });
};
