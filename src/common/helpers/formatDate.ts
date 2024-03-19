import { getDateAtMidday } from 'src/utils/dates';
import { months } from 'src/utils/utils';

export const formatDate = (date: string): string => {
    const dateObj = getDateAtMidday(new Date(date));

    const monthIndex = dateObj.getMonth();
    const month = months[monthIndex];

    const day = String(dateObj.getDate());
    const year = String(dateObj.getFullYear());
    return `${month} ${day}, ${year}`;
};
