import { mergeStyleSets } from '@fluentui/react';
import { colors } from 'src/common/styles/colors';

interface IWizardReceiptPageClassNames {
    'wc-WizardReceiptPage--pageContainer': string;
    'wc-WizardReceiptPage--container': string;
    'wc-WizardReceiptPage--sectionHeaderText': string;
    'wc-WizardReceiptPage--valueText': string;
}

export const getClassNames = (): IWizardReceiptPageClassNames => {
    return mergeStyleSets({
        'wc-WizardReceiptPage--pageContainer': {
            width: '100%',
            paddingLeft: '24px',
            paddingRight: '26px',
            overflow: scroll,
            paddingBottom: '12px',
        },
        'wc-WizardReceiptPage--container': {
            width: '100%',
            padding: '16px',
            background: 'white',
            boxShadow: '0px 0.3px 0.9px rgba(0, 0, 0, 0.1), 0px 1.6px 3.6px rgba(0, 0, 0, 0.13)',
            borderRadius: '12px',
        },
        'wc-WizardReceiptPage--sectionHeaderText': {
            fontSize: '0.8125rem',
            lineHeight: '1rem',
        },
        'wc-WizardReceiptPage--valueText': {
            fontSize: '0.9375rem',
            color: colors.fabric.neutrals.WCprimary,
            lineHeight: '1.25rem',
        },
    });
};
