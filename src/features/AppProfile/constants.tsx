/* eslint-disable*/
import { getClassNames } from './FrequentlyAskedQuestions.classNames';
const classNames = getClassNames();
import { SUPPORT_EMAIL, PRIVACY_AND_COOKIES_URI } from 'src/app/Constants';

const supportEmailElement = (
    <span>
        <a href={`mailto:${SUPPORT_EMAIL}`} className={classNames['wc-FAQ--link']}>
            {SUPPORT_EMAIL}
        </a>
    </span>
);

// TODO: replace with getTimezone/region function once it is available in the backend
export const timeZone = 'America/Denver';
export const locale = 'en-US';

export const faqText = [
    {
        question: `What is Windcrest?`,
        answer: `Windcrest is a platform that allows caregivers the ability to organize information related to the caregiving and to collaborate with other care supporters. Windcrest helps to connect you (whether you are a caregiver, care recipient, or a care supporter) together by allowing you to create or join a care team (“Care Circle”) in order to facilitate the family or community caretaking. Windcrest also helps to facilitate communication among members of the Care Circle. Examples of ways that Windcrest can help support caretaking is by helping you track medications, organize important documents, schedule activities, and care for your loved one all in one place. Our service is directed to persons 18 years of age or older who are residents of the United States of America (“US”). If you are under age 18 or you are not a resident of the US you are not permitted to use the Windcrest platform or to submit any personally identifiable information about any individuals under the age of 13.`,
    },
    {
        question: `What data will be collected when I create an Individual Profile or a Care Circle?`,
        answer: (
            <div>
                <span>
                    When you join Windcrest, you will be able to create a personal profile (“Individual Profile”) on
                    behalf of yourself or your loved one (a care recipient). If you are not responding to an invite from
                    someone who has already established a Windcrest Care Circle and are creating a new Care Circle, your
                    profile will be designated as the Care Circle creator (<b>{'“Care Circle Creator”'}</b>). If you are
                    responding to an invite from another Windcrest user, you have the ability to create an Individual
                    Profile and join an existing Care Circle. You may also be designated as a “Care Circle
                    Administrator” if invited by the Care Circle Creator. In order to help caretakers and care
                    supporters collaborate, Windcrest allows users that belong to the same Care Circle to upload and
                    share information about your loved ones. If you invite and accept other users into your Care Circle,
                    they may be able to see information associated with your Care Circle (see the “who can see your
                    data” section for details about user privilege).
                </span>

                <div>Additionally, if you are a Care Circle Creator or Administrator, you will be able to: </div>
                <ul>
                    <li>
                        manage the information associated with your Care Circle (including the ability to edit and
                        delete any information [associated with your Care Circle][uploaded to Individual Profiles in
                        your Care Circle]).{' '}
                    </li>
                    <li>
                        remove members from your Care Circle at any time (see the “who can see your data” section for
                        details about user privilege).{' '}
                    </li>
                </ul>
            </div>
        ),
    },
    {
        question: `Who can see this data?`,
        answer: (
            <div>
                When you accept (by invite only) a user into your Care Circle, they [will][may] be able to see the
                information you have provided about your loved one associated with your Care Circle. Care Circle members
                will be classified as one of the following types of accounts (each with different access privileges):
                Care Circle Creators, Care Circle Administrators, or Care Circle Readers. Only Care Circle Creators and
                Care Circle Administrators will have access to more sensitive information associated with your Care
                Circle (such as information about your loved one’s health and medications). Care Circle Readers will
                only have access to scheduling functionality and events related to your Care Circle. While security is a
                priority for us and we follow security standards when storing information associated with your
                Individual Profile and Care Circle, we cannot always identify if an individual has obtained an invite to
                your Care Circle through proper means. If you are a Care Circle Creator or Administrator, please
                remember to review the members of your Care Circle from time to time and what information those members
                can view [through the settings associate with your Care Circle]. If you have any questions about your
                privacy or how we store your information, please contact us at {supportEmailElement} or refer to our
                Privacy Policy.
            </div>
        ),
    },
    {
        question: `How will the data be used?`,
        answer: `Data will be used to help support your Care Circle and by enabling collaboration, organization and communication across a Care Circle. For more details about how your data may be used, please see our Privacy Policy.`,
    },
    {
        question: `How is Data Protected?`,
        answer: (
            <div>
                Security is important to us. For more information about how we protect your data, please see the{' '}
                <a href={PRIVACY_AND_COOKIES_URI} className={classNames['wc-FAQ--link']}>
                    Microsoft Privacy Statement and our Privacy Policy.
                </a>
            </div>
        ),
    },
    {
        question: `Who can be added to the Care Circle?`,
        answer: `You can invite friends and family to join your Care Circle. Please note that anyone who wants to use the Windcrest platform will be required to have or create a Microsoft account to sign up. Currently, only individual caregivers, care recipients and care supporters are permitted to use the Windcrest platform and we do not currently permit other entities that may be related to your caregiving to join our platform (such as healthcare providers or pharmacies). `,
    },
    {
        question: `How can someone be invited to the Care Circle?`,
        answer: `As a Care Circle Creator you can invite friends and family via an email invite. Only a Care Circle Creator will be able to approve new members invited to join a Care Circle. `,
    },
    {
        question: 'How many people are allowed to join a Care Circle? ',
        answer: 'Any number of people can be invited and added to a Care Circle. The Care Circle Creators or Administrators can manage the access permissions granted to each member of the Care Circle [at any time]. ',
    },
    {
        question: 'What if I no longer want to participate in a Care Circle? ',
        answer: (
            <div>
                If you are a Care Circle Administrator, you can delete your Individual Profile by visiting your contact
                card in Care Circle. If you are a Care Circle Reader, you can request to have your Individual Profile
                deleted by notifying either a Care Circle Administrator or Creator (owner of the team) or by contacting
                us at <span>{supportEmailElement}</span>.
            </div>
        ),
    },
    {
        question: `Who can I contact if I have questions about my data?`,
        answer: supportEmailElement,
    },
    {
        question: `Who can I contact if I want to archive my Circle?`,
        answer: supportEmailElement,
    },
    {
        question: `How do I change my profile details? `,
        answer: 'Our app uses the profile details information stored in the Microsoft Account that you signed up with into Windcrest created your Windcrest profile details (we use First/Last Name, Profile Picture and Email address). To change your Windcrest profile details, please visit the Microsoft account that you signed up with and change your information there. These changes will be reflected in your Windcrest Profile within 72 hours. ',
    },
];

