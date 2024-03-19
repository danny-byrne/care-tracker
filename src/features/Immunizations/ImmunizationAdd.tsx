import { Form, Formik } from 'formik';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import RouterConfig from 'src/app/RouterConfig';
import { ERROR_MESSAGES } from 'src/app/Strings';
import { ImmunizationForm } from 'src/common/components/Form';
import { PanelContainerWithHeader } from 'src/common/components/Panel/PanelContainerWithHeader';
import { useCreateImmunizationMutation } from 'src/graphQL/serverMocks/graphQLGeneratedCode';
import { useFeedbackService } from 'src/services/FeedbackService';

interface IImmunizationAddProps {
    onDismiss: () => void;
}

const ImmunizationAdd: React.FC<IImmunizationAddProps> = ({ onDismiss }) => {
    const { setErrorToast } = useFeedbackService();
    const navigate = useNavigate();
    const [saveDisabled, setSaveDisabled] = useState(false);

    const [addImmunization, { loading }] = useCreateImmunizationMutation({
        refetchQueries: ['GetImmunizations', 'GetCareRecipientTimeline'],
        onCompleted: () => {
            navigate(RouterConfig.Immunizations + '?status=added', { replace: true });
        },
        onError: () => {
            setErrorToast(ERROR_MESSAGES.ADD_IMMUNIZATION);
            setSaveDisabled(false);
        },
    });

    return (
        <>
            <>
                <Formik
                    validate={(values) => {
                        const errors: any = {};
                        if (!values.immunization.name) {
                            errors.immunizationSelected = 'Required';
                        }
                        if (
                            values.immunization.unsureOfSpecificYear &&
                            (!values.immunization.relativeStart || !values.immunization.relativeEnd)
                        ) {
                            errors.relativeDates = 'Required';
                        }
                        if (
                            values.immunization.unsureOfSpecificYear &&
                            values.immunization.relativeStart >= values.immunization.relativeEnd
                        ) {
                            errors.relativeDates = 'Start cannot come after end';
                        }
                        if (!values.immunization.unsureOfSpecificYear && !values.immunization.year) {
                            errors.year = 'Required';
                        }
                        return errors;
                    }}
                    initialValues={{
                        immunization: {
                            name: '',
                            code: '',
                            year: null,
                            month: null,
                            day: null,
                            unsureOfSpecificYear: false,
                            relativeStart: null,
                            relativeEnd: null,
                        },
                    }}
                    onSubmit={async (values) => {
                        setSaveDisabled(true);

                        const addImmunizationValues = {
                            vaccineProductAdministered: {
                                name: values.immunization.name,
                            },
                            immunizationDateDay: values.immunization.day,
                            immunizationDateMonth: values.immunization.month,
                            immunizationDateYear: values.immunization.year,
                            immunizationDateRelativePeriodStart: values.immunization.relativeStart,
                            immunizationDateRelativePeriodEnd: values.immunization.relativeEnd,
                        };

                        await addImmunization({ variables: addImmunizationValues });
                    }}
                >
                    {(formik) => (
                        <Form>
                            <PanelContainerWithHeader
                                title={'Add Immunization'}
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
                                <ImmunizationForm {...{ formik }} />
                            </PanelContainerWithHeader>
                        </Form>
                    )}
                </Formik>
            </>
        </>
    );
};

export default ImmunizationAdd;
