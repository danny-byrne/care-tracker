import { Roles } from '../graphQLGeneratedCode';

export const mockInviteEmail = 'MockEmail@mock.com';
export const mockUserName = 'Mock User 1';

export const CareCircle = () => ({
    careCircleMembers: [
        {
            careGiver: {
                displayName: mockUserName,
            },
            profile: {
                role: Roles.Contributor,
            },
        },
    ],
    appInvitations: [
        {
            deliveryMethod: 'EMAIL',
            status: 'PENDING_APPROVAL',
            inviteRecipientEmail: mockInviteEmail,
        },
    ],
});
