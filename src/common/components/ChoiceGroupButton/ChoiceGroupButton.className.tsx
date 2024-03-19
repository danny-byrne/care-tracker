import { mergeStyleSets } from '@fluentui/react';
import { colors } from 'src/common/styles/colors';

interface IChoiceGroupButtonClassNames {
    'wc-ChoiceGroupButton--checkboxContainer': string;
}

export const getClassNames = (selected: boolean): IChoiceGroupButtonClassNames => {
    return mergeStyleSets({
        'wc-ChoiceGroupButton--checkboxContainer': [
            {
                width: '100%',
                background: 'white',
                justifyContent: 'space-between',
                padding: '8px 16px',
                borderRadius: '12px',
                height: '48px',
                alignItems: 'center',
            },
            selected && {
                border: `1px solid ${colors.fabric.neutrals.WCprimary}`,
            },
        ],
    });
};
