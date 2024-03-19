import { MonthIndicies } from 'src/common/helpers/monthFormatting';
import { Month } from 'src/graphQL/serverMocks/graphQLGeneratedCode';

export const getToday = () => new Date();

export const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
];

export const get30DaysAgo = () => {
    return new Date(getToday().getTime() - 30 * 24 * 60 * 60 * 1000);
};

export const getOneYearAgo = () => {
    const today = new Date();
    var oneYearAgo = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate());
    return oneYearAgo;
};

export const convertMonthIndexToMonth = (startDateMonth) => {
    return Month[months[MonthIndicies[startDateMonth]]];
};

export const isDateInLastWeek = (date) => {
    const now = new Date();
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(now.getDate() - 7);

    return date > oneWeekAgo;
};

export const isDateInPast30Days = (date) => {
    const now = new Date();
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(now.getDate() - 30);

    return date > thirtyDaysAgo;
};
