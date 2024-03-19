import React from 'react';
import { Stack } from '@fluentui/react';

interface ActionProps {
    children: React.ReactNode;
}

const Actions: React.FC<ActionProps> = ({ children }) => {
    return (
        <Stack horizontal tokens={{ childrenGap: 7 }}>
            {children}
        </Stack>
    );
};

export default Actions;
