import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useBoolean } from '@fluentui/react-hooks';
import { useFeedbackService } from 'src/services/FeedbackService';
import { useQueryStringParams } from 'src/common/hooks/useQueryStringParams';
import {
    GetProvidersDocument,
    RecordStatus,
    useGetPrescriptionsQuery,
    useGetProviderQuery,
    useRemoveProviderMutation,
} from 'src/graphQL/serverMocks/graphQLGeneratedCode';
import { useIsMobile } from 'src/common/hooks/useMediaQueries';
import { usePanelWidth } from 'src/common/hooks/usePanelWidth';

import { Panel, Stack, Text, PanelType, Separator } from '@fluentui/react';
import { Back, DeleteDialog, FormErrorBar } from 'src/common/components';
import { PagesWithDelete } from 'src/common/components/dialogs/DeleteDialog';
import RouterConfig from 'src/app/RouterConfig';
import SubHeaderLayout from 'src/common/components/Layout/SubHeaderLayout';
import ActionButtonRow from 'src/common/components/ActionButtonRow/ActionButtonRow';
import ProviderEdit from './ProviderEdit';

import { getClassNames } from './ProviderView.classNames';
import { PanelStyleOverrides } from 'src/common/components/Panel/PanelStyleOverrides';
import { Provider } from 'src/types/Provider';

import { Prescription } from 'src/types/Medication';
import MedicationListItem from '../Medications/MedicationListItem';
import { GetProvidersQuery } from 'src/graphQL/serverMocks/graphQLGeneratedCode';
import { formatPhoneNumber } from 'src/utils/utils';

import { Phone } from 'src/assets/Misc/Phone';
import { Location } from 'src/assets/Misc/Location';
import ReusableCardList from 'src/common/components/ReusableCardList/ReusableCardList';
import { useGetBingAddressUri } from 'src/common/hooks/useGetBingAddressUri';

