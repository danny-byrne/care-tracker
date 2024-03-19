/*eslint-disable*/
import { useQueryStringParams } from 'src/common/hooks/useQueryStringParams';

import React from 'react';
import { Form, Formik } from 'formik';
import { ActivityForm } from 'src/common/components/Form';
import { PanelContainerWithHeader } from 'src/common/components/Panel/PanelContainerWithHeader';
import { ActivityOptions } from './Activities';
import { useCreateActivityMutation, useUpdateActivityMutation } from 'src/graphQL/serverMocks/graphQLGeneratedCode';
import { useNavigate } from 'react-router';
import RouterConfig from 'src/app/RouterConfig';
import { Activity } from 'src/types/Activity';
import { useFeedbackService } from 'src/services/FeedbackService';
import { ERROR_MESSAGES } from 'src/app/Strings';
import { isValidPhone } from 'src/utils/validators';
import { formatPhoneNumber, sanitizePhoneNumber } from 'src/utils/utils';

interface IActivityEditProps {
    onDismiss: () => void;
    activity: Activity;
}

const ActivityEdit: React.FC<IActivityEditProps> = ({ onDismiss, activity }) => {
    const navigate = useNavigate();
    const { setErrorToast } = useFeedbackService();

    const [updateActivity, { loading }] = useUpdateActivityMutation({
        refetchQueries: ['GetActivities', 'GetActivity'],
        awaitRefetchQueries: true,
        onError: () => {
            setErrorToast(ERROR_MESSAGES.EDIT_ACTIVITY);
        },
        onCompleted: () => {
            navigate(RouterConfig.Activity(activity.id) + '?status=edited', { replace: true });
        },
    });

    console.log(activity);

    return (
        <>
            <>
                <Formik
                    initialValues={{
                        activity: {
                            name: activity.title,
                            details: activity.details,
                            phone: formatPhoneNumber(activity.phoneNumber),
                            availability: activity.availability,
                            address: {
                                addressLine1: activity.address.addressLine1,
                                city: activity.address.city,
                                country: activity.address.country,
                                state: activity.address.state,
                                zipCode: activity.address.zipCode,
                                freeTextAddress: activity.address.freeTextAddress,
                                singleLineAddress: activity.address.singleLineAddress,
                            },
                        },
                    }}
                    validate={(values) => {
                        // TODO: Update Validation
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
                            id: activity.id,
                            title: values.activity.name,
                            details: values.activity.details,
                            availability: values.activity.availability,
                            phoneNumber: sanitizedPhoneNumber,
                            address: {
                                addressLine1: values.activity.address.addressLine1,
                                city: values.activity.address.city,
                                country: values.activity.address.country,
                                state: values.activity.address.state,
                                zipCode: values.activity.address.zipCode,
                                freeTextAddress: values.activity.address.freeTextAddress,
                            },
                        };
                        await updateActivity({ variables });
                    }}
                >
                    {(formik) => (
                        <Form>
                            <PanelContainerWithHeader
                                title={'Edit Activity'}
                                onClose={onDismiss}
                                {...{ formik }}
                                actionButtonText={'Save'}
                                loading={loading}
                                onClickActionButton={formik.handleSubmit}
                            >
                                <ActivityForm {...{ formik }} />
                            </PanelContainerWithHeader>
                        </Form>
                    )}
                </Formik>
            </>
        </>
    );
};

export default ActivityEdit;
