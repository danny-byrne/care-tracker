import { FontWeights, mergeStyleSets } from '@fluentui/react';
import { BREAKPOINTS } from 'src/app/Breakpoints';
import { colors } from 'src/common/styles/colors';

interface IAllergyViewClassNames {
    'wc-AllergyView--infoContainer': string;
    'wc-AllergyView--severityContainer': string;
    'wc-AllergyView--name': string;
    'wc-AllergyView--severity': string;
}

export const getClassNames = (): IAllergyViewClassNames => {
    return mergeStyleSets({
        'wc-AllergyView--infoContainer': {
            alignItems: 'center',
            [BREAKPOINTS.DESKTOP_SMALL]: {
                alignItems: 'flex-start',
            },
        },
        'wc-AllergyView--severityContainer': {
            [BREAKPOINTS.DESKTOP_SMALL]: {
                paddingTop: '40px',
            },
        },
        'wc-AllergyView--name': {
            fontWeight: FontWeights.semibold,
            fontSize: '1.5rem',
        },
        'wc-AllergyView--severity': {
            fontWeight: FontWeights.semibold,
            fontSize: '1rem',
            color: colors.fabric.neutrals.WCprimary,
            width: '50%',
        },
    });
};
