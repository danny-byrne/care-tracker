/*eslint-disable*/
import RouterConfig from 'src/app/RouterConfig';
import { TooltipHost, DirectionalHint, IOverflowSetItemProps, CommandBarButton, Text, Stack } from '@fluentui/react';

import { NavigateFunction } from 'react-router';
import { colors } from 'src/common/styles/colors';
import { Location } from 'react-router';
import { Feature, Roles } from 'src/graphQL/serverMocks/graphQLGeneratedCode';

import { Activity } from 'src/assets/Navigator/Activity';
import { Medication } from 'src/assets/Navigator/Medication';
import { Care } from 'src/assets/Navigator/Care';
import { Hub } from 'src/assets/Navigator/Hub';
import { Calendar } from 'src/assets/Navigator/Calendar';
import React from 'react';
import { getClassNames } from './Navigation.classNames';
import { useFeatureFlags } from 'src/common/hooks/useFeatureFlags';

export const getMenuItems = (navigate, role: Roles, state) => {
    let menuItems = getDefaultMenuItems(navigate, state);
    if (role === Roles.Contributor || role === Roles.Owner) {
        const carePlanPosition = 3;
        menuItems.splice(carePlanPosition, 0, getCarePlanItem(navigate));

        const medManagerPosition = 2;
        menuItems.splice(medManagerPosition, 0, getMedManagerItem(navigate));
    }

    const filteredMenuItems = [];
    menuItems.forEach((menuItem) => {
        if (menuItem.show) filteredMenuItems.push(menuItem);
    });

    return filteredMenuItems;
};

const getDefaultMenuItems = (navigate: NavigateFunction, state) => {

    return [
        {
            key: 'home',
            icon: Activity,
            name: 'Activity',
            ariaLabel: 'homeIcon',
            onClick: () => navigate(RouterConfig.Home),
            navigationUrl: RouterConfig.Home,
            // TODO: Hide behind feature flag
            show: state.homePageState,
        },
        {
            key: 'calendar',
            icon: Calendar,
            name: 'Calendar',
            ariaLabel: 'calendarIcon',
            onClick: () => navigate(RouterConfig.Calendar),
            navigationUrl: RouterConfig.Calendar,
            // TODO: Hide behind feature flag
            show: true,
        },
        {
            key: 'together time',
            icon: Care,
            name: 'Care',
            ariaLabel: 'timeIcon',
            onClick: () => navigate(RouterConfig.TogetherTimeLayout),
            navigationUrl: RouterConfig.TogetherTimeLayout,
            show: true,
        },
    ];
};

const getCarePlanItem = (navigate: NavigateFunction) => {
    return {
        key: 'care plan',
        icon: Hub,
        name: 'Hub',
        ariaLabel: 'carePlanIcon',
        onClick: () => navigate(RouterConfig.CarePlan),
        navigationUrl: RouterConfig.Profile,
        show: true,
    };
};

const getMedManagerItem = (navigate: NavigateFunction) => {
    return {
        key: 'med manager',
        icon: Medication,
        name: 'Medication',
        ariaLabel: 'medIcon',
        onClick: () => navigate(RouterConfig.Medications),
        navigationUrl: RouterConfig.Medications,
        show: true,
    };
};

export const onRenderItem = (item: IOverflowSetItemProps, location: Location, isMobile: boolean): JSX.Element => {
    const classNames = getClassNames();
    const isNotSelected =
        item.navigationUrl === '/' || '' ? location.pathname !== '/' : !location.pathname?.includes(item.navigationUrl);

    let color = colors.fabric.neutrals.WCprimary;

    if (isNotSelected) {
        color = colors.windcrest.info;
    }

    return (
        <Stack
            onClick={item.onClick}
            role="menuItem"
            aria-label={item.name}
            className={classNames['wc-Navigation--itemContainer']}
        >
            {React.createElement(item.icon, { color: color, height: '18px', width: '18px' })}
            <Text className={classNames['wc-Navigation--itemText']} style={{ color: color }}>
                {item.name}
            </Text>
        </Stack>
    );
};
// };

export const onRenderOverflowButton = (overflowItems: any[] | undefined): JSX.Element => {
    const onRenderOverflowButtonStyles = {
        root: { padding: '10px' },
        menuIcon: { fontSize: '16px' },
        flexContainer: { flexDirection: 'column' },
    };

    return (
        <TooltipHost content="More items" directionalHint={DirectionalHint.rightCenter}>
            <CommandBarButton
                role="menuitem"
                aria-label="More items"
                styles={onRenderOverflowButtonStyles}
                menuIconProps={{ iconName: 'More' }}
                menuProps={{ items: overflowItems! }}
            />
        </TooltipHost>
    );
};
