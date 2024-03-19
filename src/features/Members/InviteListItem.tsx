import { useIsMobile } from 'src/common/hooks/useMediaQueries';
import {
    RelationshipsToLovedOne,
    Roles,
    useAddEmailInvitationMutation,
    useApproveInviteMutation,
    useRejectInviteMutation,
    useRevokeInviteMutation,
} from 'src/graphQL/serverMocks/graphQLGeneratedCode';
import { useFeedbackService } from 'src/services/FeedbackService';
import { useQueryStringParams } from 'src/common/hooks/useQueryStringParams';

import React from 'react';
import { DefaultButton, DocumentCard, Stack, Text } from '@fluentui/react';
import Avatar, { AvatarSizes } from 'src/common/components/Avatar';

import { Invite } from 'src/types/CareCircle';
import { getClassNames } from './MemberList.classNames';

import { ERROR_MESSAGES, USER_MESSAGES } from 'src/app/Strings';
import { InviteStatus } from 'src/graphQL/serverMocks/graphQLGeneratedCode';
import { CareCircleMembers } from 'src/types/Member';
import { getRelationshipText } from 'src/utils/utils';

interface IInviteListItemProps {
    invite: Invite;
    careCircleId: string;
    careCircleMembers: CareCircleMembers;
}

export const InviteListItem: React.FC<IInviteListItemProps> = ({ invite, careCircleId, careCircleMembers }) => {
    const classNames = getClassNames();

    const isMobile = useIsMobile();
    const { setSuccessToast, setErrorToast } = useFeedbackService();
    const { addSearchParam } = useQueryStringParams();

    const [resendInvite, { loading: emailLoading }] = useAddEmailInvitationMutation({
        variables: {
            email: invite.inviteRecipientEmail,
            careCircleId,
            makeAdmin: invite.makeAdmin,
            makeEmergencyContact: invite.makeEmergencyContact,
            relationshipToLovedOne: invite.relationshipToLovedOne,
        },
        errorPolicy: 'all',
        onCompleted: () => {
            setSuccessToast(USER_MESSAGES.EMAIL_SUCCESS);
        },
        onError: () => {
            // tricking formik error handling
            setErrorToast(ERROR_MESSAGES.EMAIL_ERROR);
        },
    });

    const [revokeInvite, { loading: revokeLoading }] = useRevokeInviteMutation({
        variables: { inviteId: invite.id },
        errorPolicy: 'all',
        refetchQueries: ['GetCareTeam'],
        onCompleted: () => {
            setSuccessToast(USER_MESSAGES.CANCELLED_SUCCESSFUL, USER_MESSAGES.CANCELLED_INVITATION);
        },
        onError: () => {
            // tricking formik error handling
            setErrorToast(ERROR_MESSAGES.REVOKE_ERROR);
        },
    });

    const [approveInvite, { loading: approveLoading }] = useApproveInviteMutation({
        refetchQueries: ['GetCareTeam'],
        onCompleted: () => {
            setSuccessToast(USER_MESSAGES.INVITATION_APPROVED);
        },
        onError: () => {
            // tricking formik error handling
            setErrorToast(ERROR_MESSAGES.APPROVE_ERROR);
        },
    });

    const [rejectInvite, { loading: rejectLoading }] = useRejectInviteMutation({
        refetchQueries: ['GetCareTeam'],
        onCompleted: () => {
            setSuccessToast(USER_MESSAGES.INVITATION_REJECTED);
        },
        onError: () => {
            // tricking formik error handling
            setErrorToast(ERROR_MESSAGES.REJECT_ERROR);
        },
    });

    const NewInvite = () => {
        const relationship = getRelationshipText(invite.relationshipToLovedOne);
        const relationshipSet = invite.relationshipToLovedOne !== RelationshipsToLovedOne.NotSet;

        return (
            <Stack className={classNames['wc-MemberList--inviteClass']}>
                <Stack className={classNames['wc-MemberList--togetherInviteOptionsStack']}>
                    <Text className={classNames['wc-MemberList--nameClass']}>Invite Pending</Text>

                    {relationshipSet && (
                        <>
                            {isMobile ? (
                                <MobileInviteTextStack email={invite.inviteRecipientEmail} />
                            ) : (
                                <>
                                    <Text>{relationship}</Text>
                                </>
                            )}
                        </>
                    )}

                    <Stack horizontal className={classNames['wc-MemberList--inviteButtonContainer']}>
                        <DefaultButton
                            className={classNames['wc-MemberList--resendCancelButton']}
                            onClick={() => resendInvite()}
                            disabled={emailLoading}
                        >
                            Resend
                        </DefaultButton>
                        <DefaultButton
                            className={classNames['wc-MemberList--resendCancelButton']}
                            onClick={() => revokeInvite()}
                            disabled={revokeLoading}
                        >
                            Cancel
                        </DefaultButton>
                    </Stack>
                </Stack>
                {!isMobile && <InviteTextStack email={invite.inviteRecipientEmail} />}
            </Stack>
        );
    };

    const PendingInvite = () => {
        // Invites currently only support email as a login method
        const getInviteCareCircleInfo = () => {
            const member = careCircleMembers.filter((member) => {
                return member.careGiver.id === invite.careGiverAccepted && member.profile.role === Roles.Pending;
            });

            return member;
        };

        const filteredMembers = getInviteCareCircleInfo();

        const memberInfo = filteredMembers.length > 0 ? filteredMembers[0] : null;

        // Return from function early if no matching members are found
        if (!memberInfo) return null;

        const { displayName, imageBase64, id, email } = memberInfo.careGiver;
        const showApprovePanel = () => addSearchParam({ mode: 'approve', careGiverId: id });

        return (
            <Stack className={classNames['wc-MemberList--selectableInvite']} onClick={showApprovePanel}>
                <Stack className={classNames['wc-MemberList--togetherInviteOptionsStack']}>
                    <Stack horizontal tokens={{ childrenGap: '16px' }}>
                        <Avatar name={displayName} base64={imageBase64} size={AvatarSizes.large} />
                        <Stack tokens={{ childrenGap: '5px' }}>
                            <Text className={classNames['wc-MemberList--nameClass']}>Admit to the Circle</Text>
                            {isMobile ? (
                                <MobileInviteTextStack email={email} />
                            ) : (
                                <>
                                    <Text>{displayName} wants to join the circle</Text>
                                </>
                            )}
                        </Stack>
                    </Stack>

                    <Stack horizontal className={classNames['wc-MemberList--inviteButtonContainer']}>
                        <DefaultButton
                            onClick={(e) => {
                                // Prevent parent onclick from being called
                                e.stopPropagation();
                                approveInvite({ variables: { careGiverId: id } });
                            }}
                            disabled={approveLoading}
                        >
                            Approve
                        </DefaultButton>
                        <DefaultButton
                            onClick={(e) => {
                                // Prevent parent onclick from being called
                                e.stopPropagation();
                                rejectInvite({ variables: { careGiverId: id } });
                            }}
                            disabled={rejectLoading}
                        >
                            Deny
                        </DefaultButton>
                    </Stack>
                </Stack>
                {!isMobile && <InviteTextStack email={email} />}
            </Stack>
        );
    };

    return (
        <DocumentCard className={classNames['wc-MemberList--togetherTimeInviteCard']}>
            {invite.status === InviteStatus.Created && <NewInvite />}
            {invite.status === InviteStatus.Sent && <NewInvite />}
            {invite.status === InviteStatus.PendingApproval && <PendingInvite />}
        </DocumentCard>
    );
};

