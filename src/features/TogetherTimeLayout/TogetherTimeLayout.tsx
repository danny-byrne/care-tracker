import React, { useEffect } from 'react';
import { Stack } from '@fluentui/react';
import { useNavigate, useLocation } from 'react-router';
import { useQueryStringParams } from 'src/common/hooks/useQueryStringParams';

import { CareCircle } from 'src/features/Members';

import { TogetherTimeSubNavigationButtons } from './TogetherTimeLayout.config';
import RouterConfig from 'src/app/RouterConfig';
import SubHeaderWithSubNavLayout from 'src/common/components/Layout/SubHeaderWithSubNavLayout';

const MODE = 'mode';
const CAREGIVER_ID = 'careGiverId';
const APPROVE = 'approve';

interface TogetherTimeLayoutProps {
    children?: React.ReactNode;
}

interface TogetherTimeLayoutLocationState {
    careGiverId: string;
}

const TogetherTimeLayout: React.FC<TogetherTimeLayoutProps> = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { pathname } = location;
    const state = location.state as TogetherTimeLayoutLocationState;
    const { getSearchParam, addSearchParam, removeSearchParam } = useQueryStringParams();

    useEffect(() => {
        // state !== null means that a careGiverId was given through navigation state
        if (state) {
            addSearchParam({ mode: APPROVE, careGiverId: state.careGiverId });
            // Default page. TODO: save last selection in Local Storage (like useFilterState)
        } else if (pathname === RouterConfig.TogetherTimeLayout) {
            navigate(RouterConfig.Activities, { replace: true });
        }
    }, [pathname]);

    //Strip `mode` from deep-links. This restriction keeps the Back navigation stack healthy.
    useEffect(() => {
        if (getSearchParam(MODE)) {
            removeSearchParam(MODE);
        }
        if (getSearchParam(CAREGIVER_ID)) {
            removeSearchParam(CAREGIVER_ID);
        }
    }, []);

    return (
        <Stack>
            <SubHeaderWithSubNavLayout
                title={'Together Time'}
                buttons={TogetherTimeSubNavigationButtons}
                defaultKey={TogetherTimeSubNavigationButtons[0].key}
            >
                <Stack>{children ?? <CareCircle />}</Stack>
            </SubHeaderWithSubNavLayout>
        </Stack>
    );
};

export default TogetherTimeLayout;
