import { mergeStyleSets } from '@fluentui/react';

interface IMemberClassNames {
    'wc-MemberView--memberCardAndActions': string;
}

export const getClassNames = (): IMemberClassNames => {
    return mergeStyleSets({
        'wc-MemberView--memberCardAndActions': {
            alignItems: 'center',
            width: '100%',
        },
    });
};
