import React from 'react';

import { Icon, Stack, Text } from '@fluentui/react';
import { getClassNames } from './Wizard.classNames';

interface IPillListProps {
    itemKey: string;
    pillText: string;
    onClick: () => void;
}

interface IPillChoiceProps {
    isSelected: boolean;
    pillText: string;
    onClickSelected: () => void;
    onClickDefault: () => void;
}

export const PillChoice: React.FC<IPillChoiceProps> = ({ isSelected, pillText, onClickSelected, onClickDefault }) => {
    return isSelected ? (
        <SelectedPill itemKey={pillText} key={pillText} pillText={pillText} onClick={onClickSelected} />
    ) : (
        <DefaultPill itemKey={pillText} key={pillText} pillText={pillText} onClick={onClickDefault} />
    );
};

export const SelectedPill: React.FC<IPillListProps> = ({ itemKey, pillText, onClick }) => {
    const classNames = getClassNames();

    return (
        <Stack
            horizontal
            key={itemKey}
            className={classNames['wc-Wizard--selectedPill']}
            tokens={{ childrenGap: '10px' }}
            onClick={onClick}
        >
            <Text className={classNames['wc-Wizard--pillText']}>{pillText}</Text>
            <Icon iconName="Checkmark" />
        </Stack>
    );
};

export const DefaultPill: React.FC<IPillListProps> = ({ itemKey, pillText, onClick }) => {
    const classNames = getClassNames();

    return (
        <Stack
            horizontal
            key={itemKey}
            className={classNames['wc-Wizard--defaultPill']}
            tokens={{ childrenGap: '10px' }}
            onClick={onClick}
        >
            <Text className={classNames['wc-Wizard--pillText']}>{pillText}</Text>
        </Stack>
    );
};
