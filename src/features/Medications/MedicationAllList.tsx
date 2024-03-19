import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GetPrescriptionsWithScheduleQuery, RecordStatus } from 'src/graphQL/serverMocks/graphQLGeneratedCode';

import { Stack, IGroup, IGroupHeaderProps, GroupedList, Text } from '@fluentui/react';
import MedicationListItem from './MedicationListItem';
import RouterConfig from 'src/app/RouterConfig';
import Accordion from 'src/common/components/Accordion/Accordion';
import { Header } from 'src/common/components';
import ReusablePrintButton from 'src/common/components/ReusablePrintButton/ReusablePrintButton';
import { usePrintPanelControls } from 'src/common/hooks/usePrintPanel';

import { getClassNames } from './MedicationList.classNames';

// Figma Link: https://www.figma.com/file/iKU0KE0nZ14MqB6oBFw99c/MEDMGR%2FMedication-List?node-id=278%3A213573

interface IMedicationAllListProps {
    prescriptionData: GetPrescriptionsWithScheduleQuery;
}

const MedicationAllList: React.FC<IMedicationAllListProps> = ({ prescriptionData }) => {
    const classNames = getClassNames();

    const navigate = useNavigate();
    const { showPrintPanel } = usePrintPanelControls();

    let medicationsSortedAlphabetically = prescriptionData?.careRecipientMedicationPrescriptions?.prescriptions
        ?.filter((prescriptions) => prescriptions.medication?.name !== undefined)
        .sort((a, b) => {
            return a.medication.name.localeCompare(b.medication.name);
        });

    const overTheCounter = medicationsSortedAlphabetically?.filter((med) => med.overTheCounter && med.endDate === null);
    const prescribed = medicationsSortedAlphabetically?.filter((med) => !med.overTheCounter && med.endDate === null);
    const noLongerTaking = medicationsSortedAlphabetically?.filter((med) => med.endDate !== null);

    const groupMedications = (): IGroup[] => {
        const groups: IGroup[] = [];

        if (prescribed.length > 0) {
            groups.push({
                key: 'Prescribed',
                name: 'Prescriptions',
                startIndex: 0,
                count: prescribed.length,
            });
        }
        if (overTheCounter.length > 0) {
            groups.push({
                key: 'Over the Counter',
                name: 'Over the Counter',
                startIndex: prescribed.length,
                count: overTheCounter.length,
            });
        }
        if (noLongerTaking.length > 0) {
            groups.push({
                key: 'No Longer Taking',
                name: 'No Longer Taking',
                startIndex: prescribed.length + overTheCounter.length,
                count: noLongerTaking.length,
            });
        }

        return groups;
    };

    const onRenderHeader = (props?: IGroupHeaderProps): JSX.Element | null => {
        if (props) {
            const toggleCollapse = (): void => {
                // eslint-disable-next-line react/prop-types
                props.onToggleCollapse!(props.group!);
            };
            return (
                <Stack
                    horizontal
                    verticalAlign="center"
                    className={classNames['wc-MedicationList--allActivitiesHeader']}
                >
                    <Accordion
                        // eslint-disable-next-line react/prop-types
                        collapsed={props.group!.isCollapsed}
                        onToggle={() => {
                            toggleCollapse();
                        }}
                        // eslint-disable-next-line react/prop-types
                        header={<Header text={props.group!.name} />}
                    />
                    {/* eslint-disable-next-line react/prop-types */}
                    {props.groupIndex === 0 && <ReusablePrintButton onClick={showPrintPanel} isRow />}
                </Stack>
            );
        }

        return null;
    };

    return (
        <>
            <Stack data-testid="medicationList">
                {medicationsSortedAlphabetically?.length === 0 && <NoMedicationsMessage />}
                {medicationsSortedAlphabetically?.length > 0 && (
                    <GroupedList
                        className={classNames['wc-MedicationList--listStyle']}
                        items={prescribed?.concat(overTheCounter).concat(noLongerTaking)}
                        groups={groupMedications()}
                        groupProps={{ onRenderHeader }}
                        onRenderCell={(_nestDept, prescription, itemIndex: number) => {
                            const conditionText =
                                prescription.takenFor?.recordStatus == RecordStatus.Active
                                    ? prescription.takenFor?.condition?.name
                                    : undefined;

                            return (
                                <div data-selection-index={itemIndex} role="row">
                                    <span role="cell">
                                        <MedicationListItem
                                            name={prescription.medication?.name}
                                            strength={prescription.strengthValue}
                                            conditionText={conditionText}
                                            instructions={prescription.directions}
                                            onClick={() => {
                                                navigate(RouterConfig.Medication(prescription.id));
                                            }}
                                        />
                                    </span>
                                </div>
                            );
                        }}
                    />
                )}
            </Stack>
        </>
    );
};

const NoMedicationsMessage = () => {
    const classNames = getClassNames();

    return (
        <div className={classNames['wc-MedicationList--noMedicationsMessage']}>
            <Text className={classNames['wc-MedicationList--noMedicationsTitleText']}>
                Add your loved one&apos;s medications
            </Text>
            <Text>Keep track of medications in one place.</Text>
        </div>
    );
};

export default MedicationAllList;
