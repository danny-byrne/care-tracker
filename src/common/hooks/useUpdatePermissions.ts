import { usePermissionsService } from 'src/services/PermissionsService';

import { useEffect } from 'react';

export const useUpdatePermissions = (data) => {
    const { getPermissions, setPermissions } = usePermissionsService();

    const cachedPermissions = getPermissions();

    useEffect(() => {
        const roleEnum = data?.me?.role;
        if (cachedPermissions !== roleEnum && data) {
            setPermissions(roleEnum);
        }
    }, [data]);

    return cachedPermissions;
};
