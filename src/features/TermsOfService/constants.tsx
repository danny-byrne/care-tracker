/* eslint-disable max-len */
import { getClassNames } from './TermsOfService.classNames';
import { PRIVACY_AND_COOKIES_URI, TERMS_OF_USE_PDF_PATH } from 'src/app/Constants';

const classNames = getClassNames();

export const serviceTerms = {
    agreesHasConsentToManageLoveOnesHealth: {
        text: `I have received consent from my loved one that I can manage their health.`,
        isAgreedTo: false,
    },
    understandsNotPermittedToUsePlatformForMinors: {
        text: 'I understand that my loved one may not be under the age of 13.',
        isAgreedTo: false,
    },
    agreesToOpenAiUse: {
        text: `I understand that there are some features in this app that are powered by Azure OpenAI`,
        isAgreedTo: false,
    },
    understandsMicrosoftUseOfTheirData: {
        text: `I understand that Microsoft will not sell or distribute data to a third party or use it for advertising and marketing purposes.`,
        isAgreedTo: false,
    },
    understandsIntendedAppUse: {
        text: `I understand this is not intended to be a substitute for professional medical advice, diagnosis, or treatment.`,
        isAgreedTo: false,
    },
    agreesToTermsAndPrivacy: {
        text: (
            <div>
                I agree to the{' '}
                <a
                    className={classNames['wc-TermsOfService--link']}
                    href={PRIVACY_AND_COOKIES_URI}
                    target="_blank"
                    rel="noreferrer"
                >
                    {' '}
                    Privacy Policy
                </a>{' '}
                and{' '}
                <a
                    className={classNames['wc-TermsOfService--link']}
                    href={TERMS_OF_USE_PDF_PATH}
                    target="_blank"
                    rel="noreferrer"
                >
                    Terms of Use
                </a>
            </div>
        ),
        isAgreedTo: false,
    },
};
