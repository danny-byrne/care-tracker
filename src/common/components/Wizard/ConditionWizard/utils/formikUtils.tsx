import { FormikProps } from 'formik';
import { IConditionWizardFormikProps } from '../ConditionWizard';
import { Month } from 'src/graphQL/serverMocks/graphQLGeneratedCode';
import { TimeFrame } from '../timeFrameEnums';
import { MonthIndicies } from 'src/common/helpers/monthFormatting';
import { getToday } from 'src/utils/dates';

export const setFormikStartDateValuesToNull = (formik) => {
    formik.setFieldValue('startDateYear', null);
    formik.setFieldValue('startRelativePeriodStart', null);
    formik.setFieldValue('startRelativePeriodEnd', null);
    formik.setFieldValue('relativeTimePeriod', null);
    formik.setFieldValue('startDateDay', null);
    formik.setFieldValue('startDateMonth', null);
};

export const setFormikValuesForDate = (formik: FormikProps<IConditionWizardFormikProps>, date: Date) => {
    formik.setFieldValue('startDateDay', date.getDate());
    formik.setFieldValue('startDateMonth', Month[date.toLocaleString('default', { month: 'long' })]);
    formik.setFieldValue('startDateYear', date.getFullYear());
    formik.setFieldValue('relativeTimePeriod', null);
};

export const setNonRelativeFormikValuesToNull = (formik: FormikProps<IConditionWizardFormikProps>) => {
    formik.setFieldValue('startRelativePeriodStart', null);
    formik.setFieldValue('startRelativePeriodEnd', null);
    formik.setFieldValue('startDateYear', null);
    formik.setFieldValue('startDateDay', null);
    formik.setFieldValue('startDateMonth', null);
};

export const isValidTimeFrameSelection = (values) => {
    switch (TimeFrame[values.timeFrame]) {
        case TimeFrame.Today:
        case TimeFrame.Unsure:
            return true;
        case TimeFrame.ThisWeek:
        case TimeFrame.Past30Days:
            return isSpecificDaySelected(values);
        case TimeFrame.ThisYear:
            return isSpecificMonthSelected(values);
        case TimeFrame.Past5Years:
            return (
                values.startDateYear !== null ||
                (values.startDateRelativePeriodStart !== null && values.startDateRelativePeriodEnd !== null)
            );
        case TimeFrame.FivePlusYearsAgo:
            return values.relativeTimePeriod !== null;
        default:
            return false;
    }
};

const isSpecificDaySelected = (values) => {
    return values.startDateDay && values.startDateMonth && values.startDateYear;
};

const isSpecificMonthSelected = (values) => {
    return values.startDateMonth && values.startDateYear;
};

export const getDefaultDateForSpecificDay = (values) => {
    return nullDateWasGiven(values) ? getToday() : getDateFromFormikValues(values);
};

const nullDateWasGiven = (values) => {
    return values.startDateDay === null && values.startDateMonth === null && values.startDateYear === null;
};

const getDateFromFormikValues = (values) => {
    // Don't include day if it's null
    if (values.startDateDay === null) return new Date(values.startDateYear, MonthIndicies[values.startDateMonth] - 1);
    else return new Date(values.startDateYear, MonthIndicies[values.startDateMonth] - 1, values.startDateDay);
};

export const unsureYearIsSelected = (formik: FormikProps<IConditionWizardFormikProps>, year: string) => {
    return (
        (formik.values.startDateYear && formik.values.startDateYear.toString() === year) ||
        (formik.values.startDateYear === null && formik.values.startRelativePeriodStart && year === 'Unsure')
    );
};
