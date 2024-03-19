import { useIsMobile } from 'src/common/hooks/useMediaQueries';

import { colors } from 'src/common/styles/colors';
import RouterConfig from 'src/app/RouterConfig';
import carePlanBackground from 'src/assets/GoalInfo/CP-BG-Info.png';
import GoalInfoLayout from './GoalInfoLayout';

const GoalInfoCarePlan = () => {
    const themeColor = colors.windcrest.goals.carePlan;
    const isMobile = useIsMobile();

    const titleTextMobile = `Let's Start\n Collecting Health\n Information`;
    const titleTextDesktop = `Let's Start Collecting\n Health Information`;
    const titleText = isMobile ? titleTextMobile : titleTextDesktop;

    const subTitleTextMobile = `Always be prepared with the\n health information you need.`;
    const subTitleTextDesktop = `Always be prepared with the health\n information you need.`;
    const subTitleText = isMobile ? subTitleTextMobile : subTitleTextDesktop;

    const disclaimerTextMobile = `Any personal data or information about your
         loved one is secured. Only other caregivers that\n you designate will be able to access health data.`;
    const disclaimerTextDesktop = `Any personal data or information about your loved one is secured. Only other 
    caregivers that you designate will be able to access health data.`;
    const disclaimerText = isMobile ? disclaimerTextMobile : disclaimerTextDesktop;

    const buttonText = 'Looks good';
    const route = RouterConfig.GetStartedRecipientProfile;

    return (
        <GoalInfoLayout
            backgroundImage={carePlanBackground}
            {...{ titleText, subTitleText, disclaimerText, buttonText, themeColor, route }}
            backButtonShown
        />
    );
};

export default GoalInfoCarePlan;
