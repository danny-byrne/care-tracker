import { mergeStyleSets } from '@fluentui/react';
import { CustomActionButtonType } from './CustomActionButton';
import { colors } from 'src/common/styles/colors';
import { BREAKPOINTS } from 'src/app/Breakpoints';

interface ICustomActionButtonClassNames {
    'wc-CustomActionButton--container': string;
    'wc-CustomActionButton--textContainer': string;
    'wc-CustomActionButton--text': string;
    'wc-CustomActionButton--buttonIcon': string;
    'wc-CustomActionButton--buttonIconLeft': string;
    'wc-CustomActionButton--textContainerLeftIcon': string;
    'wc-CustomActionButton--textSecondary': string;
    'wc-CustomActionButton--buttonIconLeftNotSet': string;
}

export const getClassNames = (
    buttonType: CustomActionButtonType = CustomActionButtonType.Middle,
    customClass: any = {},
): ICustomActionButtonClassNames => {
    return mergeStyleSets({
        'wc-CustomActionButton--container': [
            {
                width: '100%',
                height: 'auto',
                backgroundColor: colors.fabric.neutrals.white,
                border: 'none',
                padding: '0',
                [BREAKPOINTS.DESKTOP_SMALL]: {
                    width: 440,
                },
                // needed to prevent FluentUI styling override after click
                ':hover': {
                    backgroundColor: customClass.backgroundColor
                        ? customClass.backgroundColor
                        : colors.fabric.neutrals.white,
                    borderBottomColor: colors.fabric.neutrals.gray30,
                    boxShadow: '0px 0.6px 1.8px rgba(0, 0, 0, 0.1), 0px 3.2px 7.2px rgba(0, 0, 0, 0.13);',
                },
            },
            buttonType === CustomActionButtonType.Only && {
                borderRadius: '12px',
            },
            buttonType === CustomActionButtonType.Bottom && {
                borderRadius: '0px 0px 12px 12px',
            },
            buttonType === CustomActionButtonType.Top && {
                borderRadius: '12px 12px 0px 0px',
            },
            buttonType === CustomActionButtonType.Middle && {
                borderRadius: '0px',
            },
            customClass,
        ],
        'wc-CustomActionButton--textContainer': {
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            justifyContent: 'space-between',
            padding: '16px',
        },
        'wc-CustomActionButton--text': {
            fontSize: '1rem',
            color: colors.fabric.neutrals.WCprimary,
        },
        'wc-CustomActionButton--buttonIcon': {
            color: colors.fabric.neutrals.WCprimary,
            justifySelf: 'flex-end',
            position: 'relative',
            top: '2px',
        },
        'wc-CustomActionButton--buttonIconLeft': {
            color: colors.fabric.neutrals.WCprimary,
            justifySelf: 'flex-start',
            position: 'relative',
            top: '2px',
            paddingRight: '7px',
            [BREAKPOINTS.DESKTOP_SMALL]: {
                width: 'auto',
            },
        },
        'wc-CustomActionButton--buttonIconLeftNotSet': {
            color: colors.fabric.neutrals.gray90,
            justifySelf: 'flex-start',
            position: 'relative',
            top: '2px',
            paddingRight: '7px',
            pointerEvents: 'none',
            [BREAKPOINTS.DESKTOP_SMALL]: {
                width: 'auto',
            },
        },
        'wc-CustomActionButton--textContainerLeftIcon': {
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            justifyContent: 'flex-start',
            padding: '16px',
        },
        'wc-CustomActionButton--textSecondary': {
            fontSize: '1rem',
            color: colors.fabric.neutrals.gray90,
        },
    });
};
