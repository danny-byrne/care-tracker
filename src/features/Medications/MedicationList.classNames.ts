import { FontWeights, mergeStyleSets } from '@fluentui/react';
import { colors } from 'src/common/styles/colors';
import { BREAKPOINTS } from 'src/app/Breakpoints';

interface IViewMedicationsClassNames {
    'wc-MedicationList--pageAndNavigationContainer': string;
    'wc-MedicationList--medicationListContainer': string;
    'wc-MedicationList--pageContainer': string;
    'wc-MedicationList--addButton': string;
    'wc-MedicationList--addButtonWrapper': string;
    'wc-MedicationList--addButtonContainer': string;
    'wc-MedicationList--listStyle': string;
    'wc-MedicationList--noMedicationsMessage': string;
    'wc-MedicationList--noMedicationsTitleText': string;
    'wc-MedicationList--medicationRefillHeaderChevron': string;
    'wc-MedicationList--medicationRefillHeaderText': string;
}

export const getClassNames = (): IViewMedicationsClassNames => {
    return mergeStyleSets({
        'wc-MedicationList--listStyle': {},
        'wc-MedicationList--pageAndNavigationContainer': {
            flexGrow: 1,
            overflow: 'auto',
            [BREAKPOINTS.DESKTOP_SMALL]: {
                flexDirection: 'row',
            },
        },
        'wc-MedicationList--pageContainer': {
            flexGrow: 1,
            overflow: 'auto',
        },
        'wc-MedicationList--medicationListContainer': {
            flexGrow: 1,
            overflow: 'auto',
            height: 100,
        },
        'wc-MedicationList--addButtonWrapper': {
            paddingBottom: 30,
        },
        'wc-MedicationList--addButtonContainer': {
            paddingTop: '1rem',
            paddingBottom: '0.5rem',
            position: 'fixed',
            bottom: 0,
            right: 0,
            left: 0,
            backgroundColor: colors.fabric.neutrals.white,
        },
        'wc-MedicationList--addButton': {
            width: '95%',
            margin: 'auto',
            paddingBottom: 5,
        },
        'wc-MedicationList--noMedicationsMessage': {
            backgroundColor: colors.windcrest.pageBackground,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            paddingTop: '40px',
        },
        'wc-MedicationList--noMedicationsTitleText': {
            fontSize: '1.5rem',
            fontWeight: FontWeights.semibold,
            paddingBottom: '8px',
        },
        'wc-MedicationList--medicationRefillHeaderChevron': {
            marginTop: '24px',
            cursor: 'pointer',
            fontsize: '12px',
        },
        'wc-MedicationList--medicationRefillHeaderText': {
            marginTop: '24px',
            fontSize: '1rem',
        },

        'wc-MedicationList--allActivitiesHeader': {
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            paddingBottom: 10,
        },
    });
};