export const medManagerFaqText = [
    {
        question: 'What does the Frequency “Repeat days” mean? ',
        answer: 'If you want to be reminded at a specific frequency, the Repeat Days frequency allow you to set reminders for medications that need to be taken a specific day, every week. For example, if you want to set a reminder for a medication for every Monday. ',
    },
    {
        question: 'What does Frequency “Custom” mean? ',
        answer: 'For medications that may have dosing instructions that vary from day to day, the Custom frequency may be a good option (medications such as a z-pack). ',
    },
    {
        question: 'Can I change reminder details or information related to a medication once I’ve added it? ',
        answer: 'Yes. If you would like to change information about a medication you have provided, navigate to its page, and click on “edit.” You can edit information related to a medication or delete a medication, but you cannot change the medication’s name itself. ',
    },
    {
        question: 'Can I upload images of medications? ',
        answer: 'Not currently. ',
    },
    {
        question: 'Can I add multiple conditions associated with a medication? ',
        answer: 'Not currently. ',
    },
];

export const carePlanFaqText = [
    {
        question: 'Who has access to Care Plan? ',
        answer: 'Only Care Circle Creators and Administrators can access the Care Plan feature in a Care Circle. Care Circle Readers will not be able to view a Care Plan. ',
    },
    {
        question: 'What is a Care Plan and what can I use it for? ',
        answer: `Our Care Plan functionality is designed to allow you to organize information about your loved one’s care all in one place. This may include information related to your loved one’s health and care. You can use this information to help you manage care activities, including during a doctor's visit or you can use it to collaborate with other care supporters and share. `,
    },
    {
        question: 'Can I associate a pharmacy from Care Plan with medications I have uploaded to Med Tracker? ',
        answer: 'Yes, you can. You may add an associated pharmacy to a Care Plan and then edit or add a new medication. You will see an option to associate a “Pharmacy” associated with your Care Plan with a medication. ',
    },
    {
        question: 'Can I associate a health condition from Care Plan with medications in Med Tracker? ',
        answer: 'Yes, you can. You may add a health condition to a Care Plan and then edit or add a new medication. You will see an option to associate a health condition with medication. ',
    },
    {
        question: 'If I don’t remember when my loved one’s immunization was received, what do I do? ',
        answer: `If you don’t remember when the immunization was received, you should try to select at least the year. If you don’t remember the exact year, you can choose General Timeframe to see a drop-down of time frame options. `,
    },
];

const personalDataListElements = [
    `Credentials (MSA account integration)`,
    `Credentials (MSA account integration) `,
    `User Content`,
    `Customer Contact information`,
    `Device Connectivity and Configuration Data `,
    `Demographic Information `,
    `Personal Health Data & Medical Records `,
    `Support Interactions `,
    `Product and Service Usage `,
    `Support Content `,
    `Feedback `,
    `Software Setup and Inventory Data`,
];

