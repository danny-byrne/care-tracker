import { Stack, Text, Spinner, Separator, DocumentCard } from '@fluentui/react';
import React from 'react';
import { getClassNames } from './CareRecipient.classNames';
import { MeasurementSystem, useGetCareRecipientProfileQuery } from 'src/graphQL/serverMocks/graphQLGeneratedCode';
import { useFeedbackService } from 'src/services/FeedbackService';
import { convertToFeet, convertToInches, kilogramsToPounds } from './CareRecipientUtils';

interface IMedicalIDComponentProps {
    label: string;
    className: any;
    value: string;
    value2?: string;
}

const MedicalIDComponent: React.FC<IMedicalIDComponentProps> = ({ label, className, value }) => {
    const classNames = getClassNames();

    return (
        <Stack data-testid={'careRecipient-' + label}>
            <Text className={classNames['wc-CareRecipientMedicalID--Heading']}>{label}</Text>
            {value != null && <Text className={classNames[className]}>{value}</Text>}
        </Stack>
    );
};

const CareRecipientMedicalID = () => {
    const { setErrorToast } = useFeedbackService();
    const classNames = getClassNames();
    const { data, loading } = useGetCareRecipientProfileQuery({
        onError: (error) => {
            setErrorToast(error.message);
        },
    });

    const dataProfile = data?.careRecipientProfile;

    const bloodType = dataProfile?.bloodType;
    const parsed = bloodType?.split('_');
    const bloodTypeChar = () => {
        if (parsed?.[1] === 'POS') {
            return '+';
        }
        if (parsed?.[1] === 'NEG') {
            return '-';
        }
        return '';
    };

    const imperial = dataProfile?.measurementSystemPreference === MeasurementSystem.Imperial;
    const inches = Number(convertToInches(dataProfile?.height));
    const feet = Number(convertToFeet(dataProfile?.height));
    const heightString = imperial
        ? String(feet) + "' " + String(inches) + '"'
        : String(dataProfile?.height / 100) + ' m';

    const weightString = imperial
        ? String((Number(dataProfile?.weight) * kilogramsToPounds).toFixed(0)) + ' lbs'
        : String(dataProfile?.weight) + ' kg';

    return (
        <>
            {loading && <Spinner />}
            {!loading && (
                <>
                    <Text className={classNames['wc-CareRecipient--SecondaryDetails']}>Medical ID</Text>
                    <DocumentCard className={classNames['wc-CareRecipientCard--Card']}>
                        <Stack horizontal horizontalAlign="space-evenly">
                            <MedicalIDComponent
                                label="Blood Type"
                                className={
                                    dataProfile?.bloodType
                                        ? 'wc-CareRecipientMedicalID--Detail'
                                        : 'wc-CareRecipientMedicalID--Empty'
                                }
                                value={dataProfile?.bloodType ? parsed?.[0] + bloodTypeChar() : 'Not Set'}
                            />
                            <Separator vertical className={classNames['wc-CareRecipientMedicalID--Separator']} />

                            <MedicalIDComponent
                                label="Height"
                                className={
                                    dataProfile?.height && dataProfile?.height !== 0
                                        ? 'wc-CareRecipientMedicalID--Detail'
                                        : 'wc-CareRecipientMedicalID--Empty'
                                }
                                value={dataProfile?.height && dataProfile?.height !== 0 ? heightString : 'Not Set'}
                            />
                            <Separator vertical className={classNames['wc-CareRecipientMedicalID--Separator']} />

                            <MedicalIDComponent
                                label="Weight"
                                className={
                                    dataProfile?.weight
                                        ? 'wc-CareRecipientMedicalID--Detail'
                                        : 'wc-CareRecipientMedicalID--Empty'
                                }
                                value={dataProfile?.weight ? weightString : 'Not Set'}
                            />
                        </Stack>
                    </DocumentCard>
                </>
            )}
        </>
    );
};

export default CareRecipientMedicalID;
