import { useNavigate, useLocation } from 'react-router';
import { usePermissionsService } from 'src/services/PermissionsService';

import { OverflowSet } from '@fluentui/react';
import React from 'react';

import { getMenuItems, onRenderItem, onRenderOverflowButton } from '../Navigation.helpers';
import { getClassNames } from './BottomMenu.classNames';
import { useFeatureFlags } from 'src/common/hooks/useFeatureFlags';

const BottomMenu: React.FC = () => {
    const classNames = getClassNames();

    const navigate = useNavigate();
    const location = useLocation();
    const permissionsService = usePermissionsService();

    const role = permissionsService.getPermissions();

    const { homePageState } = useFeatureFlags();

    return (
        <OverflowSet
            aria-label="BottomMenu"
            data-testid="BottomMenu"
            role="menubar"
            items={getMenuItems(navigate, role, { homePageState })}
            onRenderOverflowButton={onRenderOverflowButton}
            onRenderItem={(item) => onRenderItem(item, location, true)}
            className={classNames['wc-BottomMenu--bottomMenu']}
        />
    );
};

export default BottomMenu;
