import { mergeStyleSets } from '@fluentui/react';
import { colors } from 'src/common/styles/colors';

interface IBottomMenuClassNames {
    'wc-BottomMenu--bottomMenu': string;
}

export const BOTTOM_NAV_HEIGHT = '65px';

export const getClassNames = (): IBottomMenuClassNames => {
    return mergeStyleSets({
        'wc-BottomMenu--bottomMenu': {
            flex: 'row',
            justifyContent: 'space-evenly',
            backgroundColor: colors.windcrest.headerBackground,
            height: BOTTOM_NAV_HEIGHT,
            width: '100%',
            boxShadow: '0px 0.3px 0.9px rgba(0, 0, 0, 0.1), 0px 1.6px 3.6px rgba(0, 0, 0, 0.13)',
            paddingTop: '15px',
            cursor: 'pointer',
        },
    });
};
