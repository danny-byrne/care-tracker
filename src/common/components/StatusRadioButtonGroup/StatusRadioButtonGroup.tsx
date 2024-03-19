import React, { useState, useEffect } from 'react';
import { Stack, ChoiceGroup, IChoiceGroupOption } from '@fluentui/react';
import { trackFieldChanged } from 'src/wcpConsentInit';

interface StatusRadioButtonGroupProps {
    value: boolean;
    radioButtonText: {
        trueText: string;
        falseText: string;
    };
    clearFormikFields?: () => void;
    onChange: (boolean) => void;
    testId: string;
    showStatusLabel?: boolean;
}

const StatusRadioButtonGroup: React.FC<StatusRadioButtonGroupProps> = ({
    value,
    radioButtonText,
    onChange,
    clearFormikFields,
    testId,
    showStatusLabel = false,
}) => {
    const [isActive, setIsActive] = useState<string>('1');

    useEffect(() => {
        const stringedValue: string = String(+value);
        setIsActive(stringedValue);
    }, [value]);

    const onStatusChange = (status) => {
        const updatedStatus = Boolean(parseInt(status));
        onChange(updatedStatus);
        if (updatedStatus && clearFormikFields) {
            clearFormikFields();
        }
    };

    const options: IChoiceGroupOption[] = [
        { key: '1', text: radioButtonText.trueText },
        { key: '0', text: radioButtonText.falseText },
    ];

    return (
        <>
            <Stack>
                <ChoiceGroup
                    label={showStatusLabel ? 'Status' : null}
                    options={options}
                    onChange={(_, item) => {
                        trackFieldChanged(testId);
                        onStatusChange(item.key);
                    }}
                    selectedKey={isActive}
                    data-testid={testId}
                />
            </Stack>
        </>
    );
};

export default StatusRadioButtonGroup;
