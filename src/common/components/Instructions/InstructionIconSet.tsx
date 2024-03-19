import { Label, Stack, TextField } from '@fluentui/react';
import InstructionIcon from './InstructionIcon';
import React from 'react';

const InstructionIconSet = () => {
    const [isWaterSelected, setIsWaterSelected] = React.useState(false);
    const [isNoWaterSelected, setIsNoWaterSelected] = React.useState(false);
    const [isFoodSelected, setIsFoodSelected] = React.useState(false);
    const [isNoFoodSelected, setIsNoFoodSelected] = React.useState(false);

    const onWaterClick = () => {
        if (!isNoWaterSelected) {
            setIsWaterSelected(!isWaterSelected);
        }
    };
    const onNoWaterClick = () => {
        if (!isWaterSelected) {
            setIsNoWaterSelected(!isNoWaterSelected);
        }
    };
    const onFoodClick = () => {
        if (!isNoFoodSelected) {
            setIsFoodSelected(!isFoodSelected);
        }
    };
    const onNoFoodClick = () => {
        if (!isFoodSelected) {
            setIsNoFoodSelected(!isNoFoodSelected);
        }
    };

    return (
        <>
            <Stack tokens={{ childrenGap: 10 }}>
                <Label>Instructions</Label>
                <Stack horizontal tokens={{ childrenGap: 15 }}>
                    <InstructionIcon
                        onClick={onWaterClick}
                        iconName="Precipitation"
                        instructionText="With water"
                        isOppositeSelected={isNoWaterSelected}
                    />
                    <InstructionIcon
                        onClick={onNoWaterClick}
                        iconName="Precipitation"
                        instructionText="Without water"
                        isOppositeSelected={isWaterSelected}
                        no
                    />
                    <InstructionIcon
                        onClick={onFoodClick}
                        iconName="Brunch"
                        instructionText="With food"
                        isOppositeSelected={isNoFoodSelected}
                    />
                    <InstructionIcon
                        onClick={onNoFoodClick}
                        iconName="Brunch"
                        instructionText="Without food"
                        no
                        isOppositeSelected={isFoodSelected}
                    />
                    <InstructionIcon
                        onClick={() => console.log('No Alcohol')}
                        iconName="Cocktails"
                        instructionText="Without Alcohol"
                        no
                    />
                </Stack>
                <TextField placeholder="additional instructions" />
            </Stack>
        </>
    );
};

export default InstructionIconSet;