const getPersonalDataList = () => {
    return (
        <div>
            <ul>
                {personalDataListElements.map((el, index) => {
                    return <li key={index}>{el}</li>;
                })}
            </ul>
        </div>
    );
};

const personalDatList = getPersonalDataList();

export const termsText = [
    {
        text: `Overview. These terms of use (these “Terms”) are an agreement between “you” and Microsoft Corporation (“Microsoft” or “we” or “us”). The Windcrest platform enables your use of the limited preview version of Microsoft’s Windcrest services and related materials (together, the “Service”). The Service allows caregivers the ability to organize information related to the caregiving and to collaborate with other care supporters by connecting caregivers, care recipients, and care supporters and allowing them to create a care team through the Service (“Care Circle”). These Terms also apply to any Microsoft software updates (except to the extent updates are accompanied by new or additional terms, in which case those different terms apply prospectively and do not alter your or Microsoft’s rights relating to pre-updated software). THE SERVICE IS A PRE-RELEASE VERSION AND IS BEING PROVIDED TO YOU FOR PURPOSES OF EVALUATION.`,
    },
    {
        text: `When registering for the Service, a user will have the option to create an Individual Profile (as defined below) on behalf of themselves or a loved one (a care recipient). If a user is not responding to an invite from an existing Care Circle and is creating a new Care Circle, the user’s Individual Profile will be designated as the Care Circle creator (“Care Circle Creator”). If a user is responding to an invite from an existing user of the Service, the user will be able to respond to an invite and to create an Individual Profile to join an existing Care Circle through the Service. Users may also be designated as a “Care Circle Administrator” if so designated by the Care Circle Creator.`,
    },

    {
        text: `These Terms incorporate the Microsoft Services Agreement, which includes, among other things, legal terms that govern your Microsoft account, privacy, and, FOR U.S. RESIDENTS ONLY, A BINDING ARBITRATION CLAUSE AND CLASS ACTION WAIVER THAT AFFECTS HOW YOU RESOLVE DISPUTES WITH MICROSOFT. PLEASE SEE SECTION 15 OF THE MICROSOFT SERVICES AGREEMENT FOR ADDITIONAL DETAILS.`,
    },
    {
        text: `You accept these Terms if you use the Service by creating an Individual Profile and/or a Care Circle, or if you use any feature or functionality of the Service. Microsoft may update these Terms, in which case we will include a notice within the Service about the updated Terms. If you don’t accept the Terms, you must stop using the Service. `,
    },
    {
        text: `The Code of Conduct in the Microsoft Services Agreement also apply to use of the Service. Please read them and report any abuse to us by contacting us at windcrest-support@microsoft.com `,
    },
    {
        text: `Additional Privacy Terms for Users of the Service. The following terms have the meaning set forth below when used in these Terms: `,
    },
    {
        text: `“Data Protection Law” means any law, rule, regulation, decree, statute, or other enactment, order, mandate or resolution relating to data security, data protection and/or privacy, and any implementing, derivative or related legislation, rule, regulation, and regulatory guidance, as amended, extended, repealed and replaced, or re-enacted. For purposes of clarity, Data Protection Law includes the California Consumer Privacy Act (CCPA). `,
    },
    {
        text: `“Personal Data” means any information relating to an identified or identifiable natural person (“Data Subject”) and any other data or information that constitutes personal data or personal information under any applicable Data Protection Law, including photos containing images of identified or identifiable natural persons. An identifiable natural person is one who can be identified, directly or indirectly, in particular by referencing an identifier such as a name, an identification number, location data, an online identifier, or to one or more factors specific to the physical, physiological, genetic, mental, economic, cultural, or social identity of that natural person. `,
    },
    {
        text: `“Processing” means any operation or set of operations that is performed on Personal Data, whether or not by automated means, such as collection, recording, organization, structuring, storage, adaptation or alteration, retrieval, consultation, use, disclosure by transmission, dissemination, or otherwise making available, alignment or combination, restriction, erasure, or destruction. “Process” and “Processed” will have corresponding meanings. `,
    },
    {
        text: `Microsoft is the data controller for the following Personal Data collected by the Service: `,
    },
    {
        text: personalDatList,
    },
    {
        text: `Personal Data for which Microsoft is the data controller is governed by the terms of the Microsoft Privacy Statement and by these Additional Privacy Provisions for Users of the Service.  `,
    },
    {
        text: `Other Terms and Conditions that Apply to All Uses of the Service. `,
    },
    {
        text: `Permitted Users of our Service. Our Service is directed to persons 18 years of age or older who are residents of the United States of America (“US”). If you are under age 18, or you are not a resident of the US, you are not permitted to use the Windcrest [platform] or to submit any personally identifiable information to the Site or our Service. You are also not permitted to upload or submit any personally identifiable information about any individuals under the age of 13. `,
    },
    {
        text: `Individual Profiles. When you use our Service, you may be creating and maintaining, on behalf of yourself or another person, an individual site within the application (“Individual Profile”). In order to create an Individual Site on behalf of someone else, you need to have their express permission. If they are not able to provide permission due to their circumstances (e.g., illness), you must be authorized to act on behalf of the person for whom the Individual Profile is created or have the permission of a person authorized to act on that person's behalf. Access to each Individual Profile is by invitation only; more details may be found in our FAQ.`,
    },
    {
        text: `Software Terms.`,
    },
    {
        terms: `Third Party Software. The software may include third party applications that are licensed to you under this agreement or under their own terms. License terms, notices, and acknowledgments, if any, for the third party applications may be accessible online at http://aka.ms/thirdpartynotices or in an accompanying notices file. Even if such applications are governed by other agreements, the disclaimer [, limitations on, and exclusions of damages] below also apply to the extent allowed by applicable law.`,
    },
    {
        terms: `Scope of license to Software. The software is licensed, not sold. Microsoft reserves all other rights in the software. `,
    },
    {
        terms: `Export Restrictions. You must comply with all domestic and international export laws and regulations that apply to the software, which include restrictions on destinations, end users, and end use. For further information on export restrictions, visit http://aka.ms/exporting. `,
    },
    {
        terms: `Updates. The software may periodically check for updates and download and install them for you. You may obtain updates only from Microsoft or authorized sources. Microsoft may need to update your system to provide you with updates. You agree to receive these automatic updates without any additional notice. Updates may not include or support all existing software features, services, or peripheral devices.`,
    },
    {
        terms: `No Medical Advice. `,
    },
    {
        terms: `YOU ARE RESPONSIBLE FOR USE OF OUR SERVICE EITHER ON YOUR BEHALF OR ON BEHALF OF ANOTHER INDIVIDUAL. ALL DISCLAIMERS INCLUDED HEREIN APPLY TO ALL USES BY YOU. WE DO NOT DISPENSE MEDICAL, DIAGNOSIS OR TREATMENT ADVICE. IF YOU THINK YOU OR YOUR LOVED ONE MAY BE HAVING A MEDICAL EMERGENCY, CALL YOUR DOCTOR OR 911 IMMEDIATELY. DO NOT DISREGARD, AVOID OR DELAY GETTING MEDICAL OR HEALTH-RELATED ADVICE FROM A HEALTHCARE PROFESSIONAL BECAUSE OF SOMETHING YOU MAY HAVE READ ON THIS SITE OR THROUGH OUR SERVICE. THE INFORMATION AND SERVICES MADE AVAILABLE ON THIS SITE ARE FOR INFORMATIONAL AND CAREGIVER SUPPORT PURPOSES ONLY AND ARE NOT (AND SHOULD NOT BE USED AS) A SUBSTITUTE FOR PROFESSIONAL MEDICAL ADVICE, TREATMENT OR DIAGNOSIS. `,
    },
    {
        terms: `Always seek the advice of a qualified medical provider with any questions you may have about your health or the health of a loved one and before undertaking or changing a course of medical treatment, making any changes to a course of medication, accessing health-related resources, or engaging with any features made available to you through our Service. Nothing on this Site or available through our Service is intended or should be taken to be the practice of medical or counseling care. For purposes of these Terms, the practice of medical or counseling care includes, without limitation, psychiatry, psychology, medical, nursing, or professional healthcare advice or services, or the practice of medicine, nursing, or professional healthcare, psychotherapy, or providing healthcare treatment, instructions, diagnosis, prognosis or advice. You should confirm all healthcare-related information with healthcare professionals before making healthcare-related decisions. `,
    },
    {
        terms: `No Physician-Patient Relationship is Established: No Endorsements. Your use of this Site and our Service does not create in any way a physician-patient relationship between you and/or a loved one, any sort of confidential, fiduciary or professional relationship, or any other special relationship that would give rise to any duties on our part. We do not recommend or endorse any specific medications, healthcare providers, pharmacies, course of action or treatment plans for health conditions, treatments or opinions, service providers, or other information that may appear on the Site or through our Service. If you rely on any of the information provided by this Site or through our Service, or by, you do so solely at your own risk.  `,
    },
    {
        terms: ``,
    },
    {
        terms: ``,
    },
    {
        terms: ``,
    },
    {
        terms: ``,
    },
    {
        terms: ``,
    },
    {
        terms: ``,
    },
    {
        terms: ``,
    },
    {
        terms: ``,
    },
    {
        terms: ``,
    },
    {
        terms: ``,
    },
];
