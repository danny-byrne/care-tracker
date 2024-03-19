import React, { useEffect, useState } from 'react';

import { Text, Stack, Toggle, Separator, Dropdown, ResponsiveMode } from '@fluentui/react';
import Avatar, { AvatarSizes } from 'src/common/components/Avatar';
import {
    RelationshipsToLovedOne,
    Roles,
    useGetAvailableUserTimeZonesQuery,
} from 'src/graphQL/serverMocks/graphQLGeneratedCode';

import { getClassNames } from './MemberReuseableView.classNames';
import { getRoleIcon } from 'src/helpers/members';
import { UserData, CareGiver, IMemberEditFormikProps } from 'src/types/Member';
import {
    familyRelationshipDropdownOptions,
    getRelationshipText,
    getTimeZoneText,
    formatPhoneNumber,
} from 'src/utils/utils';
import { usePermissionsService } from 'src/services/PermissionsService';
import { timeZonesToDropdownOptions } from 'src/utils/dates';
import { useFeedbackService } from 'src/services/FeedbackService';
import { ERROR_MESSAGES } from 'src/app/Strings';

interface IMemberViewProps {
    userData: UserData;
    isEdit: boolean;
    formik?: IMemberEditFormikProps;
}

export const MemberReusableView: React.FC<IMemberViewProps> = ({ formik, isEdit, userData }) => {
    const classNames = getClassNames();
    const { getHasAdminPermissions, getIsOwner } = usePermissionsService();
    const hasAdminPermissions = getHasAdminPermissions();
    const signedInUserIsOwner = getIsOwner();

    const { isEmergencyContact, relationshipToLovedOne } = isEdit ? formik.values : userData;
    // Don't show admin toggle for the owner of the circle
    const { profile, careGiver } = userData;
    const { timeZoneID } = isEdit ? formik.values : careGiver;

    const showAdminToggle = profile.role !== Roles.Owner && signedInUserIsOwner;

    const RoleIcon = getRoleIcon(profile.role);

    return (
        <Stack horizontal className={classNames['wc-MemberReuseableView--viewContainer']}>
            <Avatar
                className={classNames['wc-MemberReuseableView--avatar']}
                name={careGiver.displayName}
                base64={careGiver.imageBase64}
                size={AvatarSizes.xxLarge}
            />

            <Stack className={classNames['wc-MemberReuseableView--userInfoContainer']}>
                <Text className={classNames['wc-MemberReuseableView--userNameText']}>{careGiver.displayName}</Text>
                {isEmergencyContact && (
                    <Text className={classNames['wc-MemberReuseableView--emergencyContactText']}>
                        Emergency Contact
                    </Text>
                )}
                {/* Invites do not have RoleIcons */}
                {RoleIcon && (
                    <div className={classNames['wc-MemberReuseableView--roleIconContainer']}>
                        <RoleIcon />
                    </div>
                )}
                <RelationshipContainer
                    onChange={(_, item) => {
                        formik.setFieldValue('relationshipToLovedOne', item.key);
                    }}
                    selectedKey={relationshipToLovedOne}
                    {...{ isEdit }}
                />
                <TimeZoneContainer
                    onChange={(_, item) => {
                        formik.setFieldValue('timeZoneID', item.key);
                    }}
                    selectedKey={timeZoneID}
                    {...{ isEdit, careGiver }}
                />
                <ContactInfo {...{ careGiver, isEdit }} />
                {/* Only admins can set other admins or set emergency contacts */}
                {isEdit && hasAdminPermissions && <EditToggles {...{ showAdminToggle, formik }} />}
            </Stack>
        </Stack>
    );
};

interface IRelationshipContainerProps {
    isEdit: boolean;
    onChange?: (_, item) => void;
    selectedKey?: RelationshipsToLovedOne;
}
/*eslint-disable*/

export const RelationshipContainer: React.FC<IRelationshipContainerProps> = ({ isEdit, onChange, selectedKey }) => {
    const classNames = getClassNames();

    const relationshipTextValue = getRelationshipText(selectedKey as RelationshipsToLovedOne);

    return (
        <Stack className={classNames['wc-MemberReuseableView--relationshipContainer']}>
            {isEdit ? (
                <Dropdown
                    required
                    label="Relationship to loved one"
                    data-testid="familyRelationship-dropdown"
                    className={classNames['wc-MemberReuseableView--relationshipDropdown']}
                    placeholder="Select a relationship"
                    options={familyRelationshipDropdownOptions}
                    onChange={onChange}
                    selectedKey={selectedKey}
                    responsiveMode={ResponsiveMode.large}
                />
            ) : (
                <>
                    <Text>Relationship to loved one</Text>
                    <Text className={classNames['wc-MemberReuseableView--relationshipText']}>
                        {relationshipTextValue}
                    </Text>
                </>
            )}
        </Stack>
    );
};

