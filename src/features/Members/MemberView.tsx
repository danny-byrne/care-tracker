import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router';
import { useFeedbackService } from 'src/services/FeedbackService';
import { usePermissionsService } from 'src/services/PermissionsService';
import { useBoolean } from '@fluentui/react-hooks';
import { useQueryStringParams } from 'src/common/hooks/useQueryStringParams';
import { usePanelWidth } from 'src/common/hooks/usePanelWidth';
import { useIsMobile } from 'src/common/hooks/useMediaQueries';

import { Stack, Panel, PanelType } from '@fluentui/react';
import { FormErrorBar } from 'src/common/components/Form';
import RouterConfig from 'src/app/RouterConfig';
import MemberEdit from './MemberEdit';
import { Back, DeleteDialog } from 'src/common/components';
import { PagesWithDelete } from 'src/common/components/dialogs/DeleteDialog';
import { MemberReusableView } from './MemberReuseableView';
import MemberReuseableMobileView from './MemberReuseableMobileView';

import { Member } from 'src/types/Member';
import {
    CareGiver,
    Roles,
    useGetMemberQuery,
    useGetUserAppProfileInfoQuery,
    useRemoveMemberMutation,
} from 'src/graphQL/serverMocks/graphQLGeneratedCode';
import { getClassNames } from './MemberView.classNames';
import { LOCAL_STORAGE_KEYS } from 'src/app/Strings';

import { PanelStyleOverrides } from 'src/common/components/Panel/PanelStyleOverrides';

import SubHeaderLayout from 'src/common/components/Layout/SubHeaderLayout';

interface MemberLocationState {
    mode: string;
}

const MemberView = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { getSearchParam, removeSearchParam, addSearchParam } = useQueryStringParams();
    const feedbackService = useFeedbackService();
    const [hideDeleteDialog, { toggle: toggleHideDeleteDialog }] = useBoolean(true);
    const isMobile = useIsMobile();

    const customModalWidth = usePanelWidth();

    const permissionsService = usePermissionsService();
    const userRole = permissionsService.getPermissions();
    const careCircleId = localStorage.getItem(LOCAL_STORAGE_KEYS.CARE_CIRCLE_ID);

    const status = getSearchParam('status');

    const location = useLocation();
    const state = location.state as MemberLocationState;

    useEffect(() => {
        if (state?.mode === 'edit') {
            showEditPanel();
        }
    }, []);

    useEffect(() => {
        if (status === 'edited') {
            removeSearchParam('status');
            feedbackService.setSuccessToast(`Member ${status}`);
        } else if (status === 'editFailed') {
            removeSearchParam('status');
            feedbackService.setErrorToast(`Member edit failed`);
        }
    });

    const classNames = getClassNames();

    const { loading, error, data } = useGetMemberQuery({
        variables: { id },
        onError: () => {
            feedbackService.setErrorToast(error.message);
        },
    });

    const { data: currentUserData } = useGetUserAppProfileInfoQuery({
        skip: userRole !== Roles.Reader,
    });

    const [removeCareGiver, { error: removeMemberError }] = useRemoveMemberMutation({
        variables: { input: { careGiverId: id, careCircleId } },
        onError: (error) => {
            feedbackService.setErrorToast(error.message);
        },
        onCompleted: () => {
            navigate(RouterConfig.Members + '?status=deleted', { replace: true });
        },
    });

    const memberQL = data?.usersCareCircle?.careCircleMembers?.[0]?.careGiver ?? ({} as CareGiver);

    const member: Member = {
        ...memberQL,
        profile: { role: data?.usersCareCircle?.careCircleMembers?.[0]?.profile?.role },
    };

    const ownerViewingLowerPermission =
        userRole === Roles.Owner && (member.profile.role === Roles.Contributor || member.profile.role === Roles.Reader);

    const adminViewingLowerOrEqualPermission =
        userRole === Roles.Contributor &&
        (member.profile.role === Roles.Contributor || member.profile.role === Roles.Reader);

    const ownerViewingSelf = userRole === Roles.Owner && member.profile.role === Roles.Owner;
    const userViewingSelf = currentUserData?.me?.id === member.id;

    const canRemoveMember: boolean = ownerViewingLowerPermission;

    const canEditMember: boolean =
        ownerViewingLowerPermission || adminViewingLowerOrEqualPermission || ownerViewingSelf || userViewingSelf;

    const canEditTimeZone = ownerViewingSelf || userViewingSelf;

    // Strip `mode` from deep-links. This restriction keeps the
    // Back navigation stack in a healthy state.
    useEffect(() => {
        if (getSearchParam('mode')) removeSearchParam('mode');
    }, []);

    // If not from a deep-link, though, go ahead and open the Add modal
    // if necessary.

    // TODO: Add a 404.

    const showEdit = getSearchParam('mode') === 'edit';
    const hideEditPanel = () => removeSearchParam('mode');

    const onDelete = canRemoveMember ? toggleHideDeleteDialog : undefined;

    const showEditPanel = () => addSearchParam({ mode: 'edit' });
    const onClickActionButton = canEditMember ? showEditPanel : undefined;
    const actionButtonText = canEditMember ? 'Edit' : undefined;

    const userData = data?.usersCareCircle?.careCircleMembers[0];

    return (
        <SubHeaderLayout
            title={'Profile'}
            actionButtonText={actionButtonText}
            onClickActionButton={onClickActionButton}
            onDelete={onDelete}
        >
            <Stack data-testid="memberView">
                <div>
                    <DeleteDialog
                        hidden={hideDeleteDialog}
                        toggleHideDialog={onDelete}
                        onDelete={removeCareGiver}
                        screen={PagesWithDelete.member}
                    >
                        Delete
                    </DeleteDialog>
                    <FormErrorBar error={removeMemberError?.message} />
                </div>

                {isMobile && (loading || !userData) && <div>Loading...</div>}

                {isMobile && !loading && userData && (
                    <>
                        <Back style={{ padding: '1rem 0 0 1.5rem' }} />
                        <MemberReuseableMobileView
                            {...{ userData, onDelete, canEditMember, canEditTimeZone }}
                            isEdit={false}
                        />
                    </>
                )}

                {!isMobile && (
                    <>
                        {loading ? (
                            <div>Loading...</div>
                        ) : (
                            <>
                                <Back />

                                {userData && (
                                    <Stack className={classNames['wc-MemberView--memberCardAndActions']}>
                                        <MemberReusableView isEdit={false} userData={userData} />
                                    </Stack>
                                )}
                            </>
                        )}
                    </>
                )}

                <Panel
                    isOpen={showEdit}
                    isLightDismiss
                    hasCloseButton={false}
                    onDismiss={hideEditPanel}
                    onRenderNavigation={() => null}
                    onRenderHeader={() => null}
                    styles={PanelStyleOverrides}
                    data-testid="editPanel"
                    type={PanelType.custom}
                    customWidth={customModalWidth}
                    allowTouchBodyScroll
                >
                    {userData && (
                        <MemberEdit onDismiss={hideEditPanel} userData={userData} canEditTimeZone={canEditTimeZone} />
                    )}
                </Panel>
            </Stack>
        </SubHeaderLayout>
    );
};

export default MemberView;
