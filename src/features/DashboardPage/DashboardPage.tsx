import { useEffect, useState } from 'react';
import { usePermissionsService } from 'src/services/PermissionsService';
import { useGetUserInfoLazyQuery } from 'src/graphQL/serverMocks/graphQLGeneratedCode';
import { useGetUserTermsOfServiceAgreementsInfoQuery } from 'src/graphQL/serverMocks/graphQLGeneratedCode';

import { useLocation, useNavigate } from 'react-router';
import RouterConfig from 'src/app/RouterConfig';
import { useHandleAuthentication } from 'src/common/hooks/useHandleAuthentication';

const DashboardPage = () => {
    // This is here to reset the user's permissions if an error occurred logging in and their permissions
    // can't be found in localStorage.
    const permissionsService = usePermissionsService();
    const [hasPermissions, setHasPermissions] = useState(permissionsService.getPermissions() !== undefined);
    const { isAuthenticated } = useHandleAuthentication();
    const { data } = useGetUserTermsOfServiceAgreementsInfoQuery();

    const navigate = useNavigate();
    const location = useLocation();
    const { pathname } = location;

    useEffect(() => {
        if (data?.me && pathname === RouterConfig.DashboardPage) {
            navigate(RouterConfig.CarePlan, { replace: true });
        }
    }, [pathname, data]);

    const [getUserInfo] = useGetUserInfoLazyQuery();

    useEffect(() => {
        const getUserData = async () => {
            const results = await getUserInfo();
            const { data } = results;

            const role = data.me.role;
            permissionsService.setPermissions(role);
            setHasPermissions(true);
        };

        if (!hasPermissions && isAuthenticated) {
            getUserData();
        }
    }, [hasPermissions, isAuthenticated]);

    return <></>;
};

export default DashboardPage;
