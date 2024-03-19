import { Form, Formik } from 'formik';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import RouterConfig from 'src/app/RouterConfig';
import { ERROR_MESSAGES } from 'src/app/Strings';
import { PanelContainerWithHeader } from 'src/common/components/Panel/PanelContainerWithHeader';
import { useUpdateImmunizationMutation } from 'src/graphQL/serverMocks/graphQLGeneratedCode';
import { useFeedbackService } from 'src/services/FeedbackService';
import { ImmunizationForm } from 'src/common/components/Form';
import { Immunization } from 'src/types/Immunization';

interface IImmunizationEditProps {
    onDismiss: () => void;
    immunization: Immunization;
}

const ImmunizationEdit: React.FC<IImmunizationEditProps> = ({ onDismiss, immunization }) => {
    const navigate = useNavigate();
    const { setErrorToast } = useFeedbackService();
    const [saveDisabled, setSaveDisabled] = useState(false);

    const [updateImmunization, { loading }] = useUpdateImmunizationMutation({
        refetchQueries: ['GetImmunizations', 'GetCareRecipientTimeline'],
        onCompleted: () => {
            navigate(RouterConfig.Immunization(immunization.id) + '?status=edited', { replace: true });
        },
        onError: () => {
            setErrorToast(ERROR_MESSAGES.EDIT_IMMUNIZATION);
            setSaveDisabled(false);
        },
    });

    const defaultUnsureOfYear =
        immunization.immunizationDateRelativePeriodStart !== null &&
        immunization.immunizationDateRelativePeriodEnd !== null;

    return (
        <>
            <>
                <Formik
                    validate={(values) => {
                        const errors: any = {};
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
                            year: immunization.immunizationDateYear,
                            month: immunization.immunizationDateMonth,
                            day: immunization.immunizationDateDay,
                            unsureOfSpecificYear: defaultUnsureOfYear,
                            relativeStart: immunization.immunizationDateRelativePeriodStart,
                            relativeEnd: immunization.immunizationDateRelativePeriodEnd,
                        },
                    }}
                    onSubmit={async (values) => {
                        setSaveDisabled(true);
                        const updateImmunizationValues = {
                            id: immunization.id,
                            immunizationDateDay: values.immunization.day,
                            immunizationDateMonth: values.immunization.month,
                            immunizationDateYear: values.immunization.year,
                            immunizationDateRelativePeriodStart: values.immunization.relativeStart,
                            immunizationDateRelativePeriodEnd: values.immunization.relativeEnd,
                        };
                        await updateImmunization({ variables: updateImmunizationValues });
                    }}
                >
                    {(formik) => (
                        <Form>
                            <PanelContainerWithHeader
                                title={'Edit Immunization'}
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
                                <ImmunizationForm
                                    {...{ formik }}
                                    isEdit
                                    immunizationName={immunization.vaccineProductAdministered?.name}
                                />
                            </PanelContainerWithHeader>
                        </Form>
                    )}
                </Formik>
            </>
        </>
    );
};

export default ImmunizationEdit;