interface IInviteTextStackProps {
    email: string;
}

const InviteTextStack: React.FC<IInviteTextStackProps> = ({ email }) => {
    const classNames = getClassNames();

    return (
        <>
            {/* mobile number won't be updated until backend supports SMS invites. Putting stack in for formatting. */}
            <Stack className={classNames['wc-MemberList--togetherContactInfoStack']}>
                {false && (
                    <>
                        <Text className={classNames['wc-MemberList--togetherContactInfoHeader']}>Phone</Text>
                        {/* <Text className={togetherContactInfoDetail}>{mobile}</Text> */}
                    </>
                )}
            </Stack>
            <Stack className={classNames['wc-MemberList--togetherContactInfoStack']}>
                {email && (
                    <>
                        <Text className={classNames['wc-MemberList--togetherContactInfoHeader']}>Email</Text>
                        <Text className={classNames['wc-MemberList--togetherContactInfoDetail']}>{email}</Text>
                    </>
                )}
            </Stack>
        </>
    );
};

const MobileInviteTextStack: React.FC<IInviteTextStackProps> = ({ email }) => {
    const classNames = getClassNames();

    return (
        <>
            {/* mobile number won't be updated until backend supports SMS invites. Putting stack in for formatting. */}
            {false &&
                {
                    /* <Text className={togetherContactInfoDetail}>{invite.mobile}</Text> */
                }}
            {email && <Text className={classNames['wc-MemberList--togetherContactInfoDetail']}>{email}</Text>}
        </>
    );
};
