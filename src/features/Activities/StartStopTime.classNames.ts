import { mergeStyleSets } from '@fluentui/react';

interface IOptionalContainerClassNames {
    'wc-StartStopTime--container': string;
    'wc-StartStopTime--startTime': string;
    'wc-StartStopTime--stopTime': string;
    'wc-StartStopTime--optionalButton': string;
    'wc-StartStopTime--stopTimeButton': string;
    'wc-StartStopTime--stopTimeContainer': string;
    'wc-StartStopTime--timeContainer': string;
}

export const getClassNames = (): IOptionalContainerClassNames => {
    return mergeStyleSets({
        'wc-StartStopTime--container': {
            alignItems: 'start',
            width: '100%',
        },
        'wc-StartStopTime--startTime': {
            width: '100%',
            paddingBottom: '8px',
        },
        'wc-StartStopTime--stopTime': {
            width: '100%',
        },
        'wc-StartStopTime--optionalButton': {
            marginTop: 30,
        },
        'wc-StartStopTime--stopTimeButton': {
            border: 'none',
            paddingLeft: '0px',
        },
        'wc-StartStopTime--stopTimeContainer': {
            alignItems: 'center',
        },
        'wc-StartStopTime--timeContainer': {
            width: '100%',
        },
    });
};
