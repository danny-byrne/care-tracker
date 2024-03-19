import { Checkbox, IChoiceGroupOption, Stack, Text } from '@fluentui/react';
import { getClassNames } from './ChoiceGroupButton.className';
import { IChoiceGroupOptionProps } from '@fluentui/react';

const ChoiceGroupButton = (props: IChoiceGroupOption & IChoiceGroupOptionProps) => {
    const { checked, onChange, itemKey } = props;
    const className = getClassNames(checked);

    return (
        <Stack horizontal className={className['wc-ChoiceGroupButton--checkboxContainer']}>
            <Text>{props.text}</Text>

            <Checkbox
                styles={{ checkbox: { 'border-radius': '100px' } }}
                checked={checked}
                // This is a hacky way to override the checkbox default onChange and default to the parent onChange
                onChange={(ev) => {
                    onChange(ev, { key: itemKey, text: itemKey, itemKey: itemKey });
                }}
            />
        </Stack>
    );
};

export default ChoiceGroupButton;
