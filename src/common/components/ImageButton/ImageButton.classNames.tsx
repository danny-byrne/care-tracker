import { mergeStyleSets, FontWeights } from '@fluentui/react';
import { BREAKPOINTS } from 'src/app/Breakpoints';
import { colors } from 'src/common/styles/colors';
interface IImageButtonClassNames {
    'wc-ImageButton--Button': string;
    'wc-ImageButton--Image': string;
    'wc-ImageButton--Text': string;
}

export const getClassNames = (): IImageButtonClassNames => {
    return mergeStyleSets({
        'wc-ImageButton--Button': {
            width: '100% - 200px',
            boxShadow: '0px 0.3px 0.9px rgba(0, 0, 0, 0.1), 0px 1.6px 3.6px rgba(0, 0, 0, 0.13)',
            elevationDepth: '4',
            borderRadius: '12px',
            [BREAKPOINTS.DESKTOP_SMALL]: {
                width: 210,
                marginLeft: 8,
                marginRight: 8,
                align: 'center',
            },
        },
        'wc-ImageButton--Image': {
            verticalAlign: 'middle',
            textAlign: 'center',
            marginTop: 10,
            width: '100%',
        },
        'wc-ImageButton--Text': {
            color: colors.fabric.neutrals.black,
            fontWeight: FontWeights.semibold,
            fontSize: '1.0rem',
            textAlign: 'center',
            overflow: 'hidden',
            display: 'flex',
        },
        'wc-ImageButton--Stack': {
            width: '100%',
            height: '100%',
            padding: 25,
        },
    });
};
