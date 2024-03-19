import { useEffect, useState } from 'react';
import { Immunization } from 'src/types/Immunization';
import { formatDate } from '../helpers/textFormatting';

export const useImmunizationDateText = (immunization: Immunization) => {
    const [dateText, setDateText] = useState('');
    const [timeframeText, setTimeFrameText] = useState('');

    useEffect(() => {
        if (immunization) {
            const hasDateText = immunization?.immunizationDateYear !== null;
            const hasTimeFrameText =
                immunization?.immunizationDateRelativePeriodStart !== null &&
                immunization?.immunizationDateRelativePeriodEnd !== null;

            const newDateText = hasDateText
                ? formatDate(
                      immunization?.immunizationDateYear,
                      immunization?.immunizationDateMonth,
                      immunization?.immunizationDateDay,
                  )
                : '';
            const newTimeFrameText = hasTimeFrameText
                ? `Sometime between ${immunization?.immunizationDateRelativePeriodStart} 
                and ${immunization?.immunizationDateRelativePeriodEnd}`
                : '';

            setDateText(newDateText);
            setTimeFrameText(newTimeFrameText);
        }
    }, [immunization]);

    return { dateText, timeframeText };
};
