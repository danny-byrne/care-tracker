/*eslint-disable*/

import { useGetUserAppProfileInfoQuery } from 'src/graphQL/serverMocks/graphQLGeneratedCode';
import { useIsMobile } from 'src/common/hooks/useMediaQueries';
import { useUpdatePermissions } from 'src/common/hooks/useUpdatePermissions';

import React from 'react';
import { DefaultButton, Image, Text, Stack, IconButton } from '@fluentui/react';
import Avatar, { AvatarSizes } from 'src/common/components/Avatar';

import { getClassNames } from './WindcrestPageHeader.classNames';
import windcrestLogo from '../../../assets/Misc/WindcrestHeaderIcon.svg';
import { showFeedbackPanel } from 'src/userfeedback/CentroFeedbackFunctions';
import { useHandleAuthentication } from 'src/common/hooks/useHandleAuthentication';

interface IWindcrestPageHeaderProps {
    showAppProfile?: () => void;
    mobileTitle?: string;
}
const WindcrestPageHeader: React.FC<IWindcrestPageHeaderProps> = ({ showAppProfile, mobileTitle }) => {
    const classNames = getClassNames();
    const { isAuthenticated } = useHandleAuthentication();

    const { data } = useGetUserAppProfileInfoQuery({
        skip: !isAuthenticated,
    });

    const isMobile = useIsMobile();

    const { displayName, imageBase64 } = data?.me ?? {};

    useUpdatePermissions(data);

    return (
        <div className={classNames['wc-WindcrestPageHeader--container']}>
            <Stack horizontal>
                <Image src={windcrestLogo} alt="Windcrest header icon" height={36} width={44} />
            </Stack>
            {/* Leaving this commented out for now until we determine how to integrate into mobile screens */}
            {/* {isMobile && (
                <Stack verticalAlign="center">
                    <IconButton
                        className={classNames['wc-WindcrestPageHeader--iconItem']}
                        iconProps={{ iconName: 'QuestionMarkCircle' }}
                        onClick={() => showFeedbackPanel()}
                        data-testid={'feedback'}
                        aria-label={'feedback'}
                    />
                </Stack>
            )} */}
            {showAppProfile ? (
                <DefaultButton
                    className={classNames['wc-WindcrestPageHeader--appProfileButton']}
                    onClick={showAppProfile}
                    aria-label="profilePicture"
                    data-testid="profilePicture"
                >
                    <Avatar name={displayName} size={AvatarSizes.small} base64={imageBase64} />
                </DefaultButton>
            ) : (
                <Avatar name={displayName} size={AvatarSizes.small} base64={imageBase64} />
            )}
        </div>
    );
};

export default WindcrestPageHeader;
