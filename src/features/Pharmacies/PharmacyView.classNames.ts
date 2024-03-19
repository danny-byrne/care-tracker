import { FontWeights, mergeStyleSets } from '@fluentui/react';
import { BREAKPOINTS } from 'src/app/Breakpoints';
import { colors } from 'src/common/styles/colors';

interface IPharmacyViewClassNames {
    'wc-PharmacyView--infoContainer': string;
    'wc-PharmacyView--addressContainer': string;
    'wc-PharmacyView--name': string;
    'wc-PharmacyView--phoneNumber': string;
    'wc-PharmacyView--address': string;
    'wc-PharmacyView--bingLabel': string;
    'wc-PharmacyView--medicationsTitle': string;
    'wc-PharmacyView--separator': string;
}

export const getClassNames = (): IPharmacyViewClassNames => {
    return mergeStyleSets({
        'wc-PharmacyView--infoContainer': {
            alignItems: 'center',
            [BREAKPOINTS.DESKTOP_SMALL]: {
                alignItems: 'flex-start',
            },
        },
        'wc-PharmacyView--addressContainer': {
            [BREAKPOINTS.DESKTOP_SMALL]: {
                paddingTop: '40px',
            },
        },
        'wc-PharmacyView--name': {
            fontWeight: FontWeights.semibold,
            fontSize: '1.5rem',
        },
        'wc-PharmacyView--phoneNumber': {
            fontWeight: FontWeights.semibold,
            fontSize: '1rem',
            color: colors.fabric.neutrals.WCprimary,
            textDecoration: 'none',
        },
        'wc-PharmacyView--address': {
            fontWeight: FontWeights.semibold,
            fontSize: '1rem',
            color: colors.fabric.neutrals.WCprimary,
            width: '50%',
            textDecoration: 'none',
        },
        'wc-PharmacyView--bingLabel': {
            fontSize: '.8rem',
            width: '50%',
        },
        'wc-PharmacyView--medicationsTitle': {
            fontSize: '1rem',
            fontWeight: FontWeights.semibold,
        },
        'wc-PharmacyView--separator': {
            height: '0px',
            padding: '24px 0px',
        },
    });
};
