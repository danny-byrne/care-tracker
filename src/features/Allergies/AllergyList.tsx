import React, { useEffect, useState } from 'react';
import { useIsMobile } from 'src/common/hooks/useMediaQueries';
import { useAddPanelControls } from 'src/common/hooks/useAddPanel';
import { useQueryStringParams } from 'src/common/hooks/useQueryStringParams';

import { Stack } from '@fluentui/react';
import SubHeaderLayout from 'src/common/components/Layout/SubHeaderLayout';
import AllergyAdd from './AllergyAdd';
import { AddPanel } from 'src/common/components/Panel/AddPanel';

import { getClassNames as getFABClassNames } from 'src/common/components/FAB/FloatingActionButton.classNames';
import { useLocation, useNavigate } from 'react-router';
import { AllergySeverity, RecordStatus, useGetAllergiesQuery } from 'src/graphQL/serverMocks/graphQLGeneratedCode';
import { useFeedbackService } from 'src/services/FeedbackService';
import { ERROR_MESSAGES } from 'src/app/Strings';
import RouterConfig from 'src/app/RouterConfig';
import { FloatingActionButton } from 'src/common/components';
import AllergyListItem from './AllergyListItem';
import { Allergy } from 'src/types/Allergy';

interface AllergyLocationState {
    mode: string;
}

const severitySortOrder = [AllergySeverity.Severe, AllergySeverity.Mild, AllergySeverity.Unknown];

const AllergyList: React.FC = () => {
    const fabClassNames = getFABClassNames(false);

    const navigate = useNavigate();
    const { setErrorToast, setSuccessToast } = useFeedbackService();
    const isMobile = useIsMobile();

    const { getSearchParam, removeSearchParam } = useQueryStringParams();
    const status = getSearchParam('status');

    const location = useLocation();
    const state = location.state as AllergyLocationState;

    const { showAddPanel, hideAddPanel, showAdd } = useAddPanelControls();
    const [allergyAdded, setAllergyAdded] = useState(false);
    const [activeAllergyList, setActiveAllergyList] = useState<Allergy[]>([]);

    const { data, loading } = useGetAllergiesQuery({
        onError: () => {
            setErrorToast(ERROR_MESSAGES.GET_ALLERGIES);
        },
    });

    useEffect(() => {
        if (status === 'added' || status === 'deleted') {
            removeSearchParam('status');
            setSuccessToast(`Allergy ${status}`);
        }
        if (status === 'added') {
            setAllergyAdded(true);
        }
    }, [status]);

    useEffect(() => {
        if (state?.mode === 'add') {
            showAddPanel();
        }
    }, []);

    // Navigate back to care plan if the list is empty and an entity hasn't just been added
    useEffect(() => {
        const activeAllergies = data?.careRecipientAllergies?.allergies.filter(
            (allergy) => allergy.recordStatus == RecordStatus.Active,
        ).length;
        const emptyListWithoutAddModal =
            !loading &&
            state?.mode !== 'add' &&
            !showAdd &&
            activeAllergies === 0 &&
            status !== 'added' &&
            !allergyAdded;

        // If only 0 active entity remains, user has deleted last entity
        const emptyListAfterDelete = status === 'deleted' && activeAllergies === 0;

        if (emptyListWithoutAddModal || emptyListAfterDelete) {
            navigate(RouterConfig.CarePlan);
        }
    }, [loading, state, showAdd, status, allergyAdded, data]);

    useEffect(() => {
        const activeAllergies = data?.careRecipientAllergies?.allergies
            ?.filter((allergy) => allergy.recordStatus == RecordStatus.Active)
            .sort((a, b) => {
                // Sort by severity and name
                if (a.severity !== b.severity) {
                    return severitySortOrder.indexOf(a.severity) - severitySortOrder.indexOf(b.severity);
                } else {
                    return a.allergen?.name.localeCompare(b.allergen?.name);
                }
            });

        setActiveAllergyList(activeAllergies);
    }, [data]);

    const onClickActionButton = isMobile ? undefined : showAddPanel;

    return (
        <SubHeaderLayout title={'Allergies'} actionButtonText={'Add'} onClickActionButton={onClickActionButton}>
            {data && (
                <Stack>
                    {activeAllergyList?.map((allergy) => {
                        return (
                            <AllergyListItem
                                name={allergy.allergen.name}
                                id={allergy.id}
                                key={allergy.id}
                                severity={allergy.severity}
                            />
                        );
                    })}
                </Stack>
            )}
            {isMobile && (
                <Stack className={fabClassNames['wc-FloatingActionButton--fabContainer']}>
                    <FloatingActionButton onClick={showAddPanel} />
                </Stack>
            )}
            <AddPanel>
                <AllergyAdd onDismiss={hideAddPanel} />
            </AddPanel>
        </SubHeaderLayout>
    );
};

export default AllergyList;
