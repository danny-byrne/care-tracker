import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `DateTime` scalar represents an ISO-8601 compliant date time type. */
  DateTime: any;
  /** The built-in `Decimal` scalar type. */
  Decimal: any;
  UUID: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type Activity = {
  __typename?: 'Activity';
  description?: Maybe<Scalars['String']>;
  endDateTime?: Maybe<Scalars['DateTime']>;
  id: Scalars['UUID'];
  /** Status of the careplan activity in the database. Options are Active, Deleted, and Draft. Deleted means the record is soft deleted and not visible to the user. */
  recordStatus: RecordStatus;
  recurrence?: Maybe<Scalars['String']>;
  startDateTime?: Maybe<Scalars['DateTime']>;
};

/** Delete an activity */
export type ActivityDeleteInput = {
  id: Scalars['UUID'];
};

/** Payload to return after soft deleting an activity */
export type ActivityDeletePayload = {
  __typename?: 'ActivityDeletePayload';
  result: Activity;
};

export type ActivityFilterInput = {
  and?: InputMaybe<Array<ActivityFilterInput>>;
  description?: InputMaybe<StringOperationFilterInput>;
  endDateTime?: InputMaybe<ComparableNullableOfDateTimeOperationFilterInput>;
  id?: InputMaybe<ComparableGuidOperationFilterInput>;
  or?: InputMaybe<Array<ActivityFilterInput>>;
  /** Status of the careplan activity in the database. Options are Active, Deleted, and Draft. Deleted means the record is soft deleted and not visible to the user. */
  recordStatus?: InputMaybe<RecordStatusOperationFilterInput>;
  recurrence?: InputMaybe<StringOperationFilterInput>;
  startDateTime?: InputMaybe<ComparableNullableOfDateTimeOperationFilterInput>;
};

/** Find or update an activity */
export type ActivityFindOrCreateInput = {
  description: Scalars['String'];
  endDateTime?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['UUID']>;
  recurrence: Scalars['String'];
  startDateTime?: InputMaybe<Scalars['DateTime']>;
};

export type ActivitySortInput = {
  description?: InputMaybe<SortEnumType>;
  endDateTime?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  /** Status of the careplan activity in the database. Options are Active, Deleted, and Draft. Deleted means the record is soft deleted and not visible to the user. */
  recordStatus?: InputMaybe<SortEnumType>;
  recurrence?: InputMaybe<SortEnumType>;
  startDateTime?: InputMaybe<SortEnumType>;
};

export type Address = {
  __typename?: 'Address';
  city?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  countryCode?: Maybe<Scalars['String']>;
  county?: Maybe<Scalars['String']>;
  extendedZipCode?: Maybe<Scalars['String']>;
  freeTextDisplayAddress?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
  stateName?: Maybe<Scalars['String']>;
  streetName?: Maybe<Scalars['String']>;
  streetNumber?: Maybe<Scalars['String']>;
  zipCode?: Maybe<Scalars['String']>;
};

/** Search an Address for things like Pharmacy or Provider */
export type AddressSearchInput = {
  location?: InputMaybe<GeolocationCoordinateInput>;
  searchText: Scalars['String'];
};

export type AddressSearchResponse = {
  __typename?: 'AddressSearchResponse';
  results: Array<Result>;
  summary: Summary;
};

export type AddressSearchResponsePayload = {
  __typename?: 'AddressSearchResponsePayload';
  result: AddressSearchResponse;
};

/** An allergen a care recipient has an allergy to */
export type Allergen = {
  __typename?: 'Allergen';
  /** Codes for the allergen */
  codes?: Maybe<Array<CodedConcept>>;
  id: Scalars['UUID'];
  /** Name of a allergen */
  name?: Maybe<Scalars['String']>;
};

/** An allergen a care recipient has an allergy to */
export type AllergenFilterInput = {
  and?: InputMaybe<Array<AllergenFilterInput>>;
  /** Codes for the allergen */
  codes?: InputMaybe<ListFilterInputTypeOfCodedConceptFilterInput>;
  id?: InputMaybe<ComparableGuidOperationFilterInput>;
  /** Name of a allergen */
  name?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<AllergenFilterInput>>;
};

/** FindOrCreates a Allergen on a Allergy */
export type AllergenFindOrCreate = {
  __typename?: 'AllergenFindOrCreate';
  /** DAM Concept ID of a Allergen */
  damConceptId?: Maybe<Scalars['String']>;
  /** Id of a Allergen */
  id?: Maybe<Scalars['UUID']>;
  /** Name of a Allergen */
  name?: Maybe<Scalars['String']>;
};

/** FindOrCreates a Allergen on a Allergy */
export type AllergenFindOrCreateInput = {
  /** DAM Concept ID of a Allergen */
  damConceptId?: InputMaybe<Scalars['String']>;
  /** Id of a Allergen */
  id?: InputMaybe<Scalars['UUID']>;
  /** Name of a Allergen */
  name?: InputMaybe<Scalars['String']>;
};

/** Search an allergen */
export type AllergenSearchInput = {
  /** Free text search string */
  searchText: Scalars['String'];
};

export type AllergenSearchResponse = {
  __typename?: 'AllergenSearchResponse';
  items?: Maybe<Array<AllergenSearchResult>>;
};

export type AllergenSearchResponsePayload = {
  __typename?: 'AllergenSearchResponsePayload';
  result: AllergenSearchResponse;
};

export type AllergenSearchResult = {
  __typename?: 'AllergenSearchResult';
  allergenId?: Maybe<Scalars['String']>;
  allergenName?: Maybe<Scalars['String']>;
  allergenTypeCode?: Maybe<Scalars['String']>;
};

/** An allergy a care recipient has */
export type Allergy = {
  __typename?: 'Allergy';
  /** Allergen that the allergy is for */
  allergen?: Maybe<Allergen>;
  /** Care recipient that has the allergy */
  careRecipient?: Maybe<CareRecipient>;
  /** Codes for the allergen */
  codes?: Maybe<Array<CodedConcept>>;
  id: Scalars['UUID'];
  /** Status of an allergy record in the database. Options are Active, Deleted, and Draft. Deleted means the record is soft deleted and not visible to the user. */
  recordStatus: RecordStatus;
  /** Severity of the allergy */
  severity?: Maybe<AllergySeverity>;
};

/** Create an allergy a care recipient has */
export type AllergyCreate = {
  __typename?: 'AllergyCreate';
  /** Allergen that the allergy is for */
  allergen?: Maybe<AllergenFindOrCreate>;
  /** Severity of the allergy */
  severity: AllergySeverity;
};

/** Create an allergy a care recipient has */
export type AllergyCreateInput = {
  /** Allergen that the allergy is for */
  allergen?: InputMaybe<AllergenFindOrCreateInput>;
  /** Severity of the allergy */
  severity: AllergySeverity;
};

/** Represents the payload to return after creating an Allergy */
export type AllergyCreatePayload = {
  __typename?: 'AllergyCreatePayload';
  result: Allergy;
};

/** Soft delete a Allergy */
export type AllergyDeleteInput = {
  id: Scalars['UUID'];
};

/** Payload to return after soft deleting a Allergy */
export type AllergyDeletePayload = {
  __typename?: 'AllergyDeletePayload';
  result: Allergy;
};

/** An allergy a care recipient has */
export type AllergyFilterInput = {
  /** Allergen that the allergy is for */
  allergen?: InputMaybe<AllergenFilterInput>;
  and?: InputMaybe<Array<AllergyFilterInput>>;
  /** Care recipient that has the allergy */
  careRecipient?: InputMaybe<CareRecipientFilterInput>;
  /** Codes for the allergen */
  codes?: InputMaybe<ListFilterInputTypeOfCodedConceptFilterInput>;
  id?: InputMaybe<ComparableGuidOperationFilterInput>;
  or?: InputMaybe<Array<AllergyFilterInput>>;
  /** Status of an allergy record in the database. Options are Active, Deleted, and Draft. Deleted means the record is soft deleted and not visible to the user. */
  recordStatus?: InputMaybe<RecordStatusOperationFilterInput>;
  /** Severity of the allergy */
  severity?: InputMaybe<NullableOfAllergySeverityOperationFilterInput>;
};

export enum AllergySeverity {
  Mild = 'MILD',
  Severe = 'SEVERE',
  Unknown = 'UNKNOWN'
}

/** Update an allergy a care recipient has */
export type AllergyUpdateInput = {
  /** Allergen that the allergy is for */
  allergen?: InputMaybe<AllergenFindOrCreateInput>;
  /** Id of an allergy */
  id: Scalars['UUID'];
  /** Severity of the allergy */
  severity: AllergySeverity;
};

/** Represents the payload to return after updating an Allergy */
export type AllergyUpdatePayload = {
  __typename?: 'AllergyUpdatePayload';
  result: Allergy;
};

/** An annotation a care giver has made */
export type Annotation = {
  __typename?: 'Annotation';
  /** The care recipient the annotation is for */
  careRecipient?: Maybe<CareRecipient>;
  /** The create datetime in UTC of the annotation */
  createdDateTime: Scalars['DateTime'];
  /** The creator of the annotation */
  creator?: Maybe<CareCircleMembership>;
  id: Scalars['UUID'];
  /** The status of the annotation record in the database. Options are Active, Deleted, and Draft. Deleted means the record is soft deleted and not visible to the user. */
  recordStatus: RecordStatus;
  /** Text of an annotation */
  text?: Maybe<Scalars['String']>;
  /** The title of the annotation */
  title?: Maybe<Scalars['String']>;
  /** The type of the annotation */
  type: AnnotationType;
};

/** Create an annotation */
export type AnnotationCreateInput = {
  /** The text of the annotation */
  text?: InputMaybe<Scalars['String']>;
  /** The title of the annotation */
  title?: InputMaybe<Scalars['String']>;
  /** The type of the annotation */
  type: AnnotationType;
};

/** Represents a payload to return after creating an annotation */
export type AnnotationCreatePayload = {
  __typename?: 'AnnotationCreatePayload';
  result: Annotation;
};

/** Delete an annotation */
export type AnnotationDeleteInput = {
  /** The ID of the annotation to delete */
  id: Scalars['UUID'];
};

/** Represents a payload to return after deleting an annotation */
export type AnnotationDeletePayload = {
  __typename?: 'AnnotationDeletePayload';
  result: Annotation;
};

/** An annotation a care giver has made */
export type AnnotationFilterInput = {
  and?: InputMaybe<Array<AnnotationFilterInput>>;
  /** The care recipient the annotation is for */
  careRecipient?: InputMaybe<CareRecipientFilterInput>;
  /** The create datetime in UTC of the annotation */
  createdDateTime?: InputMaybe<ComparableDateTimeOperationFilterInput>;
  /** The creator of the annotation */
  creator?: InputMaybe<CareCircleMembershipFilterInput>;
  id?: InputMaybe<ComparableGuidOperationFilterInput>;
  or?: InputMaybe<Array<AnnotationFilterInput>>;
  /** The status of the annotation record in the database. Options are Active, Deleted, and Draft. Deleted means the record is soft deleted and not visible to the user. */
  recordStatus?: InputMaybe<RecordStatusOperationFilterInput>;
  /** Text of an annotation */
  text?: InputMaybe<StringOperationFilterInput>;
  /** The title of the annotation */
  title?: InputMaybe<StringOperationFilterInput>;
  /** The type of the annotation */
  type?: InputMaybe<AnnotationTypeOperationFilterInput>;
};

/** Parse an annotation and return the entities found */
export type AnnotationParseInput = {
  annotationText?: InputMaybe<Scalars['String']>;
};

export type AnnotationParseResponse = {
  __typename?: 'AnnotationParseResponse';
  allergies?: Maybe<Array<AllergyCreate>>;
  conditions?: Maybe<Array<ConditionOccurrenceCreate>>;
  immunizations?: Maybe<Array<ImmunizationCreate>>;
  medications?: Maybe<Array<MedicationPrescriptionCreate>>;
};

export type AnnotationParseResponsePayload = {
  __typename?: 'AnnotationParseResponsePayload';
  result: AnnotationParseResponse;
};

export enum AnnotationType {
  Note = 'NOTE',
  Question = 'QUESTION'
}

export type AnnotationTypeOperationFilterInput = {
  eq?: InputMaybe<AnnotationType>;
  in?: InputMaybe<Array<AnnotationType>>;
  neq?: InputMaybe<AnnotationType>;
  nin?: InputMaybe<Array<AnnotationType>>;
};

/** Update an annotation */
export type AnnotationUpdateInput = {
  /** The ID of the annotation to update */
  id: Scalars['UUID'];
  /** The text of the annotation */
  text?: InputMaybe<Scalars['String']>;
  /** The title of the annotation */
  title?: InputMaybe<Scalars['String']>;
  /** The type of the annotation */
  type: AnnotationType;
};

/** Represents a payload to return after updating an annotation */
export type AnnotationUpdatePayload = {
  __typename?: 'AnnotationUpdatePayload';
  result: Annotation;
};

/** A member within a Care Circle for a care recipient */
export type AppInvitation = {
  __typename?: 'AppInvitation';
  careCircleName: Scalars['String'];
  careGiverAccepted: Scalars['UUID'];
  deliveryMethod: DeliveryMethods;
  id: Scalars['UUID'];
  inviteCode: Scalars['String'];
  inviteFromName: Scalars['String'];
  inviteRecipientEmail: Scalars['String'];
  makeAdmin: Scalars['Boolean'];
  makeEmergencyContact: Scalars['Boolean'];
  relationshipToLovedOne: RelationshipsToLovedOne;
  status: InviteStatus;
  useCount: Scalars['Int'];
};

/** A member within a Care Circle for a care recipient */
export type AppInvitationFilterInput = {
  and?: InputMaybe<Array<AppInvitationFilterInput>>;
  careCircleName?: InputMaybe<StringOperationFilterInput>;
  careGiverAccepted?: InputMaybe<ComparableGuidOperationFilterInput>;
  deliveryMethod?: InputMaybe<DeliveryMethodsOperationFilterInput>;
  id?: InputMaybe<ComparableGuidOperationFilterInput>;
  inviteCode?: InputMaybe<StringOperationFilterInput>;
  inviteFromName?: InputMaybe<StringOperationFilterInput>;
  inviteRecipientEmail?: InputMaybe<StringOperationFilterInput>;
  makeAdmin?: InputMaybe<BooleanOperationFilterInput>;
  makeEmergencyContact?: InputMaybe<BooleanOperationFilterInput>;
  or?: InputMaybe<Array<AppInvitationFilterInput>>;
  relationshipToLovedOne?: InputMaybe<RelationshipsToLovedOneOperationFilterInput>;
  status?: InputMaybe<InviteStatusOperationFilterInput>;
  useCount?: InputMaybe<ComparableInt32OperationFilterInput>;
};

/** A member within a Care Circle for a care recipient */
export type AppInvitationInput = {
  careCircleName: Scalars['String'];
  careGiverAccepted: Scalars['UUID'];
  deliveryMethod: DeliveryMethods;
  id: Scalars['UUID'];
  inviteCode: Scalars['String'];
  inviteFromName: Scalars['String'];
  inviteRecipientEmail: Scalars['String'];
  makeAdmin: Scalars['Boolean'];
  makeEmergencyContact: Scalars['Boolean'];
  relationshipToLovedOne: RelationshipsToLovedOne;
  status: InviteStatus;
  useCount: Scalars['Int'];
};

/** Update an existing app invitation's properties. */
export type AppInvitationUpdateInput = {
  /** Id for app invitation to update */
  appInvitationId: Scalars['UUID'];
  /** Id for care circle related to invite */
  careCircleId: Scalars['String'];
  /** Optionally makes the user an admin of the care circle */
  makeAdmin?: Scalars['Boolean'];
  /** Optionally makes user emergency contact */
  makeEmergencyContact?: Scalars['Boolean'];
  /** Optionally sends email if set */
  recipientEmail?: InputMaybe<Scalars['String']>;
  /** Optionally sets relationship, defaults to NotSet */
  relationshipToLovedOne?: RelationshipsToLovedOne;
};

/** Represents payload for updating an app invitation */
export type AppInvitationUpdatePayload = {
  __typename?: 'AppInvitationUpdatePayload';
  result: AppInvitation;
};

export enum ApplyPolicy {
  AfterResolver = 'AFTER_RESOLVER',
  BeforeResolver = 'BEFORE_RESOLVER'
}

/** An appointment for a care recipient */
export type Appointment = {
  __typename?: 'Appointment';
  careCircleMembership?: Maybe<CareCircleMembership>;
  careRecipient?: Maybe<CareRecipient>;
  /** The create datetime in UTC of the appointment */
  createdDateTime: Scalars['DateTime'];
  description: Scalars['String'];
  endDateTime?: Maybe<Scalars['DateTime']>;
  id: Scalars['UUID'];
  location?: Maybe<Location>;
  /** The status of the appointment record in the database. Options are Active, Deleted, and Draft. Deleted means the record is soft deleted and not visible to the user. */
  recordStatus: RecordStatus;
  recurrence?: Maybe<Scalars['String']>;
  startDateTime: Scalars['DateTime'];
  virtualLocationLink?: Maybe<Scalars['String']>;
};

/** Create a new appointment */
export type AppointmentCreateInput = {
  description: Scalars['String'];
  endDateTime?: InputMaybe<Scalars['DateTime']>;
  location?: InputMaybe<LocationFindOrCreateInput>;
  recurrence?: InputMaybe<Scalars['String']>;
  startDateTime?: InputMaybe<Scalars['DateTime']>;
  virtualLocationLink?: InputMaybe<Scalars['String']>;
};

export type AppointmentCreatePayload = {
  __typename?: 'AppointmentCreatePayload';
  result: Appointment;
};

/** Delete an appointment */
export type AppointmentDeleteInput = {
  id: Scalars['UUID'];
};

export type AppointmentDeletePayload = {
  __typename?: 'AppointmentDeletePayload';
  result: Appointment;
};

/** An appointment for a care recipient */
export type AppointmentFilterInput = {
  and?: InputMaybe<Array<AppointmentFilterInput>>;
  careCircleMembership?: InputMaybe<CareCircleMembershipFilterInput>;
  careRecipient?: InputMaybe<CareRecipientFilterInput>;
  /** The create datetime in UTC of the appointment */
  createdDateTime?: InputMaybe<ComparableDateTimeOperationFilterInput>;
  description?: InputMaybe<StringOperationFilterInput>;
  endDateTime?: InputMaybe<ComparableNullableOfDateTimeOperationFilterInput>;
  id?: InputMaybe<ComparableGuidOperationFilterInput>;
  location?: InputMaybe<LocationFilterInput>;
  or?: InputMaybe<Array<AppointmentFilterInput>>;
  /** The status of the appointment record in the database. Options are Active, Deleted, and Draft. Deleted means the record is soft deleted and not visible to the user. */
  recordStatus?: InputMaybe<RecordStatusOperationFilterInput>;
  recurrence?: InputMaybe<StringOperationFilterInput>;
  startDateTime?: InputMaybe<ComparableDateTimeOperationFilterInput>;
  virtualLocationLink?: InputMaybe<StringOperationFilterInput>;
};

/** Update an existing appointment */
export type AppointmentUpdateInput = {
  description: Scalars['String'];
  endDateTime?: InputMaybe<Scalars['DateTime']>;
  id: Scalars['UUID'];
  location?: InputMaybe<LocationFindOrCreateInput>;
  recurrence?: InputMaybe<Scalars['String']>;
  startDateTime?: InputMaybe<Scalars['DateTime']>;
  virtualLocationLink?: InputMaybe<Scalars['String']>;
};

export type AppointmentUpdatePayload = {
  __typename?: 'AppointmentUpdatePayload';
  result: Appointment;
};

/** Returns the entity history as of the end of a specified date */
export type AsOfDateHistoryFilterInput = {
  /** Date for a temporal as of query */
  asOfDate: Scalars['String'];
};

export enum BloodTypes {
  AbNeg = 'AB_NEG',
  AbPos = 'AB_POS',
  ANeg = 'A_NEG',
  APos = 'A_POS',
  BNeg = 'B_NEG',
  BPos = 'B_POS',
  ONeg = 'O_NEG',
  OPos = 'O_POS',
  Unknown = 'UNKNOWN'
}

export type BooleanOperationFilterInput = {
  eq?: InputMaybe<Scalars['Boolean']>;
  neq?: InputMaybe<Scalars['Boolean']>;
};

export type CareCircle = {
  __typename?: 'CareCircle';
  /** List of Invitations for joining this care circle */
  appInvitations?: Maybe<Array<AppInvitation>>;
  /** Caregivers that belong to this care circle */
  careCircleMembers?: Maybe<Array<CareCircleMembership>>;
  /** Care Recipient this care circle is for */
  careRecipient?: Maybe<CareRecipient>;
  /** List of Experiences for this care circle */
  experiences?: Maybe<Array<Experience>>;
  id: Scalars['UUID'];
  /** Name of this care circle */
  name?: Maybe<Scalars['String']>;
};


export type CareCircleAppInvitationsArgs = {
  where?: InputMaybe<AppInvitationFilterInput>;
};


export type CareCircleCareCircleMembersArgs = {
  where?: InputMaybe<CareCircleMembershipFilterInput>;
};


export type CareCircleExperiencesArgs = {
  where?: InputMaybe<ExperienceFilterInput>;
};

/** A care circle's Experiences. If you include an AsOfDate filter, Experiences will reflect their state on that date. */
export type CareCircleExperiences = {
  __typename?: 'CareCircleExperiences';
  /** Care Circle */
  careCircle: CareCircle;
  /** Collection of Experiences for the Care Circle */
  experiences?: Maybe<Array<Experience>>;
  id?: Maybe<Scalars['UUID']>;
};


/** A care circle's Experiences. If you include an AsOfDate filter, Experiences will reflect their state on that date. */
export type CareCircleExperiencesExperiencesArgs = {
  where?: InputMaybe<ExperienceFilterInput>;
};

export type CareCircleFile = {
  __typename?: 'CareCircleFile';
  /** The care circle that this file belongs to */
  careCircle: CareCircle;
  createdBy?: Maybe<CareGiver>;
  downloadUri: Scalars['String'];
  embeddings?: Maybe<Array<Embedding>>;
  /** File extension for the document */
  extension: Scalars['String'];
  /** File size in KB */
  fileSizeKB?: Maybe<Scalars['Decimal']>;
  id: Scalars['UUID'];
  /** Name of this file without its extension */
  name: Scalars['String'];
  tags?: Maybe<Array<EntityTag>>;
  /** UTC datestamp of first upload formatted to ISO 8601 */
  uploadDate: Scalars['String'];
};

export type CareCircleFilterInput = {
  and?: InputMaybe<Array<CareCircleFilterInput>>;
  /** List of Invitations for joining this care circle */
  appInvitations?: InputMaybe<ListFilterInputTypeOfAppInvitationFilterInput>;
  /** Caregivers that belong to this care circle */
  careCircleMembers?: InputMaybe<ListFilterInputTypeOfCareCircleMembershipFilterInput>;
  /** Care Recipient this care circle is for */
  careRecipient?: InputMaybe<CareRecipientFilterInput>;
  /** List of Experiences for this care circle */
  experiences?: InputMaybe<ListFilterInputTypeOfExperienceFilterInput>;
  id?: InputMaybe<ComparableGuidOperationFilterInput>;
  /** Name of this care circle */
  name?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<CareCircleFilterInput>>;
};

export type CareCircleInput = {
  /** List of Invitations for joining this care circle */
  appInvitations?: InputMaybe<Array<AppInvitationInput>>;
  /** Caregivers that belong to this care circle */
  careCircleMembers?: InputMaybe<Array<CareCircleMembershipInput>>;
  /** Care Recipient this care circle is for */
  careRecipient?: InputMaybe<CareRecipientInput>;
  /** List of Experiences for this care circle */
  experiences?: InputMaybe<Array<ExperienceInput>>;
  id: Scalars['UUID'];
  /** Name of this care circle */
  name?: InputMaybe<Scalars['String']>;
};

export type CareCircleMembership = {
  __typename?: 'CareCircleMembership';
  /** The care circle the care giver is a member of */
  careCircle: CareCircle;
  careCircleId: Scalars['UUID'];
  /** The care giver that belongs to a care circle */
  careGiver: CareGiver;
  careGiverId: Scalars['UUID'];
  /** The end date of the care circle membership */
  endDate?: Maybe<Scalars['DateTime']>;
  /** List of experiences the care recipient has participated in */
  experienceOccurrences: Array<ExperienceOccurrence>;
  id: Scalars['UUID'];
  isEmergencyContact: Scalars['Boolean'];
  /** Profile information for membership. */
  profile: CareCircleProfile;
  relationshipToLovedOne: RelationshipsToLovedOne;
  /** The start date of the care circle membership */
  startDate: Scalars['DateTime'];
  status: MembershipStatus;
};

export type CareCircleMembershipFilterInput = {
  and?: InputMaybe<Array<CareCircleMembershipFilterInput>>;
  /** The care circle the care giver is a member of */
  careCircle?: InputMaybe<CareCircleFilterInput>;
  careCircleId?: InputMaybe<ComparableGuidOperationFilterInput>;
  /** The care giver that belongs to a care circle */
  careGiver?: InputMaybe<CareGiverFilterInput>;
  careGiverId?: InputMaybe<ComparableGuidOperationFilterInput>;
  /** The end date of the care circle membership */
  endDate?: InputMaybe<ComparableNullableOfDateTimeOperationFilterInput>;
  /** List of experiences the care recipient has participated in */
  experienceOccurrences?: InputMaybe<ListFilterInputTypeOfExperienceOccurrenceFilterInput>;
  id?: InputMaybe<ComparableGuidOperationFilterInput>;
  isEmergencyContact?: InputMaybe<BooleanOperationFilterInput>;
  or?: InputMaybe<Array<CareCircleMembershipFilterInput>>;
  /** Profile information for membership. */
  profile?: InputMaybe<CareCircleProfileFilterInput>;
  relationshipToLovedOne?: InputMaybe<RelationshipsToLovedOneOperationFilterInput>;
  /** The start date of the care circle membership */
  startDate?: InputMaybe<ComparableDateTimeOperationFilterInput>;
  status?: InputMaybe<MembershipStatusOperationFilterInput>;
};

export type CareCircleMembershipInput = {
  /** The care circle the care giver is a member of */
  careCircle: CareCircleInput;
  careCircleId: Scalars['UUID'];
  /** The care giver that belongs to a care circle */
  careGiver: CareGiverInput;
  careGiverId: Scalars['UUID'];
  /** The end date of the care circle membership */
  endDate?: InputMaybe<Scalars['DateTime']>;
  /** List of experiences the care recipient has participated in */
  experienceOccurrences: Array<ExperienceOccurrenceInput>;
  id: Scalars['UUID'];
  isEmergencyContact: Scalars['Boolean'];
  /** Profile information for membership. */
  profile: CareCircleProfileInput;
  relationshipToLovedOne: RelationshipsToLovedOne;
  /** The start date of the care circle membership */
  startDate: Scalars['DateTime'];
  status: MembershipStatus;
};

export type CareCircleMembershipStatus = {
  __typename?: 'CareCircleMembershipStatus';
  careCircleId: Scalars['String'];
  careCircleMembershipId: Scalars['String'];
  careCircleName: Scalars['String'];
  careGiverId: Scalars['String'];
  status: MembershipStatus;
};

export type CareCircleProfile = {
  __typename?: 'CareCircleProfile';
  /** @deprecated Deprectated in favour of new notification settings using feature groups and channels */
  activitySignUpsNotificationsEnabled: Scalars['Boolean'];
  agreesHasConsentToManageLoveOnesHealth?: Maybe<Scalars['DateTime']>;
  agreesToOpenAiUse?: Maybe<Scalars['DateTime']>;
  agreesToTermsAndPrivacy?: Maybe<Scalars['DateTime']>;
  /** @deprecated Deprectated in favour of new notification settings using feature groups and channels */
  calendarAppointmentsNotificationsEnabled: Scalars['Boolean'];
  /** @deprecated Deprectated in favour of new notification settings using feature groups and channels */
  dailyMedicationDosesNotificationsEnabled: Scalars['Boolean'];
  id: Scalars['UUID'];
  /** @deprecated Deprectated in favour of new notification settings using feature groups and channels */
  newMemberJoinsNotificationsEnabled: Scalars['Boolean'];
  /** @deprecated Deprectated in favour of new notification settings using feature groups and channels */
  postsReactionsRepliesNotificationsEnabled: Scalars['Boolean'];
  /** @deprecated Deprectated in favour of new notification settings using feature groups and channels */
  refillRemindersNotificationsEnabled: Scalars['Boolean'];
  role: Roles;
  understandsIntendedAppUse?: Maybe<Scalars['DateTime']>;
  understandsMicrosoftUseOfTheirData?: Maybe<Scalars['DateTime']>;
  understandsNotPermittedToUsePlatformForMinors?: Maybe<Scalars['DateTime']>;
};

export type CareCircleProfileFilterInput = {
  activitySignUpsNotificationsEnabled?: InputMaybe<BooleanOperationFilterInput>;
  agreesHasConsentToManageLoveOnesHealth?: InputMaybe<ComparableNullableOfDateTimeOperationFilterInput>;
  agreesToOpenAiUse?: InputMaybe<ComparableNullableOfDateTimeOperationFilterInput>;
  agreesToTermsAndPrivacy?: InputMaybe<ComparableNullableOfDateTimeOperationFilterInput>;
  and?: InputMaybe<Array<CareCircleProfileFilterInput>>;
  calendarAppointmentsNotificationsEnabled?: InputMaybe<BooleanOperationFilterInput>;
  dailyMedicationDosesNotificationsEnabled?: InputMaybe<BooleanOperationFilterInput>;
  id?: InputMaybe<ComparableGuidOperationFilterInput>;
  newMemberJoinsNotificationsEnabled?: InputMaybe<BooleanOperationFilterInput>;
  or?: InputMaybe<Array<CareCircleProfileFilterInput>>;
  postsReactionsRepliesNotificationsEnabled?: InputMaybe<BooleanOperationFilterInput>;
  refillRemindersNotificationsEnabled?: InputMaybe<BooleanOperationFilterInput>;
  role?: InputMaybe<RolesOperationFilterInput>;
  understandsIntendedAppUse?: InputMaybe<ComparableNullableOfDateTimeOperationFilterInput>;
  understandsMicrosoftUseOfTheirData?: InputMaybe<ComparableNullableOfDateTimeOperationFilterInput>;
  understandsNotPermittedToUsePlatformForMinors?: InputMaybe<ComparableNullableOfDateTimeOperationFilterInput>;
};

export type CareCircleProfileInput = {
  activitySignUpsNotificationsEnabled: Scalars['Boolean'];
  agreesHasConsentToManageLoveOnesHealth?: InputMaybe<Scalars['DateTime']>;
  agreesToOpenAiUse?: InputMaybe<Scalars['DateTime']>;
  agreesToTermsAndPrivacy?: InputMaybe<Scalars['DateTime']>;
  calendarAppointmentsNotificationsEnabled: Scalars['Boolean'];
  dailyMedicationDosesNotificationsEnabled: Scalars['Boolean'];
  id: Scalars['UUID'];
  newMemberJoinsNotificationsEnabled: Scalars['Boolean'];
  postsReactionsRepliesNotificationsEnabled: Scalars['Boolean'];
  refillRemindersNotificationsEnabled: Scalars['Boolean'];
  role: Roles;
  understandsIntendedAppUse?: InputMaybe<Scalars['DateTime']>;
  understandsMicrosoftUseOfTheirData?: InputMaybe<Scalars['DateTime']>;
  understandsNotPermittedToUsePlatformForMinors?: InputMaybe<Scalars['DateTime']>;
};

/** A member within a Care Circle for a care recipient */
export type CareGiver = {
  __typename?: 'CareGiver';
  ageGroup?: Maybe<LegalAgeGroupClassification>;
  careCircle?: Maybe<CareCircle>;
  displayName?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  firstName: Scalars['String'];
  id: Scalars['UUID'];
  /** Gets the image for a user from an image cache */
  imageBase64: Scalars['String'];
  mobile?: Maybe<Scalars['String']>;
  /** User Profile for the CareGiver. */
  profile: UserProfile;
  surname: Scalars['String'];
  timeZone: Scalars['String'];
  /** Generic name for the timezone e.g. Central Time */
  timeZoneGenericName?: Maybe<Scalars['String']>;
  /** Iana ID of the caregivers timezone e.g. America/Chicago */
  timeZoneID?: Maybe<Scalars['String']>;
};

/** Annotations written by a caregiver */
export type CareGiverAnnotations = {
  __typename?: 'CareGiverAnnotations';
  /** Collection of annotations created by the caregiver */
  annotations?: Maybe<Array<Annotation>>;
  id?: Maybe<Scalars['UUID']>;
};


/** Annotations written by a caregiver */
export type CareGiverAnnotationsAnnotationsArgs = {
  where?: InputMaybe<AnnotationFilterInput>;
};

/** Approve or Reject Care Giver to Care Circle */
export type CareGiverApproveToCareCircleInput = {
  /** Id for care giver to be approved */
  careGiverId: Scalars['UUID'];
  /** Determines if user is approved or rejected */
  isApproved: Scalars['Boolean'];
};

/** Represents payload for approving a caregiver */
export type CareGiverApproveToCareCirclePayload = {
  __typename?: 'CareGiverApproveToCareCirclePayload';
  result: CareCircleMembership;
};

/** Turn email or sms channels on by default for all carecircle notifications */
export type CareGiverCarecircleNotificationSettingsDefaultsInput = {
  /** If set to true this will run a task to turn on the Email channel on for all current (not future) notification feature groups. Setting to False does not Disable them. */
  enableEmailChannelOnAllNotifications: Scalars['Boolean'];
  /** If set to true this will run a task to turn on the SMS channel on for all current (not future) notification feature groups. Setting to False does not Disable them. */
  enableSMSChannelOnAllNotifications: Scalars['Boolean'];
};

/** Represents payload for updating care circle notification defaults */
export type CareGiverCarecircleNotificationSettingsDefaultsPayload = {
  __typename?: 'CareGiverCarecircleNotificationSettingsDefaultsPayload';
  result: UserNotificationPreferences;
};

/** Acknowledge Caregiver terms and consent */
export type CareGiverConsentUpdateInput = {
  /** If true, will log the caregiver has agreed they have consent to manage their loved ones health */
  agreesHasConsentToManageLoveOnesHealth: Scalars['Boolean'];
  /** If true, will log the caregiver has agreed to the app's use of Azure OpenAI */
  agreesToOpenAiUse: Scalars['Boolean'];
  /** If true, will log the caregiver has agreed to the apps terms of use and privacy policy */
  agreesToTermsAndPrivacy: Scalars['Boolean'];
  /** Id for care giver who is agreeiong to these terms */
  careGiverId: Scalars['UUID'];
  /** If true, will log the caregiver understands this app is not is not intended to be a substitute for proffessional medical advice, diagnosis or treatment */
  understandsIntendedAppUse: Scalars['Boolean'];
  /** If true, will log the caregiver has agreed they understand that Microsoft will not sell or distribute data to a third party or use for advertising and marketing purposes */
  understandsMicrosoftUseOfTheirData: Scalars['Boolean'];
  /** If true, will log the caregiver has understands that they are not permitted to use the Windcrest platform or to submit any personally identifiable information about any individuals under the age of 13. */
  understandsNotPermittedToUsePlatformForMinors: Scalars['Boolean'];
};

/** Represents payload for setting a care giver's admin state */
export type CareGiverConsentUpdatePayload = {
  __typename?: 'CareGiverConsentUpdatePayload';
  result: CareCircleProfile;
};

/** A care giver's experience occurrences. If you include an AsOfDate filter, Experiences will reflect their state on that date. */
export type CareGiverExperienceOccurrences = {
  __typename?: 'CareGiverExperienceOccurrences';
  /** Care Giver */
  careGiver: CareGiver;
  /** Collection of Experience Occurrences for the Care Giver */
  experienceOccurrences?: Maybe<Array<ExperienceOccurrence>>;
  id?: Maybe<Scalars['UUID']>;
};


/** A care giver's experience occurrences. If you include an AsOfDate filter, Experiences will reflect their state on that date. */
export type CareGiverExperienceOccurrencesExperienceOccurrencesArgs = {
  where?: InputMaybe<ExperienceOccurrenceFilterInput>;
};

/** A member within a Care Circle for a care recipient */
export type CareGiverFilterInput = {
  ageGroup?: InputMaybe<NullableOfLegalAgeGroupClassificationOperationFilterInput>;
  and?: InputMaybe<Array<CareGiverFilterInput>>;
  careCircle?: InputMaybe<CareCircleFilterInput>;
  displayName?: InputMaybe<StringOperationFilterInput>;
  email?: InputMaybe<StringOperationFilterInput>;
  firstName?: InputMaybe<StringOperationFilterInput>;
  id?: InputMaybe<ComparableGuidOperationFilterInput>;
  mobile?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<CareGiverFilterInput>>;
  /** User Profile for the CareGiver. */
  profile?: InputMaybe<UserProfileFilterInput>;
  surname?: InputMaybe<StringOperationFilterInput>;
  /** Generic name for the timezone e.g. Central Time */
  timeZoneGenericName?: InputMaybe<StringOperationFilterInput>;
  /** Iana ID of the caregivers timezone e.g. America/Chicago */
  timeZoneID?: InputMaybe<StringOperationFilterInput>;
};

/** A member within a Care Circle for a care recipient */
export type CareGiverInput = {
  ageGroup?: InputMaybe<LegalAgeGroupClassification>;
  careCircle?: InputMaybe<CareCircleInput>;
  displayName?: InputMaybe<Scalars['String']>;
  email: Scalars['String'];
  firstName: Scalars['String'];
  id: Scalars['UUID'];
  mobile?: InputMaybe<Scalars['String']>;
  /** User Profile for the CareGiver. */
  profile: UserProfileInput;
  surname: Scalars['String'];
  /** Generic name for the timezone e.g. Central Time */
  timeZoneGenericName?: InputMaybe<Scalars['String']>;
  /** Iana ID of the caregivers timezone e.g. America/Chicago */
  timeZoneID?: InputMaybe<Scalars['String']>;
};

/** Update required caregiver info for notifications */
export type CareGiverNotificationSettingsUpdateInput = {
  /** CareGivers Mobile number including area codes */
  mobileNumber?: InputMaybe<Scalars['String']>;
  /** Iana ID of the caregivers timezone e.g. America/Chicago */
  timeZoneID: Scalars['String'];
};

/** Represents payload for updating caregiver notification info */
export type CareGiverNotificationSettingsUpdatePayload = {
  __typename?: 'CareGiverNotificationSettingsUpdatePayload';
  result: CareGiver;
};

/** Set a Care Giver's Admin State */
export type CareGiverSetAdminInput = {
  /** Id for care giver being set */
  careGiverId: Scalars['UUID'];
  /** If true, will set as admin, if false, will set as reader */
  isAdmin: Scalars['Boolean'];
};

/** Represents payload for setting a care giver's admin state */
export type CareGiverSetAdminPayload = {
  __typename?: 'CareGiverSetAdminPayload';
  result: CareCircleMembership;
};

/** Set a Care Giver's Emergency Contact State */
export type CareGiverSetEmergencyContactInput = {
  /** Id for care giver to update */
  careGiverId: Scalars['UUID'];
  /** Value to set for emergency contact */
  isEmergencyContact: Scalars['Boolean'];
};

/** Represents payload for setting emergency contact state */
export type CareGiverSetEmergencyContactPayload = {
  __typename?: 'CareGiverSetEmergencyContactPayload';
  result: CareCircleMembership;
};

/** Set a Care Giver's Relationship to Care Recipient */
export type CareGiverSetRelationshipToLovedOneInput = {
  /** Id for care giver to update */
  careGiverId: Scalars['UUID'];
  /** Value being set as the relationship */
  relationship: RelationshipsToLovedOne;
};

/** Represents payload for setting a care giver's relationship */
export type CareGiverSetRelationshipToLovedOnePayload = {
  __typename?: 'CareGiverSetRelationshipToLovedOnePayload';
  result: CareCircleMembership;
};

export type CarePlan = {
  __typename?: 'CarePlan';
  activities?: Maybe<Array<Activity>>;
  careGiver?: Maybe<CareGiver>;
  careRecipient: CareRecipient;
  conditionOccurrence: ConditionOccurrence;
  id: Scalars['UUID'];
  recordStatus: RecordStatus;
};


export type CarePlanActivitiesArgs = {
  order?: InputMaybe<Array<ActivitySortInput>>;
  where?: InputMaybe<ActivityFilterInput>;
};

/** Create a new care plan */
export type CarePlanCreateInput = {
  activities?: InputMaybe<Array<ActivityFindOrCreateInput>>;
  conditionOccurrence?: InputMaybe<ConditionOccurrenceFindOrCreateInput>;
};

export type CarePlanCreatePayload = {
  __typename?: 'CarePlanCreatePayload';
  result: CarePlan;
};

/** Delete a care plan */
export type CarePlanDeleteInput = {
  id: Scalars['UUID'];
};

export type CarePlanDeletePayload = {
  __typename?: 'CarePlanDeletePayload';
  result: CarePlan;
};

/** Delete a CarePlan file */
export type CarePlanDocumentDeleteInput = {
  /** Id of the file to delete */
  id: Scalars['UUID'];
};

/** Payload indicating success of requested delete */
export type CarePlanDocumentDeletePayload = {
  __typename?: 'CarePlanDocumentDeletePayload';
  result: Scalars['Boolean'];
};

/** Rename a CarePlan file */
export type CarePlanDocumentRenameInput = {
  /** Id of the file to rename */
  id: Scalars['UUID'];
  /** New file name without its extension */
  name: Scalars['String'];
};

/** Payload containing updated file meta data */
export type CarePlanDocumentRenamePayload = {
  __typename?: 'CarePlanDocumentRenamePayload';
  file: CareCircleFile;
};

/** Upload a file to the CareRecipients Care Plan */
export type CarePlanDocumentUploadInput = {
  /** Document to Upload */
  file: Scalars['Upload'];
};

/** Payload containing url of document */
export type CarePlanDocumentUploadPayload = {
  __typename?: 'CarePlanDocumentUploadPayload';
  file: CareCircleFile;
};

export type CarePlanFilterInput = {
  activities?: InputMaybe<ListFilterInputTypeOfActivityFilterInput>;
  and?: InputMaybe<Array<CarePlanFilterInput>>;
  careGiver?: InputMaybe<CareGiverFilterInput>;
  careRecipient?: InputMaybe<CareRecipientFilterInput>;
  conditionOccurrence?: InputMaybe<ConditionOccurrenceFilterInput>;
  id?: InputMaybe<ComparableGuidOperationFilterInput>;
  or?: InputMaybe<Array<CarePlanFilterInput>>;
  recordStatus?: InputMaybe<RecordStatusOperationFilterInput>;
};

/** Update a care plan */
export type CarePlanUpdateInput = {
  activities?: InputMaybe<Array<ActivityFindOrCreateInput>>;
  conditionOccurrence?: InputMaybe<ConditionOccurrenceFindOrCreateInput>;
  id: Scalars['UUID'];
};

export type CarePlanUpdatePayload = {
  __typename?: 'CarePlanUpdatePayload';
  result: CarePlan;
};

/** A care recipient */
export type CareRecipient = {
  __typename?: 'CareRecipient';
  /** Address of Care Recipient */
  address?: Maybe<Location>;
  /** Blood Type and Rh factor of the Care Recipient. */
  bloodType?: Maybe<BloodTypes>;
  /** Care Circle for this Care Recipient */
  careCircle: CareCircle;
  /** Date of Birth for Care Recipient in Coordinated Universal Time (UTC) and ISO 8601 format */
  dOB?: Maybe<Scalars['String']>;
  /** Diet preference of the Care Recipient */
  dietPreference?: Maybe<DietPreferences>;
  /** Email of Care Recipient */
  email?: Maybe<Scalars['String']>;
  /** First Name of Care Recipient */
  firstName: Scalars['String'];
  /** Weight of Care Recipient in CM */
  height?: Maybe<Scalars['Decimal']>;
  id: Scalars['UUID'];
  /** Last Name of Care Recipient */
  lastName?: Maybe<Scalars['String']>;
  /** Legal sex of Care Recipient */
  legalSex?: Maybe<LegalSexOptions>;
  measurementSystemPreference: MeasurementSystem;
  /** Phone of Care Recipient */
  phone?: Maybe<Scalars['String']>;
  /** UTC offset for the care recipient local timezone during daylight savings e.g. -05:00:00 */
  timeZoneDaylightSavingsOffset?: Maybe<Scalars['String']>;
  /** Generic name for the timezone e.g. Central Time */
  timeZoneGenericName?: Maybe<Scalars['String']>;
  /** Iana ID of the care recipient timezone e.g. America/Chicago */
  timeZoneID?: Maybe<Scalars['String']>;
  /** UTC offset for the care recipient local timezone e.g. -06:00:00 */
  timeZoneStandardOffset?: Maybe<Scalars['String']>;
  /** Weight of Care Recipient in KG */
  weight?: Maybe<Scalars['Decimal']>;
};

/** Initialise Care Recipient Profile with a name */
export type CareRecipientAddressUpdateInput = {
  /** Address for the Care Recipient */
  address?: InputMaybe<LocationFindOrCreateInput>;
};

/** Payload containing CareRecipient */
export type CareRecipientAddressUpdatePayload = {
  __typename?: 'CareRecipientAddressUpdatePayload';
  result: CareRecipient;
};

/** A care recipient's Allergies. If you include an AsOfDate filter, Allergies will reflect their state on that date. */
export type CareRecipientAllergies = {
  __typename?: 'CareRecipientAllergies';
  /** Collection of Allergies for the Care Recipient */
  allergies?: Maybe<Array<Allergy>>;
  id?: Maybe<Scalars['UUID']>;
};


/** A care recipient's Allergies. If you include an AsOfDate filter, Allergies will reflect their state on that date. */
export type CareRecipientAllergiesAllergiesArgs = {
  where?: InputMaybe<AllergyFilterInput>;
};

/** A care recipient's annotations */
export type CareRecipientAnnotations = {
  __typename?: 'CareRecipientAnnotations';
  /** Collection of annotations for the Care Recipient */
  annotations?: Maybe<Array<Annotation>>;
  id?: Maybe<Scalars['UUID']>;
};


/** A care recipient's annotations */
export type CareRecipientAnnotationsAnnotationsArgs = {
  where?: InputMaybe<AnnotationFilterInput>;
};

/** A Care Recipient's appointments. */
export type CareRecipientAppointments = {
  __typename?: 'CareRecipientAppointments';
  /** Collection of Appointments for the Care Recipient */
  appointments?: Maybe<Array<Appointment>>;
  id?: Maybe<Scalars['UUID']>;
};


/** A Care Recipient's appointments. */
export type CareRecipientAppointmentsAppointmentsArgs = {
  where?: InputMaybe<AppointmentFilterInput>;
};

/** A Care recipient's Care Plans */
export type CareRecipientCareplans = {
  __typename?: 'CareRecipientCareplans';
  /** Collection of Care Plans for the Care Recipient */
  carePlans?: Maybe<Array<CarePlan>>;
  id?: Maybe<Scalars['UUID']>;
};


/** A Care recipient's Care Plans */
export type CareRecipientCareplansCarePlansArgs = {
  where?: InputMaybe<CarePlanFilterInput>;
};

/** A care recipient's Conditions. If you include an AsOfDate filter, Conditions will reflect their state on that date. */
export type CareRecipientConditions = {
  __typename?: 'CareRecipientConditions';
  /** Collection of Condition Occurrences for the Care Recipient */
  conditions?: Maybe<Array<ConditionOccurrence>>;
  id?: Maybe<Scalars['UUID']>;
};


/** A care recipient's Conditions. If you include an AsOfDate filter, Conditions will reflect their state on that date. */
export type CareRecipientConditionsConditionsArgs = {
  where?: InputMaybe<ConditionOccurrenceFilterInput>;
};

/** A care recipient */
export type CareRecipientFilterInput = {
  /** Address of Care Recipient */
  address?: InputMaybe<LocationFilterInput>;
  and?: InputMaybe<Array<CareRecipientFilterInput>>;
  /** Blood Type and Rh factor of the Care Recipient. */
  bloodType?: InputMaybe<NullableOfBloodTypesOperationFilterInput>;
  /** Care Circle for this Care Recipient */
  careCircle?: InputMaybe<CareCircleFilterInput>;
  /** Date of Birth for Care Recipient in Coordinated Universal Time (UTC) and ISO 8601 format */
  dOB?: InputMaybe<StringOperationFilterInput>;
  /** Diet preference of the Care Recipient */
  dietPreference?: InputMaybe<NullableOfDietPreferencesOperationFilterInput>;
  /** Email of Care Recipient */
  email?: InputMaybe<StringOperationFilterInput>;
  /** First Name of Care Recipient */
  firstName?: InputMaybe<StringOperationFilterInput>;
  /** Weight of Care Recipient in CM */
  height?: InputMaybe<ComparableNullableOfDecimalOperationFilterInput>;
  id?: InputMaybe<ComparableGuidOperationFilterInput>;
  /** Last Name of Care Recipient */
  lastName?: InputMaybe<StringOperationFilterInput>;
  /** Legal sex of Care Recipient */
  legalSex?: InputMaybe<NullableOfLegalSexOptionsOperationFilterInput>;
  measurementSystemPreference?: InputMaybe<MeasurementSystemOperationFilterInput>;
  or?: InputMaybe<Array<CareRecipientFilterInput>>;
  /** Phone of Care Recipient */
  phone?: InputMaybe<StringOperationFilterInput>;
  /** UTC offset for the care recipient local timezone during daylight savings e.g. -05:00:00 */
  timeZoneDaylightSavingsOffset?: InputMaybe<StringOperationFilterInput>;
  /** Generic name for the timezone e.g. Central Time */
  timeZoneGenericName?: InputMaybe<StringOperationFilterInput>;
  /** Iana ID of the care recipient timezone e.g. America/Chicago */
  timeZoneID?: InputMaybe<StringOperationFilterInput>;
  /** UTC offset for the care recipient local timezone e.g. -06:00:00 */
  timeZoneStandardOffset?: InputMaybe<StringOperationFilterInput>;
  /** Weight of Care Recipient in KG */
  weight?: InputMaybe<ComparableNullableOfDecimalOperationFilterInput>;
};

/** A care recipient's Immunizations. If you include an AsOfDate filter, Immunizations will reflect their state on that date. */
export type CareRecipientImmunizations = {
  __typename?: 'CareRecipientImmunizations';
  id?: Maybe<Scalars['UUID']>;
  /** Collection of Immunizations for the Care Recipient */
  immunizations?: Maybe<Array<Immunization>>;
};


/** A care recipient's Immunizations. If you include an AsOfDate filter, Immunizations will reflect their state on that date. */
export type CareRecipientImmunizationsImmunizationsArgs = {
  where?: InputMaybe<ImmunizationFilterInput>;
};

/** A care recipient */
export type CareRecipientInput = {
  /** Address of Care Recipient */
  address?: InputMaybe<LocationInput>;
  /** Blood Type and Rh factor of the Care Recipient. */
  bloodType?: InputMaybe<BloodTypes>;
  /** Care Circle for this Care Recipient */
  careCircle: CareCircleInput;
  /** Date of Birth for Care Recipient in Coordinated Universal Time (UTC) and ISO 8601 format */
  dOB?: InputMaybe<Scalars['String']>;
  /** Diet preference of the Care Recipient */
  dietPreference?: InputMaybe<DietPreferences>;
  /** Email of Care Recipient */
  email?: InputMaybe<Scalars['String']>;
  /** First Name of Care Recipient */
  firstName: Scalars['String'];
  /** Weight of Care Recipient in CM */
  height?: InputMaybe<Scalars['Decimal']>;
  id: Scalars['UUID'];
  /** Last Name of Care Recipient */
  lastName?: InputMaybe<Scalars['String']>;
  /** Legal sex of Care Recipient */
  legalSex?: InputMaybe<LegalSexOptions>;
  measurementSystemPreference: MeasurementSystem;
  /** Phone of Care Recipient */
  phone?: InputMaybe<Scalars['String']>;
  /** UTC offset for the care recipient local timezone during daylight savings e.g. -05:00:00 */
  timeZoneDaylightSavingsOffset?: InputMaybe<Scalars['String']>;
  /** Generic name for the timezone e.g. Central Time */
  timeZoneGenericName?: InputMaybe<Scalars['String']>;
  /** Iana ID of the care recipient timezone e.g. America/Chicago */
  timeZoneID?: InputMaybe<Scalars['String']>;
  /** UTC offset for the care recipient local timezone e.g. -06:00:00 */
  timeZoneStandardOffset?: InputMaybe<Scalars['String']>;
  /** Weight of Care Recipient in KG */
  weight?: InputMaybe<Scalars['Decimal']>;
};

/** Update the measurement system preference for a care recipient */
export type CareRecipientMeasurementSystemUpdateInput = {
  /** Measurement system preference for care recipient */
  measurementSystem: MeasurementSystem;
};

/** Represents payload for updating CareRecipient measurement system preference */
export type CareRecipientMeasurementSystemUpdatePayload = {
  __typename?: 'CareRecipientMeasurementSystemUpdatePayload';
  result: CareRecipient;
};

/** Initialise Care Recipient Profile with a name */
export type CareRecipientMeasurementsUpdateInput = {
  /** Weight of Care Recipient in CM */
  height?: InputMaybe<Scalars['Decimal']>;
  /** Weight of Care Recipient in KG */
  weight?: InputMaybe<Scalars['Decimal']>;
};

/** Payload containing CareRecipient */
export type CareRecipientMeasurementsUpdatePayload = {
  __typename?: 'CareRecipientMeasurementsUpdatePayload';
  result: CareRecipient;
};

/** A care recipient's medication prescriptions. If you include an AsOfDate filter, prescriptions will reflect their state on that date. */
export type CareRecipientMedicationPrescriptions = {
  __typename?: 'CareRecipientMedicationPrescriptions';
  id?: Maybe<Scalars['UUID']>;
  /** Collection of medication prescriptions for the Care Recipient */
  prescriptions?: Maybe<Array<Prescription>>;
};


/** A care recipient's medication prescriptions. If you include an AsOfDate filter, prescriptions will reflect their state on that date. */
export type CareRecipientMedicationPrescriptionsPrescriptionsArgs = {
  where?: InputMaybe<PrescriptionFilterInput>;
};

/** A care recipient's Pharmacies. If you include an AsOfDate filter, Pharmacies will reflect their state on that date. */
export type CareRecipientPharmacies = {
  __typename?: 'CareRecipientPharmacies';
  id?: Maybe<Scalars['UUID']>;
  /** Collection of Pharmacy for the Care Recipient */
  pharmacies?: Maybe<Array<Pharmacy>>;
};


/** A care recipient's Pharmacies. If you include an AsOfDate filter, Pharmacies will reflect their state on that date. */
export type CareRecipientPharmaciesPharmaciesArgs = {
  where?: InputMaybe<PharmacyFilterInput>;
};

/** URL for the Care Recipient Photo */
export type CareRecipientPhoto = {
  __typename?: 'CareRecipientPhoto';
  /** Care Recipient */
  careRecipientImageURL: Scalars['String'];
  /** Care Recipient ID */
  id?: Maybe<Scalars['UUID']>;
};

/** Upload a photo for the care reipient */
export type CareRecipientPhotoUploadInput = {
  /** Care Recipient Phofile Image */
  file: Scalars['Upload'];
};

/** Payload containing CareRecipient */
export type CareRecipientPhotoUploadPayload = {
  __typename?: 'CareRecipientPhotoUploadPayload';
  url: Scalars['String'];
};

/** Initialise Care Recipient Profile with a name */
export type CareRecipientProfileCreateInput = {
  /** Firstname of the care recipient */
  firstName: Scalars['String'];
  /** LastName of the care recipient */
  lastName?: InputMaybe<Scalars['String']>;
};

/** Payload containing CareRecipient */
export type CareRecipientProfileCreatePayload = {
  __typename?: 'CareRecipientProfileCreatePayload';
  result: CareRecipient;
};

/** Initialise Care Recipient Profile with a name */
export type CareRecipientProfileUpdateInput = {
  /** Blood Type of Care Recipient */
  bloodType?: InputMaybe<BloodTypes>;
  /** Date of Birth for Care Recipient in Coordinated Universal Time (UTC) and ISO 8601 format */
  dOB?: InputMaybe<Scalars['String']>;
  /** Diet preference of Care Recipient */
  dietPreference?: InputMaybe<DietPreferences>;
  /** Email of Care Recipient */
  email?: InputMaybe<Scalars['String']>;
  /** Firstname of the care recipient */
  firstName: Scalars['String'];
  /** LastName of the care recipient */
  lastName?: InputMaybe<Scalars['String']>;
  /** Phone of Care Recipient */
  phone?: InputMaybe<Scalars['String']>;
  /** Legal sex of Care Recipient */
  sex?: InputMaybe<LegalSexOptions>;
};

/** Payload containing CareRecipient */
export type CareRecipientProfileUpdatePayload = {
  __typename?: 'CareRecipientProfileUpdatePayload';
  result: CareRecipient;
};

/** A care recipient's Providers. If you include an AsOfDate filter, Providers will reflect their state on that date. */
export type CareRecipientProviders = {
  __typename?: 'CareRecipientProviders';
  id?: Maybe<Scalars['UUID']>;
  /** Collection of Provider for the Care Recipient */
  providers?: Maybe<Array<Provider>>;
};


/** A care recipient's Providers. If you include an AsOfDate filter, Providers will reflect their state on that date. */
export type CareRecipientProvidersProvidersArgs = {
  where?: InputMaybe<ProviderFilterInput>;
};

/** Update required CareRecipient info for notifications */
export type CareRecipientTimeZoneUpdateInput = {
  /** Iana ID of the CareRecipients timezone e.g. America/Chicago */
  timeZoneID: Scalars['String'];
};

/** Represents payload for updating CareRecipient notification info */
export type CareRecipientTimeZoneUpdatePayload = {
  __typename?: 'CareRecipientTimeZoneUpdatePayload';
  result: CareRecipient;
};

/** The timeline response object */
export type CareRecipientTimelineEntities = {
  __typename?: 'CareRecipientTimelineEntities';
  /** The list of timeline entities */
  entities?: Maybe<Array<TimelineEntity>>;
  /** The ID of a timeline response (uniquely generated for each response) */
  id?: Maybe<Scalars['UUID']>;
};

export type CdcVaccineResponse = {
  __typename?: 'CdcVaccineResponse';
  alias?: Maybe<Scalars['String']>;
  code?: Maybe<Scalars['String']>;
  codeSet?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export enum Channel {
  Email = 'EMAIL',
  InApp = 'IN_APP',
  Sms = 'SMS'
}

export type Classification = {
  __typename?: 'Classification';
  code?: Maybe<Scalars['String']>;
};

/** Deletes all data for the user's care circle. User must be an admin */
export type ClearCareCircleDataInput = {
  /** Enter care circle name to confirm deletion of this care circle */
  confirmCareCircleName: Scalars['String'];
};

/** Represents payload for clearing a care circle */
export type ClearCareCircleDataPayLoad = {
  __typename?: 'ClearCareCircleDataPayLoad';
  result: Response;
};

/** The code and code system for a coded concept */
export type CodedConcept = {
  __typename?: 'CodedConcept';
  /** The code for the concept */
  code?: Maybe<Scalars['String']>;
  /** The code system for the concept */
  codeSystem: CodedConceptCodingSystem;
  id: Scalars['UUID'];
};

export enum CodedConceptCodingSystem {
  CdcVaccineProduct = 'CDC_VACCINE_PRODUCT',
  Icd9 = 'ICD9',
  Icd10 = 'ICD10',
  Loinc = 'LOINC',
  Npi = 'NPI',
  RxNorm = 'RX_NORM',
  Snomed = 'SNOMED'
}

export type CodedConceptCodingSystemOperationFilterInput = {
  eq?: InputMaybe<CodedConceptCodingSystem>;
  in?: InputMaybe<Array<CodedConceptCodingSystem>>;
  neq?: InputMaybe<CodedConceptCodingSystem>;
  nin?: InputMaybe<Array<CodedConceptCodingSystem>>;
};

/** The code and code system for a coded concept */
export type CodedConceptFilterInput = {
  and?: InputMaybe<Array<CodedConceptFilterInput>>;
  /** The code for the concept */
  code?: InputMaybe<StringOperationFilterInput>;
  /** The code system for the concept */
  codeSystem?: InputMaybe<CodedConceptCodingSystemOperationFilterInput>;
  id?: InputMaybe<ComparableGuidOperationFilterInput>;
  or?: InputMaybe<Array<CodedConceptFilterInput>>;
};

export type CommonCondition = {
  __typename?: 'CommonCondition';
  code?: Maybe<Scalars['String']>;
  codeSystem?: Maybe<CodedConceptCodingSystem>;
  name?: Maybe<Scalars['String']>;
};

export type CommonConditionFilterInput = {
  and?: InputMaybe<Array<CommonConditionFilterInput>>;
  code?: InputMaybe<StringOperationFilterInput>;
  codeSystem?: InputMaybe<NullableOfCodedConceptCodingSystemOperationFilterInput>;
  name?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<CommonConditionFilterInput>>;
};

export type CommonConditionSortInput = {
  code?: InputMaybe<SortEnumType>;
  codeSystem?: InputMaybe<SortEnumType>;
  name?: InputMaybe<SortEnumType>;
};

export type ComparableDateTimeOperationFilterInput = {
  eq?: InputMaybe<Scalars['DateTime']>;
  gt?: InputMaybe<Scalars['DateTime']>;
  gte?: InputMaybe<Scalars['DateTime']>;
  in?: InputMaybe<Array<Scalars['DateTime']>>;
  lt?: InputMaybe<Scalars['DateTime']>;
  lte?: InputMaybe<Scalars['DateTime']>;
  neq?: InputMaybe<Scalars['DateTime']>;
  ngt?: InputMaybe<Scalars['DateTime']>;
  ngte?: InputMaybe<Scalars['DateTime']>;
  nin?: InputMaybe<Array<Scalars['DateTime']>>;
  nlt?: InputMaybe<Scalars['DateTime']>;
  nlte?: InputMaybe<Scalars['DateTime']>;
};

export type ComparableGuidOperationFilterInput = {
  eq?: InputMaybe<Scalars['UUID']>;
  gt?: InputMaybe<Scalars['UUID']>;
  gte?: InputMaybe<Scalars['UUID']>;
  in?: InputMaybe<Array<Scalars['UUID']>>;
  lt?: InputMaybe<Scalars['UUID']>;
  lte?: InputMaybe<Scalars['UUID']>;
  neq?: InputMaybe<Scalars['UUID']>;
  ngt?: InputMaybe<Scalars['UUID']>;
  ngte?: InputMaybe<Scalars['UUID']>;
  nin?: InputMaybe<Array<Scalars['UUID']>>;
  nlt?: InputMaybe<Scalars['UUID']>;
  nlte?: InputMaybe<Scalars['UUID']>;
};

export type ComparableInt32OperationFilterInput = {
  eq?: InputMaybe<Scalars['Int']>;
  gt?: InputMaybe<Scalars['Int']>;
  gte?: InputMaybe<Scalars['Int']>;
  in?: InputMaybe<Array<Scalars['Int']>>;
  lt?: InputMaybe<Scalars['Int']>;
  lte?: InputMaybe<Scalars['Int']>;
  neq?: InputMaybe<Scalars['Int']>;
  ngt?: InputMaybe<Scalars['Int']>;
  ngte?: InputMaybe<Scalars['Int']>;
  nin?: InputMaybe<Array<Scalars['Int']>>;
  nlt?: InputMaybe<Scalars['Int']>;
  nlte?: InputMaybe<Scalars['Int']>;
};

export type ComparableNullableOfDateTimeOperationFilterInput = {
  eq?: InputMaybe<Scalars['DateTime']>;
  gt?: InputMaybe<Scalars['DateTime']>;
  gte?: InputMaybe<Scalars['DateTime']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  lt?: InputMaybe<Scalars['DateTime']>;
  lte?: InputMaybe<Scalars['DateTime']>;
  neq?: InputMaybe<Scalars['DateTime']>;
  ngt?: InputMaybe<Scalars['DateTime']>;
  ngte?: InputMaybe<Scalars['DateTime']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  nlt?: InputMaybe<Scalars['DateTime']>;
  nlte?: InputMaybe<Scalars['DateTime']>;
};

export type ComparableNullableOfDecimalOperationFilterInput = {
  eq?: InputMaybe<Scalars['Decimal']>;
  gt?: InputMaybe<Scalars['Decimal']>;
  gte?: InputMaybe<Scalars['Decimal']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Decimal']>>>;
  lt?: InputMaybe<Scalars['Decimal']>;
  lte?: InputMaybe<Scalars['Decimal']>;
  neq?: InputMaybe<Scalars['Decimal']>;
  ngt?: InputMaybe<Scalars['Decimal']>;
  ngte?: InputMaybe<Scalars['Decimal']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['Decimal']>>>;
  nlt?: InputMaybe<Scalars['Decimal']>;
  nlte?: InputMaybe<Scalars['Decimal']>;
};

export type ComparableNullableOfInt32OperationFilterInput = {
  eq?: InputMaybe<Scalars['Int']>;
  gt?: InputMaybe<Scalars['Int']>;
  gte?: InputMaybe<Scalars['Int']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  lt?: InputMaybe<Scalars['Int']>;
  lte?: InputMaybe<Scalars['Int']>;
  neq?: InputMaybe<Scalars['Int']>;
  ngt?: InputMaybe<Scalars['Int']>;
  ngte?: InputMaybe<Scalars['Int']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  nlt?: InputMaybe<Scalars['Int']>;
  nlte?: InputMaybe<Scalars['Int']>;
};

/** A condition a care giver has experienced */
export type Condition = {
  __typename?: 'Condition';
  /** Codes of the condition */
  codes?: Maybe<Array<CodedConcept>>;
  id: Scalars['UUID'];
  /** Name of a condition */
  name?: Maybe<Scalars['String']>;
};

export type ConditionData = {
  __typename?: 'ConditionData';
  conditionName?: Maybe<Scalars['String']>;
  icd10Code?: Maybe<Scalars['String']>;
};

/** A condition a care giver has experienced */
export type ConditionFilterInput = {
  and?: InputMaybe<Array<ConditionFilterInput>>;
  /** Codes of the condition */
  codes?: InputMaybe<ListFilterInputTypeOfCodedConceptFilterInput>;
  id?: InputMaybe<ComparableGuidOperationFilterInput>;
  /** Name of a condition */
  name?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<ConditionFilterInput>>;
};

/** FindOrCreate a condition a care recipient has */
export type ConditionFindOrCreate = {
  __typename?: 'ConditionFindOrCreate';
  /** ICD10 Code of the condition */
  iCD10Code?: Maybe<Scalars['String']>;
  /** Id of the condition */
  id?: Maybe<Scalars['UUID']>;
  /** Name of a condition */
  name?: Maybe<Scalars['String']>;
};

/** FindOrCreate a condition a care recipient has */
export type ConditionFindOrCreateInput = {
  /** ICD10 Code of the condition */
  iCD10Code?: InputMaybe<Scalars['String']>;
  /** Id of the condition */
  id?: InputMaybe<Scalars['UUID']>;
  /** Name of a condition */
  name?: InputMaybe<Scalars['String']>;
};

/** Returns the answer to a question about a condition */
export type ConditionInquiryInput = {
  condition?: InputMaybe<Scalars['String']>;
  questionText?: InputMaybe<Scalars['String']>;
};

/** An occurrence of a condition */
export type ConditionOccurrence = {
  __typename?: 'ConditionOccurrence';
  /** Care recipient the condition occurred for */
  careRecipient?: Maybe<CareRecipient>;
  /** Condition that occurred */
  condition?: Maybe<Condition>;
  /** Condition end day */
  conditionEndDateDay?: Maybe<Scalars['Int']>;
  /** Condition end month */
  conditionEndDateMonth?: Maybe<Month>;
  /** Relative Condition end timeframe period end year */
  conditionEndDateRelativePeriodEnd?: Maybe<Scalars['Int']>;
  /** Relative Condition end timeframe period start year */
  conditionEndDateRelativePeriodStart?: Maybe<Scalars['Int']>;
  /** Condition end year */
  conditionEndDateYear?: Maybe<Scalars['Int']>;
  /** Condition relative time period */
  conditionRelativeTimePeriod?: Maybe<RelativeTimePeriod>;
  /** Condition start day */
  conditionStartDateDay?: Maybe<Scalars['Int']>;
  /** Condition start month */
  conditionStartDateMonth?: Maybe<Month>;
  /** Relative Condition Start timeframe period end year */
  conditionStartDateRelativePeriodEnd?: Maybe<Scalars['Int']>;
  /** Relative Condition start timeframe period start year */
  conditionStartDateRelativePeriodStart?: Maybe<Scalars['Int']>;
  /** Condition start year */
  conditionStartDateYear?: Maybe<Scalars['Int']>;
  /** Is the condition is current or historical. True if current, false if historical. Historical means the record is no longer current but is still visible to the user. */
  current: Scalars['Boolean'];
  id: Scalars['UUID'];
  /** Status of the condition occurrence record in the database. Options are Active, Deleted, and Draft. Deleted means the record is soft deleted and not visible to the user. */
  recordStatus: RecordStatus;
  saveState: ConditionOccurrenceState;
  /** Treating Provider */
  treatingProvider?: Maybe<Provider>;
};

/** Create a occurrence of a condition */
export type ConditionOccurrenceCreate = {
  __typename?: 'ConditionOccurrenceCreate';
  /** Condition that occurred */
  condition?: Maybe<ConditionFindOrCreate>;
  /** Condition end day */
  conditionEndDateDay?: Maybe<Scalars['Int']>;
  /** Condition end month */
  conditionEndDateMonth?: Maybe<Month>;
  /** Relative Condition end timeframe period end year */
  conditionEndDateRelativePeriodEnd?: Maybe<Scalars['Int']>;
  /** Relative Condition end timeframe period start year */
  conditionEndDateRelativePeriodStart?: Maybe<Scalars['Int']>;
  /** Condition end year */
  conditionEndDateYear?: Maybe<Scalars['Int']>;
  /** Condition Releative time period */
  conditionRelativeTimePeriod?: Maybe<RelativeTimePeriod>;
  /** Condition start day */
  conditionStartDateDay?: Maybe<Scalars['Int']>;
  /** Condition start month */
  conditionStartDateMonth?: Maybe<Month>;
  /** Relative Condition Start timeframe period end year */
  conditionStartDateRelativePeriodEnd?: Maybe<Scalars['Int']>;
  /** Relative Condition start timeframe period start year */
  conditionStartDateRelativePeriodStart?: Maybe<Scalars['Int']>;
  /** Condition start year */
  conditionStartDateYear?: Maybe<Scalars['Int']>;
  /** Treating Provider */
  treatingProvider?: Maybe<ProviderFindOrCreate>;
};

/** Create a occurrence of a condition */
export type ConditionOccurrenceCreateInput = {
  /** Condition that occurred */
  condition?: InputMaybe<ConditionFindOrCreateInput>;
  /** Condition end day */
  conditionEndDateDay?: InputMaybe<Scalars['Int']>;
  /** Condition end month */
  conditionEndDateMonth?: InputMaybe<Month>;
  /** Relative Condition end timeframe period end year */
  conditionEndDateRelativePeriodEnd?: InputMaybe<Scalars['Int']>;
  /** Relative Condition end timeframe period start year */
  conditionEndDateRelativePeriodStart?: InputMaybe<Scalars['Int']>;
  /** Condition end year */
  conditionEndDateYear?: InputMaybe<Scalars['Int']>;
  /** Condition Releative time period */
  conditionRelativeTimePeriod?: InputMaybe<RelativeTimePeriod>;
  /** Condition start day */
  conditionStartDateDay?: InputMaybe<Scalars['Int']>;
  /** Condition start month */
  conditionStartDateMonth?: InputMaybe<Month>;
  /** Relative Condition Start timeframe period end year */
  conditionStartDateRelativePeriodEnd?: InputMaybe<Scalars['Int']>;
  /** Relative Condition start timeframe period start year */
  conditionStartDateRelativePeriodStart?: InputMaybe<Scalars['Int']>;
  /** Condition start year */
  conditionStartDateYear?: InputMaybe<Scalars['Int']>;
  /** Treating Provider */
  treatingProvider?: InputMaybe<ProviderFindOrCreateInput>;
};

/** Represents the payload to return after creating a condition occurrence */
export type ConditionOccurrenceCreatePayload = {
  __typename?: 'ConditionOccurrenceCreatePayload';
  result: ConditionOccurrence;
};

/** Soft delete a condition */
export type ConditionOccurrenceDeleteInput = {
  id: Scalars['UUID'];
};

/** Payload to return after soft deleting a medication */
export type ConditionOccurrenceDeletePayload = {
  __typename?: 'ConditionOccurrenceDeletePayload';
  result: ConditionOccurrence;
};

/** An occurrence of a condition */
export type ConditionOccurrenceFilterInput = {
  and?: InputMaybe<Array<ConditionOccurrenceFilterInput>>;
  /** Care recipient the condition occurred for */
  careRecipient?: InputMaybe<CareRecipientFilterInput>;
  /** Condition that occurred */
  condition?: InputMaybe<ConditionFilterInput>;
  /** Condition end day */
  conditionEndDateDay?: InputMaybe<ComparableNullableOfInt32OperationFilterInput>;
  /** Condition end month */
  conditionEndDateMonth?: InputMaybe<NullableOfMonthOperationFilterInput>;
  /** Relative Condition end timeframe period end year */
  conditionEndDateRelativePeriodEnd?: InputMaybe<ComparableNullableOfInt32OperationFilterInput>;
  /** Relative Condition end timeframe period start year */
  conditionEndDateRelativePeriodStart?: InputMaybe<ComparableNullableOfInt32OperationFilterInput>;
  /** Condition end year */
  conditionEndDateYear?: InputMaybe<ComparableNullableOfInt32OperationFilterInput>;
  /** Condition relative time period */
  conditionRelativeTimePeriod?: InputMaybe<NullableOfRelativeTimePeriodOperationFilterInput>;
  /** Condition start day */
  conditionStartDateDay?: InputMaybe<ComparableNullableOfInt32OperationFilterInput>;
  /** Condition start month */
  conditionStartDateMonth?: InputMaybe<NullableOfMonthOperationFilterInput>;
  /** Relative Condition Start timeframe period end year */
  conditionStartDateRelativePeriodEnd?: InputMaybe<ComparableNullableOfInt32OperationFilterInput>;
  /** Relative Condition start timeframe period start year */
  conditionStartDateRelativePeriodStart?: InputMaybe<ComparableNullableOfInt32OperationFilterInput>;
  /** Condition start year */
  conditionStartDateYear?: InputMaybe<ComparableNullableOfInt32OperationFilterInput>;
  /** Is the condition is current or historical. True if current, false if historical. Historical means the record is no longer current but is still visible to the user. */
  current?: InputMaybe<BooleanOperationFilterInput>;
  id?: InputMaybe<ComparableGuidOperationFilterInput>;
  or?: InputMaybe<Array<ConditionOccurrenceFilterInput>>;
  /** Status of the condition occurrence record in the database. Options are Active, Deleted, and Draft. Deleted means the record is soft deleted and not visible to the user. */
  recordStatus?: InputMaybe<RecordStatusOperationFilterInput>;
  /** Treating Provider */
  treatingProvider?: InputMaybe<ProviderFilterInput>;
};

/** Update a occurrence of a condition */
export type ConditionOccurrenceFindOrCreate = {
  __typename?: 'ConditionOccurrenceFindOrCreate';
  /** Condition that occurred */
  condition?: Maybe<ConditionFindOrCreate>;
  /** Condition end day */
  conditionEndDateDay?: Maybe<Scalars['Int']>;
  /** Condition end month */
  conditionEndDateMonth?: Maybe<Month>;
  /** Relative Condition end timeframe period end year */
  conditionEndDateRelativePeriodEnd?: Maybe<Scalars['Int']>;
  /** Relative Condition end timeframe period start year */
  conditionEndDateRelativePeriodStart?: Maybe<Scalars['Int']>;
  /** Condition end year */
  conditionEndDateYear?: Maybe<Scalars['Int']>;
  /** Condition Releative time period */
  conditionRelativeTimePeriod?: Maybe<RelativeTimePeriod>;
  /** Condition start day */
  conditionStartDateDay?: Maybe<Scalars['Int']>;
  /** Condition start month */
  conditionStartDateMonth?: Maybe<Month>;
  /** Relative Condition Start timeframe period end year */
  conditionStartDateRelativePeriodEnd?: Maybe<Scalars['Int']>;
  /** Relative Condition start timeframe period start year */
  conditionStartDateRelativePeriodStart?: Maybe<Scalars['Int']>;
  /** Condition start year */
  conditionStartDateYear?: Maybe<Scalars['Int']>;
  /** Id of the condition occurrence to update */
  id?: Maybe<Scalars['UUID']>;
  /** Treating Provider */
  treatingProvider?: Maybe<ProviderFindOrCreate>;
};

/** Update a occurrence of a condition */
export type ConditionOccurrenceFindOrCreateInput = {
  /** Condition that occurred */
  condition?: InputMaybe<ConditionFindOrCreateInput>;
  /** Condition end day */
  conditionEndDateDay?: InputMaybe<Scalars['Int']>;
  /** Condition end month */
  conditionEndDateMonth?: InputMaybe<Month>;
  /** Relative Condition end timeframe period end year */
  conditionEndDateRelativePeriodEnd?: InputMaybe<Scalars['Int']>;
  /** Relative Condition end timeframe period start year */
  conditionEndDateRelativePeriodStart?: InputMaybe<Scalars['Int']>;
  /** Condition end year */
  conditionEndDateYear?: InputMaybe<Scalars['Int']>;
  /** Condition Releative time period */
  conditionRelativeTimePeriod?: InputMaybe<RelativeTimePeriod>;
  /** Condition start day */
  conditionStartDateDay?: InputMaybe<Scalars['Int']>;
  /** Condition start month */
  conditionStartDateMonth?: InputMaybe<Month>;
  /** Relative Condition Start timeframe period end year */
  conditionStartDateRelativePeriodEnd?: InputMaybe<Scalars['Int']>;
  /** Relative Condition start timeframe period start year */
  conditionStartDateRelativePeriodStart?: InputMaybe<Scalars['Int']>;
  /** Condition start year */
  conditionStartDateYear?: InputMaybe<Scalars['Int']>;
  /** Id of the condition occurrence to update */
  id?: InputMaybe<Scalars['UUID']>;
  /** Treating Provider */
  treatingProvider?: InputMaybe<ProviderFindOrCreateInput>;
};

/** Change the current status of a condition occurrence to true (current) */
export type ConditionOccurrenceSetCurrentInput = {
  /** Id of the condition occurrence to update */
  id: Scalars['UUID'];
};

/** Represents the payload to return after updating a condition occurrence current status to true (current) */
export type ConditionOccurrenceSetCurrentPayload = {
  __typename?: 'ConditionOccurrenceSetCurrentPayload';
  result: ConditionOccurrence;
};

/** Change the current status of a condition occurrence to false (historic) */
export type ConditionOccurrenceSetHistoricalInput = {
  /** Id of the condition occurrence to update */
  id: Scalars['UUID'];
};

/** Represents the payload to return after updating a condition occurrence current status to false (historic) */
export type ConditionOccurrenceSetHistoricalPayload = {
  __typename?: 'ConditionOccurrenceSetHistoricalPayload';
  result: ConditionOccurrence;
};

export type ConditionOccurrenceState = {
  __typename?: 'ConditionOccurrenceState';
  conditionEndDateDay?: Maybe<Scalars['Int']>;
  conditionEndDateMonth?: Maybe<Month>;
  conditionEndDateRelativePeriodEnd?: Maybe<Scalars['Int']>;
  conditionEndDateRelativePeriodStart?: Maybe<Scalars['Int']>;
  conditionEndDateYear?: Maybe<Scalars['Int']>;
  conditionRelativeTimePeriod?: Maybe<RelativeTimePeriod>;
  conditionStartDateDay?: Maybe<Scalars['Int']>;
  conditionStartDateMonth?: Maybe<Month>;
  conditionStartDateRelativePeriodEnd?: Maybe<Scalars['Int']>;
  conditionStartDateRelativePeriodStart?: Maybe<Scalars['Int']>;
  conditionStartDateYear?: Maybe<Scalars['Int']>;
};

/** Update a occurrence of a condition */
export type ConditionOccurrenceUpdateInput = {
  /** Condition that occurred */
  condition?: InputMaybe<ConditionFindOrCreateInput>;
  /** Condition end day */
  conditionEndDateDay?: InputMaybe<Scalars['Int']>;
  /** Condition end month */
  conditionEndDateMonth?: InputMaybe<Month>;
  /** Relative Condition end timeframe period end year */
  conditionEndDateRelativePeriodEnd?: InputMaybe<Scalars['Int']>;
  /** Relative Condition end timeframe period start year */
  conditionEndDateRelativePeriodStart?: InputMaybe<Scalars['Int']>;
  /** Condition end year */
  conditionEndDateYear?: InputMaybe<Scalars['Int']>;
  /** Condition Releative time period */
  conditionRelativeTimePeriod?: InputMaybe<RelativeTimePeriod>;
  /** Condition start day */
  conditionStartDateDay?: InputMaybe<Scalars['Int']>;
  /** Condition start month */
  conditionStartDateMonth?: InputMaybe<Month>;
  /** Relative Condition Start timeframe period end year */
  conditionStartDateRelativePeriodEnd?: InputMaybe<Scalars['Int']>;
  /** Relative Condition start timeframe period start year */
  conditionStartDateRelativePeriodStart?: InputMaybe<Scalars['Int']>;
  /** Condition start year */
  conditionStartDateYear?: InputMaybe<Scalars['Int']>;
  /** Id of the condition occurrence to update */
  id: Scalars['UUID'];
  /** Treating Provider */
  treatingProvider?: InputMaybe<ProviderFindOrCreateInput>;
};

/** Represents the payload to return after updating a condition occurrence */
export type ConditionOccurrenceUpdatePayload = {
  __typename?: 'ConditionOccurrenceUpdatePayload';
  result: ConditionOccurrence;
};

/** Searching a condition */
export type ConditionSearchInput = {
  searchText: Scalars['String'];
};

export type ConditionSearchResponse = {
  __typename?: 'ConditionSearchResponse';
  conditions?: Maybe<Array<ConditionData>>;
};

export type ConditionSearchResponsePayload = {
  __typename?: 'ConditionSearchResponsePayload';
  result: ConditionSearchResponse;
};

/** Create a new care circle */
export type CreateCareCircleInput = {
  /** Name for care circle */
  name: Scalars['String'];
};

/** Represents the payload to return after creating a care team */
export type CreateCareCirclePayload = {
  __typename?: 'CreateCareCirclePayload';
  result: CareCircle;
};

/** Create a care giver */
export type CreateCareGiverInput = {
  /** Flag to create caregiver with MS Graph */
  populateFromMsGraph: Scalars['Boolean'];
};

/** Represents payload for creating a care giver */
export type CreateCareGiverPayload = {
  __typename?: 'CreateCareGiverPayload';
  result: CareGiver;
};

/** Create an app invitation. */
export type CreateInviteInput = {
  /** Id for the care circle to add the invite to */
  careCircleId: Scalars['String'];
  /** Optional attribute that will set user as admin upon invite approval */
  makeAdmin?: Scalars['Boolean'];
  /** Optional attribute that will set user as emergency contact upon invite approval */
  makeEmergencyContact?: Scalars['Boolean'];
  /** Optional Email address to send email to. If set, will tie the invite created to that email and send. */
  recipientEmail?: InputMaybe<Scalars['String']>;
  /** Optional attribute that will set user's relationship upon invite approval */
  relationshipToLovedOne?: RelationshipsToLovedOne;
};

/** Represents payload to return after creating an app invite */
export type CreateInvitePayload = {
  __typename?: 'CreateInvitePayload';
  result: AppInvitation;
};

export enum CustomStrengthUnitsOfMeasure {
  G = 'G',
  Iu = 'IU',
  Mcg = 'MCG',
  Mcgml = 'MCGML',
  Mg = 'MG',
  Mgml = 'MGML',
  MEq = 'M_EQ',
  ML = 'M_L',
  Percent = 'PERCENT',
  Unit = 'UNIT'
}

export type DateComponents = {
  __typename?: 'DateComponents';
  day?: Maybe<Scalars['Int']>;
  month?: Maybe<Scalars['Int']>;
  year: Scalars['Int'];
};

export type DateComponentsRange = {
  __typename?: 'DateComponentsRange';
  end: DateComponents;
  start: DateComponents;
};

/** Deletes all data */
export type DeleteAllAppDataInput = {
  deleteAllCareCircles: Scalars['Boolean'];
  deleteAllMedManagement: Scalars['Boolean'];
};

/** Represents payload for deleting all data */
export type DeleteAllAppDataPayLoad = {
  __typename?: 'DeleteAllAppDataPayLoad';
  result: Response;
};

export enum DeliveryMethods {
  Email = 'EMAIL',
  Link = 'LINK'
}

export type DeliveryMethodsOperationFilterInput = {
  eq?: InputMaybe<DeliveryMethods>;
  in?: InputMaybe<Array<DeliveryMethods>>;
  neq?: InputMaybe<DeliveryMethods>;
  nin?: InputMaybe<Array<DeliveryMethods>>;
};

export enum DietPreferences {
  DiabeticDiet = 'DIABETIC_DIET',
  GlutenFree = 'GLUTEN_FREE',
  KetogenicDiet = 'KETOGENIC_DIET',
  LactoseFree = 'LACTOSE_FREE',
  LowCarbohydrate = 'LOW_CARBOHYDRATE',
  LowFat = 'LOW_FAT',
  LowSodium = 'LOW_SODIUM',
  MediterraneanDiet = 'MEDITERRANEAN_DIET',
  Vegan = 'VEGAN',
  Vegetarian = 'VEGETARIAN'
}

export type DispensableDrug = {
  __typename?: 'DispensableDrug';
  dispensableDrugDesc?: Maybe<Scalars['String']>;
  dispensableDrugID?: Maybe<Scalars['String']>;
  /** @deprecated Use ShortDoseFormDesc instead */
  doseFormDesc?: Maybe<Scalars['String']>;
  longDoseFormDesc?: Maybe<Scalars['String']>;
  medStrength?: Maybe<Scalars['String']>;
  medStrengthUnit?: Maybe<Scalars['String']>;
  routedDoseFormDrugID?: Maybe<Scalars['String']>;
  shortDoseFormDesc?: Maybe<Scalars['String']>;
};

export type DispensableDrugsResponse = {
  __typename?: 'DispensableDrugsResponse';
  items?: Maybe<Array<DispensableDrug>>;
};

export type DispensableDrugsResponsePayload = {
  __typename?: 'DispensableDrugsResponsePayload';
  result: DispensableDrugsResponse;
};

/** Routed dose form id input for getting dispensable medication options */
export type DispensableMedicationGetInput = {
  routedDoseFormDrugId: Scalars['String'];
};

/** Get embeddings for a given file */
export type DocumentEmbedInput = {
  careCircleFileId?: InputMaybe<Scalars['String']>;
};

export type DocumentEmbedResponsePayload = {
  __typename?: 'DocumentEmbedResponsePayload';
  result: CareCircleFile;
};

/** Answer and context for a question about a document */
export type DocumentInquiryAnswer = {
  __typename?: 'DocumentInquiryAnswer';
  answer: Scalars['String'];
  careCircleFileId: Scalars['String'];
  context: Scalars['String'];
  question: Scalars['String'];
};

/** Ask a quesion about a document */
export type DocumentInquiryInput = {
  careCircleFileId: Scalars['String'];
  question: Scalars['String'];
};

export type DocumentInquiryResponsePayload = {
  __typename?: 'DocumentInquiryResponsePayload';
  result: DocumentInquiryAnswer;
};

/** Parse a document and return the entities found */
export type DocumentParseInput = {
  careCircleFileId?: InputMaybe<Scalars['String']>;
};

/** Add a tag to a document */
export type DocumentTagAddInput = {
  careCircleFileId?: InputMaybe<Scalars['String']>;
  tag?: InputMaybe<Scalars['String']>;
};

/** Represents a payload after adding a tag to a document */
export type DocumentTagAddResponsePayload = {
  __typename?: 'DocumentTagAddResponsePayload';
  result: CareCircleFile;
};

/** Remove a tag to a document */
export type DocumentTagRemoveInput = {
  careCircleFileId?: InputMaybe<Scalars['String']>;
  tagId?: InputMaybe<Scalars['String']>;
};

/** Represents a payload after removing a tag from a document */
export type DocumentTagRemoveResponsePayload = {
  __typename?: 'DocumentTagRemoveResponsePayload';
  result: CareCircleFile;
};

/** A Prescription may have 0 to many Dosages.  Dosages contain the quantity, unit, and schedule for a prescription. */
export type Dosage = {
  __typename?: 'Dosage';
  id: Scalars['UUID'];
  /** Medication Prescription this schedule is for. */
  prescription?: Maybe<Prescription>;
  /** Status of the record in the database. Options are Active, Deleted, and Draft. Deleted means the record is soft deleted and not visible to the user. */
  recordStatus: RecordStatus;
  /** Schedules are in rrule iCal standard format. Use https://www.npmjs.com/package/rrule to parse, edit, and save the schedule rule. */
  schedule: Scalars['String'];
  /** Medication Dosage Unit (milligrams, etc.) of the schedule. */
  unit: Scalars['String'];
  /** Medication Dosage Value (1, 2, 3, etc.) for the schedule. */
  value: Scalars['Int'];
};

/** Create a dosage schedule for a medication prescription. */
export type DosageCreate = {
  __typename?: 'DosageCreate';
  /** Dosage Schedule in RRule format. */
  schedule: Scalars['String'];
  /** Dosage Unit for a schedule (ex. 'pill'). */
  unit: Scalars['String'];
  /** Dosage Value for a schedule (ex. 1). */
  value: Scalars['Int'];
};

/** Create a dosage schedule for a medication prescription. */
export type DosageCreateInput = {
  /** Dosage Schedule in RRule format. */
  schedule: Scalars['String'];
  /** Dosage Unit for a schedule (ex. 'pill'). */
  unit: Scalars['String'];
  /** Dosage Value for a schedule (ex. 1). */
  value: Scalars['Int'];
};

/** Delete a prescription schedule. */
export type DosageDeleteInput = {
  id: Scalars['UUID'];
};

/** Represents payload for deleting a prescription schedule. */
export type DosageDeletePayload = {
  __typename?: 'DosageDeletePayload';
  result: Dosage;
};

/** A Prescription may have 0 to many Dosages.  Dosages contain the quantity, unit, and schedule for a prescription. */
export type DosageFilterInput = {
  and?: InputMaybe<Array<DosageFilterInput>>;
  id?: InputMaybe<ComparableGuidOperationFilterInput>;
  or?: InputMaybe<Array<DosageFilterInput>>;
  /** Medication Prescription this schedule is for. */
  prescription?: InputMaybe<PrescriptionFilterInput>;
  /** Status of the record in the database. Options are Active, Deleted, and Draft. Deleted means the record is soft deleted and not visible to the user. */
  recordStatus?: InputMaybe<RecordStatusOperationFilterInput>;
  /** Schedules are in rrule iCal standard format. Use https://www.npmjs.com/package/rrule to parse, edit, and save the schedule rule. */
  schedule?: InputMaybe<StringOperationFilterInput>;
  /** Medication Dosage Unit (milligrams, etc.) of the schedule. */
  unit?: InputMaybe<StringOperationFilterInput>;
  /** Medication Dosage Value (1, 2, 3, etc.) for the schedule. */
  value?: InputMaybe<ComparableInt32OperationFilterInput>;
};

/** Generates a dynamic care plan based on a care recipient's condition */
export type DynamicCarePlanGenerateInput = {
  condition?: InputMaybe<Scalars['String']>;
};

/** An embedding of a text */
export type Embedding = {
  __typename?: 'Embedding';
  id: Scalars['UUID'];
  /** The text that was embedded */
  text?: Maybe<Scalars['String']>;
  /** The embedding of the text */
  textEmbedding: Array<Scalars['Float']>;
};

/** Get an embedding for a given text */
export type EmbeddingGetInput = {
  text?: InputMaybe<Scalars['String']>;
};

export type EmbeddingGetResponsePayload = {
  __typename?: 'EmbeddingGetResponsePayload';
  result: Embedding;
};

/** Encounter a care recipient has had with a provider */
export type Encounter = {
  __typename?: 'Encounter';
  /** Annotations on the encounter */
  annotations?: Maybe<Array<Annotation>>;
  /** The care recipient that had the encounter */
  careRecipient?: Maybe<CareRecipient>;
  /** Is the encounter is current or historical. True if current, false if historical. Historical means the record is no longer current but is still visible to the user. */
  current: Scalars['Boolean'];
  /** The class of the encounter */
  encounterClass: EncounterClass;
  /** The date the encounter ended Day */
  encounterEndDateDay?: Maybe<Scalars['Int']>;
  /** The date the encounter ended Month */
  encounterEndDateMonth?: Maybe<Month>;
  /** The date the encounter ended Year */
  encounterEndDateYear?: Maybe<Scalars['Int']>;
  /** The date the encounter started Day */
  encounterStartDateDay?: Maybe<Scalars['Int']>;
  /** The date the encounter started Month */
  encounterStartDateMonth?: Maybe<Month>;
  /** The date the encounter started Year */
  encounterStartDateYear?: Maybe<Scalars['Int']>;
  id: Scalars['UUID'];
  /** The provider that the care recipient had the encounter with */
  provider?: Maybe<Provider>;
  /** Status of the encounter record in the database. Options are Active, Deleted, and Draft. Deleted means the record is soft deleted and not visible to the user. */
  recordStatus: RecordStatus;
  saveState: EncounterState;
};

/** The class of an encounter */
export enum EncounterClass {
  Amb = 'AMB',
  Emer = 'EMER',
  Hh = 'HH',
  Imp = 'IMP',
  Vr = 'VR'
}

/** Create a new encounter */
export type EncounterCreateInput = {
  /** The class of the encounter */
  encounterClass: EncounterClass;
  /** The date the encounter ended day */
  encounterEndDateDay: Scalars['Int'];
  /** The date the encounter ended month */
  encounterEndDateMonth: Month;
  /** The date the encounter ended year */
  encounterEndDateYear: Scalars['Int'];
  /** The date the encounter started day */
  encounterStartDateDay: Scalars['Int'];
  /** The date the encounter started month */
  encounterStartDateMonth: Month;
  /** The date the encounter started year */
  encounterStartDateYear: Scalars['Int'];
  /** The provider that the care recipient had the encounter with */
  provider?: InputMaybe<ProviderFindOrCreateInput>;
};

/** Represents the payload to return after creating a new encounter */
export type EncounterCreateResponsePayload = {
  __typename?: 'EncounterCreateResponsePayload';
  result: Encounter;
};

/** Delete an encounter */
export type EncounterDeleteInput = {
  /** The ID of the encounter to delete */
  id: Scalars['UUID'];
};

/** Represents the payload to return after deleting an encounter */
export type EncounterDeleteResponsePayload = {
  __typename?: 'EncounterDeleteResponsePayload';
  result: Encounter;
};

/** Set an encounter current status to true (current) */
export type EncounterSetCurrentInput = {
  /** The ID of the encounter to update current status to true (current) */
  id: Scalars['UUID'];
};

/** Represents the payload to return after setting an encounter current status to true (current) */
export type EncounterSetCurrentPayload = {
  __typename?: 'EncounterSetCurrentPayload';
  result: Encounter;
};

/** Set an encounter current status to false (historic) */
export type EncounterSetHistoricalInput = {
  /** The ID of the encounter to update current status to false (historic) */
  id: Scalars['UUID'];
};

/** Represents the payload to return after setting an encounter current status to false (historic) */
export type EncounterSetHistoricalPayload = {
  __typename?: 'EncounterSetHistoricalPayload';
  result: Encounter;
};

export type EncounterState = {
  __typename?: 'EncounterState';
  encounterClass: EncounterClass;
  encounterEndDateDay?: Maybe<Scalars['Int']>;
  encounterEndDateMonth?: Maybe<Month>;
  encounterEndDateYear?: Maybe<Scalars['Int']>;
  encounterStartDateDay?: Maybe<Scalars['Int']>;
  encounterStartDateMonth?: Maybe<Month>;
  encounterStartDateYear?: Maybe<Scalars['Int']>;
};

/** Update an encounter */
export type EncounterUpdateInput = {
  /** The class of the encounter */
  encounterClass: EncounterClass;
  /** The date the encounter ended day */
  encounterEndDateDay: Scalars['Int'];
  /** The date the encounter ended month */
  encounterEndDateMonth: Month;
  /** The date the encounter ended year */
  encounterEndDateYear: Scalars['Int'];
  /** The date the encounter started day */
  encounterStartDateDay: Scalars['Int'];
  /** The date the encounter started month */
  encounterStartDateMonth: Month;
  /** The date the encounter started year */
  encounterStartDateYear: Scalars['Int'];
  /** The ID of the encounter to update */
  id: Scalars['UUID'];
  /** The provider that the care recipient had the encounter with */
  provider?: InputMaybe<ProviderFindOrCreateInput>;
};

/** Represents the payload to return after updating an encounter */
export type EncounterUpdateResponsePayload = {
  __typename?: 'EncounterUpdateResponsePayload';
  result: Encounter;
};

export type EntityTag = {
  __typename?: 'EntityTag';
  id: Scalars['UUID'];
  /** Name of a Tag */
  name: Scalars['String'];
};

export enum ErrorCodes {
  BadGateway = 'BAD_GATEWAY',
  BadRequest = 'BAD_REQUEST',
  Forbidden = 'FORBIDDEN',
  GatewayTimeout = 'GATEWAY_TIMEOUT',
  InternalServerError = 'INTERNAL_SERVER_ERROR',
  NotFound = 'NOT_FOUND',
  NotImplemented = 'NOT_IMPLEMENTED',
  ServiceUnavailable = 'SERVICE_UNAVAILABLE',
  TooManyRequests = 'TOO_MANY_REQUESTS',
  Unauthorized = 'UNAUTHORIZED',
  UnprocessableEntity = 'UNPROCESSABLE_ENTITY'
}

/** An experience hosted by the care circle for the care recipient */
export type Experience = {
  __typename?: 'Experience';
  /** Location of the experience */
  address?: Maybe<Location>;
  /** Availability of the care recipient for the experience */
  availability: Scalars['String'];
  /** Care circle that is hosting the experience */
  careCircle?: Maybe<CareCircle>;
  /** Description of the experience */
  details?: Maybe<Scalars['String']>;
  /** End Date of the experience */
  endDate?: Maybe<Scalars['String']>;
  id: Scalars['UUID'];
  /** Memories associated with the experience */
  memories?: Maybe<Array<Memory>>;
  /** Phone number for the experience */
  phoneNumber?: Maybe<Scalars['String']>;
  /** Start Date of the experience */
  startDate?: Maybe<Scalars['String']>;
  /** Title of the experience */
  title?: Maybe<Scalars['String']>;
  /** Type of the experience */
  type?: Maybe<ExperienceType>;
};

/** Create an experience hosted by the care circle for the care recipient */
export type ExperienceCreateInput = {
  /** Location of the experience */
  address?: InputMaybe<LocationCreateInput>;
  /** Availability of the care recipient for the experience */
  availability: Scalars['String'];
  /** Description of the experience */
  details?: InputMaybe<Scalars['String']>;
  /** End Date of the experience */
  endDate?: InputMaybe<Scalars['String']>;
  /** Phone number for the experience */
  phoneNumber?: InputMaybe<Scalars['String']>;
  /** Start Date of the experience */
  startDate?: InputMaybe<Scalars['String']>;
  /** Title of the experience */
  title?: InputMaybe<Scalars['String']>;
  /** Type of the experience */
  type?: InputMaybe<ExperienceType>;
};

/** Represents the payload to return after creating an experience */
export type ExperienceCreatePayload = {
  __typename?: 'ExperienceCreatePayload';
  result: Experience;
};

/** Delete an experience */
export type ExperienceDeleteInput = {
  /** Id of an experience */
  id: Scalars['UUID'];
};

/** Represents the payload to return after deleting an experience */
export type ExperienceDeletePayload = {
  __typename?: 'ExperienceDeletePayload';
  result: Response;
};

/** An experience hosted by the care circle for the care recipient */
export type ExperienceFilterInput = {
  /** Location of the experience */
  address?: InputMaybe<LocationFilterInput>;
  and?: InputMaybe<Array<ExperienceFilterInput>>;
  /** Availability of the care recipient for the experience */
  availability?: InputMaybe<StringOperationFilterInput>;
  /** Care circle that is hosting the experience */
  careCircle?: InputMaybe<CareCircleFilterInput>;
  /** Description of the experience */
  details?: InputMaybe<StringOperationFilterInput>;
  /** End Date of the experience */
  endDate?: InputMaybe<StringOperationFilterInput>;
  id?: InputMaybe<ComparableGuidOperationFilterInput>;
  /** Memories associated with the experience */
  memories?: InputMaybe<ListFilterInputTypeOfMemoryFilterInput>;
  or?: InputMaybe<Array<ExperienceFilterInput>>;
  /** Phone number for the experience */
  phoneNumber?: InputMaybe<StringOperationFilterInput>;
  /** Start Date of the experience */
  startDate?: InputMaybe<StringOperationFilterInput>;
  /** Title of the experience */
  title?: InputMaybe<StringOperationFilterInput>;
  /** Type of the experience */
  type?: InputMaybe<NullableOfExperienceTypeOperationFilterInput>;
};

/** An experience hosted by the care circle for the care recipient */
export type ExperienceInput = {
  /** Location of the experience */
  address?: InputMaybe<LocationInput>;
  /** Availability of the care recipient for the experience */
  availability: Scalars['String'];
  /** Care circle that is hosting the experience */
  careCircle?: InputMaybe<CareCircleInput>;
  /** Description of the experience */
  details?: InputMaybe<Scalars['String']>;
  /** End Date of the experience */
  endDate?: InputMaybe<Scalars['String']>;
  id: Scalars['UUID'];
  /** Memories associated with the experience */
  memories?: InputMaybe<Array<MemoryInput>>;
  /** Phone number for the experience */
  phoneNumber?: InputMaybe<Scalars['String']>;
  /** Start Date of the experience */
  startDate?: InputMaybe<Scalars['String']>;
  /** Title of the experience */
  title?: InputMaybe<Scalars['String']>;
  /** Type of the experience */
  type?: InputMaybe<ExperienceType>;
};

/** An experience occurrence a care giver has done for the care recipient */
export type ExperienceOccurrence = {
  __typename?: 'ExperienceOccurrence';
  /** The care circle membership of the care giver that did the experience */
  careCircleMembership?: Maybe<CareCircleMembership>;
  /** End Date of the experience occurrence */
  endDate?: Maybe<Scalars['String']>;
  /** Experience this occurrence is for */
  experience?: Maybe<Experience>;
  id: Scalars['UUID'];
  /** Start Date of the experience occurrence */
  startDate?: Maybe<Scalars['String']>;
};

/** Create an experience occurrence a care giver has done for the care recipient */
export type ExperienceOccurrenceCreateInput = {
  /** Care giver participating in the experience occurrence */
  careGiverId: Scalars['UUID'];
  /** End Date of the experience occurrence */
  endDate?: InputMaybe<Scalars['String']>;
  /** Experience this occurrence is for */
  experience?: InputMaybe<ExperienceInput>;
  /** Start Date of the experience occurrence */
  startDate?: InputMaybe<Scalars['String']>;
};

/** Represents the payload to return after creating an experience occurrence */
export type ExperienceOccurrenceCreatePayload = {
  __typename?: 'ExperienceOccurrenceCreatePayload';
  result: ExperienceOccurrence;
};

/** Delete an experience Occurrence */
export type ExperienceOccurrenceDeleteInput = {
  /** Id of an experience occurrence */
  id: Scalars['UUID'];
};

/** Represents the payload to return after deleting an experience Occurrence */
export type ExperienceOccurrenceDeletePayload = {
  __typename?: 'ExperienceOccurrenceDeletePayload';
  result: Response;
};

/** An experience occurrence a care giver has done for the care recipient */
export type ExperienceOccurrenceFilterInput = {
  and?: InputMaybe<Array<ExperienceOccurrenceFilterInput>>;
  /** The care circle membership of the care giver that did the experience */
  careCircleMembership?: InputMaybe<CareCircleMembershipFilterInput>;
  /** End Date of the experience occurrence */
  endDate?: InputMaybe<StringOperationFilterInput>;
  /** Experience this occurrence is for */
  experience?: InputMaybe<ExperienceFilterInput>;
  id?: InputMaybe<ComparableGuidOperationFilterInput>;
  or?: InputMaybe<Array<ExperienceOccurrenceFilterInput>>;
  /** Start Date of the experience occurrence */
  startDate?: InputMaybe<StringOperationFilterInput>;
};

/** An experience occurrence a care giver has done for the care recipient */
export type ExperienceOccurrenceInput = {
  /** The care circle membership of the care giver that did the experience */
  careCircleMembership?: InputMaybe<CareCircleMembershipInput>;
  /** End Date of the experience occurrence */
  endDate?: InputMaybe<Scalars['String']>;
  /** Experience this occurrence is for */
  experience?: InputMaybe<ExperienceInput>;
  id: Scalars['UUID'];
  /** Start Date of the experience occurrence */
  startDate?: InputMaybe<Scalars['String']>;
};

/** Update an experience occurrence */
export type ExperienceOccurrenceUpdateInput = {
  /** Care giver participating in the experience occurrence */
  careGiverId: Scalars['UUID'];
  /** End Date of the experience occurrence */
  endDate?: InputMaybe<Scalars['String']>;
  /** Experience this occurrence is for */
  experience?: InputMaybe<ExperienceInput>;
  /** Id of an experience occurrence */
  id: Scalars['UUID'];
  /** Start Date of the experience occurrence */
  startDate?: InputMaybe<Scalars['String']>;
};

/** Represents the payload to return after update an experience occurrence */
export type ExperienceOccurrenceUpdatePayload = {
  __typename?: 'ExperienceOccurrenceUpdatePayload';
  result: ExperienceOccurrence;
};

export enum ExperienceType {
  Custom = 'CUSTOM',
  Letter = 'LETTER',
  Outing = 'OUTING',
  PhoneCall = 'PHONE_CALL',
  Visit = 'VISIT'
}

/** Update an experience */
export type ExperienceUpdateInput = {
  /** Location of the experience */
  address?: InputMaybe<LocationCreateInput>;
  /** Availability of the care recipient for the experience */
  availability: Scalars['String'];
  /** Description of the experience */
  details?: InputMaybe<Scalars['String']>;
  /** End Date of the experience */
  endDate?: InputMaybe<Scalars['String']>;
  /** Id of an experience */
  id: Scalars['UUID'];
  /** Phone number for the experience */
  phoneNumber?: InputMaybe<Scalars['String']>;
  /** Start Date of the experience */
  startDate?: InputMaybe<Scalars['String']>;
  /** Title of the experience */
  title?: InputMaybe<Scalars['String']>;
  /** Type of the experience */
  type?: InputMaybe<ExperienceType>;
};

/** Represents the payload to return after update an experience */
export type ExperienceUpdatePayload = {
  __typename?: 'ExperienceUpdatePayload';
  result: Experience;
};

export enum Feature {
  MedicationRefills = 'MEDICATION_REFILLS',
  NewMembers = 'NEW_MEMBERS'
}

export type GeolocationCoordinateInput = {
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
};

/** An Immunization a care recipient has had */
export type Immunization = {
  __typename?: 'Immunization';
  /** Care recipient the immunization was given to */
  careRecipient?: Maybe<CareRecipient>;
  id: Scalars['UUID'];
  /** Date of immunization day */
  immunizationDateDay?: Maybe<Scalars['Int']>;
  /** Date of immunization month */
  immunizationDateMonth?: Maybe<Month>;
  /** Relative Immunization timeframe period end year */
  immunizationDateRelativePeriodEnd?: Maybe<Scalars['Int']>;
  /** Relative Immunization timeframe period start year */
  immunizationDateRelativePeriodStart?: Maybe<Scalars['Int']>;
  /** Date of immunization year */
  immunizationDateYear?: Maybe<Scalars['Int']>;
  /** Status of the immunization record in the database. Options are Active, Deleted, and Draft. Deleted means the record is soft deleted and not visible to the user. */
  recordStatus: RecordStatus;
  saveState: ImmunizationState;
  /** Vaccine Product administered */
  vaccineProductAdministered?: Maybe<Vaccine>;
};

/** Create an Immunization a care recipient has had */
export type ImmunizationCreate = {
  __typename?: 'ImmunizationCreate';
  /** Date of immunization day */
  immunizationDateDay?: Maybe<Scalars['Int']>;
  /** Date of immunization month */
  immunizationDateMonth?: Maybe<Month>;
  /** Relative Immunization timeframe period end year */
  immunizationDateRelativePeriodEnd?: Maybe<Scalars['Int']>;
  /** Relative Immunization timeframe period start year */
  immunizationDateRelativePeriodStart?: Maybe<Scalars['Int']>;
  /** Date of immunization year */
  immunizationDateYear?: Maybe<Scalars['Int']>;
  /** Vaccine Product administered */
  vaccineProductAdministered?: Maybe<VaccineFindOrCreate>;
};

/** Create an Immunization a care recipient has had */
export type ImmunizationCreateInput = {
  /** Date of immunization day */
  immunizationDateDay?: InputMaybe<Scalars['Int']>;
  /** Date of immunization month */
  immunizationDateMonth?: InputMaybe<Month>;
  /** Relative Immunization timeframe period end year */
  immunizationDateRelativePeriodEnd?: InputMaybe<Scalars['Int']>;
  /** Relative Immunization timeframe period start year */
  immunizationDateRelativePeriodStart?: InputMaybe<Scalars['Int']>;
  /** Date of immunization year */
  immunizationDateYear?: InputMaybe<Scalars['Int']>;
  /** Vaccine Product administered */
  vaccineProductAdministered?: InputMaybe<VaccineFindOrCreateInput>;
};

/** Represents the payload to return after creating an immunization */
export type ImmunizationCreatePayload = {
  __typename?: 'ImmunizationCreatePayload';
  result: Immunization;
};

/** Soft delete an immunization */
export type ImmunizationDeleteInput = {
  id: Scalars['UUID'];
};

/** Payload to return after soft deleting a medication */
export type ImmunizationDeletePayload = {
  __typename?: 'ImmunizationDeletePayload';
  result: Immunization;
};

/** An Immunization a care recipient has had */
export type ImmunizationFilterInput = {
  and?: InputMaybe<Array<ImmunizationFilterInput>>;
  /** Care recipient the immunization was given to */
  careRecipient?: InputMaybe<CareRecipientFilterInput>;
  id?: InputMaybe<ComparableGuidOperationFilterInput>;
  /** Date of immunization day */
  immunizationDateDay?: InputMaybe<ComparableNullableOfInt32OperationFilterInput>;
  /** Date of immunization month */
  immunizationDateMonth?: InputMaybe<NullableOfMonthOperationFilterInput>;
  /** Relative Immunization timeframe period end year */
  immunizationDateRelativePeriodEnd?: InputMaybe<ComparableNullableOfInt32OperationFilterInput>;
  /** Relative Immunization timeframe period start year */
  immunizationDateRelativePeriodStart?: InputMaybe<ComparableNullableOfInt32OperationFilterInput>;
  /** Date of immunization year */
  immunizationDateYear?: InputMaybe<ComparableNullableOfInt32OperationFilterInput>;
  or?: InputMaybe<Array<ImmunizationFilterInput>>;
  /** Status of the immunization record in the database. Options are Active, Deleted, and Draft. Deleted means the record is soft deleted and not visible to the user. */
  recordStatus?: InputMaybe<RecordStatusOperationFilterInput>;
  /** Vaccine Product administered */
  vaccineProductAdministered?: InputMaybe<VaccineFilterInput>;
};

export type ImmunizationState = {
  __typename?: 'ImmunizationState';
  immunizationDateDay?: Maybe<Scalars['Int']>;
  immunizationDateMonth?: Maybe<Month>;
  immunizationDateRelativePeriodEnd?: Maybe<Scalars['Int']>;
  immunizationDateRelativePeriodStart?: Maybe<Scalars['Int']>;
  immunizationDateYear?: Maybe<Scalars['Int']>;
  vaccine: Vaccine;
};

/** Update an Immunization a care recipient has had */
export type ImmunizationUpdateInput = {
  /** Id of the immunization record */
  id?: InputMaybe<Scalars['UUID']>;
  /** Date of immunization day */
  immunizationDateDay?: InputMaybe<Scalars['Int']>;
  /** Date of immunization month */
  immunizationDateMonth?: InputMaybe<Month>;
  /** Relative Immunization timeframe period end year */
  immunizationDateRelativePeriodEnd?: InputMaybe<Scalars['Int']>;
  /** Relative Immunization timeframe period start year */
  immunizationDateRelativePeriodStart?: InputMaybe<Scalars['Int']>;
  /** Date of immunization year */
  immunizationDateYear?: InputMaybe<Scalars['Int']>;
  /** Vaccine Product administered */
  vaccineProductAdministered?: InputMaybe<VaccineFindOrCreateInput>;
};

/** Represents the payload to return after updating an immunization */
export type ImmunizationUpdatePayload = {
  __typename?: 'ImmunizationUpdatePayload';
  result: Immunization;
};

export enum InviteStatus {
  Complete = 'COMPLETE',
  Created = 'CREATED',
  Error = 'ERROR',
  Expired = 'EXPIRED',
  PendingApproval = 'PENDING_APPROVAL',
  Revoked = 'REVOKED',
  Sent = 'SENT'
}

export type InviteStatusOperationFilterInput = {
  eq?: InputMaybe<InviteStatus>;
  in?: InputMaybe<Array<InviteStatus>>;
  neq?: InputMaybe<InviteStatus>;
  nin?: InputMaybe<Array<InviteStatus>>;
};

/** Join a care circle */
export type JoinCareCircleFromInviteLinkInput = {
  /** Id for the caregiver being added to the care circle */
  careGiverId: Scalars['String'];
  /** Invite code from app invite */
  inviteCode: Scalars['String'];
};

/** Represents payload for joining a care circle */
export type JoinCareCircleFromInviteLinkPayload = {
  __typename?: 'JoinCareCircleFromInviteLinkPayload';
  result: CareCircleMembershipStatus;
};

export type KeyValuePairOfStringAndObject = {
  __typename?: 'KeyValuePairOfStringAndObject';
  key: Scalars['String'];
};

export enum LegalAgeGroupClassification {
  Adult = 'ADULT',
  MinorNoParentalConsentRequired = 'MINOR_NO_PARENTAL_CONSENT_REQUIRED',
  MinorWithoutParentalConsent = 'MINOR_WITHOUT_PARENTAL_CONSENT',
  MinorWithParentalConsent = 'MINOR_WITH_PARENTAL_CONSENT',
  NotAdult = 'NOT_ADULT',
  Unauthenticated = 'UNAUTHENTICATED'
}

export enum LegalSexOptions {
  Female = 'FEMALE',
  Male = 'MALE',
  Na = 'NA',
  Other = 'OTHER',
  Unknown = 'UNKNOWN'
}

export type ListFilterInputTypeOfActivityFilterInput = {
  all?: InputMaybe<ActivityFilterInput>;
  any?: InputMaybe<Scalars['Boolean']>;
  none?: InputMaybe<ActivityFilterInput>;
  some?: InputMaybe<ActivityFilterInput>;
};

export type ListFilterInputTypeOfAnnotationFilterInput = {
  all?: InputMaybe<AnnotationFilterInput>;
  any?: InputMaybe<Scalars['Boolean']>;
  none?: InputMaybe<AnnotationFilterInput>;
  some?: InputMaybe<AnnotationFilterInput>;
};

export type ListFilterInputTypeOfAppInvitationFilterInput = {
  all?: InputMaybe<AppInvitationFilterInput>;
  any?: InputMaybe<Scalars['Boolean']>;
  none?: InputMaybe<AppInvitationFilterInput>;
  some?: InputMaybe<AppInvitationFilterInput>;
};

export type ListFilterInputTypeOfCareCircleMembershipFilterInput = {
  all?: InputMaybe<CareCircleMembershipFilterInput>;
  any?: InputMaybe<Scalars['Boolean']>;
  none?: InputMaybe<CareCircleMembershipFilterInput>;
  some?: InputMaybe<CareCircleMembershipFilterInput>;
};

export type ListFilterInputTypeOfCodedConceptFilterInput = {
  all?: InputMaybe<CodedConceptFilterInput>;
  any?: InputMaybe<Scalars['Boolean']>;
  none?: InputMaybe<CodedConceptFilterInput>;
  some?: InputMaybe<CodedConceptFilterInput>;
};

export type ListFilterInputTypeOfDosageFilterInput = {
  all?: InputMaybe<DosageFilterInput>;
  any?: InputMaybe<Scalars['Boolean']>;
  none?: InputMaybe<DosageFilterInput>;
  some?: InputMaybe<DosageFilterInput>;
};

export type ListFilterInputTypeOfExperienceFilterInput = {
  all?: InputMaybe<ExperienceFilterInput>;
  any?: InputMaybe<Scalars['Boolean']>;
  none?: InputMaybe<ExperienceFilterInput>;
  some?: InputMaybe<ExperienceFilterInput>;
};

export type ListFilterInputTypeOfExperienceOccurrenceFilterInput = {
  all?: InputMaybe<ExperienceOccurrenceFilterInput>;
  any?: InputMaybe<Scalars['Boolean']>;
  none?: InputMaybe<ExperienceOccurrenceFilterInput>;
  some?: InputMaybe<ExperienceOccurrenceFilterInput>;
};

export type ListFilterInputTypeOfMemoryFilterInput = {
  all?: InputMaybe<MemoryFilterInput>;
  any?: InputMaybe<Scalars['Boolean']>;
  none?: InputMaybe<MemoryFilterInput>;
  some?: InputMaybe<MemoryFilterInput>;
};

export type ListFilterInputTypeOfRefillFilterInput = {
  all?: InputMaybe<RefillFilterInput>;
  any?: InputMaybe<Scalars['Boolean']>;
  none?: InputMaybe<RefillFilterInput>;
  some?: InputMaybe<RefillFilterInput>;
};

/** A geographic location for an entity */
export type Location = {
  __typename?: 'Location';
  /** First line of a street address */
  addressLine1?: Maybe<Scalars['String']>;
  /** Second line of a street address */
  addressLine2?: Maybe<Scalars['String']>;
  /** City of a street address */
  city?: Maybe<Scalars['String']>;
  /** State of a street address */
  country?: Maybe<Scalars['String']>;
  /** Free text address */
  freeTextAddress?: Maybe<Scalars['String']>;
  id: Scalars['UUID'];
  saveState: LocationState;
  singleLineAddress?: Maybe<Scalars['String']>;
  /** State of a street address */
  state?: Maybe<Scalars['String']>;
  /** Zip code of a street address */
  zipCode?: Maybe<Scalars['String']>;
};

/** Create a geographic location for an entity */
export type LocationCreateInput = {
  /** First line of a street address */
  addressLine1?: InputMaybe<Scalars['String']>;
  /** Second line of a street address */
  addressLine2?: InputMaybe<Scalars['String']>;
  /** City of a street address */
  city?: InputMaybe<Scalars['String']>;
  /** State of a street address */
  country?: InputMaybe<Scalars['String']>;
  /** Free text address */
  freeTextAddress?: InputMaybe<Scalars['String']>;
  /** State of a street address */
  state?: InputMaybe<Scalars['String']>;
  /** Zip code of a street address */
  zipCode?: InputMaybe<Scalars['String']>;
};

/** A geographic location for an entity */
export type LocationFilterInput = {
  /** First line of a street address */
  addressLine1?: InputMaybe<StringOperationFilterInput>;
  /** Second line of a street address */
  addressLine2?: InputMaybe<StringOperationFilterInput>;
  and?: InputMaybe<Array<LocationFilterInput>>;
  /** City of a street address */
  city?: InputMaybe<StringOperationFilterInput>;
  /** State of a street address */
  country?: InputMaybe<StringOperationFilterInput>;
  /** Free text address */
  freeTextAddress?: InputMaybe<StringOperationFilterInput>;
  id?: InputMaybe<ComparableGuidOperationFilterInput>;
  or?: InputMaybe<Array<LocationFilterInput>>;
  /** State of a street address */
  state?: InputMaybe<StringOperationFilterInput>;
  /** Zip code of a street address */
  zipCode?: InputMaybe<StringOperationFilterInput>;
};

/** FindOrCreate a geographic location for an entity */
export type LocationFindOrCreate = {
  __typename?: 'LocationFindOrCreate';
  /** First line of a street address */
  addressLine1?: Maybe<Scalars['String']>;
  /** Second line of a street address */
  addressLine2?: Maybe<Scalars['String']>;
  /** City of a street address */
  city?: Maybe<Scalars['String']>;
  /** State of a street address */
  country?: Maybe<Scalars['String']>;
  /** Free text address */
  freeTextAddress?: Maybe<Scalars['String']>;
  /** Id of the location record */
  id?: Maybe<Scalars['UUID']>;
  /** State of a street address */
  state?: Maybe<Scalars['String']>;
  /** Zip code of a street address */
  zipCode?: Maybe<Scalars['String']>;
};

/** FindOrCreate a geographic location for an entity */
export type LocationFindOrCreateInput = {
  /** First line of a street address */
  addressLine1?: InputMaybe<Scalars['String']>;
  /** Second line of a street address */
  addressLine2?: InputMaybe<Scalars['String']>;
  /** City of a street address */
  city?: InputMaybe<Scalars['String']>;
  /** State of a street address */
  country?: InputMaybe<Scalars['String']>;
  /** Free text address */
  freeTextAddress?: InputMaybe<Scalars['String']>;
  /** Id of the location record */
  id?: InputMaybe<Scalars['UUID']>;
  /** State of a street address */
  state?: InputMaybe<Scalars['String']>;
  /** Zip code of a street address */
  zipCode?: InputMaybe<Scalars['String']>;
};

/** A geographic location for an entity */
export type LocationInput = {
  /** First line of a street address */
  addressLine1?: InputMaybe<Scalars['String']>;
  /** Second line of a street address */
  addressLine2?: InputMaybe<Scalars['String']>;
  /** City of a street address */
  city?: InputMaybe<Scalars['String']>;
  /** State of a street address */
  country?: InputMaybe<Scalars['String']>;
  /** Free text address */
  freeTextAddress?: InputMaybe<Scalars['String']>;
  id: Scalars['UUID'];
  /** State of a street address */
  state?: InputMaybe<Scalars['String']>;
  /** Zip code of a street address */
  zipCode?: InputMaybe<Scalars['String']>;
};

export type LocationState = {
  __typename?: 'LocationState';
  addressLine1?: Maybe<Scalars['String']>;
  addressLine2?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  freeTextAddress?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
  zipCode?: Maybe<Scalars['String']>;
};

export enum MeasurementSystem {
  Imperial = 'IMPERIAL',
  Metric = 'METRIC'
}

export type MeasurementSystemOperationFilterInput = {
  eq?: InputMaybe<MeasurementSystem>;
  in?: InputMaybe<Array<MeasurementSystem>>;
  neq?: InputMaybe<MeasurementSystem>;
  nin?: InputMaybe<Array<MeasurementSystem>>;
};

/** A medication a care recipient has */
export type Medication = {
  __typename?: 'Medication';
  /** Dispensable Drug Id of a Medication */
  dispensableDrugId?: Maybe<Scalars['String']>;
  id: Scalars['UUID'];
  /** Name of a Medication */
  name: Scalars['String'];
  /** Routed Dose Form Id of a Medication */
  routedDoseFormDrugId?: Maybe<Scalars['String']>;
};

/** Create a new medication */
export type MedicationCreateInput = {
  /** Dispensable Drug Id of a Medication */
  dispensableDrugId?: InputMaybe<Scalars['String']>;
  /** Name of a Medication */
  name: Scalars['String'];
  /** Routed Dose Form Id of a Medication */
  routedDoseFormDrugId?: InputMaybe<Scalars['String']>;
};

/** Represents payload for creating a medication */
export type MedicationCreatePayload = {
  __typename?: 'MedicationCreatePayload';
  result: Medication;
};

/** A medication a care recipient has */
export type MedicationFilterInput = {
  and?: InputMaybe<Array<MedicationFilterInput>>;
  /** Dispensable Drug Id of a Medication */
  dispensableDrugId?: InputMaybe<StringOperationFilterInput>;
  id?: InputMaybe<ComparableGuidOperationFilterInput>;
  /** Name of a Medication */
  name?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<MedicationFilterInput>>;
  /** Routed Dose Form Id of a Medication */
  routedDoseFormDrugId?: InputMaybe<StringOperationFilterInput>;
};

/** FindOrCreates a medication on a medication prescription */
export type MedicationFindOrCreate = {
  __typename?: 'MedicationFindOrCreate';
  /** Dispensable Drug Id of a Medication */
  dispensableDrugId?: Maybe<Scalars['String']>;
  /** Id of a Medication */
  id?: Maybe<Scalars['UUID']>;
  /** Name of a Medication */
  name: Scalars['String'];
  /** Routed Dose Form Id of a Medication */
  routedDoseFormDrugId?: Maybe<Scalars['String']>;
};

/** FindOrCreates a medication on a medication prescription */
export type MedicationFindOrCreateInput = {
  /** Dispensable Drug Id of a Medication */
  dispensableDrugId?: InputMaybe<Scalars['String']>;
  /** Id of a Medication */
  id?: InputMaybe<Scalars['UUID']>;
  /** Name of a Medication */
  name: Scalars['String'];
  /** Routed Dose Form Id of a Medication */
  routedDoseFormDrugId?: InputMaybe<Scalars['String']>;
};

/** Create a new medication prescription */
export type MedicationPrescriptionCreate = {
  __typename?: 'MedicationPrescriptionCreate';
  /** Directions for taking the Medication */
  directions?: Maybe<Scalars['String']>;
  /** Schedule for this medication prescription */
  dosages?: Maybe<Array<DosageCreate>>;
  /** Care recipient this medication prescription is for */
  medication?: Maybe<MedicationFindOrCreate>;
  /** Indicator for if this prescription is over the counter */
  overTheCounter?: Maybe<Scalars['Boolean']>;
  /** Provider for this medication prescription */
  prescribingProvider?: Maybe<ProviderFindOrCreate>;
  /** Next refill for medication prescription */
  refill?: Maybe<RefillFindOrCreate>;
  /** Remaining refills on the medication prescription */
  remainingRefills?: Maybe<Scalars['Int']>;
  /** Strength Unit of the medication request */
  strengthUnit?: Maybe<Scalars['String']>;
  /** Strength Value of the medication request */
  strengthValue?: Maybe<Scalars['String']>;
  /** Condition this medication is being taken for */
  takenFor?: Maybe<ConditionOccurrenceFindOrCreate>;
};

/** Create a new medication prescription */
export type MedicationPrescriptionCreateInput = {
  /** Directions for taking the Medication */
  directions?: InputMaybe<Scalars['String']>;
  /** Schedule for this medication prescription */
  dosages?: InputMaybe<Array<DosageCreateInput>>;
  /** Care recipient this medication prescription is for */
  medication?: InputMaybe<MedicationFindOrCreateInput>;
  /** Indicator for if this prescription is over the counter */
  overTheCounter?: InputMaybe<Scalars['Boolean']>;
  /** Provider for this medication prescription */
  prescribingProvider?: InputMaybe<ProviderFindOrCreateInput>;
  /** Next refill for medication prescription */
  refill?: InputMaybe<RefillFindOrCreateInput>;
  /** Remaining refills on the medication prescription */
  remainingRefills?: InputMaybe<Scalars['Int']>;
  /** Strength Unit of the medication request */
  strengthUnit?: InputMaybe<Scalars['String']>;
  /** Strength Value of the medication request */
  strengthValue?: InputMaybe<Scalars['String']>;
  /** Condition this medication is being taken for */
  takenFor?: InputMaybe<ConditionOccurrenceFindOrCreateInput>;
};

/** Represents the payload to return after creating a medication */
export type MedicationPrescriptionCreatePayload = {
  __typename?: 'MedicationPrescriptionCreatePayload';
  result: Prescription;
};

/** Delete a medication */
export type MedicationPrescriptionDeleteInput = {
  id: Scalars['UUID'];
};

/** Represents payload for deleting a medication */
export type MedicationPrescriptionDeletePayload = {
  __typename?: 'MedicationPrescriptionDeletePayload';
  result: Prescription;
};

/** Decrement the refills remaining on a medication prescription */
export type MedicationPrescriptionRemainingRefillsDecrementInput = {
  /** Id of the medication prescription */
  id: Scalars['UUID'];
};

/** Represents the payload to return after decrementing the refills remaining on a medication prescription */
export type MedicationPrescriptionRemainingRefillsDecrementPayload = {
  __typename?: 'MedicationPrescriptionRemainingRefillsDecrementPayload';
  result: Prescription;
};

/** Set a medication prescription current status to true (curent) */
export type MedicationPrescriptionSetCurrentInput = {
  /** Id of the medication prescription */
  id: Scalars['UUID'];
};

/** Represents the payload to return setting a medication prescription current status to true (curent) */
export type MedicationPrescriptionSetCurrentPayload = {
  __typename?: 'MedicationPrescriptionSetCurrentPayload';
  result: Prescription;
};

/** Set a medication prescription current status to false (historic) */
export type MedicationPrescriptionSetHistoricalInput = {
  /** Id of the medication prescription */
  id: Scalars['UUID'];
};

/** Represents the payload to return setting a medication prescription current status to false (historic) */
export type MedicationPrescriptionSetHistoricalPayload = {
  __typename?: 'MedicationPrescriptionSetHistoricalPayload';
  result: Prescription;
};

/** Update a medication prescription */
export type MedicationPrescriptionUpdateInput = {
  /** Directions for taking the Medication */
  directions?: InputMaybe<Scalars['String']>;
  /** Schedule for this medication prescription */
  dosages?: InputMaybe<Array<DosageCreateInput>>;
  /** Id of the medication request */
  id: Scalars['UUID'];
  /** Care recipient this medication prescription is for */
  medication?: InputMaybe<MedicationFindOrCreateInput>;
  /** Indicator for if this prescription is over the counter */
  overTheCounter?: InputMaybe<Scalars['Boolean']>;
  /** Provider for this medication prescription */
  prescribingProvider?: InputMaybe<ProviderFindOrCreateInput>;
  /** Next refill for medication prescription */
  refill?: InputMaybe<RefillFindOrCreateInput>;
  /** Remaining refills on the medication prescription */
  remainingRefills?: InputMaybe<Scalars['Int']>;
  /** Strength Unit of the medication request */
  strengthUnit?: InputMaybe<Scalars['String']>;
  /** Strength Value of the medication request */
  strengthValue?: InputMaybe<Scalars['String']>;
  /** Condition this medication is being taken for */
  takenFor?: InputMaybe<ConditionOccurrenceFindOrCreateInput>;
};

/** Represents the payload to return after updating a medication */
export type MedicationPrescriptionUpdatePayload = {
  __typename?: 'MedicationPrescriptionUpdatePayload';
  result: Prescription;
};

/** Search medications */
export type MedicationSearchInput = {
  searchText: Scalars['String'];
};

export type MedicationSearchResponse = {
  __typename?: 'MedicationSearchResponse';
  items?: Maybe<Array<RoutedDoseFormDrug>>;
};

export type MedicationSearchResponsePayload = {
  __typename?: 'MedicationSearchResponsePayload';
  result: MedicationSearchResponse;
};

/** A medication a care recipient has */
export type MedicationSortInput = {
  /** Dispensable Drug Id of a Medication */
  dispensableDrugId?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  /** Name of a Medication */
  name?: InputMaybe<SortEnumType>;
  /** Routed Dose Form Id of a Medication */
  routedDoseFormDrugId?: InputMaybe<SortEnumType>;
};

export enum MembershipStatus {
  Error = 'ERROR',
  Member = 'MEMBER',
  Pending = 'PENDING',
  Rejected = 'REJECTED',
  Removed = 'REMOVED'
}

export type MembershipStatusOperationFilterInput = {
  eq?: InputMaybe<MembershipStatus>;
  in?: InputMaybe<Array<MembershipStatus>>;
  neq?: InputMaybe<MembershipStatus>;
  nin?: InputMaybe<Array<MembershipStatus>>;
};

/** An memory a care giver documented */
export type Memory = {
  __typename?: 'Memory';
  /** Care Circle Membership of the Care giver that documented the memory */
  careGiverMembership?: Maybe<CareCircleMembership>;
  /** End Date of the memory */
  endDate?: Maybe<Scalars['String']>;
  /** Experience the memory is for */
  experience?: Maybe<Experience>;
  id: Scalars['UUID'];
  /** Start Date of the memory */
  startDate?: Maybe<Scalars['String']>;
  /** Text of the memory */
  text?: Maybe<Scalars['String']>;
};

/** Create a memory a care giver documented */
export type MemoryCreateInput = {
  /** Care giver that documented the memory */
  careGiver?: InputMaybe<CareGiverInput>;
  /** End Date of the memory */
  endDate?: InputMaybe<Scalars['String']>;
  /** Experience the memory is for */
  experience?: InputMaybe<ExperienceInput>;
  /** Start Date of the memory */
  startDate?: InputMaybe<Scalars['String']>;
  /** Text of the memory */
  text?: InputMaybe<Scalars['String']>;
};

/** Represents the payload to return after creating a memory */
export type MemoryCreatePayload = {
  __typename?: 'MemoryCreatePayload';
  result: Memory;
};

/** Delete an memory */
export type MemoryDeleteInput = {
  /** Id of a memory */
  id: Scalars['UUID'];
};

/** Represents the payload to return after deleting a memory */
export type MemoryDeletePayload = {
  __typename?: 'MemoryDeletePayload';
  result: Response;
};

/** An memory a care giver documented */
export type MemoryFilterInput = {
  and?: InputMaybe<Array<MemoryFilterInput>>;
  /** Care Circle Membership of the Care giver that documented the memory */
  careGiverMembership?: InputMaybe<CareCircleMembershipFilterInput>;
  /** End Date of the memory */
  endDate?: InputMaybe<StringOperationFilterInput>;
  /** Experience the memory is for */
  experience?: InputMaybe<ExperienceFilterInput>;
  id?: InputMaybe<ComparableGuidOperationFilterInput>;
  or?: InputMaybe<Array<MemoryFilterInput>>;
  /** Start Date of the memory */
  startDate?: InputMaybe<StringOperationFilterInput>;
  /** Text of the memory */
  text?: InputMaybe<StringOperationFilterInput>;
};

/** An memory a care giver documented */
export type MemoryInput = {
  /** Care Circle Membership of the Care giver that documented the memory */
  careGiverMembership?: InputMaybe<CareCircleMembershipInput>;
  /** End Date of the memory */
  endDate?: InputMaybe<Scalars['String']>;
  /** Experience the memory is for */
  experience?: InputMaybe<ExperienceInput>;
  id: Scalars['UUID'];
  /** Start Date of the memory */
  startDate?: InputMaybe<Scalars['String']>;
  /** Text of the memory */
  text?: InputMaybe<Scalars['String']>;
};

/** Update a memory */
export type MemoryUpdateInput = {
  /** Care giver that documented the memory */
  careGiver?: InputMaybe<CareGiverInput>;
  /** End Date of the memory */
  endDate?: InputMaybe<Scalars['String']>;
  /** Experience the memory is for */
  experience?: InputMaybe<ExperienceInput>;
  /** Id of a memory */
  id: Scalars['UUID'];
  /** Start Date of the memory */
  startDate?: InputMaybe<Scalars['String']>;
  /** Text of the memory */
  text?: InputMaybe<Scalars['String']>;
};

/** Represents the payload to return after updating a memory */
export type MemoryUpdatePayload = {
  __typename?: 'MemoryUpdatePayload';
  result: Memory;
};

export enum Month {
  April = 'APRIL',
  August = 'AUGUST',
  December = 'DECEMBER',
  February = 'FEBRUARY',
  January = 'JANUARY',
  July = 'JULY',
  June = 'JUNE',
  March = 'MARCH',
  May = 'MAY',
  November = 'NOVEMBER',
  October = 'OCTOBER',
  September = 'SEPTEMBER'
}

/** Represents the mutations available. */
export type Mutation = {
  __typename?: 'Mutation';
  /** Delete an existing activity for a care recipient's careplan */
  activityDelete: ActivityDeletePayload;
  /** Create new allergy */
  allergyCreate: AllergyCreatePayload;
  /** Soft Delete an allergy */
  allergyDelete: AllergyDeletePayload;
  /** Update an existing allergy */
  allergyUpdate: AllergyUpdatePayload;
  /** Create a new annotation for a care recipient */
  annotationCreate: AnnotationCreatePayload;
  /** Delete an existing annotation for a care recipient */
  annotationDelete: AnnotationDeletePayload;
  /** Update an existing annotation for a care recipient */
  annotationUpdate: AnnotationUpdatePayload;
  /** Edit an existing app invitation */
  appInvitationUpdate: AppInvitationUpdatePayload;
  /** Create a new appointment for a care recipient */
  appointmentCreate: AppointmentCreatePayload;
  /** Delete an existing appointment for a care recipient */
  appointmentDelete: AppointmentDeletePayload;
  /** Update an existing appointment for a care recipient */
  appointmentUpdate: AppointmentUpdatePayload;
  careGiverApproveToCareCircle: CareGiverApproveToCareCirclePayload;
  /** Turn email or sms channels on by default for all carecircle notifications */
  careGiverCarecircleNotificationSettingsDefaults: CareGiverCarecircleNotificationSettingsDefaultsPayload;
  /** Logs the time and date that caregivers agrees to the apps terms and other consent options */
  careGiverConsentUpdate: CareGiverConsentUpdatePayload;
  /** Set CareGiver admin state */
  careGiverSetAdmin: CareGiverSetAdminPayload;
  /** Set CareGiver emergency contact state */
  careGiverSetEmergencyContact: CareGiverSetEmergencyContactPayload;
  /** Update relationship of a CareGiver to the Loved One */
  careGiverSetRelationshipToLovedOne: CareGiverSetRelationshipToLovedOnePayload;
  /** Update CareGiver onboarding status */
  careGiverUpdateOnboardingStatus: UserProfileOnboardingStatusUpdatePayload;
  /** Create a new care plan for a care recipient */
  carePlanCreate: CarePlanCreatePayload;
  /** Delete an existing care plan for a care recipient */
  carePlanDelete: CarePlanDeletePayload;
  /** Delete a file from the care recipients care plan area */
  carePlanDocumentDelete: CarePlanDocumentDeletePayload;
  /** Rename a care plan file */
  carePlanDocumentRename: CarePlanDocumentRenamePayload;
  /** Upload a new file to the care recipients care plan area */
  carePlanDocumentUpload: CarePlanDocumentUploadPayload;
  /** Update an existing care plan for a care recipient */
  carePlanUpdate: CarePlanUpdatePayload;
  /** Updates the address for the care recipient by passing a new location to be created or the ID of an existing location */
  careRecipientAddressUpdate: CareRecipientAddressUpdatePayload;
  /** Update a care recipient's measurement preferences */
  careRecipientMeasurementSystemUpdate: CareRecipientMeasurementSystemUpdatePayload;
  /** Update the height and weight of a care recipient in CM and KG */
  careRecipientMeasurementsUpdate: CareRecipientMeasurementsUpdatePayload;
  /** Upload a photo for the care recipient */
  careRecipientPhotoUpload: CareRecipientPhotoUploadPayload;
  /** Initialises the care recipient profile within the care circle and sets the first and optional last name */
  careRecipientProfileCreate: CareRecipientProfileCreatePayload;
  /** Updates profile info for the care recipient */
  careRecipientProfileUpdate: CareRecipientProfileUpdatePayload;
  /** Update a care recipient's timezone info */
  careRecipientTimezoneUpdate: CareRecipientTimeZoneUpdatePayload;
  /** Updates caregivers local timezone and notification contact info */
  caregiverNotificationSettingsUpdate: CareGiverNotificationSettingsUpdatePayload;
  clearCareCircleData: ClearCareCircleDataPayLoad;
  /** Create new condition occurrence */
  conditionOccurrenceCreate: ConditionOccurrenceCreatePayload;
  /** Soft Delete a condition occurrence */
  conditionOccurrenceDelete: ConditionOccurrenceDeletePayload;
  /** Set condition occurrence current to true (current) */
  conditionOccurrenceSetCurrent: ConditionOccurrenceSetCurrentPayload;
  /** Set condition occurrence current to false (historical) */
  conditionOccurrenceSetHistorical: ConditionOccurrenceSetHistoricalPayload;
  /** Update a condition occurrence */
  conditionOccurrenceUpdate: ConditionOccurrenceUpdatePayload;
  /** Adds a new care circle to the system */
  createCareCircle: CreateCareCirclePayload;
  /** Create new user from their Microsoft Identity */
  createCareGiver: CreateCareGiverPayload;
  /** Generates a new invite link for the care circle */
  createInvite: CreateInvitePayload;
  /** @deprecated Use clear care circle mutation instead */
  deleteAll: DeleteAllAppDataPayLoad;
  /** Create a set of embeddings for a document */
  documentEmbed: DocumentEmbedResponsePayload;
  /** Add a tag to a document */
  documentTagAdd: DocumentTagAddResponsePayload;
  /** Remove a tag from a document */
  documentTagRemove: DocumentTagRemoveResponsePayload;
  /** Soft delete a medication prescription dosage schedule */
  dosageDelete: DosageDeletePayload;
  /** Create a new encounter for a care recipient */
  encounterCreate: EncounterCreateResponsePayload;
  /** Delete an existing encounter for a care recipient */
  encounterDelete: EncounterDeleteResponsePayload;
  /** Set an encounter current to true (current) */
  encounterSetCurrent: EncounterSetCurrentPayload;
  /** Set an encounter current to false (historical) */
  encounterSetHistorical: EncounterSetHistoricalPayload;
  /** Update an existing encounter for a care recipient */
  encounterUpdate: EncounterUpdateResponsePayload;
  /** Create new Experience */
  experienceCreate: ExperienceCreatePayload;
  /** Delete an Experience */
  experienceDelete: ExperienceDeletePayload;
  /** Create new Experience Occurrence */
  experienceOccurrenceCreate: ExperienceOccurrenceCreatePayload;
  /** Delete an Experience Occurrence */
  experienceOccurrenceDelete: ExperienceOccurrenceDeletePayload;
  /** Update an Experience Occurrence */
  experienceOccurrenceUpdate: ExperienceOccurrenceUpdatePayload;
  /** Update an Experience */
  experienceUpdate: ExperienceUpdatePayload;
  /** Create new immunization */
  immunizationCreate: ImmunizationCreatePayload;
  /** Soft Delete an immunization */
  immunizationDelete: ImmunizationDeletePayload;
  /** Update a immunization */
  immunizationUpdate: ImmunizationUpdatePayload;
  /** Join a care circle using a code */
  joinCareCircleFromInviteLink: JoinCareCircleFromInviteLinkPayload;
  /** Create new medication */
  medicationCreate: MedicationCreatePayload;
  /** Create new medication prescription */
  medicationPrescriptionCreate: MedicationPrescriptionCreatePayload;
  /** Soft delete a medication prescription */
  medicationPrescriptionDelete: MedicationPrescriptionDeletePayload;
  /** Set a medication prescription current to true (current) */
  medicationPrescriptionSetCurrent: MedicationPrescriptionSetCurrentPayload;
  /** Set a medication prescription current to false (historical) */
  medicationPrescriptionSetHistorical: MedicationPrescriptionSetHistoricalPayload;
  /** Update a medication prescription */
  medicationPrescriptionUpdate: MedicationPrescriptionUpdatePayload;
  /** Decrement the number of remaining refills for a medication prescription BY 1 */
  medicationRefillDecrement: MedicationPrescriptionRemainingRefillsDecrementPayload;
  /** Create new memory */
  memoryCreate: MemoryCreatePayload;
  /** Delete an memory */
  memoryDelete: MemoryDeletePayload;
  /** Update an memory */
  memoryUpdate: MemoryUpdatePayload;
  /** Mark a notification as acknowledged, also marks as seen */
  notificationAcknowledged: NotificationAcknowledgedPayload;
  /** Set Activity Sign Ups Notification Preference */
  notificationPreferenceUpdate: NotificationPreferencesUpdatePayload;
  /**
   * Deprectated Set Activity Sign Ups Notification Preference
   * @deprecated Deprecated in favour of NotificationPreferenceUpdateAsync
   */
  notificationPreferencesSet: NotificationPreferencesSetPayload;
  /** Mark a notification as seen */
  notificationSeen: NotificationSeenPayload;
  /** Creates an observation */
  observationCreate: ObservationCreateResponsePayload;
  /** Deletes an observation */
  observationDelete: ObservationDeleteResponsePayload;
  /** Updates an observation */
  observationUpdate: ObservationUpdateResponsePayload;
  /** Create new pharmacy */
  pharmacyCreate: PharmacyCreatePayload;
  /** Soft Delete a pharmacy */
  pharmacyDelete: PharmacyDeletePayload;
  /** Update a pharmacy */
  pharmacyUpdate: PharmacyUpdatePayload;
  /** Creates a procedure */
  procedureCreate: ProcedureCreateResponsePayload;
  /** Deletes a procedure */
  procedureDelete: ProcedureDeleteResponsePayload;
  /** Updates a procedure */
  procedureUpdate: ProcedureUpdateResponsePayload;
  /** Create new provider */
  providerCreate: ProviderCreatePayload;
  /** Soft Delete a provider */
  providerDelete: ProviderDeletePayload;
  /** Update a provider */
  providerUpdate: ProviderUpdatePayload;
  /** Soft delete a medication prescription refill */
  refillDelete: RefillDeletePayload;
  /** Remove pharmacy from refill */
  refillPharmacyRemove: RefillPharmacyRemovePayload;
  /** Update a medication refill */
  refillUpdate: RefillUpdatePayload;
  /** Used to remove from a care circle */
  removeCareGiverFromCareCircle: RemoveCareGiverFromCareCirclePayload;
  revokeInvite: RevokeInvitePayload;
};


/** Represents the mutations available. */
export type MutationActivityDeleteArgs = {
  input: ActivityDeleteInput;
};


/** Represents the mutations available. */
export type MutationAllergyCreateArgs = {
  input: AllergyCreateInput;
};


/** Represents the mutations available. */
export type MutationAllergyDeleteArgs = {
  input: AllergyDeleteInput;
};


/** Represents the mutations available. */
export type MutationAllergyUpdateArgs = {
  input: AllergyUpdateInput;
};


/** Represents the mutations available. */
export type MutationAnnotationCreateArgs = {
  input: AnnotationCreateInput;
};


/** Represents the mutations available. */
export type MutationAnnotationDeleteArgs = {
  input: AnnotationDeleteInput;
};


/** Represents the mutations available. */
export type MutationAnnotationUpdateArgs = {
  input: AnnotationUpdateInput;
};


/** Represents the mutations available. */
export type MutationAppInvitationUpdateArgs = {
  input: AppInvitationUpdateInput;
};


/** Represents the mutations available. */
export type MutationAppointmentCreateArgs = {
  input: AppointmentCreateInput;
};


/** Represents the mutations available. */
export type MutationAppointmentDeleteArgs = {
  input: AppointmentDeleteInput;
};


/** Represents the mutations available. */
export type MutationAppointmentUpdateArgs = {
  input: AppointmentUpdateInput;
};


/** Represents the mutations available. */
export type MutationCareGiverApproveToCareCircleArgs = {
  input: CareGiverApproveToCareCircleInput;
};


/** Represents the mutations available. */
export type MutationCareGiverCarecircleNotificationSettingsDefaultsArgs = {
  input: CareGiverCarecircleNotificationSettingsDefaultsInput;
};


/** Represents the mutations available. */
export type MutationCareGiverConsentUpdateArgs = {
  input: CareGiverConsentUpdateInput;
};


/** Represents the mutations available. */
export type MutationCareGiverSetAdminArgs = {
  input: CareGiverSetAdminInput;
};


/** Represents the mutations available. */
export type MutationCareGiverSetEmergencyContactArgs = {
  input: CareGiverSetEmergencyContactInput;
};


/** Represents the mutations available. */
export type MutationCareGiverSetRelationshipToLovedOneArgs = {
  input: CareGiverSetRelationshipToLovedOneInput;
};


/** Represents the mutations available. */
export type MutationCareGiverUpdateOnboardingStatusArgs = {
  input: UserProfileOnboardingStatusUpdateInput;
};


/** Represents the mutations available. */
export type MutationCarePlanCreateArgs = {
  input: CarePlanCreateInput;
};


/** Represents the mutations available. */
export type MutationCarePlanDeleteArgs = {
  input: CarePlanDeleteInput;
};


/** Represents the mutations available. */
export type MutationCarePlanDocumentDeleteArgs = {
  input: CarePlanDocumentDeleteInput;
};


/** Represents the mutations available. */
export type MutationCarePlanDocumentRenameArgs = {
  input: CarePlanDocumentRenameInput;
};


/** Represents the mutations available. */
export type MutationCarePlanDocumentUploadArgs = {
  input: CarePlanDocumentUploadInput;
};


/** Represents the mutations available. */
export type MutationCarePlanUpdateArgs = {
  input: CarePlanUpdateInput;
};


/** Represents the mutations available. */
export type MutationCareRecipientAddressUpdateArgs = {
  input: CareRecipientAddressUpdateInput;
};


/** Represents the mutations available. */
export type MutationCareRecipientMeasurementSystemUpdateArgs = {
  input: CareRecipientMeasurementSystemUpdateInput;
};


/** Represents the mutations available. */
export type MutationCareRecipientMeasurementsUpdateArgs = {
  input: CareRecipientMeasurementsUpdateInput;
};


/** Represents the mutations available. */
export type MutationCareRecipientPhotoUploadArgs = {
  input: CareRecipientPhotoUploadInput;
};


/** Represents the mutations available. */
export type MutationCareRecipientProfileCreateArgs = {
  input: CareRecipientProfileCreateInput;
};


/** Represents the mutations available. */
export type MutationCareRecipientProfileUpdateArgs = {
  input: CareRecipientProfileUpdateInput;
};


/** Represents the mutations available. */
export type MutationCareRecipientTimezoneUpdateArgs = {
  input: CareRecipientTimeZoneUpdateInput;
};


/** Represents the mutations available. */
export type MutationCaregiverNotificationSettingsUpdateArgs = {
  input: CareGiverNotificationSettingsUpdateInput;
};


/** Represents the mutations available. */
export type MutationClearCareCircleDataArgs = {
  input: ClearCareCircleDataInput;
};


/** Represents the mutations available. */
export type MutationConditionOccurrenceCreateArgs = {
  input: ConditionOccurrenceCreateInput;
};


/** Represents the mutations available. */
export type MutationConditionOccurrenceDeleteArgs = {
  input: ConditionOccurrenceDeleteInput;
};


/** Represents the mutations available. */
export type MutationConditionOccurrenceSetCurrentArgs = {
  input: ConditionOccurrenceSetCurrentInput;
};


/** Represents the mutations available. */
export type MutationConditionOccurrenceSetHistoricalArgs = {
  input: ConditionOccurrenceSetHistoricalInput;
};


/** Represents the mutations available. */
export type MutationConditionOccurrenceUpdateArgs = {
  input: ConditionOccurrenceUpdateInput;
};


/** Represents the mutations available. */
export type MutationCreateCareCircleArgs = {
  input: CreateCareCircleInput;
};


/** Represents the mutations available. */
export type MutationCreateCareGiverArgs = {
  input: CreateCareGiverInput;
};


/** Represents the mutations available. */
export type MutationCreateInviteArgs = {
  input: CreateInviteInput;
};


/** Represents the mutations available. */
export type MutationDeleteAllArgs = {
  input: DeleteAllAppDataInput;
};


/** Represents the mutations available. */
export type MutationDocumentEmbedArgs = {
  input: DocumentEmbedInput;
};


/** Represents the mutations available. */
export type MutationDocumentTagAddArgs = {
  input: DocumentTagAddInput;
};


/** Represents the mutations available. */
export type MutationDocumentTagRemoveArgs = {
  input: DocumentTagRemoveInput;
};


/** Represents the mutations available. */
export type MutationDosageDeleteArgs = {
  input: DosageDeleteInput;
};


/** Represents the mutations available. */
export type MutationEncounterCreateArgs = {
  input: EncounterCreateInput;
};


/** Represents the mutations available. */
export type MutationEncounterDeleteArgs = {
  input: EncounterDeleteInput;
};


/** Represents the mutations available. */
export type MutationEncounterSetCurrentArgs = {
  input: EncounterSetCurrentInput;
};


/** Represents the mutations available. */
export type MutationEncounterSetHistoricalArgs = {
  input: EncounterSetHistoricalInput;
};


/** Represents the mutations available. */
export type MutationEncounterUpdateArgs = {
  input: EncounterUpdateInput;
};


/** Represents the mutations available. */
export type MutationExperienceCreateArgs = {
  input: ExperienceCreateInput;
};


/** Represents the mutations available. */
export type MutationExperienceDeleteArgs = {
  input: ExperienceDeleteInput;
};


/** Represents the mutations available. */
export type MutationExperienceOccurrenceCreateArgs = {
  input: ExperienceOccurrenceCreateInput;
};


/** Represents the mutations available. */
export type MutationExperienceOccurrenceDeleteArgs = {
  input: ExperienceOccurrenceDeleteInput;
};


/** Represents the mutations available. */
export type MutationExperienceOccurrenceUpdateArgs = {
  input: ExperienceOccurrenceUpdateInput;
};


/** Represents the mutations available. */
export type MutationExperienceUpdateArgs = {
  input: ExperienceUpdateInput;
};


/** Represents the mutations available. */
export type MutationImmunizationCreateArgs = {
  input: ImmunizationCreateInput;
};


/** Represents the mutations available. */
export type MutationImmunizationDeleteArgs = {
  input: ImmunizationDeleteInput;
};


/** Represents the mutations available. */
export type MutationImmunizationUpdateArgs = {
  input: ImmunizationUpdateInput;
};


/** Represents the mutations available. */
export type MutationJoinCareCircleFromInviteLinkArgs = {
  input: JoinCareCircleFromInviteLinkInput;
};


/** Represents the mutations available. */
export type MutationMedicationCreateArgs = {
  input: MedicationCreateInput;
};


/** Represents the mutations available. */
export type MutationMedicationPrescriptionCreateArgs = {
  input: MedicationPrescriptionCreateInput;
};


/** Represents the mutations available. */
export type MutationMedicationPrescriptionDeleteArgs = {
  input: MedicationPrescriptionDeleteInput;
};


/** Represents the mutations available. */
export type MutationMedicationPrescriptionSetCurrentArgs = {
  input: MedicationPrescriptionSetCurrentInput;
};


/** Represents the mutations available. */
export type MutationMedicationPrescriptionSetHistoricalArgs = {
  input: MedicationPrescriptionSetHistoricalInput;
};


/** Represents the mutations available. */
export type MutationMedicationPrescriptionUpdateArgs = {
  input: MedicationPrescriptionUpdateInput;
};


/** Represents the mutations available. */
export type MutationMedicationRefillDecrementArgs = {
  input: MedicationPrescriptionRemainingRefillsDecrementInput;
};


/** Represents the mutations available. */
export type MutationMemoryCreateArgs = {
  input: MemoryCreateInput;
};


/** Represents the mutations available. */
export type MutationMemoryDeleteArgs = {
  input: MemoryDeleteInput;
};


/** Represents the mutations available. */
export type MutationMemoryUpdateArgs = {
  input: MemoryUpdateInput;
};


/** Represents the mutations available. */
export type MutationNotificationAcknowledgedArgs = {
  input: NotificationSeenInput;
};


/** Represents the mutations available. */
export type MutationNotificationPreferenceUpdateArgs = {
  input: NotificationPreferencesUpdateInput;
};


/** Represents the mutations available. */
export type MutationNotificationPreferencesSetArgs = {
  input: NotificationPreferencesSetInput;
};


/** Represents the mutations available. */
export type MutationNotificationSeenArgs = {
  input: NotificationSeenInput;
};


/** Represents the mutations available. */
export type MutationObservationCreateArgs = {
  input: ObservationCreateInput;
};


/** Represents the mutations available. */
export type MutationObservationDeleteArgs = {
  input: ObservationDeleteInput;
};


/** Represents the mutations available. */
export type MutationObservationUpdateArgs = {
  input: ObservationUpdateInput;
};


/** Represents the mutations available. */
export type MutationPharmacyCreateArgs = {
  input: PharmacyCreateInput;
};


/** Represents the mutations available. */
export type MutationPharmacyDeleteArgs = {
  input: PharmacyDeleteInput;
};


/** Represents the mutations available. */
export type MutationPharmacyUpdateArgs = {
  input: PharmacyUpdateInput;
};


/** Represents the mutations available. */
export type MutationProcedureCreateArgs = {
  input: ProcedureCreateInput;
};


/** Represents the mutations available. */
export type MutationProcedureDeleteArgs = {
  input: ProcedureDeleteInput;
};


/** Represents the mutations available. */
export type MutationProcedureUpdateArgs = {
  input: ProcedureUpdateInput;
};


/** Represents the mutations available. */
export type MutationProviderCreateArgs = {
  input: ProviderCreateInput;
};


/** Represents the mutations available. */
export type MutationProviderDeleteArgs = {
  input: ProviderDeleteInput;
};


/** Represents the mutations available. */
export type MutationProviderUpdateArgs = {
  input: ProviderUpdateInput;
};


/** Represents the mutations available. */
export type MutationRefillDeleteArgs = {
  input: RefillDeleteInput;
};


/** Represents the mutations available. */
export type MutationRefillPharmacyRemoveArgs = {
  input: RefillPharmacyRemoveInput;
};


/** Represents the mutations available. */
export type MutationRefillUpdateArgs = {
  input: RefillUpdateInput;
};


/** Represents the mutations available. */
export type MutationRemoveCareGiverFromCareCircleArgs = {
  input: RemoveCareGiverFromCareCircleInput;
};


/** Represents the mutations available. */
export type MutationRevokeInviteArgs = {
  input: RevokeInviteInput;
};

export type Notification = {
  __typename?: 'Notification';
  acknowledged?: Maybe<Scalars['DateTime']>;
  created: Scalars['DateTime'];
  data?: Maybe<Array<KeyValuePairOfStringAndObject>>;
  domain: Scalars['String'];
  expiresOn?: Maybe<Scalars['DateTime']>;
  expiryMethod: NotificationExpiryTypes;
  id: Scalars['String'];
  recipientId: Scalars['String'];
  scope: Scalars['String'];
  scopeReference: Scalars['String'];
  seen?: Maybe<Scalars['DateTime']>;
  type: Scalars['String'];
};

/** Represents payload for acknowledging a notification */
export type NotificationAcknowledgedPayload = {
  __typename?: 'NotificationAcknowledgedPayload';
  response: Response;
};

export type NotificationChannelSelections = {
  __typename?: 'NotificationChannelSelections';
  emailEnabled: Scalars['Boolean'];
  inAppEnabled: Scalars['Boolean'];
  sMSEnabled: Scalars['Boolean'];
};

export enum NotificationExpiryTypes {
  Acknowledged = 'ACKNOWLEDGED',
  Date = 'DATE',
  Instant = 'INSTANT',
  Seen = 'SEEN'
}

export type NotificationFeatureProps = {
  __typename?: 'NotificationFeatureProps';
  availableChannels: Array<Channel>;
  feature: Feature;
  requiresUserOptIn: Scalars['Boolean'];
};

export enum NotificationPreference {
  ActivitySignUps = 'ACTIVITY_SIGN_UPS',
  CalendarAppointments = 'CALENDAR_APPOINTMENTS',
  DailyMedicationDoses = 'DAILY_MEDICATION_DOSES',
  General = 'GENERAL',
  NewMemberJoins = 'NEW_MEMBER_JOINS',
  PostsReactionsReplies = 'POSTS_REACTIONS_REPLIES',
  RefillReminders = 'REFILL_REMINDERS'
}

/** Deprecated - Use NotificationPreferencesUpdate mutation */
export type NotificationPreferencesSetInput = {
  /** Value for enabled or disabled */
  isEnabled: Scalars['Boolean'];
  /** Notification preference to set */
  preferenceToSet: NotificationPreference;
};

/** Represents payload for setting notification preference */
export type NotificationPreferencesSetPayload = {
  __typename?: 'NotificationPreferencesSetPayload';
  result: CareCircleProfile;
};

/** Set caregiver preferences for a Notification Group (Feature) */
export type NotificationPreferencesUpdateInput = {
  /** Indicates if the user wants Email enabled for this Notification Group. */
  emailEnabled: Scalars['Boolean'];
  /** Indicates if the user wants InApp notifications enabled for this Notification Group. */
  inAppEnabled: Scalars['Boolean'];
  /** Notification preference to set */
  notificationFeature: Feature;
  /** Indicates if the user wants SMS enabled for this Notification Group. */
  sMSEnabled: Scalars['Boolean'];
};

/** Represents payload for setting notification preference */
export type NotificationPreferencesUpdatePayload = {
  __typename?: 'NotificationPreferencesUpdatePayload';
  result: UserNotificationPreferences;
};

/** Set Notification as seen by the user */
export type NotificationSeenInput = {
  /** Id for notification to mark as seen */
  notificationId: Scalars['String'];
};

/** Returns response indicating mutation success */
export type NotificationSeenPayload = {
  __typename?: 'NotificationSeenPayload';
  response: Response;
};

export type NullableOfAllergySeverityOperationFilterInput = {
  eq?: InputMaybe<AllergySeverity>;
  in?: InputMaybe<Array<InputMaybe<AllergySeverity>>>;
  neq?: InputMaybe<AllergySeverity>;
  nin?: InputMaybe<Array<InputMaybe<AllergySeverity>>>;
};

export type NullableOfBloodTypesOperationFilterInput = {
  eq?: InputMaybe<BloodTypes>;
  in?: InputMaybe<Array<InputMaybe<BloodTypes>>>;
  neq?: InputMaybe<BloodTypes>;
  nin?: InputMaybe<Array<InputMaybe<BloodTypes>>>;
};

export type NullableOfCodedConceptCodingSystemOperationFilterInput = {
  eq?: InputMaybe<CodedConceptCodingSystem>;
  in?: InputMaybe<Array<InputMaybe<CodedConceptCodingSystem>>>;
  neq?: InputMaybe<CodedConceptCodingSystem>;
  nin?: InputMaybe<Array<InputMaybe<CodedConceptCodingSystem>>>;
};

export type NullableOfDietPreferencesOperationFilterInput = {
  eq?: InputMaybe<DietPreferences>;
  in?: InputMaybe<Array<InputMaybe<DietPreferences>>>;
  neq?: InputMaybe<DietPreferences>;
  nin?: InputMaybe<Array<InputMaybe<DietPreferences>>>;
};

export type NullableOfExperienceTypeOperationFilterInput = {
  eq?: InputMaybe<ExperienceType>;
  in?: InputMaybe<Array<InputMaybe<ExperienceType>>>;
  neq?: InputMaybe<ExperienceType>;
  nin?: InputMaybe<Array<InputMaybe<ExperienceType>>>;
};

export type NullableOfLegalAgeGroupClassificationOperationFilterInput = {
  eq?: InputMaybe<LegalAgeGroupClassification>;
  in?: InputMaybe<Array<InputMaybe<LegalAgeGroupClassification>>>;
  neq?: InputMaybe<LegalAgeGroupClassification>;
  nin?: InputMaybe<Array<InputMaybe<LegalAgeGroupClassification>>>;
};

export type NullableOfLegalSexOptionsOperationFilterInput = {
  eq?: InputMaybe<LegalSexOptions>;
  in?: InputMaybe<Array<InputMaybe<LegalSexOptions>>>;
  neq?: InputMaybe<LegalSexOptions>;
  nin?: InputMaybe<Array<InputMaybe<LegalSexOptions>>>;
};

export type NullableOfMonthOperationFilterInput = {
  eq?: InputMaybe<Month>;
  in?: InputMaybe<Array<InputMaybe<Month>>>;
  neq?: InputMaybe<Month>;
  nin?: InputMaybe<Array<InputMaybe<Month>>>;
};

export type NullableOfRelativeTimePeriodOperationFilterInput = {
  eq?: InputMaybe<RelativeTimePeriod>;
  in?: InputMaybe<Array<InputMaybe<RelativeTimePeriod>>>;
  neq?: InputMaybe<RelativeTimePeriod>;
  nin?: InputMaybe<Array<InputMaybe<RelativeTimePeriod>>>;
};

/** A vital sign or measurement taken from a care recipient */
export type Observation = {
  __typename?: 'Observation';
  /** The care recipient that had the observation */
  careRecipient?: Maybe<CareRecipient>;
  /** The code of the observation */
  code?: Maybe<CodedConcept>;
  id: Scalars['UUID'];
  /** The date and time the observation was taken */
  measurementTakenDateTime?: Maybe<Scalars['DateTime']>;
  /** The name of the observation */
  name?: Maybe<Scalars['String']>;
  /** The numeric value of the observation */
  numericValue?: Maybe<Scalars['Int']>;
  /** The status of the observation record in the database. Options are Active, Deleted, and Draft. Deleted means the record is soft deleted and not visible to the user. */
  recordStatus: RecordStatus;
  saveState: ObservationState;
  /** The string value of the observation */
  stringValue?: Maybe<Scalars['String']>;
  /** The unit of the observation */
  unit?: Maybe<Scalars['String']>;
};

/** Create an observation (metric) for a care recipient */
export type ObservationCreateInput = {
  /** The code of the observation */
  code: Scalars['String'];
  /** The code system of the observation */
  codeSystem: CodedConceptCodingSystem;
  /** The date and time the observation was taken */
  measurementTakenDateTime?: InputMaybe<Scalars['DateTime']>;
  /** The name of the observation */
  name?: InputMaybe<Scalars['String']>;
  /** The numeric value of the observation */
  numericValue?: InputMaybe<Scalars['Int']>;
  /** The string value of the observation */
  stringValue?: InputMaybe<Scalars['String']>;
  /** The unit of the observation */
  unit?: InputMaybe<Scalars['String']>;
};

/** Represents the payload to return after creating an observation */
export type ObservationCreateResponsePayload = {
  __typename?: 'ObservationCreateResponsePayload';
  result: Observation;
};

/** Delete an observation (metric) for a care recipient */
export type ObservationDeleteInput = {
  /** Id of an observation */
  id: Scalars['UUID'];
};

/** Represents the payload to return after deleting an observation */
export type ObservationDeleteResponsePayload = {
  __typename?: 'ObservationDeleteResponsePayload';
  result: Observation;
};

export type ObservationState = {
  __typename?: 'ObservationState';
  code?: Maybe<CodedConcept>;
  measurementTakenDateTime?: Maybe<Scalars['DateTime']>;
  name?: Maybe<Scalars['String']>;
  numericValue?: Maybe<Scalars['Int']>;
  stringValue?: Maybe<Scalars['String']>;
  unit?: Maybe<Scalars['String']>;
};

/** Update an observation (metric) for a care recipient */
export type ObservationUpdateInput = {
  /** The code of the observation */
  code: Scalars['String'];
  /** The code system of the observation */
  codeSystem: CodedConceptCodingSystem;
  /** Id of an observation */
  id: Scalars['UUID'];
  /** The date and time the observation was taken */
  measurementTakenDateTime?: InputMaybe<Scalars['DateTime']>;
  /** The name of the observation */
  name?: InputMaybe<Scalars['String']>;
  /** The numeric value of the observation */
  numericValue?: InputMaybe<Scalars['Int']>;
  /** The string value of the observation */
  stringValue?: InputMaybe<Scalars['String']>;
  /** The unit of the observation */
  unit?: InputMaybe<Scalars['String']>;
};

/** Represents the payload to return after updating an observation */
export type ObservationUpdateResponsePayload = {
  __typename?: 'ObservationUpdateResponsePayload';
  result: Observation;
};

export type OpenAiInquiryResponse = {
  __typename?: 'OpenAiInquiryResponse';
  choices: Array<OpenAiOutput>;
  id?: Maybe<Scalars['String']>;
  model?: Maybe<Scalars['String']>;
};

export type OpenAiInquiryResponsePayload = {
  __typename?: 'OpenAiInquiryResponsePayload';
  result: OpenAiInquiryResponse;
};

export type OpenAiOutput = {
  __typename?: 'OpenAiOutput';
  finishReason?: Maybe<Scalars['String']>;
  index?: Maybe<Scalars['Int']>;
  text?: Maybe<Scalars['String']>;
};

export type OpenAiTaskOutput = {
  __typename?: 'OpenAiTaskOutput';
  finishReason?: Maybe<Scalars['String']>;
  index?: Maybe<Scalars['Int']>;
  text: Array<RecurringTask>;
};

export type OpenAiTaskResponse = {
  __typename?: 'OpenAiTaskResponse';
  choices: Array<OpenAiTaskOutput>;
  id?: Maybe<Scalars['String']>;
  model?: Maybe<Scalars['String']>;
};

export type OpenAiTaskResponsePayload = {
  __typename?: 'OpenAiTaskResponsePayload';
  result: OpenAiTaskResponse;
};

export type OperatingHours = {
  __typename?: 'OperatingHours';
  mode?: Maybe<Scalars['String']>;
  timeRanges?: Maybe<Array<OperatingHoursTimeRange>>;
};

export type OperatingHoursTime = {
  __typename?: 'OperatingHoursTime';
  date?: Maybe<Scalars['String']>;
  hour?: Maybe<Scalars['Int']>;
  minute?: Maybe<Scalars['Int']>;
};

export type OperatingHoursTimeRange = {
  __typename?: 'OperatingHoursTimeRange';
  endTime?: Maybe<OperatingHoursTime>;
  startTime?: Maybe<OperatingHoursTime>;
};

export enum Permission {
  CalendarEditAppointments = 'CALENDAR_EDIT_APPOINTMENTS',
  CalendarViewOnly = 'CALENDAR_VIEW_ONLY',
  CareCircleInviteAndRemoveMembers = 'CARE_CIRCLE_INVITE_AND_REMOVE_MEMBERS',
  CareCircleManageOthersPermissions = 'CARE_CIRCLE_MANAGE_OTHERS_PERMISSIONS',
  CareCircleManageOwnProfile = 'CARE_CIRCLE_MANAGE_OWN_PROFILE',
  CareCircleNotificationPreferences = 'CARE_CIRCLE_NOTIFICATION_PREFERENCES',
  CareCircleSendFeedback = 'CARE_CIRCLE_SEND_FEEDBACK',
  CareCircleSetEmergencyContact = 'CARE_CIRCLE_SET_EMERGENCY_CONTACT',
  CareCircleSetRelationship = 'CARE_CIRCLE_SET_RELATIONSHIP',
  CarePlanCreateEdit = 'CARE_PLAN_CREATE_EDIT',
  CarePlanShare = 'CARE_PLAN_SHARE',
  MedManagerEdit = 'MED_MANAGER_EDIT',
  MedManagerShare = 'MED_MANAGER_SHARE',
  TtEditActivities = 'TT_EDIT_ACTIVITIES',
  TtFamilyFeed = 'TT_FAMILY_FEED',
  TtSignupActivities = 'TT_SIGNUP_ACTIVITIES'
}

/** A pharmacy contact for a care recipient */
export type Pharmacy = {
  __typename?: 'Pharmacy';
  /** Care recipient that has the pharmacy */
  careRecipient?: Maybe<CareRecipient>;
  id: Scalars['UUID'];
  /** Location of the pharmacy */
  location?: Maybe<Location>;
  /** Name of the pharmacy */
  name?: Maybe<Scalars['String']>;
  /** Phone Number of the pharmacy */
  phoneNumber?: Maybe<Scalars['String']>;
  /** Status of a Pharmacy record */
  recordStatus: RecordStatus;
  saveState: PharmacyState;
};

/** Create a pharmacy contact for a care recipient */
export type PharmacyCreateInput = {
  /** Location of the pharmacy */
  location?: InputMaybe<LocationFindOrCreateInput>;
  /** Name of the pharmacy */
  name?: InputMaybe<Scalars['String']>;
  /** Phone Number of the pharmacy */
  phoneNumber?: InputMaybe<Scalars['String']>;
};

/** Represents the payload to return after creating a pharmacy */
export type PharmacyCreatePayload = {
  __typename?: 'PharmacyCreatePayload';
  result: Pharmacy;
};

/** Soft delete a Pharmacy */
export type PharmacyDeleteInput = {
  id: Scalars['UUID'];
};

/** Payload to return after soft deleting a Pharmacy */
export type PharmacyDeletePayload = {
  __typename?: 'PharmacyDeletePayload';
  result: Pharmacy;
};

/** A pharmacy contact for a care recipient */
export type PharmacyFilterInput = {
  and?: InputMaybe<Array<PharmacyFilterInput>>;
  /** Care recipient that has the pharmacy */
  careRecipient?: InputMaybe<CareRecipientFilterInput>;
  id?: InputMaybe<ComparableGuidOperationFilterInput>;
  /** Location of the pharmacy */
  location?: InputMaybe<LocationFilterInput>;
  /** Name of the pharmacy */
  name?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<PharmacyFilterInput>>;
  /** Phone Number of the pharmacy */
  phoneNumber?: InputMaybe<StringOperationFilterInput>;
  /** Status of a Pharmacy record */
  recordStatus?: InputMaybe<RecordStatusOperationFilterInput>;
};

/** Update a pharmacy contact for a care recipient */
export type PharmacyFindOrCreate = {
  __typename?: 'PharmacyFindOrCreate';
  /** Id of a pharmacy */
  id?: Maybe<Scalars['UUID']>;
  /** Location of the pharmacy */
  location?: Maybe<LocationFindOrCreate>;
  /** Name of the pharmacy */
  name?: Maybe<Scalars['String']>;
  /** Phone Number of the pharmacy */
  phoneNumber?: Maybe<Scalars['String']>;
};

/** Update a pharmacy contact for a care recipient */
export type PharmacyFindOrCreateInput = {
  /** Id of a pharmacy */
  id?: InputMaybe<Scalars['UUID']>;
  /** Location of the pharmacy */
  location?: InputMaybe<LocationFindOrCreateInput>;
  /** Name of the pharmacy */
  name?: InputMaybe<Scalars['String']>;
  /** Phone Number of the pharmacy */
  phoneNumber?: InputMaybe<Scalars['String']>;
};

/** Search for a pharmacy */
export type PharmacySearchInput = {
  location?: InputMaybe<GeolocationCoordinateInput>;
  searchText: Scalars['String'];
};

export type PharmacyState = {
  __typename?: 'PharmacyState';
  name?: Maybe<Scalars['String']>;
  phoneNumber?: Maybe<Scalars['String']>;
};

/** Update a pharmacy contact for a care recipient */
export type PharmacyUpdateInput = {
  /** Id of a pharmacy */
  id: Scalars['UUID'];
  /** Location of the pharmacy */
  location?: InputMaybe<LocationFindOrCreateInput>;
  /** Name of the pharmacy */
  name?: InputMaybe<Scalars['String']>;
  /** Phone Number of the pharmacy */
  phoneNumber?: InputMaybe<Scalars['String']>;
};

/** Represents the payload to return after updating a pharmacy */
export type PharmacyUpdatePayload = {
  __typename?: 'PharmacyUpdatePayload';
  result: Pharmacy;
};

export type PointOfInterest = {
  __typename?: 'PointOfInterest';
  categories?: Maybe<Array<Scalars['String']>>;
  classifications?: Maybe<Array<Classification>>;
  name?: Maybe<Scalars['String']>;
  operatingHours?: Maybe<OperatingHours>;
  phoneNumber?: Maybe<Scalars['String']>;
  website?: Maybe<Scalars['String']>;
};

/** Generates a positive message based on user's relationship to the care recipient and the recipient's condition */
export type PositivitySlotGenerateInput = {
  careRecipientRelationship?: InputMaybe<Scalars['String']>;
  condition?: InputMaybe<Scalars['String']>;
};

/** A medication prescription a care recipient has (prescribed and Over the Counter) */
export type Prescription = {
  __typename?: 'Prescription';
  /** Annotations on the prescription */
  annotations?: Maybe<Array<Annotation>>;
  /** Medication this medication prescription is for */
  careRecipient?: Maybe<CareRecipient>;
  /** Is the medication prescription is current or historical. True if current, false if historical. Historical means the record is no longer current but is still visible to the user. */
  current: Scalars['Boolean'];
  /** Directions for taking the Medication */
  directions?: Maybe<Scalars['String']>;
  /** Schedule for this medication prescription */
  dosages?: Maybe<Array<Dosage>>;
  /** End Date of the Prescription */
  endDate?: Maybe<Scalars['String']>;
  id: Scalars['UUID'];
  /** Medication this medication prescription is for */
  medication?: Maybe<Medication>;
  /** Indicator for if this prescription is over the counter */
  overTheCounter?: Maybe<Scalars['Boolean']>;
  /** Prescribing provider of the medication prescription */
  prescribingProvider?: Maybe<Provider>;
  /** Status of the medication request record in the database. Options are Active, Deleted, and Draft. Deleted means the record is soft deleted and not visible to the user. */
  recordStatus: RecordStatus;
  /** Refill for medication prescription */
  refills: Array<Refill>;
  /** Number of remaining refills */
  remainingRefills?: Maybe<Scalars['Int']>;
  /** Start Date of the Prescription */
  startDate?: Maybe<Scalars['String']>;
  /** Strength Unit of the medication request */
  strengthUnit?: Maybe<Scalars['String']>;
  /** Strength Value of the medication request */
  strengthValue?: Maybe<Scalars['String']>;
  /** Condition this medication is being taken for */
  takenFor?: Maybe<ConditionOccurrence>;
};


/** A medication prescription a care recipient has (prescribed and Over the Counter) */
export type PrescriptionCareRecipientArgs = {
  where?: InputMaybe<CareRecipientFilterInput>;
};


/** A medication prescription a care recipient has (prescribed and Over the Counter) */
export type PrescriptionDosagesArgs = {
  where?: InputMaybe<DosageFilterInput>;
};


/** A medication prescription a care recipient has (prescribed and Over the Counter) */
export type PrescriptionRefillsArgs = {
  where?: InputMaybe<RefillFilterInput>;
};

/** A medication prescription a care recipient has (prescribed and Over the Counter) */
export type PrescriptionFilterInput = {
  and?: InputMaybe<Array<PrescriptionFilterInput>>;
  /** Annotations on the prescription */
  annotations?: InputMaybe<ListFilterInputTypeOfAnnotationFilterInput>;
  /** Medication this medication prescription is for */
  careRecipient?: InputMaybe<CareRecipientFilterInput>;
  /** Is the medication prescription is current or historical. True if current, false if historical. Historical means the record is no longer current but is still visible to the user. */
  current?: InputMaybe<BooleanOperationFilterInput>;
  /** Directions for taking the Medication */
  directions?: InputMaybe<StringOperationFilterInput>;
  /** Schedule for this medication prescription */
  dosages?: InputMaybe<ListFilterInputTypeOfDosageFilterInput>;
  /** End Date of the Prescription */
  endDate?: InputMaybe<StringOperationFilterInput>;
  id?: InputMaybe<ComparableGuidOperationFilterInput>;
  /** Medication this medication prescription is for */
  medication?: InputMaybe<MedicationFilterInput>;
  or?: InputMaybe<Array<PrescriptionFilterInput>>;
  /** Indicator for if this prescription is over the counter */
  overTheCounter?: InputMaybe<BooleanOperationFilterInput>;
  /** Prescribing provider of the medication prescription */
  prescribingProvider?: InputMaybe<ProviderFilterInput>;
  /** Status of the medication request record in the database. Options are Active, Deleted, and Draft. Deleted means the record is soft deleted and not visible to the user. */
  recordStatus?: InputMaybe<RecordStatusOperationFilterInput>;
  /** Refill for medication prescription */
  refills?: InputMaybe<ListFilterInputTypeOfRefillFilterInput>;
  /** Number of remaining refills */
  remainingRefills?: InputMaybe<ComparableNullableOfInt32OperationFilterInput>;
  /** Start Date of the Prescription */
  startDate?: InputMaybe<StringOperationFilterInput>;
  /** Strength Unit of the medication request */
  strengthUnit?: InputMaybe<StringOperationFilterInput>;
  /** Strength Value of the medication request */
  strengthValue?: InputMaybe<StringOperationFilterInput>;
  /** Condition this medication is being taken for */
  takenFor?: InputMaybe<ConditionOccurrenceFilterInput>;
};

/** A procedure performed on a patient */
export type Procedure = {
  __typename?: 'Procedure';
  /** The care recipient that had the procedure */
  careRecipient?: Maybe<CareRecipient>;
  /** The code of the procedure */
  code?: Maybe<CodedConcept>;
  /** The encounter the procedure was performed in */
  encounter?: Maybe<Encounter>;
  id: Scalars['UUID'];
  /** The name of the procedure */
  name?: Maybe<Scalars['String']>;
  /** The date the procedure was performed Day */
  procedureDateDay?: Maybe<Scalars['Int']>;
  /** The date the procedure was performed Month */
  procedureDateMonth?: Maybe<Month>;
  /** The date the procedure was performed Year */
  procedureDateYear?: Maybe<Scalars['Int']>;
  /** The status of the procedure record in the database. Options are Active, Deleted, and Draft. Deleted means the record is soft deleted and not visible to the user. */
  recordStatus: RecordStatus;
  saveState: ProcedureState;
};

/** Creates a procedure */
export type ProcedureCreateInput = {
  /** The ICD-9 Code of the procedure */
  iCD9Code?: InputMaybe<Scalars['String']>;
  /** The name of the procedure */
  name?: InputMaybe<Scalars['String']>;
  /** The date that the procedure was performed day */
  procedureDateDay?: InputMaybe<Scalars['Int']>;
  /** The date that the procedure was performed month */
  procedureDateMonth?: InputMaybe<Month>;
  /** The date that the procedure was performed year */
  procedureDateYear?: InputMaybe<Scalars['Int']>;
};

/** Represents the payload to return after creating a new procedure */
export type ProcedureCreateResponsePayload = {
  __typename?: 'ProcedureCreateResponsePayload';
  result: Procedure;
};

/** Deletes a procedure */
export type ProcedureDeleteInput = {
  /** The ID of the procedure to delete */
  id: Scalars['UUID'];
};

/** Represents a payload to return after deleting a procedure */
export type ProcedureDeleteResponsePayload = {
  __typename?: 'ProcedureDeleteResponsePayload';
  result: Procedure;
};

export type ProcedureState = {
  __typename?: 'ProcedureState';
  name?: Maybe<Scalars['String']>;
  procedureDateDay?: Maybe<Scalars['Int']>;
  procedureDateMonth?: Maybe<Month>;
  procedureDateYear?: Maybe<Scalars['Int']>;
};

/** Updates a procedure */
export type ProcedureUpdateInput = {
  /** The ICD-9 Code of the procedure */
  iCD9Code?: InputMaybe<Scalars['String']>;
  /** The ID of the procedure to update */
  id: Scalars['UUID'];
  /** The name of the procedure */
  name?: InputMaybe<Scalars['String']>;
  /** The date that the procedure was performed day */
  procedureDateDay?: InputMaybe<Scalars['Int']>;
  /** The date that the procedure was performed month */
  procedureDateMonth?: InputMaybe<Month>;
  /** The date that the procedure was performed year */
  procedureDateYear?: InputMaybe<Scalars['Int']>;
};

/** Represents a payload to return after updating a procedure */
export type ProcedureUpdateResponsePayload = {
  __typename?: 'ProcedureUpdateResponsePayload';
  result: Procedure;
};

/** A provider a care recipient has */
export type Provider = {
  __typename?: 'Provider';
  /** Address where the provider practices */
  address?: Maybe<Location>;
  /** Care Recipient the provider is associated with */
  careRecipient?: Maybe<CareRecipient>;
  /** Codes for a Provider */
  codes?: Maybe<Array<CodedConcept>>;
  /** First Name of a Provider */
  firstName?: Maybe<Scalars['String']>;
  id: Scalars['UUID'];
  /** Last Name of a Provider */
  lastName?: Maybe<Scalars['String']>;
  /** Phone Number of a Provider */
  phoneNumber?: Maybe<Scalars['String']>;
  /** Primary specialty of the provider */
  primarySpecialty: Scalars['String'];
  /** Status of a provider record in the database. Options are Active, Deleted, and Draft. Deleted means the record is soft deleted and not visible to the user. */
  recordStatus: RecordStatus;
  saveState: ProviderState;
};

/** Create a provider a care recipient has seen */
export type ProviderCreateInput = {
  /** Address where the provider practices */
  address?: InputMaybe<LocationFindOrCreateInput>;
  /** First Name of a Provider */
  firstName?: InputMaybe<Scalars['String']>;
  /** Last Name of a Provider */
  lastName?: InputMaybe<Scalars['String']>;
  /** NPI of a Provider */
  nPI?: InputMaybe<Scalars['String']>;
  /** Phone Number of a Provider */
  phoneNumber?: InputMaybe<Scalars['String']>;
  /** Primary specialty of the provider */
  primarySpecialty?: InputMaybe<Scalars['String']>;
};

/** Represents the payload to return after creating a provider */
export type ProviderCreatePayload = {
  __typename?: 'ProviderCreatePayload';
  result: Provider;
};

/** Soft delete a Provider */
export type ProviderDeleteInput = {
  id: Scalars['UUID'];
};

/** Payload to return after soft deleting a provider */
export type ProviderDeletePayload = {
  __typename?: 'ProviderDeletePayload';
  result: Provider;
};

/** A provider a care recipient has */
export type ProviderFilterInput = {
  /** Address where the provider practices */
  address?: InputMaybe<LocationFilterInput>;
  and?: InputMaybe<Array<ProviderFilterInput>>;
  /** Care Recipient the provider is associated with */
  careRecipient?: InputMaybe<CareRecipientFilterInput>;
  /** Codes for a Provider */
  codes?: InputMaybe<ListFilterInputTypeOfCodedConceptFilterInput>;
  /** First Name of a Provider */
  firstName?: InputMaybe<StringOperationFilterInput>;
  id?: InputMaybe<ComparableGuidOperationFilterInput>;
  /** Last Name of a Provider */
  lastName?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<ProviderFilterInput>>;
  /** Phone Number of a Provider */
  phoneNumber?: InputMaybe<StringOperationFilterInput>;
  /** Primary specialty of the provider */
  primarySpecialty?: InputMaybe<StringOperationFilterInput>;
  /** Status of a provider record in the database. Options are Active, Deleted, and Draft. Deleted means the record is soft deleted and not visible to the user. */
  recordStatus?: InputMaybe<RecordStatusOperationFilterInput>;
};

/** Update a provider a care recipient has seen */
export type ProviderFindOrCreate = {
  __typename?: 'ProviderFindOrCreate';
  /** Address where the provider practices */
  address?: Maybe<LocationFindOrCreate>;
  /** First Name of a Provider */
  firstName?: Maybe<Scalars['String']>;
  /** Id of the provider record */
  id?: Maybe<Scalars['UUID']>;
  /** Last Name of a Provider */
  lastName?: Maybe<Scalars['String']>;
  /** NPI of a Provider */
  nPI?: Maybe<Scalars['String']>;
  /** Phone Number of a Provider */
  phoneNumber?: Maybe<Scalars['String']>;
  /** Primary specialty of the provider */
  primarySpecialty?: Maybe<Scalars['String']>;
};

/** Update a provider a care recipient has seen */
export type ProviderFindOrCreateInput = {
  /** Address where the provider practices */
  address?: InputMaybe<LocationFindOrCreateInput>;
  /** First Name of a Provider */
  firstName?: InputMaybe<Scalars['String']>;
  /** Id of the provider record */
  id?: InputMaybe<Scalars['UUID']>;
  /** Last Name of a Provider */
  lastName?: InputMaybe<Scalars['String']>;
  /** NPI of a Provider */
  nPI?: InputMaybe<Scalars['String']>;
  /** Phone Number of a Provider */
  phoneNumber?: InputMaybe<Scalars['String']>;
  /** Primary specialty of the provider */
  primarySpecialty?: InputMaybe<Scalars['String']>;
};

/** Search a Provider */
export type ProviderSearchInput = {
  searchText: Scalars['String'];
};

export type ProviderSearchResult = {
  __typename?: 'ProviderSearchResult';
  nPI?: Maybe<Scalars['String']>;
  primaryTaxonomyDisplayName?: Maybe<Scalars['String']>;
  primaryTaxonomySpecialization?: Maybe<Scalars['String']>;
  providerBusinessMailingAddressCityName?: Maybe<Scalars['String']>;
  providerBusinessMailingAddressCountryCode?: Maybe<Scalars['String']>;
  providerBusinessMailingAddressFaxNumber?: Maybe<Scalars['String']>;
  providerBusinessMailingAddressPostalCode?: Maybe<Scalars['String']>;
  providerBusinessMailingAddressStateName?: Maybe<Scalars['String']>;
  providerBusinessMailingAddressTelephoneNumber?: Maybe<Scalars['String']>;
  providerBusinessPracticeLocationAddressCityName?: Maybe<Scalars['String']>;
  providerBusinessPracticeLocationAddressCountryCode?: Maybe<Scalars['String']>;
  providerBusinessPracticeLocationAddressFaxNumber?: Maybe<Scalars['String']>;
  providerBusinessPracticeLocationAddressPostalCode?: Maybe<Scalars['String']>;
  providerBusinessPracticeLocationAddressStateName?: Maybe<Scalars['String']>;
  providerBusinessPracticeLocationAddressTelephoneNumber?: Maybe<Scalars['String']>;
  providerCredentialText?: Maybe<Scalars['String']>;
  providerFirstLineBusinessMailingAddress?: Maybe<Scalars['String']>;
  providerFirstLineBusinessPracticeLocationAddress?: Maybe<Scalars['String']>;
  providerFirstName?: Maybe<Scalars['String']>;
  providerLastName?: Maybe<Scalars['String']>;
  providerMiddleName?: Maybe<Scalars['String']>;
  providerNamePrefixText?: Maybe<Scalars['String']>;
  providerNameSuffixText?: Maybe<Scalars['String']>;
  providerOrganizationName?: Maybe<Scalars['String']>;
  providerSecondLineBusinessMailingAddress?: Maybe<Scalars['String']>;
  providerSecondLineBusinessPracticeLocationAddress?: Maybe<Scalars['String']>;
  secondaryTaxonomyDisplayName?: Maybe<Scalars['String']>;
  secondaryTaxonomySpecialization?: Maybe<Scalars['String']>;
};

export type ProviderSearchResultResponse = {
  __typename?: 'ProviderSearchResultResponse';
  items?: Maybe<Array<ProviderSearchResult>>;
};

export type ProviderSearchResultResponsePayload = {
  __typename?: 'ProviderSearchResultResponsePayload';
  result: ProviderSearchResultResponse;
};

export type ProviderState = {
  __typename?: 'ProviderState';
  codes?: Maybe<Array<CodedConcept>>;
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  phoneNumber?: Maybe<Scalars['String']>;
};

/** Update a provider a care recipient has seen */
export type ProviderUpdateInput = {
  /** Address where the provider practices */
  address?: InputMaybe<LocationFindOrCreateInput>;
  /** First Name of a Provider */
  firstName?: InputMaybe<Scalars['String']>;
  /** The ID of the provider to update */
  id: Scalars['UUID'];
  /** Last Name of a Provider */
  lastName?: InputMaybe<Scalars['String']>;
  /** NPI of a Provider */
  nPI?: InputMaybe<Scalars['String']>;
  /** Phone Number of a Provider */
  phoneNumber?: InputMaybe<Scalars['String']>;
  /** Primary specialty of the provider */
  primarySpecialty?: InputMaybe<Scalars['String']>;
};

/** Represents the payload to return after updating a provider */
export type ProviderUpdatePayload = {
  __typename?: 'ProviderUpdatePayload';
  result: Provider;
};

export type Query = {
  __typename?: 'Query';
  /** Searches for an address and returns a list of addresses */
  addressSearch?: Maybe<AddressSearchResponsePayload>;
  /** Searches for an allergen and returns a list of allergens with First Databank codes */
  allergenSearch?: Maybe<AllergenSearchResponsePayload>;
  /** Get invitation to the app - This endpoint does not require Authentication */
  appInvitation: AppInvitation;
  /** Gets user timezones that this API supports */
  availableUserTimeZones: Array<WindowsTimezone>;
  /** Returns a list of a care circles experiences */
  careCircleExperiences?: Maybe<CareCircleExperiences>;
  /** Gets care giver's annotations */
  careGiverAnnotations?: Maybe<CareGiverAnnotations>;
  /** Returns a list of a care giver experience occurrences */
  careGiverExperienceOccurrences?: Maybe<CareGiverExperienceOccurrences>;
  /** Gets Care Plan documents */
  carePlanDocuments?: Maybe<Array<CareCircleFile>>;
  /** Gets the care recipients allergies. If a history filter is provided, the allergies will be filtered by the history filter using the as of date. */
  careRecipientAllergies?: Maybe<CareRecipientAllergies>;
  /** Gets care recipient's annotations */
  careRecipientAnnotations?: Maybe<CareRecipientAnnotations>;
  /** Gets care recipient's appointments */
  careRecipientAppointments: CareRecipientAppointments;
  /** Gets the care recipients care plans. */
  careRecipientCarePlans?: Maybe<CareRecipientCareplans>;
  /** Gets the care recipients condition occurrences. If a history filter is provided, the condition occurrences will be filtered by the history filter using the as of date. */
  careRecipientConditions?: Maybe<CareRecipientConditions>;
  /** Gets the care recipients immunizations. If a history filter is provided, the immunizations will be filtered by the history filter using the as of date. */
  careRecipientImmunizations?: Maybe<CareRecipientImmunizations>;
  /** Gets the care recipients medication prescriptions. If a history filter is provided, the medication prescriptions will be filtered by the history filter using the as of date. */
  careRecipientMedicationPrescriptions?: Maybe<CareRecipientMedicationPrescriptions>;
  /** Gets the care recipients pharmacies. If a history filter is provided, the pharmacies will be filtered by the history filter using the as of date. */
  careRecipientPharmacies?: Maybe<CareRecipientPharmacies>;
  /** Gets Care Recipient Profile Photo URL if one has been upload, or returns string empty if there isnt one */
  careRecipientPhoto: CareRecipientPhoto;
  /** Gets Care Recipient Profile */
  careRecipientProfile?: Maybe<CareRecipient>;
  /** Gets the care recipients providers. If a history filter is provided, the providers will be filtered by the history filter using the as of date. */
  careRecipientProviders?: Maybe<CareRecipientProviders>;
  /** Gets the care recipients timeline */
  careRecipientTimeline: CareRecipientTimelineEntities;
  /** Gets the queryable common conditions */
  commonCondition: Array<CommonCondition>;
  /** Searches for a condition and returns a list of conditions with ICD-10 codes */
  conditionSearch?: Maybe<ConditionSearchResponsePayload>;
  /** Retrieves the dispensable drug options for a routed dose form drug ID */
  dispensableDrugs: DispensableDrugsResponsePayload;
  /** Ask a quesion about a document */
  documentQuestionAnswer: DocumentInquiryResponsePayload;
  /** Get an embedding for a given text */
  embeddingGet: EmbeddingGetResponsePayload;
  /** Sends an inquiry to OpenAI to generate a 6 care plan for a condition */
  inquiryCarePlanCondition: OpenAiTaskResponsePayload;
  /** Sends an inquiry to OpenAI, if the inquiry is a question about a condition, it will return an answer else 'Please ask a question about your loved one's condition' */
  inquiryConditionAdhocQuestion: OpenAiInquiryResponsePayload;
  /** Sends text from a document to OpenAI for parsing potential health history entities */
  inquiryDocumentParsing: AnnotationParseResponsePayload;
  /** Sends a note to OpenAI for parsing potential health history entities */
  inquiryNoteParsing: AnnotationParseResponsePayload;
  /** Sends an inquiry to OpenAI about a newly diagnosed condition or multiple conditions. If multiple, send as a comman delimited string */
  inquiryPositivitySlot: OpenAiInquiryResponsePayload;
  /** Gets the logged in users profile summary with care circle info */
  me?: Maybe<UserProfileSummary>;
  /** Gets the queryable medications */
  medication: Array<Medication>;
  /** Searches for a routed dose form of a medication Ex. Aspirin Childrens chewable tablet */
  medicationSearch: MedicationSearchResponsePayload;
  /** Gets the logged in users profile summary with care circle info */
  notificationPreferences?: Maybe<UserNotificationPreferences>;
  /** Gets notifications for the logged in user */
  notifications?: Maybe<Array<Notification>>;
  /** Searches for a pharmacy and returns a list of addresses */
  pharmacySearch?: Maybe<AddressSearchResponsePayload>;
  /** Searches for a provider and returns a list of providers with NPI codes */
  providersSearch: ProviderSearchResultResponsePayload;
  /** Generate questions for a doctor's appointment */
  questionGenerate: QuestionGenerateResponsePayload;
  /** Searches for a Bing resource */
  resourceSearch: ResourceSearchResponsePayload;
  /** Parse symptoms since the most recent appointment */
  symptomParse: SymptomParseResponsePayload;
  /** Gets a Care Circle by ID */
  usersCareCircle: CareCircle;
  /** Searches for a vaccine and returns a list of vaccines with CDC Vaccine Product codes */
  vaccineSearch?: Maybe<VaccineSearchResponsePayload>;
};


export type QueryAddressSearchArgs = {
  input: AddressSearchInput;
};


export type QueryAllergenSearchArgs = {
  input: AllergenSearchInput;
};


export type QueryAppInvitationArgs = {
  inviteCode: Scalars['String'];
};


export type QueryCareRecipientAllergiesArgs = {
  filter?: InputMaybe<AsOfDateHistoryFilterInput>;
};


export type QueryCareRecipientAppointmentsArgs = {
  filter?: InputMaybe<AsOfDateHistoryFilterInput>;
};


export type QueryCareRecipientCarePlansArgs = {
  filter?: InputMaybe<AsOfDateHistoryFilterInput>;
};


export type QueryCareRecipientConditionsArgs = {
  filter?: InputMaybe<AsOfDateHistoryFilterInput>;
};


export type QueryCareRecipientImmunizationsArgs = {
  filter?: InputMaybe<AsOfDateHistoryFilterInput>;
};


export type QueryCareRecipientMedicationPrescriptionsArgs = {
  filter?: InputMaybe<AsOfDateHistoryFilterInput>;
};


export type QueryCareRecipientPharmaciesArgs = {
  filter?: InputMaybe<AsOfDateHistoryFilterInput>;
};


export type QueryCareRecipientProvidersArgs = {
  filter?: InputMaybe<AsOfDateHistoryFilterInput>;
};


export type QueryCareRecipientTimelineArgs = {
  filter?: InputMaybe<AsOfDateHistoryFilterInput>;
};


export type QueryCommonConditionArgs = {
  order?: InputMaybe<Array<CommonConditionSortInput>>;
  where?: InputMaybe<CommonConditionFilterInput>;
};


export type QueryConditionSearchArgs = {
  input: ConditionSearchInput;
};


export type QueryDispensableDrugsArgs = {
  input: DispensableMedicationGetInput;
};


export type QueryDocumentQuestionAnswerArgs = {
  input: DocumentInquiryInput;
};


export type QueryEmbeddingGetArgs = {
  input: EmbeddingGetInput;
};


export type QueryInquiryCarePlanConditionArgs = {
  input: DynamicCarePlanGenerateInput;
};


export type QueryInquiryConditionAdhocQuestionArgs = {
  input: ConditionInquiryInput;
};


export type QueryInquiryDocumentParsingArgs = {
  input: DocumentParseInput;
};


export type QueryInquiryNoteParsingArgs = {
  input: AnnotationParseInput;
};


export type QueryInquiryPositivitySlotArgs = {
  input: PositivitySlotGenerateInput;
};


export type QueryMedicationArgs = {
  order?: InputMaybe<Array<MedicationSortInput>>;
  where?: InputMaybe<MedicationFilterInput>;
};


export type QueryMedicationSearchArgs = {
  input: MedicationSearchInput;
};


export type QueryPharmacySearchArgs = {
  input: PharmacySearchInput;
};


export type QueryProvidersSearchArgs = {
  input: ProviderSearchInput;
};


export type QueryResourceSearchArgs = {
  input: ResourceSearchInput;
};


export type QueryVaccineSearchArgs = {
  input: VaccineSearchInput;
};

export type QuestionGenerateResponse = {
  __typename?: 'QuestionGenerateResponse';
  questions?: Maybe<Array<Scalars['String']>>;
};

export type QuestionGenerateResponsePayload = {
  __typename?: 'QuestionGenerateResponsePayload';
  result: QuestionGenerateResponse;
};

export enum RecordStatus {
  Active = 'ACTIVE',
  Deleted = 'DELETED',
  Draft = 'DRAFT'
}

export type RecordStatusOperationFilterInput = {
  eq?: InputMaybe<RecordStatus>;
  in?: InputMaybe<Array<RecordStatus>>;
  neq?: InputMaybe<RecordStatus>;
  nin?: InputMaybe<Array<RecordStatus>>;
};

export type RecurringTask = {
  __typename?: 'RecurringTask';
  date?: Maybe<Scalars['String']>;
  recurrence?: Maybe<Scalars['String']>;
  task?: Maybe<Scalars['String']>;
};

/** A refill for a medication prescription */
export type Refill = {
  __typename?: 'Refill';
  id: Scalars['UUID'];
  /** Pharmacy that provided the refill */
  pharmacy?: Maybe<Pharmacy>;
  /** Medication prescription the refill is for */
  prescription?: Maybe<Prescription>;
  /** Status of the refill record in the database. Options are Active, Deleted, and Draft. Deleted means the record is soft deleted and not visible to the user. */
  recordStatus: RecordStatus;
  /** Date of the refill */
  refillDate: Scalars['String'];
  saveState: RefillState;
};

/** Delete a refill */
export type RefillDeleteInput = {
  /** Id for the refill */
  id: Scalars['UUID'];
};

/** Represents the payload to return after soft deleting a refill */
export type RefillDeletePayload = {
  __typename?: 'RefillDeletePayload';
  result: Refill;
};

/** A refill for a medication prescription */
export type RefillFilterInput = {
  and?: InputMaybe<Array<RefillFilterInput>>;
  id?: InputMaybe<ComparableGuidOperationFilterInput>;
  or?: InputMaybe<Array<RefillFilterInput>>;
  /** Pharmacy that provided the refill */
  pharmacy?: InputMaybe<PharmacyFilterInput>;
  /** Medication prescription the refill is for */
  prescription?: InputMaybe<PrescriptionFilterInput>;
  /** Status of the refill record in the database. Options are Active, Deleted, and Draft. Deleted means the record is soft deleted and not visible to the user. */
  recordStatus?: InputMaybe<RecordStatusOperationFilterInput>;
  /** Date of the refill */
  refillDate?: InputMaybe<StringOperationFilterInput>;
};

/** FindOrCreates refill for a medication prescription */
export type RefillFindOrCreate = {
  __typename?: 'RefillFindOrCreate';
  /** Id of a refill */
  id?: Maybe<Scalars['UUID']>;
  /** Pharmacy for the refill */
  pharmacy?: Maybe<PharmacyFindOrCreate>;
  /** Date of the refill */
  refillDate?: Maybe<Scalars['String']>;
};

/** FindOrCreates refill for a medication prescription */
export type RefillFindOrCreateInput = {
  /** Id of a refill */
  id?: InputMaybe<Scalars['UUID']>;
  /** Pharmacy for the refill */
  pharmacy?: InputMaybe<PharmacyFindOrCreateInput>;
  /** Date of the refill */
  refillDate?: InputMaybe<Scalars['String']>;
};

/** Remove a pharmacy from a refill */
export type RefillPharmacyRemoveInput = {
  id: Scalars['UUID'];
};

/** Represents payload for removing a pharmacy from a refill */
export type RefillPharmacyRemovePayload = {
  __typename?: 'RefillPharmacyRemovePayload';
  result: Refill;
};

export type RefillState = {
  __typename?: 'RefillState';
  pharmacy?: Maybe<Pharmacy>;
  refillDate?: Maybe<Scalars['String']>;
};

/** Update refill for a medication prescription */
export type RefillUpdateInput = {
  /** Id of the refill */
  id: Scalars['UUID'];
  /** Pharmacy for the refill */
  pharmacy?: InputMaybe<PharmacyFindOrCreateInput>;
  /** Date of the refill */
  refillDate?: InputMaybe<Scalars['String']>;
};

/** Represents payload for updating a refill */
export type RefillUpdatePayload = {
  __typename?: 'RefillUpdatePayload';
  result: Refill;
};

export enum RelationshipsToLovedOne {
  Child = 'CHILD',
  FamilyMember = 'FAMILY_MEMBER',
  Friend = 'FRIEND',
  Grandchild = 'GRANDCHILD',
  Grandparent = 'GRANDPARENT',
  Neighbor = 'NEIGHBOR',
  NotSet = 'NOT_SET',
  Parent = 'PARENT',
  Partner = 'PARTNER',
  Sibling = 'SIBLING',
  Spouse = 'SPOUSE'
}

export type RelationshipsToLovedOneOperationFilterInput = {
  eq?: InputMaybe<RelationshipsToLovedOne>;
  in?: InputMaybe<Array<RelationshipsToLovedOne>>;
  neq?: InputMaybe<RelationshipsToLovedOne>;
  nin?: InputMaybe<Array<RelationshipsToLovedOne>>;
};

export enum RelativeTimePeriod {
  /** Period between 12-18 */
  Adolescence = 'ADOLESCENCE',
  /** Period between 0-11 */
  Childhood = 'CHILDHOOD',
  /** Period between 19-64 */
  EarlyAdult = 'EARLY_ADULT',
  /** Period for 65+ */
  LateAdult = 'LATE_ADULT'
}

/** Remove a care giver from care circle */
export type RemoveCareGiverFromCareCircleInput = {
  /** Id for care circle to remove from */
  careCircleId: Scalars['UUID'];
  /** Id for care giver to remove */
  careGiverId: Scalars['UUID'];
};

/** Represents payload for removing a care giver */
export type RemoveCareGiverFromCareCirclePayload = {
  __typename?: 'RemoveCareGiverFromCareCirclePayload';
  result: Response;
};

/** Search Bing resources */
export type ResourceSearchInput = {
  searchText: Scalars['String'];
};

export type ResourceSearchResponse = {
  __typename?: 'ResourceSearchResponse';
  webPages?: Maybe<WebPages>;
};

export type ResourceSearchResponsePayload = {
  __typename?: 'ResourceSearchResponsePayload';
  result: ResourceSearchResponse;
};

export type Response = {
  __typename?: 'Response';
  additionalDetails: Scalars['String'];
  correlationId: Scalars['String'];
  debugData?: Maybe<Array<KeyValuePairOfStringAndObject>>;
  errorCode: ErrorCodes;
  resolve: Scalars['Boolean'];
  succeeded: Scalars['Boolean'];
};

export type Result = {
  __typename?: 'Result';
  address?: Maybe<Address>;
  entityType?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  poi?: Maybe<PointOfInterest>;
  score: Scalars['Float'];
  type?: Maybe<Scalars['String']>;
};

/** Revoke an existing app invite */
export type RevokeInviteInput = {
  /** Id for app invite to revoke */
  inviteId: Scalars['UUID'];
};

/** Represents payload for revoking an app invite */
export type RevokeInvitePayload = {
  __typename?: 'RevokeInvitePayload';
  result: Response;
};

export enum Roles {
  Contributor = 'CONTRIBUTOR',
  Developer = 'DEVELOPER',
  Owner = 'OWNER',
  Pending = 'PENDING',
  Reader = 'READER'
}

export type RolesOperationFilterInput = {
  eq?: InputMaybe<Roles>;
  in?: InputMaybe<Array<Roles>>;
  neq?: InputMaybe<Roles>;
  nin?: InputMaybe<Array<Roles>>;
};

export type RoutedDoseFormDrug = {
  __typename?: 'RoutedDoseFormDrug';
  doseFormDesc?: Maybe<Scalars['String']>;
  drugNameDesc?: Maybe<Scalars['String']>;
  routeDesc?: Maybe<Scalars['String']>;
  routedDoseFormDrugDesc?: Maybe<Scalars['String']>;
  routedDoseFormDrugID?: Maybe<Scalars['String']>;
};

export enum SortEnumType {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type StringOperationFilterInput = {
  and?: InputMaybe<Array<StringOperationFilterInput>>;
  contains?: InputMaybe<Scalars['String']>;
  endsWith?: InputMaybe<Scalars['String']>;
  eq?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  ncontains?: InputMaybe<Scalars['String']>;
  nendsWith?: InputMaybe<Scalars['String']>;
  neq?: InputMaybe<Scalars['String']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  nstartsWith?: InputMaybe<Scalars['String']>;
  or?: InputMaybe<Array<StringOperationFilterInput>>;
  startsWith?: InputMaybe<Scalars['String']>;
};

export type Summary = {
  __typename?: 'Summary';
  numResults: Scalars['Int'];
  query?: Maybe<Scalars['String']>;
  queryTime: Scalars['Int'];
  queryType?: Maybe<Scalars['String']>;
  totalResults: Scalars['Int'];
};

export type SymptomParseResponse = {
  __typename?: 'SymptomParseResponse';
  symptoms?: Maybe<Array<Scalars['String']>>;
};

export type SymptomParseResponsePayload = {
  __typename?: 'SymptomParseResponsePayload';
  result: SymptomParseResponse;
};

/** A item to be displayed in a care recipient timeline */
export type TimelineEntity = {
  __typename?: 'TimelineEntity';
  /** The date of the item. Used for sorting the timeline entities. For items without a specific date, this will be synthesized from the date range or relative time period. */
  date?: Maybe<DateComponents>;
  /** The date range of the item. Used for items that have a start and end date. */
  dateRange?: Maybe<DateComponentsRange>;
  /** The ID of the underlying item type object */
  id?: Maybe<Scalars['UUID']>;
  /** The relative time period of the item. Used for items that have a relative time period. */
  relativeTimePeriod?: Maybe<RelativeTimePeriod>;
  /** The item status */
  status: TimelineEntityStatus;
  /** The text to display in the timeline */
  text: Scalars['String'];
  /** The entity type */
  type: TimelineEntityType;
};

/** The timeline entity status (used for items that have a start and end dates) */
export enum TimelineEntityStatus {
  /** This item represents an item without a start and end dates */
  Default = 'DEFAULT',
  /** This item represents an 'end' event */
  End = 'END',
  /** This item represents a 'start' event */
  Start = 'START'
}

/** The timeline entity type */
export enum TimelineEntityType {
  Appointment = 'APPOINTMENT',
  ConditionOccurrence = 'CONDITION_OCCURRENCE',
  Immunization = 'IMMUNIZATION',
  Prescription = 'PRESCRIPTION'
}

export type UserNotificationChannelPreferences = {
  __typename?: 'UserNotificationChannelPreferences';
  notification: NotificationFeatureProps;
  userChannelSelections: NotificationChannelSelections;
};

export type UserNotificationPreferences = {
  __typename?: 'UserNotificationPreferences';
  /** CareGivers email address */
  email?: Maybe<Scalars['String']>;
  notificationsPreferences: Array<UserNotificationChannelPreferences>;
  /** CareGivers phone number */
  phoneNumber?: Maybe<Scalars['String']>;
  /** ID of the User Profile for the CareGiver. */
  profileId: Scalars['UUID'];
  /** Generic name for the timezone e.g. Central Time */
  timeZoneGenericName?: Maybe<Scalars['String']>;
  /** Iana ID of the caregivers timezone e.g. America/Chicago */
  timeZoneID?: Maybe<Scalars['String']>;
};

export type UserProfile = {
  __typename?: 'UserProfile';
  id: Scalars['UUID'];
  onboardingComplete: Scalars['Boolean'];
  updateOnboardingStatus: Response;
};


export type UserProfileUpdateOnboardingStatusArgs = {
  onboardingStatusUpdate: UserProfileOnboardingStatusUpdateInput;
};

export type UserProfileFilterInput = {
  and?: InputMaybe<Array<UserProfileFilterInput>>;
  id?: InputMaybe<ComparableGuidOperationFilterInput>;
  onboardingComplete?: InputMaybe<BooleanOperationFilterInput>;
  or?: InputMaybe<Array<UserProfileFilterInput>>;
};

export type UserProfileInput = {
  id: Scalars['UUID'];
  onboardingComplete: Scalars['Boolean'];
};

/** Update the User profile onboarding status */
export type UserProfileOnboardingStatusUpdateInput = {
  /** Onboarding status for the User profile */
  onboardingComplete: Scalars['Boolean'];
};

/** Represents payload for updating User profile onboarding status */
export type UserProfileOnboardingStatusUpdatePayload = {
  __typename?: 'UserProfileOnboardingStatusUpdatePayload';
  result: UserProfile;
};

/** Authenticated Users Profile and CareCircle Info */
export type UserProfileSummary = {
  __typename?: 'UserProfileSummary';
  activitySignUpsNotificationsEnabled: Scalars['Boolean'];
  ageGroup?: Maybe<LegalAgeGroupClassification>;
  agreesHasConsentToManageLoveOnesHealth?: Maybe<Scalars['DateTime']>;
  agreesToOpenAiUse?: Maybe<Scalars['DateTime']>;
  agreesToTermsAndPrivacy?: Maybe<Scalars['DateTime']>;
  calendarAppointmentsNotificationsEnabled: Scalars['Boolean'];
  careCircleId?: Maybe<Scalars['UUID']>;
  careCircleMembershipStatus: Scalars['String'];
  careCircleName?: Maybe<Scalars['String']>;
  dailyMedicationDosesNotificationsEnabled: Scalars['Boolean'];
  displayName?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['UUID']>;
  imageBase64?: Maybe<Scalars['String']>;
  mobile?: Maybe<Scalars['String']>;
  newMemberJoinsNotificationsEnabled: Scalars['Boolean'];
  permissions: Array<Permission>;
  postsReactionsRepliesNotificationsEnabled: Scalars['Boolean'];
  refillRemindersNotificationsEnabled: Scalars['Boolean'];
  role: Roles;
  surname?: Maybe<Scalars['String']>;
  understandsIntendedAppUse?: Maybe<Scalars['DateTime']>;
  understandsMicrosoftUseOfTheirData?: Maybe<Scalars['DateTime']>;
  understandsNotPermittedToUsePlatformForMinors?: Maybe<Scalars['DateTime']>;
};

/** A vaccine product a recipient has been immunized with */
export type Vaccine = {
  __typename?: 'Vaccine';
  /** Codes of the vaccine product */
  codes?: Maybe<Array<CodedConcept>>;
  id: Scalars['UUID'];
  /** Name of the vaccine product */
  name?: Maybe<Scalars['String']>;
};

/** A vaccine product a recipient has been immunized with */
export type VaccineFilterInput = {
  and?: InputMaybe<Array<VaccineFilterInput>>;
  /** Codes of the vaccine product */
  codes?: InputMaybe<ListFilterInputTypeOfCodedConceptFilterInput>;
  id?: InputMaybe<ComparableGuidOperationFilterInput>;
  /** Name of the vaccine product */
  name?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<VaccineFilterInput>>;
};

/** A vaccine product a recipient has been immunized with */
export type VaccineFindOrCreate = {
  __typename?: 'VaccineFindOrCreate';
  /** CDC Product ID of the vaccine product */
  cDCProductId?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['UUID']>;
  /** Name of the vaccine product */
  name?: Maybe<Scalars['String']>;
};

/** A vaccine product a recipient has been immunized with */
export type VaccineFindOrCreateInput = {
  /** CDC Product ID of the vaccine product */
  cDCProductId?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['UUID']>;
  /** Name of the vaccine product */
  name?: InputMaybe<Scalars['String']>;
};

/** Search a Vaccine */
export type VaccineSearchInput = {
  searchText: Scalars['String'];
};

export type VaccineSearchResponse = {
  __typename?: 'VaccineSearchResponse';
  searchResults?: Maybe<Array<CdcVaccineResponse>>;
  termSearchTotalCount?: Maybe<Scalars['String']>;
};

export type VaccineSearchResponsePayload = {
  __typename?: 'VaccineSearchResponsePayload';
  result: VaccineSearchResponse;
};

export type Value = {
  __typename?: 'Value';
  snippet?: Maybe<Scalars['String']>;
  thumbnailUrl?: Maybe<Scalars['String']>;
  webPageID?: Maybe<Scalars['String']>;
  webPageName?: Maybe<Scalars['String']>;
  webPageUrl?: Maybe<Scalars['String']>;
};

export type WebPages = {
  __typename?: 'WebPages';
  totalEstimatedMatches?: Maybe<Scalars['Int']>;
  value: Array<Value>;
};

export type WindowsTimezone = {
  __typename?: 'WindowsTimezone';
  ianaIds: Array<Scalars['String']>;
  territory: Scalars['String'];
  windowsId: Scalars['String'];
};

/** One possible value for a given Enum. Enum values are unique values, not a placeholder for a string or numeric value. However an Enum value is returned in a JSON response as a string. */
export type __EnumValue = {
  __typename?: '__EnumValue';
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  isDeprecated: Scalars['Boolean'];
  deprecationReason?: Maybe<Scalars['String']>;
};

/** Object and Interface types are described by a list of Fields, each of which has a name, potentially a list of arguments, and a return type. */
export type __Field = {
  __typename?: '__Field';
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  args: Array<__InputValue>;
  type: __Type;
  isDeprecated: Scalars['Boolean'];
  deprecationReason?: Maybe<Scalars['String']>;
};


/** Object and Interface types are described by a list of Fields, each of which has a name, potentially a list of arguments, and a return type. */
export type __FieldArgsArgs = {
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
};

/** Arguments provided to Fields or Directives and the input fields of an InputObject are represented as Input Values which describe their type and optionally a default value. */
export type __InputValue = {
  __typename?: '__InputValue';
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  type: __Type;
  /** A GraphQL-formatted string representing the default value for this input value. */
  defaultValue?: Maybe<Scalars['String']>;
  isDeprecated: Scalars['Boolean'];
  deprecationReason?: Maybe<Scalars['String']>;
};

/**
 * The fundamental unit of any GraphQL Schema is the type. There are many kinds of types in GraphQL as represented by the `__TypeKind` enum.
 *
 * Depending on the kind of a type, certain fields describe information about that type. Scalar types provide no information beyond a name, description and optional `specifiedByUrl`, while Enum types provide their values. Object and Interface types provide the fields they describe. Abstract types, Union and Interface, provide the Object types possible at runtime. List and NonNull types compose other types.
 */
export type __Type = {
  __typename?: '__Type';
  kind: __TypeKind;
  name?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  specifiedByUrl?: Maybe<Scalars['String']>;
  fields?: Maybe<Array<__Field>>;
  interfaces?: Maybe<Array<__Type>>;
  possibleTypes?: Maybe<Array<__Type>>;
  enumValues?: Maybe<Array<__EnumValue>>;
  inputFields?: Maybe<Array<__InputValue>>;
  ofType?: Maybe<__Type>;
};


/**
 * The fundamental unit of any GraphQL Schema is the type. There are many kinds of types in GraphQL as represented by the `__TypeKind` enum.
 *
 * Depending on the kind of a type, certain fields describe information about that type. Scalar types provide no information beyond a name, description and optional `specifiedByUrl`, while Enum types provide their values. Object and Interface types provide the fields they describe. Abstract types, Union and Interface, provide the Object types possible at runtime. List and NonNull types compose other types.
 */
export type __TypeFieldsArgs = {
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
};


/**
 * The fundamental unit of any GraphQL Schema is the type. There are many kinds of types in GraphQL as represented by the `__TypeKind` enum.
 *
 * Depending on the kind of a type, certain fields describe information about that type. Scalar types provide no information beyond a name, description and optional `specifiedByUrl`, while Enum types provide their values. Object and Interface types provide the fields they describe. Abstract types, Union and Interface, provide the Object types possible at runtime. List and NonNull types compose other types.
 */
export type __TypeEnumValuesArgs = {
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
};


/**
 * The fundamental unit of any GraphQL Schema is the type. There are many kinds of types in GraphQL as represented by the `__TypeKind` enum.
 *
 * Depending on the kind of a type, certain fields describe information about that type. Scalar types provide no information beyond a name, description and optional `specifiedByUrl`, while Enum types provide their values. Object and Interface types provide the fields they describe. Abstract types, Union and Interface, provide the Object types possible at runtime. List and NonNull types compose other types.
 */
export type __TypeInputFieldsArgs = {
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
};

/** An enum describing what kind of type a given `__Type` is. */
export enum __TypeKind {
  /** Indicates this type is a scalar. */
  Scalar = 'SCALAR',
  /** Indicates this type is an object. `fields` and `interfaces` are valid fields. */
  Object = 'OBJECT',
  /** Indicates this type is an interface. `fields`, `interfaces`, and `possibleTypes` are valid fields. */
  Interface = 'INTERFACE',
  /** Indicates this type is a union. `possibleTypes` is a valid field. */
  Union = 'UNION',
  /** Indicates this type is an enum. `enumValues` is a valid field. */
  Enum = 'ENUM',
  /** Indicates this type is an input object. `inputFields` is a valid field. */
  InputObject = 'INPUT_OBJECT',
  /** Indicates this type is a list. `ofType` is a valid field. */
  List = 'LIST',
  /** Indicates this type is a non-null. `ofType` is a valid field. */
  NonNull = 'NON_NULL'
}

export type UpdateMedicationMutationVariables = Exact<{
  prescription: MedicationPrescriptionUpdateInput;
}>;


export type UpdateMedicationMutation = { __typename?: 'Mutation', medicationPrescriptionUpdate: { __typename?: 'MedicationPrescriptionUpdatePayload', result: { __typename?: 'Prescription', id: any, refills: Array<{ __typename?: 'Refill', id: any, refillDate: string, recordStatus: RecordStatus, pharmacy?: { __typename?: 'Pharmacy', id: any, name?: string | null, phoneNumber?: string | null, recordStatus: RecordStatus, location?: { __typename?: 'Location', id: any, addressLine1?: string | null, city?: string | null, freeTextAddress?: string | null, state?: string | null, zipCode?: string | null } | null } | null }> } } };

export type RefillUpdateMutationVariables = Exact<{
  refill: RefillUpdateInput;
}>;


export type RefillUpdateMutation = { __typename?: 'Mutation', refillUpdate: { __typename?: 'RefillUpdatePayload', result: { __typename?: 'Refill', id: any } } };

export type DeleteMedicationMutationVariables = Exact<{
  id: Scalars['UUID'];
}>;


export type DeleteMedicationMutation = { __typename?: 'Mutation', medicationPrescriptionDelete: { __typename?: 'MedicationPrescriptionDeletePayload', result: { __typename?: 'Prescription', id: any } } };

export type AddMedicationMutationVariables = Exact<{
  prescription: MedicationPrescriptionCreateInput;
}>;


export type AddMedicationMutation = { __typename?: 'Mutation', medicationPrescriptionCreate: { __typename?: 'MedicationPrescriptionCreatePayload', result: { __typename?: 'Prescription', id: any } } };

export type RefillDeleteMutationVariables = Exact<{
  id: Scalars['UUID'];
}>;


export type RefillDeleteMutation = { __typename?: 'Mutation', refillDelete: { __typename?: 'RefillDeletePayload', result: { __typename?: 'Refill', id: any } } };

export type DosageDeleteMutationVariables = Exact<{
  id: Scalars['UUID'];
}>;


export type DosageDeleteMutation = { __typename?: 'Mutation', dosageDelete: { __typename?: 'DosageDeletePayload', result: { __typename?: 'Dosage', id: any } } };

export type MedicationSearchQueryVariables = Exact<{
  searchText: Scalars['String'];
}>;


export type MedicationSearchQuery = { __typename?: 'Query', medicationSearch: { __typename?: 'MedicationSearchResponsePayload', result: { __typename?: 'MedicationSearchResponse', items?: Array<{ __typename?: 'RoutedDoseFormDrug', routedDoseFormDrugID?: string | null, routedDoseFormDrugDesc?: string | null, routeDesc?: string | null, drugNameDesc?: string | null, doseFormDesc?: string | null }> | null } } };

export type DispensableDrugsQueryVariables = Exact<{
  routedDoseFormDrugId: Scalars['String'];
}>;


export type DispensableDrugsQuery = { __typename?: 'Query', dispensableDrugs: { __typename?: 'DispensableDrugsResponsePayload', result: { __typename?: 'DispensableDrugsResponse', items?: Array<{ __typename?: 'DispensableDrug', dispensableDrugID?: string | null, medStrength?: string | null, medStrengthUnit?: string | null }> | null } } };

export type EndMedicationMutationVariables = Exact<{
  id: Scalars['UUID'];
}>;


export type EndMedicationMutation = { __typename?: 'Mutation', medicationPrescriptionSetHistorical: { __typename?: 'MedicationPrescriptionSetHistoricalPayload', result: { __typename?: 'Prescription', id: any } } };

export type CreateInviteMutationVariables = Exact<{
  careCircleId: Scalars['String'];
}>;


export type CreateInviteMutation = { __typename?: 'Mutation', createInvite: { __typename?: 'CreateInvitePayload', result: { __typename?: 'AppInvitation', inviteCode: string, inviteFromName: string, careCircleName: string, status: InviteStatus } } };

export type AddEmailInvitationMutationVariables = Exact<{
  careCircleId: Scalars['String'];
  email: Scalars['String'];
  makeAdmin: Scalars['Boolean'];
  makeEmergencyContact: Scalars['Boolean'];
  relationshipToLovedOne: RelationshipsToLovedOne;
}>;


export type AddEmailInvitationMutation = { __typename?: 'Mutation', createInvite: { __typename?: 'CreateInvitePayload', result: { __typename?: 'AppInvitation', id: any, deliveryMethod: DeliveryMethods, inviteFromName: string, inviteRecipientEmail: string, status: InviteStatus } } };

export type RevokeInviteMutationVariables = Exact<{
  inviteId: Scalars['UUID'];
}>;


export type RevokeInviteMutation = { __typename?: 'Mutation', revokeInvite: { __typename?: 'RevokeInvitePayload', result: { __typename?: 'Response', succeeded: boolean, errorCode: ErrorCodes } } };

export type ApproveInviteMutationVariables = Exact<{
  careGiverId: Scalars['UUID'];
}>;


export type ApproveInviteMutation = { __typename?: 'Mutation', careGiverApproveToCareCircle: { __typename?: 'CareGiverApproveToCareCirclePayload', result: { __typename?: 'CareCircleMembership', status: MembershipStatus } } };

export type RejectInviteMutationVariables = Exact<{
  careGiverId: Scalars['UUID'];
}>;


export type RejectInviteMutation = { __typename?: 'Mutation', careGiverApproveToCareCircle: { __typename?: 'CareGiverApproveToCareCirclePayload', result: { __typename?: 'CareCircleMembership', status: MembershipStatus } } };

export type UpdateInviteMutationVariables = Exact<{
  appInvitationId: Scalars['UUID'];
  careCircleId: Scalars['String'];
  makeAdmin: Scalars['Boolean'];
  makeEmergencyContact: Scalars['Boolean'];
  relationshipToLovedOne: RelationshipsToLovedOne;
}>;


export type UpdateInviteMutation = { __typename?: 'Mutation', appInvitationUpdate: { __typename?: 'AppInvitationUpdatePayload', result: { __typename?: 'AppInvitation', status: InviteStatus } } };

export type ClearCareCircleDataMutationVariables = Exact<{
  careCircleName: Scalars['String'];
}>;


export type ClearCareCircleDataMutation = { __typename?: 'Mutation', clearCareCircleData: { __typename?: 'ClearCareCircleDataPayLoad', result: { __typename?: 'Response', succeeded: boolean } } };

export type CreateAccountMutationVariables = Exact<{ [key: string]: never; }>;


export type CreateAccountMutation = { __typename?: 'Mutation', createCareGiver: { __typename?: 'CreateCareGiverPayload', result: { __typename?: 'CareGiver', id: any, imageBase64: string, displayName?: string | null, mobile?: string | null, email: string } } };

export type CreateCareCircleMutationVariables = Exact<{
  circleName: Scalars['String'];
}>;


export type CreateCareCircleMutation = { __typename?: 'Mutation', createCareCircle: { __typename?: 'CreateCareCirclePayload', result: { __typename?: 'CareCircle', id: any, name?: string | null } } };

export type JoinCircleFromInviteLinkMutationVariables = Exact<{
  careGiverId: Scalars['String'];
  inviteCode: Scalars['String'];
}>;


export type JoinCircleFromInviteLinkMutation = { __typename?: 'Mutation', joinCareCircleFromInviteLink: { __typename?: 'JoinCareCircleFromInviteLinkPayload', result: { __typename?: 'CareCircleMembershipStatus', status: MembershipStatus, careCircleName: string, careCircleId: string } } };

export type RemoveMemberMutationVariables = Exact<{
  input: RemoveCareGiverFromCareCircleInput;
}>;


export type RemoveMemberMutation = { __typename?: 'Mutation', removeCareGiverFromCareCircle: { __typename?: 'RemoveCareGiverFromCareCirclePayload', result: { __typename?: 'Response', succeeded: boolean, additionalDetails: string } } };

export type SetIsEmergencyContactMutationVariables = Exact<{
  careGiverId: Scalars['UUID'];
  isEmergencyContact: Scalars['Boolean'];
}>;


export type SetIsEmergencyContactMutation = { __typename?: 'Mutation', careGiverSetEmergencyContact: { __typename?: 'CareGiverSetEmergencyContactPayload', result: { __typename?: 'CareCircleMembership', status: MembershipStatus, careCircle: { __typename?: 'CareCircle', id: any, careCircleMembers?: Array<{ __typename?: 'CareCircleMembership', id: any, status: MembershipStatus, isEmergencyContact: boolean, relationshipToLovedOne: RelationshipsToLovedOne, profile: { __typename?: 'CareCircleProfile', id: any, role: Roles }, careGiver: { __typename?: 'CareGiver', id: any, displayName?: string | null, email: string, imageBase64: string, mobile?: string | null } }> | null } } } };

export type SetIsAdminMutationVariables = Exact<{
  careGiverId: Scalars['UUID'];
  isAdmin: Scalars['Boolean'];
}>;


export type SetIsAdminMutation = { __typename?: 'Mutation', careGiverSetAdmin: { __typename?: 'CareGiverSetAdminPayload', result: { __typename?: 'CareCircleMembership', status: MembershipStatus, careCircle: { __typename?: 'CareCircle', id: any, careCircleMembers?: Array<{ __typename?: 'CareCircleMembership', id: any, status: MembershipStatus, isEmergencyContact: boolean, relationshipToLovedOne: RelationshipsToLovedOne, profile: { __typename?: 'CareCircleProfile', id: any, role: Roles }, careGiver: { __typename?: 'CareGiver', id: any, displayName?: string | null, email: string, imageBase64: string, mobile?: string | null } }> | null } } } };

export type CareGiverSetRelationshipToLovedOneMutationVariables = Exact<{
  careGiverId: Scalars['UUID'];
  relationship: RelationshipsToLovedOne;
}>;


export type CareGiverSetRelationshipToLovedOneMutation = { __typename?: 'Mutation', careGiverSetRelationshipToLovedOne: { __typename?: 'CareGiverSetRelationshipToLovedOnePayload', result: { __typename?: 'CareCircleMembership', careCircle: { __typename?: 'CareCircle', id: any, careCircleMembers?: Array<{ __typename?: 'CareCircleMembership', id: any, status: MembershipStatus, isEmergencyContact: boolean, relationshipToLovedOne: RelationshipsToLovedOne, profile: { __typename?: 'CareCircleProfile', id: any, role: Roles }, careGiver: { __typename?: 'CareGiver', id: any, displayName?: string | null, email: string, imageBase64: string, mobile?: string | null } }> | null } } } };

export type SetNotificationPreferenceMutationVariables = Exact<{
  isEnabled: Scalars['Boolean'];
  preferenceToSet: NotificationPreference;
}>;


export type SetNotificationPreferenceMutation = { __typename?: 'Mutation', notificationPreferencesSet: { __typename?: 'NotificationPreferencesSetPayload', result: { __typename?: 'CareCircleProfile', id: any } } };

export type CreateProviderMutationVariables = Exact<{
  firstName?: InputMaybe<Scalars['String']>;
  lastName: Scalars['String'];
  nPI?: InputMaybe<Scalars['String']>;
  phoneNumber?: InputMaybe<Scalars['String']>;
  address?: InputMaybe<LocationFindOrCreateInput>;
  primarySpecialty: Scalars['String'];
}>;


export type CreateProviderMutation = { __typename?: 'Mutation', providerCreate: { __typename?: 'ProviderCreatePayload', result: { __typename?: 'Provider', id: any } } };

export type CreateConditionOccurrenceMutationVariables = Exact<{
  input: ConditionOccurrenceCreateInput;
}>;


export type CreateConditionOccurrenceMutation = { __typename?: 'Mutation', conditionOccurrenceCreate: { __typename?: 'ConditionOccurrenceCreatePayload', result: { __typename?: 'ConditionOccurrence', id: any } } };

export type UpdateConditionOccurrenceMutationVariables = Exact<{
  input: ConditionOccurrenceUpdateInput;
}>;


export type UpdateConditionOccurrenceMutation = { __typename?: 'Mutation', conditionOccurrenceUpdate: { __typename?: 'ConditionOccurrenceUpdatePayload', result: { __typename?: 'ConditionOccurrence', id: any } } };

export type DeleteConditionOccurenceMutationVariables = Exact<{
  id: Scalars['UUID'];
}>;


export type DeleteConditionOccurenceMutation = { __typename?: 'Mutation', conditionOccurrenceDelete: { __typename?: 'ConditionOccurrenceDeletePayload', result: { __typename?: 'ConditionOccurrence', id: any } } };

export type UpdateProviderMutationVariables = Exact<{
  firstName?: InputMaybe<Scalars['String']>;
  lastName: Scalars['String'];
  nPI?: InputMaybe<Scalars['String']>;
  phoneNumber?: InputMaybe<Scalars['String']>;
  address?: InputMaybe<LocationFindOrCreateInput>;
  id: Scalars['UUID'];
  primarySpecialty: Scalars['String'];
}>;


export type UpdateProviderMutation = { __typename?: 'Mutation', providerUpdate: { __typename?: 'ProviderUpdatePayload', result: { __typename?: 'Provider', id: any } } };

export type RemoveProviderMutationVariables = Exact<{
  id: Scalars['UUID'];
}>;


export type RemoveProviderMutation = { __typename?: 'Mutation', providerDelete: { __typename?: 'ProviderDeletePayload', result: { __typename?: 'Provider', id: any } } };

export type CreateCareRecipientProfileMutationVariables = Exact<{
  firstName: Scalars['String'];
  lastName?: InputMaybe<Scalars['String']>;
}>;


export type CreateCareRecipientProfileMutation = { __typename?: 'Mutation', careRecipientProfileCreate: { __typename?: 'CareRecipientProfileCreatePayload', result: { __typename?: 'CareRecipient', id: any, firstName: string, lastName?: string | null } } };

export type UploadCareRecipientPhotoMutationVariables = Exact<{
  input: CareRecipientPhotoUploadInput;
}>;


export type UploadCareRecipientPhotoMutation = { __typename?: 'Mutation', careRecipientPhotoUpload: { __typename?: 'CareRecipientPhotoUploadPayload', url: string } };

export type UpdateCareRecipientProfileMutationVariables = Exact<{
  firstName: Scalars['String'];
  lastName?: InputMaybe<Scalars['String']>;
  dOB?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  phone?: InputMaybe<Scalars['String']>;
  bloodType?: InputMaybe<BloodTypes>;
}>;


export type UpdateCareRecipientProfileMutation = { __typename?: 'Mutation', careRecipientProfileUpdate: { __typename?: 'CareRecipientProfileUpdatePayload', result: { __typename?: 'CareRecipient', id: any } } };

export type UpdateCareRecipientAddressMutationVariables = Exact<{
  addressLine1?: InputMaybe<Scalars['String']>;
  addressLine2?: InputMaybe<Scalars['String']>;
  city?: InputMaybe<Scalars['String']>;
  state?: InputMaybe<Scalars['String']>;
  country?: InputMaybe<Scalars['String']>;
  zipCode?: InputMaybe<Scalars['String']>;
  freeTextAddress?: InputMaybe<Scalars['String']>;
}>;


export type UpdateCareRecipientAddressMutation = { __typename?: 'Mutation', careRecipientAddressUpdate: { __typename?: 'CareRecipientAddressUpdatePayload', result: { __typename?: 'CareRecipient', firstName: string, lastName?: string | null, address?: { __typename?: 'Location', id: any, addressLine1?: string | null, state?: string | null } | null } } };

export type UpdateCareRecipientMeasurementsMutationVariables = Exact<{
  height?: InputMaybe<Scalars['Decimal']>;
  weight?: InputMaybe<Scalars['Decimal']>;
}>;


export type UpdateCareRecipientMeasurementsMutation = { __typename?: 'Mutation', careRecipientMeasurementsUpdate: { __typename?: 'CareRecipientMeasurementsUpdatePayload', result: { __typename?: 'CareRecipient', firstName: string, lastName?: string | null, height?: any | null, weight?: any | null } } };

export type UpdateCareRecipientMeasurementSystemMutationVariables = Exact<{
  measurementSystem: MeasurementSystem;
}>;


export type UpdateCareRecipientMeasurementSystemMutation = { __typename?: 'Mutation', careRecipientMeasurementSystemUpdate: { __typename?: 'CareRecipientMeasurementSystemUpdatePayload', result: { __typename?: 'CareRecipient', firstName: string, lastName?: string | null, measurementSystemPreference: MeasurementSystem } } };

export type UpdateCareRecipientTimezoneMutationVariables = Exact<{
  timezoneId: Scalars['String'];
}>;


export type UpdateCareRecipientTimezoneMutation = { __typename?: 'Mutation', careRecipientTimezoneUpdate: { __typename?: 'CareRecipientTimeZoneUpdatePayload', result: { __typename?: 'CareRecipient', id: any, timeZoneID?: string | null } } };

export type CaregiverNotificationSettingsUpdateMutationVariables = Exact<{
  mobileNumber?: InputMaybe<Scalars['String']>;
  timeZoneID: Scalars['String'];
}>;


export type CaregiverNotificationSettingsUpdateMutation = { __typename?: 'Mutation', caregiverNotificationSettingsUpdate: { __typename?: 'CareGiverNotificationSettingsUpdatePayload', result: { __typename?: 'CareGiver', id: any, mobile?: string | null, timeZoneID?: string | null, timeZoneGenericName?: string | null } } };

export type CareGiverCareCircleNotificationSettingsDefaultsMutationVariables = Exact<{
  enableSMSChannelOnAllNotifications: Scalars['Boolean'];
  enableEmailChannelOnAllNotifications: Scalars['Boolean'];
}>;


export type CareGiverCareCircleNotificationSettingsDefaultsMutation = { __typename?: 'Mutation', careGiverCarecircleNotificationSettingsDefaults: { __typename?: 'CareGiverCarecircleNotificationSettingsDefaultsPayload', result: { __typename?: 'UserNotificationPreferences', profileId: any } } };

export type NotificationPreferenceUpdateMutationVariables = Exact<{
  notificationFeature: Feature;
  sMSEnabled: Scalars['Boolean'];
  emailEnabled: Scalars['Boolean'];
  inAppEnabled: Scalars['Boolean'];
}>;


export type NotificationPreferenceUpdateMutation = { __typename?: 'Mutation', notificationPreferenceUpdate: { __typename?: 'NotificationPreferencesUpdatePayload', result: { __typename?: 'UserNotificationPreferences', notificationsPreferences: Array<{ __typename?: 'UserNotificationChannelPreferences', notification: { __typename?: 'NotificationFeatureProps', availableChannels: Array<Channel>, feature: Feature }, userChannelSelections: { __typename?: 'NotificationChannelSelections', sMSEnabled: boolean, emailEnabled: boolean, inAppEnabled: boolean } }> } } };

export type CreatePharmacyMutationVariables = Exact<{
  name?: InputMaybe<Scalars['String']>;
  phoneNumber?: InputMaybe<Scalars['String']>;
  location?: InputMaybe<LocationFindOrCreateInput>;
}>;


export type CreatePharmacyMutation = { __typename?: 'Mutation', pharmacyCreate: { __typename?: 'PharmacyCreatePayload', result: { __typename?: 'Pharmacy', id: any } } };

export type UpdatePharmacyMutationVariables = Exact<{
  phoneNumber?: InputMaybe<Scalars['String']>;
  location?: InputMaybe<LocationFindOrCreateInput>;
  id: Scalars['UUID'];
  name?: InputMaybe<Scalars['String']>;
}>;


export type UpdatePharmacyMutation = { __typename?: 'Mutation', pharmacyUpdate: { __typename?: 'PharmacyUpdatePayload', result: { __typename?: 'Pharmacy', id: any } } };

export type RemovePharmacyMutationVariables = Exact<{
  id: Scalars['UUID'];
}>;


export type RemovePharmacyMutation = { __typename?: 'Mutation', pharmacyDelete: { __typename?: 'PharmacyDeletePayload', result: { __typename?: 'Pharmacy', id: any } } };

export type CreateImmunizationMutationVariables = Exact<{
  immunizationDateDay?: InputMaybe<Scalars['Int']>;
  immunizationDateMonth?: InputMaybe<Month>;
  immunizationDateYear?: InputMaybe<Scalars['Int']>;
  immunizationDateRelativePeriodStart?: InputMaybe<Scalars['Int']>;
  immunizationDateRelativePeriodEnd?: InputMaybe<Scalars['Int']>;
  vaccineProductAdministered?: InputMaybe<VaccineFindOrCreateInput>;
}>;


export type CreateImmunizationMutation = { __typename?: 'Mutation', immunizationCreate: { __typename?: 'ImmunizationCreatePayload', result: { __typename?: 'Immunization', id: any } } };

export type UpdateImmunizationMutationVariables = Exact<{
  id: Scalars['UUID'];
  immunizationDateDay?: InputMaybe<Scalars['Int']>;
  immunizationDateMonth?: InputMaybe<Month>;
  immunizationDateYear?: InputMaybe<Scalars['Int']>;
  immunizationDateRelativePeriodStart?: InputMaybe<Scalars['Int']>;
  immunizationDateRelativePeriodEnd?: InputMaybe<Scalars['Int']>;
  vaccineProductAdministered?: InputMaybe<VaccineFindOrCreateInput>;
}>;


export type UpdateImmunizationMutation = { __typename?: 'Mutation', immunizationUpdate: { __typename?: 'ImmunizationUpdatePayload', result: { __typename?: 'Immunization', recordStatus: RecordStatus, id: any, immunizationDateDay?: number | null, immunizationDateMonth?: Month | null, immunizationDateYear?: number | null, immunizationDateRelativePeriodStart?: number | null, immunizationDateRelativePeriodEnd?: number | null, vaccineProductAdministered?: { __typename?: 'Vaccine', id: any, name?: string | null } | null } } };

export type RemoveImmunizationMutationVariables = Exact<{
  id: Scalars['UUID'];
}>;


export type RemoveImmunizationMutation = { __typename?: 'Mutation', immunizationDelete: { __typename?: 'ImmunizationDeletePayload', result: { __typename?: 'Immunization', id: any } } };

export type AgreeToTermsOfServiceMutationVariables = Exact<{
  careGiverId: Scalars['UUID'];
  agreesHasConsentToManageLoveOnesHealth: Scalars['Boolean'];
  agreesToTermsAndPrivacy: Scalars['Boolean'];
  understandsIntendedAppUse: Scalars['Boolean'];
  understandsMicrosoftUseOfTheirData: Scalars['Boolean'];
  understandsNotPermittedToUsePlatformForMinors: Scalars['Boolean'];
  agreesToOpenAiUse: Scalars['Boolean'];
}>;


export type AgreeToTermsOfServiceMutation = { __typename?: 'Mutation', careGiverConsentUpdate: { __typename?: 'CareGiverConsentUpdatePayload', result: { __typename?: 'CareCircleProfile', agreesToTermsAndPrivacy?: any | null, agreesHasConsentToManageLoveOnesHealth?: any | null, understandsIntendedAppUse?: any | null, understandsMicrosoftUseOfTheirData?: any | null, understandsNotPermittedToUsePlatformForMinors?: any | null, agreesToOpenAiUse?: any | null, id: any } } };

export type CreateAllergyMutationVariables = Exact<{
  input: AllergyCreateInput;
}>;


export type CreateAllergyMutation = { __typename?: 'Mutation', allergyCreate: { __typename?: 'AllergyCreatePayload', result: { __typename?: 'Allergy', id: any } } };

export type UpdateAllergyMutationVariables = Exact<{
  id: Scalars['UUID'];
  severity: AllergySeverity;
}>;


export type UpdateAllergyMutation = { __typename?: 'Mutation', allergyUpdate: { __typename?: 'AllergyUpdatePayload', result: { __typename?: 'Allergy', id: any } } };

export type RemoveAllergyMutationVariables = Exact<{
  id: Scalars['UUID'];
}>;


export type RemoveAllergyMutation = { __typename?: 'Mutation', allergyDelete: { __typename?: 'AllergyDeletePayload', result: { __typename?: 'Allergy', id: any } } };

export type CreateActivityMutationVariables = Exact<{
  title?: InputMaybe<Scalars['String']>;
  details?: InputMaybe<Scalars['String']>;
  phoneNumber?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<ExperienceType>;
  availability: Scalars['String'];
  address?: InputMaybe<LocationCreateInput>;
}>;


export type CreateActivityMutation = { __typename?: 'Mutation', experienceCreate: { __typename?: 'ExperienceCreatePayload', result: { __typename?: 'Experience', id: any, title?: string | null, details?: string | null, phoneNumber?: string | null, type?: ExperienceType | null, availability: string, address?: { __typename?: 'Location', id: any, addressLine1?: string | null, addressLine2?: string | null, city?: string | null, state?: string | null, zipCode?: string | null } | null } } };

export type UpdateActivityMutationVariables = Exact<{
  id: Scalars['UUID'];
  title?: InputMaybe<Scalars['String']>;
  details?: InputMaybe<Scalars['String']>;
  phoneNumber?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<ExperienceType>;
  availability: Scalars['String'];
  address?: InputMaybe<LocationCreateInput>;
}>;


export type UpdateActivityMutation = { __typename?: 'Mutation', experienceUpdate: { __typename?: 'ExperienceUpdatePayload', result: { __typename?: 'Experience', id: any, title?: string | null, details?: string | null, phoneNumber?: string | null, type?: ExperienceType | null, availability: string, address?: { __typename?: 'Location', id: any, addressLine1?: string | null, addressLine2?: string | null, city?: string | null, state?: string | null, zipCode?: string | null } | null } } };

export type RemoveActivityMutationVariables = Exact<{
  id: Scalars['UUID'];
}>;


export type RemoveActivityMutation = { __typename?: 'Mutation', experienceDelete: { __typename?: 'ExperienceDeletePayload', result: { __typename?: 'Response', succeeded: boolean } } };

export type CreateActivityOccurrenceMutationVariables = Exact<{
  careGiverId: Scalars['UUID'];
  experience?: InputMaybe<ExperienceInput>;
}>;


export type CreateActivityOccurrenceMutation = { __typename?: 'Mutation', experienceOccurrenceCreate: { __typename?: 'ExperienceOccurrenceCreatePayload', result: { __typename?: 'ExperienceOccurrence', id: any, careCircleMembership?: { __typename?: 'CareCircleMembership', id: any } | null, experience?: { __typename?: 'Experience', id: any } | null } } };

export type RemoveActivityOccurrenceMutationVariables = Exact<{
  id: Scalars['UUID'];
}>;


export type RemoveActivityOccurrenceMutation = { __typename?: 'Mutation', experienceOccurrenceDelete: { __typename?: 'ExperienceOccurrenceDeletePayload', result: { __typename?: 'Response', succeeded: boolean } } };

export type UploadCarePlanDocumentMutationVariables = Exact<{
  input: CarePlanDocumentUploadInput;
}>;


export type UploadCarePlanDocumentMutation = { __typename?: 'Mutation', carePlanDocumentUpload: { __typename?: 'CarePlanDocumentUploadPayload', file: { __typename?: 'CareCircleFile', id: any, extension: string } } };

export type RenameCarePlanDocumentMutationVariables = Exact<{
  input: CarePlanDocumentRenameInput;
}>;


export type RenameCarePlanDocumentMutation = { __typename?: 'Mutation', carePlanDocumentRename: { __typename?: 'CarePlanDocumentRenamePayload', file: { __typename?: 'CareCircleFile', id: any, name: string } } };

export type DeleteCarePlanDocumentMutationVariables = Exact<{
  input: CarePlanDocumentDeleteInput;
}>;


export type DeleteCarePlanDocumentMutation = { __typename?: 'Mutation', carePlanDocumentDelete: { __typename?: 'CarePlanDocumentDeletePayload', result: boolean } };

export type CreateDocumentEmbeddingsMutationVariables = Exact<{
  input: DocumentEmbedInput;
}>;


export type CreateDocumentEmbeddingsMutation = { __typename?: 'Mutation', documentEmbed: { __typename?: 'DocumentEmbedResponsePayload', result: { __typename?: 'CareCircleFile', id: any, name: string, embeddings?: Array<{ __typename?: 'Embedding', id: any, text?: string | null, textEmbedding: Array<number> }> | null } } };

export type SetUserHasOnboardedMutationVariables = Exact<{ [key: string]: never; }>;


export type SetUserHasOnboardedMutation = { __typename?: 'Mutation', careGiverUpdateOnboardingStatus: { __typename?: 'UserProfileOnboardingStatusUpdatePayload', result: { __typename?: 'UserProfile', id: any, onboardingComplete: boolean } } };

export type CreateAppointmentMutationVariables = Exact<{
  input: AppointmentCreateInput;
}>;


export type CreateAppointmentMutation = { __typename?: 'Mutation', appointmentCreate: { __typename?: 'AppointmentCreatePayload', result: { __typename?: 'Appointment', recordStatus: RecordStatus, description: string, endDateTime?: any | null, id: any, startDateTime: any, recurrence?: string | null, location?: { __typename?: 'Location', addressLine1?: string | null, city?: string | null, id: any, freeTextAddress?: string | null, state?: string | null, zipCode?: string | null } | null } } };

export type AppointmentDeleteMutationVariables = Exact<{
  input: AppointmentDeleteInput;
}>;


export type AppointmentDeleteMutation = { __typename?: 'Mutation', appointmentDelete: { __typename?: 'AppointmentDeletePayload', result: { __typename?: 'Appointment', recordStatus: RecordStatus, id: any, description: string, startDateTime: any, endDateTime?: any | null, location?: { __typename?: 'Location', addressLine1?: string | null, city?: string | null, state?: string | null, zipCode?: string | null, id: any } | null } } };

export type AppointmentUpdateMutationVariables = Exact<{
  input: AppointmentUpdateInput;
}>;


export type AppointmentUpdateMutation = { __typename?: 'Mutation', appointmentUpdate: { __typename?: 'AppointmentUpdatePayload', result: { __typename?: 'Appointment', recordStatus: RecordStatus, id: any, description: string, startDateTime: any, endDateTime?: any | null, location?: { __typename?: 'Location', addressLine1?: string | null, city?: string | null, state?: string | null, zipCode?: string | null, id: any } | null } } };

export type CarePlanCreateMutationVariables = Exact<{
  input: CarePlanCreateInput;
}>;


export type CarePlanCreateMutation = { __typename?: 'Mutation', carePlanCreate: { __typename?: 'CarePlanCreatePayload', result: { __typename?: 'CarePlan', id: any, activities?: Array<{ __typename?: 'Activity', recordStatus: RecordStatus, description?: string | null, recurrence?: string | null, id: any, endDateTime?: any | null, startDateTime?: any | null }> | null } } };

export type ActivityDeleteMutationVariables = Exact<{
  input: ActivityDeleteInput;
}>;


export type ActivityDeleteMutation = { __typename?: 'Mutation', activityDelete: { __typename?: 'ActivityDeletePayload', result: { __typename?: 'Activity', recordStatus: RecordStatus, description?: string | null, recurrence?: string | null, id: any, endDateTime?: any | null, startDateTime?: any | null } } };

export type AnnotationCreateMutationVariables = Exact<{
  input: AnnotationCreateInput;
}>;


export type AnnotationCreateMutation = { __typename?: 'Mutation', annotationCreate: { __typename?: 'AnnotationCreatePayload', result: { __typename?: 'Annotation', id: any, type: AnnotationType } } };

export type AnnotationDeleteMutationVariables = Exact<{
  input: AnnotationDeleteInput;
}>;


export type AnnotationDeleteMutation = { __typename?: 'Mutation', annotationDelete: { __typename?: 'AnnotationDeletePayload', result: { __typename?: 'Annotation', id: any } } };

export type ConditionOccurenceSetHistoricalMutationVariables = Exact<{
  id: Scalars['UUID'];
}>;


export type ConditionOccurenceSetHistoricalMutation = { __typename?: 'Mutation', conditionOccurrenceSetHistorical: { __typename?: 'ConditionOccurrenceSetHistoricalPayload', result: { __typename?: 'ConditionOccurrence', id: any, current: boolean } } };

export type ConditionOccurenceSetCurrentMutationVariables = Exact<{
  id: Scalars['UUID'];
}>;


export type ConditionOccurenceSetCurrentMutation = { __typename?: 'Mutation', conditionOccurrenceSetCurrent: { __typename?: 'ConditionOccurrenceSetCurrentPayload', result: { __typename?: 'ConditionOccurrence', id: any, current: boolean } } };

export type GetUserInfoQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserInfoQuery = { __typename?: 'Query', me?: { __typename?: 'UserProfileSummary', id?: any | null, careCircleName?: string | null, role: Roles, careCircleId?: any | null, imageBase64?: string | null, displayName?: string | null, firstName?: string | null, agreesHasConsentToManageLoveOnesHealth?: any | null, agreesToTermsAndPrivacy?: any | null, understandsIntendedAppUse?: any | null, understandsMicrosoftUseOfTheirData?: any | null, understandsNotPermittedToUsePlatformForMinors?: any | null, agreesToOpenAiUse?: any | null } | null };

export type GetUserAppProfileInfoQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserAppProfileInfoQuery = { __typename?: 'Query', me?: { __typename?: 'UserProfileSummary', id?: any | null, imageBase64?: string | null, displayName?: string | null, mobile?: string | null, email?: string | null, role: Roles } | null };

export type GetUserTermsOfServiceAgreementsInfoQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserTermsOfServiceAgreementsInfoQuery = { __typename?: 'Query', me?: { __typename?: 'UserProfileSummary', understandsNotPermittedToUsePlatformForMinors?: any | null, agreesHasConsentToManageLoveOnesHealth?: any | null, agreesToTermsAndPrivacy?: any | null, understandsIntendedAppUse?: any | null, understandsMicrosoftUseOfTheirData?: any | null, agreesToOpenAiUse?: any | null } | null };

export type GetMemberQueryVariables = Exact<{
  id: Scalars['UUID'];
}>;


export type GetMemberQuery = { __typename?: 'Query', usersCareCircle: { __typename?: 'CareCircle', id: any, careCircleMembers?: Array<{ __typename?: 'CareCircleMembership', id: any, status: MembershipStatus, isEmergencyContact: boolean, relationshipToLovedOne: RelationshipsToLovedOne, profile: { __typename?: 'CareCircleProfile', id: any, role: Roles }, careGiver: { __typename?: 'CareGiver', id: any, displayName?: string | null, email: string, imageBase64: string, timeZoneGenericName?: string | null, timeZoneID?: string | null, mobile?: string | null } }> | null } };

export type GetMembersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMembersQuery = { __typename?: 'Query', usersCareCircle: { __typename?: 'CareCircle', id: any, careCircleMembers?: Array<{ __typename?: 'CareCircleMembership', id: any, status: MembershipStatus, profile: { __typename?: 'CareCircleProfile', id: any, role: Roles }, careGiver: { __typename?: 'CareGiver', id: any, displayName?: string | null, email: string, imageBase64: string } }> | null } };

export type GetCareTeamQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCareTeamQuery = { __typename?: 'Query', usersCareCircle: { __typename?: 'CareCircle', id: any, name?: string | null, careCircleMembers?: Array<{ __typename?: 'CareCircleMembership', id: any, isEmergencyContact: boolean, relationshipToLovedOne: RelationshipsToLovedOne, profile: { __typename?: 'CareCircleProfile', id: any, role: Roles }, careGiver: { __typename?: 'CareGiver', displayName?: string | null, id: any, mobile?: string | null, email: string, imageBase64: string } }> | null, appInvitations?: Array<{ __typename?: 'AppInvitation', id: any, deliveryMethod: DeliveryMethods, inviteFromName: string, inviteRecipientEmail: string, status: InviteStatus, careGiverAccepted: any, makeAdmin: boolean, makeEmergencyContact: boolean, relationshipToLovedOne: RelationshipsToLovedOne }> | null }, me?: { __typename?: 'UserProfileSummary', id?: any | null, careCircleName?: string | null, role: Roles, careCircleId?: any | null, imageBase64?: string | null, displayName?: string | null, firstName?: string | null } | null };

export type GetPrescriptionsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPrescriptionsQuery = { __typename?: 'Query', careRecipientMedicationPrescriptions?: { __typename?: 'CareRecipientMedicationPrescriptions', id?: any | null, prescriptions?: Array<{ __typename?: 'Prescription', id: any, recordStatus: RecordStatus, strengthValue?: string | null, overTheCounter?: boolean | null, endDate?: string | null, prescribingProvider?: { __typename?: 'Provider', id: any, recordStatus: RecordStatus, firstName?: string | null, lastName?: string | null, primarySpecialty: string, phoneNumber?: string | null, address?: { __typename?: 'Location', id: any, singleLineAddress?: string | null, freeTextAddress?: string | null, addressLine1?: string | null, addressLine2?: string | null, city?: string | null, country?: string | null, state?: string | null, zipCode?: string | null } | null } | null, takenFor?: { __typename?: 'ConditionOccurrence', id: any, recordStatus: RecordStatus, conditionStartDateDay?: number | null, conditionStartDateYear?: number | null, conditionStartDateMonth?: Month | null, conditionStartDateRelativePeriodEnd?: number | null, conditionStartDateRelativePeriodStart?: number | null, condition?: { __typename?: 'Condition', name?: string | null, id: any } | null } | null, medication?: { __typename?: 'Medication', id: any, name: string } | null, refills: Array<{ __typename?: 'Refill', refillDate: string, recordStatus: RecordStatus, id: any, pharmacy?: { __typename?: 'Pharmacy', id: any, name?: string | null, phoneNumber?: string | null, recordStatus: RecordStatus, location?: { __typename?: 'Location', id: any, addressLine1?: string | null, addressLine2?: string | null, city?: string | null, singleLineAddress?: string | null, freeTextAddress?: string | null, state?: string | null, zipCode?: string | null } | null } | null }> }> | null } | null };

export type GetPrescriptionsWithScheduleQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPrescriptionsWithScheduleQuery = { __typename?: 'Query', careRecipientMedicationPrescriptions?: { __typename?: 'CareRecipientMedicationPrescriptions', id?: any | null, prescriptions?: Array<{ __typename?: 'Prescription', id: any, recordStatus: RecordStatus, strengthValue?: string | null, overTheCounter?: boolean | null, directions?: string | null, endDate?: string | null, takenFor?: { __typename?: 'ConditionOccurrence', id: any, recordStatus: RecordStatus, conditionStartDateDay?: number | null, conditionStartDateYear?: number | null, conditionStartDateMonth?: Month | null, conditionStartDateRelativePeriodEnd?: number | null, conditionStartDateRelativePeriodStart?: number | null, condition?: { __typename?: 'Condition', name?: string | null, id: any } | null } | null, medication?: { __typename?: 'Medication', id: any, name: string, routedDoseFormDrugId?: string | null, dispensableDrugId?: string | null } | null, refills: Array<{ __typename?: 'Refill', recordStatus: RecordStatus, id: any, refillDate: string, pharmacy?: { __typename?: 'Pharmacy', id: any, name?: string | null, phoneNumber?: string | null, recordStatus: RecordStatus, location?: { __typename?: 'Location', id: any, addressLine1?: string | null, addressLine2?: string | null, city?: string | null, singleLineAddress?: string | null, freeTextAddress?: string | null, state?: string | null, zipCode?: string | null } | null } | null }>, dosages?: Array<{ __typename?: 'Dosage', id: any, recordStatus: RecordStatus, value: number, unit: string, schedule: string }> | null, prescribingProvider?: { __typename?: 'Provider', id: any, firstName?: string | null, lastName?: string | null, recordStatus: RecordStatus, primarySpecialty: string, phoneNumber?: string | null, address?: { __typename?: 'Location', id: any, singleLineAddress?: string | null, freeTextAddress?: string | null, addressLine1?: string | null, addressLine2?: string | null, city?: string | null, country?: string | null, state?: string | null, zipCode?: string | null } | null } | null }> | null } | null };

export type GetMedicationQueryVariables = Exact<{
  id: Scalars['UUID'];
}>;


export type GetMedicationQuery = { __typename?: 'Query', careRecipientMedicationPrescriptions?: { __typename?: 'CareRecipientMedicationPrescriptions', id?: any | null, prescriptions?: Array<{ __typename?: 'Prescription', id: any, recordStatus: RecordStatus, strengthValue?: string | null, overTheCounter?: boolean | null, directions?: string | null, startDate?: string | null, endDate?: string | null, takenFor?: { __typename?: 'ConditionOccurrence', id: any, recordStatus: RecordStatus, conditionStartDateDay?: number | null, conditionStartDateYear?: number | null, conditionStartDateMonth?: Month | null, conditionStartDateRelativePeriodEnd?: number | null, conditionStartDateRelativePeriodStart?: number | null, condition?: { __typename?: 'Condition', name?: string | null, id: any } | null } | null, medication?: { __typename?: 'Medication', id: any, name: string, routedDoseFormDrugId?: string | null, dispensableDrugId?: string | null } | null, refills: Array<{ __typename?: 'Refill', id: any, refillDate: string, recordStatus: RecordStatus, pharmacy?: { __typename?: 'Pharmacy', id: any, name?: string | null, phoneNumber?: string | null, recordStatus: RecordStatus, location?: { __typename?: 'Location', id: any, addressLine1?: string | null, addressLine2?: string | null, city?: string | null, singleLineAddress?: string | null, freeTextAddress?: string | null, state?: string | null, zipCode?: string | null } | null } | null }>, dosages?: Array<{ __typename?: 'Dosage', id: any, recordStatus: RecordStatus, value: number, unit: string, schedule: string }> | null, prescribingProvider?: { __typename?: 'Provider', id: any, firstName?: string | null, lastName?: string | null, recordStatus: RecordStatus, primarySpecialty: string, phoneNumber?: string | null, address?: { __typename?: 'Location', id: any, singleLineAddress?: string | null, freeTextAddress?: string | null, addressLine1?: string | null, addressLine2?: string | null, city?: string | null, country?: string | null, state?: string | null, zipCode?: string | null } | null } | null }> | null } | null };

export type GetAppInvitationQueryVariables = Exact<{
  inviteCode: Scalars['String'];
}>;


export type GetAppInvitationQuery = { __typename?: 'Query', appInvitation: { __typename?: 'AppInvitation', inviteFromName: string, careCircleName: string } };

export type GetUserNotificationPreferencesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserNotificationPreferencesQuery = { __typename?: 'Query', me?: { __typename?: 'UserProfileSummary', refillRemindersNotificationsEnabled: boolean, dailyMedicationDosesNotificationsEnabled: boolean, calendarAppointmentsNotificationsEnabled: boolean, postsReactionsRepliesNotificationsEnabled: boolean, activitySignUpsNotificationsEnabled: boolean, newMemberJoinsNotificationsEnabled: boolean } | null };

export type GetNotificationPreferencesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetNotificationPreferencesQuery = { __typename?: 'Query', notificationPreferences?: { __typename?: 'UserNotificationPreferences', profileId: any, notificationsPreferences: Array<{ __typename?: 'UserNotificationChannelPreferences', notification: { __typename?: 'NotificationFeatureProps', feature: Feature, availableChannels: Array<Channel>, requiresUserOptIn: boolean }, userChannelSelections: { __typename?: 'NotificationChannelSelections', sMSEnabled: boolean, emailEnabled: boolean, inAppEnabled: boolean } }> } | null };

export type GetCareRecipientConditionsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCareRecipientConditionsQuery = { __typename?: 'Query', careRecipientConditions?: { __typename?: 'CareRecipientConditions', id?: any | null, conditions?: Array<{ __typename?: 'ConditionOccurrence', recordStatus: RecordStatus, conditionEndDateDay?: number | null, conditionEndDateMonth?: Month | null, conditionEndDateYear?: number | null, conditionEndDateRelativePeriodStart?: number | null, conditionEndDateRelativePeriodEnd?: number | null, conditionStartDateDay?: number | null, conditionStartDateMonth?: Month | null, conditionStartDateYear?: number | null, conditionStartDateRelativePeriodStart?: number | null, conditionStartDateRelativePeriodEnd?: number | null, conditionRelativeTimePeriod?: RelativeTimePeriod | null, id: any, current: boolean, condition?: { __typename?: 'Condition', id: any, name?: string | null, codes?: Array<{ __typename?: 'CodedConcept', code?: string | null, id: any }> | null } | null }> | null } | null };

export type GetProvidersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetProvidersQuery = { __typename?: 'Query', careRecipientProviders?: { __typename?: 'CareRecipientProviders', id?: any | null, providers?: Array<{ __typename?: 'Provider', recordStatus: RecordStatus, firstName?: string | null, id: any, lastName?: string | null, phoneNumber?: string | null, primarySpecialty: string, address?: { __typename?: 'Location', addressLine1?: string | null, addressLine2?: string | null, city?: string | null, country?: string | null, state?: string | null, zipCode?: string | null, id: any, singleLineAddress?: string | null, freeTextAddress?: string | null } | null, codes?: Array<{ __typename?: 'CodedConcept', id: any, code?: string | null }> | null }> | null } | null };

export type ConditionSearchQueryVariables = Exact<{
  input: ConditionSearchInput;
}>;


export type ConditionSearchQuery = { __typename?: 'Query', conditionSearch?: { __typename?: 'ConditionSearchResponsePayload', result: { __typename?: 'ConditionSearchResponse', conditions?: Array<{ __typename?: 'ConditionData', conditionName?: string | null, icd10Code?: string | null }> | null } } | null };

export type SearchProviderQueryVariables = Exact<{
  searchText: Scalars['String'];
}>;


export type SearchProviderQuery = { __typename?: 'Query', providersSearch: { __typename?: 'ProviderSearchResultResponsePayload', result: { __typename?: 'ProviderSearchResultResponse', items?: Array<{ __typename?: 'ProviderSearchResult', providerFirstLineBusinessPracticeLocationAddress?: string | null, providerSecondLineBusinessPracticeLocationAddress?: string | null, providerBusinessPracticeLocationAddressCityName?: string | null, providerBusinessPracticeLocationAddressPostalCode?: string | null, providerBusinessPracticeLocationAddressStateName?: string | null, providerBusinessPracticeLocationAddressTelephoneNumber?: string | null, providerFirstName?: string | null, providerLastName?: string | null, primaryTaxonomyDisplayName?: string | null, nPI?: string | null }> | null } } };

export type GetProviderQueryVariables = Exact<{
  id: Scalars['UUID'];
}>;


export type GetProviderQuery = { __typename?: 'Query', careRecipientProviders?: { __typename?: 'CareRecipientProviders', id?: any | null, providers?: Array<{ __typename?: 'Provider', recordStatus: RecordStatus, firstName?: string | null, id: any, lastName?: string | null, phoneNumber?: string | null, primarySpecialty: string, address?: { __typename?: 'Location', addressLine1?: string | null, addressLine2?: string | null, city?: string | null, country?: string | null, state?: string | null, zipCode?: string | null, id: any, singleLineAddress?: string | null, freeTextAddress?: string | null } | null, codes?: Array<{ __typename?: 'CodedConcept', code?: string | null, id: any }> | null }> | null } | null };

export type SearchPharmacyQueryVariables = Exact<{
  searchText: Scalars['String'];
}>;


export type SearchPharmacyQuery = { __typename?: 'Query', pharmacySearch?: { __typename?: 'AddressSearchResponsePayload', result: { __typename?: 'AddressSearchResponse', results: Array<{ __typename?: 'Result', id?: string | null, address?: { __typename?: 'Address', streetNumber?: string | null, streetName?: string | null, city?: string | null, zipCode?: string | null, extendedZipCode?: string | null, state?: string | null, freeTextDisplayAddress?: string | null } | null, poi?: { __typename?: 'PointOfInterest', categories?: Array<string> | null, name?: string | null, phoneNumber?: string | null, website?: string | null, operatingHours?: { __typename?: 'OperatingHours', mode?: string | null, timeRanges?: Array<{ __typename?: 'OperatingHoursTimeRange', endTime?: { __typename?: 'OperatingHoursTime', date?: string | null, hour?: number | null, minute?: number | null } | null, startTime?: { __typename?: 'OperatingHoursTime', date?: string | null, hour?: number | null, minute?: number | null } | null }> | null } | null } | null }> } } | null };

export type GetPharmaciesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPharmaciesQuery = { __typename?: 'Query', careRecipientPharmacies?: { __typename?: 'CareRecipientPharmacies', id?: any | null, pharmacies?: Array<{ __typename?: 'Pharmacy', recordStatus: RecordStatus, id: any, phoneNumber?: string | null, name?: string | null, location?: { __typename?: 'Location', addressLine1?: string | null, addressLine2?: string | null, city?: string | null, country?: string | null, state?: string | null, zipCode?: string | null, id: any, singleLineAddress?: string | null, freeTextAddress?: string | null } | null }> | null } | null };

export type GetPharmacyQueryVariables = Exact<{
  id: Scalars['UUID'];
}>;


export type GetPharmacyQuery = { __typename?: 'Query', careRecipientPharmacies?: { __typename?: 'CareRecipientPharmacies', id?: any | null, pharmacies?: Array<{ __typename?: 'Pharmacy', recordStatus: RecordStatus, id: any, phoneNumber?: string | null, name?: string | null, location?: { __typename?: 'Location', addressLine1?: string | null, addressLine2?: string | null, city?: string | null, country?: string | null, state?: string | null, zipCode?: string | null, id: any, singleLineAddress?: string | null, freeTextAddress?: string | null } | null }> | null } | null };

export type SearchImmunizationQueryVariables = Exact<{
  searchText: Scalars['String'];
}>;


export type SearchImmunizationQuery = { __typename?: 'Query', vaccineSearch?: { __typename?: 'VaccineSearchResponsePayload', result: { __typename?: 'VaccineSearchResponse', searchResults?: Array<{ __typename?: 'CdcVaccineResponse', code?: string | null, name?: string | null }> | null } } | null };

export type GetImmunizationsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetImmunizationsQuery = { __typename?: 'Query', careRecipientImmunizations?: { __typename?: 'CareRecipientImmunizations', id?: any | null, immunizations?: Array<{ __typename?: 'Immunization', recordStatus: RecordStatus, id: any, immunizationDateDay?: number | null, immunizationDateMonth?: Month | null, immunizationDateYear?: number | null, immunizationDateRelativePeriodStart?: number | null, immunizationDateRelativePeriodEnd?: number | null, vaccineProductAdministered?: { __typename?: 'Vaccine', id: any, name?: string | null } | null }> | null } | null };

export type GetImmunizationQueryVariables = Exact<{
  id: Scalars['UUID'];
}>;


export type GetImmunizationQuery = { __typename?: 'Query', careRecipientImmunizations?: { __typename?: 'CareRecipientImmunizations', id?: any | null, immunizations?: Array<{ __typename?: 'Immunization', recordStatus: RecordStatus, id: any, immunizationDateDay?: number | null, immunizationDateMonth?: Month | null, immunizationDateYear?: number | null, immunizationDateRelativePeriodStart?: number | null, immunizationDateRelativePeriodEnd?: number | null, vaccineProductAdministered?: { __typename?: 'Vaccine', id: any, name?: string | null } | null }> | null } | null };

export type GetAllergiesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllergiesQuery = { __typename?: 'Query', careRecipientAllergies?: { __typename?: 'CareRecipientAllergies', id?: any | null, allergies?: Array<{ __typename?: 'Allergy', recordStatus: RecordStatus, id: any, severity?: AllergySeverity | null, allergen?: { __typename?: 'Allergen', id: any, name?: string | null } | null }> | null } | null };

export type GetAllergyQueryVariables = Exact<{
  id: Scalars['UUID'];
}>;


export type GetAllergyQuery = { __typename?: 'Query', careRecipientAllergies?: { __typename?: 'CareRecipientAllergies', id?: any | null, allergies?: Array<{ __typename?: 'Allergy', recordStatus: RecordStatus, id: any, severity?: AllergySeverity | null, allergen?: { __typename?: 'Allergen', id: any, name?: string | null } | null }> | null } | null };

export type SearchAddressQueryVariables = Exact<{
  searchText: Scalars['String'];
  location?: InputMaybe<GeolocationCoordinateInput>;
}>;


export type SearchAddressQuery = { __typename?: 'Query', addressSearch?: { __typename?: 'AddressSearchResponsePayload', result: { __typename?: 'AddressSearchResponse', results: Array<{ __typename?: 'Result', id?: string | null, address?: { __typename?: 'Address', freeTextDisplayAddress?: string | null, streetName?: string | null, streetNumber?: string | null, zipCode?: string | null, city?: string | null, extendedZipCode?: string | null, state?: string | null, stateName?: string | null, country?: string | null } | null, poi?: { __typename?: 'PointOfInterest', name?: string | null } | null }> } } | null };

export type GetCareRecipientProfileQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCareRecipientProfileQuery = { __typename?: 'Query', careRecipientProfile?: { __typename?: 'CareRecipient', firstName: string, lastName?: string | null, id: any, email?: string | null, phone?: string | null, dOB?: string | null, weight?: any | null, height?: any | null, legalSex?: LegalSexOptions | null, bloodType?: BloodTypes | null, measurementSystemPreference: MeasurementSystem, timeZoneID?: string | null, address?: { __typename?: 'Location', singleLineAddress?: string | null, freeTextAddress?: string | null, addressLine1?: string | null, addressLine2?: string | null, city?: string | null, country?: string | null, zipCode?: string | null, state?: string | null, id: any, saveState: { __typename?: 'LocationState', addressLine1?: string | null, addressLine2?: string | null, city?: string | null, country?: string | null, freeTextAddress?: string | null, zipCode?: string | null, state?: string | null } } | null } | null };

export type GetCareRecipientProfileBasicQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCareRecipientProfileBasicQuery = { __typename?: 'Query', careRecipientProfile?: { __typename?: 'CareRecipient', id: any, firstName: string, lastName?: string | null, dOB?: string | null, phone?: string | null } | null };

export type GetCareRecipientPhotoQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCareRecipientPhotoQuery = { __typename?: 'Query', careRecipientPhoto: { __typename?: 'CareRecipientPhoto', id?: any | null, careRecipientImageURL: string } };

export type GetActivitiesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetActivitiesQuery = { __typename?: 'Query', careCircleExperiences?: { __typename?: 'CareCircleExperiences', id?: any | null, experiences?: Array<{ __typename?: 'Experience', id: any, title?: string | null, details?: string | null, phoneNumber?: string | null, type?: ExperienceType | null, availability: string, address?: { __typename?: 'Location', id: any, addressLine1?: string | null, addressLine2?: string | null, city?: string | null, state?: string | null, zipCode?: string | null, country?: string | null, freeTextAddress?: string | null, singleLineAddress?: string | null } | null, careCircle?: { __typename?: 'CareCircle', id: any, careCircleMembers?: Array<{ __typename?: 'CareCircleMembership', id: any, relationshipToLovedOne: RelationshipsToLovedOne, careGiver: { __typename?: 'CareGiver', id: any, displayName?: string | null, imageBase64: string }, experienceOccurrences: Array<{ __typename?: 'ExperienceOccurrence', id: any, experience?: { __typename?: 'Experience', id: any } | null }> }> | null } | null }> | null } | null };

export type GetActivityQueryVariables = Exact<{
  id: Scalars['UUID'];
}>;


export type GetActivityQuery = { __typename?: 'Query', careCircleExperiences?: { __typename?: 'CareCircleExperiences', id?: any | null, experiences?: Array<{ __typename?: 'Experience', id: any, title?: string | null, details?: string | null, phoneNumber?: string | null, type?: ExperienceType | null, availability: string, address?: { __typename?: 'Location', id: any, addressLine1?: string | null, addressLine2?: string | null, city?: string | null, state?: string | null, zipCode?: string | null, country?: string | null, freeTextAddress?: string | null, singleLineAddress?: string | null } | null, careCircle?: { __typename?: 'CareCircle', id: any, careCircleMembers?: Array<{ __typename?: 'CareCircleMembership', id: any, relationshipToLovedOne: RelationshipsToLovedOne, careGiver: { __typename?: 'CareGiver', id: any, displayName?: string | null, imageBase64: string }, experienceOccurrences: Array<{ __typename?: 'ExperienceOccurrence', id: any, experience?: { __typename?: 'Experience', id: any } | null }> }> | null } | null }> | null } | null };

export type GetCarePlanDocumentsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCarePlanDocumentsQuery = { __typename?: 'Query', carePlanDocuments?: Array<{ __typename?: 'CareCircleFile', name: string, extension: string, uploadDate: string, id: any, downloadUri: string, fileSizeKB?: any | null, careCircle: { __typename?: 'CareCircle', name?: string | null, careCircleMembers?: Array<{ __typename?: 'CareCircleMembership', careGiver: { __typename?: 'CareGiver', displayName?: string | null } }> | null }, createdBy?: { __typename?: 'CareGiver', displayName?: string | null } | null }> | null };

export type GetDocumentQuestionAnswerQueryVariables = Exact<{
  input: DocumentInquiryInput;
}>;


export type GetDocumentQuestionAnswerQuery = { __typename?: 'Query', documentQuestionAnswer: { __typename?: 'DocumentInquiryResponsePayload', result: { __typename?: 'DocumentInquiryAnswer', answer: string, context: string, question: string, careCircleFileId: string } } };

export type GetCareCircleHasOnboardedQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCareCircleHasOnboardedQuery = { __typename?: 'Query', usersCareCircle: { __typename?: 'CareCircle', id: any, careCircleMembers?: Array<{ __typename?: 'CareCircleMembership', id: any, careGiver: { __typename?: 'CareGiver', id: any, profile: { __typename?: 'UserProfile', id: any, onboardingComplete: boolean } } }> | null } };

export type GetAvailableUserTimeZonesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAvailableUserTimeZonesQuery = { __typename?: 'Query', availableUserTimeZones: Array<{ __typename?: 'WindowsTimezone', ianaIds: Array<string>, territory: string, windowsId: string }> };

export type GetCommonConditionsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCommonConditionsQuery = { __typename?: 'Query', commonCondition: Array<{ __typename?: 'CommonCondition', name?: string | null, code?: string | null }> };

export type GetRelativeTimePeriodEnumQueryVariables = Exact<{ [key: string]: never; }>;


export type GetRelativeTimePeriodEnumQuery = { __typename?: 'Query', __type?: { __typename?: '__Type', name?: string | null, enumValues?: Array<{ __typename?: '__EnumValue', name: string }> | null } | null };

export type GetPositivitySlotQueryVariables = Exact<{
  input: PositivitySlotGenerateInput;
}>;


export type GetPositivitySlotQuery = { __typename?: 'Query', inquiryPositivitySlot: { __typename?: 'OpenAiInquiryResponsePayload', result: { __typename?: 'OpenAiInquiryResponse', id?: string | null, choices: Array<{ __typename?: 'OpenAiOutput', text?: string | null }> } } };

export type GetCarePlanConditionQueryVariables = Exact<{
  input: DynamicCarePlanGenerateInput;
}>;


export type GetCarePlanConditionQuery = { __typename?: 'Query', inquiryCarePlanCondition: { __typename?: 'OpenAiTaskResponsePayload', result: { __typename?: 'OpenAiTaskResponse', id?: string | null, choices: Array<{ __typename?: 'OpenAiTaskOutput', text: Array<{ __typename?: 'RecurringTask', recurrence?: string | null, task?: string | null }> }> } } };

export type GetConditionResourcesQueryVariables = Exact<{
  input: ResourceSearchInput;
}>;


export type GetConditionResourcesQuery = { __typename?: 'Query', resourceSearch: { __typename?: 'ResourceSearchResponsePayload', result: { __typename?: 'ResourceSearchResponse', webPages?: { __typename?: 'WebPages', value: Array<{ __typename?: 'Value', webPageID?: string | null, webPageName?: string | null, webPageUrl?: string | null, thumbnailUrl?: string | null, snippet?: string | null }> } | null } } };

export type GetAppointmentsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAppointmentsQuery = { __typename?: 'Query', careRecipientAppointments: { __typename?: 'CareRecipientAppointments', id?: any | null, appointments?: Array<{ __typename?: 'Appointment', recordStatus: RecordStatus, description: string, endDateTime?: any | null, id: any, startDateTime: any, recurrence?: string | null, location?: { __typename?: 'Location', addressLine1?: string | null, city?: string | null, id: any, freeTextAddress?: string | null, state?: string | null, zipCode?: string | null, saveState: { __typename?: 'LocationState', addressLine1?: string | null, addressLine2?: string | null, city?: string | null, country?: string | null, freeTextAddress?: string | null, zipCode?: string | null, state?: string | null } } | null }> | null } };

export type GetCareRecipientCarePlanQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCareRecipientCarePlanQuery = { __typename?: 'Query', careRecipientCarePlans?: { __typename?: 'CareRecipientCareplans', id?: any | null, carePlans?: Array<{ __typename?: 'CarePlan', id: any, recordStatus: RecordStatus, activities?: Array<{ __typename?: 'Activity', recordStatus: RecordStatus, description?: string | null, recurrence?: string | null, id: any, endDateTime?: any | null, startDateTime?: any | null }> | null, careRecipient: { __typename?: 'CareRecipient', id: any }, conditionOccurrence: { __typename?: 'ConditionOccurrence', id: any } }> | null } | null };

export type GetCareGiverAnnotationsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCareGiverAnnotationsQuery = { __typename?: 'Query', careGiverAnnotations?: { __typename?: 'CareGiverAnnotations', id?: any | null, annotations?: Array<{ __typename?: 'Annotation', id: any, recordStatus: RecordStatus, createdDateTime: any, type: AnnotationType, title?: string | null, text?: string | null }> | null } | null };

export type GetCareGiverAnnotationQueryVariables = Exact<{
  id: Scalars['UUID'];
}>;


export type GetCareGiverAnnotationQuery = { __typename?: 'Query', careGiverAnnotations?: { __typename?: 'CareGiverAnnotations', id?: any | null, annotations?: Array<{ __typename?: 'Annotation', id: any, recordStatus: RecordStatus, createdDateTime: any, type: AnnotationType, title?: string | null, text?: string | null }> | null } | null };

export type GetInquiryConditionAdhocQuestionQueryVariables = Exact<{
  input: ConditionInquiryInput;
}>;


export type GetInquiryConditionAdhocQuestionQuery = { __typename?: 'Query', inquiryConditionAdhocQuestion: { __typename?: 'OpenAiInquiryResponsePayload', result: { __typename?: 'OpenAiInquiryResponse', id?: string | null, choices: Array<{ __typename?: 'OpenAiOutput', text?: string | null }> } } };

export type GenerateQuestionsForProviderQueryVariables = Exact<{ [key: string]: never; }>;


export type GenerateQuestionsForProviderQuery = { __typename?: 'Query', questionGenerate: { __typename?: 'QuestionGenerateResponsePayload', result: { __typename?: 'QuestionGenerateResponse', questions?: Array<string> | null } } };

export type GenerateSymptomsQueryVariables = Exact<{ [key: string]: never; }>;


export type GenerateSymptomsQuery = { __typename?: 'Query', symptomParse: { __typename?: 'SymptomParseResponsePayload', result: { __typename?: 'SymptomParseResponse', symptoms?: Array<string> | null } } };

export type GetInquiryNoteParsingQueryVariables = Exact<{
  text: Scalars['String'];
}>;


export type GetInquiryNoteParsingQuery = { __typename?: 'Query', inquiryNoteParsing: { __typename?: 'AnnotationParseResponsePayload', result: { __typename?: 'AnnotationParseResponse', allergies?: Array<{ __typename?: 'AllergyCreate', severity: AllergySeverity, allergen?: { __typename?: 'AllergenFindOrCreate', damConceptId?: string | null, id?: any | null, name?: string | null } | null }> | null, conditions?: Array<{ __typename?: 'ConditionOccurrenceCreate', condition?: { __typename?: 'ConditionFindOrCreate', iCD10Code?: string | null, id?: any | null, name?: string | null } | null }> | null, immunizations?: Array<{ __typename?: 'ImmunizationCreate', vaccineProductAdministered?: { __typename?: 'VaccineFindOrCreate', cDCProductId?: string | null, name?: string | null } | null }> | null, medications?: Array<{ __typename?: 'MedicationPrescriptionCreate', medication?: { __typename?: 'MedicationFindOrCreate', dispensableDrugId?: string | null, id?: any | null, name: string, routedDoseFormDrugId?: string | null } | null }> | null } } };

export type GetCareRecipientTimelineQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCareRecipientTimelineQuery = { __typename?: 'Query', careRecipientTimeline: { __typename?: 'CareRecipientTimelineEntities', id?: any | null, entities?: Array<{ __typename?: 'TimelineEntity', id?: any | null, type: TimelineEntityType, status: TimelineEntityStatus, text: string, relativeTimePeriod?: RelativeTimePeriod | null, date?: { __typename?: 'DateComponents', year: number, month?: number | null, day?: number | null } | null, dateRange?: { __typename?: 'DateComponentsRange', start: { __typename?: 'DateComponents', year: number }, end: { __typename?: 'DateComponents', year: number } } | null }> | null } };


export const UpdateMedicationDocument = gql`
    mutation UpdateMedication($prescription: MedicationPrescriptionUpdateInput!) {
  medicationPrescriptionUpdate(input: $prescription) {
    result {
      id
      refills(where: {recordStatus: {eq: ACTIVE}}) {
        id
        refillDate
        recordStatus
        pharmacy {
          id
          name
          phoneNumber
          recordStatus
          location {
            id
            addressLine1
            city
            freeTextAddress
            state
            zipCode
          }
        }
      }
    }
  }
}
    `;
export type UpdateMedicationMutationFn = Apollo.MutationFunction<UpdateMedicationMutation, UpdateMedicationMutationVariables>;

/**
 * __useUpdateMedicationMutation__
 *
 * To run a mutation, you first call `useUpdateMedicationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateMedicationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateMedicationMutation, { data, loading, error }] = useUpdateMedicationMutation({
 *   variables: {
 *      prescription: // value for 'prescription'
 *   },
 * });
 */
export function useUpdateMedicationMutation(baseOptions?: Apollo.MutationHookOptions<UpdateMedicationMutation, UpdateMedicationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateMedicationMutation, UpdateMedicationMutationVariables>(UpdateMedicationDocument, options);
      }
export type UpdateMedicationMutationHookResult = ReturnType<typeof useUpdateMedicationMutation>;
export type UpdateMedicationMutationResult = Apollo.MutationResult<UpdateMedicationMutation>;
export type UpdateMedicationMutationOptions = Apollo.BaseMutationOptions<UpdateMedicationMutation, UpdateMedicationMutationVariables>;
export const RefillUpdateDocument = gql`
    mutation RefillUpdate($refill: RefillUpdateInput!) {
  refillUpdate(input: $refill) {
    result {
      id
    }
  }
}
    `;
export type RefillUpdateMutationFn = Apollo.MutationFunction<RefillUpdateMutation, RefillUpdateMutationVariables>;

/**
 * __useRefillUpdateMutation__
 *
 * To run a mutation, you first call `useRefillUpdateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRefillUpdateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [refillUpdateMutation, { data, loading, error }] = useRefillUpdateMutation({
 *   variables: {
 *      refill: // value for 'refill'
 *   },
 * });
 */
export function useRefillUpdateMutation(baseOptions?: Apollo.MutationHookOptions<RefillUpdateMutation, RefillUpdateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RefillUpdateMutation, RefillUpdateMutationVariables>(RefillUpdateDocument, options);
      }
export type RefillUpdateMutationHookResult = ReturnType<typeof useRefillUpdateMutation>;
export type RefillUpdateMutationResult = Apollo.MutationResult<RefillUpdateMutation>;
export type RefillUpdateMutationOptions = Apollo.BaseMutationOptions<RefillUpdateMutation, RefillUpdateMutationVariables>;
export const DeleteMedicationDocument = gql`
    mutation DeleteMedication($id: UUID!) {
  medicationPrescriptionDelete(input: {id: $id}) {
    result {
      id
    }
  }
}
    `;
export type DeleteMedicationMutationFn = Apollo.MutationFunction<DeleteMedicationMutation, DeleteMedicationMutationVariables>;

/**
 * __useDeleteMedicationMutation__
 *
 * To run a mutation, you first call `useDeleteMedicationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteMedicationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteMedicationMutation, { data, loading, error }] = useDeleteMedicationMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteMedicationMutation(baseOptions?: Apollo.MutationHookOptions<DeleteMedicationMutation, DeleteMedicationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteMedicationMutation, DeleteMedicationMutationVariables>(DeleteMedicationDocument, options);
      }
export type DeleteMedicationMutationHookResult = ReturnType<typeof useDeleteMedicationMutation>;
export type DeleteMedicationMutationResult = Apollo.MutationResult<DeleteMedicationMutation>;
export type DeleteMedicationMutationOptions = Apollo.BaseMutationOptions<DeleteMedicationMutation, DeleteMedicationMutationVariables>;
export const AddMedicationDocument = gql`
    mutation AddMedication($prescription: MedicationPrescriptionCreateInput!) {
  medicationPrescriptionCreate(input: $prescription) {
    result {
      id
    }
  }
}
    `;
export type AddMedicationMutationFn = Apollo.MutationFunction<AddMedicationMutation, AddMedicationMutationVariables>;

/**
 * __useAddMedicationMutation__
 *
 * To run a mutation, you first call `useAddMedicationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddMedicationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addMedicationMutation, { data, loading, error }] = useAddMedicationMutation({
 *   variables: {
 *      prescription: // value for 'prescription'
 *   },
 * });
 */
export function useAddMedicationMutation(baseOptions?: Apollo.MutationHookOptions<AddMedicationMutation, AddMedicationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddMedicationMutation, AddMedicationMutationVariables>(AddMedicationDocument, options);
      }
export type AddMedicationMutationHookResult = ReturnType<typeof useAddMedicationMutation>;
export type AddMedicationMutationResult = Apollo.MutationResult<AddMedicationMutation>;
export type AddMedicationMutationOptions = Apollo.BaseMutationOptions<AddMedicationMutation, AddMedicationMutationVariables>;
export const RefillDeleteDocument = gql`
    mutation RefillDelete($id: UUID!) {
  refillDelete(input: {id: $id}) {
    result {
      id
    }
  }
}
    `;
export type RefillDeleteMutationFn = Apollo.MutationFunction<RefillDeleteMutation, RefillDeleteMutationVariables>;

/**
 * __useRefillDeleteMutation__
 *
 * To run a mutation, you first call `useRefillDeleteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRefillDeleteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [refillDeleteMutation, { data, loading, error }] = useRefillDeleteMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRefillDeleteMutation(baseOptions?: Apollo.MutationHookOptions<RefillDeleteMutation, RefillDeleteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RefillDeleteMutation, RefillDeleteMutationVariables>(RefillDeleteDocument, options);
      }
export type RefillDeleteMutationHookResult = ReturnType<typeof useRefillDeleteMutation>;
export type RefillDeleteMutationResult = Apollo.MutationResult<RefillDeleteMutation>;
export type RefillDeleteMutationOptions = Apollo.BaseMutationOptions<RefillDeleteMutation, RefillDeleteMutationVariables>;
export const DosageDeleteDocument = gql`
    mutation DosageDelete($id: UUID!) {
  dosageDelete(input: {id: $id}) {
    result {
      id
    }
  }
}
    `;
export type DosageDeleteMutationFn = Apollo.MutationFunction<DosageDeleteMutation, DosageDeleteMutationVariables>;

/**
 * __useDosageDeleteMutation__
 *
 * To run a mutation, you first call `useDosageDeleteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDosageDeleteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [dosageDeleteMutation, { data, loading, error }] = useDosageDeleteMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDosageDeleteMutation(baseOptions?: Apollo.MutationHookOptions<DosageDeleteMutation, DosageDeleteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DosageDeleteMutation, DosageDeleteMutationVariables>(DosageDeleteDocument, options);
      }
export type DosageDeleteMutationHookResult = ReturnType<typeof useDosageDeleteMutation>;
export type DosageDeleteMutationResult = Apollo.MutationResult<DosageDeleteMutation>;
export type DosageDeleteMutationOptions = Apollo.BaseMutationOptions<DosageDeleteMutation, DosageDeleteMutationVariables>;
export const MedicationSearchDocument = gql`
    query MedicationSearch($searchText: String!) {
  medicationSearch(input: {searchText: $searchText}) {
    result {
      items {
        routedDoseFormDrugID
        routedDoseFormDrugDesc
        routeDesc
        drugNameDesc
        doseFormDesc
      }
    }
  }
}
    `;

/**
 * __useMedicationSearchQuery__
 *
 * To run a query within a React component, call `useMedicationSearchQuery` and pass it any options that fit your needs.
 * When your component renders, `useMedicationSearchQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMedicationSearchQuery({
 *   variables: {
 *      searchText: // value for 'searchText'
 *   },
 * });
 */
export function useMedicationSearchQuery(baseOptions: Apollo.QueryHookOptions<MedicationSearchQuery, MedicationSearchQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MedicationSearchQuery, MedicationSearchQueryVariables>(MedicationSearchDocument, options);
      }
export function useMedicationSearchLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MedicationSearchQuery, MedicationSearchQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MedicationSearchQuery, MedicationSearchQueryVariables>(MedicationSearchDocument, options);
        }
export type MedicationSearchQueryHookResult = ReturnType<typeof useMedicationSearchQuery>;
export type MedicationSearchLazyQueryHookResult = ReturnType<typeof useMedicationSearchLazyQuery>;
export type MedicationSearchQueryResult = Apollo.QueryResult<MedicationSearchQuery, MedicationSearchQueryVariables>;
export const DispensableDrugsDocument = gql`
    query DispensableDrugs($routedDoseFormDrugId: String!) {
  dispensableDrugs(input: {routedDoseFormDrugId: $routedDoseFormDrugId}) {
    result {
      items {
        dispensableDrugID
        medStrength
        medStrengthUnit
      }
    }
  }
}
    `;

/**
 * __useDispensableDrugsQuery__
 *
 * To run a query within a React component, call `useDispensableDrugsQuery` and pass it any options that fit your needs.
 * When your component renders, `useDispensableDrugsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDispensableDrugsQuery({
 *   variables: {
 *      routedDoseFormDrugId: // value for 'routedDoseFormDrugId'
 *   },
 * });
 */
export function useDispensableDrugsQuery(baseOptions: Apollo.QueryHookOptions<DispensableDrugsQuery, DispensableDrugsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<DispensableDrugsQuery, DispensableDrugsQueryVariables>(DispensableDrugsDocument, options);
      }
export function useDispensableDrugsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<DispensableDrugsQuery, DispensableDrugsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<DispensableDrugsQuery, DispensableDrugsQueryVariables>(DispensableDrugsDocument, options);
        }
export type DispensableDrugsQueryHookResult = ReturnType<typeof useDispensableDrugsQuery>;
export type DispensableDrugsLazyQueryHookResult = ReturnType<typeof useDispensableDrugsLazyQuery>;
export type DispensableDrugsQueryResult = Apollo.QueryResult<DispensableDrugsQuery, DispensableDrugsQueryVariables>;
export const EndMedicationDocument = gql`
    mutation EndMedication($id: UUID!) {
  medicationPrescriptionSetHistorical(input: {id: $id}) {
    result {
      id
    }
  }
}
    `;
export type EndMedicationMutationFn = Apollo.MutationFunction<EndMedicationMutation, EndMedicationMutationVariables>;

/**
 * __useEndMedicationMutation__
 *
 * To run a mutation, you first call `useEndMedicationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEndMedicationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [endMedicationMutation, { data, loading, error }] = useEndMedicationMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useEndMedicationMutation(baseOptions?: Apollo.MutationHookOptions<EndMedicationMutation, EndMedicationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EndMedicationMutation, EndMedicationMutationVariables>(EndMedicationDocument, options);
      }
export type EndMedicationMutationHookResult = ReturnType<typeof useEndMedicationMutation>;
export type EndMedicationMutationResult = Apollo.MutationResult<EndMedicationMutation>;
export type EndMedicationMutationOptions = Apollo.BaseMutationOptions<EndMedicationMutation, EndMedicationMutationVariables>;
export const CreateInviteDocument = gql`
    mutation CreateInvite($careCircleId: String!) {
  createInvite(input: {careCircleId: $careCircleId}) {
    result {
      inviteCode
      inviteFromName
      careCircleName
      status
    }
  }
}
    `;
export type CreateInviteMutationFn = Apollo.MutationFunction<CreateInviteMutation, CreateInviteMutationVariables>;

/**
 * __useCreateInviteMutation__
 *
 * To run a mutation, you first call `useCreateInviteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateInviteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createInviteMutation, { data, loading, error }] = useCreateInviteMutation({
 *   variables: {
 *      careCircleId: // value for 'careCircleId'
 *   },
 * });
 */
export function useCreateInviteMutation(baseOptions?: Apollo.MutationHookOptions<CreateInviteMutation, CreateInviteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateInviteMutation, CreateInviteMutationVariables>(CreateInviteDocument, options);
      }
export type CreateInviteMutationHookResult = ReturnType<typeof useCreateInviteMutation>;
export type CreateInviteMutationResult = Apollo.MutationResult<CreateInviteMutation>;
export type CreateInviteMutationOptions = Apollo.BaseMutationOptions<CreateInviteMutation, CreateInviteMutationVariables>;
export const AddEmailInvitationDocument = gql`
    mutation AddEmailInvitation($careCircleId: String!, $email: String!, $makeAdmin: Boolean!, $makeEmergencyContact: Boolean!, $relationshipToLovedOne: RelationshipsToLovedOne!) {
  createInvite(
    input: {careCircleId: $careCircleId, recipientEmail: $email, makeAdmin: $makeAdmin, makeEmergencyContact: $makeEmergencyContact, relationshipToLovedOne: $relationshipToLovedOne}
  ) {
    result {
      id
      deliveryMethod
      inviteFromName
      inviteRecipientEmail
      status
    }
  }
}
    `;
export type AddEmailInvitationMutationFn = Apollo.MutationFunction<AddEmailInvitationMutation, AddEmailInvitationMutationVariables>;

/**
 * __useAddEmailInvitationMutation__
 *
 * To run a mutation, you first call `useAddEmailInvitationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddEmailInvitationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addEmailInvitationMutation, { data, loading, error }] = useAddEmailInvitationMutation({
 *   variables: {
 *      careCircleId: // value for 'careCircleId'
 *      email: // value for 'email'
 *      makeAdmin: // value for 'makeAdmin'
 *      makeEmergencyContact: // value for 'makeEmergencyContact'
 *      relationshipToLovedOne: // value for 'relationshipToLovedOne'
 *   },
 * });
 */
export function useAddEmailInvitationMutation(baseOptions?: Apollo.MutationHookOptions<AddEmailInvitationMutation, AddEmailInvitationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddEmailInvitationMutation, AddEmailInvitationMutationVariables>(AddEmailInvitationDocument, options);
      }
export type AddEmailInvitationMutationHookResult = ReturnType<typeof useAddEmailInvitationMutation>;
export type AddEmailInvitationMutationResult = Apollo.MutationResult<AddEmailInvitationMutation>;
export type AddEmailInvitationMutationOptions = Apollo.BaseMutationOptions<AddEmailInvitationMutation, AddEmailInvitationMutationVariables>;
export const RevokeInviteDocument = gql`
    mutation RevokeInvite($inviteId: UUID!) {
  revokeInvite(input: {inviteId: $inviteId}) {
    result {
      succeeded
      errorCode
    }
  }
}
    `;
export type RevokeInviteMutationFn = Apollo.MutationFunction<RevokeInviteMutation, RevokeInviteMutationVariables>;

/**
 * __useRevokeInviteMutation__
 *
 * To run a mutation, you first call `useRevokeInviteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRevokeInviteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [revokeInviteMutation, { data, loading, error }] = useRevokeInviteMutation({
 *   variables: {
 *      inviteId: // value for 'inviteId'
 *   },
 * });
 */
export function useRevokeInviteMutation(baseOptions?: Apollo.MutationHookOptions<RevokeInviteMutation, RevokeInviteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RevokeInviteMutation, RevokeInviteMutationVariables>(RevokeInviteDocument, options);
      }
export type RevokeInviteMutationHookResult = ReturnType<typeof useRevokeInviteMutation>;
export type RevokeInviteMutationResult = Apollo.MutationResult<RevokeInviteMutation>;
export type RevokeInviteMutationOptions = Apollo.BaseMutationOptions<RevokeInviteMutation, RevokeInviteMutationVariables>;
export const ApproveInviteDocument = gql`
    mutation ApproveInvite($careGiverId: UUID!) {
  careGiverApproveToCareCircle(
    input: {careGiverId: $careGiverId, isApproved: true}
  ) {
    result {
      status
    }
  }
}
    `;
export type ApproveInviteMutationFn = Apollo.MutationFunction<ApproveInviteMutation, ApproveInviteMutationVariables>;

/**
 * __useApproveInviteMutation__
 *
 * To run a mutation, you first call `useApproveInviteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useApproveInviteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [approveInviteMutation, { data, loading, error }] = useApproveInviteMutation({
 *   variables: {
 *      careGiverId: // value for 'careGiverId'
 *   },
 * });
 */
export function useApproveInviteMutation(baseOptions?: Apollo.MutationHookOptions<ApproveInviteMutation, ApproveInviteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ApproveInviteMutation, ApproveInviteMutationVariables>(ApproveInviteDocument, options);
      }
export type ApproveInviteMutationHookResult = ReturnType<typeof useApproveInviteMutation>;
export type ApproveInviteMutationResult = Apollo.MutationResult<ApproveInviteMutation>;
export type ApproveInviteMutationOptions = Apollo.BaseMutationOptions<ApproveInviteMutation, ApproveInviteMutationVariables>;
export const RejectInviteDocument = gql`
    mutation RejectInvite($careGiverId: UUID!) {
  careGiverApproveToCareCircle(
    input: {careGiverId: $careGiverId, isApproved: false}
  ) {
    result {
      status
    }
  }
}
    `;
export type RejectInviteMutationFn = Apollo.MutationFunction<RejectInviteMutation, RejectInviteMutationVariables>;

/**
 * __useRejectInviteMutation__
 *
 * To run a mutation, you first call `useRejectInviteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRejectInviteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [rejectInviteMutation, { data, loading, error }] = useRejectInviteMutation({
 *   variables: {
 *      careGiverId: // value for 'careGiverId'
 *   },
 * });
 */
export function useRejectInviteMutation(baseOptions?: Apollo.MutationHookOptions<RejectInviteMutation, RejectInviteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RejectInviteMutation, RejectInviteMutationVariables>(RejectInviteDocument, options);
      }
export type RejectInviteMutationHookResult = ReturnType<typeof useRejectInviteMutation>;
export type RejectInviteMutationResult = Apollo.MutationResult<RejectInviteMutation>;
export type RejectInviteMutationOptions = Apollo.BaseMutationOptions<RejectInviteMutation, RejectInviteMutationVariables>;
export const UpdateInviteDocument = gql`
    mutation UpdateInvite($appInvitationId: UUID!, $careCircleId: String!, $makeAdmin: Boolean!, $makeEmergencyContact: Boolean!, $relationshipToLovedOne: RelationshipsToLovedOne!) {
  appInvitationUpdate(
    input: {appInvitationId: $appInvitationId, careCircleId: $careCircleId, makeAdmin: $makeAdmin, makeEmergencyContact: $makeEmergencyContact, relationshipToLovedOne: $relationshipToLovedOne}
  ) {
    result {
      status
    }
  }
}
    `;
export type UpdateInviteMutationFn = Apollo.MutationFunction<UpdateInviteMutation, UpdateInviteMutationVariables>;

/**
 * __useUpdateInviteMutation__
 *
 * To run a mutation, you first call `useUpdateInviteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateInviteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateInviteMutation, { data, loading, error }] = useUpdateInviteMutation({
 *   variables: {
 *      appInvitationId: // value for 'appInvitationId'
 *      careCircleId: // value for 'careCircleId'
 *      makeAdmin: // value for 'makeAdmin'
 *      makeEmergencyContact: // value for 'makeEmergencyContact'
 *      relationshipToLovedOne: // value for 'relationshipToLovedOne'
 *   },
 * });
 */
export function useUpdateInviteMutation(baseOptions?: Apollo.MutationHookOptions<UpdateInviteMutation, UpdateInviteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateInviteMutation, UpdateInviteMutationVariables>(UpdateInviteDocument, options);
      }
export type UpdateInviteMutationHookResult = ReturnType<typeof useUpdateInviteMutation>;
export type UpdateInviteMutationResult = Apollo.MutationResult<UpdateInviteMutation>;
export type UpdateInviteMutationOptions = Apollo.BaseMutationOptions<UpdateInviteMutation, UpdateInviteMutationVariables>;
export const ClearCareCircleDataDocument = gql`
    mutation ClearCareCircleData($careCircleName: String!) {
  clearCareCircleData(input: {confirmCareCircleName: $careCircleName}) {
    result {
      succeeded
    }
  }
}
    `;
export type ClearCareCircleDataMutationFn = Apollo.MutationFunction<ClearCareCircleDataMutation, ClearCareCircleDataMutationVariables>;

/**
 * __useClearCareCircleDataMutation__
 *
 * To run a mutation, you first call `useClearCareCircleDataMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useClearCareCircleDataMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [clearCareCircleDataMutation, { data, loading, error }] = useClearCareCircleDataMutation({
 *   variables: {
 *      careCircleName: // value for 'careCircleName'
 *   },
 * });
 */
export function useClearCareCircleDataMutation(baseOptions?: Apollo.MutationHookOptions<ClearCareCircleDataMutation, ClearCareCircleDataMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ClearCareCircleDataMutation, ClearCareCircleDataMutationVariables>(ClearCareCircleDataDocument, options);
      }
export type ClearCareCircleDataMutationHookResult = ReturnType<typeof useClearCareCircleDataMutation>;
export type ClearCareCircleDataMutationResult = Apollo.MutationResult<ClearCareCircleDataMutation>;
export type ClearCareCircleDataMutationOptions = Apollo.BaseMutationOptions<ClearCareCircleDataMutation, ClearCareCircleDataMutationVariables>;
export const CreateAccountDocument = gql`
    mutation CreateAccount {
  createCareGiver(input: {populateFromMsGraph: true}) {
    result {
      id
      imageBase64
      displayName
      mobile
      email
    }
  }
}
    `;
export type CreateAccountMutationFn = Apollo.MutationFunction<CreateAccountMutation, CreateAccountMutationVariables>;

/**
 * __useCreateAccountMutation__
 *
 * To run a mutation, you first call `useCreateAccountMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateAccountMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createAccountMutation, { data, loading, error }] = useCreateAccountMutation({
 *   variables: {
 *   },
 * });
 */
export function useCreateAccountMutation(baseOptions?: Apollo.MutationHookOptions<CreateAccountMutation, CreateAccountMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateAccountMutation, CreateAccountMutationVariables>(CreateAccountDocument, options);
      }
export type CreateAccountMutationHookResult = ReturnType<typeof useCreateAccountMutation>;
export type CreateAccountMutationResult = Apollo.MutationResult<CreateAccountMutation>;
export type CreateAccountMutationOptions = Apollo.BaseMutationOptions<CreateAccountMutation, CreateAccountMutationVariables>;
export const CreateCareCircleDocument = gql`
    mutation CreateCareCircle($circleName: String!) {
  createCareCircle(input: {name: $circleName}) {
    result {
      id
      name
    }
  }
}
    `;
export type CreateCareCircleMutationFn = Apollo.MutationFunction<CreateCareCircleMutation, CreateCareCircleMutationVariables>;

/**
 * __useCreateCareCircleMutation__
 *
 * To run a mutation, you first call `useCreateCareCircleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCareCircleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCareCircleMutation, { data, loading, error }] = useCreateCareCircleMutation({
 *   variables: {
 *      circleName: // value for 'circleName'
 *   },
 * });
 */
export function useCreateCareCircleMutation(baseOptions?: Apollo.MutationHookOptions<CreateCareCircleMutation, CreateCareCircleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCareCircleMutation, CreateCareCircleMutationVariables>(CreateCareCircleDocument, options);
      }
export type CreateCareCircleMutationHookResult = ReturnType<typeof useCreateCareCircleMutation>;
export type CreateCareCircleMutationResult = Apollo.MutationResult<CreateCareCircleMutation>;
export type CreateCareCircleMutationOptions = Apollo.BaseMutationOptions<CreateCareCircleMutation, CreateCareCircleMutationVariables>;
export const JoinCircleFromInviteLinkDocument = gql`
    mutation JoinCircleFromInviteLink($careGiverId: String!, $inviteCode: String!) {
  joinCareCircleFromInviteLink(
    input: {careGiverId: $careGiverId, inviteCode: $inviteCode}
  ) {
    result {
      status
      careCircleName
      careCircleId
    }
  }
}
    `;
export type JoinCircleFromInviteLinkMutationFn = Apollo.MutationFunction<JoinCircleFromInviteLinkMutation, JoinCircleFromInviteLinkMutationVariables>;

/**
 * __useJoinCircleFromInviteLinkMutation__
 *
 * To run a mutation, you first call `useJoinCircleFromInviteLinkMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useJoinCircleFromInviteLinkMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [joinCircleFromInviteLinkMutation, { data, loading, error }] = useJoinCircleFromInviteLinkMutation({
 *   variables: {
 *      careGiverId: // value for 'careGiverId'
 *      inviteCode: // value for 'inviteCode'
 *   },
 * });
 */
export function useJoinCircleFromInviteLinkMutation(baseOptions?: Apollo.MutationHookOptions<JoinCircleFromInviteLinkMutation, JoinCircleFromInviteLinkMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<JoinCircleFromInviteLinkMutation, JoinCircleFromInviteLinkMutationVariables>(JoinCircleFromInviteLinkDocument, options);
      }
export type JoinCircleFromInviteLinkMutationHookResult = ReturnType<typeof useJoinCircleFromInviteLinkMutation>;
export type JoinCircleFromInviteLinkMutationResult = Apollo.MutationResult<JoinCircleFromInviteLinkMutation>;
export type JoinCircleFromInviteLinkMutationOptions = Apollo.BaseMutationOptions<JoinCircleFromInviteLinkMutation, JoinCircleFromInviteLinkMutationVariables>;
export const RemoveMemberDocument = gql`
    mutation RemoveMember($input: RemoveCareGiverFromCareCircleInput!) {
  removeCareGiverFromCareCircle(input: $input) {
    result {
      succeeded
      additionalDetails
    }
  }
}
    `;
export type RemoveMemberMutationFn = Apollo.MutationFunction<RemoveMemberMutation, RemoveMemberMutationVariables>;

/**
 * __useRemoveMemberMutation__
 *
 * To run a mutation, you first call `useRemoveMemberMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveMemberMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeMemberMutation, { data, loading, error }] = useRemoveMemberMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRemoveMemberMutation(baseOptions?: Apollo.MutationHookOptions<RemoveMemberMutation, RemoveMemberMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveMemberMutation, RemoveMemberMutationVariables>(RemoveMemberDocument, options);
      }
export type RemoveMemberMutationHookResult = ReturnType<typeof useRemoveMemberMutation>;
export type RemoveMemberMutationResult = Apollo.MutationResult<RemoveMemberMutation>;
export type RemoveMemberMutationOptions = Apollo.BaseMutationOptions<RemoveMemberMutation, RemoveMemberMutationVariables>;
export const SetIsEmergencyContactDocument = gql`
    mutation SetIsEmergencyContact($careGiverId: UUID!, $isEmergencyContact: Boolean!) {
  careGiverSetEmergencyContact(
    input: {careGiverId: $careGiverId, isEmergencyContact: $isEmergencyContact}
  ) {
    result {
      status
      careCircle {
        id
        careCircleMembers(where: {careGiverId: {eq: $careGiverId}}) {
          id
          status
          profile {
            id
            role
          }
          careGiver {
            id
            displayName
            email
            imageBase64
            mobile
          }
          isEmergencyContact
          relationshipToLovedOne
        }
      }
    }
  }
}
    `;
export type SetIsEmergencyContactMutationFn = Apollo.MutationFunction<SetIsEmergencyContactMutation, SetIsEmergencyContactMutationVariables>;

/**
 * __useSetIsEmergencyContactMutation__
 *
 * To run a mutation, you first call `useSetIsEmergencyContactMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetIsEmergencyContactMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setIsEmergencyContactMutation, { data, loading, error }] = useSetIsEmergencyContactMutation({
 *   variables: {
 *      careGiverId: // value for 'careGiverId'
 *      isEmergencyContact: // value for 'isEmergencyContact'
 *   },
 * });
 */
export function useSetIsEmergencyContactMutation(baseOptions?: Apollo.MutationHookOptions<SetIsEmergencyContactMutation, SetIsEmergencyContactMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SetIsEmergencyContactMutation, SetIsEmergencyContactMutationVariables>(SetIsEmergencyContactDocument, options);
      }
export type SetIsEmergencyContactMutationHookResult = ReturnType<typeof useSetIsEmergencyContactMutation>;
export type SetIsEmergencyContactMutationResult = Apollo.MutationResult<SetIsEmergencyContactMutation>;
export type SetIsEmergencyContactMutationOptions = Apollo.BaseMutationOptions<SetIsEmergencyContactMutation, SetIsEmergencyContactMutationVariables>;
export const SetIsAdminDocument = gql`
    mutation SetIsAdmin($careGiverId: UUID!, $isAdmin: Boolean!) {
  careGiverSetAdmin(input: {careGiverId: $careGiverId, isAdmin: $isAdmin}) {
    result {
      status
      careCircle {
        id
        careCircleMembers(where: {careGiverId: {eq: $careGiverId}}) {
          id
          status
          profile {
            id
            role
          }
          careGiver {
            id
            displayName
            email
            imageBase64
            mobile
          }
          isEmergencyContact
          relationshipToLovedOne
        }
      }
    }
  }
}
    `;
export type SetIsAdminMutationFn = Apollo.MutationFunction<SetIsAdminMutation, SetIsAdminMutationVariables>;

/**
 * __useSetIsAdminMutation__
 *
 * To run a mutation, you first call `useSetIsAdminMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetIsAdminMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setIsAdminMutation, { data, loading, error }] = useSetIsAdminMutation({
 *   variables: {
 *      careGiverId: // value for 'careGiverId'
 *      isAdmin: // value for 'isAdmin'
 *   },
 * });
 */
export function useSetIsAdminMutation(baseOptions?: Apollo.MutationHookOptions<SetIsAdminMutation, SetIsAdminMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SetIsAdminMutation, SetIsAdminMutationVariables>(SetIsAdminDocument, options);
      }
export type SetIsAdminMutationHookResult = ReturnType<typeof useSetIsAdminMutation>;
export type SetIsAdminMutationResult = Apollo.MutationResult<SetIsAdminMutation>;
export type SetIsAdminMutationOptions = Apollo.BaseMutationOptions<SetIsAdminMutation, SetIsAdminMutationVariables>;
export const CareGiverSetRelationshipToLovedOneDocument = gql`
    mutation CareGiverSetRelationshipToLovedOne($careGiverId: UUID!, $relationship: RelationshipsToLovedOne!) {
  careGiverSetRelationshipToLovedOne(
    input: {careGiverId: $careGiverId, relationship: $relationship}
  ) {
    result {
      careCircle {
        id
        careCircleMembers(where: {careGiverId: {eq: $careGiverId}}) {
          id
          status
          profile {
            id
            role
          }
          careGiver {
            id
            displayName
            email
            imageBase64
            mobile
          }
          isEmergencyContact
          relationshipToLovedOne
        }
      }
    }
  }
}
    `;
export type CareGiverSetRelationshipToLovedOneMutationFn = Apollo.MutationFunction<CareGiverSetRelationshipToLovedOneMutation, CareGiverSetRelationshipToLovedOneMutationVariables>;

/**
 * __useCareGiverSetRelationshipToLovedOneMutation__
 *
 * To run a mutation, you first call `useCareGiverSetRelationshipToLovedOneMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCareGiverSetRelationshipToLovedOneMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [careGiverSetRelationshipToLovedOneMutation, { data, loading, error }] = useCareGiverSetRelationshipToLovedOneMutation({
 *   variables: {
 *      careGiverId: // value for 'careGiverId'
 *      relationship: // value for 'relationship'
 *   },
 * });
 */
export function useCareGiverSetRelationshipToLovedOneMutation(baseOptions?: Apollo.MutationHookOptions<CareGiverSetRelationshipToLovedOneMutation, CareGiverSetRelationshipToLovedOneMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CareGiverSetRelationshipToLovedOneMutation, CareGiverSetRelationshipToLovedOneMutationVariables>(CareGiverSetRelationshipToLovedOneDocument, options);
      }
export type CareGiverSetRelationshipToLovedOneMutationHookResult = ReturnType<typeof useCareGiverSetRelationshipToLovedOneMutation>;
export type CareGiverSetRelationshipToLovedOneMutationResult = Apollo.MutationResult<CareGiverSetRelationshipToLovedOneMutation>;
export type CareGiverSetRelationshipToLovedOneMutationOptions = Apollo.BaseMutationOptions<CareGiverSetRelationshipToLovedOneMutation, CareGiverSetRelationshipToLovedOneMutationVariables>;
export const SetNotificationPreferenceDocument = gql`
    mutation SetNotificationPreference($isEnabled: Boolean!, $preferenceToSet: NotificationPreference!) {
  notificationPreferencesSet(
    input: {isEnabled: $isEnabled, preferenceToSet: $preferenceToSet}
  ) {
    result {
      id
    }
  }
}
    `;
export type SetNotificationPreferenceMutationFn = Apollo.MutationFunction<SetNotificationPreferenceMutation, SetNotificationPreferenceMutationVariables>;

/**
 * __useSetNotificationPreferenceMutation__
 *
 * To run a mutation, you first call `useSetNotificationPreferenceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetNotificationPreferenceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setNotificationPreferenceMutation, { data, loading, error }] = useSetNotificationPreferenceMutation({
 *   variables: {
 *      isEnabled: // value for 'isEnabled'
 *      preferenceToSet: // value for 'preferenceToSet'
 *   },
 * });
 */
export function useSetNotificationPreferenceMutation(baseOptions?: Apollo.MutationHookOptions<SetNotificationPreferenceMutation, SetNotificationPreferenceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SetNotificationPreferenceMutation, SetNotificationPreferenceMutationVariables>(SetNotificationPreferenceDocument, options);
      }
export type SetNotificationPreferenceMutationHookResult = ReturnType<typeof useSetNotificationPreferenceMutation>;
export type SetNotificationPreferenceMutationResult = Apollo.MutationResult<SetNotificationPreferenceMutation>;
export type SetNotificationPreferenceMutationOptions = Apollo.BaseMutationOptions<SetNotificationPreferenceMutation, SetNotificationPreferenceMutationVariables>;
export const CreateProviderDocument = gql`
    mutation CreateProvider($firstName: String, $lastName: String!, $nPI: String, $phoneNumber: String, $address: LocationFindOrCreateInput, $primarySpecialty: String!) {
  providerCreate(
    input: {firstName: $firstName, lastName: $lastName, nPI: $nPI, phoneNumber: $phoneNumber, address: $address, primarySpecialty: $primarySpecialty}
  ) {
    result {
      id
    }
  }
}
    `;
export type CreateProviderMutationFn = Apollo.MutationFunction<CreateProviderMutation, CreateProviderMutationVariables>;

/**
 * __useCreateProviderMutation__
 *
 * To run a mutation, you first call `useCreateProviderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateProviderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createProviderMutation, { data, loading, error }] = useCreateProviderMutation({
 *   variables: {
 *      firstName: // value for 'firstName'
 *      lastName: // value for 'lastName'
 *      nPI: // value for 'nPI'
 *      phoneNumber: // value for 'phoneNumber'
 *      address: // value for 'address'
 *      primarySpecialty: // value for 'primarySpecialty'
 *   },
 * });
 */
export function useCreateProviderMutation(baseOptions?: Apollo.MutationHookOptions<CreateProviderMutation, CreateProviderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateProviderMutation, CreateProviderMutationVariables>(CreateProviderDocument, options);
      }
export type CreateProviderMutationHookResult = ReturnType<typeof useCreateProviderMutation>;
export type CreateProviderMutationResult = Apollo.MutationResult<CreateProviderMutation>;
export type CreateProviderMutationOptions = Apollo.BaseMutationOptions<CreateProviderMutation, CreateProviderMutationVariables>;
export const CreateConditionOccurrenceDocument = gql`
    mutation CreateConditionOccurrence($input: ConditionOccurrenceCreateInput!) {
  conditionOccurrenceCreate(input: $input) {
    result {
      id
    }
  }
}
    `;
export type CreateConditionOccurrenceMutationFn = Apollo.MutationFunction<CreateConditionOccurrenceMutation, CreateConditionOccurrenceMutationVariables>;

/**
 * __useCreateConditionOccurrenceMutation__
 *
 * To run a mutation, you first call `useCreateConditionOccurrenceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateConditionOccurrenceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createConditionOccurrenceMutation, { data, loading, error }] = useCreateConditionOccurrenceMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateConditionOccurrenceMutation(baseOptions?: Apollo.MutationHookOptions<CreateConditionOccurrenceMutation, CreateConditionOccurrenceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateConditionOccurrenceMutation, CreateConditionOccurrenceMutationVariables>(CreateConditionOccurrenceDocument, options);
      }
export type CreateConditionOccurrenceMutationHookResult = ReturnType<typeof useCreateConditionOccurrenceMutation>;
export type CreateConditionOccurrenceMutationResult = Apollo.MutationResult<CreateConditionOccurrenceMutation>;
export type CreateConditionOccurrenceMutationOptions = Apollo.BaseMutationOptions<CreateConditionOccurrenceMutation, CreateConditionOccurrenceMutationVariables>;
export const UpdateConditionOccurrenceDocument = gql`
    mutation UpdateConditionOccurrence($input: ConditionOccurrenceUpdateInput!) {
  conditionOccurrenceUpdate(input: $input) {
    result {
      id
    }
  }
}
    `;
export type UpdateConditionOccurrenceMutationFn = Apollo.MutationFunction<UpdateConditionOccurrenceMutation, UpdateConditionOccurrenceMutationVariables>;

/**
 * __useUpdateConditionOccurrenceMutation__
 *
 * To run a mutation, you first call `useUpdateConditionOccurrenceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateConditionOccurrenceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateConditionOccurrenceMutation, { data, loading, error }] = useUpdateConditionOccurrenceMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateConditionOccurrenceMutation(baseOptions?: Apollo.MutationHookOptions<UpdateConditionOccurrenceMutation, UpdateConditionOccurrenceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateConditionOccurrenceMutation, UpdateConditionOccurrenceMutationVariables>(UpdateConditionOccurrenceDocument, options);
      }
export type UpdateConditionOccurrenceMutationHookResult = ReturnType<typeof useUpdateConditionOccurrenceMutation>;
export type UpdateConditionOccurrenceMutationResult = Apollo.MutationResult<UpdateConditionOccurrenceMutation>;
export type UpdateConditionOccurrenceMutationOptions = Apollo.BaseMutationOptions<UpdateConditionOccurrenceMutation, UpdateConditionOccurrenceMutationVariables>;
export const DeleteConditionOccurenceDocument = gql`
    mutation DeleteConditionOccurence($id: UUID!) {
  conditionOccurrenceDelete(input: {id: $id}) {
    result {
      id
    }
  }
}
    `;
export type DeleteConditionOccurenceMutationFn = Apollo.MutationFunction<DeleteConditionOccurenceMutation, DeleteConditionOccurenceMutationVariables>;

/**
 * __useDeleteConditionOccurenceMutation__
 *
 * To run a mutation, you first call `useDeleteConditionOccurenceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteConditionOccurenceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteConditionOccurenceMutation, { data, loading, error }] = useDeleteConditionOccurenceMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteConditionOccurenceMutation(baseOptions?: Apollo.MutationHookOptions<DeleteConditionOccurenceMutation, DeleteConditionOccurenceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteConditionOccurenceMutation, DeleteConditionOccurenceMutationVariables>(DeleteConditionOccurenceDocument, options);
      }
export type DeleteConditionOccurenceMutationHookResult = ReturnType<typeof useDeleteConditionOccurenceMutation>;
export type DeleteConditionOccurenceMutationResult = Apollo.MutationResult<DeleteConditionOccurenceMutation>;
export type DeleteConditionOccurenceMutationOptions = Apollo.BaseMutationOptions<DeleteConditionOccurenceMutation, DeleteConditionOccurenceMutationVariables>;
export const UpdateProviderDocument = gql`
    mutation UpdateProvider($firstName: String, $lastName: String!, $nPI: String, $phoneNumber: String, $address: LocationFindOrCreateInput, $id: UUID!, $primarySpecialty: String!) {
  providerUpdate(
    input: {firstName: $firstName, lastName: $lastName, nPI: $nPI, phoneNumber: $phoneNumber, address: $address, id: $id, primarySpecialty: $primarySpecialty}
  ) {
    result {
      id
    }
  }
}
    `;
export type UpdateProviderMutationFn = Apollo.MutationFunction<UpdateProviderMutation, UpdateProviderMutationVariables>;

/**
 * __useUpdateProviderMutation__
 *
 * To run a mutation, you first call `useUpdateProviderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProviderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProviderMutation, { data, loading, error }] = useUpdateProviderMutation({
 *   variables: {
 *      firstName: // value for 'firstName'
 *      lastName: // value for 'lastName'
 *      nPI: // value for 'nPI'
 *      phoneNumber: // value for 'phoneNumber'
 *      address: // value for 'address'
 *      id: // value for 'id'
 *      primarySpecialty: // value for 'primarySpecialty'
 *   },
 * });
 */
export function useUpdateProviderMutation(baseOptions?: Apollo.MutationHookOptions<UpdateProviderMutation, UpdateProviderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateProviderMutation, UpdateProviderMutationVariables>(UpdateProviderDocument, options);
      }
export type UpdateProviderMutationHookResult = ReturnType<typeof useUpdateProviderMutation>;
export type UpdateProviderMutationResult = Apollo.MutationResult<UpdateProviderMutation>;
export type UpdateProviderMutationOptions = Apollo.BaseMutationOptions<UpdateProviderMutation, UpdateProviderMutationVariables>;
export const RemoveProviderDocument = gql`
    mutation RemoveProvider($id: UUID!) {
  providerDelete(input: {id: $id}) {
    result {
      id
    }
  }
}
    `;
export type RemoveProviderMutationFn = Apollo.MutationFunction<RemoveProviderMutation, RemoveProviderMutationVariables>;

/**
 * __useRemoveProviderMutation__
 *
 * To run a mutation, you first call `useRemoveProviderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveProviderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeProviderMutation, { data, loading, error }] = useRemoveProviderMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRemoveProviderMutation(baseOptions?: Apollo.MutationHookOptions<RemoveProviderMutation, RemoveProviderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveProviderMutation, RemoveProviderMutationVariables>(RemoveProviderDocument, options);
      }
export type RemoveProviderMutationHookResult = ReturnType<typeof useRemoveProviderMutation>;
export type RemoveProviderMutationResult = Apollo.MutationResult<RemoveProviderMutation>;
export type RemoveProviderMutationOptions = Apollo.BaseMutationOptions<RemoveProviderMutation, RemoveProviderMutationVariables>;
export const CreateCareRecipientProfileDocument = gql`
    mutation CreateCareRecipientProfile($firstName: String!, $lastName: String) {
  careRecipientProfileCreate(input: {firstName: $firstName, lastName: $lastName}) {
    result {
      id
      firstName
      lastName
    }
  }
}
    `;
export type CreateCareRecipientProfileMutationFn = Apollo.MutationFunction<CreateCareRecipientProfileMutation, CreateCareRecipientProfileMutationVariables>;

/**
 * __useCreateCareRecipientProfileMutation__
 *
 * To run a mutation, you first call `useCreateCareRecipientProfileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCareRecipientProfileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCareRecipientProfileMutation, { data, loading, error }] = useCreateCareRecipientProfileMutation({
 *   variables: {
 *      firstName: // value for 'firstName'
 *      lastName: // value for 'lastName'
 *   },
 * });
 */
export function useCreateCareRecipientProfileMutation(baseOptions?: Apollo.MutationHookOptions<CreateCareRecipientProfileMutation, CreateCareRecipientProfileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCareRecipientProfileMutation, CreateCareRecipientProfileMutationVariables>(CreateCareRecipientProfileDocument, options);
      }
export type CreateCareRecipientProfileMutationHookResult = ReturnType<typeof useCreateCareRecipientProfileMutation>;
export type CreateCareRecipientProfileMutationResult = Apollo.MutationResult<CreateCareRecipientProfileMutation>;
export type CreateCareRecipientProfileMutationOptions = Apollo.BaseMutationOptions<CreateCareRecipientProfileMutation, CreateCareRecipientProfileMutationVariables>;
export const UploadCareRecipientPhotoDocument = gql`
    mutation UploadCareRecipientPhoto($input: CareRecipientPhotoUploadInput!) {
  careRecipientPhotoUpload(input: $input) {
    url
  }
}
    `;
export type UploadCareRecipientPhotoMutationFn = Apollo.MutationFunction<UploadCareRecipientPhotoMutation, UploadCareRecipientPhotoMutationVariables>;

/**
 * __useUploadCareRecipientPhotoMutation__
 *
 * To run a mutation, you first call `useUploadCareRecipientPhotoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUploadCareRecipientPhotoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [uploadCareRecipientPhotoMutation, { data, loading, error }] = useUploadCareRecipientPhotoMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUploadCareRecipientPhotoMutation(baseOptions?: Apollo.MutationHookOptions<UploadCareRecipientPhotoMutation, UploadCareRecipientPhotoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UploadCareRecipientPhotoMutation, UploadCareRecipientPhotoMutationVariables>(UploadCareRecipientPhotoDocument, options);
      }
export type UploadCareRecipientPhotoMutationHookResult = ReturnType<typeof useUploadCareRecipientPhotoMutation>;
export type UploadCareRecipientPhotoMutationResult = Apollo.MutationResult<UploadCareRecipientPhotoMutation>;
export type UploadCareRecipientPhotoMutationOptions = Apollo.BaseMutationOptions<UploadCareRecipientPhotoMutation, UploadCareRecipientPhotoMutationVariables>;
export const UpdateCareRecipientProfileDocument = gql`
    mutation UpdateCareRecipientProfile($firstName: String!, $lastName: String, $dOB: String, $email: String, $phone: String, $bloodType: BloodTypes) {
  careRecipientProfileUpdate(
    input: {firstName: $firstName, lastName: $lastName, dOB: $dOB, email: $email, phone: $phone, bloodType: $bloodType}
  ) {
    result {
      id
    }
  }
}
    `;
export type UpdateCareRecipientProfileMutationFn = Apollo.MutationFunction<UpdateCareRecipientProfileMutation, UpdateCareRecipientProfileMutationVariables>;

/**
 * __useUpdateCareRecipientProfileMutation__
 *
 * To run a mutation, you first call `useUpdateCareRecipientProfileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCareRecipientProfileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCareRecipientProfileMutation, { data, loading, error }] = useUpdateCareRecipientProfileMutation({
 *   variables: {
 *      firstName: // value for 'firstName'
 *      lastName: // value for 'lastName'
 *      dOB: // value for 'dOB'
 *      email: // value for 'email'
 *      phone: // value for 'phone'
 *      bloodType: // value for 'bloodType'
 *   },
 * });
 */
export function useUpdateCareRecipientProfileMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCareRecipientProfileMutation, UpdateCareRecipientProfileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateCareRecipientProfileMutation, UpdateCareRecipientProfileMutationVariables>(UpdateCareRecipientProfileDocument, options);
      }
export type UpdateCareRecipientProfileMutationHookResult = ReturnType<typeof useUpdateCareRecipientProfileMutation>;
export type UpdateCareRecipientProfileMutationResult = Apollo.MutationResult<UpdateCareRecipientProfileMutation>;
export type UpdateCareRecipientProfileMutationOptions = Apollo.BaseMutationOptions<UpdateCareRecipientProfileMutation, UpdateCareRecipientProfileMutationVariables>;
export const UpdateCareRecipientAddressDocument = gql`
    mutation UpdateCareRecipientAddress($addressLine1: String, $addressLine2: String, $city: String, $state: String, $country: String, $zipCode: String, $freeTextAddress: String) {
  careRecipientAddressUpdate(
    input: {address: {freeTextAddress: $freeTextAddress, addressLine1: $addressLine1, addressLine2: $addressLine2, city: $city, state: $state, country: $country, zipCode: $zipCode}}
  ) {
    result {
      firstName
      lastName
      address {
        id
        addressLine1
        state
      }
    }
  }
}
    `;
export type UpdateCareRecipientAddressMutationFn = Apollo.MutationFunction<UpdateCareRecipientAddressMutation, UpdateCareRecipientAddressMutationVariables>;

/**
 * __useUpdateCareRecipientAddressMutation__
 *
 * To run a mutation, you first call `useUpdateCareRecipientAddressMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCareRecipientAddressMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCareRecipientAddressMutation, { data, loading, error }] = useUpdateCareRecipientAddressMutation({
 *   variables: {
 *      addressLine1: // value for 'addressLine1'
 *      addressLine2: // value for 'addressLine2'
 *      city: // value for 'city'
 *      state: // value for 'state'
 *      country: // value for 'country'
 *      zipCode: // value for 'zipCode'
 *      freeTextAddress: // value for 'freeTextAddress'
 *   },
 * });
 */
export function useUpdateCareRecipientAddressMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCareRecipientAddressMutation, UpdateCareRecipientAddressMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateCareRecipientAddressMutation, UpdateCareRecipientAddressMutationVariables>(UpdateCareRecipientAddressDocument, options);
      }
export type UpdateCareRecipientAddressMutationHookResult = ReturnType<typeof useUpdateCareRecipientAddressMutation>;
export type UpdateCareRecipientAddressMutationResult = Apollo.MutationResult<UpdateCareRecipientAddressMutation>;
export type UpdateCareRecipientAddressMutationOptions = Apollo.BaseMutationOptions<UpdateCareRecipientAddressMutation, UpdateCareRecipientAddressMutationVariables>;
export const UpdateCareRecipientMeasurementsDocument = gql`
    mutation UpdateCareRecipientMeasurements($height: Decimal, $weight: Decimal) {
  careRecipientMeasurementsUpdate(input: {height: $height, weight: $weight}) {
    result {
      firstName
      lastName
      height
      weight
    }
  }
}
    `;
export type UpdateCareRecipientMeasurementsMutationFn = Apollo.MutationFunction<UpdateCareRecipientMeasurementsMutation, UpdateCareRecipientMeasurementsMutationVariables>;

/**
 * __useUpdateCareRecipientMeasurementsMutation__
 *
 * To run a mutation, you first call `useUpdateCareRecipientMeasurementsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCareRecipientMeasurementsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCareRecipientMeasurementsMutation, { data, loading, error }] = useUpdateCareRecipientMeasurementsMutation({
 *   variables: {
 *      height: // value for 'height'
 *      weight: // value for 'weight'
 *   },
 * });
 */
export function useUpdateCareRecipientMeasurementsMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCareRecipientMeasurementsMutation, UpdateCareRecipientMeasurementsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateCareRecipientMeasurementsMutation, UpdateCareRecipientMeasurementsMutationVariables>(UpdateCareRecipientMeasurementsDocument, options);
      }
export type UpdateCareRecipientMeasurementsMutationHookResult = ReturnType<typeof useUpdateCareRecipientMeasurementsMutation>;
export type UpdateCareRecipientMeasurementsMutationResult = Apollo.MutationResult<UpdateCareRecipientMeasurementsMutation>;
export type UpdateCareRecipientMeasurementsMutationOptions = Apollo.BaseMutationOptions<UpdateCareRecipientMeasurementsMutation, UpdateCareRecipientMeasurementsMutationVariables>;
export const UpdateCareRecipientMeasurementSystemDocument = gql`
    mutation UpdateCareRecipientMeasurementSystem($measurementSystem: MeasurementSystem!) {
  careRecipientMeasurementSystemUpdate(
    input: {measurementSystem: $measurementSystem}
  ) {
    result {
      firstName
      lastName
      measurementSystemPreference
    }
  }
}
    `;
export type UpdateCareRecipientMeasurementSystemMutationFn = Apollo.MutationFunction<UpdateCareRecipientMeasurementSystemMutation, UpdateCareRecipientMeasurementSystemMutationVariables>;

/**
 * __useUpdateCareRecipientMeasurementSystemMutation__
 *
 * To run a mutation, you first call `useUpdateCareRecipientMeasurementSystemMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCareRecipientMeasurementSystemMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCareRecipientMeasurementSystemMutation, { data, loading, error }] = useUpdateCareRecipientMeasurementSystemMutation({
 *   variables: {
 *      measurementSystem: // value for 'measurementSystem'
 *   },
 * });
 */
export function useUpdateCareRecipientMeasurementSystemMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCareRecipientMeasurementSystemMutation, UpdateCareRecipientMeasurementSystemMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateCareRecipientMeasurementSystemMutation, UpdateCareRecipientMeasurementSystemMutationVariables>(UpdateCareRecipientMeasurementSystemDocument, options);
      }
export type UpdateCareRecipientMeasurementSystemMutationHookResult = ReturnType<typeof useUpdateCareRecipientMeasurementSystemMutation>;
export type UpdateCareRecipientMeasurementSystemMutationResult = Apollo.MutationResult<UpdateCareRecipientMeasurementSystemMutation>;
export type UpdateCareRecipientMeasurementSystemMutationOptions = Apollo.BaseMutationOptions<UpdateCareRecipientMeasurementSystemMutation, UpdateCareRecipientMeasurementSystemMutationVariables>;
export const UpdateCareRecipientTimezoneDocument = gql`
    mutation UpdateCareRecipientTimezone($timezoneId: String!) {
  careRecipientTimezoneUpdate(input: {timeZoneID: $timezoneId}) {
    result {
      id
      timeZoneID
    }
  }
}
    `;
export type UpdateCareRecipientTimezoneMutationFn = Apollo.MutationFunction<UpdateCareRecipientTimezoneMutation, UpdateCareRecipientTimezoneMutationVariables>;

/**
 * __useUpdateCareRecipientTimezoneMutation__
 *
 * To run a mutation, you first call `useUpdateCareRecipientTimezoneMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCareRecipientTimezoneMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCareRecipientTimezoneMutation, { data, loading, error }] = useUpdateCareRecipientTimezoneMutation({
 *   variables: {
 *      timezoneId: // value for 'timezoneId'
 *   },
 * });
 */
export function useUpdateCareRecipientTimezoneMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCareRecipientTimezoneMutation, UpdateCareRecipientTimezoneMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateCareRecipientTimezoneMutation, UpdateCareRecipientTimezoneMutationVariables>(UpdateCareRecipientTimezoneDocument, options);
      }
export type UpdateCareRecipientTimezoneMutationHookResult = ReturnType<typeof useUpdateCareRecipientTimezoneMutation>;
export type UpdateCareRecipientTimezoneMutationResult = Apollo.MutationResult<UpdateCareRecipientTimezoneMutation>;
export type UpdateCareRecipientTimezoneMutationOptions = Apollo.BaseMutationOptions<UpdateCareRecipientTimezoneMutation, UpdateCareRecipientTimezoneMutationVariables>;
export const CaregiverNotificationSettingsUpdateDocument = gql`
    mutation CaregiverNotificationSettingsUpdate($mobileNumber: String, $timeZoneID: String!) {
  caregiverNotificationSettingsUpdate(
    input: {mobileNumber: $mobileNumber, timeZoneID: $timeZoneID}
  ) {
    result {
      id
      mobile
      timeZoneID
      timeZoneGenericName
    }
  }
}
    `;
export type CaregiverNotificationSettingsUpdateMutationFn = Apollo.MutationFunction<CaregiverNotificationSettingsUpdateMutation, CaregiverNotificationSettingsUpdateMutationVariables>;

/**
 * __useCaregiverNotificationSettingsUpdateMutation__
 *
 * To run a mutation, you first call `useCaregiverNotificationSettingsUpdateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCaregiverNotificationSettingsUpdateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [caregiverNotificationSettingsUpdateMutation, { data, loading, error }] = useCaregiverNotificationSettingsUpdateMutation({
 *   variables: {
 *      mobileNumber: // value for 'mobileNumber'
 *      timeZoneID: // value for 'timeZoneID'
 *   },
 * });
 */
export function useCaregiverNotificationSettingsUpdateMutation(baseOptions?: Apollo.MutationHookOptions<CaregiverNotificationSettingsUpdateMutation, CaregiverNotificationSettingsUpdateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CaregiverNotificationSettingsUpdateMutation, CaregiverNotificationSettingsUpdateMutationVariables>(CaregiverNotificationSettingsUpdateDocument, options);
      }
export type CaregiverNotificationSettingsUpdateMutationHookResult = ReturnType<typeof useCaregiverNotificationSettingsUpdateMutation>;
export type CaregiverNotificationSettingsUpdateMutationResult = Apollo.MutationResult<CaregiverNotificationSettingsUpdateMutation>;
export type CaregiverNotificationSettingsUpdateMutationOptions = Apollo.BaseMutationOptions<CaregiverNotificationSettingsUpdateMutation, CaregiverNotificationSettingsUpdateMutationVariables>;
export const CareGiverCareCircleNotificationSettingsDefaultsDocument = gql`
    mutation CareGiverCareCircleNotificationSettingsDefaults($enableSMSChannelOnAllNotifications: Boolean!, $enableEmailChannelOnAllNotifications: Boolean!) {
  careGiverCarecircleNotificationSettingsDefaults(
    input: {enableSMSChannelOnAllNotifications: $enableSMSChannelOnAllNotifications, enableEmailChannelOnAllNotifications: $enableEmailChannelOnAllNotifications}
  ) {
    result {
      profileId
    }
  }
}
    `;
export type CareGiverCareCircleNotificationSettingsDefaultsMutationFn = Apollo.MutationFunction<CareGiverCareCircleNotificationSettingsDefaultsMutation, CareGiverCareCircleNotificationSettingsDefaultsMutationVariables>;

/**
 * __useCareGiverCareCircleNotificationSettingsDefaultsMutation__
 *
 * To run a mutation, you first call `useCareGiverCareCircleNotificationSettingsDefaultsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCareGiverCareCircleNotificationSettingsDefaultsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [careGiverCareCircleNotificationSettingsDefaultsMutation, { data, loading, error }] = useCareGiverCareCircleNotificationSettingsDefaultsMutation({
 *   variables: {
 *      enableSMSChannelOnAllNotifications: // value for 'enableSMSChannelOnAllNotifications'
 *      enableEmailChannelOnAllNotifications: // value for 'enableEmailChannelOnAllNotifications'
 *   },
 * });
 */
export function useCareGiverCareCircleNotificationSettingsDefaultsMutation(baseOptions?: Apollo.MutationHookOptions<CareGiverCareCircleNotificationSettingsDefaultsMutation, CareGiverCareCircleNotificationSettingsDefaultsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CareGiverCareCircleNotificationSettingsDefaultsMutation, CareGiverCareCircleNotificationSettingsDefaultsMutationVariables>(CareGiverCareCircleNotificationSettingsDefaultsDocument, options);
      }
export type CareGiverCareCircleNotificationSettingsDefaultsMutationHookResult = ReturnType<typeof useCareGiverCareCircleNotificationSettingsDefaultsMutation>;
export type CareGiverCareCircleNotificationSettingsDefaultsMutationResult = Apollo.MutationResult<CareGiverCareCircleNotificationSettingsDefaultsMutation>;
export type CareGiverCareCircleNotificationSettingsDefaultsMutationOptions = Apollo.BaseMutationOptions<CareGiverCareCircleNotificationSettingsDefaultsMutation, CareGiverCareCircleNotificationSettingsDefaultsMutationVariables>;
export const NotificationPreferenceUpdateDocument = gql`
    mutation NotificationPreferenceUpdate($notificationFeature: Feature!, $sMSEnabled: Boolean!, $emailEnabled: Boolean!, $inAppEnabled: Boolean!) {
  notificationPreferenceUpdate(
    input: {notificationFeature: $notificationFeature, sMSEnabled: $sMSEnabled, emailEnabled: $emailEnabled, inAppEnabled: $inAppEnabled}
  ) {
    result {
      notificationsPreferences {
        notification {
          availableChannels
          feature
        }
        userChannelSelections {
          sMSEnabled
          emailEnabled
          inAppEnabled
        }
      }
    }
  }
}
    `;
export type NotificationPreferenceUpdateMutationFn = Apollo.MutationFunction<NotificationPreferenceUpdateMutation, NotificationPreferenceUpdateMutationVariables>;

/**
 * __useNotificationPreferenceUpdateMutation__
 *
 * To run a mutation, you first call `useNotificationPreferenceUpdateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useNotificationPreferenceUpdateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [notificationPreferenceUpdateMutation, { data, loading, error }] = useNotificationPreferenceUpdateMutation({
 *   variables: {
 *      notificationFeature: // value for 'notificationFeature'
 *      sMSEnabled: // value for 'sMSEnabled'
 *      emailEnabled: // value for 'emailEnabled'
 *      inAppEnabled: // value for 'inAppEnabled'
 *   },
 * });
 */
export function useNotificationPreferenceUpdateMutation(baseOptions?: Apollo.MutationHookOptions<NotificationPreferenceUpdateMutation, NotificationPreferenceUpdateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<NotificationPreferenceUpdateMutation, NotificationPreferenceUpdateMutationVariables>(NotificationPreferenceUpdateDocument, options);
      }
export type NotificationPreferenceUpdateMutationHookResult = ReturnType<typeof useNotificationPreferenceUpdateMutation>;
export type NotificationPreferenceUpdateMutationResult = Apollo.MutationResult<NotificationPreferenceUpdateMutation>;
export type NotificationPreferenceUpdateMutationOptions = Apollo.BaseMutationOptions<NotificationPreferenceUpdateMutation, NotificationPreferenceUpdateMutationVariables>;
export const CreatePharmacyDocument = gql`
    mutation CreatePharmacy($name: String, $phoneNumber: String, $location: LocationFindOrCreateInput) {
  pharmacyCreate(
    input: {name: $name, phoneNumber: $phoneNumber, location: $location}
  ) {
    result {
      id
    }
  }
}
    `;
export type CreatePharmacyMutationFn = Apollo.MutationFunction<CreatePharmacyMutation, CreatePharmacyMutationVariables>;

/**
 * __useCreatePharmacyMutation__
 *
 * To run a mutation, you first call `useCreatePharmacyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePharmacyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPharmacyMutation, { data, loading, error }] = useCreatePharmacyMutation({
 *   variables: {
 *      name: // value for 'name'
 *      phoneNumber: // value for 'phoneNumber'
 *      location: // value for 'location'
 *   },
 * });
 */
export function useCreatePharmacyMutation(baseOptions?: Apollo.MutationHookOptions<CreatePharmacyMutation, CreatePharmacyMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePharmacyMutation, CreatePharmacyMutationVariables>(CreatePharmacyDocument, options);
      }
export type CreatePharmacyMutationHookResult = ReturnType<typeof useCreatePharmacyMutation>;
export type CreatePharmacyMutationResult = Apollo.MutationResult<CreatePharmacyMutation>;
export type CreatePharmacyMutationOptions = Apollo.BaseMutationOptions<CreatePharmacyMutation, CreatePharmacyMutationVariables>;
export const UpdatePharmacyDocument = gql`
    mutation UpdatePharmacy($phoneNumber: String, $location: LocationFindOrCreateInput, $id: UUID!, $name: String) {
  pharmacyUpdate(
    input: {phoneNumber: $phoneNumber, location: $location, id: $id, name: $name}
  ) {
    result {
      id
    }
  }
}
    `;
export type UpdatePharmacyMutationFn = Apollo.MutationFunction<UpdatePharmacyMutation, UpdatePharmacyMutationVariables>;

/**
 * __useUpdatePharmacyMutation__
 *
 * To run a mutation, you first call `useUpdatePharmacyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePharmacyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePharmacyMutation, { data, loading, error }] = useUpdatePharmacyMutation({
 *   variables: {
 *      phoneNumber: // value for 'phoneNumber'
 *      location: // value for 'location'
 *      id: // value for 'id'
 *      name: // value for 'name'
 *   },
 * });
 */
export function useUpdatePharmacyMutation(baseOptions?: Apollo.MutationHookOptions<UpdatePharmacyMutation, UpdatePharmacyMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdatePharmacyMutation, UpdatePharmacyMutationVariables>(UpdatePharmacyDocument, options);
      }
export type UpdatePharmacyMutationHookResult = ReturnType<typeof useUpdatePharmacyMutation>;
export type UpdatePharmacyMutationResult = Apollo.MutationResult<UpdatePharmacyMutation>;
export type UpdatePharmacyMutationOptions = Apollo.BaseMutationOptions<UpdatePharmacyMutation, UpdatePharmacyMutationVariables>;
export const RemovePharmacyDocument = gql`
    mutation RemovePharmacy($id: UUID!) {
  pharmacyDelete(input: {id: $id}) {
    result {
      id
    }
  }
}
    `;
export type RemovePharmacyMutationFn = Apollo.MutationFunction<RemovePharmacyMutation, RemovePharmacyMutationVariables>;

/**
 * __useRemovePharmacyMutation__
 *
 * To run a mutation, you first call `useRemovePharmacyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemovePharmacyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removePharmacyMutation, { data, loading, error }] = useRemovePharmacyMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRemovePharmacyMutation(baseOptions?: Apollo.MutationHookOptions<RemovePharmacyMutation, RemovePharmacyMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemovePharmacyMutation, RemovePharmacyMutationVariables>(RemovePharmacyDocument, options);
      }
export type RemovePharmacyMutationHookResult = ReturnType<typeof useRemovePharmacyMutation>;
export type RemovePharmacyMutationResult = Apollo.MutationResult<RemovePharmacyMutation>;
export type RemovePharmacyMutationOptions = Apollo.BaseMutationOptions<RemovePharmacyMutation, RemovePharmacyMutationVariables>;
export const CreateImmunizationDocument = gql`
    mutation CreateImmunization($immunizationDateDay: Int, $immunizationDateMonth: Month, $immunizationDateYear: Int, $immunizationDateRelativePeriodStart: Int, $immunizationDateRelativePeriodEnd: Int, $vaccineProductAdministered: VaccineFindOrCreateInput) {
  immunizationCreate(
    input: {immunizationDateDay: $immunizationDateDay, immunizationDateMonth: $immunizationDateMonth, immunizationDateYear: $immunizationDateYear, immunizationDateRelativePeriodStart: $immunizationDateRelativePeriodStart, immunizationDateRelativePeriodEnd: $immunizationDateRelativePeriodEnd, vaccineProductAdministered: $vaccineProductAdministered}
  ) {
    result {
      id
    }
  }
}
    `;
export type CreateImmunizationMutationFn = Apollo.MutationFunction<CreateImmunizationMutation, CreateImmunizationMutationVariables>;

/**
 * __useCreateImmunizationMutation__
 *
 * To run a mutation, you first call `useCreateImmunizationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateImmunizationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createImmunizationMutation, { data, loading, error }] = useCreateImmunizationMutation({
 *   variables: {
 *      immunizationDateDay: // value for 'immunizationDateDay'
 *      immunizationDateMonth: // value for 'immunizationDateMonth'
 *      immunizationDateYear: // value for 'immunizationDateYear'
 *      immunizationDateRelativePeriodStart: // value for 'immunizationDateRelativePeriodStart'
 *      immunizationDateRelativePeriodEnd: // value for 'immunizationDateRelativePeriodEnd'
 *      vaccineProductAdministered: // value for 'vaccineProductAdministered'
 *   },
 * });
 */
export function useCreateImmunizationMutation(baseOptions?: Apollo.MutationHookOptions<CreateImmunizationMutation, CreateImmunizationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateImmunizationMutation, CreateImmunizationMutationVariables>(CreateImmunizationDocument, options);
      }
export type CreateImmunizationMutationHookResult = ReturnType<typeof useCreateImmunizationMutation>;
export type CreateImmunizationMutationResult = Apollo.MutationResult<CreateImmunizationMutation>;
export type CreateImmunizationMutationOptions = Apollo.BaseMutationOptions<CreateImmunizationMutation, CreateImmunizationMutationVariables>;
export const UpdateImmunizationDocument = gql`
    mutation UpdateImmunization($id: UUID!, $immunizationDateDay: Int, $immunizationDateMonth: Month, $immunizationDateYear: Int, $immunizationDateRelativePeriodStart: Int, $immunizationDateRelativePeriodEnd: Int, $vaccineProductAdministered: VaccineFindOrCreateInput) {
  immunizationUpdate(
    input: {id: $id, immunizationDateDay: $immunizationDateDay, immunizationDateMonth: $immunizationDateMonth, immunizationDateYear: $immunizationDateYear, immunizationDateRelativePeriodStart: $immunizationDateRelativePeriodStart, immunizationDateRelativePeriodEnd: $immunizationDateRelativePeriodEnd, vaccineProductAdministered: $vaccineProductAdministered}
  ) {
    result {
      recordStatus
      id
      immunizationDateDay
      immunizationDateMonth
      immunizationDateYear
      immunizationDateRelativePeriodStart
      immunizationDateRelativePeriodEnd
      vaccineProductAdministered {
        id
        name
      }
    }
  }
}
    `;
export type UpdateImmunizationMutationFn = Apollo.MutationFunction<UpdateImmunizationMutation, UpdateImmunizationMutationVariables>;

/**
 * __useUpdateImmunizationMutation__
 *
 * To run a mutation, you first call `useUpdateImmunizationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateImmunizationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateImmunizationMutation, { data, loading, error }] = useUpdateImmunizationMutation({
 *   variables: {
 *      id: // value for 'id'
 *      immunizationDateDay: // value for 'immunizationDateDay'
 *      immunizationDateMonth: // value for 'immunizationDateMonth'
 *      immunizationDateYear: // value for 'immunizationDateYear'
 *      immunizationDateRelativePeriodStart: // value for 'immunizationDateRelativePeriodStart'
 *      immunizationDateRelativePeriodEnd: // value for 'immunizationDateRelativePeriodEnd'
 *      vaccineProductAdministered: // value for 'vaccineProductAdministered'
 *   },
 * });
 */
export function useUpdateImmunizationMutation(baseOptions?: Apollo.MutationHookOptions<UpdateImmunizationMutation, UpdateImmunizationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateImmunizationMutation, UpdateImmunizationMutationVariables>(UpdateImmunizationDocument, options);
      }
export type UpdateImmunizationMutationHookResult = ReturnType<typeof useUpdateImmunizationMutation>;
export type UpdateImmunizationMutationResult = Apollo.MutationResult<UpdateImmunizationMutation>;
export type UpdateImmunizationMutationOptions = Apollo.BaseMutationOptions<UpdateImmunizationMutation, UpdateImmunizationMutationVariables>;
export const RemoveImmunizationDocument = gql`
    mutation RemoveImmunization($id: UUID!) {
  immunizationDelete(input: {id: $id}) {
    result {
      id
    }
  }
}
    `;
export type RemoveImmunizationMutationFn = Apollo.MutationFunction<RemoveImmunizationMutation, RemoveImmunizationMutationVariables>;

/**
 * __useRemoveImmunizationMutation__
 *
 * To run a mutation, you first call `useRemoveImmunizationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveImmunizationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeImmunizationMutation, { data, loading, error }] = useRemoveImmunizationMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRemoveImmunizationMutation(baseOptions?: Apollo.MutationHookOptions<RemoveImmunizationMutation, RemoveImmunizationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveImmunizationMutation, RemoveImmunizationMutationVariables>(RemoveImmunizationDocument, options);
      }
export type RemoveImmunizationMutationHookResult = ReturnType<typeof useRemoveImmunizationMutation>;
export type RemoveImmunizationMutationResult = Apollo.MutationResult<RemoveImmunizationMutation>;
export type RemoveImmunizationMutationOptions = Apollo.BaseMutationOptions<RemoveImmunizationMutation, RemoveImmunizationMutationVariables>;
export const AgreeToTermsOfServiceDocument = gql`
    mutation AgreeToTermsOfService($careGiverId: UUID!, $agreesHasConsentToManageLoveOnesHealth: Boolean!, $agreesToTermsAndPrivacy: Boolean!, $understandsIntendedAppUse: Boolean!, $understandsMicrosoftUseOfTheirData: Boolean!, $understandsNotPermittedToUsePlatformForMinors: Boolean!, $agreesToOpenAiUse: Boolean!) {
  careGiverConsentUpdate(
    input: {careGiverId: $careGiverId, agreesHasConsentToManageLoveOnesHealth: $agreesHasConsentToManageLoveOnesHealth, agreesToTermsAndPrivacy: $agreesToTermsAndPrivacy, understandsIntendedAppUse: $understandsIntendedAppUse, understandsMicrosoftUseOfTheirData: $understandsMicrosoftUseOfTheirData, understandsNotPermittedToUsePlatformForMinors: $understandsNotPermittedToUsePlatformForMinors, agreesToOpenAiUse: $agreesToOpenAiUse}
  ) {
    result {
      agreesToTermsAndPrivacy
      agreesHasConsentToManageLoveOnesHealth
      understandsIntendedAppUse
      understandsMicrosoftUseOfTheirData
      understandsNotPermittedToUsePlatformForMinors
      agreesToOpenAiUse
      id
    }
  }
}
    `;
export type AgreeToTermsOfServiceMutationFn = Apollo.MutationFunction<AgreeToTermsOfServiceMutation, AgreeToTermsOfServiceMutationVariables>;

/**
 * __useAgreeToTermsOfServiceMutation__
 *
 * To run a mutation, you first call `useAgreeToTermsOfServiceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAgreeToTermsOfServiceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [agreeToTermsOfServiceMutation, { data, loading, error }] = useAgreeToTermsOfServiceMutation({
 *   variables: {
 *      careGiverId: // value for 'careGiverId'
 *      agreesHasConsentToManageLoveOnesHealth: // value for 'agreesHasConsentToManageLoveOnesHealth'
 *      agreesToTermsAndPrivacy: // value for 'agreesToTermsAndPrivacy'
 *      understandsIntendedAppUse: // value for 'understandsIntendedAppUse'
 *      understandsMicrosoftUseOfTheirData: // value for 'understandsMicrosoftUseOfTheirData'
 *      understandsNotPermittedToUsePlatformForMinors: // value for 'understandsNotPermittedToUsePlatformForMinors'
 *      agreesToOpenAiUse: // value for 'agreesToOpenAiUse'
 *   },
 * });
 */
export function useAgreeToTermsOfServiceMutation(baseOptions?: Apollo.MutationHookOptions<AgreeToTermsOfServiceMutation, AgreeToTermsOfServiceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AgreeToTermsOfServiceMutation, AgreeToTermsOfServiceMutationVariables>(AgreeToTermsOfServiceDocument, options);
      }
export type AgreeToTermsOfServiceMutationHookResult = ReturnType<typeof useAgreeToTermsOfServiceMutation>;
export type AgreeToTermsOfServiceMutationResult = Apollo.MutationResult<AgreeToTermsOfServiceMutation>;
export type AgreeToTermsOfServiceMutationOptions = Apollo.BaseMutationOptions<AgreeToTermsOfServiceMutation, AgreeToTermsOfServiceMutationVariables>;
export const CreateAllergyDocument = gql`
    mutation CreateAllergy($input: AllergyCreateInput!) {
  allergyCreate(input: $input) {
    result {
      id
    }
  }
}
    `;
export type CreateAllergyMutationFn = Apollo.MutationFunction<CreateAllergyMutation, CreateAllergyMutationVariables>;

/**
 * __useCreateAllergyMutation__
 *
 * To run a mutation, you first call `useCreateAllergyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateAllergyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createAllergyMutation, { data, loading, error }] = useCreateAllergyMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateAllergyMutation(baseOptions?: Apollo.MutationHookOptions<CreateAllergyMutation, CreateAllergyMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateAllergyMutation, CreateAllergyMutationVariables>(CreateAllergyDocument, options);
      }
export type CreateAllergyMutationHookResult = ReturnType<typeof useCreateAllergyMutation>;
export type CreateAllergyMutationResult = Apollo.MutationResult<CreateAllergyMutation>;
export type CreateAllergyMutationOptions = Apollo.BaseMutationOptions<CreateAllergyMutation, CreateAllergyMutationVariables>;
export const UpdateAllergyDocument = gql`
    mutation UpdateAllergy($id: UUID!, $severity: AllergySeverity!) {
  allergyUpdate(input: {id: $id, severity: $severity}) {
    result {
      id
    }
  }
}
    `;
export type UpdateAllergyMutationFn = Apollo.MutationFunction<UpdateAllergyMutation, UpdateAllergyMutationVariables>;

/**
 * __useUpdateAllergyMutation__
 *
 * To run a mutation, you first call `useUpdateAllergyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateAllergyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateAllergyMutation, { data, loading, error }] = useUpdateAllergyMutation({
 *   variables: {
 *      id: // value for 'id'
 *      severity: // value for 'severity'
 *   },
 * });
 */
export function useUpdateAllergyMutation(baseOptions?: Apollo.MutationHookOptions<UpdateAllergyMutation, UpdateAllergyMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateAllergyMutation, UpdateAllergyMutationVariables>(UpdateAllergyDocument, options);
      }
export type UpdateAllergyMutationHookResult = ReturnType<typeof useUpdateAllergyMutation>;
export type UpdateAllergyMutationResult = Apollo.MutationResult<UpdateAllergyMutation>;
export type UpdateAllergyMutationOptions = Apollo.BaseMutationOptions<UpdateAllergyMutation, UpdateAllergyMutationVariables>;
export const RemoveAllergyDocument = gql`
    mutation RemoveAllergy($id: UUID!) {
  allergyDelete(input: {id: $id}) {
    result {
      id
    }
  }
}
    `;
export type RemoveAllergyMutationFn = Apollo.MutationFunction<RemoveAllergyMutation, RemoveAllergyMutationVariables>;

/**
 * __useRemoveAllergyMutation__
 *
 * To run a mutation, you first call `useRemoveAllergyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveAllergyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeAllergyMutation, { data, loading, error }] = useRemoveAllergyMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRemoveAllergyMutation(baseOptions?: Apollo.MutationHookOptions<RemoveAllergyMutation, RemoveAllergyMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveAllergyMutation, RemoveAllergyMutationVariables>(RemoveAllergyDocument, options);
      }
export type RemoveAllergyMutationHookResult = ReturnType<typeof useRemoveAllergyMutation>;
export type RemoveAllergyMutationResult = Apollo.MutationResult<RemoveAllergyMutation>;
export type RemoveAllergyMutationOptions = Apollo.BaseMutationOptions<RemoveAllergyMutation, RemoveAllergyMutationVariables>;
export const CreateActivityDocument = gql`
    mutation CreateActivity($title: String, $details: String, $phoneNumber: String, $type: ExperienceType, $availability: String!, $address: LocationCreateInput) {
  experienceCreate(
    input: {title: $title, details: $details, phoneNumber: $phoneNumber, type: $type, availability: $availability, address: $address}
  ) {
    result {
      id
      title
      details
      phoneNumber
      type
      availability
      address {
        id
        addressLine1
        addressLine2
        city
        state
        zipCode
      }
    }
  }
}
    `;
export type CreateActivityMutationFn = Apollo.MutationFunction<CreateActivityMutation, CreateActivityMutationVariables>;

/**
 * __useCreateActivityMutation__
 *
 * To run a mutation, you first call `useCreateActivityMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateActivityMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createActivityMutation, { data, loading, error }] = useCreateActivityMutation({
 *   variables: {
 *      title: // value for 'title'
 *      details: // value for 'details'
 *      phoneNumber: // value for 'phoneNumber'
 *      type: // value for 'type'
 *      availability: // value for 'availability'
 *      address: // value for 'address'
 *   },
 * });
 */
export function useCreateActivityMutation(baseOptions?: Apollo.MutationHookOptions<CreateActivityMutation, CreateActivityMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateActivityMutation, CreateActivityMutationVariables>(CreateActivityDocument, options);
      }
export type CreateActivityMutationHookResult = ReturnType<typeof useCreateActivityMutation>;
export type CreateActivityMutationResult = Apollo.MutationResult<CreateActivityMutation>;
export type CreateActivityMutationOptions = Apollo.BaseMutationOptions<CreateActivityMutation, CreateActivityMutationVariables>;
export const UpdateActivityDocument = gql`
    mutation UpdateActivity($id: UUID!, $title: String, $details: String, $phoneNumber: String, $type: ExperienceType, $availability: String!, $address: LocationCreateInput) {
  experienceUpdate(
    input: {id: $id, title: $title, details: $details, phoneNumber: $phoneNumber, type: $type, availability: $availability, address: $address}
  ) {
    result {
      id
      title
      details
      phoneNumber
      type
      availability
      address {
        id
        addressLine1
        addressLine2
        city
        state
        zipCode
      }
    }
  }
}
    `;
export type UpdateActivityMutationFn = Apollo.MutationFunction<UpdateActivityMutation, UpdateActivityMutationVariables>;

/**
 * __useUpdateActivityMutation__
 *
 * To run a mutation, you first call `useUpdateActivityMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateActivityMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateActivityMutation, { data, loading, error }] = useUpdateActivityMutation({
 *   variables: {
 *      id: // value for 'id'
 *      title: // value for 'title'
 *      details: // value for 'details'
 *      phoneNumber: // value for 'phoneNumber'
 *      type: // value for 'type'
 *      availability: // value for 'availability'
 *      address: // value for 'address'
 *   },
 * });
 */
export function useUpdateActivityMutation(baseOptions?: Apollo.MutationHookOptions<UpdateActivityMutation, UpdateActivityMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateActivityMutation, UpdateActivityMutationVariables>(UpdateActivityDocument, options);
      }
export type UpdateActivityMutationHookResult = ReturnType<typeof useUpdateActivityMutation>;
export type UpdateActivityMutationResult = Apollo.MutationResult<UpdateActivityMutation>;
export type UpdateActivityMutationOptions = Apollo.BaseMutationOptions<UpdateActivityMutation, UpdateActivityMutationVariables>;
export const RemoveActivityDocument = gql`
    mutation RemoveActivity($id: UUID!) {
  experienceDelete(input: {id: $id}) {
    result {
      succeeded
    }
  }
}
    `;
export type RemoveActivityMutationFn = Apollo.MutationFunction<RemoveActivityMutation, RemoveActivityMutationVariables>;

/**
 * __useRemoveActivityMutation__
 *
 * To run a mutation, you first call `useRemoveActivityMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveActivityMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeActivityMutation, { data, loading, error }] = useRemoveActivityMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRemoveActivityMutation(baseOptions?: Apollo.MutationHookOptions<RemoveActivityMutation, RemoveActivityMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveActivityMutation, RemoveActivityMutationVariables>(RemoveActivityDocument, options);
      }
export type RemoveActivityMutationHookResult = ReturnType<typeof useRemoveActivityMutation>;
export type RemoveActivityMutationResult = Apollo.MutationResult<RemoveActivityMutation>;
export type RemoveActivityMutationOptions = Apollo.BaseMutationOptions<RemoveActivityMutation, RemoveActivityMutationVariables>;
export const CreateActivityOccurrenceDocument = gql`
    mutation CreateActivityOccurrence($careGiverId: UUID!, $experience: ExperienceInput) {
  experienceOccurrenceCreate(
    input: {careGiverId: $careGiverId, experience: $experience}
  ) {
    result {
      id
      careCircleMembership {
        id
      }
      experience {
        id
      }
    }
  }
}
    `;
export type CreateActivityOccurrenceMutationFn = Apollo.MutationFunction<CreateActivityOccurrenceMutation, CreateActivityOccurrenceMutationVariables>;

/**
 * __useCreateActivityOccurrenceMutation__
 *
 * To run a mutation, you first call `useCreateActivityOccurrenceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateActivityOccurrenceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createActivityOccurrenceMutation, { data, loading, error }] = useCreateActivityOccurrenceMutation({
 *   variables: {
 *      careGiverId: // value for 'careGiverId'
 *      experience: // value for 'experience'
 *   },
 * });
 */
export function useCreateActivityOccurrenceMutation(baseOptions?: Apollo.MutationHookOptions<CreateActivityOccurrenceMutation, CreateActivityOccurrenceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateActivityOccurrenceMutation, CreateActivityOccurrenceMutationVariables>(CreateActivityOccurrenceDocument, options);
      }
export type CreateActivityOccurrenceMutationHookResult = ReturnType<typeof useCreateActivityOccurrenceMutation>;
export type CreateActivityOccurrenceMutationResult = Apollo.MutationResult<CreateActivityOccurrenceMutation>;
export type CreateActivityOccurrenceMutationOptions = Apollo.BaseMutationOptions<CreateActivityOccurrenceMutation, CreateActivityOccurrenceMutationVariables>;
export const RemoveActivityOccurrenceDocument = gql`
    mutation RemoveActivityOccurrence($id: UUID!) {
  experienceOccurrenceDelete(input: {id: $id}) {
    result {
      succeeded
    }
  }
}
    `;
export type RemoveActivityOccurrenceMutationFn = Apollo.MutationFunction<RemoveActivityOccurrenceMutation, RemoveActivityOccurrenceMutationVariables>;

/**
 * __useRemoveActivityOccurrenceMutation__
 *
 * To run a mutation, you first call `useRemoveActivityOccurrenceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveActivityOccurrenceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeActivityOccurrenceMutation, { data, loading, error }] = useRemoveActivityOccurrenceMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRemoveActivityOccurrenceMutation(baseOptions?: Apollo.MutationHookOptions<RemoveActivityOccurrenceMutation, RemoveActivityOccurrenceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveActivityOccurrenceMutation, RemoveActivityOccurrenceMutationVariables>(RemoveActivityOccurrenceDocument, options);
      }
export type RemoveActivityOccurrenceMutationHookResult = ReturnType<typeof useRemoveActivityOccurrenceMutation>;
export type RemoveActivityOccurrenceMutationResult = Apollo.MutationResult<RemoveActivityOccurrenceMutation>;
export type RemoveActivityOccurrenceMutationOptions = Apollo.BaseMutationOptions<RemoveActivityOccurrenceMutation, RemoveActivityOccurrenceMutationVariables>;
export const UploadCarePlanDocumentDocument = gql`
    mutation UploadCarePlanDocument($input: CarePlanDocumentUploadInput!) {
  carePlanDocumentUpload(input: $input) {
    file {
      id
      extension
    }
  }
}
    `;
export type UploadCarePlanDocumentMutationFn = Apollo.MutationFunction<UploadCarePlanDocumentMutation, UploadCarePlanDocumentMutationVariables>;

/**
 * __useUploadCarePlanDocumentMutation__
 *
 * To run a mutation, you first call `useUploadCarePlanDocumentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUploadCarePlanDocumentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [uploadCarePlanDocumentMutation, { data, loading, error }] = useUploadCarePlanDocumentMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUploadCarePlanDocumentMutation(baseOptions?: Apollo.MutationHookOptions<UploadCarePlanDocumentMutation, UploadCarePlanDocumentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UploadCarePlanDocumentMutation, UploadCarePlanDocumentMutationVariables>(UploadCarePlanDocumentDocument, options);
      }
export type UploadCarePlanDocumentMutationHookResult = ReturnType<typeof useUploadCarePlanDocumentMutation>;
export type UploadCarePlanDocumentMutationResult = Apollo.MutationResult<UploadCarePlanDocumentMutation>;
export type UploadCarePlanDocumentMutationOptions = Apollo.BaseMutationOptions<UploadCarePlanDocumentMutation, UploadCarePlanDocumentMutationVariables>;
export const RenameCarePlanDocumentDocument = gql`
    mutation RenameCarePlanDocument($input: CarePlanDocumentRenameInput!) {
  carePlanDocumentRename(input: $input) {
    file {
      id
      name
    }
  }
}
    `;
export type RenameCarePlanDocumentMutationFn = Apollo.MutationFunction<RenameCarePlanDocumentMutation, RenameCarePlanDocumentMutationVariables>;

/**
 * __useRenameCarePlanDocumentMutation__
 *
 * To run a mutation, you first call `useRenameCarePlanDocumentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRenameCarePlanDocumentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [renameCarePlanDocumentMutation, { data, loading, error }] = useRenameCarePlanDocumentMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRenameCarePlanDocumentMutation(baseOptions?: Apollo.MutationHookOptions<RenameCarePlanDocumentMutation, RenameCarePlanDocumentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RenameCarePlanDocumentMutation, RenameCarePlanDocumentMutationVariables>(RenameCarePlanDocumentDocument, options);
      }
export type RenameCarePlanDocumentMutationHookResult = ReturnType<typeof useRenameCarePlanDocumentMutation>;
export type RenameCarePlanDocumentMutationResult = Apollo.MutationResult<RenameCarePlanDocumentMutation>;
export type RenameCarePlanDocumentMutationOptions = Apollo.BaseMutationOptions<RenameCarePlanDocumentMutation, RenameCarePlanDocumentMutationVariables>;
export const DeleteCarePlanDocumentDocument = gql`
    mutation DeleteCarePlanDocument($input: CarePlanDocumentDeleteInput!) {
  carePlanDocumentDelete(input: $input) {
    result
  }
}
    `;
export type DeleteCarePlanDocumentMutationFn = Apollo.MutationFunction<DeleteCarePlanDocumentMutation, DeleteCarePlanDocumentMutationVariables>;

/**
 * __useDeleteCarePlanDocumentMutation__
 *
 * To run a mutation, you first call `useDeleteCarePlanDocumentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCarePlanDocumentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCarePlanDocumentMutation, { data, loading, error }] = useDeleteCarePlanDocumentMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDeleteCarePlanDocumentMutation(baseOptions?: Apollo.MutationHookOptions<DeleteCarePlanDocumentMutation, DeleteCarePlanDocumentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteCarePlanDocumentMutation, DeleteCarePlanDocumentMutationVariables>(DeleteCarePlanDocumentDocument, options);
      }
export type DeleteCarePlanDocumentMutationHookResult = ReturnType<typeof useDeleteCarePlanDocumentMutation>;
export type DeleteCarePlanDocumentMutationResult = Apollo.MutationResult<DeleteCarePlanDocumentMutation>;
export type DeleteCarePlanDocumentMutationOptions = Apollo.BaseMutationOptions<DeleteCarePlanDocumentMutation, DeleteCarePlanDocumentMutationVariables>;
export const CreateDocumentEmbeddingsDocument = gql`
    mutation CreateDocumentEmbeddings($input: DocumentEmbedInput!) {
  documentEmbed(input: $input) {
    result {
      id
      name
      embeddings {
        id
        text
        textEmbedding
      }
    }
  }
}
    `;
export type CreateDocumentEmbeddingsMutationFn = Apollo.MutationFunction<CreateDocumentEmbeddingsMutation, CreateDocumentEmbeddingsMutationVariables>;

/**
 * __useCreateDocumentEmbeddingsMutation__
 *
 * To run a mutation, you first call `useCreateDocumentEmbeddingsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateDocumentEmbeddingsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createDocumentEmbeddingsMutation, { data, loading, error }] = useCreateDocumentEmbeddingsMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateDocumentEmbeddingsMutation(baseOptions?: Apollo.MutationHookOptions<CreateDocumentEmbeddingsMutation, CreateDocumentEmbeddingsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateDocumentEmbeddingsMutation, CreateDocumentEmbeddingsMutationVariables>(CreateDocumentEmbeddingsDocument, options);
      }
export type CreateDocumentEmbeddingsMutationHookResult = ReturnType<typeof useCreateDocumentEmbeddingsMutation>;
export type CreateDocumentEmbeddingsMutationResult = Apollo.MutationResult<CreateDocumentEmbeddingsMutation>;
export type CreateDocumentEmbeddingsMutationOptions = Apollo.BaseMutationOptions<CreateDocumentEmbeddingsMutation, CreateDocumentEmbeddingsMutationVariables>;
export const SetUserHasOnboardedDocument = gql`
    mutation SetUserHasOnboarded {
  careGiverUpdateOnboardingStatus(input: {onboardingComplete: true}) {
    result {
      id
      onboardingComplete
    }
  }
}
    `;
export type SetUserHasOnboardedMutationFn = Apollo.MutationFunction<SetUserHasOnboardedMutation, SetUserHasOnboardedMutationVariables>;

/**
 * __useSetUserHasOnboardedMutation__
 *
 * To run a mutation, you first call `useSetUserHasOnboardedMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetUserHasOnboardedMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setUserHasOnboardedMutation, { data, loading, error }] = useSetUserHasOnboardedMutation({
 *   variables: {
 *   },
 * });
 */
export function useSetUserHasOnboardedMutation(baseOptions?: Apollo.MutationHookOptions<SetUserHasOnboardedMutation, SetUserHasOnboardedMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SetUserHasOnboardedMutation, SetUserHasOnboardedMutationVariables>(SetUserHasOnboardedDocument, options);
      }
export type SetUserHasOnboardedMutationHookResult = ReturnType<typeof useSetUserHasOnboardedMutation>;
export type SetUserHasOnboardedMutationResult = Apollo.MutationResult<SetUserHasOnboardedMutation>;
export type SetUserHasOnboardedMutationOptions = Apollo.BaseMutationOptions<SetUserHasOnboardedMutation, SetUserHasOnboardedMutationVariables>;
export const CreateAppointmentDocument = gql`
    mutation CreateAppointment($input: AppointmentCreateInput!) {
  appointmentCreate(input: $input) {
    result {
      recordStatus
      description
      endDateTime
      id
      location {
        addressLine1
        city
        id
        freeTextAddress
        state
        zipCode
      }
      startDateTime
      recurrence
    }
  }
}
    `;
export type CreateAppointmentMutationFn = Apollo.MutationFunction<CreateAppointmentMutation, CreateAppointmentMutationVariables>;

/**
 * __useCreateAppointmentMutation__
 *
 * To run a mutation, you first call `useCreateAppointmentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateAppointmentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createAppointmentMutation, { data, loading, error }] = useCreateAppointmentMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateAppointmentMutation(baseOptions?: Apollo.MutationHookOptions<CreateAppointmentMutation, CreateAppointmentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateAppointmentMutation, CreateAppointmentMutationVariables>(CreateAppointmentDocument, options);
      }
export type CreateAppointmentMutationHookResult = ReturnType<typeof useCreateAppointmentMutation>;
export type CreateAppointmentMutationResult = Apollo.MutationResult<CreateAppointmentMutation>;
export type CreateAppointmentMutationOptions = Apollo.BaseMutationOptions<CreateAppointmentMutation, CreateAppointmentMutationVariables>;
export const AppointmentDeleteDocument = gql`
    mutation AppointmentDelete($input: AppointmentDeleteInput!) {
  appointmentDelete(input: $input) {
    result {
      recordStatus
      id
      location {
        addressLine1
        city
        state
        zipCode
        id
      }
      description
      startDateTime
      endDateTime
    }
  }
}
    `;
export type AppointmentDeleteMutationFn = Apollo.MutationFunction<AppointmentDeleteMutation, AppointmentDeleteMutationVariables>;

/**
 * __useAppointmentDeleteMutation__
 *
 * To run a mutation, you first call `useAppointmentDeleteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAppointmentDeleteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [appointmentDeleteMutation, { data, loading, error }] = useAppointmentDeleteMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAppointmentDeleteMutation(baseOptions?: Apollo.MutationHookOptions<AppointmentDeleteMutation, AppointmentDeleteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AppointmentDeleteMutation, AppointmentDeleteMutationVariables>(AppointmentDeleteDocument, options);
      }
export type AppointmentDeleteMutationHookResult = ReturnType<typeof useAppointmentDeleteMutation>;
export type AppointmentDeleteMutationResult = Apollo.MutationResult<AppointmentDeleteMutation>;
export type AppointmentDeleteMutationOptions = Apollo.BaseMutationOptions<AppointmentDeleteMutation, AppointmentDeleteMutationVariables>;
export const AppointmentUpdateDocument = gql`
    mutation AppointmentUpdate($input: AppointmentUpdateInput!) {
  appointmentUpdate(input: $input) {
    result {
      recordStatus
      id
      location {
        addressLine1
        city
        state
        zipCode
        id
      }
      description
      startDateTime
      endDateTime
    }
  }
}
    `;
export type AppointmentUpdateMutationFn = Apollo.MutationFunction<AppointmentUpdateMutation, AppointmentUpdateMutationVariables>;

/**
 * __useAppointmentUpdateMutation__
 *
 * To run a mutation, you first call `useAppointmentUpdateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAppointmentUpdateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [appointmentUpdateMutation, { data, loading, error }] = useAppointmentUpdateMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAppointmentUpdateMutation(baseOptions?: Apollo.MutationHookOptions<AppointmentUpdateMutation, AppointmentUpdateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AppointmentUpdateMutation, AppointmentUpdateMutationVariables>(AppointmentUpdateDocument, options);
      }
export type AppointmentUpdateMutationHookResult = ReturnType<typeof useAppointmentUpdateMutation>;
export type AppointmentUpdateMutationResult = Apollo.MutationResult<AppointmentUpdateMutation>;
export type AppointmentUpdateMutationOptions = Apollo.BaseMutationOptions<AppointmentUpdateMutation, AppointmentUpdateMutationVariables>;
export const CarePlanCreateDocument = gql`
    mutation CarePlanCreate($input: CarePlanCreateInput!) {
  carePlanCreate(input: $input) {
    result {
      id
      activities {
        recordStatus
        description
        recurrence
        id
        endDateTime
        startDateTime
      }
    }
  }
}
    `;
export type CarePlanCreateMutationFn = Apollo.MutationFunction<CarePlanCreateMutation, CarePlanCreateMutationVariables>;

/**
 * __useCarePlanCreateMutation__
 *
 * To run a mutation, you first call `useCarePlanCreateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCarePlanCreateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [carePlanCreateMutation, { data, loading, error }] = useCarePlanCreateMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCarePlanCreateMutation(baseOptions?: Apollo.MutationHookOptions<CarePlanCreateMutation, CarePlanCreateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CarePlanCreateMutation, CarePlanCreateMutationVariables>(CarePlanCreateDocument, options);
      }
export type CarePlanCreateMutationHookResult = ReturnType<typeof useCarePlanCreateMutation>;
export type CarePlanCreateMutationResult = Apollo.MutationResult<CarePlanCreateMutation>;
export type CarePlanCreateMutationOptions = Apollo.BaseMutationOptions<CarePlanCreateMutation, CarePlanCreateMutationVariables>;
export const ActivityDeleteDocument = gql`
    mutation ActivityDelete($input: ActivityDeleteInput!) {
  activityDelete(input: $input) {
    result {
      recordStatus
      description
      recurrence
      id
      endDateTime
      startDateTime
    }
  }
}
    `;
export type ActivityDeleteMutationFn = Apollo.MutationFunction<ActivityDeleteMutation, ActivityDeleteMutationVariables>;

/**
 * __useActivityDeleteMutation__
 *
 * To run a mutation, you first call `useActivityDeleteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useActivityDeleteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [activityDeleteMutation, { data, loading, error }] = useActivityDeleteMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useActivityDeleteMutation(baseOptions?: Apollo.MutationHookOptions<ActivityDeleteMutation, ActivityDeleteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ActivityDeleteMutation, ActivityDeleteMutationVariables>(ActivityDeleteDocument, options);
      }
export type ActivityDeleteMutationHookResult = ReturnType<typeof useActivityDeleteMutation>;
export type ActivityDeleteMutationResult = Apollo.MutationResult<ActivityDeleteMutation>;
export type ActivityDeleteMutationOptions = Apollo.BaseMutationOptions<ActivityDeleteMutation, ActivityDeleteMutationVariables>;
export const AnnotationCreateDocument = gql`
    mutation AnnotationCreate($input: AnnotationCreateInput!) {
  annotationCreate(input: $input) {
    result {
      id
      type
    }
  }
}
    `;
export type AnnotationCreateMutationFn = Apollo.MutationFunction<AnnotationCreateMutation, AnnotationCreateMutationVariables>;

/**
 * __useAnnotationCreateMutation__
 *
 * To run a mutation, you first call `useAnnotationCreateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAnnotationCreateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [annotationCreateMutation, { data, loading, error }] = useAnnotationCreateMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAnnotationCreateMutation(baseOptions?: Apollo.MutationHookOptions<AnnotationCreateMutation, AnnotationCreateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AnnotationCreateMutation, AnnotationCreateMutationVariables>(AnnotationCreateDocument, options);
      }
export type AnnotationCreateMutationHookResult = ReturnType<typeof useAnnotationCreateMutation>;
export type AnnotationCreateMutationResult = Apollo.MutationResult<AnnotationCreateMutation>;
export type AnnotationCreateMutationOptions = Apollo.BaseMutationOptions<AnnotationCreateMutation, AnnotationCreateMutationVariables>;
export const AnnotationDeleteDocument = gql`
    mutation AnnotationDelete($input: AnnotationDeleteInput!) {
  annotationDelete(input: $input) {
    result {
      id
    }
  }
}
    `;
export type AnnotationDeleteMutationFn = Apollo.MutationFunction<AnnotationDeleteMutation, AnnotationDeleteMutationVariables>;

/**
 * __useAnnotationDeleteMutation__
 *
 * To run a mutation, you first call `useAnnotationDeleteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAnnotationDeleteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [annotationDeleteMutation, { data, loading, error }] = useAnnotationDeleteMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAnnotationDeleteMutation(baseOptions?: Apollo.MutationHookOptions<AnnotationDeleteMutation, AnnotationDeleteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AnnotationDeleteMutation, AnnotationDeleteMutationVariables>(AnnotationDeleteDocument, options);
      }
export type AnnotationDeleteMutationHookResult = ReturnType<typeof useAnnotationDeleteMutation>;
export type AnnotationDeleteMutationResult = Apollo.MutationResult<AnnotationDeleteMutation>;
export type AnnotationDeleteMutationOptions = Apollo.BaseMutationOptions<AnnotationDeleteMutation, AnnotationDeleteMutationVariables>;
export const ConditionOccurenceSetHistoricalDocument = gql`
    mutation ConditionOccurenceSetHistorical($id: UUID!) {
  conditionOccurrenceSetHistorical(input: {id: $id}) {
    result {
      id
      current
    }
  }
}
    `;
export type ConditionOccurenceSetHistoricalMutationFn = Apollo.MutationFunction<ConditionOccurenceSetHistoricalMutation, ConditionOccurenceSetHistoricalMutationVariables>;

/**
 * __useConditionOccurenceSetHistoricalMutation__
 *
 * To run a mutation, you first call `useConditionOccurenceSetHistoricalMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useConditionOccurenceSetHistoricalMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [conditionOccurenceSetHistoricalMutation, { data, loading, error }] = useConditionOccurenceSetHistoricalMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useConditionOccurenceSetHistoricalMutation(baseOptions?: Apollo.MutationHookOptions<ConditionOccurenceSetHistoricalMutation, ConditionOccurenceSetHistoricalMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ConditionOccurenceSetHistoricalMutation, ConditionOccurenceSetHistoricalMutationVariables>(ConditionOccurenceSetHistoricalDocument, options);
      }
export type ConditionOccurenceSetHistoricalMutationHookResult = ReturnType<typeof useConditionOccurenceSetHistoricalMutation>;
export type ConditionOccurenceSetHistoricalMutationResult = Apollo.MutationResult<ConditionOccurenceSetHistoricalMutation>;
export type ConditionOccurenceSetHistoricalMutationOptions = Apollo.BaseMutationOptions<ConditionOccurenceSetHistoricalMutation, ConditionOccurenceSetHistoricalMutationVariables>;
export const ConditionOccurenceSetCurrentDocument = gql`
    mutation ConditionOccurenceSetCurrent($id: UUID!) {
  conditionOccurrenceSetCurrent(input: {id: $id}) {
    result {
      id
      current
    }
  }
}
    `;
export type ConditionOccurenceSetCurrentMutationFn = Apollo.MutationFunction<ConditionOccurenceSetCurrentMutation, ConditionOccurenceSetCurrentMutationVariables>;

/**
 * __useConditionOccurenceSetCurrentMutation__
 *
 * To run a mutation, you first call `useConditionOccurenceSetCurrentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useConditionOccurenceSetCurrentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [conditionOccurenceSetCurrentMutation, { data, loading, error }] = useConditionOccurenceSetCurrentMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useConditionOccurenceSetCurrentMutation(baseOptions?: Apollo.MutationHookOptions<ConditionOccurenceSetCurrentMutation, ConditionOccurenceSetCurrentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ConditionOccurenceSetCurrentMutation, ConditionOccurenceSetCurrentMutationVariables>(ConditionOccurenceSetCurrentDocument, options);
      }
export type ConditionOccurenceSetCurrentMutationHookResult = ReturnType<typeof useConditionOccurenceSetCurrentMutation>;
export type ConditionOccurenceSetCurrentMutationResult = Apollo.MutationResult<ConditionOccurenceSetCurrentMutation>;
export type ConditionOccurenceSetCurrentMutationOptions = Apollo.BaseMutationOptions<ConditionOccurenceSetCurrentMutation, ConditionOccurenceSetCurrentMutationVariables>;
export const GetUserInfoDocument = gql`
    query GetUserInfo {
  me {
    id
    careCircleName
    role
    careCircleId
    imageBase64
    displayName
    firstName
    agreesHasConsentToManageLoveOnesHealth
    agreesToTermsAndPrivacy
    understandsIntendedAppUse
    understandsMicrosoftUseOfTheirData
    understandsNotPermittedToUsePlatformForMinors
    agreesToOpenAiUse
  }
}
    `;

/**
 * __useGetUserInfoQuery__
 *
 * To run a query within a React component, call `useGetUserInfoQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserInfoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserInfoQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUserInfoQuery(baseOptions?: Apollo.QueryHookOptions<GetUserInfoQuery, GetUserInfoQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserInfoQuery, GetUserInfoQueryVariables>(GetUserInfoDocument, options);
      }
export function useGetUserInfoLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserInfoQuery, GetUserInfoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserInfoQuery, GetUserInfoQueryVariables>(GetUserInfoDocument, options);
        }
export type GetUserInfoQueryHookResult = ReturnType<typeof useGetUserInfoQuery>;
export type GetUserInfoLazyQueryHookResult = ReturnType<typeof useGetUserInfoLazyQuery>;
export type GetUserInfoQueryResult = Apollo.QueryResult<GetUserInfoQuery, GetUserInfoQueryVariables>;
export const GetUserAppProfileInfoDocument = gql`
    query GetUserAppProfileInfo {
  me {
    id
    imageBase64
    displayName
    mobile
    email
    role
  }
}
    `;

/**
 * __useGetUserAppProfileInfoQuery__
 *
 * To run a query within a React component, call `useGetUserAppProfileInfoQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserAppProfileInfoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserAppProfileInfoQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUserAppProfileInfoQuery(baseOptions?: Apollo.QueryHookOptions<GetUserAppProfileInfoQuery, GetUserAppProfileInfoQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserAppProfileInfoQuery, GetUserAppProfileInfoQueryVariables>(GetUserAppProfileInfoDocument, options);
      }
export function useGetUserAppProfileInfoLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserAppProfileInfoQuery, GetUserAppProfileInfoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserAppProfileInfoQuery, GetUserAppProfileInfoQueryVariables>(GetUserAppProfileInfoDocument, options);
        }
export type GetUserAppProfileInfoQueryHookResult = ReturnType<typeof useGetUserAppProfileInfoQuery>;
export type GetUserAppProfileInfoLazyQueryHookResult = ReturnType<typeof useGetUserAppProfileInfoLazyQuery>;
export type GetUserAppProfileInfoQueryResult = Apollo.QueryResult<GetUserAppProfileInfoQuery, GetUserAppProfileInfoQueryVariables>;
export const GetUserTermsOfServiceAgreementsInfoDocument = gql`
    query GetUserTermsOfServiceAgreementsInfo {
  me {
    understandsNotPermittedToUsePlatformForMinors
    agreesHasConsentToManageLoveOnesHealth
    agreesToTermsAndPrivacy
    understandsIntendedAppUse
    understandsMicrosoftUseOfTheirData
    agreesToOpenAiUse
  }
}
    `;

/**
 * __useGetUserTermsOfServiceAgreementsInfoQuery__
 *
 * To run a query within a React component, call `useGetUserTermsOfServiceAgreementsInfoQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserTermsOfServiceAgreementsInfoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserTermsOfServiceAgreementsInfoQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUserTermsOfServiceAgreementsInfoQuery(baseOptions?: Apollo.QueryHookOptions<GetUserTermsOfServiceAgreementsInfoQuery, GetUserTermsOfServiceAgreementsInfoQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserTermsOfServiceAgreementsInfoQuery, GetUserTermsOfServiceAgreementsInfoQueryVariables>(GetUserTermsOfServiceAgreementsInfoDocument, options);
      }
export function useGetUserTermsOfServiceAgreementsInfoLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserTermsOfServiceAgreementsInfoQuery, GetUserTermsOfServiceAgreementsInfoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserTermsOfServiceAgreementsInfoQuery, GetUserTermsOfServiceAgreementsInfoQueryVariables>(GetUserTermsOfServiceAgreementsInfoDocument, options);
        }
export type GetUserTermsOfServiceAgreementsInfoQueryHookResult = ReturnType<typeof useGetUserTermsOfServiceAgreementsInfoQuery>;
export type GetUserTermsOfServiceAgreementsInfoLazyQueryHookResult = ReturnType<typeof useGetUserTermsOfServiceAgreementsInfoLazyQuery>;
export type GetUserTermsOfServiceAgreementsInfoQueryResult = Apollo.QueryResult<GetUserTermsOfServiceAgreementsInfoQuery, GetUserTermsOfServiceAgreementsInfoQueryVariables>;
export const GetMemberDocument = gql`
    query GetMember($id: UUID!) {
  usersCareCircle {
    id
    careCircleMembers(where: {careGiverId: {eq: $id}}) {
      id
      status
      profile {
        id
        role
      }
      careGiver {
        id
        displayName
        email
        imageBase64
        timeZoneGenericName
        timeZoneID
        mobile
      }
      isEmergencyContact
      relationshipToLovedOne
    }
  }
}
    `;

/**
 * __useGetMemberQuery__
 *
 * To run a query within a React component, call `useGetMemberQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMemberQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMemberQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetMemberQuery(baseOptions: Apollo.QueryHookOptions<GetMemberQuery, GetMemberQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMemberQuery, GetMemberQueryVariables>(GetMemberDocument, options);
      }
export function useGetMemberLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMemberQuery, GetMemberQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMemberQuery, GetMemberQueryVariables>(GetMemberDocument, options);
        }
export type GetMemberQueryHookResult = ReturnType<typeof useGetMemberQuery>;
export type GetMemberLazyQueryHookResult = ReturnType<typeof useGetMemberLazyQuery>;
export type GetMemberQueryResult = Apollo.QueryResult<GetMemberQuery, GetMemberQueryVariables>;
export const GetMembersDocument = gql`
    query GetMembers {
  usersCareCircle {
    id
    careCircleMembers {
      id
      status
      profile {
        id
        role
      }
      careGiver {
        id
        displayName
        email
        imageBase64
      }
    }
  }
}
    `;

/**
 * __useGetMembersQuery__
 *
 * To run a query within a React component, call `useGetMembersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMembersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMembersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMembersQuery(baseOptions?: Apollo.QueryHookOptions<GetMembersQuery, GetMembersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMembersQuery, GetMembersQueryVariables>(GetMembersDocument, options);
      }
export function useGetMembersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMembersQuery, GetMembersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMembersQuery, GetMembersQueryVariables>(GetMembersDocument, options);
        }
export type GetMembersQueryHookResult = ReturnType<typeof useGetMembersQuery>;
export type GetMembersLazyQueryHookResult = ReturnType<typeof useGetMembersLazyQuery>;
export type GetMembersQueryResult = Apollo.QueryResult<GetMembersQuery, GetMembersQueryVariables>;
export const GetCareTeamDocument = gql`
    query GetCareTeam {
  usersCareCircle {
    id
    name
    careCircleMembers {
      id
      profile {
        id
        role
      }
      careGiver {
        displayName
        id
        mobile
        email
        imageBase64
      }
      isEmergencyContact
      relationshipToLovedOne
    }
    appInvitations {
      id
      deliveryMethod
      inviteFromName
      inviteRecipientEmail
      status
      careGiverAccepted
      makeAdmin
      makeEmergencyContact
      relationshipToLovedOne
    }
  }
  me {
    id
    careCircleName
    role
    careCircleId
    imageBase64
    displayName
    firstName
  }
}
    `;

/**
 * __useGetCareTeamQuery__
 *
 * To run a query within a React component, call `useGetCareTeamQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCareTeamQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCareTeamQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCareTeamQuery(baseOptions?: Apollo.QueryHookOptions<GetCareTeamQuery, GetCareTeamQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCareTeamQuery, GetCareTeamQueryVariables>(GetCareTeamDocument, options);
      }
export function useGetCareTeamLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCareTeamQuery, GetCareTeamQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCareTeamQuery, GetCareTeamQueryVariables>(GetCareTeamDocument, options);
        }
export type GetCareTeamQueryHookResult = ReturnType<typeof useGetCareTeamQuery>;
export type GetCareTeamLazyQueryHookResult = ReturnType<typeof useGetCareTeamLazyQuery>;
export type GetCareTeamQueryResult = Apollo.QueryResult<GetCareTeamQuery, GetCareTeamQueryVariables>;
export const GetPrescriptionsDocument = gql`
    query GetPrescriptions {
  careRecipientMedicationPrescriptions {
    id
    prescriptions(where: {recordStatus: {eq: ACTIVE}}) {
      id
      recordStatus
      strengthValue
      overTheCounter
      prescribingProvider {
        id
        recordStatus
      }
      takenFor {
        id
        recordStatus
        condition {
          name
          id
        }
        conditionStartDateDay
        conditionStartDateYear
        conditionStartDateMonth
        conditionStartDateRelativePeriodEnd
        conditionStartDateRelativePeriodStart
      }
      medication {
        id
        name
      }
      endDate
      refills {
        refillDate
        recordStatus
        id
        pharmacy {
          id
          name
          phoneNumber
          recordStatus
          location {
            id
            addressLine1
            addressLine2
            city
            singleLineAddress @client
            freeTextAddress
            state
            zipCode
          }
        }
      }
      prescribingProvider {
        id
        firstName
        lastName
        recordStatus
        address {
          id
          singleLineAddress @client
          freeTextAddress
          addressLine1
          addressLine2
          city
          country
          state
          zipCode
        }
        primarySpecialty
        phoneNumber
      }
    }
  }
}
    `;

/**
 * __useGetPrescriptionsQuery__
 *
 * To run a query within a React component, call `useGetPrescriptionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPrescriptionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPrescriptionsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetPrescriptionsQuery(baseOptions?: Apollo.QueryHookOptions<GetPrescriptionsQuery, GetPrescriptionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPrescriptionsQuery, GetPrescriptionsQueryVariables>(GetPrescriptionsDocument, options);
      }
export function useGetPrescriptionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPrescriptionsQuery, GetPrescriptionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPrescriptionsQuery, GetPrescriptionsQueryVariables>(GetPrescriptionsDocument, options);
        }
export type GetPrescriptionsQueryHookResult = ReturnType<typeof useGetPrescriptionsQuery>;
export type GetPrescriptionsLazyQueryHookResult = ReturnType<typeof useGetPrescriptionsLazyQuery>;
export type GetPrescriptionsQueryResult = Apollo.QueryResult<GetPrescriptionsQuery, GetPrescriptionsQueryVariables>;
export const GetPrescriptionsWithScheduleDocument = gql`
    query GetPrescriptionsWithSchedule {
  careRecipientMedicationPrescriptions {
    id
    prescriptions(where: {recordStatus: {eq: ACTIVE}}) {
      id
      recordStatus
      strengthValue
      overTheCounter
      directions
      takenFor {
        id
        recordStatus
        condition {
          name
          id
        }
        conditionStartDateDay
        conditionStartDateYear
        conditionStartDateMonth
        conditionStartDateRelativePeriodEnd
        conditionStartDateRelativePeriodStart
      }
      medication {
        id
        name
        routedDoseFormDrugId
        dispensableDrugId
      }
      endDate
      refills {
        recordStatus
        id
        refillDate
        pharmacy {
          id
          name
          phoneNumber
          recordStatus
          location {
            id
            addressLine1
            addressLine2
            city
            singleLineAddress @client
            freeTextAddress
            state
            zipCode
          }
        }
      }
      dosages(where: {recordStatus: {eq: ACTIVE}}) {
        id
        recordStatus
        value
        unit
        schedule
      }
      prescribingProvider {
        id
        firstName
        lastName
        recordStatus
        address {
          id
          singleLineAddress @client
          freeTextAddress
          addressLine1
          addressLine2
          city
          country
          state
          zipCode
        }
        primarySpecialty
        phoneNumber
      }
    }
  }
}
    `;

/**
 * __useGetPrescriptionsWithScheduleQuery__
 *
 * To run a query within a React component, call `useGetPrescriptionsWithScheduleQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPrescriptionsWithScheduleQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPrescriptionsWithScheduleQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetPrescriptionsWithScheduleQuery(baseOptions?: Apollo.QueryHookOptions<GetPrescriptionsWithScheduleQuery, GetPrescriptionsWithScheduleQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPrescriptionsWithScheduleQuery, GetPrescriptionsWithScheduleQueryVariables>(GetPrescriptionsWithScheduleDocument, options);
      }
export function useGetPrescriptionsWithScheduleLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPrescriptionsWithScheduleQuery, GetPrescriptionsWithScheduleQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPrescriptionsWithScheduleQuery, GetPrescriptionsWithScheduleQueryVariables>(GetPrescriptionsWithScheduleDocument, options);
        }
export type GetPrescriptionsWithScheduleQueryHookResult = ReturnType<typeof useGetPrescriptionsWithScheduleQuery>;
export type GetPrescriptionsWithScheduleLazyQueryHookResult = ReturnType<typeof useGetPrescriptionsWithScheduleLazyQuery>;
export type GetPrescriptionsWithScheduleQueryResult = Apollo.QueryResult<GetPrescriptionsWithScheduleQuery, GetPrescriptionsWithScheduleQueryVariables>;
export const GetMedicationDocument = gql`
    query GetMedication($id: UUID!) {
  careRecipientMedicationPrescriptions {
    id
    prescriptions(where: {id: {eq: $id}}) {
      id
      recordStatus
      strengthValue
      overTheCounter
      directions
      takenFor {
        id
        recordStatus
        condition {
          name
          id
        }
        conditionStartDateDay
        conditionStartDateYear
        conditionStartDateMonth
        conditionStartDateRelativePeriodEnd
        conditionStartDateRelativePeriodStart
      }
      medication {
        id
        name
        routedDoseFormDrugId
        dispensableDrugId
      }
      startDate
      endDate
      refills(where: {recordStatus: {eq: ACTIVE}}) {
        id
        refillDate
        recordStatus
        pharmacy {
          id
          name
          phoneNumber
          recordStatus
          location {
            id
            addressLine1
            addressLine2
            city
            singleLineAddress @client
            freeTextAddress
            state
            zipCode
          }
        }
      }
      dosages(where: {recordStatus: {eq: ACTIVE}}) {
        id
        recordStatus
        value
        unit
        schedule
      }
      prescribingProvider {
        id
        firstName
        lastName
        recordStatus
        address {
          id
          singleLineAddress @client
          freeTextAddress
          addressLine1
          addressLine2
          city
          country
          state
          zipCode
        }
        primarySpecialty
        phoneNumber
      }
    }
  }
}
    `;

/**
 * __useGetMedicationQuery__
 *
 * To run a query within a React component, call `useGetMedicationQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMedicationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMedicationQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetMedicationQuery(baseOptions: Apollo.QueryHookOptions<GetMedicationQuery, GetMedicationQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMedicationQuery, GetMedicationQueryVariables>(GetMedicationDocument, options);
      }
export function useGetMedicationLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMedicationQuery, GetMedicationQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMedicationQuery, GetMedicationQueryVariables>(GetMedicationDocument, options);
        }
export type GetMedicationQueryHookResult = ReturnType<typeof useGetMedicationQuery>;
export type GetMedicationLazyQueryHookResult = ReturnType<typeof useGetMedicationLazyQuery>;
export type GetMedicationQueryResult = Apollo.QueryResult<GetMedicationQuery, GetMedicationQueryVariables>;
export const GetAppInvitationDocument = gql`
    query GetAppInvitation($inviteCode: String!) {
  appInvitation(inviteCode: $inviteCode) {
    inviteFromName
    careCircleName
  }
}
    `;

/**
 * __useGetAppInvitationQuery__
 *
 * To run a query within a React component, call `useGetAppInvitationQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAppInvitationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAppInvitationQuery({
 *   variables: {
 *      inviteCode: // value for 'inviteCode'
 *   },
 * });
 */
export function useGetAppInvitationQuery(baseOptions: Apollo.QueryHookOptions<GetAppInvitationQuery, GetAppInvitationQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAppInvitationQuery, GetAppInvitationQueryVariables>(GetAppInvitationDocument, options);
      }
export function useGetAppInvitationLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAppInvitationQuery, GetAppInvitationQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAppInvitationQuery, GetAppInvitationQueryVariables>(GetAppInvitationDocument, options);
        }
export type GetAppInvitationQueryHookResult = ReturnType<typeof useGetAppInvitationQuery>;
export type GetAppInvitationLazyQueryHookResult = ReturnType<typeof useGetAppInvitationLazyQuery>;
export type GetAppInvitationQueryResult = Apollo.QueryResult<GetAppInvitationQuery, GetAppInvitationQueryVariables>;
export const GetUserNotificationPreferencesDocument = gql`
    query GetUserNotificationPreferences {
  me {
    refillRemindersNotificationsEnabled
    dailyMedicationDosesNotificationsEnabled
    calendarAppointmentsNotificationsEnabled
    postsReactionsRepliesNotificationsEnabled
    activitySignUpsNotificationsEnabled
    newMemberJoinsNotificationsEnabled
  }
}
    `;

/**
 * __useGetUserNotificationPreferencesQuery__
 *
 * To run a query within a React component, call `useGetUserNotificationPreferencesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserNotificationPreferencesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserNotificationPreferencesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUserNotificationPreferencesQuery(baseOptions?: Apollo.QueryHookOptions<GetUserNotificationPreferencesQuery, GetUserNotificationPreferencesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserNotificationPreferencesQuery, GetUserNotificationPreferencesQueryVariables>(GetUserNotificationPreferencesDocument, options);
      }
export function useGetUserNotificationPreferencesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserNotificationPreferencesQuery, GetUserNotificationPreferencesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserNotificationPreferencesQuery, GetUserNotificationPreferencesQueryVariables>(GetUserNotificationPreferencesDocument, options);
        }
export type GetUserNotificationPreferencesQueryHookResult = ReturnType<typeof useGetUserNotificationPreferencesQuery>;
export type GetUserNotificationPreferencesLazyQueryHookResult = ReturnType<typeof useGetUserNotificationPreferencesLazyQuery>;
export type GetUserNotificationPreferencesQueryResult = Apollo.QueryResult<GetUserNotificationPreferencesQuery, GetUserNotificationPreferencesQueryVariables>;
export const GetNotificationPreferencesDocument = gql`
    query GetNotificationPreferences {
  notificationPreferences {
    profileId
    notificationsPreferences {
      notification {
        feature
        availableChannels
        requiresUserOptIn
      }
      userChannelSelections {
        sMSEnabled
        emailEnabled
        inAppEnabled
      }
    }
  }
}
    `;

/**
 * __useGetNotificationPreferencesQuery__
 *
 * To run a query within a React component, call `useGetNotificationPreferencesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetNotificationPreferencesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetNotificationPreferencesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetNotificationPreferencesQuery(baseOptions?: Apollo.QueryHookOptions<GetNotificationPreferencesQuery, GetNotificationPreferencesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetNotificationPreferencesQuery, GetNotificationPreferencesQueryVariables>(GetNotificationPreferencesDocument, options);
      }
export function useGetNotificationPreferencesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetNotificationPreferencesQuery, GetNotificationPreferencesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetNotificationPreferencesQuery, GetNotificationPreferencesQueryVariables>(GetNotificationPreferencesDocument, options);
        }
export type GetNotificationPreferencesQueryHookResult = ReturnType<typeof useGetNotificationPreferencesQuery>;
export type GetNotificationPreferencesLazyQueryHookResult = ReturnType<typeof useGetNotificationPreferencesLazyQuery>;
export type GetNotificationPreferencesQueryResult = Apollo.QueryResult<GetNotificationPreferencesQuery, GetNotificationPreferencesQueryVariables>;
export const GetCareRecipientConditionsDocument = gql`
    query GetCareRecipientConditions {
  careRecipientConditions {
    conditions {
      condition {
        id
        name
        codes {
          code
          id
        }
      }
      recordStatus
      conditionEndDateDay
      conditionEndDateMonth
      conditionEndDateYear
      conditionEndDateRelativePeriodStart
      conditionEndDateRelativePeriodEnd
      conditionStartDateDay
      conditionStartDateMonth
      conditionStartDateYear
      conditionStartDateRelativePeriodStart
      conditionStartDateRelativePeriodEnd
      conditionRelativeTimePeriod
      id
      current
    }
    id
  }
}
    `;

/**
 * __useGetCareRecipientConditionsQuery__
 *
 * To run a query within a React component, call `useGetCareRecipientConditionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCareRecipientConditionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCareRecipientConditionsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCareRecipientConditionsQuery(baseOptions?: Apollo.QueryHookOptions<GetCareRecipientConditionsQuery, GetCareRecipientConditionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCareRecipientConditionsQuery, GetCareRecipientConditionsQueryVariables>(GetCareRecipientConditionsDocument, options);
      }
export function useGetCareRecipientConditionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCareRecipientConditionsQuery, GetCareRecipientConditionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCareRecipientConditionsQuery, GetCareRecipientConditionsQueryVariables>(GetCareRecipientConditionsDocument, options);
        }
export type GetCareRecipientConditionsQueryHookResult = ReturnType<typeof useGetCareRecipientConditionsQuery>;
export type GetCareRecipientConditionsLazyQueryHookResult = ReturnType<typeof useGetCareRecipientConditionsLazyQuery>;
export type GetCareRecipientConditionsQueryResult = Apollo.QueryResult<GetCareRecipientConditionsQuery, GetCareRecipientConditionsQueryVariables>;
export const GetProvidersDocument = gql`
    query GetProviders {
  careRecipientProviders {
    id
    providers {
      recordStatus
      firstName
      id
      lastName
      phoneNumber
      address {
        addressLine1
        addressLine2
        city
        country
        state
        zipCode
        id
        singleLineAddress @client
        freeTextAddress
      }
      primarySpecialty
      codes {
        id
        code
      }
    }
  }
}
    `;

/**
 * __useGetProvidersQuery__
 *
 * To run a query within a React component, call `useGetProvidersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProvidersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProvidersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetProvidersQuery(baseOptions?: Apollo.QueryHookOptions<GetProvidersQuery, GetProvidersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProvidersQuery, GetProvidersQueryVariables>(GetProvidersDocument, options);
      }
export function useGetProvidersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProvidersQuery, GetProvidersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProvidersQuery, GetProvidersQueryVariables>(GetProvidersDocument, options);
        }
export type GetProvidersQueryHookResult = ReturnType<typeof useGetProvidersQuery>;
export type GetProvidersLazyQueryHookResult = ReturnType<typeof useGetProvidersLazyQuery>;
export type GetProvidersQueryResult = Apollo.QueryResult<GetProvidersQuery, GetProvidersQueryVariables>;
export const ConditionSearchDocument = gql`
    query ConditionSearch($input: ConditionSearchInput!) {
  conditionSearch(input: $input) {
    result {
      conditions {
        conditionName
        icd10Code
      }
    }
  }
}
    `;

/**
 * __useConditionSearchQuery__
 *
 * To run a query within a React component, call `useConditionSearchQuery` and pass it any options that fit your needs.
 * When your component renders, `useConditionSearchQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useConditionSearchQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useConditionSearchQuery(baseOptions: Apollo.QueryHookOptions<ConditionSearchQuery, ConditionSearchQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ConditionSearchQuery, ConditionSearchQueryVariables>(ConditionSearchDocument, options);
      }
export function useConditionSearchLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ConditionSearchQuery, ConditionSearchQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ConditionSearchQuery, ConditionSearchQueryVariables>(ConditionSearchDocument, options);
        }
export type ConditionSearchQueryHookResult = ReturnType<typeof useConditionSearchQuery>;
export type ConditionSearchLazyQueryHookResult = ReturnType<typeof useConditionSearchLazyQuery>;
export type ConditionSearchQueryResult = Apollo.QueryResult<ConditionSearchQuery, ConditionSearchQueryVariables>;
export const SearchProviderDocument = gql`
    query SearchProvider($searchText: String!) {
  providersSearch(input: {searchText: $searchText}) {
    result {
      items {
        providerFirstLineBusinessPracticeLocationAddress
        providerSecondLineBusinessPracticeLocationAddress
        providerBusinessPracticeLocationAddressCityName
        providerBusinessPracticeLocationAddressPostalCode
        providerBusinessPracticeLocationAddressStateName
        providerBusinessPracticeLocationAddressTelephoneNumber
        providerFirstName
        providerLastName
        primaryTaxonomyDisplayName
        nPI
      }
    }
  }
}
    `;

/**
 * __useSearchProviderQuery__
 *
 * To run a query within a React component, call `useSearchProviderQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchProviderQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchProviderQuery({
 *   variables: {
 *      searchText: // value for 'searchText'
 *   },
 * });
 */
export function useSearchProviderQuery(baseOptions: Apollo.QueryHookOptions<SearchProviderQuery, SearchProviderQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchProviderQuery, SearchProviderQueryVariables>(SearchProviderDocument, options);
      }
export function useSearchProviderLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchProviderQuery, SearchProviderQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchProviderQuery, SearchProviderQueryVariables>(SearchProviderDocument, options);
        }
export type SearchProviderQueryHookResult = ReturnType<typeof useSearchProviderQuery>;
export type SearchProviderLazyQueryHookResult = ReturnType<typeof useSearchProviderLazyQuery>;
export type SearchProviderQueryResult = Apollo.QueryResult<SearchProviderQuery, SearchProviderQueryVariables>;
export const GetProviderDocument = gql`
    query GetProvider($id: UUID!) {
  careRecipientProviders {
    id
    providers(where: {id: {eq: $id}}) {
      recordStatus
      firstName
      id
      lastName
      phoneNumber
      address {
        addressLine1
        addressLine2
        city
        country
        state
        zipCode
        id
        singleLineAddress @client
        freeTextAddress
      }
      primarySpecialty
      codes {
        code
        id
      }
    }
  }
}
    `;

/**
 * __useGetProviderQuery__
 *
 * To run a query within a React component, call `useGetProviderQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProviderQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProviderQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetProviderQuery(baseOptions: Apollo.QueryHookOptions<GetProviderQuery, GetProviderQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProviderQuery, GetProviderQueryVariables>(GetProviderDocument, options);
      }
export function useGetProviderLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProviderQuery, GetProviderQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProviderQuery, GetProviderQueryVariables>(GetProviderDocument, options);
        }
export type GetProviderQueryHookResult = ReturnType<typeof useGetProviderQuery>;
export type GetProviderLazyQueryHookResult = ReturnType<typeof useGetProviderLazyQuery>;
export type GetProviderQueryResult = Apollo.QueryResult<GetProviderQuery, GetProviderQueryVariables>;
export const SearchPharmacyDocument = gql`
    query SearchPharmacy($searchText: String!) {
  pharmacySearch(input: {searchText: $searchText}) {
    result {
      results {
        id
        address {
          streetNumber
          streetName
          city
          zipCode
          extendedZipCode
          state
          freeTextDisplayAddress
        }
        poi {
          categories
          name
          phoneNumber
          website
          operatingHours {
            mode
            timeRanges {
              endTime {
                date
                hour
                minute
              }
              startTime {
                date
                hour
                minute
              }
            }
          }
        }
      }
    }
  }
}
    `;

/**
 * __useSearchPharmacyQuery__
 *
 * To run a query within a React component, call `useSearchPharmacyQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchPharmacyQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchPharmacyQuery({
 *   variables: {
 *      searchText: // value for 'searchText'
 *   },
 * });
 */
export function useSearchPharmacyQuery(baseOptions: Apollo.QueryHookOptions<SearchPharmacyQuery, SearchPharmacyQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchPharmacyQuery, SearchPharmacyQueryVariables>(SearchPharmacyDocument, options);
      }
export function useSearchPharmacyLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchPharmacyQuery, SearchPharmacyQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchPharmacyQuery, SearchPharmacyQueryVariables>(SearchPharmacyDocument, options);
        }
export type SearchPharmacyQueryHookResult = ReturnType<typeof useSearchPharmacyQuery>;
export type SearchPharmacyLazyQueryHookResult = ReturnType<typeof useSearchPharmacyLazyQuery>;
export type SearchPharmacyQueryResult = Apollo.QueryResult<SearchPharmacyQuery, SearchPharmacyQueryVariables>;
export const GetPharmaciesDocument = gql`
    query GetPharmacies {
  careRecipientPharmacies {
    id
    pharmacies {
      recordStatus
      id
      phoneNumber
      name
      location {
        addressLine1
        addressLine2
        city
        country
        state
        zipCode
        id
        singleLineAddress @client
        freeTextAddress
      }
    }
  }
}
    `;

/**
 * __useGetPharmaciesQuery__
 *
 * To run a query within a React component, call `useGetPharmaciesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPharmaciesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPharmaciesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetPharmaciesQuery(baseOptions?: Apollo.QueryHookOptions<GetPharmaciesQuery, GetPharmaciesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPharmaciesQuery, GetPharmaciesQueryVariables>(GetPharmaciesDocument, options);
      }
export function useGetPharmaciesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPharmaciesQuery, GetPharmaciesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPharmaciesQuery, GetPharmaciesQueryVariables>(GetPharmaciesDocument, options);
        }
export type GetPharmaciesQueryHookResult = ReturnType<typeof useGetPharmaciesQuery>;
export type GetPharmaciesLazyQueryHookResult = ReturnType<typeof useGetPharmaciesLazyQuery>;
export type GetPharmaciesQueryResult = Apollo.QueryResult<GetPharmaciesQuery, GetPharmaciesQueryVariables>;
export const GetPharmacyDocument = gql`
    query GetPharmacy($id: UUID!) {
  careRecipientPharmacies {
    id
    pharmacies(where: {id: {eq: $id}}) {
      recordStatus
      id
      phoneNumber
      name
      location {
        addressLine1
        addressLine2
        city
        country
        state
        zipCode
        id
        singleLineAddress @client
        freeTextAddress
      }
    }
  }
}
    `;

/**
 * __useGetPharmacyQuery__
 *
 * To run a query within a React component, call `useGetPharmacyQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPharmacyQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPharmacyQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetPharmacyQuery(baseOptions: Apollo.QueryHookOptions<GetPharmacyQuery, GetPharmacyQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPharmacyQuery, GetPharmacyQueryVariables>(GetPharmacyDocument, options);
      }
export function useGetPharmacyLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPharmacyQuery, GetPharmacyQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPharmacyQuery, GetPharmacyQueryVariables>(GetPharmacyDocument, options);
        }
export type GetPharmacyQueryHookResult = ReturnType<typeof useGetPharmacyQuery>;
export type GetPharmacyLazyQueryHookResult = ReturnType<typeof useGetPharmacyLazyQuery>;
export type GetPharmacyQueryResult = Apollo.QueryResult<GetPharmacyQuery, GetPharmacyQueryVariables>;
export const SearchImmunizationDocument = gql`
    query SearchImmunization($searchText: String!) {
  vaccineSearch(input: {searchText: $searchText}) {
    result {
      searchResults {
        code
        name
      }
    }
  }
}
    `;

/**
 * __useSearchImmunizationQuery__
 *
 * To run a query within a React component, call `useSearchImmunizationQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchImmunizationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchImmunizationQuery({
 *   variables: {
 *      searchText: // value for 'searchText'
 *   },
 * });
 */
export function useSearchImmunizationQuery(baseOptions: Apollo.QueryHookOptions<SearchImmunizationQuery, SearchImmunizationQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchImmunizationQuery, SearchImmunizationQueryVariables>(SearchImmunizationDocument, options);
      }
export function useSearchImmunizationLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchImmunizationQuery, SearchImmunizationQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchImmunizationQuery, SearchImmunizationQueryVariables>(SearchImmunizationDocument, options);
        }
export type SearchImmunizationQueryHookResult = ReturnType<typeof useSearchImmunizationQuery>;
export type SearchImmunizationLazyQueryHookResult = ReturnType<typeof useSearchImmunizationLazyQuery>;
export type SearchImmunizationQueryResult = Apollo.QueryResult<SearchImmunizationQuery, SearchImmunizationQueryVariables>;
export const GetImmunizationsDocument = gql`
    query GetImmunizations {
  careRecipientImmunizations {
    id
    immunizations {
      recordStatus
      id
      immunizationDateDay
      immunizationDateMonth
      immunizationDateYear
      immunizationDateRelativePeriodStart
      immunizationDateRelativePeriodEnd
      vaccineProductAdministered {
        id
        name
      }
    }
  }
}
    `;

/**
 * __useGetImmunizationsQuery__
 *
 * To run a query within a React component, call `useGetImmunizationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetImmunizationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetImmunizationsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetImmunizationsQuery(baseOptions?: Apollo.QueryHookOptions<GetImmunizationsQuery, GetImmunizationsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetImmunizationsQuery, GetImmunizationsQueryVariables>(GetImmunizationsDocument, options);
      }
export function useGetImmunizationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetImmunizationsQuery, GetImmunizationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetImmunizationsQuery, GetImmunizationsQueryVariables>(GetImmunizationsDocument, options);
        }
export type GetImmunizationsQueryHookResult = ReturnType<typeof useGetImmunizationsQuery>;
export type GetImmunizationsLazyQueryHookResult = ReturnType<typeof useGetImmunizationsLazyQuery>;
export type GetImmunizationsQueryResult = Apollo.QueryResult<GetImmunizationsQuery, GetImmunizationsQueryVariables>;
export const GetImmunizationDocument = gql`
    query GetImmunization($id: UUID!) {
  careRecipientImmunizations {
    id
    immunizations(where: {id: {eq: $id}}) {
      recordStatus
      id
      immunizationDateDay
      immunizationDateMonth
      immunizationDateYear
      immunizationDateRelativePeriodStart
      immunizationDateRelativePeriodEnd
      vaccineProductAdministered {
        id
        name
      }
    }
  }
}
    `;

/**
 * __useGetImmunizationQuery__
 *
 * To run a query within a React component, call `useGetImmunizationQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetImmunizationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetImmunizationQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetImmunizationQuery(baseOptions: Apollo.QueryHookOptions<GetImmunizationQuery, GetImmunizationQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetImmunizationQuery, GetImmunizationQueryVariables>(GetImmunizationDocument, options);
      }
export function useGetImmunizationLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetImmunizationQuery, GetImmunizationQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetImmunizationQuery, GetImmunizationQueryVariables>(GetImmunizationDocument, options);
        }
export type GetImmunizationQueryHookResult = ReturnType<typeof useGetImmunizationQuery>;
export type GetImmunizationLazyQueryHookResult = ReturnType<typeof useGetImmunizationLazyQuery>;
export type GetImmunizationQueryResult = Apollo.QueryResult<GetImmunizationQuery, GetImmunizationQueryVariables>;
export const GetAllergiesDocument = gql`
    query GetAllergies {
  careRecipientAllergies {
    id
    allergies {
      recordStatus
      id
      allergen {
        id
        name
      }
      severity
    }
  }
}
    `;

/**
 * __useGetAllergiesQuery__
 *
 * To run a query within a React component, call `useGetAllergiesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllergiesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllergiesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllergiesQuery(baseOptions?: Apollo.QueryHookOptions<GetAllergiesQuery, GetAllergiesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllergiesQuery, GetAllergiesQueryVariables>(GetAllergiesDocument, options);
      }
export function useGetAllergiesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllergiesQuery, GetAllergiesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllergiesQuery, GetAllergiesQueryVariables>(GetAllergiesDocument, options);
        }
export type GetAllergiesQueryHookResult = ReturnType<typeof useGetAllergiesQuery>;
export type GetAllergiesLazyQueryHookResult = ReturnType<typeof useGetAllergiesLazyQuery>;
export type GetAllergiesQueryResult = Apollo.QueryResult<GetAllergiesQuery, GetAllergiesQueryVariables>;
export const GetAllergyDocument = gql`
    query GetAllergy($id: UUID!) {
  careRecipientAllergies {
    id
    allergies(where: {id: {eq: $id}}) {
      recordStatus
      id
      allergen {
        id
        name
      }
      severity
    }
  }
}
    `;

/**
 * __useGetAllergyQuery__
 *
 * To run a query within a React component, call `useGetAllergyQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllergyQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllergyQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetAllergyQuery(baseOptions: Apollo.QueryHookOptions<GetAllergyQuery, GetAllergyQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllergyQuery, GetAllergyQueryVariables>(GetAllergyDocument, options);
      }
export function useGetAllergyLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllergyQuery, GetAllergyQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllergyQuery, GetAllergyQueryVariables>(GetAllergyDocument, options);
        }
export type GetAllergyQueryHookResult = ReturnType<typeof useGetAllergyQuery>;
export type GetAllergyLazyQueryHookResult = ReturnType<typeof useGetAllergyLazyQuery>;
export type GetAllergyQueryResult = Apollo.QueryResult<GetAllergyQuery, GetAllergyQueryVariables>;
export const SearchAddressDocument = gql`
    query SearchAddress($searchText: String!, $location: GeolocationCoordinateInput) {
  addressSearch(input: {searchText: $searchText, location: $location}) {
    result {
      results {
        address {
          freeTextDisplayAddress
          streetName
          streetNumber
          zipCode
          city
          extendedZipCode
          state
          stateName
          country
        }
        id
        poi {
          name
        }
      }
    }
  }
}
    `;

/**
 * __useSearchAddressQuery__
 *
 * To run a query within a React component, call `useSearchAddressQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchAddressQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchAddressQuery({
 *   variables: {
 *      searchText: // value for 'searchText'
 *      location: // value for 'location'
 *   },
 * });
 */
export function useSearchAddressQuery(baseOptions: Apollo.QueryHookOptions<SearchAddressQuery, SearchAddressQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchAddressQuery, SearchAddressQueryVariables>(SearchAddressDocument, options);
      }
export function useSearchAddressLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchAddressQuery, SearchAddressQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchAddressQuery, SearchAddressQueryVariables>(SearchAddressDocument, options);
        }
export type SearchAddressQueryHookResult = ReturnType<typeof useSearchAddressQuery>;
export type SearchAddressLazyQueryHookResult = ReturnType<typeof useSearchAddressLazyQuery>;
export type SearchAddressQueryResult = Apollo.QueryResult<SearchAddressQuery, SearchAddressQueryVariables>;
export const GetCareRecipientProfileDocument = gql`
    query GetCareRecipientProfile {
  careRecipientProfile {
    firstName
    lastName
    id
    email
    phone
    dOB
    weight
    height
    legalSex
    bloodType
    measurementSystemPreference
    timeZoneID
    address {
      singleLineAddress @client
      freeTextAddress
      addressLine1
      addressLine2
      city
      country
      zipCode
      state
      id
      saveState {
        addressLine1
        addressLine2
        city
        country
        freeTextAddress
        zipCode
        state
      }
    }
  }
}
    `;

/**
 * __useGetCareRecipientProfileQuery__
 *
 * To run a query within a React component, call `useGetCareRecipientProfileQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCareRecipientProfileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCareRecipientProfileQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCareRecipientProfileQuery(baseOptions?: Apollo.QueryHookOptions<GetCareRecipientProfileQuery, GetCareRecipientProfileQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCareRecipientProfileQuery, GetCareRecipientProfileQueryVariables>(GetCareRecipientProfileDocument, options);
      }
export function useGetCareRecipientProfileLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCareRecipientProfileQuery, GetCareRecipientProfileQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCareRecipientProfileQuery, GetCareRecipientProfileQueryVariables>(GetCareRecipientProfileDocument, options);
        }
export type GetCareRecipientProfileQueryHookResult = ReturnType<typeof useGetCareRecipientProfileQuery>;
export type GetCareRecipientProfileLazyQueryHookResult = ReturnType<typeof useGetCareRecipientProfileLazyQuery>;
export type GetCareRecipientProfileQueryResult = Apollo.QueryResult<GetCareRecipientProfileQuery, GetCareRecipientProfileQueryVariables>;
export const GetCareRecipientProfileBasicDocument = gql`
    query GetCareRecipientProfileBasic {
  careRecipientProfile {
    id
    firstName
    lastName
    dOB
    phone
  }
}
    `;

/**
 * __useGetCareRecipientProfileBasicQuery__
 *
 * To run a query within a React component, call `useGetCareRecipientProfileBasicQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCareRecipientProfileBasicQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCareRecipientProfileBasicQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCareRecipientProfileBasicQuery(baseOptions?: Apollo.QueryHookOptions<GetCareRecipientProfileBasicQuery, GetCareRecipientProfileBasicQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCareRecipientProfileBasicQuery, GetCareRecipientProfileBasicQueryVariables>(GetCareRecipientProfileBasicDocument, options);
      }
export function useGetCareRecipientProfileBasicLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCareRecipientProfileBasicQuery, GetCareRecipientProfileBasicQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCareRecipientProfileBasicQuery, GetCareRecipientProfileBasicQueryVariables>(GetCareRecipientProfileBasicDocument, options);
        }
export type GetCareRecipientProfileBasicQueryHookResult = ReturnType<typeof useGetCareRecipientProfileBasicQuery>;
export type GetCareRecipientProfileBasicLazyQueryHookResult = ReturnType<typeof useGetCareRecipientProfileBasicLazyQuery>;
export type GetCareRecipientProfileBasicQueryResult = Apollo.QueryResult<GetCareRecipientProfileBasicQuery, GetCareRecipientProfileBasicQueryVariables>;
export const GetCareRecipientPhotoDocument = gql`
    query GetCareRecipientPhoto {
  careRecipientPhoto {
    id
    careRecipientImageURL
  }
}
    `;

/**
 * __useGetCareRecipientPhotoQuery__
 *
 * To run a query within a React component, call `useGetCareRecipientPhotoQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCareRecipientPhotoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCareRecipientPhotoQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCareRecipientPhotoQuery(baseOptions?: Apollo.QueryHookOptions<GetCareRecipientPhotoQuery, GetCareRecipientPhotoQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCareRecipientPhotoQuery, GetCareRecipientPhotoQueryVariables>(GetCareRecipientPhotoDocument, options);
      }
export function useGetCareRecipientPhotoLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCareRecipientPhotoQuery, GetCareRecipientPhotoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCareRecipientPhotoQuery, GetCareRecipientPhotoQueryVariables>(GetCareRecipientPhotoDocument, options);
        }
export type GetCareRecipientPhotoQueryHookResult = ReturnType<typeof useGetCareRecipientPhotoQuery>;
export type GetCareRecipientPhotoLazyQueryHookResult = ReturnType<typeof useGetCareRecipientPhotoLazyQuery>;
export type GetCareRecipientPhotoQueryResult = Apollo.QueryResult<GetCareRecipientPhotoQuery, GetCareRecipientPhotoQueryVariables>;
export const GetActivitiesDocument = gql`
    query GetActivities {
  careCircleExperiences {
    id
    experiences {
      id
      title
      details
      phoneNumber
      type
      availability
      address {
        id
        addressLine1
        addressLine2
        city
        state
        zipCode
        country
        freeTextAddress
        singleLineAddress @client
      }
      careCircle {
        id
        careCircleMembers {
          id
          careGiver {
            id
            displayName
            imageBase64
          }
          experienceOccurrences {
            id
            experience {
              id
            }
          }
          relationshipToLovedOne
        }
      }
    }
  }
}
    `;

/**
 * __useGetActivitiesQuery__
 *
 * To run a query within a React component, call `useGetActivitiesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetActivitiesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetActivitiesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetActivitiesQuery(baseOptions?: Apollo.QueryHookOptions<GetActivitiesQuery, GetActivitiesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetActivitiesQuery, GetActivitiesQueryVariables>(GetActivitiesDocument, options);
      }
export function useGetActivitiesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetActivitiesQuery, GetActivitiesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetActivitiesQuery, GetActivitiesQueryVariables>(GetActivitiesDocument, options);
        }
export type GetActivitiesQueryHookResult = ReturnType<typeof useGetActivitiesQuery>;
export type GetActivitiesLazyQueryHookResult = ReturnType<typeof useGetActivitiesLazyQuery>;
export type GetActivitiesQueryResult = Apollo.QueryResult<GetActivitiesQuery, GetActivitiesQueryVariables>;
export const GetActivityDocument = gql`
    query GetActivity($id: UUID!) {
  careCircleExperiences {
    id
    experiences(where: {id: {eq: $id}}) {
      id
      title
      details
      phoneNumber
      type
      availability
      address {
        id
        addressLine1
        addressLine2
        city
        state
        zipCode
        country
        freeTextAddress
        singleLineAddress @client
      }
      careCircle {
        id
        careCircleMembers {
          id
          careGiver {
            id
            displayName
            imageBase64
          }
          experienceOccurrences {
            id
            experience {
              id
            }
          }
          relationshipToLovedOne
        }
      }
    }
  }
}
    `;

/**
 * __useGetActivityQuery__
 *
 * To run a query within a React component, call `useGetActivityQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetActivityQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetActivityQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetActivityQuery(baseOptions: Apollo.QueryHookOptions<GetActivityQuery, GetActivityQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetActivityQuery, GetActivityQueryVariables>(GetActivityDocument, options);
      }
export function useGetActivityLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetActivityQuery, GetActivityQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetActivityQuery, GetActivityQueryVariables>(GetActivityDocument, options);
        }
export type GetActivityQueryHookResult = ReturnType<typeof useGetActivityQuery>;
export type GetActivityLazyQueryHookResult = ReturnType<typeof useGetActivityLazyQuery>;
export type GetActivityQueryResult = Apollo.QueryResult<GetActivityQuery, GetActivityQueryVariables>;
export const GetCarePlanDocumentsDocument = gql`
    query GetCarePlanDocuments {
  carePlanDocuments {
    name
    extension
    uploadDate
    id
    downloadUri
    careCircle {
      name
      careCircleMembers {
        careGiver {
          displayName
        }
      }
    }
    fileSizeKB
    createdBy {
      displayName
    }
  }
}
    `;

/**
 * __useGetCarePlanDocumentsQuery__
 *
 * To run a query within a React component, call `useGetCarePlanDocumentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCarePlanDocumentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCarePlanDocumentsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCarePlanDocumentsQuery(baseOptions?: Apollo.QueryHookOptions<GetCarePlanDocumentsQuery, GetCarePlanDocumentsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCarePlanDocumentsQuery, GetCarePlanDocumentsQueryVariables>(GetCarePlanDocumentsDocument, options);
      }
export function useGetCarePlanDocumentsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCarePlanDocumentsQuery, GetCarePlanDocumentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCarePlanDocumentsQuery, GetCarePlanDocumentsQueryVariables>(GetCarePlanDocumentsDocument, options);
        }
export type GetCarePlanDocumentsQueryHookResult = ReturnType<typeof useGetCarePlanDocumentsQuery>;
export type GetCarePlanDocumentsLazyQueryHookResult = ReturnType<typeof useGetCarePlanDocumentsLazyQuery>;
export type GetCarePlanDocumentsQueryResult = Apollo.QueryResult<GetCarePlanDocumentsQuery, GetCarePlanDocumentsQueryVariables>;
export const GetDocumentQuestionAnswerDocument = gql`
    query GetDocumentQuestionAnswer($input: DocumentInquiryInput!) {
  documentQuestionAnswer(input: $input) {
    result {
      answer
      context
      question
      careCircleFileId
    }
  }
}
    `;

/**
 * __useGetDocumentQuestionAnswerQuery__
 *
 * To run a query within a React component, call `useGetDocumentQuestionAnswerQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDocumentQuestionAnswerQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDocumentQuestionAnswerQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetDocumentQuestionAnswerQuery(baseOptions: Apollo.QueryHookOptions<GetDocumentQuestionAnswerQuery, GetDocumentQuestionAnswerQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetDocumentQuestionAnswerQuery, GetDocumentQuestionAnswerQueryVariables>(GetDocumentQuestionAnswerDocument, options);
      }
export function useGetDocumentQuestionAnswerLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetDocumentQuestionAnswerQuery, GetDocumentQuestionAnswerQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetDocumentQuestionAnswerQuery, GetDocumentQuestionAnswerQueryVariables>(GetDocumentQuestionAnswerDocument, options);
        }
export type GetDocumentQuestionAnswerQueryHookResult = ReturnType<typeof useGetDocumentQuestionAnswerQuery>;
export type GetDocumentQuestionAnswerLazyQueryHookResult = ReturnType<typeof useGetDocumentQuestionAnswerLazyQuery>;
export type GetDocumentQuestionAnswerQueryResult = Apollo.QueryResult<GetDocumentQuestionAnswerQuery, GetDocumentQuestionAnswerQueryVariables>;
export const GetCareCircleHasOnboardedDocument = gql`
    query GetCareCircleHasOnboarded {
  usersCareCircle {
    id
    careCircleMembers {
      id
      careGiver {
        id
        profile {
          id
          onboardingComplete
        }
      }
    }
  }
}
    `;

/**
 * __useGetCareCircleHasOnboardedQuery__
 *
 * To run a query within a React component, call `useGetCareCircleHasOnboardedQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCareCircleHasOnboardedQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCareCircleHasOnboardedQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCareCircleHasOnboardedQuery(baseOptions?: Apollo.QueryHookOptions<GetCareCircleHasOnboardedQuery, GetCareCircleHasOnboardedQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCareCircleHasOnboardedQuery, GetCareCircleHasOnboardedQueryVariables>(GetCareCircleHasOnboardedDocument, options);
      }
export function useGetCareCircleHasOnboardedLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCareCircleHasOnboardedQuery, GetCareCircleHasOnboardedQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCareCircleHasOnboardedQuery, GetCareCircleHasOnboardedQueryVariables>(GetCareCircleHasOnboardedDocument, options);
        }
export type GetCareCircleHasOnboardedQueryHookResult = ReturnType<typeof useGetCareCircleHasOnboardedQuery>;
export type GetCareCircleHasOnboardedLazyQueryHookResult = ReturnType<typeof useGetCareCircleHasOnboardedLazyQuery>;
export type GetCareCircleHasOnboardedQueryResult = Apollo.QueryResult<GetCareCircleHasOnboardedQuery, GetCareCircleHasOnboardedQueryVariables>;
export const GetAvailableUserTimeZonesDocument = gql`
    query GetAvailableUserTimeZones {
  availableUserTimeZones {
    ianaIds
    territory
    windowsId
  }
}
    `;

/**
 * __useGetAvailableUserTimeZonesQuery__
 *
 * To run a query within a React component, call `useGetAvailableUserTimeZonesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAvailableUserTimeZonesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAvailableUserTimeZonesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAvailableUserTimeZonesQuery(baseOptions?: Apollo.QueryHookOptions<GetAvailableUserTimeZonesQuery, GetAvailableUserTimeZonesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAvailableUserTimeZonesQuery, GetAvailableUserTimeZonesQueryVariables>(GetAvailableUserTimeZonesDocument, options);
      }
export function useGetAvailableUserTimeZonesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAvailableUserTimeZonesQuery, GetAvailableUserTimeZonesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAvailableUserTimeZonesQuery, GetAvailableUserTimeZonesQueryVariables>(GetAvailableUserTimeZonesDocument, options);
        }
export type GetAvailableUserTimeZonesQueryHookResult = ReturnType<typeof useGetAvailableUserTimeZonesQuery>;
export type GetAvailableUserTimeZonesLazyQueryHookResult = ReturnType<typeof useGetAvailableUserTimeZonesLazyQuery>;
export type GetAvailableUserTimeZonesQueryResult = Apollo.QueryResult<GetAvailableUserTimeZonesQuery, GetAvailableUserTimeZonesQueryVariables>;
export const GetCommonConditionsDocument = gql`
    query GetCommonConditions {
  commonCondition {
    name
    code
  }
}
    `;

/**
 * __useGetCommonConditionsQuery__
 *
 * To run a query within a React component, call `useGetCommonConditionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCommonConditionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCommonConditionsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCommonConditionsQuery(baseOptions?: Apollo.QueryHookOptions<GetCommonConditionsQuery, GetCommonConditionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCommonConditionsQuery, GetCommonConditionsQueryVariables>(GetCommonConditionsDocument, options);
      }
export function useGetCommonConditionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCommonConditionsQuery, GetCommonConditionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCommonConditionsQuery, GetCommonConditionsQueryVariables>(GetCommonConditionsDocument, options);
        }
export type GetCommonConditionsQueryHookResult = ReturnType<typeof useGetCommonConditionsQuery>;
export type GetCommonConditionsLazyQueryHookResult = ReturnType<typeof useGetCommonConditionsLazyQuery>;
export type GetCommonConditionsQueryResult = Apollo.QueryResult<GetCommonConditionsQuery, GetCommonConditionsQueryVariables>;
export const GetRelativeTimePeriodEnumDocument = gql`
    query GetRelativeTimePeriodEnum {
  __type(name: "RelativeTimePeriod") {
    name
    enumValues {
      name
    }
  }
}
    `;

/**
 * __useGetRelativeTimePeriodEnumQuery__
 *
 * To run a query within a React component, call `useGetRelativeTimePeriodEnumQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRelativeTimePeriodEnumQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRelativeTimePeriodEnumQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetRelativeTimePeriodEnumQuery(baseOptions?: Apollo.QueryHookOptions<GetRelativeTimePeriodEnumQuery, GetRelativeTimePeriodEnumQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetRelativeTimePeriodEnumQuery, GetRelativeTimePeriodEnumQueryVariables>(GetRelativeTimePeriodEnumDocument, options);
      }
export function useGetRelativeTimePeriodEnumLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetRelativeTimePeriodEnumQuery, GetRelativeTimePeriodEnumQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetRelativeTimePeriodEnumQuery, GetRelativeTimePeriodEnumQueryVariables>(GetRelativeTimePeriodEnumDocument, options);
        }
export type GetRelativeTimePeriodEnumQueryHookResult = ReturnType<typeof useGetRelativeTimePeriodEnumQuery>;
export type GetRelativeTimePeriodEnumLazyQueryHookResult = ReturnType<typeof useGetRelativeTimePeriodEnumLazyQuery>;
export type GetRelativeTimePeriodEnumQueryResult = Apollo.QueryResult<GetRelativeTimePeriodEnumQuery, GetRelativeTimePeriodEnumQueryVariables>;
export const GetPositivitySlotDocument = gql`
    query GetPositivitySlot($input: PositivitySlotGenerateInput!) {
  inquiryPositivitySlot(input: $input) {
    result {
      id
      choices {
        text
      }
    }
  }
}
    `;

/**
 * __useGetPositivitySlotQuery__
 *
 * To run a query within a React component, call `useGetPositivitySlotQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPositivitySlotQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPositivitySlotQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetPositivitySlotQuery(baseOptions: Apollo.QueryHookOptions<GetPositivitySlotQuery, GetPositivitySlotQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPositivitySlotQuery, GetPositivitySlotQueryVariables>(GetPositivitySlotDocument, options);
      }
export function useGetPositivitySlotLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPositivitySlotQuery, GetPositivitySlotQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPositivitySlotQuery, GetPositivitySlotQueryVariables>(GetPositivitySlotDocument, options);
        }
export type GetPositivitySlotQueryHookResult = ReturnType<typeof useGetPositivitySlotQuery>;
export type GetPositivitySlotLazyQueryHookResult = ReturnType<typeof useGetPositivitySlotLazyQuery>;
export type GetPositivitySlotQueryResult = Apollo.QueryResult<GetPositivitySlotQuery, GetPositivitySlotQueryVariables>;
export const GetCarePlanConditionDocument = gql`
    query GetCarePlanCondition($input: DynamicCarePlanGenerateInput!) {
  inquiryCarePlanCondition(input: $input) {
    result {
      id
      choices {
        text {
          recurrence
          task
        }
      }
    }
  }
}
    `;

/**
 * __useGetCarePlanConditionQuery__
 *
 * To run a query within a React component, call `useGetCarePlanConditionQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCarePlanConditionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCarePlanConditionQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetCarePlanConditionQuery(baseOptions: Apollo.QueryHookOptions<GetCarePlanConditionQuery, GetCarePlanConditionQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCarePlanConditionQuery, GetCarePlanConditionQueryVariables>(GetCarePlanConditionDocument, options);
      }
export function useGetCarePlanConditionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCarePlanConditionQuery, GetCarePlanConditionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCarePlanConditionQuery, GetCarePlanConditionQueryVariables>(GetCarePlanConditionDocument, options);
        }
export type GetCarePlanConditionQueryHookResult = ReturnType<typeof useGetCarePlanConditionQuery>;
export type GetCarePlanConditionLazyQueryHookResult = ReturnType<typeof useGetCarePlanConditionLazyQuery>;
export type GetCarePlanConditionQueryResult = Apollo.QueryResult<GetCarePlanConditionQuery, GetCarePlanConditionQueryVariables>;
export const GetConditionResourcesDocument = gql`
    query GetConditionResources($input: ResourceSearchInput!) {
  resourceSearch(input: $input) {
    result {
      webPages {
        value {
          webPageID
          webPageName
          webPageUrl
          thumbnailUrl
          snippet
        }
      }
    }
  }
}
    `;

/**
 * __useGetConditionResourcesQuery__
 *
 * To run a query within a React component, call `useGetConditionResourcesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetConditionResourcesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetConditionResourcesQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetConditionResourcesQuery(baseOptions: Apollo.QueryHookOptions<GetConditionResourcesQuery, GetConditionResourcesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetConditionResourcesQuery, GetConditionResourcesQueryVariables>(GetConditionResourcesDocument, options);
      }
export function useGetConditionResourcesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetConditionResourcesQuery, GetConditionResourcesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetConditionResourcesQuery, GetConditionResourcesQueryVariables>(GetConditionResourcesDocument, options);
        }
export type GetConditionResourcesQueryHookResult = ReturnType<typeof useGetConditionResourcesQuery>;
export type GetConditionResourcesLazyQueryHookResult = ReturnType<typeof useGetConditionResourcesLazyQuery>;
export type GetConditionResourcesQueryResult = Apollo.QueryResult<GetConditionResourcesQuery, GetConditionResourcesQueryVariables>;
export const GetAppointmentsDocument = gql`
    query GetAppointments {
  careRecipientAppointments {
    id
    appointments {
      recordStatus
      description
      endDateTime
      id
      location {
        addressLine1
        city
        id
        freeTextAddress
        state
        zipCode
        saveState {
          addressLine1
          addressLine2
          city
          country
          freeTextAddress
          zipCode
          state
        }
      }
      startDateTime
      recurrence
    }
  }
}
    `;

/**
 * __useGetAppointmentsQuery__
 *
 * To run a query within a React component, call `useGetAppointmentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAppointmentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAppointmentsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAppointmentsQuery(baseOptions?: Apollo.QueryHookOptions<GetAppointmentsQuery, GetAppointmentsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAppointmentsQuery, GetAppointmentsQueryVariables>(GetAppointmentsDocument, options);
      }
export function useGetAppointmentsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAppointmentsQuery, GetAppointmentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAppointmentsQuery, GetAppointmentsQueryVariables>(GetAppointmentsDocument, options);
        }
export type GetAppointmentsQueryHookResult = ReturnType<typeof useGetAppointmentsQuery>;
export type GetAppointmentsLazyQueryHookResult = ReturnType<typeof useGetAppointmentsLazyQuery>;
export type GetAppointmentsQueryResult = Apollo.QueryResult<GetAppointmentsQuery, GetAppointmentsQueryVariables>;
export const GetCareRecipientCarePlanDocument = gql`
    query GetCareRecipientCarePlan {
  careRecipientCarePlans {
    id
    carePlans {
      id
      recordStatus
      activities(where: {recordStatus: {eq: ACTIVE}}) {
        recordStatus
        description
        recurrence
        id
        endDateTime
        startDateTime
      }
      careRecipient {
        id
      }
      conditionOccurrence {
        id
      }
    }
  }
}
    `;

/**
 * __useGetCareRecipientCarePlanQuery__
 *
 * To run a query within a React component, call `useGetCareRecipientCarePlanQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCareRecipientCarePlanQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCareRecipientCarePlanQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCareRecipientCarePlanQuery(baseOptions?: Apollo.QueryHookOptions<GetCareRecipientCarePlanQuery, GetCareRecipientCarePlanQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCareRecipientCarePlanQuery, GetCareRecipientCarePlanQueryVariables>(GetCareRecipientCarePlanDocument, options);
      }
export function useGetCareRecipientCarePlanLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCareRecipientCarePlanQuery, GetCareRecipientCarePlanQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCareRecipientCarePlanQuery, GetCareRecipientCarePlanQueryVariables>(GetCareRecipientCarePlanDocument, options);
        }
export type GetCareRecipientCarePlanQueryHookResult = ReturnType<typeof useGetCareRecipientCarePlanQuery>;
export type GetCareRecipientCarePlanLazyQueryHookResult = ReturnType<typeof useGetCareRecipientCarePlanLazyQuery>;
export type GetCareRecipientCarePlanQueryResult = Apollo.QueryResult<GetCareRecipientCarePlanQuery, GetCareRecipientCarePlanQueryVariables>;
export const GetCareGiverAnnotationsDocument = gql`
    query GetCareGiverAnnotations {
  careGiverAnnotations {
    id
    annotations {
      id
      recordStatus
      createdDateTime
      type
      title
      text
    }
  }
}
    `;

/**
 * __useGetCareGiverAnnotationsQuery__
 *
 * To run a query within a React component, call `useGetCareGiverAnnotationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCareGiverAnnotationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCareGiverAnnotationsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCareGiverAnnotationsQuery(baseOptions?: Apollo.QueryHookOptions<GetCareGiverAnnotationsQuery, GetCareGiverAnnotationsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCareGiverAnnotationsQuery, GetCareGiverAnnotationsQueryVariables>(GetCareGiverAnnotationsDocument, options);
      }
export function useGetCareGiverAnnotationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCareGiverAnnotationsQuery, GetCareGiverAnnotationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCareGiverAnnotationsQuery, GetCareGiverAnnotationsQueryVariables>(GetCareGiverAnnotationsDocument, options);
        }
export type GetCareGiverAnnotationsQueryHookResult = ReturnType<typeof useGetCareGiverAnnotationsQuery>;
export type GetCareGiverAnnotationsLazyQueryHookResult = ReturnType<typeof useGetCareGiverAnnotationsLazyQuery>;
export type GetCareGiverAnnotationsQueryResult = Apollo.QueryResult<GetCareGiverAnnotationsQuery, GetCareGiverAnnotationsQueryVariables>;
export const GetCareGiverAnnotationDocument = gql`
    query GetCareGiverAnnotation($id: UUID!) {
  careGiverAnnotations {
    id
    annotations(where: {id: {eq: $id}}) {
      id
      recordStatus
      createdDateTime
      type
      title
      text
    }
  }
}
    `;

/**
 * __useGetCareGiverAnnotationQuery__
 *
 * To run a query within a React component, call `useGetCareGiverAnnotationQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCareGiverAnnotationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCareGiverAnnotationQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetCareGiverAnnotationQuery(baseOptions: Apollo.QueryHookOptions<GetCareGiverAnnotationQuery, GetCareGiverAnnotationQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCareGiverAnnotationQuery, GetCareGiverAnnotationQueryVariables>(GetCareGiverAnnotationDocument, options);
      }
export function useGetCareGiverAnnotationLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCareGiverAnnotationQuery, GetCareGiverAnnotationQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCareGiverAnnotationQuery, GetCareGiverAnnotationQueryVariables>(GetCareGiverAnnotationDocument, options);
        }
export type GetCareGiverAnnotationQueryHookResult = ReturnType<typeof useGetCareGiverAnnotationQuery>;
export type GetCareGiverAnnotationLazyQueryHookResult = ReturnType<typeof useGetCareGiverAnnotationLazyQuery>;
export type GetCareGiverAnnotationQueryResult = Apollo.QueryResult<GetCareGiverAnnotationQuery, GetCareGiverAnnotationQueryVariables>;
export const GetInquiryConditionAdhocQuestionDocument = gql`
    query GetInquiryConditionAdhocQuestion($input: ConditionInquiryInput!) {
  inquiryConditionAdhocQuestion(input: $input) {
    result {
      id
      choices {
        text
      }
    }
  }
}
    `;

/**
 * __useGetInquiryConditionAdhocQuestionQuery__
 *
 * To run a query within a React component, call `useGetInquiryConditionAdhocQuestionQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetInquiryConditionAdhocQuestionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetInquiryConditionAdhocQuestionQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetInquiryConditionAdhocQuestionQuery(baseOptions: Apollo.QueryHookOptions<GetInquiryConditionAdhocQuestionQuery, GetInquiryConditionAdhocQuestionQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetInquiryConditionAdhocQuestionQuery, GetInquiryConditionAdhocQuestionQueryVariables>(GetInquiryConditionAdhocQuestionDocument, options);
      }
export function useGetInquiryConditionAdhocQuestionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetInquiryConditionAdhocQuestionQuery, GetInquiryConditionAdhocQuestionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetInquiryConditionAdhocQuestionQuery, GetInquiryConditionAdhocQuestionQueryVariables>(GetInquiryConditionAdhocQuestionDocument, options);
        }
export type GetInquiryConditionAdhocQuestionQueryHookResult = ReturnType<typeof useGetInquiryConditionAdhocQuestionQuery>;
export type GetInquiryConditionAdhocQuestionLazyQueryHookResult = ReturnType<typeof useGetInquiryConditionAdhocQuestionLazyQuery>;
export type GetInquiryConditionAdhocQuestionQueryResult = Apollo.QueryResult<GetInquiryConditionAdhocQuestionQuery, GetInquiryConditionAdhocQuestionQueryVariables>;
export const GenerateQuestionsForProviderDocument = gql`
    query GenerateQuestionsForProvider {
  questionGenerate {
    result {
      questions
    }
  }
}
    `;

/**
 * __useGenerateQuestionsForProviderQuery__
 *
 * To run a query within a React component, call `useGenerateQuestionsForProviderQuery` and pass it any options that fit your needs.
 * When your component renders, `useGenerateQuestionsForProviderQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGenerateQuestionsForProviderQuery({
 *   variables: {
 *   },
 * });
 */
export function useGenerateQuestionsForProviderQuery(baseOptions?: Apollo.QueryHookOptions<GenerateQuestionsForProviderQuery, GenerateQuestionsForProviderQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GenerateQuestionsForProviderQuery, GenerateQuestionsForProviderQueryVariables>(GenerateQuestionsForProviderDocument, options);
      }
export function useGenerateQuestionsForProviderLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GenerateQuestionsForProviderQuery, GenerateQuestionsForProviderQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GenerateQuestionsForProviderQuery, GenerateQuestionsForProviderQueryVariables>(GenerateQuestionsForProviderDocument, options);
        }
export type GenerateQuestionsForProviderQueryHookResult = ReturnType<typeof useGenerateQuestionsForProviderQuery>;
export type GenerateQuestionsForProviderLazyQueryHookResult = ReturnType<typeof useGenerateQuestionsForProviderLazyQuery>;
export type GenerateQuestionsForProviderQueryResult = Apollo.QueryResult<GenerateQuestionsForProviderQuery, GenerateQuestionsForProviderQueryVariables>;
export const GenerateSymptomsDocument = gql`
    query GenerateSymptoms {
  symptomParse {
    result {
      symptoms
    }
  }
}
    `;

/**
 * __useGenerateSymptomsQuery__
 *
 * To run a query within a React component, call `useGenerateSymptomsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGenerateSymptomsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGenerateSymptomsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGenerateSymptomsQuery(baseOptions?: Apollo.QueryHookOptions<GenerateSymptomsQuery, GenerateSymptomsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GenerateSymptomsQuery, GenerateSymptomsQueryVariables>(GenerateSymptomsDocument, options);
      }
export function useGenerateSymptomsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GenerateSymptomsQuery, GenerateSymptomsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GenerateSymptomsQuery, GenerateSymptomsQueryVariables>(GenerateSymptomsDocument, options);
        }
export type GenerateSymptomsQueryHookResult = ReturnType<typeof useGenerateSymptomsQuery>;
export type GenerateSymptomsLazyQueryHookResult = ReturnType<typeof useGenerateSymptomsLazyQuery>;
export type GenerateSymptomsQueryResult = Apollo.QueryResult<GenerateSymptomsQuery, GenerateSymptomsQueryVariables>;
export const GetInquiryNoteParsingDocument = gql`
    query GetInquiryNoteParsing($text: String!) {
  inquiryNoteParsing(input: {annotationText: $text}) {
    result {
      allergies {
        allergen {
          damConceptId
          id
          name
        }
        severity
      }
      conditions {
        condition {
          iCD10Code
          id
          name
        }
      }
      immunizations {
        vaccineProductAdministered {
          cDCProductId
          name
        }
      }
      medications {
        medication {
          dispensableDrugId
          id
          name
          routedDoseFormDrugId
        }
      }
    }
  }
}
    `;

/**
 * __useGetInquiryNoteParsingQuery__
 *
 * To run a query within a React component, call `useGetInquiryNoteParsingQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetInquiryNoteParsingQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetInquiryNoteParsingQuery({
 *   variables: {
 *      text: // value for 'text'
 *   },
 * });
 */
export function useGetInquiryNoteParsingQuery(baseOptions: Apollo.QueryHookOptions<GetInquiryNoteParsingQuery, GetInquiryNoteParsingQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetInquiryNoteParsingQuery, GetInquiryNoteParsingQueryVariables>(GetInquiryNoteParsingDocument, options);
      }
export function useGetInquiryNoteParsingLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetInquiryNoteParsingQuery, GetInquiryNoteParsingQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetInquiryNoteParsingQuery, GetInquiryNoteParsingQueryVariables>(GetInquiryNoteParsingDocument, options);
        }
export type GetInquiryNoteParsingQueryHookResult = ReturnType<typeof useGetInquiryNoteParsingQuery>;
export type GetInquiryNoteParsingLazyQueryHookResult = ReturnType<typeof useGetInquiryNoteParsingLazyQuery>;
export type GetInquiryNoteParsingQueryResult = Apollo.QueryResult<GetInquiryNoteParsingQuery, GetInquiryNoteParsingQueryVariables>;
export const GetCareRecipientTimelineDocument = gql`
    query GetCareRecipientTimeline {
  careRecipientTimeline {
    id
    entities {
      id
      type
      status
      text
      relativeTimePeriod
      date {
        year
        month
        day
      }
      dateRange {
        start {
          year
        }
        end {
          year
        }
      }
    }
  }
}
    `;

/**
 * __useGetCareRecipientTimelineQuery__
 *
 * To run a query within a React component, call `useGetCareRecipientTimelineQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCareRecipientTimelineQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCareRecipientTimelineQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCareRecipientTimelineQuery(baseOptions?: Apollo.QueryHookOptions<GetCareRecipientTimelineQuery, GetCareRecipientTimelineQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCareRecipientTimelineQuery, GetCareRecipientTimelineQueryVariables>(GetCareRecipientTimelineDocument, options);
      }
export function useGetCareRecipientTimelineLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCareRecipientTimelineQuery, GetCareRecipientTimelineQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCareRecipientTimelineQuery, GetCareRecipientTimelineQueryVariables>(GetCareRecipientTimelineDocument, options);
        }
export type GetCareRecipientTimelineQueryHookResult = ReturnType<typeof useGetCareRecipientTimelineQuery>;
export type GetCareRecipientTimelineLazyQueryHookResult = ReturnType<typeof useGetCareRecipientTimelineLazyQuery>;
export type GetCareRecipientTimelineQueryResult = Apollo.QueryResult<GetCareRecipientTimelineQuery, GetCareRecipientTimelineQueryVariables>;