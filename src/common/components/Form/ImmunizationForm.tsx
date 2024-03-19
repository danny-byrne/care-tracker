import { Label, Stack, Text } from '@fluentui/react';
import { FormikProps } from 'formik';
import React from 'react';
import { Month } from 'src/graphQL/serverMocks/graphQLGeneratedCode';
import ImmunizationSearch from '../AutoCompleteSearch/ImmunizationSearch/ImmunizationSearch';
import { DateDetails, DateDetailsFormType } from '../DateDetails';
import { getClassNames } from './ImmunizationForm.classNames';

interface IImmunizationFormProps {
    formik: FormikProps<{
        immunization: {
            name?: string;
            code?: string;
            year: number;
            month: Month;
            day: number;
            unsureOfSpecificYear: boolean;
            relativeStart: number;
            relativeEnd: number;
        };
    }>;
    immunizationName?: string;
    isEdit?: boolean;
    isAdd?: boolean;
}

const ImmunizationForm: React.FC<IImmunizationFormProps> = ({ formik, isEdit, immunizationName }) => {
    const classNames = getClassNames();

    const radioButtonText = {
        trueText: `I know when it was received`,
        falseText: 'General timeframe',
    };

    return (
        <Stack tokens={{ childrenGap: 24 }}>
            {isEdit ? (
                <Text className={classNames['wc-ImmunizationForm--editImmunizationName']}>{immunizationName}</Text>
            ) : (
                <Stack>
                    <Label required>Immunization</Label>
                    <ImmunizationSearch formik={formik} />
                </Stack>
            )}

            <DateDetails
                onChangeYear={(value) => formik.setFieldValue('immunization.year', value)}
                onChangeMonth={(value) => formik.setFieldValue('immunization.month', value)}
                onChangeDay={(value) => formik.setFieldValue('immunization.day', value)}
                onChangeUnsureStatus={(value) => {
                    formik.setFieldValue('immunization.unsureOfSpecificYear', value);
                    if (value) {
                        formik.setFieldValue('immunization.year', null);
                        formik.setFieldValue('immunization.day', null);
                        formik.setFieldValue('immunization.month', null);
                    } else {
                        formik.setFieldValue('immunization.relativeStart', null);
                        formik.setFieldValue('immunization.relativeEnd', null);
                    }
                }}
                onChangeRelativePeriod={(value, timeframe) => formik.setFieldValue(`immunization.${timeframe}`, value)}
                dateDetails={formik.values.immunization}
                radioButtonText={radioButtonText}
                pageType={DateDetailsFormType.Immunization}
            />
        </Stack>
    );
};

export default ImmunizationForm;
