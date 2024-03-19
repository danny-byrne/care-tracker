import { usePermissionsService } from 'src/services/PermissionsService';
import { Roles } from 'src/graphQL/serverMocks/graphQLGeneratedCode';

export const useCanSeeInvites = () => {
    const { getPermissions } = usePermissionsService();

    const rolesThatCanSeeInvites = [Roles.Owner, Roles.Contributor];
    const currentRole = getPermissions();
    const canSeeInvites = rolesThatCanSeeInvites.includes(currentRole);
    return canSeeInvites;
};
