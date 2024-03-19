import { FontWeights, mergeStyleSets } from '@fluentui/react';
import { BREAKPOINTS } from 'src/app/Breakpoints';
import { colors } from 'src/common/styles/colors';

interface IProviderViewClassNames {
    'wc-ProviderView--infoContainer': string;
    'wc-ProviderView--addressContainer': string;
    'wc-ProviderView--name': string;
    'wc-ProviderView--phoneNumber': string;
    'wc-ProviderView--address': string;
    'wc-ProviderView--medicationsTitle': string;
    'wc-ProviderView--separator': string;
    'wc-ProviderView--clickableLinkText': string;
}

export const getClassNames = (): IProviderViewClassNames => {
    return mergeStyleSets({
        'wc-ProviderView--infoContainer': {
            alignItems: 'center',
            [BREAKPOINTS.DESKTOP_SMALL]: {
                alignItems: 'flex-start',
            },
        },
        'wc-ProviderView--addressContainer': {
            [BREAKPOINTS.DESKTOP_SMALL]: {
                paddingTop: '40px',
            },
        },
        'wc-ProviderView--name': {
            fontWeight: FontWeights.semibold,
            fontSize: '1.5rem',
        },
        'wc-ProviderView--phoneNumber': {
            fontWeight: FontWeights.semibold,
            fontSize: '1rem',
            color: colors.fabric.neutrals.WCprimary,
            textDecoration: 'none',
        },
        'wc-ProviderView--address': {
            fontWeight: FontWeights.semibold,
            fontSize: '1rem',
            color: colors.fabric.neutrals.WCprimary,
            width: '50%',
        },
        'wc-ProviderView--medicationsTitle': {
            fontSize: '1rem',
            fontWeight: FontWeights.semibold,
        },
        'wc-ProviderView--separator': {
            height: '0px',
            padding: '24px 0px',
        },
        'wc-ProviderView--clickableLinkText': {
            textDecoration: 'none',
        },
    });
};
