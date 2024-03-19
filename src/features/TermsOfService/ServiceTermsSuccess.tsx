import React from 'react';
import { Stack, PrimaryButton, DefaultButton } from '@fluentui/react';
import { useNavigate } from 'react-router';

import RouterConfig from 'src/app/RouterConfig';
import { getClassNames } from './ServiceTermsSuccess.classNames';
import { SUPPORT_EMAIL } from 'src/app/Constants';
import { usePermissionsService } from 'src/services/PermissionsService';
import { Roles } from 'src/graphQL/serverMocks/graphQLGeneratedCode';

const classNames = getClassNames();
const supportEmailElement = (
    <div>
        <a href={`mailto:${SUPPORT_EMAIL}`} className={classNames['wc-ServiceTermsSuccess--link']}>
            windcrest-support@microsoft.com
        </a>
    </div>
);

const ServiceTermsSuccess: React.FC = () => {
    const navigate = useNavigate();
    const permissionsService = usePermissionsService();

    return (
        <div className={classNames['wc-ServiceTermsSuccess--pageContainer']}>
            <Stack className={classNames['wc-ServiceTermsSuccess--content']} tokens={{ childrenGap: 25 }}>
                <div className={classNames['wc-ServiceTermsSuccess--allSetText']}>
                    <span className={classNames['wc-ServiceTermsSuccess--boldText']}>All Set!</span> You are ready to
                    start organizing and coordinating your loved one&apos;s care
                </div>
                <Stack tokens={{ childrenGap: 20 }} className={classNames['wc-ServiceTermsSuccess--howToContent']}>
                    <div className={classNames['wc-ServiceTermsSuccess--boldText']}>How to manage your Circle</div>
                    <span>
                        Begin inviting friends and family to help with care and start adding health information of your
                        loved one.
                    </span>
                    <span>
                        You can change your mind and delete your Care Circle entirely by contacting{' '}
                        {supportEmailElement}
                    </span>
                </Stack>
                <Stack
                    horizontal
                    tokens={{ childrenGap: 20 }}
                    className={classNames['wc-ServiceTermsSuccess--buttonContainer']}
                >
                    <DefaultButton
                        text="Read FAQs"
                        className={classNames['wc-ServiceTermsSuccess--button']}
                        onClick={() => navigate(RouterConfig.TermsSuccessFAQ)}
                    />
                    <PrimaryButton
                        text="Get Started"
                        className={classNames['wc-ServiceTermsSuccess--button']}
                        onClick={() => {
                            // Check role
                            const roles = permissionsService.getPermissions();

                            switch (roles) {
                                case Roles.Pending:
                                    navigate(RouterConfig.PendingUserPage);
                                    break;
                                case Roles.Contributor:
                                    navigate(RouterConfig.GoalInfoTogetherTimeAdmin);
                                    break;
                                case Roles.Reader:
                                    navigate(RouterConfig.GoalInfoTogetherTimeMember);
                                    break;
                                default:
                                    navigate(RouterConfig.GetStarted);
                            }
                        }}
                    />
                </Stack>
            </Stack>
        </div>
    );
};

export default ServiceTermsSuccess;
