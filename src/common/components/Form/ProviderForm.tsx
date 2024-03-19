import { Label, Stack, Text, TextField } from '@fluentui/react';
import { FormikProps } from 'formik';
import React from 'react';
import AddressSearch from 'src/common/components/AutoCompleteSearch/AddressSearch/AddressSearch';
import ProviderSearch from 'src/common/components/AutoCompleteSearch/ProviderSearch/ProviderSearch';
import { getClassNames } from './ProviderForm.classNames';
import { formatPhoneNumber, getErrorMessagePhone } from 'src/utils/utils';
import { FormErrorMessage } from '.';

interface IProviderFormProps {
    formik: FormikProps<{
        provider: {
            phone: string;
            nPI: string;
            firstName: string;
            lastName: string;
            id?: string;
            providerSelected: boolean;
            address: {
                addressLine1: string;
                city: string;
                country: string;
                state: string;
                zipCode: string;
                displayAddress?: string;
            };
            primarySpecialty?: string;
            other?: boolean;
        };
    }>;
    providerName?: string;
    isEdit?: boolean;
    isAdd?: boolean;
    providerRequired?: boolean;
    errors?: any;
}

const ProviderForm: React.FC<IProviderFormProps> = ({ formik, providerName, isEdit, providerRequired, errors }) => {
    const classNames = getClassNames();

    return (
        <Stack tokens={{ childrenGap: 24 }}>
            {isEdit ? (
                <Text className={classNames['wc-ProviderForm--editProviderName']}>{providerName}</Text>
            ) : (
                <Stack>
                    <Label required={providerRequired}>Provider</Label>
                    <ProviderSearch formik={formik} defaultTerm={providerName ?? ''} isAdd />
                </Stack>
            )}
            {formik.values.provider.other && (
                <Stack horizontal tokens={{ childrenGap: 14 }}>
                    <TextField
                        className={classNames['wc-ProviderForm--providerNameFields']}
                        label="First Name"
                        name="First Name"
                        resizable={false}
                        {...formik.getFieldProps('provider.firstName')}
                        aria-label="First Name"
                    />
                    <Stack className={classNames['wc-ProviderForm--providerNameFields']}>
                        <TextField
                            required
                            label="Last Name"
                            name="Last Name"
                            resizable={false}
                            {...formik.getFieldProps('provider.lastName')}
                            aria-label="Last Name"
                            onBlur={() => formik.setTouched({ ...formik.touched, provider: { lastName: true } })}
                        />
                        {formik?.touched?.provider?.lastName && <FormErrorMessage error={errors?.providerNeeded} />}
                    </Stack>
                </Stack>
            )}
            <TextField
                label="Phone"
                name="Phone"
                resizable={false}
                placeholder="(xxx) xxx-xxxx"
                {...formik.getFieldProps('provider.phone')}
                onChange={(e, value) => {
                    const formattedPhoneNumber = formatPhoneNumber(value);
                    formik.setFieldValue('provider.phone', formattedPhoneNumber);
                }}
                onGetErrorMessage={getErrorMessagePhone}
                deferredValidationTime={1000}
            />
            <Stack>
                <Label>Address</Label>
                <AddressSearch
                    formik={formik}
                    defaultTerm={formik.values.provider.address.displayAddress}
                    aria-label="Address Search"
                />
            </Stack>
        </Stack>
    );
};

export default ProviderForm;
