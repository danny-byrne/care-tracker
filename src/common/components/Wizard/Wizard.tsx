import { DefaultButton, Image, PrimaryButton, Stack, Text } from '@fluentui/react';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useWizardSteps } from 'src/common/hooks/useWizardSteps';

import { getClassNames } from './Wizard.classNames';
import { FormikProps } from 'formik';
import { useWindowDimensions } from 'src/common/hooks/useMediaQueries';

interface IComponentProps {
    formik?: FormikProps<any>;
    setNextButtonEnabled?: Dispatch<SetStateAction<Boolean>>;
}

export interface IWizardConfigProps {
    subPageTitle?: string;
    subPageSubTitle?: string;
    component: React.FC<IComponentProps>;
    paramName?: string;
    isArray?: boolean;
    img?: string;
    canAddLater?: boolean;
}

interface IWizardProps {
    submit: () => void;
    config: IWizardConfigProps[];
    formik: FormikProps<any>;
    isPanel?: boolean;
}

const Wizard: React.FC<IWizardProps> = ({ submit, config, formik, isPanel = false }) => {
    const classNames = getClassNames();
    const numberOfSteps = config.length;
    const [nextButtonEnabled, setNextButtonEnabled] = useState(true);

    const { prevStep, nextStep, step, addLater, isLastStep } = useWizardSteps(numberOfSteps);
    const { height: windowHeight } = useWindowDimensions();
    // PANEL_HEIGHT is defined by height and padding in wc-SubHeaderLayout--contentContainer
    const panelHeight = windowHeight > 856 ? 716 : windowHeight - 150;

    const [currentStep, setCurrentStep] = useState(config[step]);
    useEffect(() => {
        setCurrentStep(config[step]);
    }, [step, config]);
    const CurrentStepComponent = currentStep.component;
    const canAddLater = currentStep.canAddLater ?? true;

    const { subPageTitle, subPageSubTitle, paramName, isArray, img } = currentStep;

    const addLaterOnClick = () => addLater(formik, paramName, isArray);

    const ButtonRow = () => {
        return (
            <Stack className={classNames['wc-Wizard--buttonContainer']} tokens={{ childrenGap: '20px' }}>
                <Stack horizontal className={classNames['wc-Wizard--navButtonRow']} tokens={{ childrenGap: '10px' }}>
                    <DefaultButton className={classNames['wc-Wizard--button']} onClick={prevStep}>
                        Back
                    </DefaultButton>
                    {isLastStep ? (
                        <PrimaryButton
                            className={classNames['wc-Wizard--button']}
                            onClick={submit}
                            disabled={!nextButtonEnabled}
                        >
                            Looks good
                        </PrimaryButton>
                    ) : (
                        <PrimaryButton
                            className={classNames['wc-Wizard--button']}
                            onClick={nextStep}
                            disabled={!nextButtonEnabled}
                        >
                            Next
                        </PrimaryButton>
                    )}
                </Stack>

                {!isLastStep && canAddLater && (
                    <Text onClick={addLaterOnClick} className={classNames['wc-Wizard--addLaterButton']}>
                        Add later
                    </Text>
                )}
            </Stack>
        );
    };

    return (
        <Stack
            className={classNames['wc-Wizard--pageContainer']}
            style={{ height: isPanel ? panelHeight : windowHeight }}
        >
            <Stack className={classNames['wc-Wizard--pageSubContainer']}>
                {img && (
                    <Image
                        className={classNames['wc-Wizard--image']}
                        width={'192px'}
                        height={'192px'}
                        src={img}
                        alt="wizard icon"
                    />
                )}
                {subPageTitle && <Text className={classNames['wc-Wizard--title']}> {subPageTitle}</Text>}
                {subPageSubTitle && <Text className={classNames['wc-Wizard--subTitle']}> {subPageSubTitle}</Text>}
                <CurrentStepComponent formik={formik} setNextButtonEnabled={setNextButtonEnabled} />
                <ButtonRow />
            </Stack>
        </Stack>
    );
};

export default Wizard;
