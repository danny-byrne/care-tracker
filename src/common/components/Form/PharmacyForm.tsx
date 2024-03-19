import { Label, Stack, Text, TextField } from '@fluentui/react';
import { FormikProps } from 'formik';
import React from 'react';
import AddressSearch from 'src/common/components/AutoCompleteSearch/AddressSearch/AddressSearch';
import { getClassNames } from './PharmacyForm.classNames';
import PharmacySearch from 'src/common/components/AutoCompleteSearch/PharmacySearch/PharmacySearch';
import { formatPhoneNumber, getErrorMessagePhone } from 'src/utils/utils';

interface IPharmacyFormProps {
    formik: FormikProps<{
        pharmacy: {
            name?: string;
            phoneNumber: string;
            location: {
                addressLine1: string;
                city: string;
                country: string;
                state: string;
                zipCode: string;
                freeTextAddress?: string;
            };
            other?: boolean;
        };
    }>;
    pharmacyName?: string;
    isEdit?: boolean;
    isAdd?: boolean;
}

const PharmacyForm: React.FC<IPharmacyFormProps> = ({ formik, pharmacyName, isEdit }) => {
    const classNames = getClassNames();

    return (
        <Stack tokens={{ childrenGap: 24 }}>
            {isEdit ? (
                <Text className={classNames['wc-PharmacyForm--editPharmacyName']}>{pharmacyName}</Text>
            ) : (
                <Stack>
                    <Label>Pharmacy</Label>
                    <PharmacySearch formik={formik} defaultTerm={pharmacyName ?? ''} aria-label="Pharmacy Search" />
                </Stack>
            )}
            {formik.values.pharmacy.other && (
                <TextField
                    required
                    className={classNames['wc-ProviderForm--providerNameFields']}
                    label="Name"
                    name="Name"
                    resizable={false}
                    {...formik.getFieldProps('pharmacy.name')}
                />
            )}
            <Stack>
                <Label>Address</Label>
                <AddressSearch
                    formik={formik}
                    defaultTerm={formik.values.pharmacy.location.freeTextAddress}
                    aria-label="Address Search"
                />
            </Stack>
            <TextField
                onGetErrorMessage={getErrorMessagePhone}
                label="Phone"
                name="pharmacy.phoneNumber"
                resizable={false}
                {...formik.getFieldProps('pharmacy.phoneNumber')}
                onChange={(e, value) => {
                    const formattedPhoneNumber = formatPhoneNumber(value);
                    formik.setFieldValue('pharmacy.phoneNumber', formattedPhoneNumber);
                }}
                deferredValidationTime={1000}
            />
        </Stack>
    );
};

export default PharmacyForm;
