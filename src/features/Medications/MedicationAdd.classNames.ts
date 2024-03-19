import {
    mergeStyleSets,
    IStyleFunctionOrObject,
    IDropdownStyleProps,
    IDropdownStyles,
    FontWeights,
} from '@fluentui/react';
import { BREAKPOINTS } from 'src/app/Breakpoints';

interface IViewMedicationsClassNames {
    'wc-MedicationAdd--contentSubContainer': string;
    'wc-MedicationAdd--formContainer': string;
    'wc-MedicationAdd--optionItem': string;
    'wc-MedicationAdd--optionIcon': string;
    'wc-MedicationAdd--medicationImage': string;
    'wc-MedicationAdd--rdfText': string;
    'wc-MedicationAdd--medicationNameText': string;
    'wc-MedicationAdd--toggleRow': string;
}

export const getClassNames = (): IViewMedicationsClassNames => {
    return mergeStyleSets({
        'wc-MedicationAdd--contentSubContainer': {
            justifyContent: 'center',
        },
        'wc-MedicationAdd--formContainer': {
            maxWidth: '551px',
            width: '100%',
            paddingBottom: '5rem',
        },
        'wc-MedicationAdd--optionIcon': {
            color: '#4426D9',
            marginRight: '8px',
            margin: '0px',
        },
        'wc-MedicationAdd--optionItem': {
            display: 'flex',
            width: '100%',
            justifyContent: 'space-between',
        },
        'wc-MedicationAdd--medicationImage': {
            display: 'flex',
            justifyContent: 'center',
            paddingBottom: '16px',
            [BREAKPOINTS.DESKTOP_SMALL]: {
                paddingRight: '40px',
                display: 'block',
                paddingBottom: 0,
            },
        },
        'wc-MedicationAdd--rdfText': {
            fontSize: '1.125rem',
        },
        'wc-MedicationAdd--medicationNameText': {
            fontSize: '1.5rem',
            fontWeight: FontWeights.semibold,
            display: 'flex',
            justifyContent: 'center',
            paddingBottom: '7px',
            [BREAKPOINTS.DESKTOP_SMALL]: {
                display: 'inline',
                paddingBottom: 0,
            },
        },
        'wc-MedicationAdd--toggleRow': {
            justifyContent: 'space-between',
        },
    });
};

export const dropdownStyle: IStyleFunctionOrObject<IDropdownStyleProps, IDropdownStyles> = {
    subComponentStyles: {
        multiSelectItem: {
            checkbox: {
                display: 'none',
            },
        },
    },
};
