import { DefaultButton, Image, Modal, PrimaryButton, Stack, Text } from '@fluentui/react';
import React from 'react';
import { useNavigate } from 'react-router';
import RouterConfig from 'src/app/RouterConfig';
import NoteParsingHeaderLogo from 'src/assets/Annotations/NoteParsingHeaderLogo.png';
import { Header } from 'src/common/components';
import Accordion from 'src/common/components/Accordion/Accordion';
import { capitalizeFirstLetter } from 'src/common/helpers/textFormatting';
import {
    AnnotationParseResponse,
    useAddMedicationMutation,
    useCreateAllergyMutation,
    useCreateConditionOccurrenceMutation,
    useCreateImmunizationMutation,
} from 'src/graphQL/serverMocks/graphQLGeneratedCode';
import { getClassNames } from './NoteParsingResultModal.classNames';
import NoteParsingResultListItem from './NoteParsingResultListItem';
import { ERROR_MESSAGES } from 'src/app/Strings';
import { useFeedbackService } from 'src/services/FeedbackService';
import { removeTypename } from 'src/utils/utils';

interface INoteParsingResultsModalProps {
    noteId: string;
    noteParsingResult: AnnotationParseResponse;
}

interface IUserSelections {
    allergies: boolean[];
    conditions: boolean[];
    immunizations: boolean[];
    medications: boolean[];
}

