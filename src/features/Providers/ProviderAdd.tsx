import { Form, Formik } from 'formik';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import RouterConfig from 'src/app/RouterConfig';
import { ERROR_MESSAGES } from 'src/app/Strings';
import { ProviderForm } from 'src/common/components/Form';
import { PanelContainerWithHeader } from 'src/common/components/Panel/PanelContainerWithHeader';
import { useCreateProviderMutation } from 'src/graphQL/serverMocks/graphQLGeneratedCode';
import { useFeedbackService } from 'src/services/FeedbackService';
import { sanitizePhoneNumber } from 'src/utils/utils';
import { isValidPhone } from 'src/utils/validators';

interface IProviderAddProps {
    onDismiss: () => void;
}

const ProviderAdd: React.FC<IProviderAddProps> = ({ onDismiss }) => {
    const { setErrorToast } = useFeedbackService();
    const navigate = useNavigate();
    const [saveDisabled, setSaveDisabled] = useState(false);

    const [addProvider, { loading }] = useCreateProviderMutation({
        refetchQueries: ['GetProvider', 'GetProviders'],
        onCompleted: () => {
            navigate(RouterConfig.Providers + '?status=added', { replace: true });
        },
        onError: () => {
            setErrorToast(ERROR_MESSAGES.ADD_PROVIDER);
            setSaveDisabled(false);
        },
    });

    return (
        <>
            <>
                <Formik
                    validate={(values) => {
                        const errors: any = {};
                        if (!values.provider.lastName) {
                            errors.lastName = 'Provider last name is required';
                        }
                        if (values.provider.phone && !isValidPhone(values.provider.phone)) {
                            errors.phone = 'Please enter a valid phone number';
                        }
                        return errors;
                    }}
                    initialValues={{
                        provider: {
                            phone: '',
                            nPI: '',
                            firstName: '',
                            lastName: '',
                            providerSelected: false,
                            address: {
                                addressLine1: '',
                                city: '',
                                country: '',
                                state: '',
                                zipCode: '',
                                displayAddress: '',
                            },
                            primarySpecialty: '',
                            other: false,
                        },
                    }}
                    onSubmit={async (values) => {
                        setSaveDisabled(true);
                        const sanitizedPhoneNumber = sanitizePhoneNumber(values.provider.phone);
                        const addProviderValues = {
                            firstName: values.provider.firstName,
                            lastName: values.provider.lastName,
                            nPI: values.provider.nPI,
                            phoneNumber: sanitizedPhoneNumber,
                            address: {
                                addressLine1: values.provider.address.addressLine1,
                                city: values.provider.address.city,
                                country: values.provider.address.country,
                                state: values.provider.address.state,
                                zipCode: values.provider.address.zipCode,
                                freeTextAddress: values.provider.address.displayAddress,
                            },
                            primarySpecialty: values.provider.primarySpecialty,
                        };
                        await addProvider({ variables: addProviderValues });
                    }}
                >
                    {(formik) => (
                        <Form>
                            <PanelContainerWithHeader
                                title={'Add Provider'}
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
                                <ProviderForm {...{ formik }} />
                            </PanelContainerWithHeader>
                        </Form>
                    )}
                </Formik>
            </>
        </>
    );
};

export default ProviderAdd;
