import { Stack } from '@fluentui/react';
import ImageButton from 'src/common/components/ImageButton/ImageButton';
import { Community } from 'src/assets/CarePlan/Community';
import React from 'react';
import { useNavigate } from 'react-router';
import RouterConfig from 'src/app/RouterConfig';
import { getClassNames } from './CarePlan.classNames';
import { MedicationQuestion } from 'src/assets/CarePlan/MedicationQuestion';

export const CarePlanNextSteps: React.FC = () => {
    const classNames = getClassNames();
    const navigate = useNavigate();

    const communityButtonProps = {
        onClick: () => navigate(RouterConfig.Members),
        title: 'Are you an emergency contact?',
        image: <Community />,
    };

    const medicationButtonProps = {
        onClick: () => navigate(RouterConfig.Medications),
        title: 'Are they taking any medications?',
        image: <MedicationQuestion />,
    };

    return (
        <Stack
            horizontal
            horizontalAlign="center"
            className={classNames['wc-CareCircle--nextStepsContainer']}
            tokens={{ childrenGap: 10 }}
        >
            <Stack.Item grow>
                <ImageButton
                    onClick={communityButtonProps.onClick}
                    image={communityButtonProps.image}
                    title={communityButtonProps.title}
                />
            </Stack.Item>
            <Stack.Item grow>
                <ImageButton
                    onClick={medicationButtonProps.onClick}
                    image={medicationButtonProps.image}
                    title={medicationButtonProps.title}
                />
            </Stack.Item>
        </Stack>
    );
};
