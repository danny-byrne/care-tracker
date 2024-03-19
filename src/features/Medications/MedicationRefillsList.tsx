import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBoolean } from '@fluentui/react-hooks';
import { List, Stack, Text } from '@fluentui/react';
import { CompleteRefillDialog } from 'src/common/components';
import MedicationListItem from './MedicationListItem';
import { GetPrescriptionsWithScheduleQuery, RecordStatus } from 'src/graphQL/serverMocks/graphQLGeneratedCode';

import RouterConfig from 'src/app/RouterConfig';

import { getClassNames } from './MedicationList.classNames';
import { Prescription } from 'src/types/Medication';
import { dateDiffInDays, getDateAtMidday } from 'src/utils/dates';
import NoLongerTakingModal from 'src/common/components/ReusableModal/NoLongerTakingModal';
import ReusablePrintButton from 'src/common/components/ReusablePrintButton/ReusablePrintButton';
import { usePrintPanelControls } from 'src/common/hooks/usePrintPanel';

interface IMedicationRefillsListProps {
    prescriptionData: GetPrescriptionsWithScheduleQuery;
}

// Figma Link: https://www.figma.com/file/iKU0KE0nZ14MqB6oBFw99c/MEDMGR%2FMedication-List?node-id=278%3A213573

const MedicationRefillsList: React.FC<IMedicationRefillsListProps> = ({ prescriptionData }) => {
    const navigate = useNavigate();
    const classNames = getClassNames();
    const { showPrintPanel } = usePrintPanelControls();

    const [selectedMedication, setSeletectedMedication] = useState<Prescription>(null);

    const [hideRefillDialog, { toggle: toggleHideRefillDialog }] = useBoolean(true);
    const [showNotTakingDialog, { toggle: toggleShowNotTakingDialog }] = useBoolean(false);

    let medications: Prescription[] = prescriptionData?.careRecipientMedicationPrescriptions?.prescriptions
        ?.filter((prescription) => {
            const filteredRefills = prescription.refills.filter((refill) => refill.recordStatus == RecordStatus.Active);

            return (
                prescription.medication?.name !== undefined &&
                filteredRefills?.length > 0 &&
                // Medication is in No Longer Taking if an end date is present
                prescription.endDate === null
            );
        })
        .sort((a, b) => {
            const filteredRefillsA = a.refills.filter((refill) => refill.recordStatus == RecordStatus.Active);
            const dateA = getDateAtMidday(new Date(filteredRefillsA[0]?.refillDate));

            const filteredRefillsB = b.refills.filter((refill) => refill.recordStatus == RecordStatus.Active);
            const dateB = getDateAtMidday(new Date(filteredRefillsB[0]?.refillDate));
            return dateDiffInDays(dateB, dateA);
        });

    const onClickRefill = (id) => {
        let med: Prescription = medications?.filter((medication) => medication.id === id)[0];
        let medication: Prescription = JSON.parse(JSON.stringify(med));

        setSeletectedMedication(medication);
        toggleHideRefillDialog();
    };

    const onClickNotTaking = (id) => {
        let med: Prescription = medications?.filter((medication) => medication.id === id)[0];
        let medication: Prescription = JSON.parse(JSON.stringify(med));

        setSeletectedMedication(medication);
        toggleShowNotTakingDialog();
    };

    const noLongerTakingModalText = `${selectedMedication?.medication?.name}, ${selectedMedication?.strengthValue}`;

    return (
        <>
            <Stack data-testid="medication-refill-list">
                <ReusablePrintButton onClick={showPrintPanel} isRow />

                {selectedMedication && (
                    <CompleteRefillDialog
                        hidden={hideRefillDialog}
                        toggleHideDialog={toggleHideRefillDialog}
                        onDismiss={toggleHideRefillDialog}
                        medication={selectedMedication}
                    />
                )}
                {selectedMedication && (
                    <NoLongerTakingModal
                        showModal={showNotTakingDialog}
                        setShowModal={toggleShowNotTakingDialog}
                        text={noLongerTakingModalText}
                        id={selectedMedication.id}
                    />
                )}
                {medications?.length === 0 && (
                    <div className={classNames['wc-MedicationList--noMedicationsMessage']}>
                        <Text className={classNames['wc-MedicationList--noMedicationsTitleText']}>
                            Track your loved one&apos;s refills
                        </Text>
                        <p>Add or edit a medication to get started.</p>
                    </div>
                )}
                {medications?.length > 0 && (
                    <>
                        <List
                            items={medications}
                            onRenderCell={(prescription) => {
                                return (
                                    <MedicationListItem
                                        name={prescription.medication?.name}
                                        strength={prescription.strengthValue}
                                        onClick={(ev) => {
                                            ev.preventDefault();
                                            navigate(RouterConfig.Medication(prescription.id));
                                        }}
                                        onClickRefill={(ev) => {
                                            ev.stopPropagation();
                                            onClickRefill(prescription.id);
                                        }}
                                        onClickNotTaking={(ev) => {
                                            ev.stopPropagation();
                                            onClickNotTaking(prescription.id);
                                        }}
                                        isRefillPage
                                        provider={prescription.prescribingProvider}
                                        refills={prescription.refills}
                                    />
                                );
                            }}
                        />
                    </>
                )}
            </Stack>
        </>
    );
};

export default MedicationRefillsList;
