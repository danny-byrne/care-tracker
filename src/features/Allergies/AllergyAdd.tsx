import { Form, Formik } from 'formik';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import RouterConfig from 'src/app/RouterConfig';
import { ERROR_MESSAGES } from 'src/app/Strings';
import AllergyForm from 'src/common/components/Form/AllergyForm';
import { PanelContainerWithHeader } from 'src/common/components/Panel/PanelContainerWithHeader';
import {
    AllergyCreateInput,
    AllergySeverity,
    useCreateAllergyMutation,
} from 'src/graphQL/serverMocks/graphQLGeneratedCode';
import { useFeedbackService } from 'src/services/FeedbackService';

interface IAllergyAddProps {
    onDismiss: () => void;
}

const AllergyAdd: React.FC<IAllergyAddProps> = ({ onDismiss }) => {
    const { setErrorToast } = useFeedbackService();
    const navigate = useNavigate();
    const [saveDisabled, setSaveDisabled] = useState(false);

    const [createAllergy, { loading }] = useCreateAllergyMutation({
        refetchQueries: ['GetAllergies'],
        onCompleted: () => {
            navigate(RouterConfig.Allergies + '?status=added', { replace: true });
        },
        onError: () => {
            setErrorToast(ERROR_MESSAGES.ADD_ALLERGY);
            setSaveDisabled(false);
        },
    });

    return (
        <>
            <>
                <Formik
                    validate={(values) => {
                        const errors: any = {};
                        if (!values.allergy.name) {
                            errors.name = 'Required';
                        }
                        if (values.allergy.severity === AllergySeverity.Unknown) {
                            errors.name = 'Required';
                        }
                        return errors;
                    }}
                    initialValues={{
                        allergy: {
                            name: '',
                            severity: AllergySeverity.Unknown,
                        },
                    }}
                    onSubmit={async (values) => {
                        setSaveDisabled(true);
                        const addAllergyValues: AllergyCreateInput = {
                            allergen: {
                                name: values.allergy.name,
                            },
                            severity: AllergySeverity[values.allergy.severity],
                        };
                        await createAllergy({ variables: { input: addAllergyValues } });
                    }}
                >
                    {(formik) => (
                        <Form>
                            <PanelContainerWithHeader
                                title={'Add Allergy'}
                                onClose={onDismiss}
                                {...{ formik }}
                                actionButtonText={'Save'}
                                loading={loading || saveDisabled}
                                onClickActionButton={() => {
                                    if (!saveDisabled) {
                                        formik.handleSubmit();
                                    }
                                }}
                            >
                                <AllergyForm {...{ formik }} />
                            </PanelContainerWithHeader>
                        </Form>
                    )}
                </Formik>
            </>
        </>
    );
};

export default AllergyAdd;
