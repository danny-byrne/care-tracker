import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useBoolean } from '@fluentui/react-hooks';
import { useFeedbackService } from 'src/services/FeedbackService';
import { useQueryStringParams } from 'src/common/hooks/useQueryStringParams';
import {
    useGetMedicationQuery,
    useDeleteMedicationMutation,
    RecordStatus,
} from 'src/graphQL/serverMocks/graphQLGeneratedCode';
import { useIsMobile } from 'src/common/hooks/useMediaQueries';

import { Panel, Stack, Text, PanelType, Image } from '@fluentui/react';
import { Back, DeleteDialog } from 'src/common/components';
import MedicationEdit from './MedicationEdit';
import SubHeaderLayout from 'src/common/components/Layout/SubHeaderLayout';
import ActionButtonRow from 'src/common/components/ActionButtonRow/ActionButtonRow';

import { Prescription } from 'src/types/Medication';

import { getClassNames } from './MedicationView.classNames';

import { PanelStyleOverrides } from 'src/common/components/Panel/PanelStyleOverrides';

import defaultMedication from 'src/assets/MedicationPage/defaultMedication.jpg';

import { usePanelWidth } from 'src/common/hooks/usePanelWidth';
import EndMedicationDialog, { PagesWithDelete } from 'src/common/components/dialogs/EndMedicationDialog';
import RouterConfig from 'src/app/RouterConfig';
import { getDateAtMidday } from 'src/utils/dates';

import ReusableCardList from 'src/common/components/ReusableCardList/ReusableCardList';
import { Phone } from 'src/assets/Misc/Phone';
import { Location } from 'src/assets/Misc/Location';
import { getFrequencyHeaderAndContent, MedicationWithRRule } from './helpers';
import { formatPhoneNumber } from 'src/utils/utils';
import { useGetBingAddressUri } from 'src/common/hooks/useGetBingAddressUri';
import { parseRRule } from 'src/helpers/medications';
import { useGetTimezoneInfo } from 'src/common/hooks/useGetTimezoneInfo';

