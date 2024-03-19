import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useBoolean } from '@fluentui/react-hooks';
import { Panel, Stack, Text, PanelType, Separator } from '@fluentui/react';

import { useFeedbackService } from 'src/services/FeedbackService';
import { useQueryStringParams } from 'src/common/hooks/useQueryStringParams';
import { useGetBingAddressUri } from 'src/common/hooks/useGetBingAddressUri';
import {
    GetPharmaciesDocument,
    GetPharmaciesQuery,
    useGetPharmacyQuery,
    useGetPrescriptionsQuery,
    useRemovePharmacyMutation,
    RecordStatus,
} from 'src/graphQL/serverMocks/graphQLGeneratedCode';
import { useIsMobile } from 'src/common/hooks/useMediaQueries';
import { usePanelWidth } from 'src/common/hooks/usePanelWidth';
import { Back, DeleteDialog, FormErrorBar } from 'src/common/components';
import { PagesWithDelete } from 'src/common/components/dialogs/DeleteDialog';
import RouterConfig from 'src/app/RouterConfig';
import SubHeaderLayout from 'src/common/components/Layout/SubHeaderLayout';
import ActionButtonRow from 'src/common/components/ActionButtonRow/ActionButtonRow';
import PharmacyEdit from './PharmacyEdit';

import { getClassNames } from './PharmacyView.classNames';
import { PanelStyleOverrides } from 'src/common/components/Panel/PanelStyleOverrides';

import { Prescription } from 'src/types/Medication';
import MedicationListItem from '../Medications/MedicationListItem';
import { Pharmacy } from 'src/types/Pharmacy';
import { formatPhoneNumber } from 'src/utils/utils';

