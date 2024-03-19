import { FontWeights, mergeStyleSets } from '@fluentui/react';
import { colors } from 'src/common/styles/colors';

// Extra custom padding to apply to right of close button
export const CLOSE_BUTTON_PADDING = 16;

export const getClassNames = () => {
    return mergeStyleSets({
        'wc-Feedback--ModalClass': {
            display: 'flex',
            flexFlow: 'column nowrap',
            alignItems: 'stretch',
        },
        'wc-Feedback--ModalHeader': {
            flex: '1 1 auto',
            borderTop: `4px solid ${colors.fabric.neutrals.WCSecondary}`,
            display: 'flex',
            alignItems: 'center',
            fontSize: 20,
            fontWeight: FontWeights.semibold,
            padding: '12px 12px 12px 24px',
            color: colors.fabric.neutrals.black,
        },
        'wc-Feedback--ModalBody': {
            padding: '0 24px 24px 24px',
        },
    });
};
