import React, { useState } from 'react';

import { useReactToPrint } from 'react-to-print';
import { DatePicker, Stack, PrimaryButton, DayOfWeek, Checkbox } from '@fluentui/react';
import { trackFieldChanged } from 'src/wcpConsentInit';
import {
    useGetDataForPrintPages,
    useGetHealthHistoryDataForPrintPages,
} from 'src/common/hooks/useGetDataForPrintPages';
import SubHeaderLayout from 'src/common/components/Layout/SubHeaderLayout';

import PrintableContentContainer from 'src/features/PrintableContent/PrintableContentContainer';
import CareRecipientPrint from 'src/features/PrintableContent/CareRecipientPrint';

import { theme } from 'src/theme';

const datePickerstyles = {
    statusMessage: {
        marginTop: 0,
    },
};

const checkBoxStyles = theme.components.Checkbox.styles;

const keyToLabel = (camelCase) =>
    camelCase
        .replace(/([A-Z])/g, (match) => ` ${match}`)
        .replace(/^./, (match) => match.toUpperCase())
        .trim();
interface IMedicationPrintProps {
    onDismiss: () => void;
}

const CareRecipientPrintPanel: React.FC<IMedicationPrintProps> = ({ onDismiss }) => {
    const printCarePlanRef = React.useRef<HTMLDivElement>(null);

    const handlePrint = useReactToPrint({
        content: () => printCarePlanRef.current,
        documentTitle: 'Care Recipient Information',
        onAfterPrint: () => onDismiss(),
    });

    const defaultStartDate = new Date(Date.now());
    const defaultEndDate = new Date(Date.now());
    defaultStartDate.setFullYear(defaultStartDate.getFullYear() - 4);

    const [filterValues, setFilterValues] = useState({
        printRangeStart: defaultStartDate,
        printRangeEnd: defaultEndDate,
        includeBasicInformation: true,
        includeAllergies: true,
        includeVaccinations: true,
        includeHealthHistory: true,
        includeEmergencyContacts: true,
        includePharmacies: true,
        includeProviders: true,
    });

    const checkBoxValues = [
        'includeBasicInformation',
        'includeAllergies',
        'includeVaccinations',
        'includeHealthHistory',
        'includeEmergencyContacts',
        'includePharmacies',
        'includeProviders',
    ];

    const healthHistoryStartDate = filterValues.printRangeStart;
    const healthHistoryEndDate = filterValues.printRangeEnd;

    const recipientData = useGetDataForPrintPages();
    const healthHistoryData = useGetHealthHistoryDataForPrintPages(healthHistoryStartDate, healthHistoryEndDate);

    return (
        <>
            <SubHeaderLayout title="Print Settings" onClose={onDismiss} isPanel>
                <Stack verticalAlign="space-between" style={{ height: '95%' }}>
                    <Stack tokens={{ childrenGap: 10 }}>
                        <DatePicker
                            styles={datePickerstyles}
                            id="print-range-start"
                            label="Include history from"
                            data-testid="printRangeStart"
                            firstDayOfWeek={DayOfWeek.Sunday}
                            value={filterValues.printRangeStart}
                            onSelectDate={(date) => {
                                trackFieldChanged('printRangeStart');
                                setFilterValues({ ...filterValues, printRangeStart: date });
                            }}
                            placeholder="Select a date"
                        />
                        <DatePicker
                            styles={datePickerstyles}
                            id="printRangeEnd"
                            data-testid="print-range-end"
                            firstDayOfWeek={DayOfWeek.Sunday}
                            minDate={filterValues.printRangeStart}
                            value={filterValues.printRangeEnd}
                            onSelectDate={(date) => {
                                trackFieldChanged('startDate');
                                setFilterValues({ ...filterValues, printRangeEnd: date });
                            }}
                            placeholder="Select a date"
                        />
                        {checkBoxValues.map((value) => {
                            return (
                                <Checkbox
                                    styles={checkBoxStyles}
                                    key={value}
                                    label={keyToLabel(value)}
                                    checked={filterValues[value]}
                                    onChange={(e, checked) => {
                                        setFilterValues({
                                            ...filterValues,
                                            [value]: checked,
                                        });
                                    }}
                                />
                            );
                        })}

                        <PrimaryButton text={'Print'} onClick={handlePrint} style={{ marginTop: 50 }} />
                    </Stack>
                </Stack>
            </SubHeaderLayout>
            <PrintableContentContainer ref={printCarePlanRef}>
                <CareRecipientPrint
                    recipientData={recipientData}
                    filterValues={filterValues}
                    healthHistoryData={healthHistoryData}
                />
            </PrintableContentContainer>
        </>
    );
};

export default CareRecipientPrintPanel;
