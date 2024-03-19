import { mergeStyleSets, getTheme, ITheme, FontWeights } from '@fluentui/react';
import { BREAKPOINTS } from 'src/app/Breakpoints';
import { colors } from 'src/common/styles/colors';

const theme: ITheme = getTheme();
const { palette, fonts } = theme;

interface IMedicationListItemClassNames {
    'wc-MedicationListItem--itemCell': string;
    'wc-MedicationListItem--itemContent': string;
    'wc-MedicationListItem--itemDescription': string;
    'wc-MedicationListItem--itemIcon': string;
    'wc-MedicationListItem--itemImage': string;
    'wc-MedicationListItem--itemIndex': string;
    'wc-MedicationListItem--itemHeader': string;
    'wc-MedicationListItem--strengthText': string;
    'wc-MedicationListItem--itemOverflowClass': string;
    'wc-MedicationListItem--container': string;
    'wc-MedicationListItem--medicationCard': string;
    'wc-MedicationListItem--firstSection': string;
    'wc-MedicationListItem--secondSection': string;
    'wc-MedicationListItem--thirdSection': string;
    'wc-MedicationListItem--refilledButton': string;
    'wc-MedicationListItem--semiBoldText': string;
    'wc-MedicationListItem--schedulePillContainer': string;
    'wc-MedicationListItem--schedulePillText': string;
    'wc-MedicationListItem--phoneNumber': string;
}

export const getClassNames = (): IMedicationListItemClassNames => {
    return mergeStyleSets({
        'wc-MedicationListItem--firstSection': {
            flex: 1,
            overflowX: 'hidden',
            width: 'auto',
            [BREAKPOINTS.DESKTOP_SMALL]: {
                // calc() used to convert 30% to pixels for text overflow
                width: 'calc(30%)',
            },
        },
        'wc-MedicationListItem--secondSection': {
            // calc() used to convert 30% to pixels for text overflow
            width: 'calc(30%)',
            flex: 1,
            flexWrap: 'wrap',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
        },
        'wc-MedicationListItem--thirdSection': {
            // calc() used to convert 30% to pixels for text overflow
            width: 'calc(30%)',
            flex: 1,
        },
        'wc-MedicationListItem--medicationCard': {
            ':hover': {
                boxShadow: '0px 0.6px 1.8px rgba(0, 0, 0, 0.1), 0px 3.2px 7.2px rgba(0, 0, 0, 0.13);',
                cursor: 'pointer',
            },
        },
        'wc-MedicationListItem--container': {
            margin: '16px',
        },
        'wc-MedicationListItem--itemCell': [
            {
                minHeight: 54,
                paddingTop: 16,
                boxSizing: 'border-box',
                display: 'flex',
            },
        ],
        'wc-MedicationListItem--itemContent': {
            display: 'inline-block',
            overflow: 'hidden',
            marginLeft: 10,
        },
        'wc-MedicationListItem--itemHeader': {
            fontSize: '1rem',
            fontWeight: FontWeights.semibold,
            display: 'inline-block',
            // calc() used to convert 100% to pixels for text overflow
            width: 'calc(100%)',
        },
        'wc-MedicationListItem--nameText': {
            display: 'inline-block',
            maxWidth: 'calc(100%)',
            whiteSpace: 'wrap',
        },
        'wc-MedicationListItem--strengthText': {
            display: 'inline-block',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            maxWidth: 'calc(100%)',
        },
        'wc-MedicationListItem--itemOverflowClass': {
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            maxWidth: 'calc(100%)',
        },
        'wc-MedicationListItem--itemIndex': {
            fontSize: fonts.small.fontSize,
            color: palette.neutralTertiary,
            marginBottom: 10,
        },
        'wc-MedicationListItem--itemDescription': {
            fontSize: fonts.small.fontSize,
            color: palette.neutralPrimary,
        },
        'wc-MedicationListItem--itemImage': {
            width: 50,
            height: 50,
            borderRadius: '50%',
            overflow: 'hidden',
            flexShrink: 0,
        },
        'wc-MedicationListItem--itemIcon': {
            fontSize: '2rem',
            margin: '0 0.625rem',
            color: palette.neutralTertiary,
            alignSelf: 'center',
            flexShrink: 0,
        },
        'wc-MedicationListItem--refilledButton': {
            marginTop: '1rem',
            ':hover': {
                backgroundColor: colors.fabric.neutrals.gray20,
            },
        },
        'wc-MedicationListItem--semiBoldText': { fontWeight: FontWeights.semibold },
        'wc-MedicationListItem--schedulePillContainer': {
            paddingRight: '0.5rem',
            paddingBottom: '0.5rem',
        },
        'wc-MedicationListItem--schedulePillText': {
            fontWeight: FontWeights.semibold,
            marginBottom: '0.25rem',
            marginRight: '0.5rem',
            fontSize: '0.875rem',
        },
        'wc-MedicationListItem--phoneNumber': {
            fontWeight: FontWeights.semibold,
            fontSize: '1rem',
            color: colors.fabric.neutrals.WCprimary,
            textDecoration: 'none',
        },
    });
};
