export const mockUnit1 = 'Mock Unit 1';
export const mockUnit2 = 'Mock Unit 2';
export const mockUnit3 = 'Mock Unit 3';
export const mockStrength1 = '1';
export const mockStrength2 = '2';
export const mockStrength3 = '3';

export const DispensableDrugsResponsePayload = () => ({
    result: {
        items: [
            {
                medStrength: mockStrength1,
                medStrengthUnit: mockUnit1,
            },
            {
                medStrength: mockStrength2,
                medStrengthUnit: mockUnit2,
            },
            {
                medStrength: mockStrength3,
                medStrengthUnit: mockUnit3,
            },
        ],
    },
});
