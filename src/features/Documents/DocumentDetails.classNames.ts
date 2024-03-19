/*eslint-disable*/
import { mergeStyleSets, FontWeights } from '@fluentui/react';
import { BREAKPOINTS } from 'src/app/Breakpoints';
import { colors } from 'src/common/styles/colors';

interface IDocumentDetailsClassNames {
    'wc-DocumentDetails--landingPage': string;
    'wc-DocumentDetails--title': string;
    'wc-DocumentDetails--subTitle': string;
    'wc-DocumentDetails--buttonRow': string;
    'wc-DocumentDetails--details': string;
    'wc-DocumentDetails--documentCard': string;
    'wc-DocumentDetails--detail': string;
}

export const getClassNames = (): IDocumentDetailsClassNames => {
    return mergeStyleSets({
        'wc-DocumentDetails--landingPage': {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },
        'wc-DocumentDetails--title': {
            fontSize: '24px',
            lineHeight: '32px',
            fontWeight: FontWeights.semibold,
            padding: '20px 0 8px',
            textAlign: 'center',
            width: '95%',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
        },
        'wc-DocumentDetails--subTitle': {
            fontSize: '16px',
            lineHeight: '20px',
            fontWeight: FontWeights.regular,
            paddingBottom: 30,
            width: '75%',
            textAlign: 'center',
        },
        'wc-DocumentDetails--detailsText': {
            fontSize: '14px',
            lineHeight: '20px',
            fontWeight: FontWeights.semibold,
            paddingTop: 30,
        },
        'wc-DocumentDetails--buttonRow': {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignContent: 'center',
            borderRadius: '12px',
            [BREAKPOINTS.MOBILE]: {
                width: '327px',
            },
        },
        'wc-DocumentDetails--button': {
            color: colors.fabric.neutrals.WCprimary,
            borderRadius: '100px',
            border: '1px solid',
            marginLeft: '0.5rem!important',
        },
        'wc-DocumentDetails--details': {
            width: '50%',
            height: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
            [BREAKPOINTS.MOBILE]: {
                width: '100%',
            },
        },
        'wc-DocumentDetails--documentCard': {
            width: '100%',
            height: '113px',
            borderRadius: '12px',
            boxShadow: '0px 0.3px 0.9px rgba(0, 0, 0, 0.1), 0px 1.6px 3.6px rgba(0, 0, 0, 0.13);',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-evenly',
            overflow: 'hidden',
            paddingBottom: '10px',
            paddingTop: '10px',
        },
        'wc-DocumentDetails--detail': {
            height: '35%',
            fontSize: '16px',
            fontWeight: FontWeights.regular,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            marginLeft: '1rem',
        },
        'wc-DocumentDetails--divider': {
            width: '100%',
            margin: '0 1.5rem',
            paddingTop: 0,
            paddingBottom: 0,
        },
    });
};
