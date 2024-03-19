import { useCreateConditionOccurrenceMutation } from 'src/graphQL/serverMocks/graphQLGeneratedCode';
import { useNavigate } from 'react-router';

import { Form, Formik } from 'formik';
import React from 'react';

import { Wizard } from 'src/common/components/Wizard';
import { ConditionWizardPage } from './ConditionWizardPage';
import { IWizardConfigProps } from 'src/common/components/Wizard/Wizard';

import RouterConfig from 'src/app/RouterConfig';
import { Condition } from './ConditionWizardPage';
import { WizardReceiptPage } from './WizardReceiptPage';

import WizardRecieptIcon from 'src/assets/Wizard/WizardRecieptIcon.png';

const RecipientProfileWizardConfig: IWizardConfigProps[] = [
    {
        subPageTitle: 'Major Conditions',
        subPageSubTitle: 'What are they experiencing?',
        paramName: 'conditions',
        component: ConditionWizardPage,
        isArray: true,
    },
    {
        subPageSubTitle: 'How does this look?',
        component: WizardReceiptPage,
        img: WizardRecieptIcon,
    },
];

const RecipientProfileWizard: React.FC = () => {
    const navigate = useNavigate();

    const [addCondition] = useCreateConditionOccurrenceMutation({
        refetchQueries: ['GetCareRecipientConditions'],
    });

    interface IRecipientProfileWizardFormikProps {
        conditions: Condition[];
    }

    const initialValues: IRecipientProfileWizardFormikProps = {
        conditions: [],
    };

    const formikAddConditionFromArray = async (condition: Condition) => {
        await addCondition({
            variables: {
                input: {
                    condition: { name: condition.conditionName, iCD10Code: condition.icd10Code },
                },
            },
        });
    };

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={async (values) => {
                values.conditions.forEach(async (condition) => {
                    await formikAddConditionFromArray(condition);
                });
            }}
        >
            {(formik) => {
                const onSubmit = () => {
                    formik.submitForm();
                    navigate(RouterConfig.CarePlan);
                };
                return (
                    <Form>
                        <Wizard submit={onSubmit} config={RecipientProfileWizardConfig} formik={formik} />
                    </Form>
                );
            }}
        </Formik>
    );
};

export default RecipientProfileWizard;
