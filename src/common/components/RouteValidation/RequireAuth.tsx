/*eslint-disable*/
import { usePermissionsService } from 'src/services/PermissionsService';

import { Navigate, useLocation } from 'react-router-dom';

import { AuthService } from 'src/services/AuthService';
import RouterConfig from 'src/app/RouterConfig';
import { Roles } from 'src/graphQL/serverMocks/graphQLGeneratedCode';

import { ERROR_MESSAGES, LOCAL_STORAGE_KEYS } from 'src/app/Strings';
import { useHasCurrentUserOnboarded } from 'src/common/hooks/useHasCurrentUserOnboarded';

const RequireAuth = ({ children }: { children: JSX.Element }) => {
    const isAuthenticated = AuthService.getIsAuthenticated();
    let location = useLocation();
    const { getPermissions, getAgreements } = usePermissionsService();
    const role = getPermissions();
    const agreements = getAgreements();

    // Redirect to GetStarted if first name isn't given
    const careRecipientProfileIncomplete = localStorage.getItem(LOCAL_STORAGE_KEYS.RECIPIENT_NAME_GIVEN) === null;

    const careCircleId = localStorage.getItem(LOCAL_STORAGE_KEYS.CARE_CIRCLE_ID);

    const overridableRoutesForGetStarted = [
        RouterConfig.CarePlan,
        RouterConfig.Medications,
        RouterConfig.TogetherTimeLayout,
    ];
    const accessingRouteWithNoCareRecipientDataEntered =
        role !== Roles.Reader &&
        overridableRoutesForGetStarted.includes(location.pathname) &&
        careRecipientProfileIncomplete;

    const onboardingRoutes = [
        RouterConfig.GetStarted,
        RouterConfig.TermsSuccess,
        RouterConfig.GoalInfoTogetherTimeMember,
        RouterConfig.GoalInfoTogetherTimeAdmin,
        RouterConfig.GoalInfoCarePlan,
        RouterConfig.GoalInfoMedManager,
        RouterConfig.Goals,
        RouterConfig.NotificationsSubscribe,
    ];
    const { hasOnboarded, hasOnboardedLoading } = useHasCurrentUserOnboarded();
    const redirectToOnboarding = !hasOnboarded && !hasOnboardedLoading && !onboardingRoutes.includes(location.pathname);

    if (!isAuthenticated || careCircleId === null) {
        // Redirect them to the /landing page, but save the current location they were
        // trying to go to when they were redirected. This allows us to send them
        // along to that page after they login, which is a nicer user experience
        // than dropping them off at the home page.

        // This includes an error stored in the AUTH_ERROR key, which will show an error
        // toast explaining that there was an issue authenticating and prompting them
        // to log back in.

        // Do not log error for navigating to '/' route. This will be a common route for users
        // to log into when just navigating to the app, and an error every time would be a bad
        // experience.
        if (location.pathname !== '/') {
            localStorage.setItem(LOCAL_STORAGE_KEYS.AUTH_ERROR, ERROR_MESSAGES.AUTH_ERROR);
        }
        return <Navigate to={RouterConfig.LandingPage} state={{ from: location }} replace />;
    } else if (
        !agreements.agreesHasConsentToManageLoveOnesHealth ||
        !agreements.agreesToTermsAndPrivacy ||
        !agreements.understandsIntendedAppUse ||
        !agreements.understandsMicrosoftUseOfTheirData ||
        !agreements.understandsNotPermittedToUsePlatformForMinors ||
        !agreements.agreesToOpenAiUse
    ) {
        if (location.pathname !== RouterConfig.TermsOfService) {
            // Make sure they have agreed to our TOS.
            return <Navigate to={RouterConfig.TermsOfService} replace />;
        }
    } else if (role === Roles.Pending) {
        // Users who are Pending in the app will be navigated to the pending page until they are
        // accepted.
        return <Navigate to={RouterConfig.PendingUserPage} replace />;
    } else if (accessingRouteWithNoCareRecipientDataEntered) {
        return <Navigate to={RouterConfig.GetStarted} />;
        // }
    } else if (redirectToOnboarding) {
        // Navigate to onboarding page if user hasn't onboarded
        // query is made once user has navigated to page to confirm onboarding didn't happen in another browser
        if (role === Roles.Owner) {
            return <Navigate to={RouterConfig.Goals} replace />;
        } else if (role === Roles.Contributor) {
            return <Navigate to={RouterConfig.GoalInfoTogetherTimeAdmin} replace />;
        } else {
            return <Navigate to={RouterConfig.GoalInfoTogetherTimeMember} replace />;
        }
    }

    return children;
};

export default RequireAuth;
