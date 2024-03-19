import { mergeStyleSets } from '@fluentui/react';
import { colors } from 'src/common/styles/colors';

interface ISideMenuClassNames {
    'wc-SideMenu--buttonContainer': string;
    'wc-SideMenu--container': string;
    'wc-SideMenu--iconClass': string;
    'wc-SideMenu--pageName': string;
    'wc-SideMenu--sideMenu': string;
    'wc-SideMenu--feedbackItem': string;
}

export const NavButtonBorderStyle = `3px solid ${colors.windcrest.headerBackground}`;

export const getClassNames = (isSelected: boolean = false): ISideMenuClassNames => {
    return mergeStyleSets({
        'wc-SideMenu--container': {
            minWidth: 68,
            alignItems: 'center',
        },
        'wc-SideMenu--buttonContainer': {
            alignItems: 'center',
            justifyContent: 'center',
            height: 56,
        },
        'wc-SideMenu--iconClass': [
            {
                marginBottom: 4.5,
                fontSize: 23,
            },
            isSelected && {
                color: '#0078d4',
            },
        ],
        'wc-SideMenu--pageName': [
            {
                lineHeight: 12,
                fontSize: 10,
            },
            isSelected && {
                color: 'blue',
            },
        ],
        'wc-SideMenu--sideMenu': {
            backgroundColor: colors.windcrest.headerBackground,
        },
        'wc-SideMenu--feedbackItem': {
            position: 'absolute',
            bottom: '20px',
            left: '16px',
        },
    });
};
