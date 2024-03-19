import { getKeyByValue } from 'src/utils/objects';
import { isDateInLastWeek, isDateInPast30Days } from './dateUtils';
import { IConditionWizardFormikProps } from '../ConditionWizard';
import { EndDateTimeFrame, TimeFrame } from '../timeFrameEnums';
import { MonthIndicies } from 'src/common/helpers/monthFormatting';

export const getLastFiveYearsOptions = () => {
    const lastYear: number = new Date().getFullYear() - 1;
    const fiveYearsAgo = lastYear - 4;
    const lastFiveYears: string[] = [];

    for (let i = lastYear; i >= fiveYearsAgo; i--) {
        lastFiveYears.push(i.toString());
    }

    lastFiveYears.push('Unsure');

    return lastFiveYears;
};

export const determineTimeFrame = (values: IConditionWizardFormikProps) => {
    const selectedDate = new Date(values.startDateYear, MonthIndicies[values.startDateMonth] - 1, values.startDateDay);

    if (values.relativeTimePeriod) {
        return getKeyByValue(TimeFrame, TimeFrame.FivePlusYearsAgo);
    }

    if (values.startDateYear === null) {
        return getKeyByValue(TimeFrame, TimeFrame.Unsure);
    }

    if (values.startDateDay === null && values.startDateMonth !== null) {
        return getKeyByValue(TimeFrame, TimeFrame.ThisYear);
    }

    if (isDateInLastWeek(selectedDate)) {
        return getKeyByValue(TimeFrame, TimeFrame.ThisWeek);
    }

    if (isDateInPast30Days(selectedDate)) {
        return getKeyByValue(TimeFrame, TimeFrame.Past30Days);
    }

    const currentYear = new Date().getFullYear();
    if (currentYear - values.startDateYear <= 5) {
        return getKeyByValue(TimeFrame, TimeFrame.Past5Years);
    }

    return getKeyByValue(TimeFrame, TimeFrame.Unsure);
};

export const getAvailableEndDates = (startDateTimeFrame: TimeFrame) => {
    switch (startDateTimeFrame) {
        case TimeFrame.ThisWeek:
            return [EndDateTimeFrame.OneWeek, EndDateTimeFrame.Unsure];
        case TimeFrame.Past30Days:
            return [EndDateTimeFrame.OneWeek, EndDateTimeFrame.OneWeekToOneMonth, EndDateTimeFrame.Unsure];
        case TimeFrame.ThisYear:
            return [
                EndDateTimeFrame.OneWeek,
                EndDateTimeFrame.OneWeekToOneMonth,
                EndDateTimeFrame.SeveralMonths,
                EndDateTimeFrame.Unsure,
            ];
        case TimeFrame.Past5Years:
            return [
                EndDateTimeFrame.OneWeek,
                EndDateTimeFrame.OneWeekToOneMonth,
                EndDateTimeFrame.SeveralMonths,
                EndDateTimeFrame.Between1And5Years,
                EndDateTimeFrame.Unsure,
            ];
        default:
            return [];
    }
};
