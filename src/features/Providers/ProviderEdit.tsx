import { Form, Formik } from 'formik';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import RouterConfig from 'src/app/RouterConfig';
import { ERROR_MESSAGES } from 'src/app/Strings';
import { PanelContainerWithHeader } from 'src/common/components/Panel/PanelContainerWithHeader';
import { useUpdateProviderMutation } from 'src/graphQL/serverMocks/graphQLGeneratedCode';
import { useFeedbackService } from 'src/services/FeedbackService';
import { Provider } from 'src/types/Provider';
import { ProviderForm } from 'src/common/components/Form';
import { isValidPhone } from 'src/utils/validators';
import { formatPhoneNumber, sanitizePhoneNumber } from 'src/utils/utils';

interface IProviderEditProps {
    onDismiss: () => void;
    provider: Provider;
}

const ProviderEdit: React.FC<IProviderEditProps> = ({ onDismiss, provider }) => {
    const navigate = useNavigate();
    const { setErrorToast } = useFeedbackService();
    const [saveDisabled, setSaveDisabled] = useState(false);

    const [updateProvider, { loading }] = useUpdateProviderMutation({
        refetchQueries: ['GetProvider', 'GetProviders'],
        onCompleted: () => {
            navigate(RouterConfig.Provider(provider.id) + '?status=edited', { replace: true });
        },
        onError: () => {
            setErrorToast(ERROR_MESSAGES.EDIT_PROVIDER);
            setSaveDisabled(false);
        },
    });

    const providerName = `${provider.firstName} ${provider.lastName}`;
    const formattedPhoneNumber = provider.phoneNumber ? formatPhoneNumber(provider.phoneNumber) : '';

    return (
        <>
            <>
                <Formik
                    validate={(values) => {
                        const errors: any = {};
                        if (!values.provider.providerSelected) {
                            errors.providerSelected = 'Required';
                        }
                        if (values.provider.phone && !isValidPhone(values.provider.phone)) {
                            errors.phone = 'Please enter a valid phone number';
                        }
                        return errors;
                    }}
                    initialValues={{
                        provider: {
                            phone: formattedPhoneNumber,
                            extension: '',
                            nPI: provider.codes[0]?.code ?? '',
                            firstName: provider.firstName ?? '',
                            lastName: provider.lastName ?? '',
                            id: provider.id,
                            providerSelected: true,
                            address: {
                                addressLine1: provider.address.addressLine1,
                                city: provider.address.city,
                                country: provider.address.country,
                                state: provider.address.state,
                                zipCode: provider.address.zipCode,
                                displayAddress: provider.address.singleLineAddress,
                                freeTextAddress: provider.address.freeTextAddress,
                            },
                            primarySpecialty: provider.primarySpecialty,
                            other: false,
                        },
                    }}
                    onSubmit={async (values) => {
                        setSaveDisabled(true);
                        const sanitizedPhoneNumber = sanitizePhoneNumber(values.provider.phone);
                        const updateProviderValues = {
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
                                freeTextAddress: values.provider.address.freeTextAddress,
                            },
                            primarySpecialty: values.provider.primarySpecialty,
                            id: provider.id,
                        };
                        await updateProvider({ variables: updateProviderValues });
                    }}
                >
                    {(formik) => (
                        <Form>
                            <PanelContainerWithHeader
                                title={'Edit Provider'}
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
                                <ProviderForm {...{ formik, providerName }} isEdit />
                            </PanelContainerWithHeader>
                        </Form>
                    )}
                </Formik>
            </>
        </>
    );
};

export default ProviderEdit;
