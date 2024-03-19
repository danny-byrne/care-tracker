import { FontWeights, mergeStyleSets } from '@fluentui/react';
import { colors } from 'src/common/styles/colors';

interface IImmunizationViewClassNames {
    'wc-PositivitySlot--positivitySlotContainer': string;
    'wc-PositivitySlot--positivitySlotHeader': string;
    'wc-PositivitySlot--positivitySlotHeaderText': string;
    'wc-PositivitySlot--positivitySlotHeaderDismissIcon': string;
    'wc-PositivitySlot--offsetDividerContainer': string;
    'wc-PositivitySlot--offsetDivider': string;
    'wc-PositivitySlot--positivitySlotMessage': string;
}

export const getClassNames = (): IImmunizationViewClassNames => {
    return mergeStyleSets({
        'wc-PositivitySlot--header': {
            fontWeight: FontWeights.bold,
            fontSize: '1.875rem',
            lineHeight: '30x',
        },
        'wc-PositivitySlot--positivitySlotContainer': {
            backgroundColor: colors.windcrest.dismissableMessageGray,
            borderRadius: '8px',
            border: '1px solid #E1E1E1',
            marginTop: '24px',
            marginBottom: '5px',
        },
        'wc-PositivitySlot--positivitySlotHeader': {
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '16px 16px 8px 16px',
        },
        'wc-PositivitySlot--positivitySlotHeaderDismissIcon': {
            cursor: 'pointer',
        },
        'wc-PositivitySlot--positivitySlotHeaderText': {
            fontSize: '1rem',
            lineHeight: '24px',
        },
        'wc-PositivitySlot--offsetDividerContainer': {
            paddingLeft: '10px',
        },
        'wc-PositivitySlot--offsetDivider': {
            border: '1px solid #E0E3E6',
        },
        'wc-PositivitySlot--positivitySlotMessage': {
            fontSize: '1rem',
            lineHeight: '22px',
            margin: '18px',
        },
    });
};
