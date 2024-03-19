import { mergeStyleSets } from '@fluentui/react';
import { colors } from 'src/common/styles/colors';
import { BREAKPOINTS } from 'src/app/Breakpoints';

interface IActionsClassNames {
    'wc-FormButtons--buttonsContainer': string;
    'wc-FormButtons--buttonSize': string;
    'wc-FormButtons--buttonWrapper': string;
}

export const getClassNames = (): IActionsClassNames => {
    return mergeStyleSets({
        'wc-FormButtons--buttonWrapper': {
            paddingBottom: 30,
        },
        'wc-FormButtons--buttonsContainer': {
            paddingTop: '1rem',
            paddingBottom: '0.5rem',
            position: 'fixed',
            bottom: 0,
            width: '100%',
            [BREAKPOINTS.PANEL_OVERRIDE]: {
                width: '340px',
            },
            backgroundColor: colors.fabric.neutrals.white,
        },
        'wc-FormButtons--buttonSize': {
            width: '40%',
        },
    });
};
