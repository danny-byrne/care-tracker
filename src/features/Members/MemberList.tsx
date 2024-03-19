import { usePermissionsService } from 'src/services/PermissionsService';
import { useAddPanelControls } from 'src/common/hooks/useAddPanel';
import { useIsMobile } from 'src/common/hooks/useMediaQueries';

import React from 'react';
import { Stack, GroupedList, IGroup, Icon, DefaultButton } from '@fluentui/react';

import { getClassNames } from './MemberList.classNames';
import { MemberListItem } from './MemberListItem';
import { CareCircleMembers, UserData } from 'src/types/Member';

import { CareCircleMember } from 'src/types/CareCircle';
import { Roles } from 'src/graphQL/serverMocks/graphQLGeneratedCode';
import { Actions } from 'src/common/components';
import CopyCareCircleLinkAnchorButton from 'src/common/components/CopyCareCircleLinkAnchorButton';
import { trackClick } from 'src/wcpConsentInit';

const ORDERED_ROLES = ['OWNER', 'CONTRIBUTOR', 'READER'];

type MemberGrouping = {
    OWNER: CareCircleMember[];
    CONTRIBUTOR: CareCircleMember[];
    READER: CareCircleMember[];
};

interface ICareCircleListProps {
    careCircleId: string;
    careCircleMembers: CareCircleMembers;
    onClick?: (string) => void;
}
const MemberList: React.FC<ICareCircleListProps> = ({ careCircleMembers, onClick }) => {
    const classNames = getClassNames();
    const { getPermissions } = usePermissionsService();
    const { showAddPanel } = useAddPanelControls();
    const isMobile = useIsMobile();

    const ROLE_ICONS = {
        OWNER: <Icon iconName={'CreatorIcon'} aria-label={'Owner'} />,
        CONTRIBUTOR: <Icon iconName={'AdminIcon'} aria-label={'Contributor'} />,
        READER: <Icon iconName={'MemberIcon'} aria-label={'Reader'} />,
    };

    const filteredMembers: MemberGrouping = { OWNER: [], CONTRIBUTOR: [], READER: [] };
    careCircleMembers.forEach((member) => {
        const role = member.profile.role;
        if (Object.keys(filteredMembers).includes(role)) {
            filteredMembers[role].push(member);
        }
    });

    const getGroups = (members: MemberGrouping): IGroup[] => {
        const groups: IGroup[] = [];
        let currentIndex = 0;

        ORDERED_ROLES.forEach((role) => {
            const groupObj: IGroup = { key: role, name: role, startIndex: currentIndex, count: members[role].length };
            groups.push(groupObj);
            currentIndex += members[role].length;
        });

        const filteredGroups = groups.filter((group) => group.count !== 0);

        return filteredGroups;
    };

    const getListItems = (members: MemberGrouping) => {
        let listItems = [];

        ORDERED_ROLES.forEach((role) => {
            listItems = listItems.concat(members[role]);
        });

        return listItems;
    };

    const groups = getGroups(filteredMembers);
    const listItems = getListItems(filteredMembers);

    return (
        <Stack className={classNames['wc-MemberList--memberList']}>
            <Stack className={classNames['wc-MemberList--memberListContainer']} data-is-scrollable>
                <GroupedList
                    items={listItems}
                    groupProps={{
                        onRenderHeader: (props) => {
                            //eslint-disable-next-line
                            const { name } = props.group;
                            const showInviteButtons =
                                name === ORDERED_ROLES[0] && getPermissions() === Roles.Owner && !isMobile;

                            return (
                                <Stack horizontal className={classNames['wc-MemberList--togetherListHeader']}>
                                    {ROLE_ICONS[name]}
                                    {showInviteButtons && (
                                        <Actions>
                                            <CopyCareCircleLinkAnchorButton />
                                            <DefaultButton
                                                className={classNames['wc-MemberList--inviteButton']}
                                                onClick={() => {
                                                    trackClick('invite-button');
                                                    showAddPanel();
                                                }}
                                            >
                                                Invite
                                            </DefaultButton>
                                        </Actions>
                                    )}
                                </Stack>
                            );
                        },
                    }}
                    groups={groups}
                    onRenderCell={(nestingDepth: 1, item: UserData, itemIndex: number) => {
                        return (
                            <div data-selection-index={itemIndex} role="row">
                                <span role="cell">
                                    <MemberListItem {...item} onClick={onClick} />
                                </span>
                            </div>
                        );
                    }}
                />
            </Stack>
        </Stack>
    );
};

export default MemberList;
