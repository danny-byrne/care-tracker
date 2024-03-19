import React from 'react';
import { DefaultButton, PrimaryButton, Stack } from '@fluentui/react';
import { getClassNames } from './Buttons.classNames';

interface ButtonProps {
    disabled?: boolean;
    onBack: (event: React.MouseEvent<HTMLButtonElement>) => void;
    saveText?: string;
}

const Buttons = (props: ButtonProps) => {
    const classNames = getClassNames();
    const { disabled, onBack, saveText } = props;
    return (
        <Stack className={classNames['wc-FormButtons--buttonWrapper']}>
            <Stack horizontal tokens={{ childrenGap: 7 }} className={classNames['wc-FormButtons--buttonsContainer']}>
                <PrimaryButton className={classNames['wc-FormButtons--buttonSize']} type="submit" disabled={disabled}>
                    {saveText ?? 'Save'}
                </PrimaryButton>
                <DefaultButton
                    className={classNames['wc-FormButtons--buttonSize']}
                    iconProps={{ iconName: 'Cancel' }}
                    onClick={onBack}
                    text="Cancel"
                />
            </Stack>
        </Stack>
    );
};

export default Buttons;
