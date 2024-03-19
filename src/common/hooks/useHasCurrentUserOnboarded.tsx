import { useEffect, useState } from 'react';
import { useGetCareCircleHasOnboardedQuery, useGetUserInfoQuery } from 'src/graphQL/serverMocks/graphQLGeneratedCode';
import { LOCAL_STORAGE_KEYS } from 'src/app/Strings';

export const useHasCurrentUserOnboarded = () => {
    const [hasOnboarded, setHasOnboarded] = useState(false);
    const [hasOnboardedLoading, setHasOnboardedLoadingoading] = useState(true);

    const { data: userData, loading: userDataLoading } = useGetUserInfoQuery();
    const { data: onboardedData, loading: onboardedDataLoading } = useGetCareCircleHasOnboardedQuery();

    useEffect(() => {
        const currentUser = onboardedData?.usersCareCircle?.careCircleMembers?.filter(
            (user) => user.careGiver?.id === userData?.me?.id,
        );

        const hasOnboardedLocally = localStorage.getItem(LOCAL_STORAGE_KEYS.HAS_ONBOARDED) !== null;
        let hasOnboardedServer = false;

        if (currentUser !== undefined && currentUser?.length !== 0) {
            hasOnboardedServer = currentUser[0].careGiver.profile.onboardingComplete;
        }

        setHasOnboarded(hasOnboardedLocally || hasOnboardedServer);
    }, [userData, onboardedData]);

    useEffect(() => {
        setHasOnboardedLoadingoading(userDataLoading || onboardedDataLoading);
    }, [userDataLoading, onboardedDataLoading]);

    return { hasOnboarded, hasOnboardedLoading };
};
