import React from 'react';
import { List, Stack } from '@fluentui/react';
import { Invite } from 'src/types/CareCircle';
import { InviteListItem } from './InviteListItem';

import { getClassNames } from './MemberList.classNames';
import { InviteStatus } from 'src/graphQL/serverMocks/graphQLGeneratedCode';
import { CareCircleMembers } from 'src/types/Member';
import { LOCAL_STORAGE_KEYS } from 'src/app/Strings';

const RENDERED_INVITE_STATUSES = [InviteStatus.Created, InviteStatus.PendingApproval, InviteStatus.Sent];

interface IInviteListProps {
    invites: Invite[];
    careCircleId: string;
    careCircleMembers: CareCircleMembers;
}

const InviteList: React.FC<IInviteListProps> = ({ careCircleId, invites, careCircleMembers }) => {
    const classNames = getClassNames();

    const filteredInvites = invites.filter((invite) => {
        // Do not render Copy Link invites until they are accepted
        const createdCopyLinkInvite = invite.deliveryMethod === 'LINK' && invite.status === InviteStatus.Created;
        const statusToShow = RENDERED_INVITE_STATUSES.includes(invite.status);
        return statusToShow && !createdCopyLinkInvite;
    });

    // Number of pending invites used by event listener for alerting user when new members join
    const pendingInvites = invites.filter((invite) => {
        return invite.status === InviteStatus.PendingApproval;
    });
    localStorage.setItem(LOCAL_STORAGE_KEYS.INVITES_PENDING, `${pendingInvites.length}`);

    return (
        <Stack className={classNames['wc-MemberList--memberList']}>
            <Stack className={classNames['wc-MemberList--memberListContainer']} data-is-scrollable>
                <List
                    items={filteredInvites}
                    onRenderCell={(item: Invite) => {
                        return <InviteListItem invite={item} {...{ careCircleMembers, careCircleId }} />;
                    }}
                />
            </Stack>
        </Stack>
    );
};

export default InviteList;
