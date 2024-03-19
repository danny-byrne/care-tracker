import React, { useEffect } from 'react';

import { Label, Stack, TextField } from '@fluentui/react';

import { FormikProps } from 'formik';
import AddressSearch from '../AutoCompleteSearch/AddressSearch/AddressSearch';
import { getErrorMessagePhone, formatPhoneNumber } from 'src/utils/utils';

interface IActivityFormProps {
    formik: FormikProps<{
        activity: {
            name: string;
            phone?: string;
            availability?: string;
            details?: string;
            address: {
                addressLine1: string;
                city: string;
                country: string;
                state: string;
                zipCode: string;
                freeTextAddress?: string;
                singleLineAddress?: string;
            };
        };
    }>;
    isAdd?: boolean;
    activityName?: string;
}

const ActivityForm: React.FC<IActivityFormProps> = ({ formik, activityName }) => {
    useEffect(() => {
        if (activityName) {
            formik.setFieldValue('activity.name', activityName);
        }
    }, [activityName]);

    return (
        <Stack tokens={{ childrenGap: 24 }} style={{ paddingBottom: '10rem' }}>
            <TextField
                data-testid={'activity-name'}
                label="Activity Name"
                name="Activity Name"
                resizable={false}
                required
                {...formik.getFieldProps('activity.name')}
            />
            <TextField
                label="Phone"
                name="Phone"
                resizable={false}
                placeholder="(xxx) xxx-xxxx"
                {...formik.getFieldProps('activity.phone')}
                onChange={(e, value) => {
                    const formattedPhoneNumber = formatPhoneNumber(value);
                    formik.setFieldValue('activity.phone', formattedPhoneNumber);
                }}
                onGetErrorMessage={getErrorMessagePhone}
                deferredValidationTime={1000}
            />
            <Stack>
                <Label>Address</Label>
                <AddressSearch
                    formik={formik}
                    defaultTerm={formik.values.activity.address.singleLineAddress}
                    aria-label="Address Search"
                />
            </Stack>
            <TextField
                data-testid={'activity-availability'}
                label="Availability"
                name="Availability"
                resizable={false}
                {...formik.getFieldProps('activity.availability')}
                placeholder={'When are they available'}
            />
            <TextField
                data-testid={'activity-details'}
                label="Details"
                name="Details"
                resizable={false}
                {...formik.getFieldProps('activity.details')}
                placeholder={'Tips to make it special'}
            />
        </Stack>
    );
};

export default ActivityForm;
