import React, { useEffect, useState } from 'react';
import { useIsMobile } from 'src/common/hooks/useMediaQueries';
import { useAddPanelControls } from 'src/common/hooks/useAddPanel';
import { useQueryStringParams } from 'src/common/hooks/useQueryStringParams';

import { Stack } from '@fluentui/react';
import SubHeaderLayout from 'src/common/components/Layout/SubHeaderLayout';
import PharmacyAdd from './PharmacyAdd';
import { AddPanel } from 'src/common/components/Panel/AddPanel';

import { getClassNames as getFABClassNames } from 'src/common/components/FAB/FloatingActionButton.classNames';
import { useLocation, useNavigate } from 'react-router';
import { RecordStatus, useGetPharmaciesQuery } from 'src/graphQL/serverMocks/graphQLGeneratedCode';
import { useFeedbackService } from 'src/services/FeedbackService';
import { ERROR_MESSAGES } from 'src/app/Strings';
import RouterConfig from 'src/app/RouterConfig';
import { FloatingActionButton } from 'src/common/components';
import PharmacyListItem from './PharmacyListItem';
import { formatPhoneNumber } from 'src/utils/utils';

interface IPharmacyListProps {}

interface PharmacyLocationState {
    mode: string;
}

const PharmacyList: React.FC<IPharmacyListProps> = () => {
    const fabClassNames = getFABClassNames(false);

    const navigate = useNavigate();
    const { setErrorToast, setSuccessToast } = useFeedbackService();
    const isMobile = useIsMobile();

    const { getSearchParam, removeSearchParam } = useQueryStringParams();
    const status = getSearchParam('status');

    const location = useLocation();
    const state = location.state as PharmacyLocationState;

    const { showAddPanel, hideAddPanel, showAdd } = useAddPanelControls();
    const [pharmacyAdded, setPharmacyAdded] = useState(false);
    const [activePharmacyList, setActivePharmacyList] = useState([]);

    const { data, loading } = useGetPharmaciesQuery({
        onError: () => {
            setErrorToast(ERROR_MESSAGES.GET_PHARMACIES);
        },
    });

    useEffect(() => {
        if (status === 'added' || status === 'deleted') {
            removeSearchParam('status');
            setSuccessToast(`Pharmacy ${status}`);
        }
        if (status === 'added') {
            setPharmacyAdded(true);
        }
    }, [status]);

    useEffect(() => {
        if (state?.mode === 'add') {
            showAddPanel();
        }
    }, []);

    useEffect(() => {
        setActivePharmacyList(
            data?.careRecipientPharmacies?.pharmacies?.filter(
                (pharmacy) => pharmacy.recordStatus == RecordStatus.Active,
            ),
        );
    }, [data]);

    // Navigate back to care plan if the list is empty and an entity hasn't just been added
    useEffect(() => {
        const activePharmacies = data?.careRecipientPharmacies?.pharmacies?.filter(
            (pharmacy) => pharmacy.recordStatus == RecordStatus.Active,
        ).length;
        const emptyListWithoutAddModal =
            !loading &&
            state?.mode !== 'add' &&
            !showAdd &&
            activePharmacies === 0 &&
            status !== 'added' &&
            !pharmacyAdded;

        // If only 0 active entity remains, user has deleted last entity
        const emptyListAfterDelete = status === 'deleted' && activePharmacies === 0;

        if (emptyListWithoutAddModal || emptyListAfterDelete) {
            navigate(RouterConfig.CarePlan);
        }
    }, [loading, state, showAdd, status, pharmacyAdded, activePharmacyList, data]);

    const onClickActionButton = isMobile ? undefined : showAddPanel;

    return (
        <SubHeaderLayout title={'Pharmacies'} actionButtonText={'Add'} onClickActionButton={onClickActionButton}>
            {data && (
                <Stack>
                    {activePharmacyList?.map((pharmacy) => {
                        const formattedPhoneNumber = formatPhoneNumber(pharmacy.phoneNumber);
                        return (
                            <PharmacyListItem
                                name={pharmacy.name}
                                phoneNumber={formattedPhoneNumber}
                                id={pharmacy.id}
                                key={pharmacy.id}
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
                <PharmacyAdd onDismiss={hideAddPanel} />
            </AddPanel>
        </SubHeaderLayout>
    );
};

export default PharmacyList;
