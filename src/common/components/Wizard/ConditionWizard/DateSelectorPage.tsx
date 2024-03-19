import { FormikProps } from 'formik';
import React, { useEffect, useState } from 'react';
import { DatePicker, DateRangeType, DayOfWeek, Label, Stack, Text, WeeklyDayPicker } from '@fluentui/react';

import { getClassNames } from './ConditionWizard.className';
import { getDateAtMidday } from 'src/utils/dates';
import { getToday } from 'src/utils/dates';
import { months, weekdays } from 'src/utils/utils';
import { conditionWeeklydaypickerStyles } from './ConditionWizard.className';

import { get30DaysAgo, getOneYearAgo } from './utils/dateUtils';
import { getLastFiveYearsOptions } from './utils/timeFrameUtils';
import { TimeFrame, RelativeTimePeriodOptions } from './timeFrameEnums';
import { setFormikStartDateValuesToNull, setFormikValuesForDate } from './utils/formikUtils';

import { IConditionWizardPageProps, IConditionWizardFormikProps } from './ConditionWizard';
import { getKeyByValue } from 'src/utils/objects';
import { PillChoice } from 'src/common/components/Wizard/Pills';
import { isValidTimeFrameSelection } from './utils/formikUtils';
import {
    getDefaultDateForSpecificDay,
    unsureYearIsSelected,
    setNonRelativeFormikValuesToNull,
} from './utils/formikUtils';

export const ConditionDateSelectorWizardPage: React.FC<IConditionWizardPageProps> = ({
    formik,
    setNextButtonEnabled,
}) => {
    const [timeFrame, setTimeFrame] = useState<TimeFrame>(formik.values.timeFrame);
    const classNames = getClassNames();

    useEffect(() => {
        setNextButtonEnabled(false);
    }, []);

    useEffect(() => {
        setNextButtonEnabled(isValidTimeFrameSelection(formik.values));
    }, [formik.values]);

    useEffect(() => {
        setTimeFrame(formik.values.timeFrame);
    }, [formik.values.timeFrame]);

    return (
        <Stack className={classNames['wc-ConditionWizard--conditionPageContainer']}>
            <Text className={classNames['wc-ConditionWizard--conditionHeaderName']}>
                {formik.values.condition?.conditionName}
            </Text>
            <Text className={classNames['wc-ConditionWizard--conditionHeaderText']}>When did it begin?</Text>
            <Stack className={classNames['wc-ConditionWizard--selectionContainer']} tokens={{ childrenGap: '16px' }}>
                <Text>Tap to select:</Text>
                <Stack
                    className={classNames['wc-ConditionWizard--pillContainer']}
                    horizontal
                    tokens={{ childrenGap: '8px' }}
                    wrap
                >
                    {Object.values(TimeFrame).map((dateOption) => {
                        const key = getKeyByValue(TimeFrame, dateOption);
                        const onClickSelected = () => {
                            formik.setFieldValue('timeFrame', null);
                            setFormikStartDateValuesToNull(formik);
                        };
                        const onClickDefault = () => {
                            formik.setFieldValue('timeFrame', key);
                            setFormikStartDateValuesToNull(formik);
                        };
                        return (
                            <PillChoice
                                key={dateOption}
                                isSelected={TimeFrame[formik.values.timeFrame] === dateOption}
                                pillText={dateOption}
                                onClickSelected={onClickSelected}
                                onClickDefault={onClickDefault}
                            />
                        );
                    })}
                </Stack>
            </Stack>
            <TimeFrameComponent timeFrame={timeFrame} formik={formik} />
        </Stack>
    );
};

type ITimeFrameComponentProps = {
    timeFrame: TimeFrame;
    formik: FormikProps<IConditionWizardFormikProps>;
};

const TimeFrameComponent: React.FC<ITimeFrameComponentProps> = ({ timeFrame, formik }) => {
    switch (TimeFrame[timeFrame]) {
        case TimeFrame.Today:
            return null;
        case TimeFrame.ThisWeek:
            return <ThisWeekComponent formik={formik} />;
        case TimeFrame.Past30Days:
            return <Past30DaysComponent formik={formik} />;
        case TimeFrame.ThisYear:
            return <ThisYearComponent formik={formik} />;
        case TimeFrame.Past5Years:
            return <PastFiveYearsComponent formik={formik} />;
        case TimeFrame.FivePlusYearsAgo:
            return <FivePlusYearsAgoComponent formik={formik} />;
        case TimeFrame.Unsure:
            return null;
        default:
            return null;
    }
};

const useSelectedDate = (formik: FormikProps<IConditionWizardFormikProps>) => {
    const defaultDate = getDefaultDateForSpecificDay(formik.values);
    const [selectedDate, setSelectedDate] = useState<Date | null>(defaultDate);

    useEffect(() => {
        setFormikValuesForDate(formik, selectedDate);
    }, [selectedDate]);

    return { selectedDate, setSelectedDate };
};