const ProviderView = () => {
    const navigate = useNavigate();
    const classNames = getClassNames();
    const isMobile = useIsMobile();
    const { setErrorToast } = useFeedbackService();
    const { id } = useParams();

    const { data: providerData, loading: providerLoading } = useGetProviderQuery({
        variables: { id },
        onError: (err) => {
            setErrorToast(err.message);
        },
    });

    const { data: medicationData, loading: medicationLoading } = useGetPrescriptionsQuery({
        fetchPolicy: 'cache-and-network',
        onError: (err) => {
            setErrorToast(err.message);
        },
    });

    const filteredPrescriptions = medicationData?.careRecipientMedicationPrescriptions.prescriptions.filter(
        (prescription) => {
            return prescription?.prescribingProvider?.id === id;
        },
    );

    const [providerPrescriptions, setProviderPrescriptions] = useState<Prescription[]>([]);

    useEffect(() => {
        if (filteredPrescriptions?.length > 0) {
            setProviderPrescriptions(filteredPrescriptions);
        }
    }, [medicationData]);

    const [removeProvider, { loading: deleteLoading, error: deleteError }] = useRemoveProviderMutation({
        awaitRefetchQueries: true,
        errorPolicy: 'all',
        onCompleted: () => {
            navigate(RouterConfig.Providers + '?status=deleted', { replace: true });
        },
        update: (cache, data) => {
            // Get the cached GetProvidersQuery
            const cachedGetProvidersQuery = cache.readQuery<GetProvidersQuery>({ query: GetProvidersDocument });

            // Update the cache for GetProviders
            cache.modify({
                id: cache.identify(cachedGetProvidersQuery.careRecipientProviders),
                fields: {
                    providers(exisitingProviders, { readField }) {
                        const remainingProviders = exisitingProviders.filter(
                            (exisitingProvider) =>
                                readField('id', exisitingProvider) !== data.data.providerDelete.result.id,
                        );
                        return remainingProviders;
                    },
                },
            });
        },
    });

    const handleDelete = async (event) => {
        event.preventDefault();
        await removeProvider({ variables: { id: id } });
        toggleHideDeleteDialog();
    };

    const [activeProvider, setActiveProvider] = useState<Provider>(undefined);
    const [name, setName] = useState(null);
    const [specialty, setSpecialty] = useState(null);

    useEffect(() => {
        const filteredProvider =
            providerData !== undefined ? providerData?.careRecipientProviders.providers[0] : undefined;
        setActiveProvider(filteredProvider);
    }, [providerData, providerLoading]);

    useEffect(() => {
        if (activeProvider === undefined) return;
        setName(`${activeProvider?.firstName} ${activeProvider?.lastName}`);
        setSpecialty(activeProvider?.primarySpecialty);
    }, [activeProvider]);

    // TODO: Abstract this into edit panel specific hook
    const { getSearchParam, addSearchParam, removeSearchParam } = useQueryStringParams();

    const showEdit = getSearchParam('mode') === 'edit';
    const showEditPanel = () => addSearchParam({ mode: 'edit' });
    const hideEditPanel = () => removeSearchParam('mode');
    const customWidth = usePanelWidth();

    const [hideDeleteDialog, { toggle: toggleHideDeleteDialog }] = useBoolean(true);

    const MedicationCards = () => {
        return (
            <>
                <Separator className={classNames['wc-ProviderView--separator']} />
                <Stack tokens={{ childrenGap: 4 }}>
                    <Text className={classNames['wc-ProviderView--medicationsTitle']}>Medications</Text>
                    {providerPrescriptions.map((prescription) => {
                        const conditionText =
                            prescription.takenFor?.recordStatus == RecordStatus.Active
                                ? prescription.takenFor?.condition?.name
                                : undefined;
                        return (
                            <MedicationListItem
                                key={prescription.id}
                                name={prescription.medication?.name}
                                strength={prescription.strengthValue}
                                conditionText={conditionText}
                                onClick={() => {
                                    navigate(RouterConfig.Medication(prescription.id));
                                }}
                            />
                        );
                    })}
                </Stack>
            </>
        );
    };

    // TODO: Abstract all of this into a custom hook (also in MedicationView)
    const providerFormattedPhoneNumber = formatPhoneNumber(activeProvider?.phoneNumber);
    const providerPhoneNumberCard = activeProvider?.phoneNumber
        ? {
              clickableContent: (
                  <Stack horizontal tokens={{ childrenGap: 10 }}>
                      <Phone />
                      <a
                          href={`tel:${activeProvider?.phoneNumber}`}
                          className={classNames['wc-ProviderView--clickableLinkText']}
                          data-testid={'provider-phone'}
                      >
                          {providerFormattedPhoneNumber}
                      </a>
                  </Stack>
              ),
          }
        : null;

    const providerAddress = activeProvider?.address?.singleLineAddress ?? null;

    const { mapsUri } = useGetBingAddressUri(providerAddress);

    const providerAddressCard = providerAddress
        ? {
              clickableContent: (
                  <Stack horizontal tokens={{ childrenGap: 10 }}>
                      <Location />
                      <a
                          href={mapsUri}
                          className={classNames['wc-ProviderView--clickableLinkText']}
                          target="_blank"
                          rel="noreferrer"
                          data-testid={'provider-address'}
                      >
                          {providerAddress}
                      </a>
                  </Stack>
              ),
          }
        : null;

    const providerCardsList = [providerPhoneNumberCard, providerAddressCard].filter((e) => e !== null);

    return (
        <>
            <SubHeaderLayout
                title={'Provider Detail'}
                actionButtonText={'Edit'}
                onClickActionButton={showEditPanel}
                onDelete={toggleHideDeleteDialog}
                deleteButtonDisabled={deleteLoading}
            >
                {providerLoading || medicationLoading ? (
                    <div>Loading...</div>
                ) : (
                    <Stack data-testid="providerView">
                        <div>
                            <DeleteDialog
                                hidden={hideDeleteDialog}
                                toggleHideDialog={toggleHideDeleteDialog}
                                onDelete={handleDelete}
                                screen={PagesWithDelete.provider}
                            >
                                Delete
                            </DeleteDialog>
                            <FormErrorBar error={deleteError?.message} />
                        </div>

                        <Back />

                        <Stack className={classNames['wc-ProviderView--infoContainer']} tokens={{ childrenGap: 4 }}>
                            <Text className={classNames['wc-ProviderView--name']} data-testid={'provider-name'}>
                                {name}
                            </Text>
                            {specialty && <Text>{specialty}</Text>}
                        </Stack>

                        {isMobile && <ActionButtonRow onDelete={toggleHideDeleteDialog} />}
                        <ReusableCardList buttonPropsList={providerCardsList} data-testid="provider-details" />

                        {providerPrescriptions.length > 0 && <MedicationCards />}

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
                            <ProviderEdit onDismiss={hideEditPanel} provider={activeProvider} />
                        </Panel>
                    </Stack>
                )}
            </SubHeaderLayout>
        </>
    );
};

export default ProviderView;
