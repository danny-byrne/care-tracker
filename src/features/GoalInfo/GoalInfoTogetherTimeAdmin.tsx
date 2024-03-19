import { useEffect, useState } from 'react';
import { useIsMobile } from 'src/common/hooks/useMediaQueries';
import {
    useGetCareRecipientPhotoQuery,
    useGetCareRecipientProfileQuery,
} from 'src/graphQL/serverMocks/graphQLGeneratedCode';
import { useNavigate } from 'react-router';
import { useHasCurrentUserOnboarded } from 'src/common/hooks/useHasCurrentUserOnboarded';

import { colors } from 'src/common/styles/colors';
import RouterConfig from 'src/app/RouterConfig';
import togetherTimeBackground from 'src/assets/GoalInfo/TT-BG-Info.png';
import GoalInfoLayout from './GoalInfoLayout';
import { useFeedbackService } from 'src/services/FeedbackService';
import { ERROR_MESSAGES, LOCAL_STORAGE_KEYS } from 'src/app/Strings';
import { usePermissionsService } from 'src/services/PermissionsService';

const GoalInfoTogetherTimeAdmin = () => {
    const themeColor = colors.windcrest.goals.togetherTime;
    const isMobile = useIsMobile();

    const { setErrorToast } = useFeedbackService();
    const { getIsOwner } = usePermissionsService();

    const { data, loading } = useGetCareRecipientProfileQuery({
        onError: () => {
            setErrorToast(ERROR_MESSAGES.GET_CARE_RECIPIENT);
        },
    });

    const { data: photoData, loading: photoLoading } = useGetCareRecipientPhotoQuery({
        onError: (error) => {
            if (
                error.message !== 'Response not successful: Received status code 500' &&
                error.message !== 'Not Found'
            ) {
                setErrorToast(error.message);
            }
        },
    });

    const navigate = useNavigate();
    const { hasOnboarded, hasOnboardedLoading } = useHasCurrentUserOnboarded();
    useEffect(() => {
        // Send user to Care Plan if they've already onboarded
        if (hasOnboarded) {
            localStorage.setItem(LOCAL_STORAGE_KEYS.HAS_ONBOARDED, 'true');
            navigate(RouterConfig.CarePlan);
        }
    }, [hasOnboarded, hasOnboardedLoading]);

    const [photoURL, setPhotoURL] = useState('');
    const [photoInitials, setPhotoInitials] = useState('');

    useEffect(() => {
        setPhotoURL(photoData?.careRecipientPhoto?.careRecipientImageURL);
    }, [photoData]);

    useEffect(() => {
        setPhotoInitials(data?.careRecipientProfile?.firstName.slice(0, 1));
    }, [data]);

    const titleTextMobile =
        data?.careRecipientProfile?.firstName !== undefined
            ? `Welcome to\n ${data?.careRecipientProfile?.firstName}'s Care Circle`
            : `Welcome to\n the Care Circle`;
    const titleTextDesktop =
        data?.careRecipientProfile?.firstName !== undefined
            ? `Welcome to\n ${data?.careRecipientProfile?.firstName}'s Care Circle`
            : `Welcome to the Care Circle`;
    const titleText = isMobile ? titleTextMobile : titleTextDesktop;

    const subTitleTextMobile = `As a caregiver you track medication,
    organize health information and create \nactivities to encourage others to get involved.`;
    const subTitleTextDesktop = `As a caregiver you track medication, organize health information and
    create activities to encourage others to get involved.`;
    const subTitleText = isMobile ? subTitleTextMobile : subTitleTextDesktop;

    const buttonText = 'Get involved';
    const route = RouterConfig.Activities;

    return (
        <GoalInfoLayout
            backgroundImage={togetherTimeBackground}
            {...{ titleText, subTitleText, buttonText, themeColor, route, photoURL, photoInitials }}
            // Back button is only shown for owners
            // Admins navigated from a screen other than Goals
            backButtonShown={getIsOwner()}
            loading={loading || photoLoading}
            showsPhoto
        />
    );
};

export default GoalInfoTogetherTimeAdmin;
