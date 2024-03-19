import { mergeStyleSets, FontWeights } from '@fluentui/react';

interface IReuseableModalClassNames {
    'wc-ReuseableModal--modalContainer': string;
    'wc-ReuseableModal--modalContentContainer': string;
    'wc-ReuseableModal--modalTextContainer': string;
    'wc-ReuseableModal--modalTitleText': string;
    'wc-ReuseableModal--modalInfoText': string;
    'wc-ReuseableModal--modalButtonRow': string;
    'wc-ReuseableModal--confirmButton': string;
    'wc-ReuseableModal--closeButton': string;
}

export const getClassNames = (): IReuseableModalClassNames => {
    return mergeStyleSets({
        'wc-ReuseableModal--modalContainer': {
            display: 'flex',
            flexFlow: 'column nowrap',
            alignItems: 'stretch',
            minWidth: 282,
        },
        'wc-ReuseableModal--modalContentContainer': {
            paddingLeft: 24,
            paddingRight: 24,
            marginTop: 16,
        },
        'wc-ReuseableModal--modalTextContainer': {
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: 20,
            alignItems: 'center',
        },
        'wc-ReuseableModal--modalTitleText': {
            fontWeight: FontWeights.semibold,
            fontSize: 20,
            lineHeight: '1.75rem',
        },
        'wc-ReuseableModal--modalInfoText': {
            fontSize: 14,
            lineHeight: '1.25rem',
            marginTop: 20,
        },
        'wc-ReuseableModal--modalButtonRow': {
            display: 'flex',
            justifyContent: 'flex-end',
            marginTop: 16,
            marginBottom: 24,
        },
        'wc-ReuseableModal--confirmButton': {
            marginLeft: 8,
        },
        'wc-ReuseableModal--closeButton': {
            border: 'none',
            backgroundColor: 'transparent',
            minWidth: '0px',
        },
    });
};
