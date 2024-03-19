import {
    mergeStyleSets,
    IWeeklyDayPickerStyleProps,
    IWeeklyDayPickerStyles,
    IStyleFunctionOrObject,
    FontWeights,
} from '@fluentui/react';
import { colors } from 'src/common/styles/colors';

interface IConditiondWizardClassNames {
    'wc-ConditionWizard--conditionPageContainer': string;
    'wc-ConditionWizard--conditionHeaderName': string;
    'wc-ConditionWizard--conditionHeaderText': string;
    'wc-ConditionWizard--selectionContainer': string;
    'wc-ConditionWizard--pillContainer': string;
    'wc-ConditionWizard--calendarContainer': string;
}

export const getClassNames = (): IConditiondWizardClassNames => {
    return mergeStyleSets({
        'wc-ConditionWizard--conditionPageContainer': {
            width: '100%',
            alignItems: 'center',
        },
        'wc-ConditionWizard--conditionHeaderName': {
            lineHeight: '1.625rem',
        },
        'wc-ConditionWizard--conditionHeaderText': {
            fontSize: '1.5rem',
            lineHeight: '1.625rem',
            fontWeight: FontWeights.semibold,
            textAlign: 'center',
        },
        'wc-ConditionWizard--selectionContainer': {
            width: '100%',
            paddingTop: '16px',
            paddingBottom: '24px',
        },
        'wc-ConditionWizard--pillContainer': {},
        'wc-ConditionWizard--calendarContainer': {
            width: '100%',
        },
    });
};

// TODO: Abstract this into a single instance across the repo. Delaying until merge with
//       prototype branch to handle merge conflicts
export const conditionWeeklydaypickerStyles: IStyleFunctionOrObject<
    IWeeklyDayPickerStyleProps,
    IWeeklyDayPickerStyles
> = {
    root: {
        width: '100%',
        padding: '0px',
        paddingTop: '24px',
    },
    table: {
        width: '100%',
    },
    dayCell: {
        color: colors.fabric.neutrals.gray130,
        fontSize: '14px',
        '&.ms-CalendarDay-hoverStyle': {
            backgroundColor: 'transparent',
        },
        '&.ms-CalendarDay-pressedStyle': {
            backgroundColor: 'transparent',
        },
        '::before': {
            border: 'none !important',
        },
    },
    dayButton: {
        fontSize: '16px',
        width: '30px',
        height: '30px',
        fontFamily:
            // eslint-disable-next-line
            '"Segoe UI", "Segoe UI Web (West European)", "Segoe UI", -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", sans-serif;',
        ':hover': {
            backgroundColor: colors.windcrest.headerBackground,
        },
    },
    daySelected: {
        backgroundColor: 'transparent',
        '::after': {
            content: 'none',
        },
        ':hover': {
            backgroundColor: 'transparent',
        },
        '&.ms-CalendarDay-hoverStyle': {
            backgroundColor: 'transparent',
        },
        '&.ms-CalendarDay-pressedStyle': {
            backgroundColor: 'transparent',
        },
        button: {
            backgroundColor: colors.fabric.neutrals.WCshade20,
            color: 'white',
            // Overriding default background change
            ':hover': {
                backgroundColor: colors.fabric.neutrals.WCshade20,
                color: 'white',
            },
        },
    },
    datesRight: {
        border: 'none',
    },
    dayIsToday: {
        backgroundColor: colors.windcrest.lightTheme,
        color: colors.fabric.neutrals.gray130,
        fontWeight: FontWeights.regular,
    },
    navigationIconButton: {
        display: 'none',
    },
};
