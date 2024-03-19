import React from 'react';
import { Stack, Image, DocumentCard } from '@fluentui/react';
import { useNavigate } from 'react-router-dom';

import { trackClick } from 'src/wcpConsentInit';
import defaultMedication from 'src/assets/MedicationPage/defaultMedication.jpg';
import RouterConfig from 'src/app/RouterConfig';
import { getClassNames } from './ConditionMedicationListItem.classNames';
interface MedDisplayProps {
    prescription: {
        medication: {
            name: string;
        };
        strengthValue: string;
        id: string;
    };
}

const MedicationListItemView: React.FC<MedDisplayProps> = ({ prescription }) => {
    const navigate = useNavigate();
    const classNames = getClassNames();

    const MedicationInfo = () => {
        return (
            <Stack className={classNames['wc-ConditionMedicationListItem--firstSection']}>
                <Stack tokens={{ childrenGap: 16 }} horizontal>
                    <Stack>
                        <Image alt="Medication picture" width={70} height={70} src={defaultMedication} />
                    </Stack>
                    <Stack
                        className={classNames['wc-ConditionMedicationListItem--itemContent']}
                        tokens={{ childrenGap: 4 }}
                    >
                        <Stack
                            horizontal
                            className={classNames['wc-ConditionMedicationListItem--itemHeader']}
                            tokens={{ childrenGap: 8 }}
                        >
                            <div
                                className={classNames['wc-ConditionMedicationListItem--medicationName']}
                                data-testid={'med-name-' + prescription.id}
                            >
                                {prescription.medication.name}
                            </div>
                            <div data-testid={'med-strength-' + prescription.id}>{prescription.strengthValue}</div>
                        </Stack>
                    </Stack>
                </Stack>
            </Stack>
        );
    };

    return (
        <div
            className={classNames['wc-ConditionMedicationListItem--itemCell']}
            data-testid="medication-item"
            data-is-focusable
            onClick={() => {
                trackClick('medication-item');
                () => navigate(RouterConfig.Medication(prescription.id));
            }}
        >
            <DocumentCard className={classNames['wc-ConditionMedicationListItem--medicationCard']}>
                <Stack
                    horizontal
                    className={classNames['wc-ConditionMedicationListItem--container']}
                    tokens={{ childrenGap: 16 }}
                >
                    <MedicationInfo />
                </Stack>
            </DocumentCard>
        </div>
    );
};

export default MedicationListItemView;
