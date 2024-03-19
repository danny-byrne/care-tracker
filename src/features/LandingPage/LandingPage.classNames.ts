/*eslint-disable*/
import { mergeStyleSets, FontWeights, IButtonStyles } from '@fluentui/react';
import { BREAKPOINTS, MAX_HEIGHT_BREAKPOINT } from 'src/app/Breakpoints';
import background from 'src/assets/LandingPage/LandingPageBackground.png';
import { colors } from 'src/common/styles/colors';

interface ILandingPageClassNames {
    'wc-LandingPage--pageContainer': string;
    'wc-LandingPage--headerContainer': string;
    'wc-LandingPage--landingWindcrestHeader': string;
    'wc-LandingPage--landingDescriptionText': string;
    'wc-LandingPage--buttonContainer': string;
    'wc-LandingPage--signInButton': string;
    'wc-LandingPage--signInButtonTextStyle': string;
    'wc-LandingPage--newAccountButton': string;
    'wc-LandingPage--heightDisplay': string;
}

export const getClassNames = (): ILandingPageClassNames => {
    return mergeStyleSets({
        'wc-LandingPage--pageContainer': {
            height: '100vh',
            marginTop: '5vh',
            overflow: 'visible',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            [BREAKPOINTS.DESKTOP_SMALL]: {
                justifyContent: 'center',
                flexDirection: 'row',
            },
            [BREAKPOINTS.DESKTOP_HEIGHT]: {
                height: `${MAX_HEIGHT_BREAKPOINT}px`,
            },
        } as const,
        'wc-LandingPage--bgContainer': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '120%',
            height: '120%',
            backgroundImage: `url(${background})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'top left',
        } as const,
        'wc-LandingPage--headerContainer': {
            flex: 1,
            position: 'relative',
            width: 265,
            marginLeft: 'auto',
            marginRight: 'auto',
            textAlign: 'center',
            [BREAKPOINTS.DESKTOP_SMALL]: {
                display: 'flex',
                flexDirection: 'column',
                width: 497,
                justifyContent: 'center',
                marginTop: 0,
            },
        },
        'wc-LandingPage--logoContainer': {
            marginBottom: '5vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        },
        'wc-LandingPage--landingWindcrestHeader': {
            color: colors.fabric.neutrals.white,
            fontSize: 34,
            fontWeight: FontWeights.bold,
            marginBottom: 35,
            [BREAKPOINTS.DESKTOP_SMALL]: {
                paddingTop: 105,
            },
        },
        'wc-LandingPage--landingDescriptionText': {
            color: colors.fabric.neutrals.white,
            fontSize: 24,
            fontWeight: 500,
            [BREAKPOINTS.DESKTOP_SMALL]: {
                width: 497,
                display: 'flex',
            },
        },
        'wc-LandingPage--buttonContainer': {
            flexShrink: 0,
            marginTop: 'auto',
            marginBottom: '20vh',
            width: 315,
            marginLeft: 'auto',
            marginRight: 'auto',
            [BREAKPOINTS.DESKTOP_SMALL]: {
                paddingTop: 30,
                height: 100,
                display: 'flex',
                flexDirection: 'column',
            },
        },
        'wc-LandingPage--heightDisplay': {
            color: colors.windcrest.gray,
        },
        'wc-LandingPage--signInButton': {
            width: '100%',
            height: 52,
            fontSize: 15,
            fontWeight: 500,
            backgroundColor: colors.fabric.neutrals.white,
            borderColor: colors.fabric.neutrals.white,
            marginBottom: 10,
            [BREAKPOINTS.DESKTOP_SMALL]: {
                width: '328px',
                height: '100%',
            },
        },
        'wc-LandingPage--signInButtonTextStyle': {
            marginRight: 10,
        },
        'wc-LandingPage--newAccountButton': {
            width: '100%',
            height: 52,
            fontSize: 15,
            fontWeight: FontWeights.bold,
            backgroundColor: colors.windcrest.transparent,
            borderColor: colors.fabric.neutrals.white,
            color: colors.fabric.neutrals.white,

            [BREAKPOINTS.DESKTOP_SMALL]: {
                width: '328px',
                height: '100%',
            },
        },
    });
};

export const buttonStylesThemeOverride: IButtonStyles = {
    rootHovered: {
        backgroundColor: colors.fabric.neutrals.gray10,
    },
    rootPressed: {
        backgroundColor: colors.fabric.neutrals.gray20,
    },
};
