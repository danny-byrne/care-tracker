import { FontWeights, mergeStyleSets } from '@fluentui/react';
import { BREAKPOINTS, MAX_HEIGHT_BREAKPOINT } from 'src/app/Breakpoints';

import { colors } from 'src/common/styles/colors';

interface ITermsOfServiceClassNames {
    'wc-TermsOfService--pageContainer': string;
    'wc-TermsOfService--content': string;
    'wc-TermsOfService--imageContainer': string;
    'wc-TermsOfService--agreementsContainer': string;
    'wc-TermsOfService--buttonContainer': string;
    'wc-TermsOfService--button': string;
    'wc-TermsOfService--termContainer': string;
    'wc-TermsOfService--termText': string;
    'wc-TermsOfService--link': string;
    'wc-TermsOfService--privacyHeader': string;
}

export const getClassNames = (): ITermsOfServiceClassNames => {
    return mergeStyleSets({
        'wc-TermsOfService--pageContainer': {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            height: '100vh',
            width: '100%',
            backgroundColor: colors.windcrest.pageBackground,
            [BREAKPOINTS.MOBILE]: {
                marginBottom: 'env(safe-area-inset-bottom)',
            },
            overflow: 'hidden auto',
            [BREAKPOINTS.DESKTOP_HEIGHT]: {
                height: `${MAX_HEIGHT_BREAKPOINT}px`,
                overflow: 'scroll',
            },
        },
        'wc-TermsOfService--content': {
            paddingTop: '0px',
            paddingLeft: '0px',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '90%',
            gap: '0px',
        },
        'wc-TermsOfService--imageContainer': {
            [BREAKPOINTS.MOBILE]: {
                flexDirection: 'column',
                marginLeft: '0px',
                marginTop: '20px',
                position: 'relative',
                top: '5px',
            },
        },
        'wc-TermsOfService--agreementText': {
            fontSize: '18px',
            lineHeight: '24px',
            fontWeight: FontWeights.bold,
            marginBottom: '20px',
            [BREAKPOINTS.MOBILE]: {
                marginBottom: '10px',
                fontSize: '16px',
            },
        },
        'wc-TermsOfService--agreementsContainer': {
            flexDirection: 'column',
            height: '80%',
            width: '100%',
            marginBottom: '0px',
            marginRight: '0px',
            alignItems: 'left',
            paddingTop: '20px',
            fontSize: '14px',
            [BREAKPOINTS.DESKTOP_SMALL]: {
                width: '50%',
                height: '60%',
                marginBottom: '30px',
            },
        },
        'wc-TermsOfService--buttonContainer': {
            height: '10%',
            alignItems: 'center',
            position: 'relative',
            justifyContent: 'center',
        },
        'wc-TermsOfService--button': {
            width: '312px',
            height: '35px',
            ':hover': {
                backgroundColor: colors.fabric.neutrals.gray20,
            },
        },
        'wc-TermsOfService--termContainer': {
            width: '99%',
            height: 'auto',
            marginLeft: '5px',
        },
        'wc-TermsOfService--termText': {
            lineHeight: '20px',
            marginLeft: '10px',
            fontSize: '16px',
        },
        'wc-TermsOfService--link': {
            textDecoration: 'none',
            color: colors.fabric.neutrals.WCprimary,
        },
        'wc-TermsOfService--privacyHeader': {
            fontSize: '24px',
            lineHeight: '36px',
            fontWeight: FontWeights.semibold,
            color: colors.fabric.neutrals.PrivacyHeader,
            display: 'flex',
            justifyContent: 'center',
        },
    });
};
