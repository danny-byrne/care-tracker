import { useEffect, useState } from 'react';
import { useGetCareTeamQuery } from 'src/graphQL/serverMocks/graphQLGeneratedCode';

export const useGetCareCircleData = () => {
    const careTeamQueryResult = useGetCareTeamQuery({ fetchPolicy: 'cache-and-network' });

    const { loading, error, data, startPolling, stopPolling } = careTeamQueryResult;
    const [careCircleId, setCareCircleId] = useState<string | null>(null);
    const [careCircleName, setCareCircleName] = useState<string | null>(null);
    const [careCircleMembers, setCareCircleMembers] = useState<any[]>([]);
    const [invites, setInvites] = useState<any[]>([]);

    useEffect(() => {
        if (data) {
            const { usersCareCircle, me } = data;
            const usersCareCircleWithCurrentUserInfo = {
                ...usersCareCircle,
                careCircleMembers: getCareCircleMembersWithCurrentUserDesignated(usersCareCircle, me),
            };

            setCareCircleId(me.careCircleId);
            setCareCircleName(usersCareCircleWithCurrentUserInfo.name);
            setCareCircleMembers(usersCareCircleWithCurrentUserInfo.careCircleMembers);
            setInvites(usersCareCircle.appInvitations);
        }

        if (loading) {
            setCareCircleName('Loading...');
            setCareCircleMembers([]);
        }

        if (error) {
            setCareCircleName('Error');
            setCareCircleMembers([]);
        }
    }, [loading, data, error]);

    return { careCircleId, careCircleName, careCircleMembers, invites, startPolling, stopPolling, error, loading };
};

const getCareCircleMembersWithCurrentUserDesignated = (usersCareCircle, me) => {
    return usersCareCircle.careCircleMembers.map((careCircleMember) => {
        const isCurrentUser = careCircleMember.careGiver.id === me.id;
        return {
            ...careCircleMember,
            isCurrentUser: isCurrentUser,
        };
    });
};
