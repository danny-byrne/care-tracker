import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useBoolean } from '@fluentui/react-hooks';
import { useFeedbackService } from 'src/services/FeedbackService';
import { useQueryStringParams } from 'src/common/hooks/useQueryStringParams';
import {
    GetAllergiesDocument,
    GetAllergiesQuery,
    useGetAllergyQuery,
    useRemoveAllergyMutation,
} from 'src/graphQL/serverMocks/graphQLGeneratedCode';
import { useIsMobile } from 'src/common/hooks/useMediaQueries';
import { usePanelWidth } from 'src/common/hooks/usePanelWidth';

import { Panel, Stack, Text, PanelType } from '@fluentui/react';
import { Back, DeleteDialog, FormErrorBar } from 'src/common/components';
import { PagesWithDelete } from 'src/common/components/dialogs/DeleteDialog';
import RouterConfig from 'src/app/RouterConfig';
import SubHeaderLayout from 'src/common/components/Layout/SubHeaderLayout';
import ActionButtonRow from 'src/common/components/ActionButtonRow/ActionButtonRow';
import AllergyEdit from './AllergyEdit';

import { getClassNames } from './AllergyView.classNames';
import { PanelStyleOverrides } from 'src/common/components/Panel/PanelStyleOverrides';
import { Allergy } from 'src/types/Allergy';
import { capitalizeOnlyFirstLetter } from 'src/common/helpers/textFormatting';

const AllergyView = () => {
    const navigate = useNavigate();
    const classNames = getClassNames();
    const isMobile = useIsMobile();
    const { setErrorToast } = useFeedbackService();
    const { id } = useParams();

    const { data: allergyData, loading: immunizationLoading } = useGetAllergyQuery({
        variables: { id },
        onError: (err) => {
            setErrorToast(err.message);
        },
    });

    const [removeAllergy, { loading: deleteLoading, error: deleteError }] = useRemoveAllergyMutation({
        errorPolicy: 'all',
        onCompleted: () => {
            navigate(RouterConfig.Allergies + '?status=deleted', { replace: true });
        },
        update: (cache, data) => {
            // Get the cached GetAllergies
            const cachedGetAllergiesQuery = cache.readQuery<GetAllergiesQuery>({
                query: GetAllergiesDocument,
            });

            // Update the cache for GetAllergies
            cache.modify({
                id: cache.identify(cachedGetAllergiesQuery.careRecipientAllergies),
                fields: {
                    allergies(existingAllergies, { readField }) {
                        const remainingAllergies = existingAllergies.filter(
                            (exisitingAllergy) =>
                                readField('id', exisitingAllergy) !== data.data.allergyDelete.result.id,
                        );
                        return remainingAllergies;
                    },
                },
            });
        },
    });

    const handleDelete = (event) => {
        event.preventDefault();
        removeAllergy({ variables: { id: id } });
        toggleHideDeleteDialog();
    };

    const [activeAllergy, setActiveAllergy] = useState<Allergy>(undefined);
    const [name, setName] = useState(null);
    const [severity, setSeverity] = useState(null);

    useEffect(() => {
        const filteredAllergy =
            allergyData !== undefined ? allergyData?.careRecipientAllergies?.allergies[0] : undefined;
        setActiveAllergy(filteredAllergy);
    }, [allergyData, immunizationLoading]);

    useEffect(() => {
        if (activeAllergy === undefined) return;
        const severityFormatted = activeAllergy ? capitalizeOnlyFirstLetter(activeAllergy?.severity) : '';

        setName(activeAllergy?.allergen?.name);
        setSeverity(severityFormatted);
    }, [activeAllergy]);

    // TODO: Abstract this into edit panel specific hook
    const { getSearchParam, addSearchParam, removeSearchParam } = useQueryStringParams();

    const showEdit = getSearchParam('mode') === 'edit';
    const showEditPanel = () => addSearchParam({ mode: 'edit' });
    const hideEditPanel = () => removeSearchParam('mode');
    const customWidth = usePanelWidth();

    const [hideDeleteDialog, { toggle: toggleHideDeleteDialog }] = useBoolean(true);

    return (
        <>
            <SubHeaderLayout
                title={'Allergy Detail'}
                actionButtonText={'Edit'}
                onClickActionButton={showEditPanel}
                onDelete={toggleHideDeleteDialog}
                deleteButtonDisabled={deleteLoading}
            >
                {immunizationLoading ? (
                    <div>Loading...</div>
                ) : (
                    <Stack data-testid="allergyView">
                        <div>
                            <DeleteDialog
                                hidden={hideDeleteDialog}
                                toggleHideDialog={toggleHideDeleteDialog}
                                onDelete={handleDelete}
                                screen={PagesWithDelete.allergy}
                            >
                                Delete
                            </DeleteDialog>
                            <FormErrorBar error={deleteError?.message} />
                        </div>

                        <Back />

                        <Stack className={classNames['wc-AllergyView--infoContainer']} tokens={{ childrenGap: 4 }}>
                            <Text className={classNames['wc-AllergyView--name']} data-testid={'allergy-name'}>
                                {name}
                            </Text>
                        </Stack>

                        {isMobile && <ActionButtonRow onDelete={toggleHideDeleteDialog} />}
                        <Stack tokens={{ childrenGap: 4 }} className={classNames['wc-AllergyView--severityContainer']}>
                            <Text>Severity of Reaction</Text>
                            <Text className={classNames['wc-AllergyView--severity']} data-testid={'allergy-severity'}>
                                {severity}
                            </Text>
                        </Stack>

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
                            <AllergyEdit onDismiss={hideEditPanel} allergy={activeAllergy} />
                        </Panel>
                    </Stack>
                )}
            </SubHeaderLayout>
        </>
    );
};

export default AllergyView;
