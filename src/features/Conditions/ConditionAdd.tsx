import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import { PanelContainerWithHeader } from 'src/common/components/Panel/PanelContainerWithHeader';

import {
    useConditionOccurenceSetCurrentMutation,
    useConditionOccurenceSetHistoricalMutation,
    useCreateConditionOccurrenceMutation,
} from 'src/graphQL/serverMocks/graphQLGeneratedCode';
import ConditionWizard from 'src/common/components/Wizard/ConditionWizard/ConditionWizard';

import { getAddConditionValuesToSubmit, nullConditionValues } from './conditionMutationUtils';

interface ConditionAddItemProps {
    onDismiss?: () => void;
}

const ConditionAdd: React.FC<ConditionAddItemProps> = ({ onDismiss }) => {
    const [saveDisabled, setSaveDisabled] = useState(false);

    const [addCondition] = useCreateConditionOccurrenceMutation({ refetchQueries: ['GetCareRecipientTimeline'] });

    const [setHistorical] = useConditionOccurenceSetHistoricalMutation({
        refetchQueries: ['GetCareRecipientConditions'],
    });

    const [setCurrent] = useConditionOccurenceSetCurrentMutation({
        refetchQueries: ['GetCareRecipientConditions'],
    });

    return (
        <>
            <Formik
                initialValues={nullConditionValues}
                onSubmit={async (values) => {
                    setSaveDisabled(true);
                    const variables = getAddConditionValuesToSubmit(values);
                    const result = await addCondition({ variables: { input: variables } });
                    const conditionId = result.data?.conditionOccurrenceCreate?.result?.id;

                    if (values.isCurrent) await setCurrent({ variables: { id: conditionId } });
                    else await setHistorical({ variables: { id: conditionId } });
                }}
            >
                {(formik) => (
                    <Form>
                        <PanelContainerWithHeader
                            title={'Add Condition'}
                            onClose={onDismiss}
                            {...{ formik }}
                            actionButtonText={'Save'}
                            onClickActionButton={() => {
                                if (!saveDisabled) {
                                    formik.handleSubmit();
                                }
                            }}
                            loading={saveDisabled}
                            showActionButton={false}
                        >
                            <ConditionWizard formik={formik} />
                        </PanelContainerWithHeader>
                    </Form>
                )}
            </Formik>
        </>
    );
};

export default ConditionAdd;
