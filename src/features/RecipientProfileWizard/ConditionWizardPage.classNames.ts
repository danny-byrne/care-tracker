import { FontWeights, mergeStyleSets } from '@fluentui/react';
import { colors } from 'src/common/styles/colors';

interface IConditionWizardClassNames {
    'wc-ConditionWizard--container': string;
    'wc-ConditionWizard--grayLine': string;
    'wc-ConditionWizard--helperText': string;
    'wc-ConditionWizard--pillContainer': string;
    'wc-ConditionWizard--selectedPill': string;
    'wc-ConditionWizard--pillText': string;
}

export const getClassNames = (): IConditionWizardClassNames => {
    return mergeStyleSets({
        'wc-ConditionWizard--container': {
            width: '100%',
            paddingLeft: '24px',
            paddingRight: '26px',
            overflow: 'scroll',
        },
        'wc-ConditionWizard--grayLine': {
            marginTop: '22px',
            border: `1px solid  ${colors.fabric.neutrals.gray30}`,
            width: '100%',
        },
        'wc-ConditionWizard--helperText': {
            marginTop: '4px',
            fontWeight: FontWeights.semibold,
            lineHeight: '36px',
            paddingBottom: '16px',
        },
        'wc-ConditionWizard--pillContainer': {},
        'wc-ConditionWizard--selectedPill': {
            background: '#D4ECF5',
            borderRadius: '50px',
            padding: '6px 12px',
            alignItems: 'center',
            cursor: 'pointer',
        },
        'wc-ConditionWizard--pillText': {
            fontWeight: FontWeights.semibold,
            fontSize: '0.75rem',
        },
    });
};
