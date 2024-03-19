import { FontWeights, mergeStyleSets } from '@fluentui/react';
import { BREAKPOINTS } from 'src/app/Breakpoints';
import { colors } from 'src/common/styles/colors';

interface IImmunizationViewClassNames {
    'wc-ImmunizationView--infoContainer': string;
    'wc-ImmunizationView--name': string;
    'wc-ImmunizationView--dateText': string;
    'wc-ImmunizationView--dateContainer': string;
}

export const getClassNames = (): IImmunizationViewClassNames => {
    return mergeStyleSets({
        'wc-ImmunizationView--infoContainer': {
            alignItems: 'center',
            [BREAKPOINTS.DESKTOP_SMALL]: {
                alignItems: 'flex-start',
            },
        },
        'wc-ImmunizationView--name': {
            fontWeight: FontWeights.semibold,
            fontSize: '1.5rem',
        },
        'wc-ImmunizationView--dateText': {
            fontSize: '1rem',
            color: colors.fabric.neutrals.WCprimary,
            fontWeight: FontWeights.semibold,
        },
        'wc-ImmunizationView--dateContainer': {
            [BREAKPOINTS.DESKTOP_SMALL]: {
                paddingTop: '40px',
            },
        },
    });
};
