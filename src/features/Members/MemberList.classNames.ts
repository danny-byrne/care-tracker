import { mergeStyleSets, FontSizes, FontWeights } from '@fluentui/react';
import { BREAKPOINTS } from 'src/app/Breakpoints';
import { colors } from 'src/common/styles/colors';

interface IMemberListClassNames {
    'wc-MemberList--careCircleContainer': string;
    'wc-MemberList--togetherListHeader': string;
    'wc-MemberList--togetherTimeMemberCard': string;
    'wc-MemberList--togetherTimeInviteCard': string;
    'wc-MemberList--memberList': string;
    'wc-MemberList--memberListContainer': string;
    'wc-MemberList--memberClass': string;
    'wc-MemberList--inviteClass': string;
    'wc-MemberList--textStack': string;
    'wc-MemberList--nameClass': string;
    'wc-MemberList--relationClassNotSet': string;
    'wc-MemberList--iconStack': string;
    'wc-MemberList--iconClass': string;
    'wc-MemberList--arrowIconClass': string;
    'wc-MemberList--careCircleNameClass': string;
    'wc-MemberList--emergencyContactText': string;
    'wc-MemberList--togetherContactInfoStack': string;
    'wc-MemberList--togetherContactInfoHeader': string;
    'wc-MemberList--togetherContactInfoDetail': string;
    'wc-MemberList--avatarContainer': string;
    'wc-MemberList--togetherInviteOptionsStack': string;
    'wc-MemberList--inviteButtonContainer': string;
    'wc-MemberList--careCircleSpinner': string;
    'wc-MemberList--selectableInvite': string;
    'wc-MemberList--inviteButton': string;
    'wc-MemberList--resendCancelButton': string;
}

export const getClassNames = (): IMemberListClassNames => {
    return mergeStyleSets({
        'wc-MemberList--careCircleContainer': {
            paddingBottom: '5rem',
        },
        'wc-MemberList--togetherListHeader': {
            marginTop: '1.5rem',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        'wc-MemberList--togetherTimeMemberCard': {
            marginTop: '1rem',
            ':hover': {
                boxShadow: '0px 0.6px 1.8px rgba(0, 0, 0, 0.1), 0px 3.2px 7.2px rgba(0, 0, 0, 0.13);',
            },
        },
        'wc-MemberList--togetherTimeInviteCard': {
            marginTop: '1rem',
        },
        'wc-MemberList--memberList': {
            width: '100%',
            [BREAKPOINTS.DESKTOP_SMALL]: {
                paddingRight: '2.5rem',
            },
        },
        'wc-MemberList--memberListContainer': {
            height: '100%', // Need a constant height here to prevent the list from pushing off copy link
        },
        'wc-MemberList--memberClass': {
            flexDirection: 'row',
            padding: '1rem',
            cursor: 'pointer',
        },
        'wc-MemberList--inviteClass': {
            flexDirection: 'row',
            padding: '1rem',
        },
        'wc-MemberList--textStack': {
            gap: '0.25rem',
        },
        'wc-MemberList--nameClass': {
            fontSize: 16,
            fontWeight: FontWeights.semibold,
        },
        'wc-MemberList--relationClassNotSet': {
            color: colors.fabric.neutrals.WCprimary,
        },
        'wc-MemberList--iconStack': {
            marginLeft: 'auto',
            flexDirection: 'row',
            alignItems: 'center',
        },
        'wc-MemberList--iconClass': {
            marginRight: 22,
            [BREAKPOINTS.DESKTOP_SMALL]: {
                marginRight: 0,
            },
        },
        'wc-MemberList--arrowIconClass': {
            width: 6,
            height: 10.5,
            resizeMode: 'contain',
        },
        'wc-MemberList--careCircleNameClass': {
            fontSize: FontSizes.size24,
            fontWeight: FontWeights.semibold,
            marginBottom: '1.2rem',
        },
        'wc-MemberList--emergencyContactText': {
            color: colors.windcrest.severeWarning,
            fontWeight: FontWeights.semibold,
        },
        'wc-MemberList--togetherContactInfoStack': {
            paddingLeft: '2.25rem',
            gap: '0.25rem',
            flex: 3,
        },
        'wc-MemberList--togetherContactInfoHeader': {
            fontWeight: FontWeights.semibold,
        },
        'wc-MemberList--togetherContactInfoDetail': {
            color: colors.fabric.neutrals.WCprimary,
            flex: 1,
            width: '15rem',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            display: 'block',
        },
        'wc-MemberList--avatarContainer': {
            flex: 0.75,
        },
        'wc-MemberList--togetherInviteOptionsStack': {
            flex: 3.75,
            paddingRight: '2.25rem',
            gap: '0.25rem',
        },
        'wc-MemberList--inviteButtonContainer': {
            paddingTop: '0.75rem',
            gap: '0.5rem',
        },
        'wc-MemberList--careCircleSpinner': {
            marginTop: '24px',
        },
        'wc-MemberList--selectableInvite': {
            flexDirection: 'row',
            padding: '1rem',
            cursor: 'pointer',
            ':hover': {
                boxShadow: '0px 0.6px 1.8px rgba(0, 0, 0, 0.1), 0px 3.2px 7.2px rgba(0, 0, 0, 0.13);',
            },
        },
        'wc-MemberList--inviteButton': {
            height: '36px',
            ':hover': {
                backgroundColor: colors.fabric.neutrals.gray20,
            },
        },
        'wc-MemberList--resendCancelButton': {
            ':hover': {
                backgroundColor: colors.fabric.neutrals.gray20,
            },
        },
    });
};
