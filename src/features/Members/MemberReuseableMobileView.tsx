import React from 'react';

import { Stack, Text } from '@fluentui/react';
import Avatar, { AvatarSizes } from 'src/common/components/Avatar';
import { Toggle, Separator } from '@fluentui/react';
import { RelationshipsToLovedOne, Roles } from 'src/graphQL/serverMocks/graphQLGeneratedCode';
import ActionButtonRow from 'src/common/components/ActionButtonRow/ActionButtonRow';

import { getRoleIcon } from 'src/helpers/members';
import { getClassNames } from './MemberReuseableMobileView.classNames';
import { UserData, CareGiver, Profile, IMemberEditFormikProps } from 'src/types/Member';
import { RelationshipContainer, TimeZoneContainer } from 'src/features/Members/MemberReuseableView';
import { getRelationshipText, formatPhoneNumber } from 'src/utils/utils';
import { usePermissionsService } from 'src/services/PermissionsService';

interface IMemberReuseableMobileViewProps {
    userData: UserData;
    isEdit: boolean;
    formik?: any;
    onDelete?: () => void;
    canEditMember?: boolean;
    canEditTimeZone?: boolean;
}

const MemberReuseableMobileView: React.FC<IMemberReuseableMobileViewProps> = ({
    userData,
    isEdit,
    formik,
    onDelete,
    canEditMember,
    canEditTimeZone,
}) => {
    const classNames = getClassNames();
    const { getHasAdminPermissions, getIsOwner } = usePermissionsService();
    const hasAdminPermissions = getHasAdminPermissions();
    const signedInUserIsOwner = getIsOwner();

    const { profile, careGiver } = userData;

    const { isEmergencyContact, relationshipToLovedOne } = isEdit ? formik.values : userData;
    const { timeZoneID } = isEdit ? formik.values : careGiver;

    const showAdminToggle = profile.role !== Roles.Owner && signedInUserIsOwner;
    const showEditRow = !isEdit && canEditMember;

    return (
        <Stack className={classNames['wc-MemberReuseableMobileView--mobileViewContainer']}>
            <UserInfoContainer {...userData} isEmergencyContact={isEmergencyContact} />
            {/* View page has action buttons injected in middle of component */}
            {showEditRow && <ActionButtonRow {...{ profile, onDelete }} />}
            {/* Wrap non-edit views in a separate view to handle differences between panel and regular page */}
            {isEdit ? (
                <DetailsContainer {...{ isEdit, careGiver, formik, timeZoneID, canEditTimeZone }} />
            ) : (
                <div className={classNames['wc-MemberReuseableMobileView--pagePaddingWrapper']}>
                    <DetailsContainer {...{ isEdit, careGiver, relationshipToLovedOne, timeZoneID, canEditTimeZone }} />
                </div>
            )}

            {isEdit && hasAdminPermissions && <EditToggles {...{ showAdminToggle, formik }} />}
        </Stack>
    );
};

interface IUserInfoContainerProps {
    careGiver: CareGiver;
    isEmergencyContact: boolean;
    profile: Profile;
}

const UserInfoContainer: React.FC<IUserInfoContainerProps> = ({ careGiver, isEmergencyContact, profile }) => {
    const classNames = getClassNames();
    const RoleIcon = getRoleIcon(profile.role);

    return (
        <Stack className={classNames['wc-MemberReuseableMobileView--userInfoContainer']}>
            <Avatar
                className={classNames['wc-MemberReuseableMobileView--avatar']}
                name={careGiver.displayName}
                base64={careGiver.imageBase64}
                size={AvatarSizes.xxLarge}
            />
            <Text className={classNames['wc-MemberReuseableMobileView--userNameText']}>{careGiver.displayName}</Text>
            {isEmergencyContact && (
                <Text className={classNames['wc-MemberReuseableMobileView--emergencyContactText']}>
                    Emergency Contact
                </Text>
            )}
            {/* Invites do not have RoleIcons */}
            {RoleIcon && (
                <div className={classNames['wc-MemberReuseableMobileView--roleIconContainer']}>
                    <RoleIcon />
                </div>
            )}
        </Stack>
    );
};

