import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Panel, Text, Stack, Spinner, PanelType, Separator } from '@fluentui/react';
import { useBoolean } from '@fluentui/react-hooks';

import { useQueryStringParams } from 'src/common/hooks/useQueryStringParams';
import {
    useGetCareRecipientConditionsQuery,
    useDeleteConditionOccurenceMutation,
    useGetPrescriptionsQuery,
    GetCareRecipientConditionsQuery,
    GetCareRecipientConditionsDocument,
} from 'src/graphQL/serverMocks/graphQLGeneratedCode';
import { useIsMobile } from 'src/common/hooks/useMediaQueries';
import ActionButtonRow from 'src/common/components/ActionButtonRow/ActionButtonRow';
import SubHeaderLayout from 'src/common/components/Layout/SubHeaderLayout';
import { getClassNames } from './ConditionView.classNames';
import { Back, DeleteDialog, FormErrorBar } from 'src/common/components';
import RouterConfig from 'src/app/RouterConfig';
import { PagesWithDelete } from 'src/common/components/dialogs/DeleteDialog';
import { getConditionActive, getTimeFrameText } from './utils';
import { PanelStyleOverrides } from 'src/common/components/Panel/PanelStyleOverrides';
import { usePanelWidth } from 'src/common/hooks/usePanelWidth';
import ConditionEdit from './ConditionEdit';
import MedicationListItem from './ConditionMedicationListItem';

