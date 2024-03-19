import React, { useEffect, useState } from 'react';
import { Stack } from '@fluentui/react';
import { useLocation, useNavigate } from 'react-router';

import SubHeaderLayout from 'src/common/components/Layout/SubHeaderLayout';
import ConditionAdd from './ConditionAdd';
import { useAddPanelControls } from 'src/common/hooks/useAddPanel';
import { useIsMobile } from 'src/common/hooks/useMediaQueries';
import { getClassNames as getFABClassNames } from 'src/common/components/FAB/FloatingActionButton.classNames';
import { useFeedbackService } from 'src/services/FeedbackService';
import { RecordStatus, useGetCareRecipientConditionsQuery } from 'src/graphQL/serverMocks/graphQLGeneratedCode';
import { AddPanel } from 'src/common/components/Panel/AddPanel';
import { ERROR_MESSAGES } from 'src/app/Strings';
import { useQueryStringParams } from 'src/common/hooks/useQueryStringParams';
import { FloatingActionButton } from 'src/common/components';
import RouterConfig from 'src/app/RouterConfig';
import ConditionListItem from './ConditionListItem';
import Accordion from 'src/common/components/Accordion/Accordion';
import { Header } from 'src/common/components';
import { getConditionActive, getTimeFrameText } from './utils';
import { getClassNames } from './ConditionList.classNames';
interface IConditionListProps {}

interface ConditionLocationState {
    mode: string;
}

const ConditionList: React.FC<IConditionListProps> = () => {
    const fabClassNames = getFABClassNames(false);
    const isMobile = useIsMobile();
    const navigate = useNavigate();
    const { setErrorToast, setSuccessToast } = useFeedbackService();
    const { getSearchParam, removeSearchParam } = useQueryStringParams();
    const classNames = getClassNames();

    const location = useLocation();
    const state = location.state as ConditionLocationState;
    const { showAddPanel, hideAddPanel, showAdd } = useAddPanelControls();
    const [conditionAdded, setConditionAdded] = useState(false);
    const status = getSearchParam('status');

    const { data, loading } = useGetCareRecipientConditionsQuery({
        onError: () => {
            setErrorToast(ERROR_MESSAGES.GET_PROVIDERS);
        },
    });

    useEffect(() => {
        if (status === 'added' || status === 'deleted') {
            removeSearchParam('status');
            setSuccessToast(`Condition ${status}`);
        }
        if (status === 'added') {
            setConditionAdded(true);
        }
    }, [status]);

    useEffect(() => {
        if (state?.mode === 'add') {
            showAddPanel();
        }
    }, []);

    // TODO: Still need to handle this, waiting for backend update from Katie
    // Navigate back to care plan if the list is empty and an entity hasn't just been added
    const activeConditionList = data?.careRecipientConditions?.conditions?.filter(
        (condition) => getConditionActive(condition) && condition.recordStatus == RecordStatus.Active,
    );
    const nonActiveConditionList = data?.careRecipientConditions?.conditions?.filter(
        (condition) => !getConditionActive(condition) && condition.recordStatus == RecordStatus.Active,
    );

    useEffect(() => {
        const activeConditions = activeConditionList?.length;
        const nonActiveConditions = nonActiveConditionList?.length;

        const emptyListWithoutAddModal =
            !loading &&
            state?.mode !== 'add' &&
            !showAdd &&
            activeConditions === 0 &&
            nonActiveConditions === 0 &&
            status !== 'added' &&
            !conditionAdded;

        // If only 0 active entity remains, user has deleted last entity
        const emptyListAfterDelete = status === 'deleted' && activeConditions === 0;

        if (emptyListWithoutAddModal || emptyListAfterDelete) {
            navigate(RouterConfig.CarePlan);
        }
    }, [loading, state, showAdd, status, conditionAdded, activeConditionList, nonActiveConditionList]);

    const onClickActionButton = isMobile ? undefined : showAddPanel;

    return (
        <SubHeaderLayout title={'Conditions'} actionButtonText={'Add'} onClickActionButton={onClickActionButton}>
            {data && (
                <Stack className={classNames['wc-ConditionList--container']}>
                    {Boolean(activeConditionList.length) && (
                        <Accordion
                            className={''}
                            collapsed={false}
                            onToggle={() => {}}
                            header={<Header text="Active" />}
                        >
                            {activeConditionList?.map((condition, i = 1) => {
                                const { timeframeText, hasNoStartDate } = getTimeFrameText(condition);
                                return (
                                    <ConditionListItem
                                        name={condition.condition.name}
                                        id={condition.id}
                                        key={condition.id}
                                        timeframeText={timeframeText}
                                        index={i}
                                        hasNoStartDate={hasNoStartDate}
                                    />
                                );
                            })}
                        </Accordion>
                    )}
                    {Boolean(nonActiveConditionList.length) && (
                        <Accordion
                            className={''}
                            collapsed={false}
                            onToggle={() => {}}
                            header={<Header text="No Longer Experiencing" />}
                        >
                            {nonActiveConditionList?.map((condition, i = 1) => {
                                const { timeframeText, hasNoStartDate } = getTimeFrameText(condition);
                                return (
                                    <ConditionListItem
                                        name={condition.condition.name}
                                        id={condition.id}
                                        key={condition.id}
                                        timeframeText={timeframeText}
                                        index={i}
                                        hasNoStartDate={hasNoStartDate}
                                    />
                                );
                            })}
                        </Accordion>
                    )}
                </Stack>
            )}
            {isMobile && (
                <Stack className={fabClassNames['wc-FloatingActionButton--fabContainer']}>
                    <FloatingActionButton onClick={showAddPanel} />
                </Stack>
            )}
            <AddPanel>
                <ConditionAdd onDismiss={hideAddPanel} />
            </AddPanel>
        </SubHeaderLayout>
    );
};

export default ConditionList;
