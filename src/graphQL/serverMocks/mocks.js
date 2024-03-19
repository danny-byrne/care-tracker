import { CareRecipientMedicationPrescriptions } from './__mocks__/CareRecipientMedicationPrescriptions';
import { Refill } from './__mocks__/Refill';
import { UserProfileSummary } from './__mocks__/UserProfileSummary';
import { MedicationSearchResponsePayload } from './__mocks__/MedicationSearchResponsePayload';
import { DispensableDrugsResponsePayload } from './__mocks__/DispensableDrugsResponsePayload';
import { CareCircle } from './__mocks__/CareCircle';

// Mocks for primitives (e.g. string) or custom types (e.g. AppInvitation) can be defined here
// If a custom type does not have a mock definition, it will default to the primitive default value
export const serverMocks = {
    succeeded: () => true,
    UUID: () => 123456,
    String: () => 'test',
    AppInvitation: () => ({
        inviteFromName: 'Mock Inviter',
        careCircleName: 'Mock Care Circle',
    }),
    CareCircle,
    CareRecipientMedicationPrescriptions,
    Refill,
    UserProfileSummary,
    MedicationSearchResponsePayload,
    DispensableDrugsResponsePayload,
};