const ConditionView: React.FC = () => {
    const isMobile = useIsMobile();
    const navigate = useNavigate();
    const [hideDeleteDialog, { toggle: toggleHideDeleteDialog }] = useBoolean(true);

    const { id } = useParams();
    const [isLoaded, setIsLoaded] = useState(false);
    const [activeCondition, setActiveCondition] = useState<any>({
        name: '',
        active: null,
        id: null,
        prescriptions: [],
    });

    const classNames = getClassNames();
    const { getSearchParam, addSearchParam, removeSearchParam } = useQueryStringParams();
    const showEdit = getSearchParam('mode') === 'edit';
    const showEditPanel = () => addSearchParam({ mode: 'edit' });
    const hideEditPanel = () => removeSearchParam('mode');
    const customWidth = usePanelWidth();

    const { data, loading } = useGetCareRecipientConditionsQuery();
    const { data: prescriptionData, loading: prescriptionLoading } = useGetPrescriptionsQuery();

    const [deleteCondition, { loading: deleteLoading, error: deleteError }] = useDeleteConditionOccurenceMutation({
        refetchQueries: ['GetCareRecipientTimeline'],
        errorPolicy: 'all',
        onCompleted: () => {
            navigate(RouterConfig.Conditions + '?status=deleted', { replace: true });
        },
        update: (cache, data) => {
            // Get the cached GetCareRecipientConditions
            const cachedGetConditionsQuery = cache.readQuery<GetCareRecipientConditionsQuery>({
                query: GetCareRecipientConditionsDocument,
            });

            // Update the cache for GetCareRecipientConditions
            cache.modify({
                id: cache.identify(cachedGetConditionsQuery.careRecipientConditions),
                fields: {
                    conditions(exisitingConditions, { readField }) {
                        const remainingConditions = exisitingConditions.filter(
                            (exisitingCondition) =>
                                readField('id', exisitingCondition) !== data.data.conditionOccurrenceDelete.result.id,
                        );
                        return remainingConditions;
                    },
                },
            });
        },
    });

    const filteredConditionList = data?.careRecipientConditions?.conditions.filter((condition) => condition.id === id);

    useEffect(() => {
        if (prescriptionData === undefined || filteredConditionList === undefined) return;
        const filteredCondition = filteredConditionList !== undefined ? filteredConditionList[0] : undefined;
        //check for presense of takenFor
        const filteredMedication = prescriptionData?.careRecipientMedicationPrescriptions?.prescriptions?.filter(
            (prescription) => prescription?.takenFor && prescription.takenFor.id === id,
        );

        if (filteredCondition === undefined) return;

        setActiveCondition({
            name: filteredCondition.condition.name,
            ...filteredCondition,
            prescriptions: filteredMedication?.length ? [...filteredMedication] : [],
        });

        setIsLoaded(true);
    }, [data, loading, prescriptionData, prescriptionLoading]);

    const handleDelete = async (event) => {
        event.preventDefault();
        await deleteCondition({ variables: { id: activeCondition.id } });
        toggleHideDeleteDialog();
    };

    const absoluteDatesAndRelativeTimeframes = isLoaded
        ? getTimeFrameText(activeCondition).absoluteDatesAndRelativeTimeframes
        : [];

    return (
        <>
            <SubHeaderLayout
                title={'Condition Detail'}
                actionButtonText={'Edit'}
                onClickActionButton={showEditPanel}
                onDelete={toggleHideDeleteDialog}
                deleteButtonDisabled={deleteLoading}
            >
                {loading || !isLoaded ? (
                    <Spinner />
                ) : (
                    <Stack className={classNames['wc-ConditionView--viewContainer']}>
                        <div>
                            <DeleteDialog
                                hidden={hideDeleteDialog}
                                toggleHideDialog={toggleHideDeleteDialog}
                                onDelete={handleDelete}
                                screen={PagesWithDelete.condition}
                            >
                                Delete
                            </DeleteDialog>
                            <FormErrorBar error={deleteError?.message} />
                        </div>

                        <Back />

                        <Stack className={classNames['wc-ConditionView--nameAndStatusContainer']}>
                            <Text
                                className={classNames['wc-ConditionView--conditionName']}
                                data-testid={'condition-name'}
                            >
                                {activeCondition.name}
                            </Text>
                            <Text
                                className={classNames['wc-ConditionView--activeStatus']}
                                data-testid={'conditon-status'}
                            >
                                {/* TODO: Still need to handle this, waiting for backend update from Katie */}
                                {getConditionActive(activeCondition) ? 'Active' : 'Not Active'}
                            </Text>
                        </Stack>

                        {isMobile && (
                            <div className={classNames['wc-ConditionView--actionButtons']}>
                                <ActionButtonRow onDelete={toggleHideDeleteDialog} hideSeparator />
                            </div>
                        )}
                        <DateDisplay datesAndTimeframes={absoluteDatesAndRelativeTimeframes} />

                        {activeCondition.prescriptions.length > 0 && (
                            <>
                                <Separator />
                                <Stack>
                                    <div className={classNames['wc-ConditionView--label']}>Medications</div>
                                    {activeCondition.prescriptions.map((prescription) => {
                                        return <MedicationListItem key={prescription.id} prescription={prescription} />;
                                    })}
                                </Stack>
                            </>
                        )}

                        <Panel
                            isOpen={showEdit}
                            isLightDismiss
                            hasCloseButton={false}
                            onDismiss={hideEditPanel}
                            data-testid="editPanel"
                            // Disabling navigation container to replace with header in form
                            onRenderNavigation={() => null}
                            onRenderHeader={() => null}
                            styles={PanelStyleOverrides}
                            type={PanelType.custom}
                            customWidth={customWidth}
                            allowTouchBodyScroll
                        >
                            <ConditionEdit onDismiss={hideEditPanel} condition={activeCondition} />
                        </Panel>
                    </Stack>
                )}
            </SubHeaderLayout>
        </>
    );
};

const DateDisplay = ({ datesAndTimeframes }) => {
    const classNames = getClassNames();

    return datesAndTimeframes.map((element) => (
        <>
            <Separator />
            <Stack
                key={Math.random()}
                tokens={{ childrenGap: 5 }}
                className={classNames['wc-ConditionView--timeframeContainer']}
                data-testid={'conditon-date'}
            >
                <Text className={classNames['wc-ConditionView--dateLabel']}>{element.labelText}</Text>
                <Text className={classNames['wc-ConditionView--dateText']} data-testid={'condition-date'}>
                    {element.yearsText}
                </Text>
            </Stack>
        </>
    ));
};

export default ConditionView;
