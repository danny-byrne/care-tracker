import { Roles } from '../graphQLGeneratedCode';

export const mockCircle = 'Mock Circle';
export const mockName = 'Mock Name';
export const mockId = 1;
export const mockImage = 'mock image';
export const mockMobile = '555-555-5555';
export const mockEmail = 'mock@test.com';
export const dateTimeMock = '2022-09-14T17:02:32.864Z';

export const UserProfileSummary = () => ({
    id: mockId,
    careCircleName: mockCircle,
    role: Roles.Owner,
    careCircleId: mockId,
    imageBase64: mockImage,
    displayName: mockName,
    mobile: mockMobile,
    email: mockEmail,
    refillRemindersNotificationsEnabled: true,
    dailyMedicationDosesNotificationsEnabled: true,
    calendarAppointmentsNotificationsEnabled: true,
    postsReactionsRepliesNotificationsEnabled: true,
    activitySignUpsNotificationsEnabled: true,
    newMemberJoinsNotificationsEnabled: true,
    agreesHasConsentToManageLoveOnesHealth: dateTimeMock,
    agreesToTermsAndPrivacy: dateTimeMock,
    understandsIntendedAppUse: dateTimeMock,
    understandsMicrosoftUseOfTheirData: dateTimeMock,
    understandsNotPermittedToUsePlatformForMinors: dateTimeMock,
    agreesToOpenAiUse: dateTimeMock,
});
