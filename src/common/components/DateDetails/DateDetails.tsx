import React from 'react';
import { Stack, Separator, ComboBox, Text } from '@fluentui/react';
import { getClassNames } from './DateDetails.classNames';
import { monthDropdownOptions, getDaysDropdownOptions, yearDropdownOptions } from 'src/utils/utils';
import { trackFieldChanged } from 'src/wcpConsentInit';
import { StatusRadioButtonGroup } from '../StatusRadioButtonGroup';

const classNames = getClassNames();

interface IDateDetailsProps {
    onChangeYear: (number) => void;
    onChangeMonth: (number) => void;
    onChangeDay: (number) => void;
    onChangeUnsureStatus: (boolean) => void;
    onChangeRelativePeriod: (number, string) => void;
    dateDetails: any;
    radioButtonText: any;
    pageType: DateDetailsFormType;
}

interface IConditionAddFromMedManagerProps {
    disabled: boolean;
    onChangeYear: (number) => void;
    onChangeMonth: (number) => void;
    onChangeDay: (number) => void;
    onChangeUnsureStatus: (boolean) => void;
    onChangeTimeFrame: (number) => void;
    onChangeRelativePeriod: (number, string) => void;
    dateDetails: any;
    radioButtonText: any;
    pageType: DateDetailsFormType;
}

const DateDetails: React.FC<IDateDetailsProps | IConditionAddFromMedManagerProps> = (props) => {
    const {
        onChangeYear,
        onChangeMonth,
        onChangeDay,
        onChangeUnsureStatus,
        onChangeRelativePeriod,
        dateDetails,
        radioButtonText,
        pageType,
    } = props;

    const { day, month, year, unsureOfSpecificYear, relativeStart, relativeEnd } = dateDetails;

    const testIdPrefix = DateDetailsText[pageType]['testIdPrefix'];

    return (
        <Stack tokens={{ childrenGap: 10 }} className={classNames['wc-DateDetails--container']}>
            <StatusRadioButtonGroup
                value={!unsureOfSpecificYear}
                radioButtonText={radioButtonText}
                onChange={(value) => {
                    const unsureStatus = !value;
                    onChangeUnsureStatus(unsureStatus);
                }}
                testId={'medication-condition-status'}
                showStatusLabel
            />
            {!unsureOfSpecificYear && (
                <>
                    <ComboBox
                        label={DateDetailsText[pageType]['specificYear']}
                        className={classNames['wc-DateDetails--yearPicker']}
                        options={yearDropdownOptions}
                        onChange={(_, item) => {
                            trackFieldChanged(`${testIdPrefix}-year`);
                            onChangeYear(item.key);
                        }}
                        selectedKey={year}
                        disabled={unsureOfSpecificYear}
                        useComboBoxAsMenuWidth
                        data-testid={`${testIdPrefix}-year`}
                        required={!unsureOfSpecificYear}
                        placeholder="Select Year"
                    />
                    <Stack horizontal tokens={{ childrenGap: 20 }}>
                        <ComboBox
                            className={classNames['wc-DateDetails--dayAndMonthPicker']}
                            label="Month"
                            options={monthDropdownOptions}
                            onChange={(_, item) => {
                                trackFieldChanged(`${testIdPrefix}-month`);
                                onChangeMonth(item.key);
                            }}
                            selectedKey={month}
                            useComboBoxAsMenuWidth
                            data-testid={`${testIdPrefix}-month`}
                            placeholder="Select Month"
                            required={day !== null}
                        />
                        <ComboBox
                            className={classNames['wc-DateDetails--dayAndMonthPicker']}
                            label="Day"
                            options={getDaysDropdownOptions(year, month)}
                            onChange={(_, item) => {
                                trackFieldChanged(`${testIdPrefix}-day`);
                                onChangeDay(item.key);
                            }}
                            selectedKey={day}
                            disabled={month === null}
                            useComboBoxAsMenuWidth
                            data-testid={`${testIdPrefix}-day`}
                            placeholder="Select Day"
                        />
                    </Stack>
                </>
            )}

            {unsureOfSpecificYear && (
                <>
                    <Text className={classNames['wc-DateDetails--unsureText']}>
                        {DateDetailsText[pageType]['timeframe']}
                    </Text>
                    <Stack horizontal tokens={{ childrenGap: 20 }}>
                        <ComboBox
                            label={`Start Year`}
                            className={classNames['wc-DateDetails--dayAndMonthPicker']}
                            options={yearDropdownOptions}
                            onChange={(_, item) => {
                                trackFieldChanged(`${testIdPrefix}-relative-start-year`);
                                onChangeRelativePeriod(item.key, 'relativeStart');
                            }}
                            selectedKey={relativeStart}
                            useComboBoxAsMenuWidth
                            data-testid={`${testIdPrefix}-relative-start-year`}
                            required={unsureOfSpecificYear}
                            placeholder={`Select Start Year`}
                        />
                        <ComboBox
                            label={`End Year`}
                            className={classNames['wc-DateDetails--dayAndMonthPicker']}
                            options={yearDropdownOptions}
                            onChange={(_, item) => {
                                trackFieldChanged(`${testIdPrefix}-relative-end-year`);
                                onChangeRelativePeriod(item.key, 'relativeEnd');
                            }}
                            selectedKey={relativeEnd}
                            useComboBoxAsMenuWidth
                            data-testid={`${testIdPrefix}-relative-end-year`}
                            required={unsureOfSpecificYear}
                            placeholder={`Select End Year`}
                        />
                    </Stack>
                </>
            )}
            {pageType === DateDetailsFormType.CondtionStart && <Separator />}
        </Stack>
    );
};

export default DateDetails;

export enum DateDetailsFormType {
    CondtionStart,
    ConditionEnd,
    Immunization,
}

const DateDetailsText = {
    [DateDetailsFormType.CondtionStart]: {
        specificYear: 'What year did this condition start?',
        timeframe: 'Between what years did this condition begin?',
        testIdPrefix: 'condition-start',
    },
    [DateDetailsFormType.ConditionEnd]: {
        specificYear: 'What year did this condition end?',
        timeframe: 'Between what years did this condition end?',
        testIdPrefix: 'condition-end',
    },
    [DateDetailsFormType.Immunization]: {
        specificYear: 'When was this immunization received?',
        timeframe: 'Between what years was this immunization received?',
        testIdPrefix: 'immunization',
    },
};
