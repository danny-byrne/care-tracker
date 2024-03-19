import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useUpdatePermissions } from 'src/common/hooks/useUpdatePermissions';

import { Roles, useGetUserInfoQuery } from 'src/graphQL/serverMocks/graphQLGeneratedCode';
import { Text } from '@fluentui/react';
import FullScreenErrorModal from 'src/common/components/Feedback/FullScreenErrorModal';

import { getClassNames } from './PendingUserPage.classNames';

import { USER_MESSAGES } from 'src/app/Strings';
import RouterConfig from 'src/app/RouterConfig';

const PendingUserPage = () => {
    const classNames = getClassNames();

    const { data } = useGetUserInfoQuery();
    const permissions = useUpdatePermissions(data);
    const navigate = useNavigate();

    useEffect(() => {
        if (permissions !== Roles.Pending) {
            if (permissions === Roles.Contributor) {
                navigate(RouterConfig.GoalInfoTogetherTimeAdmin);
            } else if (permissions === Roles.Reader) {
                navigate(RouterConfig.GoalInfoTogetherTimeMember);
            }
        }
    }, [data]);

    // TODO: Style page correctly
    return (
        <div className={classNames['wc-PendingUserPage--pageContainer']}>
            <div className={classNames['wc-PendingUserPage--userDataContainer']}>
                {data && (
                    <Text className={classNames['wc-PendingUserPage--profileTextStyle']}>Hi {data.me.displayName}</Text>
                )}
                <div className={classNames['wc-PendingUserPage--userGreetingDialogStyle']}>
                    <p className={classNames['wc-PendingUserPage--loadingDialogStyle']}>
                        {USER_MESSAGES.PENDING_DIALOG}
                    </p>
                </div>
            </div>
            <FullScreenErrorModal />
        </div>
    );
};

export default PendingUserPage;
