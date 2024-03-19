import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useFeedbackService } from 'src/services/FeedbackService';
import { usePermissionsService } from 'src/services/PermissionsService';
import {
    useCreateAccountMutation,
    useCreateCareCircleMutation,
    useJoinCircleFromInviteLinkMutation,
    Roles,
    useGetUserInfoLazyQuery,
    useGetCareRecipientProfileBasicLazyQuery,
} from 'src/graphQL/serverMocks/graphQLGeneratedCode';
import { useHandleAuthentication } from 'src/common/hooks/useHandleAuthentication';

import Avatar, { AvatarSizes } from 'src/common/components/Avatar';

import FullScreenErrorModal from 'src/common/components/Feedback/FullScreenErrorModal';

import RouterConfig from 'src/app/RouterConfig';
import { useFirstPartyAuth } from 'src/app/Constants';
import { AuthService } from 'src/services/AuthService';
import { wait } from 'src/common/Utility';
import { getClassNames } from './LoginLoadingPage.classNames';
import { AuthStatus } from 'src/services/AuthService.status';

import { ERROR_MESSAGES, LOCAL_STORAGE_KEYS } from 'src/app/Strings';
import { DEFAULT_INVITE_CODE } from 'src/app/Constants';
import { MuseaPersona } from 'src/assets/Misc/MuseaPersona';
import { MicrosoftLogo } from 'src/assets/Misc/MicrosoftLogo/MicrosoftLogo';
import ErrorBoundary from 'src/common/components/ErrorBoundary/ErrorBoundary';
import { useFeatureFlags } from 'src/common/hooks/useFeatureFlags';