const PharmacyView = () => {
    const navigate = useNavigate();
    const classNames = getClassNames();
    const isMobile = useIsMobile();
    const { setErrorToast } = useFeedbackService();
    const { id } = useParams();

    const { data: pharmacyData, loading: pharmacyLoading } = useGetPharmacyQuery({
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
            const filteredRefills = prescription.refills?.filter((refill) => {
                return refill.recordStatus == RecordStatus.Active && refill.pharmacy?.id === id;
            });

            return filteredRefills.length > 0;
        },
    );

    const [pharmacyPrescriptions, setPharmacyPrescriptions] = useState<Prescription[]>([]);

    useEffect(() => {
        if (filteredPrescriptions?.length > 0) {
            setPharmacyPrescriptions(filteredPrescriptions);
        }
    }, [filteredPrescriptions]);

    const [removePharmacy, { loading: deleteLoading, error: deleteError }] = useRemovePharmacyMutation({
        awaitRefetchQueries: true,
        errorPolicy: 'all',
        onCompleted: () => {
            navigate(RouterConfig.Pharmacies + '?status=deleted', { replace: true });
        },
        update: (cache, data) => {
            // Get the cached GetPharmacies
            const cachedGetPharmaciesQuery = cache.readQuery<GetPharmaciesQuery>({ query: GetPharmaciesDocument });

            // Update the cache for GetPharmacies
            cache.modify({
                id: cache.identify(cachedGetPharmaciesQuery.careRecipientPharmacies),
                fields: {
                    pharmacies(existingPharmacies, { readField }) {
                        const remainingPharmacies = existingPharmacies.filter(
                            (existingPharmacy) =>
                                readField('id', existingPharmacy) !== data.data.pharmacyDelete.result.id,
                        );
                        return remainingPharmacies;
                    },
                },
            });
        },
    });

    const handleDelete = async (event) => {
        event.preventDefault();
        await removePharmacy({ variables: { id: id } });
        toggleHideDeleteDialog();
    };

    const [activePharmacy, setActivePharmacy] = useState<Pharmacy>(undefined);
    const [name, setName] = useState(null);
    const [phoneNumber, setPhoneNumber] = useState(null);
    const [address, setAddress] = useState(null);

    const formattedPhoneNumber = phoneNumber ? formatPhoneNumber(phoneNumber) : null;

    useEffect(() => {
        const filteredPharmacy =
            pharmacyData !== undefined ? pharmacyData?.careRecipientPharmacies.pharmacies[0] : undefined;
        setActivePharmacy(filteredPharmacy);
    }, [pharmacyData, pharmacyLoading]);

    useEffect(() => {
        if (activePharmacy === undefined) return;
        setName(activePharmacy?.name);
        setPhoneNumber(activePharmacy?.phoneNumber);
        setAddress(activePharmacy?.location?.singleLineAddress);
    }, [activePharmacy]);

    // // TODO: Abstract this into edit panel specific hook
    const { getSearchParam, addSearchParam, removeSearchParam } = useQueryStringParams();

    const showEdit = getSearchParam('mode') === 'edit';
    const showEditPanel = () => addSearchParam({ mode: 'edit' });
    const hideEditPanel = () => removeSearchParam('mode');
    const customWidth = usePanelWidth();

    const [hideDeleteDialog, { toggle: toggleHideDeleteDialog }] = useBoolean(true);

    const MedicationCards = () => {
        return (
            <>
                <Separator className={classNames['wc-PharmacyView--separator']} />
                <Stack tokens={{ childrenGap: 4 }}>
                    <Text className={classNames['wc-PharmacyView--medicationsTitle']}>Medications</Text>
                    {pharmacyPrescriptions.map((prescription) => {
                        return (
                            // TODO: Refactor MedicationListItems into different
                            <MedicationListItem
                                key={prescription.id}
                                name={prescription.medication?.name}
                                strength={prescription.strengthValue}
                                refillDateText="Next refill"
                                onClick={() => {
                                    navigate(RouterConfig.Medication(prescription.id));
                                }}
                                hideRefillButtons
                                refills={prescription.refills}
                            />
                        );
                    })}
                </Stack>
            </>
        );
    };

    const { mapsUri } = useGetBingAddressUri(address);

    return (
        <>
            <SubHeaderLayout
                title={'Pharmacy Detail'}
                actionButtonText={'Edit'}
                onClickActionButton={showEditPanel}
                onDelete={toggleHideDeleteDialog}
                deleteButtonDisabled={deleteLoading}
            >
                {pharmacyLoading || medicationLoading ? (
                    <div>Loading...</div>
                ) : (
                    <Stack data-testid="pharmacyView">
                        <div>
                            <DeleteDialog
                                hidden={hideDeleteDialog}
                                toggleHideDialog={toggleHideDeleteDialog}
                                onDelete={handleDelete}
                                screen={PagesWithDelete.pharmacy}
                            >
                                Delete
                            </DeleteDialog>
                            <FormErrorBar error={deleteError?.message} />
                        </div>

                        <Back />

                        <Stack className={classNames['wc-PharmacyView--infoContainer']} tokens={{ childrenGap: 4 }}>
                            <Text className={classNames['wc-PharmacyView--name']} data-testid={'pharmacy-name'}>
                                {name}
                            </Text>
                            <a
                                href={`tel: ${phoneNumber}`}
                                className={classNames['wc-PharmacyView--phoneNumber']}
                                data-testid={'pharmacy-phone'}
                            >
                                {formattedPhoneNumber}
                            </a>
                        </Stack>

                        {isMobile && <ActionButtonRow onDelete={toggleHideDeleteDialog} />}
                        {address && (
                            <Stack
                                tokens={{ childrenGap: 4 }}
                                className={classNames['wc-PharmacyView--addressContainer']}
                            >
                                <Text>Address</Text>
                                <a href={mapsUri} target="_blank" rel="noreferrer">
                                    <Text
                                        className={classNames['wc-PharmacyView--address']}
                                        data-testid={'pharmacy-address'}
                                    >
                                        {address}
                                    </Text>
                                </a>

                                <Text className={classNames['wc-PharmacyView--bingLabel']}>Powered by Bing</Text>
                            </Stack>
                        )}

                        {pharmacyPrescriptions.length > 0 && <MedicationCards />}

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
                            <PharmacyEdit onDismiss={hideEditPanel} pharmacy={activePharmacy} />
                        </Panel>
                    </Stack>
                )}
            </SubHeaderLayout>
        </>
    );
};

export default PharmacyView;
