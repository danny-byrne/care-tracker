import React, { useState } from 'react';
import { serviceTerms } from './constants';
import { Checkbox, Stack, Text, PrimaryButton, Image } from '@fluentui/react';
import { useNavigate } from 'react-router';
import { getClassNames } from './TermsOfService.classNames';
import { useIsMobile } from 'src/common/hooks/useMediaQueries';
import {
    CareGiverConsentUpdateInput,
    useAgreeToTermsOfServiceMutation,
    useGetUserInfoQuery,
} from 'src/graphQL/serverMocks/graphQLGeneratedCode';

import termsIcon from 'src/assets/TermsOfService/TermsIcon.svg';
import { usePermissionsService } from 'src/services/PermissionsService';
import RouterConfig from 'src/app/RouterConfig';

const TermsOfService: React.FC = () => {
    const [terms, setTerms] = useState(serviceTerms);

    const classNames = getClassNames();
    const isMobile = useIsMobile();
    const { setAgreements } = usePermissionsService();
    const navigate = useNavigate();

    const { data: careGiverData, loading: loadingUserData } = useGetUserInfoQuery();

    const [agreeToTermsOfService, { loading: loadingAgreeing }] = useAgreeToTermsOfServiceMutation({
        onCompleted: (data) => {
            const result = data.careGiverConsentUpdate.result;
            // Update the permission service
            setAgreements(
                result.agreesHasConsentToManageLoveOnesHealth,
                result.agreesToTermsAndPrivacy,
                result.understandsIntendedAppUse,
                result.understandsMicrosoftUseOfTheirData,
                result.understandsNotPermittedToUsePlatformForMinors,
                result.agreesToOpenAiUse,
            );
            //Bypassing setting Notifications prefs until we get it sorted it out
            // navigate(RouterConfig.NotificationsSubscribe);
            navigate(RouterConfig.TermsSuccess);
        },
    });

    const agreeToTerms = () => {
        const input = {
            careGiverId: careGiverData.me.id,
            agreesHasConsentToManageLoveOnesHealth: terms.agreesHasConsentToManageLoveOnesHealth.isAgreedTo,
            agreesToTermsAndPrivacy: terms.agreesToTermsAndPrivacy.isAgreedTo,
            understandsIntendedAppUse: terms.understandsIntendedAppUse.isAgreedTo,
            understandsMicrosoftUseOfTheirData: terms.understandsMicrosoftUseOfTheirData.isAgreedTo,
            understandsNotPermittedToUsePlatformForMinors:
                terms.understandsNotPermittedToUsePlatformForMinors.isAgreedTo,
            agreesToOpenAiUse: terms.agreesToOpenAiUse.isAgreedTo,
        } as CareGiverConsentUpdateInput;
        agreeToTermsOfService({ variables: input });
    };

    const setTerm = (value, term) => {
        const termToUpdate = terms[term];
        termToUpdate.isAgreedTo = value;
        terms[term] = termToUpdate;
        setTerms({ ...terms });
    };

    const termsAreAgreedTo = Object.values(terms).every((term) => term.isAgreedTo);

    return (
        <div className={classNames['wc-TermsOfService--pageContainer']}>
            <Stack className={classNames['wc-TermsOfService--content']}>
                <Image
                    className={classNames['wc-TermsOfService--imageContainer']}
                    src={termsIcon}
                    alt="Windcrest header icon"
                    height={140}
                    width={140}
                />

                <Stack className={classNames['wc-TermsOfService--agreementsContainer']} tokens={{ childrenGap: 25 }}>
                    <Text className={classNames['wc-TermsOfService--privacyHeader']}>Privacy & Terms</Text>
                    {Object.keys(terms).map((term) => {
                        return (
                            <ServiceTerm
                                key={Math.random()}
                                text={terms[term].text}
                                isAgreedTo={terms[term].isAgreedTo}
                                onClick={(clicked) => setTerm(clicked, term)}
                            />
                        );
                    })}
                    <Stack
                        horizontal
                        horizontalAlign={isMobile ? 'center' : null}
                        verticalAlign="center"
                        tokens={{ childrenGap: 15 }}
                        className={classNames['wc-TermsOfService--buttonContainer']}
                    >
                        <PrimaryButton
                            text="Accept"
                            className={classNames['wc-TermsOfService--button']}
                            disabled={!termsAreAgreedTo || loadingAgreeing || loadingUserData}
                            onClick={() => agreeToTerms()}
                        />
                    </Stack>
                </Stack>
            </Stack>
        </div>
    );
};

export default TermsOfService;

interface IServiceTerm {
    text: string;
    isAgreedTo: boolean;
    onClick: (clicked) => void;
}

const ServiceTerm: React.FC<IServiceTerm> = ({ text, isAgreedTo, onClick }) => {
    const classNames = getClassNames();

    return (
        <Checkbox
            checked={isAgreedTo}
            onChange={(_, clicked) => onClick(clicked)}
            onRenderLabel={() => <Text className={classNames['wc-TermsOfService--termText']}>{text}</Text>}
        />
    );
};