interface ITimeZoneContainerProps {
    isEdit: boolean;
    onChange?: (_, item) => void;
    selectedKey?: string;
    careGiver: CareGiver;
    canEditTimeZone?: boolean;
}

export const TimeZoneContainer: React.FC<ITimeZoneContainerProps> = ({
    isEdit,
    onChange,
    selectedKey,
    careGiver,
    canEditTimeZone,
}) => {
    const classNames = getClassNames();
    const { setErrorToast } = useFeedbackService();
    const { data: timezoneData } = useGetAvailableUserTimeZonesQuery({
        onError: () => {
            setErrorToast(ERROR_MESSAGES.GET_TIMEZONES);
        },
    });

    const [timezoneDropdownOptions, setTimezoneDropdownOptions] = useState([]);

    useEffect(() => {
        if (timezoneData) setTimezoneDropdownOptions(timeZonesToDropdownOptions(timezoneData));
    }, [timezoneData]);

    const timeZoneText = getTimeZoneText(careGiver, canEditTimeZone);

    return (
        <Stack className={classNames['wc-MemberReuseableView--timeZoneContainer']}>
            {isEdit && canEditTimeZone ? (
                <Dropdown
                    required
                    label="Time Zone"
                    data-testid="timeZone-dropdown"
                    className={classNames['wc-MemberReuseableView--timeZoneDropdown']}
                    placeholder="Select a time zone"
                    options={timezoneDropdownOptions}
                    onChange={onChange}
                    selectedKey={selectedKey}
                    responsiveMode={ResponsiveMode.large}
                />
            ) : (
                <>
                    <Text>Time Zone</Text>
                    <Text className={classNames['wc-MemberReuseableView--timeZoneText']}>{timeZoneText}</Text>
                </>
            )}
        </Stack>
    );
};

interface IContactInfoProps {
    careGiver: CareGiver;
    isEdit: boolean;
}

const ContactInfo: React.FC<IContactInfoProps> = ({ careGiver, isEdit }) => {
    const classNames = getClassNames();
    const formattedPhoneNumber = careGiver?.mobile ? formatPhoneNumber(careGiver.mobile) : undefined;

    return (
        <>
            {formattedPhoneNumber && (
                <Stack className={classNames['wc-MemberReuseableView--contactInfoSubContainer']}>
                    <Text className={isEdit && classNames['wc-MemberReuseableView--semiBoldText']}>Phone</Text>
                    <Text className={classNames['wc-MemberReuseableView--contactInfoText']}>
                        {formattedPhoneNumber}
                    </Text>
                </Stack>
            )}
            {careGiver.email && (
                <Stack className={classNames['wc-MemberReuseableView--contactInfoSubContainer']}>
                    <Text className={isEdit && classNames['wc-MemberReuseableView--semiBoldText']}>Email</Text>
                    <Text className={classNames['wc-MemberReuseableView--contactInfoText']}>{careGiver.email}</Text>
                </Stack>
            )}
        </>
    );
};

interface IEditTogglesProps {
    showAdminToggle: boolean;
    formik?: any;
}

export const EditToggles: React.FC<IEditTogglesProps> = ({ showAdminToggle, formik }) => {
    const classNames = getClassNames();
    const ADMIN_EXPLANATION_TEXT = 'Admins can manage medication, care plan and members of the circle.';

    return (
        <>
            <Separator className={classNames['wc-MemberReuseableView--separator']} />
            <Stack>
                <Toggle
                    label="Emergency Contact"
                    onText={'Yes'}
                    offText={'No'}
                    defaultChecked={formik.values.isEmergencyContact}
                    onChange={(e, checked) => formik.setFieldValue('isEmergencyContact', checked)}
                    className={classNames['wc-MemberReuseableView--toggle']}
                />

                {showAdminToggle && (
                    <Stack>
                        <Toggle
                            label="Admin Privileges"
                            onText={'Yes'}
                            offText={'No'}
                            defaultChecked={formik.values.isAdmin}
                            onChange={(e, checked) => formik.setFieldValue('isAdmin', checked)}
                            className={classNames['wc-MemberReuseableView--toggle']}
                        />
                        <Text>{ADMIN_EXPLANATION_TEXT}</Text>
                    </Stack>
                )}
            </Stack>
        </>
    );
};

export default MemberReusableView;
