import { useNavigate } from 'react-router';

import React, { Dispatch, SetStateAction } from 'react';

import { Wizard } from 'src/common/components/Wizard';
import { IWizardConfigProps } from 'src/common/components/Wizard/Wizard';

import RouterConfig from 'src/app/RouterConfig';

import { ConditionDateSelectorWizardPage } from './DateSelectorPage';
import { ConditionSearchPage } from './ConditionSearchPage';
import { StillExperiencingWizardPage } from './StillExperiencingPage';
import { Condition } from 'src/common/components/Form/ConditionForm';
import { TimeFrame, EndDateTimeFrame } from './timeFrameEnums';
import { FormikProps } from 'formik';
import { Month, RelativeTimePeriod } from 'src/graphQL/serverMocks/graphQLGeneratedCode';

export interface IConditionWizardFormikProps {
    condition: Condition;
    isCurrent: boolean;
    timeFrame: TimeFrame;
    endTimeFrame?: EndDateTimeFrame;
    startDateDay: number;
    startDateMonth: Month;
    startDateYear: number;
    relativeTimePeriod: RelativeTimePeriod;
    startRelativePeriodStart: number;
    startRelativePeriodEnd: number;
    id?: string;
}
export interface IConditionWizardPageProps {
    formik?: FormikProps<IConditionWizardFormikProps>;
    setNextButtonEnabled?: Dispatch<SetStateAction<Boolean>>;
}

const ConditionWizardConfig: IWizardConfigProps[] = [
    {
        subPageSubTitle: 'What is the condition?',
        paramName: 'condition',
        component: ConditionSearchPage,
        canAddLater: false,
    },
    {
        paramName: 'condition',
        component: ConditionDateSelectorWizardPage,
        canAddLater: false,
    },
    {
        component: StillExperiencingWizardPage,
    },
];

interface IConditionWizardProps {
    formik?: FormikProps<IConditionWizardFormikProps>;
}

const ConditionWizard: React.FC<IConditionWizardProps> = ({ formik }) => {
    const navigate = useNavigate();

    const onSubmit = () => {
        formik.submitForm();
        navigate(RouterConfig.Conditions);
    };

    return <Wizard submit={onSubmit} config={ConditionWizardConfig} formik={formik} isPanel />;
};

export default ConditionWizard;
