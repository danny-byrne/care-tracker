import { FontSizes, FontWeights, mergeStyleSets } from '@fluentui/react';
import { colors } from 'src/common/styles/colors';

interface IAppProfileClassNames {
    'wc-AppProfile--userInfoCard': string;
    'wc-AppProfile--profilePicture': string;
    'wc-AppProfile--boldedText': string;
    'wc-AppProfile--footerButton': string;
    'wc-AppProfile--userInformation': string;
    'wc-AppProfile--msaLink': string;
    'wc-AppProfile--menuItemTitle': string;
    'wc-AppProfile--menuHeaderContainer': string;
    'wc-AppProfile--subMenuTitleContainer': string;
    'wc-AppProfile--subMenuTitleText': string;
    'wc-AppProfile--buttonWithHoverColor': string;
    'wc-AppProfile--menuItemContainer': string;
    'wc-AppProfile--menuItemChevron': string;
    'wc-AppProfile--iconClass': string;
    'wc-AppProfile--iconTextContainer': string;
    'wc-AppProfile--subMenuContent': string;
    'wc-AppProfile--link': string;
    'wc-AppProfile--copyrightContainer': string;
}

export const getClassNames = (): IAppProfileClassNames => {
    return mergeStyleSets({
        'wc-AppProfile--userInfoCard': {
            flexDirection: 'row',
            paddingTop: 10,
        },
        'wc-AppProfile--profilePicture': {
            padding: '25px 16px 0px 16px',
        },
        'wc-AppProfile--boldedText': {
            fontWeight: FontWeights.semibold,
            fontSize: FontSizes.size16,
        },
        'wc-AppProfile--footerButton': {
            width: '100%',
            marginBottom: '10px',
        },
        'wc-AppProfile--userInformation': {
            alignItems: 'flex-start',
        },
        'wc-AppProfile--msaLink': {
            textDecoration: 'none',
        },
        'wc-AppProfile--menuItemTitle': {
            fontSize: FontSizes.size16,
        },
        'wc-AppProfile--menuHeaderContainer': {
            display: 'flex',
            flexDirection: 'row',
            height: 'auto',
            justifyContent: 'space-between',
            width: '100%',
            backgroundColor: colors.windcrest.pageBackground,
        },
        'wc-AppProfile--subMenuTitleContainer': {
            paddingTop: '8px',
            paddingLeft: '4px',
            paddingBottom: '8px',
            width: '100%',
        },
        'wc-AppProfile--subMenuTitleText': {
            fontWeight: FontWeights.semibold,
            fontSize: FontSizes.size16,
            paddingTop: '2px',
            paddingLeft: '12px',
            textAlign: 'start',
        },
        // TODO: Figure out how to DRY this out. className property does not allow for
        // multiple classes to be passed in
        'wc-AppProfile--buttonWithHoverColor': {
            border: 'none',
            backgroundColor: 'transparent',
            width: '100%',
            cursor: 'pointer',
            padding: 0,
            height: '48px',
            // TODO: update these two colors once the Theme is implemented
            ':hover': {
                backgroundColor: '#F3F2F1',
            },
            ':pressed': {
                backgroundColor: '#EDEBE9',
            },
        },
        'wc-AppProfile--menuItemContainer': {
            width: '100%',
        },
        'wc-AppProfile--menuItemChevron': {
            fontSize: '12px',
            color: '#605E5C',
        },
        'wc-AppProfile--iconClass': {
            paddingRight: '20px',
            fontSize: '20px',
        },
        'wc-AppProfile--iconTextContainer': {
            display: 'flex',
            alignItems: 'center',
            color: colors.fabric.neutrals.gray130,
        },
        'wc-AppProfile--subMenuContent': {
            fontSize: '16px',
            lineHeight: '22px',
            marginTop: '20px',
        },
        'wc-AppProfile--link': {
            textDecoration: 'none',
            color: colors.fabric.neutrals.WCprimary,
        },
        'wc-AppProfile--copyrightContainer': {
            marginLeft: '15px',
            fontSize: '14px',
            color: colors.fabric.neutrals.gray130,
            lineHeight: '24px',
        },
    });
};

// Overriding padding for hover background using recommended method from Fluent team
// https://github.com/microsoft/fluentui/issues/5914
interface IAppProfilePanelStyles {
    content: {
        padding: string;
    };
    commands: {
        padding: string;
    };
}

export const AppProfilePanelStyles: IAppProfilePanelStyles = {
    content: {
        padding: '0px',
    },
    commands: {
        padding: '0px',
    },
};
