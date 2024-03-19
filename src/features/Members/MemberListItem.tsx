import React from 'react';
import { DocumentCard, Stack, Text } from '@fluentui/react';

import Avatar, { AvatarSizes } from 'src/common/components/Avatar';
import { getClassNames } from './MemberList.classNames';
import { GetCareTeamQuery, RelationshipsToLovedOne } from 'src/graphQL/serverMocks/graphQLGeneratedCode';
import { useIsMobile } from 'src/common/hooks/useMediaQueries';
import { getRelationshipText, getRelationshipCardText, formatPhoneNumber } from 'src/utils/utils';
import { useNavigate } from 'react-router';
import RouterConfig from 'src/app/RouterConfig';
import { usePermissionsService } from 'src/services/PermissionsService';
interface IMemberListItemProps {
    profile?: GetCareTeamQuery['usersCareCircle']['careCircleMembers'][0]['profile'];
    careGiver?: GetCareTeamQuery['usersCareCircle']['careCircleMembers'][0]['careGiver'];
    isEmergencyContact?: boolean;
    isCurrentUser?: boolean;
    onClick?: (string) => void;
    relationshipToLovedOne?: RelationshipsToLovedOne;
    isOnCarePlanPage?: boolean;
}
export const MemberListItem: React.FC<IMemberListItemProps> = ({
    careGiver,
    isEmergencyContact,
    onClick,
    relationshipToLovedOne,
    isOnCarePlanPage,
}) => {
    const { displayName } = careGiver;
    const classNames = getClassNames();
    const navigate = useNavigate();
    const { getHasAdminPermissions } = usePermissionsService();
    const hasAdminPermissions = getHasAdminPermissions();

    const isMobile = useIsMobile();

    const relationship = getRelationshipText(relationshipToLovedOne);
    const relationshipText = getRelationshipCardText(relationship, relationshipToLovedOne, hasAdminPermissions);
    const relationClass =
        relationshipToLovedOne !== RelationshipsToLovedOne.NotSet
            ? ''
            : classNames['wc-MemberList--relationClassNotSet'];

    // clicking relationship only navigates to edit if relationship is not set
    const relationOnClick =
        relationshipToLovedOne !== RelationshipsToLovedOne.NotSet
            ? undefined
            : (ev) => {
                  if (hasAdminPermissions) {
                      ev.stopPropagation();
                      navigate(RouterConfig.Member(careGiver.id), { state: { mode: 'edit' } });
                  }
              };
    const formattedPhoneNumber = careGiver?.mobile ? formatPhoneNumber(careGiver.mobile) : undefined;

    return (
        <DocumentCard className={classNames['wc-MemberList--togetherTimeMemberCard']}>
            <Stack className={classNames['wc-MemberList--memberClass']} onClick={() => onClick(careGiver.id)}>
                <div className={classNames['wc-MemberList--avatarContainer']}>
                    <Avatar name={displayName} size={AvatarSizes.large} base64={careGiver.imageBase64} />
                </div>
                {/* Formatting will be handled in conversion to Mockup screens */}
                <Stack className={classNames['wc-MemberList--togetherContactInfoStack']}>
                    <Text className={classNames['wc-MemberList--nameClass']}>{displayName}</Text>
                    <Text onClick={relationOnClick} className={relationClass}>
                        {relationshipText}
                    </Text>
                    {/* Emergency Contact is not displayed on the Emergency Contacts screen in Care Plan */}
                    {isEmergencyContact && !isOnCarePlanPage && (
                        <Text className={classNames['wc-MemberList--emergencyContactText']}>Emergency Contact</Text>
                    )}
                </Stack>

                {!isMobile && (
                    <>
                        <Stack className={classNames['wc-MemberList--togetherContactInfoStack']}>
                            {formattedPhoneNumber && (
                                <>
                                    <Text className={classNames['wc-MemberList--togetherContactInfoHeader']}>
                                        Phone
                                    </Text>
                                    <Text className={classNames['wc-MemberList--togetherContactInfoDetail']}>
                                        {formattedPhoneNumber}
                                    </Text>
                                </>
                            )}
                        </Stack>
                        <Stack className={classNames['wc-MemberList--togetherContactInfoStack']}>
                            {careGiver.email && (
                                <>
                                    <Text className={classNames['wc-MemberList--togetherContactInfoHeader']}>
                                        Email
                                    </Text>
                                    <Text className={classNames['wc-MemberList--togetherContactInfoDetail']}>
                                        {careGiver.email}
                                    </Text>
                                </>
                            )}
                        </Stack>
                    </>
                )}
            </Stack>
        </DocumentCard>
    );
};
