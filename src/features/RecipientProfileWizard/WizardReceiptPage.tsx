import React, { useEffect, useState } from 'react';
import { FormikProps } from 'formik';

import { Stack, Text } from '@fluentui/react';
import { Condition } from './ConditionWizardPage';
import { getClassNames } from './WizardReceiptPage.className';
import { useWindowDimensions } from 'src/common/hooks/useMediaQueries';

interface ReciptProps {
    conditions: Condition[];
}

interface IWizardReceiptPageProps {
    formik?: FormikProps<ReciptProps>;
}

export const WizardReceiptPage: React.FC<IWizardReceiptPageProps> = ({ formik }) => {
    const classNames = getClassNames();

    // Note: This pattern is fragile and should be updated to something more robust when possible
    // Height of components other than the wizard container
    // Will have to update if styling changes
    const NON_LIST_HEIGHT = 390;
    const { height } = useWindowDimensions();
    const [containerHeight, setContainerHeight] = useState(height - NON_LIST_HEIGHT);

    useEffect(() => {
        setContainerHeight(height - NON_LIST_HEIGHT);
    }, [height]);

    return (
        // Height set here to prevent need for passing into classNames
        <Stack className={classNames['wc-WizardReceiptPage--pageContainer']} style={{ height: containerHeight }}>
            <Stack className={classNames['wc-WizardReceiptPage--container']}>
                <Stack tokens={{ childrenGap: '2px' }}>
                    <Text className={classNames['wc-WizardReceiptPage--sectionHeaderText']}>Conditions</Text>
                    <Stack>
                        {formik.values.conditions?.map((condition) => {
                            return (
                                <Text
                                    className={classNames['wc-WizardReceiptPage--valueText']}
                                    key={condition.icd10Code}
                                >
                                    {condition.conditionName}
                                </Text>
                            );
                        })}
                    </Stack>
                </Stack>
            </Stack>
        </Stack>
    );
};
