import { FontWeights, mergeStyleSets } from '@fluentui/react';
import { toastLayer } from 'src/features/Medications/zIndex';
// Extra custom padding to apply to right of close button
export const CLOSE_BUTTON_PADDING = 16;

export const getClassNames = () => {
    return mergeStyleSets({
        'wc-Feedback--toastWrapper': {
            position: 'fixed',
            bottom: 94,
            height: '4.5rem',
            zIndex: toastLayer,
        },
        'wc-Feedback--ToastClass': {
            height: '100%',
            borderRadius: '12px',
            boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.14), 0px 0px 2px rgba(0, 0, 0, 0.12);',
            alignItems: 'center',
            paddingRight: `${CLOSE_BUTTON_PADDING}px`,
        },
        'wc-Feedback--toastContentContainer': {
            justifyContent: 'space-between',
            marginLeft: '0.5rem',
            alignItems: 'center',
        },
        'wc-Feedback--ModalClass': {
            maxHeight: '100%',
            height: '100%',
            width: '100%',
            maxWidth: '100%',
        },
        'wc-Feedback--messageText': {
            fontSize: '0.875rem',
        },
        'wc-Feedback--headerText': {
            fontWeight: FontWeights.semibold,
        },
        'wc-Feedback--actionButton': {
            fontWeight: FontWeights.semibold,
            border: 'none',
        },
    });
};
