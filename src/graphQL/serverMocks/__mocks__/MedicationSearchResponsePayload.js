export const mockId1 = 1;
export const mockId2 = 2;
export const mockId3 = 3;
export const mockMedication1 = 'B Mock Medication';
export const mockMedication2 = 'A Mock Medication';
export const mockMedication3 = 'C Mock Medication';
export const mockRouteDesc1 = 'Route 1';
export const mockRouteDesc2 = 'Route 2';
export const mockRouteDesc3 = 'Route 3';
export const mockDoseForm1 = 'Dose Form 1';
export const mockDoseForm2 = 'Dose Form 2';
export const mockDoseForm3 = 'Dose Form 3';

export const MedicationSearchResponsePayload = () => ({
    result: {
        items: [
            {
                drugNameDesc: mockMedication1,
                routeDesc: mockRouteDesc1,
                doseFormDesc: mockDoseForm1,
                routedDoseFormDrugID: mockId1,
            },
            {
                drugNameDesc: mockMedication2,
                routeDesc: mockRouteDesc2,
                doseFormDesc: mockDoseForm2,
                routedDoseFormDrugID: mockId2,
            },
            {
                drugNameDesc: mockMedication3,
                routeDesc: mockRouteDesc2,
                doseFormDesc: mockDoseForm2,
                routedDoseFormDrugID: mockId3,
            },
        ],
    },
});
