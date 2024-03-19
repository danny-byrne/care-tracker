import { Form, Formik } from 'formik';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import RouterConfig from 'src/app/RouterConfig';
import { ERROR_MESSAGES } from 'src/app/Strings';
import { PanelContainerWithHeader } from 'src/common/components/Panel/PanelContainerWithHeader';
import { useUpdatePharmacyMutation } from 'src/graphQL/serverMocks/graphQLGeneratedCode';
import { useFeedbackService } from 'src/services/FeedbackService';
import { PharmacyForm } from 'src/common/components/Form';
import { Pharmacy } from 'src/types/Pharmacy';
import { formatPhoneNumber, sanitizePhoneNumber } from 'src/utils/utils';

interface IPharmacyEditProps {
    onDismiss: () => void;
    pharmacy: Pharmacy;
}

const PharmacyEdit: React.FC<IPharmacyEditProps> = ({ onDismiss, pharmacy }) => {
    const navigate = useNavigate();
    const { setErrorToast } = useFeedbackService();
    const [saveDisabled, setSaveDisabled] = useState(false);

    const [updatePharmacy, { loading }] = useUpdatePharmacyMutation({
        refetchQueries: ['GetPharmacies', 'GetPharmacy'],
        awaitRefetchQueries: true,
        onCompleted: () => {
            navigate(RouterConfig.Pharmacy(pharmacy.id) + '?status=edited', { replace: true });
        },
        onError: () => {
            setErrorToast(ERROR_MESSAGES.EDIT_PHARMACY);
            setSaveDisabled(false);
        },
    });

    const formattedPhoneNumber = formatPhoneNumber(pharmacy.phoneNumber);

    return (
        <>
            <>
                <Formik
                    initialValues={{
                        pharmacy: {
                            phoneNumber: formattedPhoneNumber,
                            location: {
                                addressLine1: pharmacy.location.addressLine1,
                                city: pharmacy.location.city,
                                country: pharmacy.location.country,
                                state: pharmacy.location.state,
                                zipCode: pharmacy.location.zipCode,
                                freeTextAddress: pharmacy.location.freeTextAddress,
                            },
                            other: false,
                        },
                    }}
                    onSubmit={async (values) => {
                        setSaveDisabled(true);
                        const sanitizedPhoneNumber = sanitizePhoneNumber(values.pharmacy.phoneNumber);
                        const updatePharmacyValues = {
                            phoneNumber: sanitizedPhoneNumber,
                            location: {
                                addressLine1: values.pharmacy.location.addressLine1,
                                city: values.pharmacy.location.city,
                                country: values.pharmacy.location.country,
                                state: values.pharmacy.location.state,
                                zipCode: values.pharmacy.location.zipCode,
                                freeTextAddress: values.pharmacy.location.freeTextAddress,
                            },
                            // name and id are fixed for edit
                            name: pharmacy.name,
                            id: pharmacy.id,
                        };
                        await updatePharmacy({ variables: updatePharmacyValues });
                    }}
                >
                    {(formik) => (
                        <Form>
                            <PanelContainerWithHeader
                                title={'Edit Pharmacy'}
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
                                <PharmacyForm {...{ formik }} pharmacyName={pharmacy.name} isEdit />
                            </PanelContainerWithHeader>
                        </Form>
                    )}
                </Formik>
            </>
        </>
    );
};

export default PharmacyEdit;
