import React from 'react';
import { useNavigate } from 'react-router';
import { Formik } from 'formik';

import {
    Roles,
    useSetIsAdminMutation,
    useSetIsEmergencyContactMutation,
    useCareGiverSetRelationshipToLovedOneMutation,
    useCaregiverNotificationSettingsUpdateMutation,
} from 'src/graphQL/serverMocks/graphQLGeneratedCode';
import { ERROR_MESSAGES } from 'src/app/Strings';

import { useIsMobile } from 'src/common/hooks/useMediaQueries';
import { PanelContainerWithHeader } from 'src/common/components/Panel/PanelContainerWithHeader';
import RouterConfig from 'src/app/RouterConfig';
import MemberReusableView from './MemberReuseableView';
import MemberReuseableMobileView from './MemberReuseableMobileView';
import { UserData } from 'src/types/Member';
import { useFeedbackService } from 'src/services/FeedbackService';

interface MedicationEditItemProps {
    onDismiss: () => void;
    userData: UserData;
    canEditTimeZone: boolean;
}

const MemberEdit: React.FC<MedicationEditItemProps> = ({ onDismiss, userData, canEditTimeZone }) => {
    const feedbackService = useFeedbackService();
    const navigate = useNavigate();
    const isMobile = useIsMobile();

    const [updateIsAdmin, { loading: adminLoading }] = useSetIsAdminMutation();

    const [updateIsEmergencyContact, { loading: emergencyContactLoading }] = useSetIsEmergencyContactMutation();

    const [setCareGiverRelationship] = useCareGiverSetRelationshipToLovedOneMutation({
        onError: (err) => {
            feedbackService.setErrorToast(ERROR_MESSAGES.ADD_MEMBER_ERROR);
            throw new Error(err.graphQLErrors[0].extensions?.AdditionalDetails);
        },
    });

    const [updateTimeZone] = useCaregiverNotificationSettingsUpdateMutation({
        onError: (err) => {
            feedbackService.setErrorToast(ERROR_MESSAGES.EDIT_CARE_RECIPIENT);
            throw new Error(err.graphQLErrors[0].extensions?.AdditionalDetails);
        },
    });

    const { careGiver, profile, isEmergencyContact, relationshipToLovedOne } = userData;

    const isAdmin = profile.role === Roles.Contributor;

    const timeZoneID = careGiver.timeZoneID;

    return (
        <Formik
            // Toggles and enum form submission do not need extra validation
            validate={() => {}}
            initialValues={{
                isEmergencyContact: isEmergencyContact,
                isAdmin: isAdmin,
                relationshipToLovedOne: relationshipToLovedOne,
                timeZoneID: timeZoneID,
            }}
            onSubmit={async (values) => {
                try {
                    if (values.isEmergencyContact !== isEmergencyContact) {
                        await updateIsEmergencyContact({
                            variables: { careGiverId: careGiver.id, isEmergencyContact: values.isEmergencyContact },
                        });
                    }
                    if (values.isAdmin !== isAdmin) {
                        await updateIsAdmin({
                            variables: { careGiverId: careGiver.id, isAdmin: values.isAdmin },
                        });
                    }
                    if (values.relationshipToLovedOne !== relationshipToLovedOne) {
                        await setCareGiverRelationship({
                            variables: {
                                careGiverId: careGiver.id,
                                relationship: values.relationshipToLovedOne,
                            },
                        });
                    }
                    if (values.timeZoneID !== timeZoneID) {
                        await updateTimeZone({
                            variables: {
                                mobileNumber: careGiver.mobile,
                                timeZoneID: values.timeZoneID,
                            },
                        });
                    }

                    navigate(RouterConfig.Member(careGiver.id) + '?status=edited', { replace: true });
                } catch {
                    navigate(RouterConfig.Member(careGiver.id) + '?status=editFailed', { replace: true });
                }
            }}
        >
            {(formik) => {
                return (
                    <PanelContainerWithHeader
                        title={'Edit Profile'}
                        onClose={onDismiss}
                        {...{ formik }}
                        actionButtonText={'Save'}
                        onClickActionButton={formik.handleSubmit}
                        loading={emergencyContactLoading || adminLoading}
                    >
                        {isMobile ? (
                            <MemberReuseableMobileView isEdit {...{ userData, formik, canEditTimeZone }} />
                        ) : (
                            <MemberReusableView isEdit {...{ userData, formik }} />
                        )}
                    </PanelContainerWithHeader>
                );
            }}
        </Formik>
    );
};

export default MemberEdit;
