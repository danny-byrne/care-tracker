import React, { useEffect, useState } from 'react';

import SubHeaderLayout from 'src/common/components/Layout/SubHeaderLayout';

import { getClassNames } from './EmergencyContactsList.className';
import { useNavigate } from 'react-router';
import { useGetCareTeamQuery } from 'src/graphQL/serverMocks/graphQLGeneratedCode';
import { useFeedbackService } from 'src/services/FeedbackService';
import { ERROR_MESSAGES } from 'src/app/Strings';
import { Stack, Text } from '@fluentui/react';
import { CareCircleMember } from 'src/types/CareCircle';
import { MemberListItem } from 'src/features/Members/MemberListItem';
import RouterConfig from 'src/app/RouterConfig';

const EmergencyContactList: React.FC = () => {
    const classNames = getClassNames();

    const navigate = useNavigate();
    const { setErrorToast } = useFeedbackService();

    const [emergencyContacts, setEmergencyContacts] = useState<CareCircleMember[]>([]);

    const { data } = useGetCareTeamQuery({
        onError: () => {
            setErrorToast(ERROR_MESSAGES.GET_CARE_CIRCLE);
        },
    });

    useEffect(() => {
        const emergencyContactList = data
            ? data.usersCareCircle?.careCircleMembers?.filter((member) => member.isEmergencyContact)
            : [];

        setEmergencyContacts(emergencyContactList);
    }, [data]);

    return (
        <SubHeaderLayout title={'Care Plan'}>
            <Text className={classNames['wc-EmergencyContactsList--emergencyContactTitle']}>Emergency Contacts</Text>
            {data && (
                <Stack tokens={{ childrenGap: '16px' }}>
                    {emergencyContacts?.map((emergencyContact) => {
                        return (
                            <MemberListItem
                                careGiver={emergencyContact.careGiver}
                                relationshipToLovedOne={emergencyContact.relationshipToLovedOne}
                                onClick={(id) => navigate(RouterConfig.Member(id))}
                                isOnCarePlanPage
                                key={emergencyContact.id}
                            />
                        );
                    })}
                </Stack>
            )}
        </SubHeaderLayout>
    );
};

export default EmergencyContactList;
