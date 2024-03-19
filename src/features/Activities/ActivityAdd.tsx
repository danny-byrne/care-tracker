import { useQueryStringParams } from 'src/common/hooks/useQueryStringParams';

import React from 'react';
import { Form, Formik } from 'formik';
import { ActivityForm } from 'src/common/components/Form';
import { PanelContainerWithHeader } from 'src/common/components/Panel/PanelContainerWithHeader';
import { ActivityOptions } from './Activities';
import { useCreateActivityMutation } from 'src/graphQL/serverMocks/graphQLGeneratedCode';
import { useNavigate } from 'react-router';
import RouterConfig from 'src/app/RouterConfig';
import { isValidPhone } from 'src/utils/validators';
import { sanitizePhoneNumber } from 'src/utils/utils';

interface IActivityAddProps {
    onDismiss: () => void;
}

const ActivityAdd: React.FC<IActivityAddProps> = ({ onDismiss }) => {
    const { panelTitle, activityName } = useGetActivityPanelProps();
    const navigate = useNavigate();

    const [addActivity, { loading }] = useCreateActivityMutation({
        refetchQueries: ['GetActivities'],
        errorPolicy: 'all',
        onCompleted: () => {
            navigate(RouterConfig.Activities + '?status=added', { replace: true });
        },
    });

    return (
        <>
            <>
                <Formik
                    initialValues={{
                        activity: {
                            name: '',
                            phone: '',
                            availability: '',
                            details: '',
                            address: {
                                addressLine1: '',
                                city: '',
                                country: '',
                                state: '',
                                zipCode: '',
                                freeTextAddress: '',
                                singleLineAddress: '',
                            },
                        },
                    }}
                    validate={(values) => {
                        const errors: any = {};
                        if (!values.activity.name) {
                            errors.name = 'Required';
                        }
                        if (values.activity.phone && !isValidPhone(values.activity.phone)) {
                            errors.phone = 'Please enter a valid phone number';
                        }

                        return errors;
                    }}
                    onSubmit={async (values) => {
                        const sanitizedPhoneNumber = sanitizePhoneNumber(values.activity.phone);
                        const variables = {
                            title: values.activity.name,
                            details: values.activity.details,
                            availability: values.activity.availability,
                            phoneNumber: sanitizedPhoneNumber,
                            address: values.activity.address,
                        };
                        // Resetting client only field to undefined
                        variables.address.singleLineAddress = undefined;
                        await addActivity({ variables });
                    }}
                >
                    {(formik) => (
                        <Form>
                            <PanelContainerWithHeader
                                title={panelTitle}
                                onClose={onDismiss}
                                {...{ formik }}
                                actionButtonText={'Save'}
                                loading={loading}
                                onClickActionButton={formik.handleSubmit}
                            >
                                <ActivityForm {...{ formik, activityName }} />
                            </PanelContainerWithHeader>
                        </Form>
                    )}
                </Formik>
            </>
        </>
    );
};

const useGetActivityPanelProps = () => {
    const { getSearchParam } = useQueryStringParams();

    const panelSelected = getSearchParam('parameter');

    let panelTitle = 'Create Activity';
    let activityName = '';

    switch (panelSelected) {
        case ActivityOptions.Call:
            panelTitle = 'Phone Call';
            activityName = `Phone Call`;
            break;
        case ActivityOptions.Visit:
            panelTitle = 'Home Visit';
            activityName = `Home Visit`;
            break;

        case ActivityOptions.Letter:
            panelTitle = 'Send a Letter';
            activityName = `Send a Letter`;
            break;
        case ActivityOptions.Outing:
            panelTitle = 'Outing';
            activityName = `Outing`;
            break;
    }

    return { panelTitle, activityName };
};

export default ActivityAdd;
