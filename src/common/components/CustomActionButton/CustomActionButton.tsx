import { DefaultButton, Text, Icon } from '@fluentui/react';
import { getClassNames } from './CustomActionButton.classNames';

export const CustomActionButton = (props: ICustomActionButtonProps) => {
    const { label, onClick, buttonType, customClass, IconObject, notSet } = props;
    const icon = props.icon ?? 'ChevronRight';
    const iconAlign = props?.iconAlign ? 'Left' : 'Right';
    const classNames = getClassNames(buttonType, customClass);
    return (
        <DefaultButton onClick={onClick} className={classNames['wc-CustomActionButton--container']}>
            <div
                className={
                    iconAlign == 'Left'
                        ? classNames['wc-CustomActionButton--textContainerLeftIcon']
                        : classNames['wc-CustomActionButton--textContainer']
                }
            >
                {iconAlign == 'Left' && (
                    <Text className={classNames['wc-CustomActionButton--buttonIconLeft']}>
                        <Icon iconName={props.icon} />
                        {IconObject && <IconObject color={'#4426D9'} />}
                    </Text>
                )}
                <Text
                    className={
                        notSet
                            ? classNames['wc-CustomActionButton--textSecondary']
                            : classNames['wc-CustomActionButton--text']
                    }
                >
                    {label}
                </Text>
                {iconAlign !== 'Left' && (
                    <Text className={classNames['wc-CustomActionButton--buttonIcon']}>
                        <Icon iconName={icon} />
                        {IconObject && <IconObject color="#4426D9" />}
                    </Text>
                )}
            </div>
        </DefaultButton>
    );
};

interface ICustomActionButtonProps {
    label: string;
    onClick: () => void;
    buttonType: CustomActionButtonType;
    icon?: string;
    iconAlign?: string;
    customClass?: any;
    fill?: any;
    IconObject?: any;
    notSet?: boolean;
}

export enum CustomActionButtonType {
    'Top',
    'Middle',
    'Bottom',
    'Only',
}
