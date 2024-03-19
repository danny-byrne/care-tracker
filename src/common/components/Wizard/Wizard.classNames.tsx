import { FontWeights, mergeStyleSets } from '@fluentui/react';
import { BREAKPOINTS } from 'src/app/Breakpoints';
import { colors } from 'src/common/styles/colors';
interface IWizardClassNames {
    'wc-Wizard--pageContainer': string;
    'wc-Wizard--pageSubContainer': string;
    'wc-Wizard--image': string;
    'wc-Wizard--buttonContainer': string;
    'wc-Wizard--navButtonRow': string;
    'wc-Wizard--button': string;
    'wc-Wizard--title': string;
    'wc-Wizard--subTitle': string;
    'wc-Wizard--addLaterButton': string;
    'wc-Wizard--defaultPill': string;
    'wc-Wizard--selectedPill': string;
    'wc-Wizard--pillText': string;
}

export const getClassNames = (): IWizardClassNames => {
    return mergeStyleSets({
        'wc-Wizard--pageContainer': {
            background: colors.windcrest.pageBackground,
            alignItems: 'center',
        },
        'wc-Wizard--pageSubContainer': {
            [BREAKPOINTS.MOBILE]: {
                marginBottom: 'env(safe-area-inset-bottom)',
            },
            background: colors.windcrest.pageBackground,
            height: '100%',
            position: 'relative',
            alignItems: 'center',
            width: '100%',
            [BREAKPOINTS.DESKTOP_SMALL]: {
                width: '40%',
            },
        },
        'wc-Wizard--image': {
            paddingTop: '21px',
            minHeight: '192px',
        },
        'wc-Wizard--buttonContainer': {
            alignItems: 'center',
            position: 'absolute',
            bottom: '19px',
            width: '100%',
            height: '73px',
            background: colors.windcrest.pageBackground,
        },
        'wc-Wizard--navButtonRow': {
            width: '100%',
            justifyContent: 'center',
        },
        'wc-Wizard--button': {
            width: '42%',
        },
        'wc-Wizard--addLaterButton': {
            fontSize: '1rem',
            color: colors.fabric.neutrals.WCprimary,
            cursor: 'pointer',
        },
        'wc-Wizard--title': {
            marginTop: '37px',
            fontSize: '1rem',
            lineHeight: '2rem',
        },
        'wc-Wizard--subTitle': {
            marginTop: '4px',
            marginBottom: '32px',
            fontSize: '1.5rem',
            lineHeight: '2rem',
            fontWeight: FontWeights.semibold,
        },
        'wc-Wizard--defaultPill': {
            background: '#E3E3E3',
            borderRadius: '50px',
            padding: '8px 12px',
            alignItems: 'center',
            cursor: 'pointer',
            margin: '6px 4px',
        },
        'wc-Wizard--selectedPill': {
            background: '#D4ECF5',
            borderRadius: '50px',
            padding: '8px 12px',
            alignItems: 'center',
            cursor: 'pointer',
            margin: '6px 4px',
        },
        'wc-Wizard--pillText': {
            fontWeight: FontWeights.semibold,
            fontSize: '0.75rem',
        },
    });
};
