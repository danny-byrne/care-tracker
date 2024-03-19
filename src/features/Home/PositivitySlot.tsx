import { Icon, Stack, Text } from '@fluentui/react';
import React from 'react';

import { getClassNames } from './PositivitySlot.classNames';

interface PositivitySlotProps {
    dismissOnClick: () => void;
    positivityMessage: string;
}

const PositivitySlot: React.FC<PositivitySlotProps> = ({ dismissOnClick, positivityMessage }) => {
    const classNames = getClassNames();
    const HEADER_TEXT = 'Message from Microsoft';

    const OffsetDivider = () => {
        return (
            <div className={classNames['wc-PositivitySlot--offsetDividerContainer']}>
                <hr className={classNames['wc-PositivitySlot--offsetDivider']} />
            </div>
        );
    };
    return (
        <Stack className={classNames['wc-PositivitySlot--positivitySlotContainer']}>
            <Stack horizontal className={classNames['wc-PositivitySlot--positivitySlotHeader']}>
                <Text className={classNames['wc-PositivitySlot--positivitySlotHeaderText']}>{HEADER_TEXT}</Text>
                <Icon
                    aria-label="Dismiss"
                    iconName="Cancel"
                    className={classNames['wc-PositivitySlot--positivitySlotHeaderDismissIcon']}
                    onClick={dismissOnClick}
                />
            </Stack>
            <OffsetDivider />
            <Text className={classNames['wc-PositivitySlot--positivitySlotMessage']}>{positivityMessage}</Text>
        </Stack>
    );
};

export default PositivitySlot;
