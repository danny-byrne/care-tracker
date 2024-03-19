import React from 'react';
import { useNavigate } from 'react-router';
import { useIsMobile } from 'src/common/hooks/useMediaQueries';
import { useUpdateInviteMutation, useApproveInviteMutation } from 'src/graphQL/serverMocks/graphQLGeneratedCode';
import { Text } from '@fluentui/react';

import { Formik } from 'formik';
import { PanelContainerWithHeader } from 'src/common/components/Panel/PanelContainerWithHeader';
import RouterConfig from 'src/app/RouterConfig';
import MemberReusableView from './MemberReuseableView';
import MemberReuseableMobileView from './MemberReuseableMobileView';
import { useQueryStringParams } from 'src/common/hooks/useQueryStringParams';
import { useGetCareCircleData } from 'src/common/hooks/useGetCareCircleData';

import { useFeedbackService } from 'src/services/FeedbackService';
import { ERROR_MESSAGES, USER_MESSAGES } from 'src/app/Strings';
import { trackClick } from 'src/wcpConsentInit';

interface InviteApproveProps {
    onDismiss: () => void;
}

const InviteApprove: React.FC<InviteApproveProps> = ({ onDismiss }) => {
    const { getSearchParam } = useQueryStringParams();
    const { setSuccessToast, setErrorToast } = useFeedbackService();

    const careGiverId = getSearchParam('careGiverId');

    const { careCircleId, careCircleMembers, invites } = useGetCareCircleData();

    const navigate = useNavigate();
    const isMobile = useIsMobile();

    const [updateInvite, { loading: updateLoading }] = useUpdateInviteMutation();

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

    const filteredInviteArr = invites?.filter((invite) => invite.careGiverAccepted === careGiverId);
    const firstFitleredInvite = filteredInviteArr[0];

    const inviteId = filteredInviteArr.length > 0 ? firstFitleredInvite.id : null;

    if (!filteredInviteArr || filteredInviteArr.length === 0) {
        return <Text>Invite not found</Text>;
    }
    const filteredMemberArr = careCircleMembers.filter((member) => {
        return member.careGiver.id === firstFitleredInvite.careGiverAccepted;
    });

    if (filteredMemberArr.length === 0) {
        return <Text>Member not found</Text>;
    }

    const userData = filteredMemberArr[0];
    const { careGiver } = userData;

    return (
        <Formik
            // Toggles and enum form submission do not need extra validation
            validate={() => {}}
            initialValues={{
                isEmergencyContact: firstFitleredInvite.makeEmergencyContact,
                isAdmin: firstFitleredInvite.makeAdmin,
                relationshipToLovedOne: firstFitleredInvite.relationshipToLovedOne,
                timeZoneID: careGiver.timeZoneID,
            }}
            onSubmit={async (values) => {
                trackClick('admit-to-circle');
                try {
                    if (
                        values.isEmergencyContact !== firstFitleredInvite.makeEmergencyContact ||
                        values.isAdmin !== firstFitleredInvite.makeAdmin
                    ) {
                        try {
                            await updateInvite({
                                variables: {
                                    appInvitationId: inviteId,
                                    careCircleId: careCircleId,
                                    makeAdmin: values.isAdmin,
                                    makeEmergencyContact: values.isEmergencyContact,
                                    relationshipToLovedOne: values.relationshipToLovedOne,
                                },
                            });
                        } catch (error) {
                            setErrorToast(error.toString());
                        }
                    }

                    await approveInvite({ variables: { careGiverId: careGiver.id } });

                    navigate(RouterConfig.TogetherTimeLayout + '?status=approveSucceeded', { replace: true });
                } catch {
                    navigate(RouterConfig.TogetherTimeLayout + '?status=approveFailed', { replace: true });
                }
            }}
        >
            {(formik) => {
                return (
                    <PanelContainerWithHeader
                        title={'Admit to the Circle'}
                        onClose={onDismiss}
                        {...{ formik }}
                        actionButtonText={'Admit'}
                        onClickActionButton={formik.handleSubmit}
                        loading={updateLoading || approveLoading}
                        onlyDisableOnLoading
                    >
                        {isMobile ? (
                            <MemberReuseableMobileView isEdit {...{ userData, formik }} />
                        ) : (
                            <MemberReusableView isEdit {...{ userData, formik }} />
                        )}
                    </PanelContainerWithHeader>
                );
            }}
        </Formik>
    );
};

export default InviteApprove;
