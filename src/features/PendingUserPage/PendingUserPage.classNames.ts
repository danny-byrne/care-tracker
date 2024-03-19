import { mergeStyleSets, FontWeights } from '@fluentui/react';

interface ILoginLoadingPageClassNames {
    'wc-PendingUserPage--pageContainer': string;
    'wc-PendingUserPage--userDataContainer': string;
    'wc-PendingUserPage--profileTextStyle': string;
    'wc-PendingUserPage--userGreetingDialogStyle': string;
    'wc-PendingUserPage--loadingDialogStyle': string;
}

export const getClassNames = (): ILoginLoadingPageClassNames => {
    return mergeStyleSets({
        'wc-PendingUserPage--pageContainer': {
            display: 'flex',
            flexDirection: 'column',
        } as const,
        'wc-PendingUserPage--userDataContainer': {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            alignSelf: 'center',
        } as const,
        'wc-PendingUserPage--profileTextStyle': {
            paddingTop: 40,
            fontSize: 18,
            lineHeight: '1.5rem',
            fontWeight: FontWeights.semibold,
        },
        'wc-PendingUserPage--userGreetingDialogStyle': {
            display: 'flex',
            flexDirection: 'column',
            width: 267,
            alignItems: 'center',
            paddingBottom: 30,
            justifyContent: 'center',
        } as const,
        'wc-PendingUserPage--loadingDialogStyle': {
            textAlign: 'center',
        } as const,
    });
};
