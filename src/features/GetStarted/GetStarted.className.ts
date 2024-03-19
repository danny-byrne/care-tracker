import { FontWeights, mergeStyleSets } from '@fluentui/react';
import { BREAKPOINTS, MAX_HEIGHT_BREAKPOINT } from 'src/app/Breakpoints';
import { colors } from 'src/common/styles/colors';

interface IGetStartedClassNames {
    'wc-GetStarted--form': string;
    'wc-GetStarted--container': string;
    'wc-GetStarted--headerText': string;
    'wc-GetStarted--subHeaderText': string;
    'wc-GetStarted--stack': string;
    'wc-GetStarted--nameField': string;
    'wc-GetStarted--timezoneField': string;
    'wc-GetStarted--continueButton': string;
}

export const getClassNames = (): IGetStartedClassNames => {
    return mergeStyleSets({
        'wc-GetStarted--form': {
            height: '100vh',
            overflow: 'scroll',
            [BREAKPOINTS.DESKTOP_HEIGHT]: {
                height: `${MAX_HEIGHT_BREAKPOINT}px`,
            },
        },
        'wc-GetStarted--container': {
            height: '100%',
            alignItems: 'center',
            background: colors.windcrest.pageBackground,
            paddingTop: '48px',
        },
        'wc-GetStarted--headerText': {
            fontSize: '1rem',
        },
        'wc-GetStarted--subHeaderText': {
            fontSize: '1.5rem',
            fontWeight: FontWeights.semibold,
            paddingTop: '4px',
        },
        'wc-GetStarted--stack': {
            paddingTop: '36px',
            width: '100%',
            [BREAKPOINTS.DESKTOP_SMALL]: {
                width: '40%',
                alignItems: 'center',
            },
        },
        'wc-GetStarted--nameField': {
            width: '100%',
            paddingLeft: '24px',
            paddingRight: '26px',
            [BREAKPOINTS.DESKTOP_SMALL]: {
                paddingLeft: '0px',
                paddingRight: '0px',
                width: '100%',
                maxWidth: '439px',
            },
        },
        'wc-GetStarted--timezoneField': {
            paddingLeft: '24px',
            paddingRight: '26px',
            [BREAKPOINTS.DESKTOP_SMALL]: {
                paddingLeft: '0px',
                paddingRight: '0px',
                width: '100%',
                maxWidth: '439px',
            },
        },
        'wc-GetStarted--continueButton': {
            margin: '22px',
        },
    });
};
