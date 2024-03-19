import { mergeStyleSets, getTheme, ITheme, FontWeights } from '@fluentui/react';
import { colors } from 'src/common/styles/colors';
import { BREAKPOINTS } from 'src/app/Breakpoints';

const theme: ITheme = getTheme();
const { palette, fonts } = theme;

interface IMedicationListItemClassNames {
    'wc-MedicationView--content': string;
    'wc-MedicationView--medicationItems': string;
    'wc-MedicationView--smallText': string;
    'wc-MedicationView--smallBoldText': string;
    'wc-MedicationView--scheduleInfoItem': string;
    'wc-MedicationView--mediumBoldText': string;
    'wc-MedicationView--medName': string;
    'wc-MedicationView--medStrength': string;
    'wc-MedicationView--medTakenfor': string;
    'wc-MedicationView--medDirections': string;
    'wc-MedicationView--scheduleInfo': string;
    'wc-MedicationView--dayTime': string;
    'wc-MedicationView--dayTimeCustomSchedule': string;
    'wc-MedicationView--moreButton': string;
    'wc-MedicationView--moreButtonText': string;
    'wc-MedicationView--displaySchedule': string;
    'wc-MedicationView--infoContainer': string;
    'wc-MedicationView--itemIcon': string;
    'wc-MedicationView--pillImage': string;
    'wc-MedicationView--pillContainer': string;
    'wc-MedicationView--takeAsNeededText': string;
    'wc-MedicationView--providerName': string;
    'wc-MedicationView--providerAddress': string;
    'wc-MedicationView--providerPhoneNumber': string;
    'wc-MedicationView--pharmacyName': string;
    'wc-MedicationView--pharmacyText': string;
    'wc-MedicationView--cardLabel': string;
    'wc-MedicationView--pageContainer': string;
    'wc-MedicationView--clickableLinkText': string;
    'wc-MedicationView--CustomDateDisplay': string;
    'wc-MedicationView--CustomScheduleCard': string;
    'wc-MedicationView--textSmallBold': string;
    'wc-MedicationView--textMediumBold': string;
}

