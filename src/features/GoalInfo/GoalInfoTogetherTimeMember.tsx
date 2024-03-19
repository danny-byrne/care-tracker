import { useEffect } from 'react';
import { useIsMobile } from 'src/common/hooks/useMediaQueries';
import { useNavigate } from 'react-router';
import { useHasCurrentUserOnboarded } from 'src/common/hooks/useHasCurrentUserOnboarded';

import { colors } from 'src/common/styles/colors';
import RouterConfig from 'src/app/RouterConfig';
import togetherTimeBackground from 'src/assets/GoalInfo/TT-BG-Info.png';
import GoalInfoLayout from './GoalInfoLayout';
import { LOCAL_STORAGE_KEYS } from 'src/app/Strings';

const GoalInfoTogetherTimeMember = () => {
    const themeColor = colors.windcrest.goals.togetherTime;
    const isMobile = useIsMobile();

    const navigate = useNavigate();
    const { hasOnboarded, hasOnboardedLoading } = useHasCurrentUserOnboarded();
    useEffect(() => {
        // Send user to Activities if they've already onboarded
        if (hasOnboarded) {
            localStorage.setItem(LOCAL_STORAGE_KEYS.HAS_ONBOARDED, 'true');
            navigate(RouterConfig.Activities);
        }
    }, [hasOnboarded, hasOnboardedLoading]);

    // Members cannot currently access Care Recipient's name
    // TODO: Update this to show name when backend support is set up
    const titleTextMobile = `Welcome to\n the Care Circle`;
    const titleTextDesktop = `Welcome to the Care Circle`;
    const titleText = isMobile ? titleTextMobile : titleTextDesktop;

    const subTitleTextMobile = `As a supporter you can sign up\nfor activities and spend more\ntime together`;
    const subTitleTextDesktop = `As a supporter you can sign up\nfor activities and spend more time together`;
    const subTitleText = isMobile ? subTitleTextMobile : subTitleTextDesktop;

    const buttonText = 'Get involved';
    const route = RouterConfig.Activities;

    return (
        <GoalInfoLayout
            backgroundImage={togetherTimeBackground}
            {...{ titleText, subTitleText, buttonText, themeColor, route }}
            loading={hasOnboardedLoading}
            showsPhoto
        />
    );
};

export default GoalInfoTogetherTimeMember;
