import { useEffect, useState } from 'react';
import { useQueryStringParams } from 'src/common/hooks/useQueryStringParams';
import { useNavigate } from 'react-router-dom';
import { useFeedbackService } from 'src/services/FeedbackService';
import { useCanSeeInvites } from 'src/common/hooks/useCanSeeInvites';
import { useAddPanelControls } from 'src/common/hooks/useAddPanel';
import { useCopyLink } from 'src/common/helpers/copyCareCircleLink';
import { usePanelWidth } from 'src/common/hooks/usePanelWidth';
import { useIsMobile } from 'src/common/hooks/useMediaQueries';
import { usePermissionsService } from 'src/services/PermissionsService';
import { getClassNames as getFABClassNames } from 'src/common/components/FAB/FloatingActionButton.classNames';

import { Spinner, SpinnerSize, Stack, Panel, PanelType } from '@fluentui/react';
import { FloatingActionButton, CopyLinkFAB, EmailFAB } from 'src/common/components';
import { AddPanel } from 'src/common/components/Panel/AddPanel';
import MemberList from './MemberList';
import InviteList from './InviteList';
import MemberAdd from 'src/features/Members/MemberAdd';
import InviteApprove from '../Members/InviteApprove';

import { PanelStyleOverrides } from 'src/common/components/Panel/PanelStyleOverrides';
import { useGetCareCircleData } from 'src/common/hooks/useGetCareCircleData';
import { getClassNames } from './MemberList.classNames';
import { trackClick } from 'src/wcpConsentInit';
import { Roles } from 'src/graphQL/serverMocks/graphQLGeneratedCode';
import RouterConfig from 'src/app/RouterConfig';
import { CARE_TEAM_POLLING_INTERVAL } from 'src/app/Constants';

const MODE = 'mode';
const CAREGIVER_ID = 'careGiverId';
const APPROVE = 'approve';

const CareCircle = () => {
    const { getSearchParam, removeSearchParam } = useQueryStringParams();
    const { showAddPanel, hideAddPanel } = useAddPanelControls();
    const { copyLink, loading: copyLoading, generateLink } = useCopyLink();
    const { getPermissions } = usePermissionsService();

    const [fabOpen, setFabOpen] = useState(false);

    const navigate = useNavigate();
    const feedbackService = useFeedbackService();
    const canSeeInvites = useCanSeeInvites();
    const showApprove = getSearchParam(MODE) === APPROVE && getSearchParam(CAREGIVER_ID) !== null;
    const customWidth = usePanelWidth();
    const isMobile = useIsMobile();

    const classNames = getClassNames();
    const fabClassNames = getFABClassNames(false);

    const status = getSearchParam('status');
    useEffect(() => {
        if (status === 'added' || status === 'edited' || status === 'deleted') {
            removeSearchParam('status');
            feedbackService.setSuccessToast(`Member ${status}`);
        }
    });

    //Strip `mode` from deep-links. This restriction keeps the Back navigation stack healthy.
    useEffect(() => {
        if (getSearchParam(`mode`)) {
            removeSearchParam('mode');
        }
    }, []);

    const hideApprovePanel = () => {
        removeSearchParam(CAREGIVER_ID);
        removeSearchParam(MODE);
    };

    const TogetherTimeFab = () => {
        return (
            <>
                <Stack className={fabClassNames['wc-FloatingActionButton--fabContainer']}>
                    <FloatingActionButton
                        onClick={() => {
                            trackClick('fab');
                            setFabOpen(!fabOpen);
                            if (!fabOpen) {
                                generateLink();
                            }
                        }}
                        {...{ fabOpen }}
                    />
                </Stack>

                {fabOpen && (
                    <>
                        <CopyLinkFAB
                            onClick={() => {
                                trackClick('fab-copy-link');
                                copyLink();
                                setFabOpen(false);
                            }}
                            disabled={copyLoading}
                        />
                        <EmailFAB
                            onClick={() => {
                                trackClick('fab-email');
                                showAddPanel();
                                setFabOpen(false);
                            }}
                        />
                    </>
                )}
            </>
        );
    };

    const { careCircleId, careCircleMembers, invites, startPolling, stopPolling, error, loading } =
        useGetCareCircleData();

    useEffect(() => {
        startPolling(CARE_TEAM_POLLING_INTERVAL);
        return () => stopPolling();
    }, []);

    useEffect(() => {
        if (error) {
            feedbackService.setErrorToast(error.message);
        }
    }, [error]);

    if (loading) {
        return <Spinner className={classNames['wc-MemberList--careCircleSpinner']} size={SpinnerSize.large} />;
    }

    return (
        <div className={classNames['wc-MemberList--careCircleContainer']}>
            <Stack data-testid="careCircle">
                {canSeeInvites && invites?.length > 0 && (
                    <InviteList {...{ careCircleMembers, careCircleId, invites }} />
                )}
                {careCircleMembers?.length > 0 && (
                    <MemberList
                        careCircleId={careCircleId}
                        careCircleMembers={careCircleMembers}
                        onClick={(id) => navigate(RouterConfig.Member(id))}
                    />
                )}
                {isMobile && getPermissions() === Roles.Owner && <TogetherTimeFab />}
                <AddPanel>
                    <MemberAdd onDismiss={hideAddPanel} />
                </AddPanel>
                <Panel
                    data-testid={'approvePanel'}
                    isOpen={showApprove}
                    isLightDismiss
                    onDismiss={hideApprovePanel}
                    // Disabling navigation container to replace with header in form
                    onRenderNavigation={() => null}
                    onRenderHeader={() => null}
                    type={PanelType.custom}
                    hasCloseButton={false}
                    styles={PanelStyleOverrides}
                    customWidth={customWidth}
                >
                    <InviteApprove onDismiss={hideApprovePanel} />
                </Panel>
            </Stack>
        </div>
    );
};

export default CareCircle;
