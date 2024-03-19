// TODO: This file is based on designs for post pre-alpha, reuse the logic when
// we update activities

import {
    FontWeights,
    IDropdownStyleProps,
    IDropdownStyles,
    IStyleFunctionOrObject,
    mergeStyleSets,
} from '@fluentui/react';
import { BREAKPOINTS } from 'src/app/Breakpoints';

interface IActivityFormClassNames {
    'wc-ActivityForm--editAllergynName': string;
    'wc-ActivityForm--allergyNameFields': string;
    'wc-ActivityForm--accordion': string;
    'wc-ActivityForm--datePicker': string;
    'wc-ActivityForm--optionIcon': string;
    'wc-ActivityForm--optionItem': string;
    'wc-ActivityForm--availabilityButton': string;
    'wc-ActivityForm--availabilityContainer': string;
}

export const getClassNames = (): IActivityFormClassNames => {
    return mergeStyleSets({
        'wc-ActivityForm--editAllergynName': {
            fontWeight: FontWeights.semibold,
            fontSize: '1.5rem',
        },
        'wc-ActivityForm--allergyNameFields': {
            flex: 1,
        },
        'wc-ActivityForm--accordion': {
            marginBottom: 14,
            [BREAKPOINTS.DESKTOP_SMALL]: {
                width: 440,
                marginRight: 8,
            },
            width: '120%',
        },
        'wc-ActivityForm--datePicker': {
            flex: '3',
            [BREAKPOINTS.DESKTOP_SMALL]: {
                flex: '1',
            },
        },
        'wc-ActivityForm--optionIcon': {
            color: '#4426D9',
            marginRight: '8px',
            margin: '0px',
        },
        'wc-ActivityForm--optionItem': {
            display: 'flex',
            width: '100%',
            justifyContent: 'space-between',
        },
        'wc-ActivityForm--availabilityButton': {
            border: 'none',
            display: 'flex',
        },
        'wc-ActivityForm--availabilityContainer': {
            alignItems: 'center',
        },
    });
};

// TODO: DRY this out, it appears in multiple spots in the app
export const dropdownStyle: IStyleFunctionOrObject<IDropdownStyleProps, IDropdownStyles> = {
    subComponentStyles: {
        multiSelectItem: {
            checkbox: {
                display: 'none',
            },
        },
    },
};
