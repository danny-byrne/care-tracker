import {
    ConditionOccurrenceCreateInput,
    ConditionOccurrenceUpdateInput,
    Month,
} from 'src/graphQL/serverMocks/graphQLGeneratedCode';
import { TimeFrame, EndDateTimeFrame } from '../timeFrameEnums';
import { IConditionWizardFormikProps } from '../ConditionWizard';
import { getToday, convertMonthIndexToMonth } from './dateUtils';
import { determineTimeFrame } from './timeFrameUtils';

export const getAddConditionValuesToSubmit = (values: IConditionWizardFormikProps) => {
    const baseMutationVariables: ConditionOccurrenceCreateInput | ConditionOccurrenceUpdateInput = {
        condition: {
            name: values.condition.conditionName,
            iCD10Code: values.condition.icd10Code,
        },
        conditionRelativeTimePeriod: null,
    };

    const mutationVariablesWithStartDate = getMutationValuesWithStartDate(values, baseMutationVariables);
    const mutationVariablesWithEndDate = getMutationValuesWithEndDate(values, mutationVariablesWithStartDate);

    return mutationVariablesWithEndDate;
};

const getMutationValuesWithStartDate = (
    values: IConditionWizardFormikProps,
    mutationVariables: ConditionOccurrenceCreateInput,
) => {
    const relativeStartPeriodsPopulated = values.startRelativePeriodStart && values.startRelativePeriodEnd;
    const today = getToday();

    switch (TimeFrame[values.timeFrame]) {
        case TimeFrame.Today:
            mutationVariables.conditionRelativeTimePeriod = null;
            mutationVariables.conditionStartDateYear = today.getFullYear();
            mutationVariables.conditionStartDateMonth = Month[today.toLocaleString('default', { month: 'long' })];
            mutationVariables.conditionStartDateDay = today.getDate();
            break;
        case TimeFrame.ThisWeek:
        case TimeFrame.Past30Days:
            mutationVariables.conditionRelativeTimePeriod = null;
            mutationVariables.conditionStartDateYear = values.startDateYear;
            mutationVariables.conditionStartDateMonth = values.startDateMonth;
            mutationVariables.conditionStartDateDay = values.startDateDay;
            break;
        case TimeFrame.ThisYear:
            mutationVariables.conditionRelativeTimePeriod = null;
            mutationVariables.conditionStartDateYear = values.startDateYear;
            mutationVariables.conditionStartDateMonth = values.startDateMonth;
            break;
        case TimeFrame.Past5Years:
            mutationVariables.conditionRelativeTimePeriod = null;
            if (relativeStartPeriodsPopulated) {
                mutationVariables.conditionStartDateRelativePeriodStart = values.startRelativePeriodStart;
                mutationVariables.conditionStartDateRelativePeriodEnd = values.startRelativePeriodEnd;
            } else {
                mutationVariables.conditionStartDateYear = values.startDateYear;
            }
            break;
        case TimeFrame.FivePlusYearsAgo:
            mutationVariables.conditionRelativeTimePeriod = values.relativeTimePeriod;
            break;
        case TimeFrame.Unsure:
            break;
        default:
            break;
    }

    return mutationVariables;
};

const getMutationValuesWithEndDate = (
    values: IConditionWizardFormikProps,
    mutationVariables: ConditionOccurrenceCreateInput,
) => {
    const currentYear = new Date().getFullYear();
    switch (EndDateTimeFrame[values.endTimeFrame]) {
        // OneWeek: same month + year as start
        case EndDateTimeFrame.OneWeek:
            mutationVariables.conditionEndDateYear = mutationVariables.conditionStartDateYear;
            mutationVariables.conditionEndDateMonth = mutationVariables.conditionStartDateMonth;
            break;
        // OneWeekToOneMonth: +1 month from start, same year if no month present
        case EndDateTimeFrame.OneWeekToOneMonth:
            if (values.startDateMonth === null) {
                mutationVariables.conditionEndDateYear = mutationVariables.conditionStartDateYear;
            } else {
                if (values.startDateMonth === Month['December']) {
                    mutationVariables.conditionEndDateYear = mutationVariables.conditionStartDateYear + 1;
                    mutationVariables.conditionEndDateMonth = Month['January'];
                } else {
                    mutationVariables.conditionEndDateYear = mutationVariables.conditionStartDateYear;
                    mutationVariables.conditionEndDateMonth = convertMonthIndexToMonth(values.startDateMonth) + 1;
                }
            }
            break;
        // SeveralMonths: +1 to year, same year if started in current year
        case EndDateTimeFrame.SeveralMonths:
            if (mutationVariables.conditionStartDateYear === currentYear)
                mutationVariables.conditionEndDateYear = mutationVariables.conditionStartDateYear;
            else mutationVariables.conditionEndDateYear = mutationVariables.conditionStartDateYear + 1;
            break;
        // Between1And5Years: relativePeriodStart = startDateYear + 1, relativePeriodEnd = currentYear
        case EndDateTimeFrame.Between1And5Years:
            mutationVariables.conditionEndDateRelativePeriodStart = mutationVariables.conditionStartDateYear + 1;
            mutationVariables.conditionEndDateRelativePeriodEnd = currentYear;
            break;
        default:
            break;
    }

    return mutationVariables;
};

export const getEditConditionValuesToSubmit = (values: IConditionWizardFormikProps) => {
    let mutationVariables: ConditionOccurrenceUpdateInput = getAddConditionValuesToSubmit(
        values,
    ) as ConditionOccurrenceUpdateInput;
    mutationVariables = {
        ...mutationVariables,
        id: values.id,
    };

    return mutationVariables;
};

export const nullConditionValues = {
    condition: null,
    isCurrent: true,
    timeFrame: null,
    startDateDay: null,
    startDateMonth: null,
    startDateYear: null,
    relativeTimePeriod: null,
    startRelativePeriodStart: null,
    startRelativePeriodEnd: null,
    endTimeFrame: null,
};

export const getConditionValuesToEdit = (condition) => {
    const editValues = {
        condition: {
            conditionName: condition.condition.name,
            icd10Code: condition?.condition?.codes[0].code,
        },
        id: condition.id,
        isCurrent: condition.active,
        timeFrame: null,
        startDateDay: condition.conditionStartDateDay,
        startDateMonth: condition.conditionStartDateMonth,
        startDateYear: condition.conditionStartDateYear,
        relativeTimePeriod: condition.conditionRelativeTimePeriod,
        startRelativePeriodStart: condition.conditionStartDateRelativePeriodStart,
        startRelativePeriodEnd: condition.conditionStartDateRelativePeriodEnd,
        endTimeFrame: null,
    };

    const timeFrame = determineTimeFrame(editValues);
    editValues.timeFrame = timeFrame;

    return editValues;
};
