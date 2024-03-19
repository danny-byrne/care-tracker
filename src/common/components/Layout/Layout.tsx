import React, { useState } from 'react';
import { useLocation } from 'react-router';
import { Stack } from '@fluentui/react';

import { useIsMobile } from 'src/common/hooks/useMediaQueries';
import { useFeedbackService } from 'src/services/FeedbackService';
import { useQueryStringParams } from 'src/common/hooks/useQueryStringParams';
import { useConnectToSignalR } from 'src/common/hooks/useConnectToSignalR';
import { SideMenu, BottomMenu } from 'src/common/components/Navigation';
import WindcrestPageHeader from 'src/common/components/WindcrestPageHeader';
import FullScreenErrorModal from 'src/common/components/Feedback/FullScreenErrorModal';
import Toast from 'src/common/components/Feedback/Toast';
import AppProfile from 'src/features/AppProfile';
import { AnnotationInput } from 'src/features/Annotations';
import { getClassNames } from './Layout.classNames';
import ClearCareCircleModal from '../ReusableModal/ClearCareCircleModal';
import ComingSoonModal from '../ReusableModal/ComingSoonModal';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
import RouterConfig from '../../../app/RouterConfig';
import DocumentQuestionInput from 'src/features/Documents/DocumentQuestionInput';
import { useFeatureFlags } from 'src/common/hooks/useFeatureFlags';

interface LayoutProps {
    children: React.ReactNode;
    title?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, title }) => {
    const isMobile = useIsMobile();
    const { getSearchParam, addSearchParam, removeSearchParam } = useQueryStringParams();
    const feedbackService = useFeedbackService();
    const location = useLocation();

    const classNames = getClassNames();

    const isPanelOpen = getSearchParam('appProfile') !== null;
    const showAppProfile = () => addSearchParam({ appProfile: 'menu' });
    const hidePanel = () => removeSearchParam('appProfile');

    const [showClearCareCircle, setShowClearCareCircle] = useState(false);
    const [showComingSoon, setShowComingSoon] = useState(false);

    useConnectToSignalR();

    const windcrestPageHeader = (
        <ErrorBoundary>
            <WindcrestPageHeader {...{ showAppProfile }} mobileTitle={title} />
        </ErrorBoundary>
    );

    const { annotationState } = useFeatureFlags();

    const annotationEnabled = annotationState;

    return (
        <div className={classNames['wc-Layout--appBody']}>
            {!isMobile && windcrestPageHeader}
            <ErrorBoundary>
                <Stack className={classNames['wc-Layout--pageAndNavigationContainer']}>
                    {isMobile && windcrestPageHeader}
                    {!isMobile && <SideMenu />}
                    <div className={classNames['wc-Layout--page']}>{children}</div>
                </Stack>
                {isMobile && (
                    <div className={classNames['wc-Layout--footerContainer']}>
                        {location.pathname === RouterConfig.Home && annotationEnabled && <AnnotationInput />}
                        {/* Extra / used to designate single document page, 
                        Document route can't be used due to id in route */}
                        {location.pathname.includes(`${RouterConfig.Documents}/`) &&
                            !location.pathname.includes('detail') && <DocumentQuestionInput />}
                        <BottomMenu />
                    </div>
                )}
            </ErrorBoundary>
            <ErrorBoundary>
                <FullScreenErrorModal />
            </ErrorBoundary>
            <ErrorBoundary>
                <ClearCareCircleModal showModal={showClearCareCircle} setShowModal={setShowClearCareCircle} />
            </ErrorBoundary>
            {/* ComingSoonModal will be removed once all AppProfile menu items are implemented */}
            <ErrorBoundary>
                <ComingSoonModal showModal={showComingSoon} setShowModal={setShowComingSoon} />
            </ErrorBoundary>
            <ErrorBoundary>
                <AppProfile {...{ isPanelOpen, hidePanel }} />
            </ErrorBoundary>
            {feedbackService.hasToast && <Toast />}
        </div>
    );
};

export default Layout;
