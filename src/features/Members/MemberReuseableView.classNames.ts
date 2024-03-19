import { FontWeights, mergeStyleSets } from '@fluentui/react';
import { colors } from 'src/common/styles/colors';
import { BREAKPOINTS } from 'src/app/Breakpoints';

interface IMemberClassNames {
    'wc-MemberReuseableView--viewContainer': string;
    'wc-MemberReuseableView--avatar': string;
    'wc-MemberReuseableView--userInfoContainer': string;
    'wc-MemberReuseableView--userNameText': string;
    'wc-MemberReuseableView--roleIconContainer': string;
    'wc-MemberReuseableView--relationshipContainer': string;
    'wc-MemberReuseableView--relationshipText': string;
    'wc-MemberReuseableView--relationshipDropdown': string;
    'wc-MemberReuseableView--emergencyContactText': string;
    'wc-MemberReuseableView--contactInfoSubContainer': string;
    'wc-MemberReuseableView--contactInfoText': string;
    'wc-MemberReuseableView--toggle': string;
    'wc-MemberReuseableView--separator': string;
    'wc-MemberReuseableView--semiBoldText': string;
    'wc-MemberReuseableView--timeZoneContainer': string;
    'wc-MemberReuseableView--timeZoneText': string;
    'wc-MemberReuseableView--timeZoneDropdown': string;
}

export const getClassNames = (): IMemberClassNames => {
    return mergeStyleSets({
        'wc-MemberReuseableView--viewContainer': { width: '100%' },
        'wc-MemberReuseableView--avatar': {
            marginBottom: '10px',
            paddingRight: '3rem',
            paddingLeft: '5rem',
        },
        'wc-MemberReuseableView--userInfoContainer': {
            width: '100%',
            paddingRight: '7rem',
        },
        'wc-MemberReuseableView--memberDetails': {
            width: '100%',
            padding: '0px',
            marginTop: '10px',
            position: 'relative',
            top: '10px',
        },
        'wc-MemberReuseableView--displayName': {
            color: colors.fabric.neutrals.gray900,
        },
        'wc-MemberReuseableView--detailCategory': {
            fontWeight: '600',
            fontSize: '14px',
            lineHeight: '20px',
            marginBottom: '8px',
            color: colors.fabric.neutrals.gray160,
        },
        'wc-MemberReuseableView--detailInfo': {
            paddingLeft: '8px',
            fontWeight: '400',
            marginBottom: '14px',
            lineHeight: '20px',
            color: colors.fabric.neutrals.gray130,
        },
        'wc-MemberReuseableView--relationshipInfo': {
            fontWeight: '400',
            marginBottom: '10px',
            color: colors.fabric.neutrals.gray160,
        },
        'wc-MemberReuseableView--memberRole': {
            fontWeight: '600',
            fontSize: '16px',
            lineHeight: '20px',
            margingTop: '10px',
            marginBottom: '10px',
            marginLeft: '2px',
        },
        'wc-MemberReuseableView--infoIcon': {
            fontSize: 50,
            height: 10,
            width: 10,
            marginLeft: '25px',
            color: colors.fabric.neutrals.black,
        },
        'wc-MemberReuseableView--userNameText': {
            fontWeight: FontWeights.semibold,
            fontSize: '1.5rem',
        },
        'wc-MemberReuseableView--roleIconContainer': {
            paddingTop: '1rem',
        },
        'wc-MemberReuseableView--relationshipContainer': {
            paddingTop: '1rem',
        },
        'wc-MemberReuseableView--relationshipText': {
            paddingTop: '0.25rem',
            fontWeight: FontWeights.semibold,
        },
        'wc-MemberReuseableView--relationshipDropdown': {
            paddingTop: '0.25rem',
        },
        'wc-MemberReuseableView--emergencyContactText': {
            fontWeight: FontWeights.semibold,
            color: colors.windcrest.severeWarning,
        },
        'wc-MemberReuseableView--contactInfoSubContainer': {
            paddingTop: '1rem',
        },
        'wc-MemberReuseableView--contactInfoText': {
            paddingTop: '0.25rem',
            color: colors.fabric.neutrals.WCprimary,
        },
        'wc-MemberReuseableView--toggle': {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingBottom: '0.5rem',
        },
        'wc-MemberReuseableView--separator': {
            height: '0px',
            paddingTop: '1.5rem',
        },
        'wc-MemberReuseableView--semiBoldText': {
            fontWeight: FontWeights.semibold,
        },
        'wc-MemberReuseableView--timeZoneContainer': {
            [BREAKPOINTS.DESKTOP_SMALL]: {
                paddingTop: '1rem',
            },
        },
        'wc-MemberReuseableView--timeZoneText': {
            paddingTop: '0.25rem',
            fontWeight: FontWeights.semibold,
        },
        'wc-MemberReuseableView--timeZoneDropdown': {
            paddingTop: '0.25rem',
        },
    });
};
