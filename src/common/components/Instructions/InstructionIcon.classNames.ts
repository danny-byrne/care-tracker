import { mergeStyleSets } from '@fluentui/react';
import { colors } from 'src/common/styles/colors';

interface IInstructionsClassNames {
    'wc-InstructionIcon--selectedIcon': string;
    'wc-InstructionIcon--iconContent': string;
    'wc-InstructionIcon--notSelectedIcon': string;
    'wc-InstructionIcon--selectedText': string;
    'wc-InstructionIcon--notSelectedText': string;
    'wc-InstructionIcon--wrapper': string;
    'wc-InstructionIcon--strikethrough': string;
    'wc-InstructionIcon--notSelectedStrikethrough': string;
}

export const getClassNames = (): IInstructionsClassNames => {
    return mergeStyleSets({
        'wc-InstructionIcon--selectedIcon': {
            width: '3.1rem',
            height: '3.1rem',
            borderRadius: '1.563rem',
            backgroundColor: colors.windcrest.fabBackground,
            color: colors.fabric.neutrals.white,
            display: 'flex',
            alignItems: 'center',
            alignContent: 'center',
            justifyContent: 'center',
            flexWrap: 'nowrap',
            position: 'relative',
        },
        'wc-InstructionIcon--iconContent': {
            fontSize: '1.2rem',
        },
        'wc-InstructionIcon--notSelectedIcon': {
            width: '3rem',
            height: '3rem',
            borderRadius: '1.563rem',
            backgroundColor: colors.fabric.neutrals.gray10,
            color: colors.windcrest.fabBackground,
            display: 'flex',
            alignItems: 'center',
            alignContent: 'center',
            justifyContent: 'center',
            flexWrap: 'nowrap',
            position: 'relative',
        },
        'wc-InstructionIcon--selectedText': {
            fontSize: '1rem',
            color: colors.fabric.neutrals.black,
            textAlign: 'center',
            fontWeight: 'bold',
        },
        'wc-InstructionIcon--notSelectedText': {
            fontSize: '1rem',
            color: colors.fabric.neutrals.black,
            align: 'center',
            textAlign: 'center',
        },
        'wc-InstructionIcon--wrapper': {
            width: '3rem',
        },
        'wc-InstructionIcon--strikethrough': {
            fontSize: '3.1rem',
            color: colors.fabric.neutrals.gray10,
            position: 'absolute',
        },
        'wc-InstructionIcon--notSelectedStrikethrough': {
            fontSize: '3.1rem',
            color: colors.windcrest.fabBackground,
            position: 'absolute',
        },
    });
};
