import PropTypes from 'prop-types';
import React from 'react';
import { getClassNames } from './InstructionIcon.classNames';
import { Icon, Stack, Text } from '@fluentui/react';
interface InstructionIconProps {
    onClick: () => void;
    iconName: string;
    instructionText: string;
    no?: boolean;
    isOppositeSelected?: boolean;
}

const InstructionIcon: React.FC<InstructionIconProps> = (props) => {
    const classNames = getClassNames();
    const [isSelected, setIsSelected] = React.useState(false);
    const onClick = () => {
        props.onClick();
        if (!props.isOppositeSelected) {
            setIsSelected(!isSelected);
        }
    };

    return (
        <Stack className={classNames['wc-InstructionIcon--wrapper']}>
            <div className={classNames['wc-InstructionIcon--selectedIcon']}>
                <div
                    data-testid={'FAB'}
                    onClick={onClick}
                    className={
                        isSelected
                            ? classNames['wc-InstructionIcon--selectedIcon']
                            : classNames['wc-InstructionIcon--notSelectedIcon']
                    }
                >
                    {props.no && (
                        <Icon
                            iconName={'Blocked'}
                            className={
                                isSelected
                                    ? classNames['wc-InstructionIcon--strikethrough']
                                    : classNames['wc-InstructionIcon--notSelectedStrikethrough']
                            }
                        />
                    )}

                    <Icon className={classNames['wc-InstructionIcon--iconContent']} iconName={props.iconName} />
                </div>
            </div>
            <Text
                className={
                    isSelected
                        ? classNames['wc-InstructionIcon--selectedText']
                        : classNames['wc-InstructionIcon--notSelectedText']
                }
            >
                {props.instructionText}
            </Text>
        </Stack>
    );
};

InstructionIcon.propTypes = {
    onClick: PropTypes.func.isRequired,
};

export default InstructionIcon;
