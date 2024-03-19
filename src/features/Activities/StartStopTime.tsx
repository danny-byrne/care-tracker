import React from 'react';
import { FormikProps } from 'formik';
import { Stack, DefaultButton, Icon, ComboBox } from '@fluentui/react';

// TODO: Move this outside of schedule
import { OptionalContainer } from '../Medications/Schedule';
import { getClassNames } from './StartStopTime.classNames';
import { trackClick, trackFieldChanged } from 'src/wcpConsentInit';
import { timesDropDownOptions } from 'src/utils/utils';

interface StartStopTimeProps {
    formik: FormikProps<{
        activity: {
            availability?: {
                startTime?: string;
                stopTime?: string;
            };
        };
    }>;
}

const StartStopTime: React.FC<StartStopTimeProps> = (props) => {
    const classNames = getClassNames();
    const { formik } = props;
    const [stopTimeHidden, setStopTimeHidden] = React.useState(
        formik.values.activity.availability?.stopTime === undefined,
    );

    const startTime = formik.values.activity.availability?.startTime;
    const stopTime = formik.values.activity.availability?.stopTime;

    const optionalStyles = {
        dismissButton: {
            marginTop: 30,
        },
        container: {
            width: '100%',
            padding: 0,
        },
    };

    React.useEffect(() => {
        formik.setFieldValue('activity.availability.startTime', startTime);
        formik.setFieldValue('activity.availability.stopTime', stopTime);
    }, [startTime, stopTime]);

    return (
        <Stack className={classNames['wc-StartStopTime--container']} tokens={{ childrenGap: 24 }}>
            <ComboBox
                id={`startTime`}
                label="Start Time"
                className={classNames['wc-StartStopTime--timeContainer']}
                selectedKey={formik.values.activity.availability?.startTime}
                onChange={(_, item) => {
                    trackFieldChanged('start-time');
                    formik.setFieldValue(`activity.availability.startTime`, item.key);
                }}
                placeholder="Select time"
                options={timesDropDownOptions}
                useComboBoxAsMenuWidth
            />
            {stopTimeHidden && (
                <DefaultButton
                    data-testid={'stop-time'}
                    onClick={() => {
                        trackClick('stop-time');
                        setStopTimeHidden(false);
                        formik.setFieldValue('activity.availability.stopTime', undefined);
                    }}
                    className={classNames['wc-StartStopTime--stopTimeButton']}
                >
                    <Stack horizontal className={classNames['wc-StartStopTime--stopTimeContainer']}>
                        <Icon iconName="CirclePlus" /> &nbsp; Add Stop Time
                    </Stack>
                </DefaultButton>
            )}
            {!stopTimeHidden && (
                <OptionalContainer
                    test-dataid="optional-container"
                    styles={optionalStyles}
                    onDismiss={function (): void {
                        trackClick('optional-container');
                        setStopTimeHidden(true);
                        formik.setFieldValue('stopDate', undefined);
                    }}
                >
                    <ComboBox
                        id={`stopTime`}
                        label="Stop Time"
                        className={classNames['wc-StartStopTime--timeContainer']}
                        selectedKey={formik.values.activity.availability?.stopTime}
                        onChange={(_, item) => {
                            trackFieldChanged('stop-time');
                            formik.setFieldValue(`activity.availability.stopTime`, item.key);
                        }}
                        placeholder="Select time"
                        options={timesDropDownOptions}
                        useComboBoxAsMenuWidth
                    />
                </OptionalContainer>
            )}
        </Stack>
    );
};

export default StartStopTime;
