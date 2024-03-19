import { FontWeights, mergeStyleSets } from '@fluentui/react';
import { BREAKPOINTS, MAX_HEIGHT_BREAKPOINT } from 'src/app/Breakpoints';

import { colors } from 'src/common/styles/colors';

interface IServiceTermsSuccessClassNames {
    'wc-ServiceTermsSuccess--pageContainer': string;
    'wc-ServiceTermsSuccess--allSetText': string;
    'wc-ServiceTermsSuccess--howToContent': string;
    'wc-ServiceTermsSuccess--boldText': string;
    'wc-ServiceTermsSuccess--buttonContainer': string;
    'wc-ServiceTermsSuccess--button': string;
    'wc-ServiceTermsSuccess--link': string;
}

const buttonStyes = {
    height: '40px',
    width: '180px',
    fontSize: '14px',
    lineHeight: '24px',
    [BREAKPOINTS.MOBILE]: {
        fontSize: '14px',
        lineHeight: '20px',
        height: '35px',
        width: '161px',
    },
};

export const getClassNames = (): IServiceTermsSuccessClassNames => {
    return mergeStyleSets({
        'wc-ServiceTermsSuccess--pageContainer': {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '100vh',
            overflow: 'scroll',
            fontSize: '16px',
            lineHeight: '24px',
            backgroundColor: colors.windcrest.headerBackground,
            [BREAKPOINTS.MOBILE]: {
                fontSize: '16px',
                lineHeight: '24px',
            },
            [BREAKPOINTS.DESKTOP_HEIGHT]: {
                height: `${MAX_HEIGHT_BREAKPOINT}px`,
            },
        },
        'wc-ServiceTermsSuccess--content': {
            height: '50%',
            width: '640px',
            [BREAKPOINTS.MOBILE]: {
                width: '85%',
                position: 'relative',
                top: '-50px',
            },
        },
        'wc-ServiceTermsSuccess--link': {
            textDecoration: 'none',
            color: colors.fabric.neutrals.WCprimary,
        },
        'wc-ServiceTermsSuccess--allSetText': {
            height: '42px',
            width: '100%',
        },
        'wc-ServiceTermsSuccess--boldText': {
            fontWeight: FontWeights.bold,
        },
        'wc-ServiceTermsSuccess--howToContent': {
            display: 'flex',
            flexDirection: 'column',
            height: '220px',
            width: '100%',
            backgroundColor: colors.windcrest.pageBackground,
            padding: '25px 30px 25px 40px',
            borderRadius: '12px',
            [BREAKPOINTS.MOBILE]: {
                padding: '25px 15px 9px 15px',
                height: '812px',
            },
        },
        'wc-ServiceTermsSuccess--buttonContainer': {
            width: '100%',
            height: '10%',
            alignContent: 'center',
        },
        'wc-ServiceTermsSuccess--button': {
            ...buttonStyes,
        },
        'wc-ServiceTermsSuccess--FAQbutton': {
            ...buttonStyes,
            ':hover': {
                backgroundColor: colors.fabric.neutrals.gray20,
            },
        },
    });
};