const NoteParsingResultModal: React.FC<INoteParsingResultsModalProps> = ({ noteId, noteParsingResult }) => {
    const classNames = getClassNames();
    const navigate = useNavigate();
    const { setErrorToast } = useFeedbackService();

    const [userSelections, setUserSelections] = React.useState<IUserSelections>({
        allergies: Array(noteParsingResult.allergies?.length).fill(true),
        conditions: Array(noteParsingResult.conditions?.length).fill(true),
        immunizations: Array(noteParsingResult.immunizations?.length).fill(true),
        medications: Array(noteParsingResult.medications?.length).fill(true),
    });

    const [createAllergy] = useCreateAllergyMutation({
        refetchQueries: ['GetAllergies'],
        onCompleted: (data) => {
            console.info('Created allergy with id:', data.allergyCreate.result.id);
        },
        onError: (error) => {
            console.error('Error creating allergy', error);
            setErrorToast(ERROR_MESSAGES.GENERIC_ERROR);
        },
    });

    const [createCondition] = useCreateConditionOccurrenceMutation({
        refetchQueries: ['GetCareRecipientConditions'],
        onCompleted: (data) => {
            console.info('Created condition with id:', data.conditionOccurrenceCreate.result.id);
        },
        onError: (error) => {
            console.error('Error creating condition', error);
            setErrorToast(ERROR_MESSAGES.GENERIC_ERROR);
        },
    });

    const [createImmunization] = useCreateImmunizationMutation({
        refetchQueries: ['GetImmunizations'],
        onCompleted: (data) => {
            console.info('Created immunization with id:', data.immunizationCreate.result.id);
        },
        onError: (error) => {
            console.error('Error creating immunization', error);
            setErrorToast(ERROR_MESSAGES.GENERIC_ERROR);
        },
    });

    const [createMedication] = useAddMedicationMutation({
        refetchQueries: [
            'GetMedication',
            'GetProviders',
            'GetPharmacies',
            'GetPrescriptionsWithSchedule',
            'GetCareRecipientConditions',
        ],
        onCompleted: (data) => {
            console.info('Created medication with id:', data.medicationPrescriptionCreate.result.id);
        },
        onError: (error) => {
            console.error('Error creating medication', error);
            setErrorToast(ERROR_MESSAGES.GENERIC_ERROR);
        },
    });

    const createAllergies = async () => {
        for (const [index, isChecked] of userSelections.allergies.entries()) {
            if (!isChecked) {
                continue;
            }

            const allergy = removeTypename(noteParsingResult.allergies[index]);
            await createAllergy({ variables: { input: allergy } });
        }
    };

    const createConditions = async () => {
        for (const [index, isChecked] of userSelections.conditions.entries()) {
            if (!isChecked) {
                continue;
            }

            const condition = removeTypename(noteParsingResult.conditions[index]);
            await createCondition({ variables: { input: condition } });
        }
    };

    const createImmunizations = async () => {
        for (const [index, isChecked] of userSelections.immunizations.entries()) {
            if (!isChecked) {
                continue;
            }

            const immunization = removeTypename(noteParsingResult.immunizations[index]);
            await createImmunization({ variables: immunization });
        }
    };

    const createMedications = async () => {
        for (const [index, isChecked] of userSelections.medications.entries()) {
            if (!isChecked) {
                continue;
            }

            const medication = removeTypename(noteParsingResult.medications[index]);
            await createMedication({ variables: { prescription: medication } });
        }
    };

    const createObjects = async () => {
        await createAllergies();
        await createConditions();
        await createImmunizations();
        await createMedications();
    };

    const finish = async () => {
        await createObjects();
        navigate(RouterConfig.Annotation(noteId));
    };

    const allergies = noteParsingResult.allergies?.length ? (
        <Stack className={classNames['wc-NoteParsingResultModal--resultCategory']}>
            <Accordion collapsed={false} onToggle={() => {}} header={<Header text="Allergies" />}>
                <Stack>
                    {noteParsingResult.allergies.map((allergy, index) => {
                        return (
                            <NoteParsingResultListItem
                                key={allergy.allergen?.name}
                                name={capitalizeFirstLetter(allergy.allergen?.name)}
                                isChecked={userSelections.allergies[index]}
                                onChange={(isChecked) => {
                                    const updatedAllergies = [...userSelections.allergies];
                                    updatedAllergies[index] = isChecked;
                                    const updatedUserSelections = { ...userSelections, allergies: updatedAllergies };
                                    setUserSelections(updatedUserSelections);
                                }}
                            />
                        );
                    })}
                </Stack>
            </Accordion>
        </Stack>
    ) : null;

    const conditions = noteParsingResult.conditions?.length ? (
        <Stack className={classNames['wc-NoteParsingResultModal--resultCategory']}>
            <Accordion collapsed={false} onToggle={() => {}} header={<Header text="Conditions" />}>
                <Stack>
                    {noteParsingResult.conditions.map((condition, index) => {
                        return (
                            <NoteParsingResultListItem
                                key={condition.condition?.name}
                                name={capitalizeFirstLetter(condition.condition?.name)}
                                isChecked={userSelections.conditions[index]}
                                onChange={(isChecked) => {
                                    const updatedConditions = [...userSelections.conditions];
                                    updatedConditions[index] = isChecked;
                                    const updatedUserSelections = { ...userSelections, conditions: updatedConditions };
                                    setUserSelections(updatedUserSelections);
                                }}
                            />
                        );
                    })}
                </Stack>
            </Accordion>
        </Stack>
    ) : null;

    const immunizations = noteParsingResult.immunizations?.length ? (
        <Stack className={classNames['wc-NoteParsingResultModal--resultCategory']}>
            <Accordion collapsed={false} onToggle={() => {}} header={<Header text="Immunizations" />}>
                <Stack>
                    {noteParsingResult.immunizations.map((immunization, index) => {
                        return (
                            <NoteParsingResultListItem
                                key={immunization.vaccineProductAdministered?.name}
                                name={capitalizeFirstLetter(immunization.vaccineProductAdministered?.name)}
                                isChecked={userSelections.immunizations[index]}
                                onChange={(isChecked) => {
                                    const updatedImmunizations = [...userSelections.immunizations];
                                    updatedImmunizations[index] = isChecked;
                                    const updatedUserSelections = {
                                        ...userSelections,
                                        immunizations: updatedImmunizations,
                                    };
                                    setUserSelections(updatedUserSelections);
                                }}
                            />
                        );
                    })}
                </Stack>
            </Accordion>
        </Stack>
    ) : null;

    const medications = noteParsingResult.medications?.length ? (
        <Stack className={classNames['wc-NoteParsingResultModal--resultCategory']}>
            <Accordion collapsed={false} onToggle={() => {}} header={<Header text="Medications" />}>
                <Stack>
                    {noteParsingResult.medications.map((medication, index) => {
                        return (
                            <NoteParsingResultListItem
                                key={medication.medication?.name}
                                name={capitalizeFirstLetter(medication.medication?.name)}
                                isChecked={userSelections.medications[index]}
                                onChange={(isChecked) => {
                                    const updatedMedications = [...userSelections.medications];
                                    updatedMedications[index] = isChecked;
                                    const updatedUserSelections = {
                                        ...userSelections,
                                        medications: updatedMedications,
                                    };
                                    setUserSelections(updatedUserSelections);
                                }}
                            />
                        );
                    })}
                </Stack>
            </Accordion>
        </Stack>
    ) : null;

    return (
        <Modal isOpen={noteParsingResult !== undefined}>
            <Stack horizontalAlign="center" className={classNames['wc-NoteParsingResultModal--container']}>
                <Image src={NoteParsingHeaderLogo} width={200} height={200} />
                <Text variant="xLarge">Add these to Health History?</Text>
                {allergies ?? allergies}
                {conditions ?? conditions}
                {immunizations ?? immunizations}
                {medications ?? medications}
                <Stack horizontal horizontalAlign="center" tokens={{ childrenGap: 15 }}>
                    <DefaultButton text="Not Now" onClick={() => finish()} />
                    <PrimaryButton type="submit" text="Confirm" onClick={() => finish()} />
                </Stack>
            </Stack>
        </Modal>
    );
};

export default NoteParsingResultModal;
