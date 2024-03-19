import React from 'react';

import { Label, Stack, Separator } from '@fluentui/react';
import { FormikProps } from 'formik';

import ConditionSearch from 'src/common/components/AutoCompleteSearch/ConditionSearch/ConditionSearch';
import { DateDetails, DateDetailsFormType } from '../DateDetails';
import { StatusRadioButtonGroup } from '../StatusRadioButtonGroup';
import { getClassNames } from './ConditionForm.classNames';

export interface Condition {
    conditionName: string;
    icd10Code: string;
}

export interface ConditionDateSpecifics {
    year: number;
    day: number;
    month: number;
    unsureOfSpecificYear: boolean;
    relativeStart?: number;
    relativeEnd?: number;
}

export interface ConditionProps {
    condition: Condition;
    isCurrentlyActive: boolean;
    conditionEnded: ConditionDateSpecifics;
    conditionStarted: ConditionDateSpecifics;
}

interface IConditionFormProps {
    formik?: FormikProps<ConditionProps>;
    conditionName?: string;
}

const createUnsureDateText = (isStart) => {
    return { trueText: `I know when this condition ${isStart ? 'started' : 'ended'}`, falseText: 'General timeframe' };
};

export const conditionStartedButtonText = createUnsureDateText(true);
const conditionEndedButtonText = createUnsureDateText(false);

export const conditionRadioButtonText = { trueText: 'Active', falseText: 'No longer experiencing this condition' };

const ConditionForm: React.FC<IConditionFormProps> = ({ formik, conditionName = '' }) => {
    const classNames = getClassNames();

    return (
        <Stack tokens={{ childrenGap: 23 }}>
            {conditionName ? (
                <div className={classNames['wc-ConditionForm--conditionNameContainer']}>
                    <div className={classNames['wc-ConditionForm--conditionName']}>{conditionName}</div>
                </div>
            ) : (
                <Stack>
                    <Label required>Condition</Label>
                    <ConditionSearch formik={formik} aria-label="Condition Search" />
                </Stack>
            )}
            <StatusRadioButtonGroup
                value={formik.values.isCurrentlyActive}
                radioButtonText={conditionRadioButtonText}
                clearFormikFields={() => {
                    formik.setFieldValue('conditionEnded.year', null);
                    formik.setFieldValue('conditionEnded.day', null);
                    formik.setFieldValue('conditionEnded.month', null);
                    formik.setFieldValue('conditionEnded.relativeStart', null);
                    formik.setFieldValue('conditionEnded.relativeEnd', null);
                }}
                onChange={(value) => {
                    formik.setFieldValue('isCurrentlyActive', value);
                }}
                testId={'condition-status'}
                showStatusLabel
            />
            <Separator className={classNames['wc-ConditionForm--separator']} />

            {!formik.values.isCurrentlyActive && (
                <DateDetails
                    onChangeYear={(value) => formik.setFieldValue('conditionEnded.year', value)}
                    onChangeMonth={(value) => formik.setFieldValue('conditionEnded.month', value)}
                    onChangeDay={(value) => formik.setFieldValue('conditionEnded.day', value)}
                    onChangeUnsureStatus={(value) => {
                        formik.setFieldValue('conditionEnded.unsureOfSpecificYear', value);
                        if (value) {
                            formik.setFieldValue('conditionEnded.year', null);
                            formik.setFieldValue('conditionEnded.day', null);
                            formik.setFieldValue('conditionEnded.month', null);
                        }
                    }}
                    onChangeRelativePeriod={(value, timeframe) =>
                        formik.setFieldValue(`conditionEnded.${timeframe}`, value)
                    }
                    dateDetails={formik.values.conditionEnded}
                    radioButtonText={conditionEndedButtonText}
                    pageType={DateDetailsFormType.ConditionEnd}
                />
            )}
            <DateDetails
                onChangeYear={(value) => formik.setFieldValue('conditionStarted.year', value)}
                onChangeMonth={(value) => formik.setFieldValue('conditionStarted.month', value)}
                onChangeDay={(value) => formik.setFieldValue('conditionStarted.day', value)}
                onChangeUnsureStatus={(value) => {
                    formik.setFieldValue('conditionStarted.unsureOfSpecificYear', value);
                    if (value) {
                        formik.setFieldValue('conditionStarted.year', null);
                        formik.setFieldValue('conditionStarted.day', null);
                        formik.setFieldValue('conditionStarted.month', null);
                    }
                }}
                onChangeRelativePeriod={(value, timeframe) =>
                    formik.setFieldValue(`conditionStarted.${timeframe}`, value)
                }
                dateDetails={formik.values.conditionStarted}
                radioButtonText={conditionStartedButtonText}
                pageType={DateDetailsFormType.CondtionStart}
            />
        </Stack>
    );
};

export default ConditionForm;
