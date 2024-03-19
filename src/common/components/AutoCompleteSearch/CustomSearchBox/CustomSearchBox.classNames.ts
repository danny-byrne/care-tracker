import { mergeStyleSets, FontWeights } from '@fluentui/react';
import { colors } from 'src/common/styles/colors';
import { BREAKPOINTS } from 'src/app/Breakpoints';

interface ISearchBoxClassNames {
    'wc-SearchBox--oneSuggestion': string;
    'wc-SearchBox--searchContainer': string;
    'wc-SearchBox--clearButtonHidden': string;
    'wc-SearchBox--suggestionBox': string;
    'wc-SearchBox--sectionHeaderText': string;
    'wc-SearchBox--stack': string;
    'wc-SearchBox--spinner': string;
}

export const getClassNames = (): ISearchBoxClassNames => {
    return mergeStyleSets({
        'wc-SearchBox--oneSuggestion': {
            margin: '2px',
            width: '95%',
            marginLeft: '16px',
            marginTop: '8px',
            marginBottom: '8px',
        },
        'wc-SearchBox--searchContainer': {
            position: 'relative',
            width: '100%',
            margin: 'auto',
        },
        'wc-SearchBox--clearButtonHidden': {
            display: 'none',
        },
        'wc-SearchBox--suggestionBox': {
            marginTop: '8px',
            marginBottom: '8px',
            maxHeight: '200px',
        },
        'wc-SearchBox--sectionHeaderText': {
            color: colors.fabric.neutrals.WCprimary,
            padding: 16,
            fontWeight: FontWeights.semibold,
        },
        'wc-SearchBox--stack': {
            width: '100%',
            marginRight: '-10px',
        },
        'wc-SearchBox--spinner': {
            position: 'absolute',
            left: '97%',
            top: '35%',
            [BREAKPOINTS.MOBILE]: {
                left: '90%',
            },
        },
    });
};
