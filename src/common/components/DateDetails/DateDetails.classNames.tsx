import { mergeStyleSets, FontWeights } from '@fluentui/react';
import { BREAKPOINTS } from 'src/app/Breakpoints';

interface IDateDetailsClassNames {
    'wc-DateDetails--dayAndMonthPicker': string;
    'wc-DateDetails--yearPicker': string;
    'wc-DateDetails--unsureText': string;
    'wc-DateDetails--container': string;
}

export const getClassNames = (): IDateDetailsClassNames => {
    return mergeStyleSets({
        'wc-DateDetails--dayAndMonthPicker': {
            flex: '1',
            width: '50%',
            [BREAKPOINTS.DESKTOP_SMALL]: {
                flex: '1',
            },
        },
        'wc-DateDetails--yearPicker': {
            flex: '1',
            [BREAKPOINTS.DESKTOP_SMALL]: {
                flex: '1',
            },
        },
        'wc-DateDetails--unsureText': {
            fontWeight: FontWeights.semibold,
        },
        'wc-DateDetails--container': {
            ':not(:first-child)': {
                marginTop: 0,
            },
        },
    });
};
