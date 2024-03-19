import { mergeStyleSets, FontWeights } from '@fluentui/react';
import { BREAKPOINTS, MAX_HEIGHT_BREAKPOINT } from 'src/app/Breakpoints';

interface ILoginLoadingPageClassNames {
    'wc-LoginLoadingPage--pageContainer': string;
    'wc-LoginLoadingPage--userDataContainer': string;
    'wc-LoginLoadingPage--profileTextStyle': string;
    'wc-LoginLoadingPage--userGreetingDialogStyle': string;
    'wc-LoginLoadingPage--logoAvatar': string;
}

export const getClassNames = (): ILoginLoadingPageClassNames => {
    return mergeStyleSets({
        'wc-LoginLoadingPage--pageContainer': {
            display: 'flex',
            flexDirection: 'column',
            height: '100vh',
            [BREAKPOINTS.DESKTOP_HEIGHT]: {
                height: `${MAX_HEIGHT_BREAKPOINT}px`,
            },
        } as const,
        'wc-LoginLoadingPage--userDataContainer': {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            alignSelf: 'center',
            marginTop: 40,
        } as const,
        'wc-LoginLoadingPage--profileTextStyle': {
            paddingTop: 27,
            fontSize: 18,
            lineHeight: '1.5rem',
            fontWeight: FontWeights.semibold,
        },
        'wc-LoginLoadingPage--userGreetingDialogStyle': {
            height: 200,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            fontSize: '24px',
            fontWeight: FontWeights.semibold,
            [BREAKPOINTS.MOBILE]: {
                width: '80%',
            },
        } as const,
        'wc-LoginLoadingPage--logoAvatar': {
            marginTop: 70,
            marginBottom: 70,
        } as const,
    });
};
