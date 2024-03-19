import { RelativeTimePeriodOptions } from 'src/common/components/Wizard/ConditionWizard/timeFrameEnums';
import { capitalizeFirstLetter } from 'src/common/helpers/textFormatting';

export const getConditionActive = (condition) => {
    return condition.current;
};

export const getTimeFrameText = (condition) => {
    const isActiveCondition = condition.active;
    let relativeTimeframeText = '',
        absoluteDatesAndRelativeTimeframes = [];

    const startedOrEndedText = isActiveCondition ? 'Started' : 'Ended';

    let {
        conditionStartDateYear,
        conditionStartDateMonth,
        conditionStartDateDay,
        conditionEndDateYear,
        conditionEndDateMonth,
        conditionEndDateDay,
        conditionStartDateRelativePeriodEnd: startRelativeEnd,
        conditionStartDateRelativePeriodStart: startRelativeStart,
        conditionEndDateRelativePeriodStart: endRelativeStart,
        conditionEndDateRelativePeriodEnd: endRelativeEnd,
        conditionRelativeTimePeriod: relativeTimePeriod,
    } = condition;

    const isRelativeStartDate = startRelativeStart || startRelativeEnd;
    const isRelativeEndDate = endRelativeStart || endRelativeEnd;
    const isAbsoluteStartDate = conditionStartDateYear || conditionStartDateMonth || conditionStartDateDay;
    const isAbsoluteEndDate = conditionEndDateYear || conditionEndDateMonth || conditionEndDateDay;
    const hasNoStartDate = !(isRelativeStartDate || isAbsoluteStartDate || relativeTimePeriod !== null);

    const getMonthDispayText = (month) => capitalizeFirstLetter(month.toLowerCase());

    const buildCertainDateText = (year, month, day) => {
        return `${month ? `${getMonthDispayText(month)} ` : ''}${day ? `${day}` + ', ' : ''}${year}`;
    };

    if (isRelativeStartDate) {
        absoluteDatesAndRelativeTimeframes.push({
            labelText: 'Condition began sometime between ',
            yearsText: `${startRelativeStart} to ${startRelativeEnd}`,
        });
    }
    if (isAbsoluteStartDate) {
        absoluteDatesAndRelativeTimeframes.push({
            labelText: 'Condition began ',
            yearsText: buildCertainDateText(conditionStartDateYear, conditionStartDateMonth, conditionStartDateDay),
        });
    }
    if (isRelativeEndDate) {
        absoluteDatesAndRelativeTimeframes.push({
            labelText: 'Condition ended sometime between ',
            yearsText: `${endRelativeStart} to ${endRelativeEnd}`,
        });
    }
    if (isAbsoluteEndDate) {
        absoluteDatesAndRelativeTimeframes.push({
            labelText: 'Condition ended ',
            yearsText: buildCertainDateText(conditionEndDateYear, conditionEndDateMonth, conditionEndDateDay),
        });
    }
    if (relativeTimePeriod) {
        absoluteDatesAndRelativeTimeframes.push({
            labelText: 'Condition began',
            yearsText: RelativeTimePeriodOptions[relativeTimePeriod],
        });
    }

    const startDate = {
        year: conditionStartDateYear,
        month: conditionStartDateMonth,
        day: conditionStartDateDay,
        relativeStart: startRelativeStart,
        relativeEnd: startRelativeEnd,
        relativeTimePeriod: relativeTimePeriod,
    };
    const endDate = {
        year: conditionEndDateYear,
        month: conditionEndDateMonth,
        day: conditionEndDateDay,
        relativeStart: endRelativeStart,
        relativeEnd: endRelativeEnd,
    };

    let timeframeText;
    if (hasNoStartDate) {
        timeframeText = 'Enter start date';
    } else {
        const { year, day, month, relativeStart, relativeEnd } = isActiveCondition ? startDate : endDate;
        const isARelativeDate = Boolean(relativeStart && relativeEnd);
        let dateText;
        if (isARelativeDate) {
            dateText = `sometime between ${relativeStart} and ${relativeEnd}`;
        }
        // No check against end date needed, this situation cannot have an end date
        else if (relativeTimePeriod) {
            dateText = RelativeTimePeriodOptions[relativeTimePeriod].toLowerCase();
        } else {
            dateText = buildCertainDateText(year, month, day);
        }
        timeframeText = `${startedOrEndedText} ${dateText}`;

        // Special case that shows start date for no longer experiencing if no end date is given
        if (!isActiveCondition && !isARelativeDate && year === null) {
            const { year, day, month, relativeStart, relativeEnd } = startDate;
            const isARelativeDate = Boolean(relativeStart && relativeEnd);
            let dateText;
            if (isARelativeDate) {
                dateText = `sometime between ${relativeStart} and ${relativeEnd}`;
            }
            // No check against end date needed, this situation cannot have an end date
            else if (relativeTimePeriod) {
                dateText = RelativeTimePeriodOptions[relativeTimePeriod].toLowerCase();
            } else {
                dateText = buildCertainDateText(year, month, day);
            }

            timeframeText = `Started ${dateText}`;
        }
    }

    return {
        timeframeText,
        relativeTimeframeText,
        absoluteDatesAndRelativeTimeframes,
        hasNoStartDate,
    };
};

// TODO: Update
export const validateConditionDetails = (values) => {
    const errors: any = {};
    if (!values.condition.conditionName) {
        errors.conditionName = 'Required';
    }

    if (!values.conditionStarted.unsureOfSpecificYear) {
        if (!values.conditionStarted.year) {
            errors.conditionStarted = 'Year Required';
        } else if (values.conditionStarted.year && values.conditionStarted.day && !values.conditionStarted.month) {
            errors.conditionStartedDayRequired = 'Condition Start Month required';
        }
    } else if (values.conditionStarted.unsureOfSpecificYear) {
        if (!values.conditionStarted.relativeStart && !values.conditionStarted.relativeEnd) {
            errors.conditionStartedTimeframe = 'Required';
        }
        if (values.conditionStarted.relativeEnd < values.conditionStarted.relativeStart) {
            errors.conditionTimeframeOverlap = 'End year cannot be before start year';
        }
    }

    if (!values.isCurrentlyActive) {
        if (!values.conditionEnded.unsureOfSpecificYear) {
            if (!values.conditionEnded.year) {
                errors.conditionEnded = 'Year Required';
            } else if (values.conditionEnded.year && values.conditionEnded.day && !values.conditionEnded.month) {
                errors.conditionEndedDayRequired = 'Condition End Month required';
            }
        } else if (values.conditionEnded.unsureOfSpecificYear) {
            if (!values.conditionEnded.relativeStart && !values.conditionEnded.relativeEnd) {
                errors.conditionEndedTimeframe = 'Required';
            }
            if (values.conditionEnded.relativeEnd < values.conditionEnded.relativeStart) {
                errors.conditionTimeframeOverlap = 'End year cannot be before start year';
            }
            if (
                values.conditionEnded.relativeEnd < values.conditionStarted.relativeStart ||
                values.conditionEnded.relativeEnd < values.conditionStarted.relativeEnd ||
                values.conditionEnded.relativeStart < values.conditionStarted.relativeStart ||
                values.conditionEnded.relativeStart < values.conditionStarted.relativeEnd
            ) {
                errors.conditionTimeframeOverlap = 'relative end year cannot be before relative start year';
            }
        }
    }

    return errors;
};
