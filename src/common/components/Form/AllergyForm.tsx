import { Dropdown, IDropdownOption, ResponsiveMode, Stack, Text, TextField } from '@fluentui/react';
import { FormikProps } from 'formik';
import React from 'react';
import { capitalizeOnlyFirstLetter } from 'src/common/helpers/textFormatting';
import { AllergySeverity } from 'src/graphQL/serverMocks/graphQLGeneratedCode';
import { trackFieldChanged } from 'src/wcpConsentInit';
import { getClassNames } from './AllergyForm.classNames';

interface IAllergyFormProps {
    formik: FormikProps<{
        allergy: {
            name?: string;
            severity?: AllergySeverity;
        };
    }>;
    allergyName?: string;
    isEdit?: boolean;
    isAdd?: boolean;
}

const severityOptions: IDropdownOption[] = Object.keys(AllergySeverity)
    .filter((option) => {
        return AllergySeverity[option] !== AllergySeverity.Unknown;
    })
    .map((option) => {
        return {
            key: option,
            text: option,
        };
    });

const AllergyForm: React.FC<IAllergyFormProps> = ({ formik, isEdit, allergyName }) => {
    const classNames = getClassNames();

    return (
        <Stack tokens={{ childrenGap: 24 }}>
            {isEdit ? (
                <Text className={classNames['wc-AllergyForm--editAllergynName']}>{allergyName}</Text>
            ) : (
                <TextField
                    className={classNames['wc-AllergyForm--allergyNameFields']}
                    label="Allergen"
                    name="Name"
                    resizable={false}
                    {...formik.getFieldProps('allergy.name')}
                    required
                />
            )}
            <Dropdown
                required
                options={severityOptions}
                responsiveMode={ResponsiveMode.large}
                id="severity"
                label="Severity of Reaction"
                selectedKey={capitalizeOnlyFirstLetter(formik.values.allergy.severity)}
                onChange={(_, item) => {
                    trackFieldChanged('severity-dropdown');
                    formik.setFieldValue('allergy.severity', item.key);
                }}
            />
        </Stack>
    );
};

export default AllergyForm;
