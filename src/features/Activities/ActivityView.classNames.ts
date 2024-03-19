import { FontWeights, mergeStyleSets } from '@fluentui/react';
import { BREAKPOINTS } from 'src/app/Breakpoints';
import { colors } from 'src/common/styles/colors';

interface IActivityViewClassNames {
    'wc-ActivityView--title': string;
    'wc-ActivityView--sectionTitle': string;
    'wc-ActivityView--cardContainer': string;
    'wc-ActivityView--name': string;
    'wc-ActivityView--itemCell': string;
    'wc-ActivityView--stackContainer': string;
    'wc-ActivityView--phoneNumber': string;
    'wc-ActivityView--address': string;
    'wc-ActivityView--phoneOrAddressContainer': string;
    'wc-ActivityView--icon': string;
    'wc-ActivityView--pageContainer': string;
    'wc-ActivityView--inviteeCard': string;
    'wc-ActivityView--InviteeName': string;
    'wc-ActivityView--InviteeRelationship': string;
    'wc-ActivityView--buttonContainer': string;
    'wc-ActivityView--listContainer': string;
    'wc-ActivityView--clickableLinkText': string;
    'wc-ActivityView--backButton': string;
}

export const getClassNames = (): IActivityViewClassNames => {
    return mergeStyleSets({
        'wc-ActivityView--title': {
            fontWeight: FontWeights.semibold,
            fontSize: '1.5rem',
            display: 'flex',
            justifyContent: 'center',
            [BREAKPOINTS.DESKTOP_SMALL]: {
                justifyContent: 'flex-start',
            },
        },
        'wc-ActivityView--sectionTitle': {
            fontWeight: FontWeights.semibold,
        },
        'wc-ActivityView--cardContainer': {
            padding: '16px',
        },
        'wc-ActivityView--name': {
            fontWeight: FontWeights.semibold,
        },
        'wc-ActivityView--itemCell': {
            minHeight: 54,
            paddingTop: 16,
            boxSizing: 'border-box',
            display: 'flex',
        },
        'wc-ActivityView--stackContainer': {
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        'wc-ActivityView--phoneNumber': {
            fontWeight: FontWeights.semibold,
            fontSize: '0.875rem',
            color: colors.fabric.neutrals.WCprimary,
            textDecoration: 'none',
        },
        'wc-ActivityView--address': {
            fontWeight: FontWeights.semibold,
            fontSize: '0.875rem',
            // Uncomment when address link is implemented
            // color: colors.fabric.neutrals.WCprimary,
            width: '100%',
        },
        'wc-ActivityView--phoneOrAddressContainer': {
            justifyContent: 'center',
            [BREAKPOINTS.DESKTOP_SMALL]: {
                justifyContent: 'flex-start',
            },
        },
        'wc-ActivityView--icon': {
            alignSelf: 'center',
            fontSize: '0.875rem',
        },
        'wc-ActivityView--pageContainer': {
            paddingBottom: '10rem',
            [BREAKPOINTS.DESKTOP_SMALL]: {
                width: '549px',
                marginLeft: 50,
            },
        },
        'wc-ActivityView--contentContainer': {
            width: '100%',
        },
        'wc-ActivityView--AvailabilityContent': {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'start',
            gap: 5,
        },
        'wc-ActivityView--AvailabilityLabel': {
            fontWeight: FontWeights.semibold,
            fontSize: 16,
        },
        'wc-ActivityView--AvailabilityText': {
            fontSize: 16,
        },
        'wc-ActivityView--DescriptionText': {
            width: '90%',
            fontSize: 16,
        },
        'wc-ActivityView--clickableLinkText': {
            fontSize: 16,
            color: colors.fabric.neutrals.WCprimary,
            textDecoration: 'none',
        },
        'wc-ActivityView--inviteeCard': {
            width: '95%',
        },
        'wc-ActivityView--nameAndRelationshipContainer': {
            width: '60%',
        },
        'wc-ActivityView--InviteeRelationship': {
            fontSize: 14,
        },
        'wc-ActivityView--InviteeName': {
            fontSize: 16,
            fontWeight: FontWeights.semibold,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
        },
        'wc-ActivityView--backButton': {
            [BREAKPOINTS.MOBILE]: {
                position: 'relative',
                left: '-42%',
            },
        },
        'wc-ActivityView--buttonContainer': {
            width: '100%',
            height: '36px',
        },
        'wc-ActivityView--listContainer': {
            width: '100%',
        },
    });
};
