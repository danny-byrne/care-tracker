import { useGetCareRecipientProfileQuery } from 'src/graphQL/serverMocks/graphQLGeneratedCode';
import React, { useEffect, useState } from 'react';
import { ChoiceGroup, IChoiceGroupOption, Stack, Text } from '@fluentui/react';
import { PillChoice } from 'src/common/components/Wizard/Pills';

import { getClassNames } from './ConditionWizard.className';

import { EndDateTimeFrame, TimeFrame } from './timeFrameEnums';

import { IConditionWizardFormikProps, IConditionWizardPageProps } from './ConditionWizard';
import { getKeyByValue } from 'src/utils/objects';
import { getAvailableEndDates } from './utils/timeFrameUtils';
import ChoiceGroupButton from 'src/common/components/ChoiceGroupButton';
import { FormikProps } from 'formik';

const stillExperiencingOptions: IChoiceGroupOption[] = [
    {
        key: 'yes',
        text: 'Yes',
        styles: { choiceFieldWrapper: { width: '100%' } },
        onRenderField: (props) => {
            return ChoiceGroupButton(props);
        },
    },
    {
        key: 'no',
        text: 'No',
        styles: { choiceFieldWrapper: { width: '100%' } },
        onRenderField: (props) => {
            return ChoiceGroupButton(props);
        },
    },
];

export const StillExperiencingWizardPage: React.FC<IConditionWizardPageProps> = ({ formik, setNextButtonEnabled }) => {
    const { data } = useGetCareRecipientProfileQuery({});
    const classNames = getClassNames();
    const [selectedKey, setSelectedKey] = useState(formik.values.isCurrent ? 'yes' : 'no');
    const availableEndTimeFrames = getAvailableEndDates(TimeFrame[formik.values.timeFrame]);

    const [recipientName, setRecipientName] = useState('');

    useEffect(() => {
        setNextButtonEnabled(true);
    }, []);

    useEffect(() => {
        const nextButtonEnabled =
            formik.values.isCurrent ||
            (formik.values.endTimeFrame === null && availableEndTimeFrames.length === 0) ||
            formik.values.endTimeFrame !== null;
        setNextButtonEnabled(nextButtonEnabled);
    }, [formik.values.isCurrent, formik.values.endTimeFrame, availableEndTimeFrames]);

    useEffect(() => {
        if (data) {
            setRecipientName(data.careRecipientProfile?.firstName);
        }
    }, [data]);

    const _onChange = (ev, option) => {
        setSelectedKey(option.key);
        formik.setFieldValue('isCurrent', option.key === 'yes');
    };

    const endTimeFramesShown = selectedKey === 'no' && availableEndTimeFrames.length > 0;

    return (
        <Stack className={classNames['wc-ConditionWizard--conditionPageContainer']}>
            <Text className={classNames['wc-ConditionWizard--conditionHeaderName']}>
                {formik.values.condition.conditionName}
            </Text>
            <Text className={classNames['wc-ConditionWizard--conditionHeaderText']}>
                {`Is ${recipientName} still experiencing this?`}
            </Text>
            <ChoiceGroup
                styles={{ root: { width: '100%', padding: '12px 0px' } }}
                options={stillExperiencingOptions}
                onChange={_onChange}
                selectedKey={selectedKey}
            />
            {endTimeFramesShown && (
                <EndTimeFrameSection availableEndTimeFrames={availableEndTimeFrames} formik={formik} />
            )}
        </Stack>
    );
};

interface IEndTimeFrameSectionProps {
    availableEndTimeFrames: EndDateTimeFrame[];
    formik: FormikProps<IConditionWizardFormikProps>;
}

const EndTimeFrameSection: React.FC<IEndTimeFrameSectionProps> = ({ availableEndTimeFrames, formik }) => {
    const classNames = getClassNames();

    return (
        <Stack tokens={{ childrenGap: '16px' }}>
            <Text className={classNames['wc-ConditionWizard--conditionHeaderText']}>
                How long did this condition last?
            </Text>
            <Text>Tap to select:</Text>
            <Stack horizontal wrap tokens={{ childrenGap: '8px' }}>
                {availableEndTimeFrames.map((timeFrame) => {
                    const key = getKeyByValue(EndDateTimeFrame, timeFrame);
                    return (
                        <PillChoice
                            key={key}
                            isSelected={EndDateTimeFrame[formik.values.endTimeFrame] === timeFrame}
                            pillText={timeFrame}
                            onClickSelected={() => {
                                formik.setFieldValue('endTimeFrame', null);
                            }}
                            onClickDefault={() => {
                                formik.setFieldValue('endTimeFrame', key);
                            }}
                        />
                    );
                })}
            </Stack>
        </Stack>
    );
};
