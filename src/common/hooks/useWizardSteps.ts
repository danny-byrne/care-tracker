import { useNavigate } from 'react-router';
import { useState } from 'react';

export const useWizardSteps = (numberOfSteps: number) => {
    const navigate = useNavigate();

    const [step, setStep] = useState(0);
    const nextStep = () => {
        setStep(step + 1);
    };
    const prevStep = () => {
        if (step === 0) {
            // Return to previous page if back button is pressed when step = 0
            navigate(-1);
        } else {
            setStep(step - 1);
        }
    };
    const addLater = (formik, currentParamName: string, isArray: boolean = false) => {
        // Add Later button clears current parameter and moves onto next step
        if (isArray) {
            formik.setFieldValue(currentParamName, []);
        } else {
            formik.setFieldValue(currentParamName, undefined);
        }
        nextStep();
    };

    // step is based on 0 index
    const isLastStep = step >= numberOfSteps - 1;

    return { prevStep, nextStep, step, addLater, isLastStep };
};
