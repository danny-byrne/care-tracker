import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { Formik, Form } from 'formik';
import { PanelContainerWithHeader } from 'src/common/components/Panel/PanelContainerWithHeader';

import {
    useUpdateConditionOccurrenceMutation,
    useConditionOccurenceSetCurrentMutation,
    useConditionOccurenceSetHistoricalMutation,
} from 'src/graphQL/serverMocks/graphQLGeneratedCode';
import RouterConfig from 'src/app/RouterConfig';

import { useFeedbackService } from 'src/services/FeedbackService';
import { getConditionValuesToEdit, getEditConditionValuesToSubmit } from './conditionMutationUtils';
import ConditionWizard from 'src/common/components/Wizard/ConditionWizard/ConditionWizard';

interface IConditionEditProps {
    onDismiss: () => void;
    condition: any;
}

const ConditionEdit: React.FC<IConditionEditProps> = ({ onDismiss, condition }) => {
    const navigate = useNavigate();
    const { setErrorToast } = useFeedbackService();
    const [saveDisabled, setSaveDisabled] = useState(false);

    const [updateCondition, { loading }] = useUpdateConditionOccurrenceMutation({
        onCompleted: () => {
            navigate(RouterConfig.Conditions);
        },
        refetchQueries: ['GetCareRecipientConditions', 'GetCareRecipientTimeline'],
        onError: () => {
            setErrorToast('Error updating condition');
            setSaveDisabled(false);
        },
    });

    const [setHistorical] = useConditionOccurenceSetHistoricalMutation({
        refetchQueries: ['GetCareRecipientConditions'],
    });

    const [setCurrent] = useConditionOccurenceSetCurrentMutation({
        refetchQueries: ['GetCareRecipientConditions'],
    });

    return (
        <>
            <Formik
                initialValues={getConditionValuesToEdit(condition)}
                onSubmit={async (values) => {
                    setSaveDisabled(true);
                    const variables = getEditConditionValuesToSubmit(values);

                    if (values.isCurrent) await setCurrent({ variables: { id: variables.id } });
                    else await setHistorical({ variables: { id: variables.id } });

                    await updateCondition({ variables: { input: variables } });
                }}
            >
                {(formik) => (
                    <Form>
                        <PanelContainerWithHeader
                            title={'Edit Condition'}
                            onClose={onDismiss}
                            {...{ formik }}
                            actionButtonText={'Save'}
                            onClickActionButton={() => {
                                if (!saveDisabled) {
                                    formik.handleSubmit();
                                }
                            }}
                            loading={loading || saveDisabled}
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

export default ConditionEdit;