const MedicationView: React.FC = () => {
    const feedbackService = useFeedbackService();
    const { id } = useParams();
    const { getSearchParam, addSearchParam, removeSearchParam } = useQueryStringParams();
    const status = getSearchParam('status');

    const { careRecipientTimezone } = useGetTimezoneInfo();

    const customWidth = usePanelWidth();
    const classNames = getClassNames();
    const [hideDeleteDialog, { toggle: toggleHideDeleteDialog }] = useBoolean(true);
    const isMobile = useIsMobile();
    const navigate = useNavigate();
    const [prescription, setPrescription] = useState({} as MedicationWithRRule);

    useEffect(() => {
        console.log({ prescription });
    }, [prescription]);

    useEffect(() => {
        if (status === 'edited') {
            removeSearchParam('status');
            feedbackService.setSuccessToast(`Medication ${status}`);
        }
    }, [status]);

    const { loading, error, data } = useGetMedicationQuery({
        variables: { id },

        onError: () => {
            feedbackService.setErrorToast(error.message);
        },
    });

    const [deleteMedication] = useDeleteMedicationMutation({
        variables: { id: id },
        refetchQueries: ['GetPrescriptions', 'GetCareRecipientTimeline'],
        errorPolicy: 'all',
        onCompleted: () => {
            navigate(RouterConfig.Medications + '?status=deleted', { replace: true });
        },
    });

    useEffect(() => {
        let currentPrescription =
            data?.careRecipientMedicationPrescriptions?.prescriptions?.[0] ?? ({} as Prescription);

        const dosages = currentPrescription?.dosages?.length ? currentPrescription?.dosages[0] : null;
        const rRuleParams = parseRRule({ inputString: dosages?.schedule, careRecipientTimezone });
        let currentPrescriptionWithRRule = { ...currentPrescription, rRuleParams } as MedicationWithRRule;

        setPrescription(currentPrescriptionWithRRule);
    }, [data]);

    // Strip `mode` from deep-links. This restriction keeps the
    // Back navigation stack in a healthy state.
    useEffect(() => {
        if (getSearchParam('mode')) removeSearchParam('mode');
    }, []);

    // TODO: Add a 404.

    const showEdit = getSearchParam('mode') === 'edit';
    const showEditPanel = () => addSearchParam({ mode: 'edit' });
    const hideEditPanel = () => removeSearchParam('mode');

    const handleDelete = async (event) => {
        event.preventDefault();
        await deleteMedication();
        toggleHideDeleteDialog();
    };

    const DetailCard = () => {
        const scheduleEndDate = prescription?.rRuleParams?.scheduleEndDate;
        const scheduleStartDate = prescription?.rRuleParams?.scheduleStartDate;

        const frequency = prescription?.rRuleParams?.frequency;

        const { careRecipientTimezoneFormatted } = useGetTimezoneInfo();

        const { frequencyText, frequencyContent } = getFrequencyHeaderAndContent(
            prescription,
            careRecipientTimezoneFormatted,
        );

        const frequencyHeader = frequency ? { header: <div>{frequencyText}</div> } : null;

        const directionsContent = prescription?.directions ? { content: <div>{prescription?.directions}</div> } : null;

        let frequencyTextCardContents = [frequencyHeader, directionsContent].filter((element) => element !== null);

        let frequencyTextCard = frequencyTextCardContents.reduce((acc, val) => {
            if (val !== null) {
                return { ...acc, ...val };
            }
        }, {});

        if (!Object.keys(frequencyTextCard).length) {
            frequencyTextCard = null;
        }

        const startEndDateContent =
            scheduleStartDate || scheduleEndDate
                ? {
                      content: (
                          <>
                              {scheduleStartDate && (
                                  <Stack horizontal tokens={{ childrenGap: 10 }} verticalAlign="center">
                                      <div>Start Date: </div>
                                      <div data-testid={'med-start-date'}>
                                          {getDateAtMidday(new Date(scheduleStartDate)).toDateString()}
                                      </div>
                                  </Stack>
                              )}
                              {scheduleEndDate && (
                                  <Stack horizontal tokens={{ childrenGap: 10 }} verticalAlign="center">
                                      <div>End Date: </div>
                                      <div>{getDateAtMidday(new Date(scheduleEndDate)).toDateString()}</div>
                                  </Stack>
                              )}
                          </>
                      ),
                  }
                : null;

        const refillDate = prescription?.refills?.length ? prescription?.refills[0]?.refillDate : null;

        const refillContent = refillDate
            ? {
                  content: (
                      <Stack horizontal tokens={{ childrenGap: 10 }} verticalAlign="center">
                          <div>Next Refill Date: </div>
                          <div>{getDateAtMidday(new Date(refillDate)).toDateString()}</div>
                      </Stack>
                  ),
              }
            : null;

        const scheduleBlocksCard = { content: frequencyContent };

        const detailCardProps = [frequencyTextCard, scheduleBlocksCard, startEndDateContent, refillContent].filter(
            (e) => e !== null && e !== undefined,
        );

        return detailCardProps.length ? (
            <Stack tokens={{ childrenGap: 12 }}>
                <div className={classNames['wc-MedicationView--cardLabel']}>Details</div>
                <ReusableCardList buttonPropsList={detailCardProps} />
            </Stack>
        ) : null;
    };

    // TODO: Abstract all of this into a custom hook (also in ProviderView)
    const ContactsCards = () => {
        const firstName = prescription?.prescribingProvider.firstName;
        const lastName = prescription?.prescribingProvider.lastName;

        const providerNameCard =
            firstName || lastName
                ? {
                      header: (
                          <div data-testid={'provider-name'}>
                              Dr. {firstName} {lastName}
                          </div>
                      ),
                  }
                : null;

        const providerFormattedPhoneNumber = formatPhoneNumber(prescription?.prescribingProvider.phoneNumber);
        const providerPhoneNumberCard = prescription?.prescribingProvider.phoneNumber
            ? {
                  clickableContent: (
                      <Stack horizontal tokens={{ childrenGap: 10 }}>
                          <Phone />
                          <a
                              href={`tel:${prescription?.prescribingProvider.phoneNumber}`}
                              className={classNames['wc-MedicationView--clickableLinkText']}
                              data-testid={'provider-phone'}
                          >
                              {providerFormattedPhoneNumber}
                          </a>
                      </Stack>
                  ),
              }
            : null;

        const providerAddress = prescription?.prescribingProvider?.address?.singleLineAddress ?? null;

        const { mapsUri: providerMapsUri } = useGetBingAddressUri(providerAddress);

        const providerAddressCard = providerAddress
            ? {
                  clickableContent: (
                      <Stack horizontal tokens={{ childrenGap: 10 }}>
                          <Location />
                          <a
                              href={providerMapsUri}
                              className={classNames['wc-MedicationView--clickableLinkText']}
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

        const providerCardsList = [providerNameCard, providerPhoneNumberCard, providerAddressCard].filter(
            (e) => e !== null,
        );

        const pharmacy = prescription?.refills?.[0]?.pharmacy;

        const pharmacyNameCard = pharmacy?.name
            ? { header: <div data-testid={'pharmacy-name'}>{pharmacy.name}</div> }
            : null;

        const pharmacyFormattedPhoneNumber = pharmacy?.phoneNumber
            ? formatPhoneNumber(pharmacy.phoneNumber)
            : undefined;
        const pharmacyPhoneNumberCard = pharmacyFormattedPhoneNumber
            ? {
                  clickableContent: (
                      <Stack horizontal tokens={{ childrenGap: 10 }}>
                          <Phone />
                          <a
                              href={`tel:${pharmacy.phoneNumber}`}
                              className={classNames['wc-MedicationView--clickableLinkText']}
                              data-testid={'pharmacy-phone'}
                          >
                              {pharmacyFormattedPhoneNumber}
                          </a>
                      </Stack>
                  ),
              }
            : null;

        const pharmacyAddress = pharmacy?.location?.singleLineAddress ?? null;

        const { mapsUri: pharmacyMapsUri } = useGetBingAddressUri(pharmacyAddress);

        const pharmacyAddressCard = pharmacyAddress
            ? {
                  clickableContent: (
                      <Stack horizontal tokens={{ childrenGap: 10 }}>
                          <Location />
                          <a
                              href={pharmacyMapsUri}
                              className={classNames['wc-MedicationView--clickableLinkText']}
                              target="_blank"
                              rel="noreferrer"
                              data-testid={'pharmacy-address'}
                          >
                              {pharmacyAddress}
                          </a>
                      </Stack>
                  ),
              }
            : null;

        const pharmacyCardList = [pharmacyNameCard, pharmacyPhoneNumberCard, pharmacyAddressCard].filter(
            (e) => e !== null,
        );

        return (
            <Stack tokens={{ childrenGap: 12 }}>
                <div className={classNames['wc-MedicationView--cardLabel']}>Contacts</div>
                {/* TODO: ReusableCardList and ReuseableCardButtonList should not be separate objects */}
                <ReusableCardList buttonPropsList={providerCardsList} data-testid="provider-details" />
                <ReusableCardList buttonPropsList={pharmacyCardList} data-testid="pharmacy-details" />
            </Stack>
        );
    };

    const noLongerTaking = prescription?.endDate !== null;

    const hasActiveCondition =
        prescription?.takenFor?.condition?.name && prescription?.takenFor?.recordStatus == RecordStatus.Active;

    return (
        <>
            <SubHeaderLayout
                title={'Medication Detail'}
                actionButtonText={'Edit'}
                onClickActionButton={showEditPanel}
                onDelete={toggleHideDeleteDialog}
            >
                {loading ? (
                    <div>Loading...</div>
                ) : (
                    <Stack
                        data-testid="medicationView"
                        tokens={{ childrenGap: isMobile ? '0px' : '16px' }}
                        className={classNames['wc-MedicationView--pageContainer']}
                        horizontalAlign={isMobile ? 'center' : 'start'}
                        horizontal={!isMobile}
                    >
                        <div>
                            {noLongerTaking === false && (
                                <EndMedicationDialog
                                    hidden={hideDeleteDialog}
                                    toggleHideDialog={toggleHideDeleteDialog}
                                    id={id}
                                />
                            )}
                            {noLongerTaking && (
                                <DeleteDialog
                                    hidden={hideDeleteDialog}
                                    toggleHideDialog={toggleHideDeleteDialog}
                                    onDelete={handleDelete}
                                    screen={PagesWithDelete.medication}
                                >
                                    Delete
                                </DeleteDialog>
                            )}
                        </div>
                        <Back />

                        <div className={classNames['wc-MedicationView--pillContainer']}>
                            {/* Image will be updated once backend allows users to include images */}
                            <Image
                                aria-label="Default medication image: purple and pink pill"
                                src={defaultMedication}
                            />
                        </div>
                        <Stack horizontal={!isMobile} className={classNames['wc-MedicationView--content']}>
                            <Stack className={classNames['wc-MedicationView--infoContainer']}>
                                <Stack className={classNames['wc-MedicationView--medicationItems']}>
                                    <Stack
                                        horizontal
                                        tokens={{ childrenGap: 10 }}
                                        className={classNames['wc-MedicationView--medName']}
                                    >
                                        <div data-testid={'med-name'}> {prescription?.medication?.name}</div>{' '}
                                        <div data-testid={'med-strength'}>{prescription?.strengthValue}</div>
                                    </Stack>
                                    {Boolean(hasActiveCondition) && (
                                        <Text
                                            data-testid={'med-condition'}
                                            className={classNames['wc-MedicationView--medTakenfor']}
                                            onClick={() => navigate(RouterConfig.Condition(prescription?.takenFor.id))}
                                        >
                                            {prescription?.takenFor?.condition.name}
                                        </Text>
                                    )}
                                    {/* Temporary solution for now, should be made more reusable */}
                                    {isMobile && <ActionButtonRow onDelete={toggleHideDeleteDialog} />}
                                </Stack>
                                <Stack tokens={{ childrenGap: 20 }}>
                                    {prescription?.rRuleParams !== null && <DetailCard />}
                                    {prescription?.prescribingProvider && <ContactsCards />}
                                </Stack>
                            </Stack>
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
                            <MedicationEdit onDismiss={hideEditPanel} prescription={prescription} />
                        </Panel>
                    </Stack>
                )}
            </SubHeaderLayout>
        </>
    );
};

export default MedicationView;
