import React, { useEffect, useState } from 'react';
import { FormikProps } from 'formik';

import { Stack, Text } from '@fluentui/react';
import ConditionSearch from 'src/common/components/AutoCompleteSearch/ConditionSearch/ConditionSearch';
import { removeValueFromFormikArray } from 'src/common/helpers/Formik';
import { getClassNames } from './ConditionWizardPage.classNames';
import { DefaultPill, SelectedPill } from 'src/common/components/Wizard/Pills';
import { useGetCommonConditionsQuery } from 'src/graphQL/serverMocks/graphQLGeneratedCode';
import { useWindowDimensions } from 'src/common/hooks/useMediaQueries';

export interface Condition {
    conditionName: string;
    icd10Code: string;
}

interface ConditionProps {
    conditions: Condition[];
}

interface IConditionProps {
    formik?: FormikProps<ConditionProps>;
}

export const ConditionWizardPage: React.FC<IConditionProps> = ({ formik }) => {
    const classNames = getClassNames();

    const HELPER_TEXT = 'Choose from the most common: (Multi-select)';

    const { data } = useGetCommonConditionsQuery();

    const [allFormikConditions, setAllFormikConditions] = useState(formik.values.conditions);
    const [filteredFormikConditions, setFilteredFormikConditions] = useState([]);

    // Trigger used to update useEffect when values removed from formik.values.conditions
    // Variable was not consistently updating
    const [trigger, setTrigger] = useState(false);
    useEffect(() => {
        const newConditions = formik.values.conditions.filter((condition) => {
            return (
                data.commonCondition.find((commonCondition) => commonCondition.code === condition.icd10Code) ===
                undefined
            );
        });

        setFilteredFormikConditions(newConditions);
        setAllFormikConditions(formik.values.conditions);
    }, [formik.values.conditions, data, trigger]);

    const removeValueFromArray = (code: string) => {
        setTrigger(!trigger);
        removeValueFromFormikArray(formik, 'conditions', 'icd10Code', code);
    };

    // Note: This pattern is fragile and should be updated to something more robust when possible
    // Height of components other than the wizard container
    // Will have to update if styling changes
    const NON_LIST_HEIGHT = 237;
    const { height } = useWindowDimensions();
    const [containerHeight, setContainerHeight] = useState(height - NON_LIST_HEIGHT);

    useEffect(() => {
        setContainerHeight(height - NON_LIST_HEIGHT);
    }, [height]);

    return (
        // Height set here to prevent need for passing into classNames
        <Stack className={classNames['wc-ConditionWizard--container']} style={{ height: containerHeight }}>
            <ConditionSearch formik={formik} isArray clearTextOnClick aria-label="Condition Search" />
            <div className={classNames['wc-ConditionWizard--grayLine']} />
            <Text className={classNames['wc-ConditionWizard--helperText']}>{HELPER_TEXT}</Text>
            <Stack
                className={classNames['wc-ConditionWizard--pillContainer']}
                horizontal
                tokens={{ childrenGap: '8px' }}
                wrap
            >
                {filteredFormikConditions.map((condition) => {
                    return (
                        <SelectedPill
                            key={condition.icd10Code}
                            itemKey={condition.icd10Code}
                            pillText={condition.conditionName}
                            onClick={() => removeValueFromArray(condition.icd10Code)}
                        />
                    );
                })}
                {data?.commonCondition?.map((condition) => {
                    const conditionIndexInCurrentArray = allFormikConditions.find((formikCondition) => {
                        return formikCondition.icd10Code === condition.code;
                    });

                    return conditionIndexInCurrentArray === undefined ? (
                        <DefaultPill
                            key={condition.code}
                            itemKey={condition.code}
                            pillText={condition.name}
                            onClick={() => {
                                const conditionIndexInCurrentArray = allFormikConditions.find((formikCondition) => {
                                    return formikCondition.icd10Code === condition.code;
                                });
                                if (conditionIndexInCurrentArray === undefined) {
                                    const index = allFormikConditions.length;
                                    formik.setFieldValue(`conditions.${index}`, {
                                        conditionName: condition.name,
                                        icd10Code: condition.code,
                                    });
                                }
                            }}
                        />
                    ) : (
                        <SelectedPill
                            key={condition.code}
                            itemKey={condition.code}
                            pillText={condition.name}
                            onClick={() => removeValueFromArray(condition.code)}
                        />
                    );
                })}
            </Stack>
        </Stack>
    );
};