export const getClassNames = (): IMedicationListItemClassNames => {
    return mergeStyleSets({
        'wc-MedicationView--header': [fonts.xLarge],
        'wc-MedicationView--pill': [fonts.xxLarge],
        'wc-MedicationView--content': {
            [BREAKPOINTS.MOBILE]: {
                width: '327px',
            },
            display: 'flex',
            paddingBottom: '10rem',
            width: '564px',
            [BREAKPOINTS.DESKTOP_SMALL]: {
                paddingBottom: 0,
            },
        },
        'wc-MedicationView--pageContainer': {
            paddingBottom: '10rem',
            [BREAKPOINTS.DESKTOP_SMALL]: {
                // width: '549px',
                marginLeft: 50,
            },
        },
        'wc-MedicationView--medicationItems': {
            paddingBottom: 40,
            [BREAKPOINTS.MOBILE]: {
                margin: 'auto',
                marginTop: '16px',
                alignItems: 'center',
            },
        },
        'wc-MedicationView--smallBoldText': [
            fonts.smallPlus,
            {
                fontWeight: '600',
            },
        ],
        'wc-MedicationView--smallText': [fonts.smallPlus],
        'wc-MedicationView--mediumBoldText': [
            fonts.mediumPlus,
            {
                fontWeight: '600',
            },
        ],
        'wc-MedicationView--medName': {
            fontWeight: FontWeights.semibold,
            fontSize: '1.5rem',
            marginBottom: '1rem',
        },
        'wc-MedicationView--medStrength': {
            fontWeight: FontWeights.semibold,
            fontSize: '1.5rem',
            marginBottom: '1rem',
        },
        'wc-MedicationView--medTakenfor': {
            color: colors.fabric.neutrals.WCprimary,
            fontSize: 16,
            fontWeight: FontWeights.bold,
            marginBottom: '8px',
            cursor: 'pointer',
        },
        'wc-MedicationView--medDirections': {
            fontSize: '0.875rem',
        },
        'wc-MedicationView--moreButton': {
            height: '28px',
            borderRadius: '50px',
            border: `1px ${colors.fabric.neutrals.WCprimary} solid`,
            padding: '0px',
        },
        'wc-MedicationView--moreButtonText': {
            color: colors.fabric.neutrals.WCprimary,
            fontSize: '12px',
            fontWeight: '600',
        },
        'wc-MedicationView--scheduleInfo': {
            display: 'flex',
            flexWrap: 'wrap',
            [BREAKPOINTS.MOBILE]: {
                justifyContent: 'space-between',
            },
        },
        'wc-MedicationView--scheduleInfoItem': {
            marginTop: '16px',
            maxWidth: '300px',
            minWidth: '120px',
        },
        'wc-MedicationView--dayTime': {
            marginTop: '16px!important',
            maxWidth: '600px',
            gap: '7px',
            flexFlow: 'row wrap',
            [BREAKPOINTS.MOBILE]: {
                maxWidth: 'auto',
            },
        },
        'wc-MedicationView--dayTimeCustomSchedule': {
            marginTop: '16px!important',
            maxWidth: '350px',
            columnGap: '42px',
            [BREAKPOINTS.MOBILE]: {
                maxWidth: 'auto',
            },
        },
        'wc-MedicationView--displaySchedule': {
            marginBottom: '24px',
        },
        'wc-MedicationView--infoContainer': {
            flexGrow: 1,
        },
        'wc-MedicationView--itemIcon': {
            fontSize: 60,
            margin: '0 0.625rem',
            color: palette.neutralTertiary,
            alignSelf: 'center',
            flexShrink: 0,
        },
        'wc-MedicationView--pillImage': {
            width: '150px',
            height: '150px',
            borderRadius: '16px',
            background: colors.fabric.neutrals.gray30,
            justifyContent: 'center',
        },
        'wc-MedicationView--pillContainer': {
            justifyContent: 'center',
            display: 'flex',
        },
        'wc-MedicationView--takeAsNeededText': {
            fontSize: '1.125rem',
            fontWeight: FontWeights.semibold,
        },
        'wc-MedicationView--providerName': {
            fontSize: '1rem',
            fontWeight: FontWeights.semibold,
        },
        'wc-MedicationView--providerAddress': {
            color: colors.fabric.neutrals.WCprimary,
            fontWeight: FontWeights.semibold,
        },
        'wc-MedicationView--providerPhoneNumber': {
            fontWeight: FontWeights.semibold,
            color: colors.fabric.neutrals.WCprimary,
            textDecoration: 'none',
        },
        'wc-MedicationView--pharmacyName': {
            fontWeight: FontWeights.semibold,
            fontSize: '1rem',
        },
        'wc-MedicationView--pharmacyText': {
            fontWeight: FontWeights.semibold,
            fontSize: '0.875rem',
            color: colors.fabric.neutrals.WCprimary,
            textDecoration: 'none',
        },
        'wc-MedicationView--cardLabel': {
            fontWeight: FontWeights.semibold,
            fontSize: 14,
        },
        'wc-MedicationView--textMediumBold': {
            fontWeight: FontWeights.semibold,
            fontSize: 16,
            ['@media print']: {
                fontWeight: FontWeights.regular,
                fontSize: 12,
            },
        },
        'wc-MedicationView--textSmallBold': {
            fontWeight: FontWeights.semibold,
            fontSize: 14,
            ['@media print']: {
                fontWeight: FontWeights.regular,
                fontSize: 12,
            },
        },
        'wc-MedicationView--CustomScheduleCard': {
            overflowX: 'auto',
            paddingBottom: 5,
        },
        'wc-MedicationView--CustomDateDisplay': {
            minWidth: 100,
        },
        'wc-MedicationView--clickableLinkText': {
            textDecoration: 'none',
            color: colors.fabric.neutrals.WCprimary,
        },
    });
};
