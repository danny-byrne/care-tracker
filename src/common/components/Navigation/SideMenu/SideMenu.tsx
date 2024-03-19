/*eslint-disable*/
import { useNavigate, useLocation } from 'react-router';
import { usePermissionsService } from 'src/services/PermissionsService';

import { IconButton, OverflowSet, Stack } from '@fluentui/react';

import React from 'react';

import { getMenuItems, onRenderItem, onRenderOverflowButton } from '../Navigation.helpers';
import { getClassNames } from './SideMenu.classNames';
import { showFeedbackPanel } from 'src/userfeedback/CentroFeedbackFunctions';
import { useGetUserAppProfileInfoQuery } from 'src/graphQL/serverMocks/graphQLGeneratedCode';
import { useFeatureFlags } from 'src/common/hooks/useFeatureFlags';

interface ISideMenuProps {}

const SideMenu: React.FC<ISideMenuProps> = () => {
    const classNames = getClassNames();

    const navigate = useNavigate();
    const location = useLocation();
    const permissionsService = usePermissionsService();

    const role = permissionsService.getPermissions();

    const { data } = useGetUserAppProfileInfoQuery();

    const { homePageState } = useFeatureFlags();

    return (
        <div className={classNames['wc-SideMenu--sideMenu']}>
            <OverflowSet
                aria-label="SideMenu"
                data-testid="SideMenu"
                role="menubar"
                vertical
                items={getMenuItems(navigate, role, { homePageState })}
                onRenderOverflowButton={onRenderOverflowButton}
                onRenderItem={(item) => onRenderItem(item, location, false)}
                styles={{ root: { 'align-items': 'center', cursor: 'pointer' } }}
            />
            <div className={classNames['wc-SideMenu--feedbackItem']}>
                <Stack verticalAlign="center">
                    <IconButton
                        iconProps={{ iconName: 'QuestionMarkCircle' }}
                        onClick={() => showFeedbackPanel()}
                        data-testid={'feedback'}
                        aria-label={'feedback'}
                    />
                </Stack>
            </div>
        </div>
    );
};

export default SideMenu;
