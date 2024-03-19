import { usePermissionsService } from 'src/services/PermissionsService';
import { useFeedbackService } from 'src/services/FeedbackService';

import { Navigate } from 'react-router-dom';

import RouterConfig from 'src/app/RouterConfig';
import { ERROR_MESSAGES } from 'src/app/Strings';

const RequireAdminPermissions = ({ children }: { children: JSX.Element }) => {
    const permissionsService = usePermissionsService();
    const feedbackService = useFeedbackService();

    if (!permissionsService.getHasAdminPermissions()) {
        feedbackService.setErrorToast(ERROR_MESSAGES.NO_MEDICATIONS_PERMISSIONS);
        return <Navigate to={RouterConfig.TogetherTimeLayout} />;
    }

    return children;
};

export default RequireAdminPermissions;
