import { FontWeights, mergeStyleSets } from '@fluentui/react';

interface IEmergencyContactTitleListClassNames {
    'wc-EmergencyContactsList--emergencyContactTitle': string;
}

export const getClassNames = (): IEmergencyContactTitleListClassNames => {
    return mergeStyleSets({
        'wc-EmergencyContactsList--emergencyContactTitle': {
            fontWeight: FontWeights.semibold,
            fontSize: '1rem',
        },
    });
};
