import { mergeStyleSets } from '@fluentui/react';

interface IAddressSearchClassNames {
    'wc-AddressSearch--spinner': string;
    'wc-AddressSearch--oneSuggestion': string;
}

export const getClassNames = (): IAddressSearchClassNames => {
    return mergeStyleSets({
        'wc-AddressSearch--spinner': {
            position: 'relative',
            right: '2rem',
        },
        'wc-AddressSearch--oneSuggestion': {
            margin: '2px',
            width: '95%',
            marginLeft: '16px',
            marginTop: '8px',
            marginBottom: '8px',
        },
    });
};
