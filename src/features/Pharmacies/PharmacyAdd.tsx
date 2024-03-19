import { Form, Formik } from 'formik';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import RouterConfig from 'src/app/RouterConfig';
import { ERROR_MESSAGES } from 'src/app/Strings';
import { PharmacyForm } from 'src/common/components/Form';
import { PanelContainerWithHeader } from 'src/common/components/Panel/PanelContainerWithHeader';
import { useCreatePharmacyMutation } from 'src/graphQL/serverMocks/graphQLGeneratedCode';
import { useFeedbackService } from 'src/services/FeedbackService';
import { sanitizePhoneNumber } from 'src/utils/utils';

interface IPharmacyAddProps {
    onDismiss: () => void;
}

const PharmacyAdd: React.FC<IPharmacyAddProps> = ({ onDismiss }) => {
    const { setErrorToast } = useFeedbackService();
    const navigate = useNavigate();
    const [saveDisabled, setSaveDisabled] = useState(false);

    const [addPharmacy, { loading }] = useCreatePharmacyMutation({
        refetchQueries: ['GetPharmacies', 'GetPharmacy'],
        awaitRefetchQueries: true,
        onCompleted: () => {
            navigate(RouterConfig.Pharmacies + '?status=added', { replace: true });
        },
        onError: () => {
            setErrorToast(ERROR_MESSAGES.ADD_PHARMACIES);
            setSaveDisabled(false);
        },
    });

    return (
        <>
            <>
                <Formik
                    initialValues={{
                        pharmacy: {
                            name: '',
                            phoneNumber: '',
                            location: {
                                addressLine1: '',
                                city: '',
                                country: '',
                                state: '',
                                zipCode: '',
                                freeTextAddress: '',
                            },
                            other: false,
                        },
                    }}
                    validate={(values) => {
                        const errors: any = {};
                        if (values.pharmacy.other && !values.pharmacy.name) {
                            errors.name = 'Required';
                        }

                        return errors;
                    }}
                    onSubmit={async (values) => {
                        setSaveDisabled(true);
                        const sanitizedPhoneNumber = sanitizePhoneNumber(values.pharmacy.phoneNumber);
                        const addPharmacyValues = {
                            name: values.pharmacy.name,
                            phoneNumber: sanitizedPhoneNumber,
                            location: {
                                addressLine1: values.pharmacy.location.addressLine1,
                                city: values.pharmacy.location.city,
                                country: values.pharmacy.location.country,
                                state: values.pharmacy.location.state,
                                zipCode: values.pharmacy.location.zipCode,
                                freeTextAddress: values.pharmacy.location.freeTextAddress,
                            },
                        };
                        await addPharmacy({ variables: addPharmacyValues });
                    }}
                >
                    {(formik) => (
                        <Form>
                            <PanelContainerWithHeader
                                title={'Add Pharmacy'}
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
                                <PharmacyForm {...{ formik }} />
                            </PanelContainerWithHeader>
                        </Form>
                    )}
                </Formik>
            </>
        </>
    );
};

export default PharmacyAdd;
