export const mockId1 = 1;
export const mockId2 = 2;
export const mockId3 = 3;
export const mockStrength1 = '1';
export const mockStrength2 = '2';
export const mockCondition1 = 'B Mock Condition';
export const mockMedication1 = 'B Mock Medication';
export const mockCondition2 = 'A Mock Condition';
export const mockMedication2 = 'A Mock Medication';
export const mockCondition3 = 'C Mock Condition';
export const mockMedication3 = 'C Mock Medication';
export const mockRefillDate1 = '2020-05-01';
export const mockRefillDate2 = '2020-07-02';

export const CareRecipientMedicationPrescriptions = () => ({
    prescriptions: [
        {
            id: mockId1,
            strengthValue: '1',
            takenFor: {
                id: mockId1,
                condition: {
                    name: mockCondition1,
                },
            },
            medication: {
                id: mockId1,
                name: mockMedication1,
            },
            overTheCounter: false,
            schedules: [
                {
                    id: '21946843-cc8f-4449-b420-aed06236448b',
                    scheduleBlocks: [{ dosageValue: '1', timeOfDayUtc: '7:00AM', __typename: 'ScheduleBlock' }],
                    scheduleEndDate: null,
                    scheduleFrequency: 'EVERYDAY',
                    scheduleInterval: null,
                    scheduleStartDate: '2022-05-11T07:00:00.000Z',
                },
            ],
        },
        {
            id: mockId2,
            strengthValue: mockStrength2,
            takenFor: {
                id: mockId2,
                condition: {
                    name: mockCondition2,
                },
            },
            medication: {
                id: mockId2,
                name: mockMedication2,
            },
            overTheCounter: true,
            schedules: [
                {
                    id: '21946843-cc8f-4449-b420-aed06236448b',
                    scheduleBlocks: [{ dosageValue: '1', timeOfDayUtc: '7:00AM', __typename: 'ScheduleBlock' }],
                    scheduleEndDate: null,
                    scheduleFrequency: 'EVERYDAY',
                    scheduleInterval: null,
                    scheduleStartDate: '2022-05-11T07:00:00.000Z',
                },
            ],
        },
        {
            id: mockId3,
            strengthValue: mockStrength2,
            takenFor: {
                id: mockId3,
                condition: {
                    name: mockCondition3,
                },
            },
            medication: {
                id: mockId3,
                name: mockMedication3,
            },
            overTheCounter: true,
            schedules: [
                {
                    id: '21946843-cc8f-4449-b420-aed06236448b',
                    scheduleBlocks: [{ dosageValue: '1', timeOfDayUtc: '7:00AM', __typename: 'ScheduleBlock' }],
                    scheduleEndDate: null,
                    scheduleFrequency: 'EVERYDAY',
                    scheduleInterval: null,
                    scheduleStartDate: '2022-05-11T07:00:00.000Z',
                },
            ],
        },
    ],
});
