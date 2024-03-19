import { Form, Formik } from 'formik';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import RouterConfig from 'src/app/RouterConfig';
import { ERROR_MESSAGES } from 'src/app/Strings';
import AllergyForm from 'src/common/components/Form/AllergyForm';
import { PanelContainerWithHeader } from 'src/common/components/Panel/PanelContainerWithHeader';
import { AllergySeverity, useUpdateAllergyMutation } from 'src/graphQL/serverMocks/graphQLGeneratedCode';
import { useFeedbackService } from 'src/services/FeedbackService';
import { Allergy } from 'src/types/Allergy';

interface IAllergyEditProps {
    onDismiss: () => void;
    allergy: Allergy;
}

const AllergyEdit: React.FC<IAllergyEditProps> = ({ onDismiss, allergy }) => {
    const navigate = useNavigate();
    const { setErrorToast } = useFeedbackService();
    const [saveDisabled, setSaveDisabled] = useState(false);

    const [updateAllergy, { loading }] = useUpdateAllergyMutation({
        refetchQueries: ['GetAllergies', 'GetAllergy'],
        onCompleted: () => {
            navigate(RouterConfig.Allergy(allergy.id) + '?status=edited', { replace: true });
        },
        onError: () => {
            setErrorToast(ERROR_MESSAGES.EDIT_ALLERGY);
            setSaveDisabled(false);
        },
    });

    return (
        <>
            <>
                <Formik
                    initialValues={{
                        allergy: {
                            severity: allergy.severity,
                        },
                    }}
                    onSubmit={async (values) => {
                        setSaveDisabled(true);
                        const updateAllergyValues = {
                            severity: AllergySeverity[values.allergy.severity],
                            id: allergy.id,
                        };
                        await updateAllergy({ variables: updateAllergyValues });
                    }}
                >
                    {(formik) => (
                        <Form>
                            <PanelContainerWithHeader
                                title={'Edit Alergy'}
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
                                <AllergyForm {...{ formik }} isEdit allergyName={allergy.allergen.name} />
                            </PanelContainerWithHeader>
                        </Form>
                    )}
                </Formik>
            </>
        </>
    );
};

export default AllergyEdit;
