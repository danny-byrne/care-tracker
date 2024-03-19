import { Icon, Stack } from '@fluentui/react';
import React, { useState } from 'react';
import { getClassNames } from './Accordion.classNames';

interface IAccordionProps {
    header: React.ReactNode;
    className?: string;
    collapsed?: boolean;
    onToggle?: () => void;
}

const Accordion: React.FC<IAccordionProps> = (props) => {
    const classNames = getClassNames();
    const { collapsed, onToggle } = props;
    const [isOpen, setIsOpen] = useState(!collapsed);

    return (
        <div>
            <Stack
                className={props.className}
                onClick={() => {
                    if (onToggle) {
                        onToggle();
                    }

                    setIsOpen(!isOpen);
                }}
                horizontal
            >
                {props.header}
                {isOpen && <Icon iconName="ChevronDown" className={classNames['wc-Accordion--chevron']} />}
                {!isOpen && <Icon iconName="ChevronUp" className={classNames['wc-Accordion--chevron']} />}
            </Stack>
            {isOpen && <div>{props.children}</div>}
        </div>
    );
};

export default Accordion;
