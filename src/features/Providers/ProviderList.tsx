import React, { useEffect, useState } from 'react';
import { useIsMobile } from 'src/common/hooks/useMediaQueries';
import { useAddPanelControls } from 'src/common/hooks/useAddPanel';
import { useQueryStringParams } from 'src/common/hooks/useQueryStringParams';

import { Stack } from '@fluentui/react';
import SubHeaderLayout from 'src/common/components/Layout/SubHeaderLayout';
import ProviderAdd from './ProviderAdd';
import { AddPanel } from 'src/common/components/Panel/AddPanel';

import { getClassNames as getFABClassNames } from 'src/common/components/FAB/FloatingActionButton.classNames';
import { useLocation, useNavigate } from 'react-router';
import { RecordStatus, useGetProvidersQuery } from 'src/graphQL/serverMocks/graphQLGeneratedCode';
import { useFeedbackService } from 'src/services/FeedbackService';
import { ERROR_MESSAGES } from 'src/app/Strings';
import RouterConfig from 'src/app/RouterConfig';
import { FloatingActionButton } from 'src/common/components';
import ProviderListItem from './ProviderListItem';

interface IProviderListProps {}

interface ProviderLocationState {
    mode: string;
}

const ProviderList: React.FC<IProviderListProps> = () => {
    const fabClassNames = getFABClassNames(false);

    const navigate = useNavigate();
    const { setErrorToast, setSuccessToast } = useFeedbackService();
    const isMobile = useIsMobile();

    const { getSearchParam, removeSearchParam } = useQueryStringParams();
    const status = getSearchParam('status');

    const location = useLocation();
    const state = location.state as ProviderLocationState;

    const { showAddPanel, hideAddPanel, showAdd } = useAddPanelControls();
    const [providerAdded, setProviderAdded] = useState(false);
    const [activeProviderList, setActiveProviderList] = useState([]);

    const { data, loading } = useGetProvidersQuery({
        onError: () => {
            setErrorToast(ERROR_MESSAGES.GET_PROVIDERS);
        },
    });

    useEffect(() => {
        if (status === 'added' || status === 'deleted') {
            removeSearchParam('status');
            setSuccessToast(`Provider ${status}`);
        }
        if (status === 'added') {
            setProviderAdded(true);
        }
    }, [status]);

    useEffect(() => {
        if (state?.mode === 'add') {
            showAddPanel();
        }
    }, []);

    useEffect(() => {
        setActiveProviderList(
            data?.careRecipientProviders?.providers?.filter((provider) => provider.recordStatus == RecordStatus.Active),
        );
    }, [data]);

    // Navigate back to care plan if the list is empty and an entity hasn't just been added
    useEffect(() => {
        const activeProviders = data?.careRecipientProviders?.providers?.filter(
            (provider) => provider.recordStatus == RecordStatus.Active,
        ).length;
        const emptyListWithoutAddModal =
            !loading &&
            state?.mode !== 'add' &&
            !showAdd &&
            activeProviders === 0 &&
            status !== 'added' &&
            !providerAdded;

        // If only 0 active entity remains, user has deleted last entity
        const emptyListAfterDelete = status === 'deleted' && activeProviders === 0;

        if (emptyListWithoutAddModal || emptyListAfterDelete) {
            navigate(RouterConfig.CarePlan);
        }
    }, [loading, state, showAdd, status, providerAdded, activeProviderList, data]);

    const onClickActionButton = isMobile ? undefined : showAddPanel;

    return (
        <SubHeaderLayout title={'Providers'} actionButtonText={'Add'} onClickActionButton={onClickActionButton}>
            {data && (
                <Stack>
                    {activeProviderList?.map((provider) => {
                        const providerFullName = `${provider.firstName} ${provider.lastName}`;

                        return (
                            <ProviderListItem
                                name={providerFullName}
                                phoneNumber={provider.phoneNumber}
                                id={provider.id}
                                key={provider.id}
                                specialty={provider.primarySpecialty}
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
                <ProviderAdd onDismiss={hideAddPanel} />
            </AddPanel>
        </SubHeaderLayout>
    );
};

export default ProviderList;
