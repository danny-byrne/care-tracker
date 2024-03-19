import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetPrescriptionsWithScheduleQuery } from 'src/graphQL/serverMocks/graphQLGeneratedCode';
import { useIsMobile } from 'src/common/hooks/useMediaQueries';
import { useFeedbackService } from 'src/services/FeedbackService';
import { usePageVisibility } from 'src/common/hooks/usePageVisibility';

import { WeeklyDayPicker } from '@fluentui/react';
import MedicationListItem from './MedicationListItem';
import RouterConfig from 'src/app/RouterConfig';
import { months, weekdays, weekdaysFull } from 'src/utils/utils';

import { getMedsAccordingToDate } from 'src/helpers/medications';
import { weeklydaypickerStyles } from './Medications.classNames';
import { DayTime } from 'src/common/components';
import Accordion from 'src/common/components/Accordion/Accordion';
import { getDateAtMidday, getToday } from 'src/utils/dates';
import { getClassNames } from './MedicationTodayList.className';
import ReusablePrintButton from 'src/common/components/ReusablePrintButton/ReusablePrintButton';
import { MEDICATIONS_POLLING_INTERVAL } from 'src/app/Constants';
import { usePrintPanelControls } from 'src/common/hooks/usePrintPanel';
import { useGetTimezoneInfo } from 'src/common/hooks/useGetTimezoneInfo';

const classNames = getClassNames();

const MedicationsTodayList: React.FC = () => {
    const [selectedDate, setSelectedDate] = useState(null);
    const formattedSelectedDate = selectedDate?.toISOString().slice(0, 10);
    const isMobile = useIsMobile();
    const { setErrorToast } = useFeedbackService();
    const isVisible = usePageVisibility();
    const { showPrintPanel } = usePrintPanelControls();
    const [todayHasMedications, setTodayHasMedications] = useState(false);
    const [medicationSortedList, setMedicationSortedList] = useState({});

    useEffect(() => {
        const setSelectedDateAsBeginningOfToday = () => {
            const today = getToday();
            setSelectedDate(today);
        };

        setSelectedDateAsBeginningOfToday();
    }, []);

    const { error, data, startPolling, stopPolling } = useGetPrescriptionsWithScheduleQuery({
        // no-cache is used here because data is filtered by selectedDate
        // this prevents the cache from updating with data filtered by selectedDate
        fetchPolicy: 'no-cache',
        onError: () => {
            setErrorToast(error.message);
        },
    });

    // While this medication list view is mounted (visible),
    // poll for medication data every 10s. Stop polling
    // when this component unmounts.
    useEffect(() => {
        if (isVisible) startPolling(MEDICATIONS_POLLING_INTERVAL);
        return () => stopPolling();
    }, [isVisible]);

    useEffect(() => {
        let medications = data?.careRecipientMedicationPrescriptions?.prescriptions;
        if (!medications || medications?.length === 0 || !selectedDate) {
            return;
        }

        const selectedDateMedicationList = getMedsAccordingToDate(medications, selectedDate);
        if (Object.keys(selectedDateMedicationList).length > 0) {
            setTodayHasMedications(true);
        }

        setMedicationSortedList(selectedDateMedicationList);
    }, [selectedDate, data]);

    const dayLabels = isMobile ? weekdays : weekdaysFull;

    return (
        <div>
            <label hidden data-testid={'selected-date'}>
                {formattedSelectedDate}
            </label>
            <WeeklyDayPicker
                strings={{
                    nextWeekAriaLabel: 'Next Week:',
                    prevWeekAriaLabel: 'Prev Week:',
                    goToToday: getToday().toString(),
                    shortDays: dayLabels,
                    shortMonths: months,
                    months: months,
                    days: ['1'],
                }}
                initialDate={selectedDate}
                onSelectDate={(date) => setSelectedDate(getDateAtMidday(date))}
                styles={weeklydaypickerStyles}
            />
            {todayHasMedications ? (
                <>
                    <ReusablePrintButton onClick={showPrintPanel} isRow />

                    <TodayMedicationList medicationlist={medicationSortedList} />
                </>
            ) : (
                <NoMedicationsFoundMessage />
            )}
        </div>
    );
};

const NoMedicationsFoundMessage = () => {
    const NO_MEDICATION_TEXT = 'Get started by adding a medication. Visualize your loved ones’ daily schedule.';

    return (
        <div className="no-medications-message">
            <p>{NO_MEDICATION_TEXT}</p>
        </div>
    );
};

interface IMedicationListProps {
    medicationlist?: any;
}

const TodayMedicationList = (props: IMedicationListProps): any => {
    const navigate = useNavigate();
    const { medicationlist } = props;
    const { careRecipientTimezoneFormatted } = useGetTimezoneInfo();

    let medicationTimes = Object.keys(medicationlist);

    const getMedicationsForTime = (time: string) => {
        const medicationListItemsForTime = medicationlist[time].map((item) => {
            return (
                <MedicationListItem
                    key={item.id}
                    name={item.medication?.name}
                    strength={item.strengthValue}
                    instructions={item.directions}
                    onClick={() => {
                        navigate(RouterConfig.Medication(item.id));
                    }}
                />
            );
        });

        return medicationListItemsForTime;
    };

    const getArrayOfMedicationListsByTime = () => {
        const medicationListsByTime = medicationTimes.map((time, index) => {
            const medicationsForTime = getMedicationsForTime(time);

            const removeLeadingZero = (time: string) => time.slice(1);
            const hasLeadingZero = time[0] === '0';
            let displayTime = hasLeadingZero ? removeLeadingZero(time) : time;
            displayTime = displayTime + ' ' + careRecipientTimezoneFormatted;

            return (
                <div key={time} className={classNames['wc-MedicationsTodayContainer--group']}>
                    <Accordion
                        header={
                            <div className={classNames['wc-MedicationsTodayContainer--daytimeWrapper']}>
                                <DayTime time={displayTime} testId={`med-time-group-${index}`} />
                            </div>
                        }
                    >
                        {medicationsForTime}
                    </Accordion>
                </div>
            );
        });

        return medicationListsByTime;
    };

    const medicationListsByTime = getArrayOfMedicationListsByTime();

    return medicationListsByTime;
};

export default MedicationsTodayList;
