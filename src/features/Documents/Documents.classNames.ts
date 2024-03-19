/*eslint-disable*/
import { mergeStyleSets, FontWeights } from '@fluentui/react';
import { BREAKPOINTS } from 'src/app/Breakpoints';
import { colors } from 'src/common/styles/colors';

interface ICarePlanClassNames {
    'wc-Documents--landingPage': string;
    'wc-Documents--title': string;
    'wc-Documents--subTitle': string;
    'wc-Documents--button': string;
    'wc-Documents--documentCardList': string;
    'wc-Documents--documentCard': string;
    'wc-Documents--documentIcon': string;
    'wc-Documents--documentDetails': string;
    'wc-Documents--documentTitle': string;
    'wc-Documents--documentSizeDate': string;
}

export const getClassNames = (): ICarePlanClassNames => {
    return mergeStyleSets({
        'wc-Documents--landingPage': {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },
        'wc-Documents--title': {
            fontSize: '24px',
            lineHeight: '32px',
            fontWeight: FontWeights.semibold,
            padding: '20px 0 8px',
        },
        'wc-Documents--subTitle': {
            fontSize: '16px',
            lineHeight: '20px',
            fontWeight: FontWeights.regular,
            paddingBottom: 30,
        },
        'wc-Documents--button': {
            width: '440px',
            boxShadow: '0px 0.3px 0.9px rgba(0, 0, 0, 0.1), 0px 1.6px 3.6px rgba(0, 0, 0, 0.13);',
            borderRadius: '12px',
            [BREAKPOINTS.MOBILE]: {
                width: '327px',
            },
        },
        'wc-Documents--documentCardList': {
            width: '50%',
            height: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
            [BREAKPOINTS.MOBILE]: {
                width: '100%',
            },
        },
        'wc-Documents--documentCard': {
            width: '100%',
            height: '72px',
            borderRadius: '12px',
            boxShadow: '0px 0.3px 0.9px rgba(0, 0, 0, 0.1), 0px 1.6px 3.6px rgba(0, 0, 0, 0.13);',
            display: 'flex',
            flexDirection: 'row',
            backgroundColor: '#FFFFFF',
            ':hover': {
                cursor: 'pointer',
                boxShadow: '0px 1.2px 3.6px rgba(0, 0, 0, 0.1), 0px 6.4px 14.4px rgba(0, 0, 0, 0.13)',
            },
        },
        'wc-Documents--documentIcon': {
            height: '100%',
            width: '72px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
        },
        'wc-Documents--documentDetails': {
            display: 'flex',
            flexDirection: 'column',
            marginTop: 14,
            maxWidth: '80%',
        },
        'wc-Documents--documentTitle': {
            fontSize: '17px',
            fontWeight: FontWeights.semibold,
            maxWidth: '90%',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
        },
        'wc-Documents--documentSizeDate': {
            fontSize: '14px',
            fontWeight: FontWeights.regular,
            color: '#6E6E6E',
        },
    });
};