const LoginLoadingPage = () => {
    const classNames = getClassNames();
    const navigate = useNavigate();
    const feedbackService = useFeedbackService();
    const permissionsService = usePermissionsService();
    const { isAuthenticated, hasStoredInviteCode } = useHandleAuthentication();

    const [profilePictureData, setProfilePictureData] = useState('');
    const [userName, setUserName] = useState('');
    const [userInfoCallMade, setUserInfoCallMade] = useState(false);

    const pageDelayForUser = 2000; // Time is extended to give team a longer look at profile loading page

    const { homePageState } = useFeatureFlags();

    // #region Queries & Mutations

    const [getUserInfo] = useGetUserInfoLazyQuery({ fetchPolicy: 'network-only' });

    const [createAccount] = useCreateAccountMutation({
        onError: () => {
            feedbackService.setErrorFullscreen(ERROR_MESSAGES.CREATE_ACCOUNT);
        },
    });

    const [createCareCircle] = useCreateCareCircleMutation({
        variables: { circleName: `${userName}'s Care Circle` },
        errorPolicy: 'all',
        onError: (error) => {
            // Handle user not in allow list to create care circle
            // Cast error as any to get past network errors not being passed as ApolloError type
            const err = error as any;

            if (err.networkError?.result?.errors[0].message === 'Unauthorized') {
                navigate(RouterConfig.LandingPage + '?notallowed=true');
            } else {
                feedbackService.setErrorFullscreen(ERROR_MESSAGES.CREATE_CARE_CIRCLE);
            }
        },
    });

    const [joinCareCircleFromInviteCode] = useJoinCircleFromInviteLinkMutation({
        onError: () => {
            feedbackService.setErrorFullscreen(ERROR_MESSAGES.JOIN_CARE_CIRCLE_FROM_INVITE_LINK);
        },
    });
    // #endregion

    const [getCareRecipientProfileBasics] = useGetCareRecipientProfileBasicLazyQuery();

    // #region useEffects
    useEffect(() => {
        queryUserData();
        getCareRecipient();
    }, [isAuthenticated]);

    // This useEffect runs after the invite code is stored by the useHandleAuthentication hook.
    // The hook only updates inviteCode after the initial authentication call, so the requestGraphConsent
    // call will not trigger this useEffect.

    // LocalStorage item is passed in to prevent a redirect loop from calling the graph consent
    // redirect every time.
    useEffect(() => {
        if (!useFirstPartyAuth) {
            const hasRequestedMsGraphConsent = localStorage.getItem(LOCAL_STORAGE_KEYS.HAS_REQUESTED_MS_GRAPH_CONSENT);

            if (hasRequestedMsGraphConsent !== 'true' && hasStoredInviteCode) {
                localStorage.setItem(LOCAL_STORAGE_KEYS.HAS_REQUESTED_MS_GRAPH_CONSENT, 'true');
                AuthService.requestGraphConsent();
            }
        }
    }, [hasStoredInviteCode]);
    // #endregion

    const getCareRecipient = async () => {
        if (isAuthenticated) {
            const results = await getCareRecipientProfileBasics();
            const careRecipientNameGiven = results.data?.careRecipientProfile?.firstName;
            if (careRecipientNameGiven) {
                localStorage.setItem(LOCAL_STORAGE_KEYS.RECIPIENT_NAME_GIVEN, 'true');
            }
        }
    };

    // #region functions
    const queryUserData = async () => {
        if (isAuthenticated) {
            const results = await getUserInfo();
            let data = results.data;

            if (results.error) {
                const error = results.error;
                const notFound = error.graphQLErrors.filter((gqError) => gqError.message.toLowerCase() === 'not found');
                if (notFound.length > 0) {
                    data = undefined;
                }
            }

            if (!data) {
                await createAccount();
                const results = await getUserInfo();
                data = results.data;
            }

            // We are going to find a way to store CareCircleId globally to allow quick access to value
            // across app without needing a network/cache call.
            // https://dev.azure.com/msresearch/Project-Windcrest/_workitems/edit/160629

            setDataFromUserResponse(data);

            let careCircleId = data.me.careCircleId;

            if (!careCircleId) {
                careCircleId = await setupCareCircleIfNeeded(careCircleId, data.me.id);

                if (!careCircleId) {
                    navigate(RouterConfig.LandingPage + '?notallowed=true');
                }

                // Get the role information now that they've created or joined a circle.
                const results = await getUserInfo();
                data = results.data;
            }

            navigateToDashboard(data, careCircleId);
        }
    };

    const setDataFromUserResponse = (data) => {
        if (!data) return;

        setProfilePictureData(data.me.imageBase64);
        setUserName(data.me.firstName);

        setUserInfoCallMade(true);
    };

    const setupCareCircleIfNeeded = async (careCircleId, careGiverId) => {
        if (!careCircleId) {
            const inviteCode = localStorage.getItem(LOCAL_STORAGE_KEYS.INVITE_CODE);
            if (typeof inviteCode !== 'string' || inviteCode === AuthStatus.NO_REDIRECT_STATE) {
                feedbackService.setErrorFullscreen(ERROR_MESSAGES.INVITE_CODE_CORRUPTED);
            } else {
                if (inviteCode === DEFAULT_INVITE_CODE) {
                    const result = await createCareCircle();
                    return result.data.createCareCircle?.result?.id;
                } else {
                    const result = await joinCareCircleFromInviteCode({
                        variables: {
                            careGiverId: careGiverId,
                            inviteCode: inviteCode,
                        },
                    });
                    return result.data.joinCareCircleFromInviteLink.result.careCircleId;
                }
            }
        }

        return careCircleId;
    };

    const navigateToDashboard = async (data, careCircleId) => {
        // Overwrite these two items to prevent issues from keeping stale values in localStorage.
        localStorage.removeItem(LOCAL_STORAGE_KEYS.INVITE_CODE);
        if (!useFirstPartyAuth) {
            localStorage.removeItem(LOCAL_STORAGE_KEYS.HAS_REQUESTED_MS_GRAPH_CONSENT);
        }

        if (careCircleId) {
            // CareCircleId and Care Circle Role are saved in localStorage for later reference without a
            // network call.
            localStorage.setItem(LOCAL_STORAGE_KEYS.CARE_CIRCLE_ID, careCircleId);

            const {
                role,
                agreesHasConsentToManageLoveOnesHealth,
                agreesToTermsAndPrivacy,
                understandsIntendedAppUse,
                understandsMicrosoftUseOfTheirData,
                understandsNotPermittedToUsePlatformForMinors,
                agreesToOpenAiUse,
            } = data.me;

            permissionsService.setPermissions(role);
            permissionsService.setAgreements(
                agreesHasConsentToManageLoveOnesHealth,
                agreesToTermsAndPrivacy,
                understandsIntendedAppUse,
                understandsMicrosoftUseOfTheirData,
                understandsNotPermittedToUsePlatformForMinors,
                agreesToOpenAiUse,
            );

            await wait(pageDelayForUser);

            if (
                ![
                    agreesHasConsentToManageLoveOnesHealth,
                    agreesToTermsAndPrivacy,
                    understandsIntendedAppUse,
                    understandsMicrosoftUseOfTheirData,
                    understandsNotPermittedToUsePlatformForMinors,
                    agreesToOpenAiUse,
                ].every((val) => val)
            ) {
                navigate(RouterConfig.TermsOfService, { replace: true });
            } else if (role === Roles.Pending) {
                navigate(RouterConfig.PendingUserPage);
            } else if (role === Roles.Reader) {
                navigate(RouterConfig.TogetherTimeLayout);
            } else if (homePageState) {
                navigate(RouterConfig.Home);
            } else {
                navigate(RouterConfig.DashboardPage);
            }
        } else {
            navigate(RouterConfig.TermsOfService, { replace: true });
        }
    };
    // #endregion

    return (
        <ErrorBoundary>
            <div className={classNames['wc-LoginLoadingPage--pageContainer']}>
                <div className={classNames['wc-LoginLoadingPage--userDataContainer']}>
                    <MicrosoftLogo />

                    <div className={classNames['wc-LoginLoadingPage--logoAvatar']}>
                        {!profilePictureData && <MuseaPersona />}
                        {profilePictureData && (
                            <Avatar name={userName} size={AvatarSizes.large} base64={profilePictureData} />
                        )}
                    </div>
                    {userInfoCallMade && (
                        <div className={classNames['wc-LoginLoadingPage--userGreetingDialogStyle']}>
                            <div>Hi {userName}</div>
                        </div>
                    )}
                </div>
                <FullScreenErrorModal />
            </div>
        </ErrorBoundary>
    );
};

export default LoginLoadingPage;
