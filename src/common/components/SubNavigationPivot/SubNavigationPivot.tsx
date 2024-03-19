import React from 'react';
import { useNavigate, useLocation } from 'react-router';
import { useEffect, useState } from 'react';

import { Pivot, PivotItem } from '@fluentui/react';
import { SubNavigationButtonProps } from 'src/types/SubNavigation';
import { PIVOT_BUTTON_WIDTH } from 'src/app/Styles';

interface ISubNavigationPivotProps {
    buttons: SubNavigationButtonProps[];
    defaultKey?: string;
}

const SubNavigationPivot: React.FC<ISubNavigationPivotProps> = ({ buttons, defaultKey }) => {
    const { pathname } = useLocation();

    const navigate = useNavigate();
    const [selectedItem, setSelectedItem] = useState(defaultKey);

    const handleClick = (item: PivotItem) => {
        const selected = buttons.find((button) => button.key === item.props.itemKey);

        if (selected.key && selected.url !== pathname) {
            setSelectedItem(selected.key);
            navigate(selected.url);
        }
    };

    useEffect(() => {
        const setNavVisibleStateToMatchRoute = () => {
            let selected = buttons.find((button) => button.url === pathname);
            // Null check to handle reroute from /together-time
            if (selected === undefined) {
                selected = buttons[0];
            }

            if (selected.key !== selectedItem || selected.url !== pathname) {
                setSelectedItem(selected.key);
            }
        };

        setNavVisibleStateToMatchRoute();
    });

    // Update width of container depending on how many buttons are present
    const pivotWidth = `${buttons.length * PIVOT_BUTTON_WIDTH}px`;

    return (
        <Pivot
            style={{ width: pivotWidth }}
            linkFormat="tabs"
            selectedKey={selectedItem}
            onLinkClick={handleClick}
            headersOnly
        >
            {buttons.map((button) => (
                <PivotItem
                    headerButtonProps={{ disabled: button.url === undefined }}
                    headerText={button.label}
                    key={button.key}
                    itemKey={button.key}
                />
            ))}
        </Pivot>
    );
};

export default SubNavigationPivot;