interface IDetailsContainerProps {
    isEdit: boolean;
    careGiver: CareGiver;
    formik?: IMemberEditFormikProps;
    relationshipToLovedOne?: RelationshipsToLovedOne;
    timeZoneID: string;
    canEditTimeZone?: boolean;
}

const DetailsContainer: React.FC<IDetailsContainerProps> = ({
    isEdit,
    careGiver,
    formik,
    relationshipToLovedOne,
    timeZoneID,
    canEditTimeZone,
}) => {
    const classNames = getClassNames();
    const relationshipTextValue = getRelationshipText(relationshipToLovedOne as RelationshipsToLovedOne);
    const formattedPhoneNumber = careGiver?.mobile ? formatPhoneNumber(careGiver.mobile) : undefined;

    return (
        <Stack
            className={classNames['wc-MemberReuseableMobileView--detailsContainer']}
            tokens={{ childrenGap: '1rem' }}
        >
            <Stack>
                {!isEdit && <Text>Relationship to loved one</Text>}
                {isEdit ? (
                    <RelationshipContainer
                        onChange={(_, item) => {
                            formik.setFieldValue('relationshipToLovedOne', item.key);
                        }}
                        selectedKey={formik.values.relationshipToLovedOne}
                        {...{ isEdit }}
                    />
                ) : (
                    <Text className={classNames['wc-MemberReuseableMobileView--relationshipText']}>
                        {relationshipTextValue}
                    </Text>
                )}
            </Stack>
            <TimeZoneContainer
                onChange={(_, item) => {
                    formik.setFieldValue('timeZoneID', item.key);
                }}
                selectedKey={timeZoneID}
                {...{ isEdit, careGiver, canEditTimeZone }}
            />
            {formattedPhoneNumber && (
                <Stack className={classNames['wc-MemberReuseableMobileView--contactInfoSubContainer']}>
                    <Text className={isEdit && classNames['wc-MemberReuseableMobileView--semiBoldText']}>Phone</Text>
                    <Text className={classNames['wc-MemberReuseableMobileView--contactInfoText']}>
                        {formattedPhoneNumber}
                    </Text>
                </Stack>
            )}
            {careGiver.email && (
                <Stack className={classNames['wc-MemberReuseableMobileView--contactInfoSubContainer']}>
                    <Text className={isEdit && classNames['wc-MemberReuseableMobileView--semiBoldText']}>Email</Text>
                    <Text className={classNames['wc-MemberReuseableMobileView--contactInfoText']}>
                        {careGiver.email}
                    </Text>
                </Stack>
            )}
        </Stack>
    );
};

interface IEditTogglesProps {
    formik?: any;
    showAdminToggle: boolean;
}

const EditToggles: React.FC<IEditTogglesProps> = ({ formik, showAdminToggle }) => {
    const classNames = getClassNames();
    const ADMIN_EXPLANATION_TEXT = 'Admins can manage medication, care plan and members of the circle.';

    return (
        <>
            <Separator className={classNames['wc-MemberReuseableMobileView--separator']} />
            <Stack>
                <Toggle
                    label="Emergency Contact"
                    onText={'Yes'}
                    offText={'No'}
                    defaultChecked={formik.values.isEmergencyContact}
                    onChange={(e, checked) => formik.setFieldValue('isEmergencyContact', checked)}
                    className={classNames['wc-MemberReuseableMobileView--toggle']}
                />

                {showAdminToggle && (
                    <Stack>
                        <Toggle
                            label="Admin Privileges"
                            onText={'Yes'}
                            offText={'No'}
                            defaultChecked={formik.values.isAdmin}
                            onChange={(e, checked) => formik.setFieldValue('isAdmin', checked)}
                            className={classNames['wc-MemberReuseableMobileView--toggle']}
                        />
                        <Text>{ADMIN_EXPLANATION_TEXT}</Text>
                    </Stack>
                )}
            </Stack>
        </>
    );
};

export default MemberReuseableMobileView;
