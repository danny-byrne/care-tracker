import { FontWeights, mergeStyleSets } from '@fluentui/react';
import { colors } from 'src/common/styles/colors';

interface IMemberReusableMobileViewClassNames {
    'wc-MemberReuseableMobileView--avatar': string;
    'wc-MemberReuseableMobileView--userInfoContainer': string;
    'wc-MemberReuseableMobileView--userNameText': string;
    'wc-MemberReuseableMobileView--roleIconContainer': string;
    'wc-MemberReuseableMobileView--relationshipText': string;
    'wc-MemberReuseableMobileView--relationshipDropdown': string;
    'wc-MemberReuseableMobileView--emergencyContactText': string;
    'wc-MemberReuseableMobileView--contactInfoSubContainer': string;
    'wc-MemberReuseableMobileView--contactInfoText': string;
    'wc-MemberReuseableMobileView--toggle': string;
    'wc-MemberReuseableMobileView--separator': string;
    'wc-MemberReuseableMobileView--detailsContainer': string;
    'wc-MemberReuseableMobileView--mobileViewContainer': string;
    'wc-MemberReuseableMobileView--pagePaddingWrapper': string;
    'wc-MemberReuseableMobileView--semiBoldText': string;
}

export const getClassNames = (): IMemberReusableMobileViewClassNames => {
    return mergeStyleSets({
        'wc-MemberReuseableMobileView--avatar': {
            marginBottom: '1rem',
        },
        'wc-MemberReuseableMobileView--userInfoContainer': {
            width: '100%',
            alignItems: 'center',
            paddingTop: '1.5rem',
        },
        'wc-MemberReuseableMobileView--memberDetails': {
            width: '100%',
            padding: '0px',
            marginTop: '10px',
            position: 'relative',
            top: '10px',
        },
        'wc-MemberReuseableMobileView--displayName': {
            color: colors.fabric.neutrals.gray900,
        },
        'wc-MemberReuseableMobileView--detailCategory': {
            fontWeight: '600',
            fontSize: '14px',
            lineHeight: '20px',
            marginBottom: '8px',
            color: colors.fabric.neutrals.gray160,
        },
        'wc-MemberReuseableMobileView--detailInfo': {
            paddingLeft: '8px',
            fontWeight: '400',
            marginBottom: '14px',
            lineHeight: '20px',
            color: colors.fabric.neutrals.gray130,
        },
        'wc-MemberReuseableMobileView--relationshipInfo': {
            fontWeight: '400',
            marginBottom: '10px',
            color: colors.fabric.neutrals.gray160,
        },
        'wc-MemberReuseableMobileView--memberRole': {
            fontWeight: '600',
            fontSize: '16px',
            lineHeight: '20px',
            margingTop: '10px',
            marginBottom: '10px',
            marginLeft: '2px',
        },
        'wc-MemberReuseableMobileView--infoIcon': {
            fontSize: 50,
            height: 10,
            width: 10,
            marginLeft: '25px',
            color: colors.fabric.neutrals.black,
        },
        'wc-MemberReuseableMobileView--userNameText': {
            fontWeight: FontWeights.semibold,
            fontSize: '1.5rem',
        },
        'wc-MemberReuseableMobileView--roleIconContainer': {
            paddingTop: '1rem',
        },
        'wc-MemberReuseableMobileView--relationshipText': {
            paddingTop: '0.25rem',
            fontWeight: FontWeights.semibold,
        },
        'wc-MemberReuseableMobileView--relationshipDropdown': {
            paddingTop: '0.25rem',
            height: '3rem',
        },
        'wc-MemberReuseableMobileView--emergencyContactText': {
            fontWeight: FontWeights.semibold,
            color: colors.windcrest.severeWarning,
            paddingTop: '0.25rem',
        },
        'wc-MemberReuseableMobileView--contactInfoSubContainer': {
            paddingRight: '3rem',
        },
        'wc-MemberReuseableMobileView--contactInfoText': {
            color: colors.fabric.neutrals.WCprimary,
        },
        'wc-MemberReuseableMobileView--toggle': {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingTop: '1rem',
        },
        'wc-MemberReuseableMobileView--separator': {
            height: '0px',
            paddingTop: '1.5rem',
        },
        'wc-MemberReuseableMobileView--detailsContainer': {
            alignItems: 'flexStart',
            paddingTop: '1.5rem',
        },
        'wc-MemberReuseableMobileView--mobileViewContainer': {
            width: '100%',
        },
        'wc-MemberReuseableMobileView--pagePaddingWrapper': {
            paddingLeft: '1.5rem',
        },
        'wc-MemberReuseableMobileView--semiBoldText': {
            fontWeight: FontWeights.semibold,
        },
    });
};
