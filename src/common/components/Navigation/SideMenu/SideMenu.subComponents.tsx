import { Text, Stack, Icon } from '@fluentui/react';
import { useNavigate } from 'react-router';
import { NavButtonInfo } from '../NavButtonInfoList';
import { getClassNames } from './SideMenu.classNames';

export const SideMenuButton = (props: ISideMenuButtonProps) => {
    const { navButtonInfo, isSelected } = props;
    const classNames = getClassNames(isSelected);
    const icon = String(isSelected ? navButtonInfo.selectedIcon : navButtonInfo.icon);

    const navigate = useNavigate();
    const onClick = () => navigate(navButtonInfo.navigationUrl);

    return (
        <Stack
            onClick={onClick}
            className={classNames['wc-SideMenu--buttonContainer']}
            key={`${navButtonInfo.shortenedPageName} desktop button`}
        >
            <Icon iconName={icon} className={classNames['wc-SideMenu--iconClass']} />
            <Text className={classNames['wc-SideMenu--pageName']}>{navButtonInfo.shortenedPageName}</Text>
        </Stack>
    );
};
interface ISideMenuButtonProps {
    isSelected: boolean;
    navButtonInfo: NavButtonInfo;
}