const ThisWeekComponent: React.FC<IConditionWizardPageProps> = ({ formik }) => {
    const { selectedDate, setSelectedDate } = useSelectedDate(formik);

    return (
        <Stack>
            <Label required>What day?</Label>
            <WeeklyDayPicker
                strings={{
                    goToToday: getToday().toString(),
                    shortDays: weekdays,
                    shortMonths: months,
                    months: months,
                    days: ['1'],
                }}
                initialDate={selectedDate}
                maxDate={getToday()}
                onSelectDate={(date) => setSelectedDate(getDateAtMidday(date))}
                styles={conditionWeeklydaypickerStyles}
            />
        </Stack>
    );
};

const Past30DaysComponent: React.FC<IConditionWizardPageProps> = ({ formik }) => {
    const classNames = getClassNames();
    const { selectedDate, setSelectedDate } = useSelectedDate(formik);

    return (
        <DatePicker
            className={classNames['wc-ConditionWizard--calendarContainer']}
            isRequired
            id="startDate"
            label="What day?"
            data-testid="startDate"
            firstDayOfWeek={DayOfWeek.Monday}
            minDate={get30DaysAgo()}
            maxDate={getToday()}
            onSelectDate={(date) => {
                setFormikValuesForDate(formik, date);
                setSelectedDate(date);
            }}
            value={selectedDate}
            placeholder="Select a date"
        />
    );
};

const ThisYearComponent: React.FC<IConditionWizardPageProps> = ({ formik }) => {
    const classNames = getClassNames();
    const { selectedDate, setSelectedDate } = useSelectedDate(formik);

    const oneYearAgo = getOneYearAgo();

    return (
        <DatePicker
            className={classNames['wc-ConditionWizard--calendarContainer']}
            isRequired
            id="startDate"
            label="What month?"
            data-testid="startDate"
            formatDate={(date) => `${date.toLocaleString('default', { month: 'long' })}, ${date.getFullYear()}`}
            minDate={oneYearAgo}
            maxDate={getToday()}
            value={selectedDate}
            onSelectDate={(date) => {
                setFormikValuesForDate(formik, date);
                setSelectedDate(date);
            }}
            calendarProps={{ isDayPickerVisible: false, dateRangeType: DateRangeType.Month }}
            placeholder="Select a date"
        />
    );
};

const PastFiveYearsComponent: React.FC<IConditionWizardPageProps> = ({ formik }) => {
    const last5YearsOptions = getLastFiveYearsOptions();

    return (
        <Stack tokens={{ childrenGap: 9 }}>
            <Label>Which year?</Label>
            <Stack horizontal wrap tokens={{ childrenGap: 8 }}>
                {last5YearsOptions.map((year) => {
                    const onClickSelected = () => setFormikStartDateValuesToNull(formik);
                    const onClickDefault = () => {
                        if (year !== 'Unsure') {
                            formik.setFieldValue('startDateYear', parseInt(year));
                            formik.setFieldValue('startRelativePeriodStart', null);
                            formik.setFieldValue('startRelativePeriodEnd', null);
                        } else {
                            formik.setFieldValue('startDateYear', null);
                            formik.setFieldValue('startRelativePeriodEnd', parseInt(last5YearsOptions[0]));
                            formik.setFieldValue('startRelativePeriodStart', parseInt(last5YearsOptions[4]));
                        }
                    };

                    return (
                        <PillChoice
                            key={year}
                            isSelected={unsureYearIsSelected(formik, year)}
                            pillText={year}
                            onClickSelected={onClickSelected}
                            onClickDefault={onClickDefault}
                        />
                    );
                })}
            </Stack>
        </Stack>
    );
};

const FivePlusYearsAgoComponent: React.FC<IConditionWizardPageProps> = ({ formik }) => {
    return (
        <Stack tokens={{ childrenGap: 9 }}>
            <Label>Which timeframe?</Label>
            <Stack horizontal wrap tokens={{ childrenGap: 8 }}>
                {Object.values(RelativeTimePeriodOptions).map((dateOption) => {
                    const key = getKeyByValue(RelativeTimePeriodOptions, dateOption);
                    const onClickSelected = () => {
                        formik.setFieldValue('relativeTimePeriod', null);
                        setNonRelativeFormikValuesToNull(formik);
                    };
                    const onClickDefault = () => {
                        formik.setFieldValue('relativeTimePeriod', key);
                        setNonRelativeFormikValuesToNull(formik);
                    };

                    return (
                        <PillChoice
                            key={dateOption}
                            isSelected={
                                formik.values.relativeTimePeriod !== null && formik.values.relativeTimePeriod === key
                            }
                            pillText={dateOption}
                            onClickSelected={onClickSelected}
                            onClickDefault={onClickDefault}
                        />
                    );
                })}
            </Stack>
        </Stack>
    );
};
