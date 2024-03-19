import { Separator } from '@fluentui/react';
import { getClassNames } from './ReuseableCardButtonList.classNames';
import { CustomActionButton, CustomActionButtonType } from '../CustomActionButton/CustomActionButton';

const ReuseableCardButtonList = (props: IReuseableCardButtonListProps) => {
    const { buttonPropsList } = props;
    const classNames = getClassNames();
    const lastButtonIndex = buttonPropsList.length - 1;

    return (
        <div className={classNames['wc-ReuseableCardButtonList--list']}>
            {buttonPropsList.map((buttonProps, index) => {
                const { label } = buttonProps;
                const buttonType = determineButtonType(index, lastButtonIndex);
                return (
                    <div key={`${label}CardButton`}>
                        {index !== 0 && <CardButtonSeparator />}
                        <CustomActionButton {...buttonProps} key={`${label}-button`} buttonType={buttonType} />
                    </div>
                );
            })}
        </div>
    );
};

const CardButtonSeparator = () => {
    const classNames = getClassNames();

    return (
        <div className={classNames['wc-ReuseableCardButtonList--separatorColorContainer']}>
            <div className={classNames['wc-ReuseableCardButtonList--separatorMarginContainer']}>
                <Separator className={classNames['wc-ReuseableCardButtonList--separator']} />
            </div>
        </div>
    );
};

interface IReuseableCardButtonListProps {
    buttonPropsList: {
        label: string;
        onClick: () => void;
        icon?: any;
        customClass?: any;
        fill?: any;
        IconObject?: any;
    }[];
}

const determineButtonType = (index: number, lastButtonIndex: number) => {
    let buttonType;
    switch (index) {
        case 0:
            buttonType = lastButtonIndex !== 0 ? CustomActionButtonType.Top : CustomActionButtonType.Only;
            break;
        case lastButtonIndex:
            buttonType = CustomActionButtonType.Bottom;
            break;
        default:
            buttonType = CustomActionButtonType.Middle;
    }

    return buttonType;
};

export default ReuseableCardButtonList;
