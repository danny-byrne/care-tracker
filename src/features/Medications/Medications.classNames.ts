import {
    mergeStyleSets,
    IWeeklyDayPickerStyleProps,
    IWeeklyDayPickerStyles,
    IStyleFunctionOrObject,
    FontWeights,
} from '@fluentui/react';
import { colors } from 'src/common/styles/colors';
import { FONT_FAMILY } from 'src/common/styles/constants';

interface IViewTodayClassNames {
    'wc-Medications--hourText': string;
}

export const getClassNames = (): IViewTodayClassNames => {
    return mergeStyleSets({
        'wc-Medications--hourText': {
            display: 'flex',
            fontWeight: '600',
            fontSize: '14px',
            lineHeight: '20px',
            color: '#323130',
            padding: '12px',
        },
    });
};

// TODO: Abstract this into a single instance across the repo. Delaying until merge with
//       prototype branch to handle merge conflicts
export const weeklydaypickerStyles: IStyleFunctionOrObject<IWeeklyDayPickerStyleProps, IWeeklyDayPickerStyles> = {
    root: {
        width: '100%',
        padding: '0px',
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
            FONT_FAMILY,
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
    dayIsToday: {
        backgroundColor: 'transparent',
        color: colors.fabric.neutrals.gray130,
        fontWeight: FontWeights.regular,
    },
    navigationIconButton: {
        height: '53px',
        backgroundColor: 'transparent',
        color: colors.fabric.neutrals.gray110,
    },
};
