import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useBoolean } from '@fluentui/react-hooks';
import { useFeedbackService } from 'src/services/FeedbackService';
import { useQueryStringParams } from 'src/common/hooks/useQueryStringParams';
import {
    GetImmunizationsDocument,
    GetImmunizationsQuery,
    useGetImmunizationQuery,
    useRemoveImmunizationMutation,
} from 'src/graphQL/serverMocks/graphQLGeneratedCode';
import { useIsMobile } from 'src/common/hooks/useMediaQueries';
import { usePanelWidth } from 'src/common/hooks/usePanelWidth';

import { Panel, Stack, Text, PanelType } from '@fluentui/react';
import { Back, DeleteDialog, FormErrorBar } from 'src/common/components';
import { PagesWithDelete } from 'src/common/components/dialogs/DeleteDialog';
import RouterConfig from 'src/app/RouterConfig';
import SubHeaderLayout from 'src/common/components/Layout/SubHeaderLayout';
import ActionButtonRow from 'src/common/components/ActionButtonRow/ActionButtonRow';
import ImmunizationEdit from './ImmunizationEdit';

import { getClassNames } from './ImmunizationView.classNames';
import { PanelStyleOverrides } from 'src/common/components/Panel/PanelStyleOverrides';
import { Immunization } from 'src/types/Immunization';
import { useImmunizationDateText } from 'src/common/hooks/useImmunizationDateText';

const ImmunizationView = () => {
    const navigate = useNavigate();
    const classNames = getClassNames();
    const isMobile = useIsMobile();
    const { setErrorToast } = useFeedbackService();
    const { id } = useParams();

    const { data: immunizationData, loading: immunizationLoading } = useGetImmunizationQuery({
        variables: { id },
        onError: (err) => {
            setErrorToast(err.message);
        },
    });

    const [removeImmunization, { loading: deleteLoading, error: deleteError }] = useRemoveImmunizationMutation({
        refetchQueries: ['GetCareRecipientTimeline'],
        errorPolicy: 'all',
        onCompleted: () => {
            navigate(RouterConfig.Immunizations + '?status=deleted', { replace: true });
        },
        update: (cache, data) => {
            // Get the cached GetImmunizations
            const cachedGetGetImmunizationsQuery = cache.readQuery<GetImmunizationsQuery>({
                query: GetImmunizationsDocument,
            });

            // Update the cache for GetImmunizations
            cache.modify({
                id: cache.identify(cachedGetGetImmunizationsQuery.careRecipientImmunizations),
                fields: {
                    immunizations(exisitingImmunizations, { readField }) {
                        const remainingImmunizations = exisitingImmunizations.filter(
                            (exisitingImmunization) =>
                                readField('id', exisitingImmunization) !== data.data.immunizationDelete.result.id,
                        );
                        return remainingImmunizations;
                    },
                },
            });
        },
    });

    const handleDelete = async (event) => {
        event.preventDefault();
        await removeImmunization({ variables: { id: id } });
        toggleHideDeleteDialog();
    };

    const [activeImmunization, setActiveImmunization] = useState<Immunization>(undefined);
    const [name, setName] = useState(null);

    useEffect(() => {
        const filteredImmunization =
            immunizationData !== undefined ? immunizationData?.careRecipientImmunizations.immunizations[0] : undefined;
        setActiveImmunization(filteredImmunization);
    }, [immunizationData, immunizationLoading]);

    useEffect(() => {
        setName(activeImmunization?.vaccineProductAdministered?.name);
    }, [activeImmunization]);

    // TODO: Abstract this into edit panel specific hook
    const { getSearchParam, addSearchParam, removeSearchParam } = useQueryStringParams();

    const showEdit = getSearchParam('mode') === 'edit';
    const showEditPanel = () => addSearchParam({ mode: 'edit' });
    const hideEditPanel = () => removeSearchParam('mode');
    const customWidth = usePanelWidth();

    const [hideDeleteDialog, { toggle: toggleHideDeleteDialog }] = useBoolean(true);

    const { dateText, timeframeText } = useImmunizationDateText(activeImmunization);

    return (
        <>
            <SubHeaderLayout
                title={'Immunization Detail'}
                actionButtonText={'Edit'}
                onClickActionButton={showEditPanel}
                onDelete={toggleHideDeleteDialog}
                deleteButtonDisabled={deleteLoading}
            >
                {immunizationLoading ? (
                    <div>Loading...</div>
                ) : (
                    <Stack data-testid="immunizationView">
                        <div>
                            <DeleteDialog
                                hidden={hideDeleteDialog}
                                toggleHideDialog={toggleHideDeleteDialog}
                                onDelete={handleDelete}
                                screen={PagesWithDelete.immunization}
                            >
                                Delete
                            </DeleteDialog>
                            <FormErrorBar error={deleteError?.message} />
                        </div>

                        <Back />

                        <Stack className={classNames['wc-ImmunizationView--infoContainer']} tokens={{ childrenGap: 4 }}>
                            <Text className={classNames['wc-ImmunizationView--name']} data-testid={'immunization-name'}>
                                {name}
                            </Text>
                        </Stack>

                        {isMobile && <ActionButtonRow onDelete={toggleHideDeleteDialog} />}
                        {dateText && (
                            <Stack
                                tokens={{ childrenGap: 4 }}
                                className={classNames['wc-ImmunizationView--dateContainer']}
                            >
                                <Text>Date</Text>
                                <Text
                                    className={classNames['wc-ImmunizationView--dateText']}
                                    data-testid={'immunization-date'}
                                >
                                    {dateText}
                                </Text>
                            </Stack>
                        )}
                        {timeframeText && (
                            <Stack
                                tokens={{ childrenGap: 4 }}
                                className={classNames['wc-ImmunizationView--dateContainer']}
                            >
                                <Text>Timeframe</Text>
                                <Text
                                    className={classNames['wc-ImmunizationView--dateText']}
                                    data-testid={'immunization-timeframe'}
                                >
                                    {timeframeText}
                                </Text>
                            </Stack>
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
                            <ImmunizationEdit onDismiss={hideEditPanel} immunization={activeImmunization} />
                        </Panel>
                    </Stack>
                )}
            </SubHeaderLayout>
        </>
    );
};

export default ImmunizationView;
