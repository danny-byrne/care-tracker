import { useIsMobile } from 'src/common/hooks/useMediaQueries';
import { useGetCareRecipientProfileQuery } from 'src/graphQL/serverMocks/graphQLGeneratedCode';

import { colors } from 'src/common/styles/colors';
import RouterConfig from 'src/app/RouterConfig';
import medManagerBackground from 'src/assets/GoalInfo/MM-BG-Info.png';
import GoalInfoLayout from './GoalInfoLayout';
import { useFeedbackService } from 'src/services/FeedbackService';
import { ERROR_MESSAGES } from 'src/app/Strings';

const GoalInfoMedManager = () => {
    const themeColor = colors.windcrest.goals.medicationManager;
    const isMobile = useIsMobile();

    const { setErrorToast } = useFeedbackService();

    const { data, loading } = useGetCareRecipientProfileQuery({
        onError: () => {
            setErrorToast(ERROR_MESSAGES.GET_CARE_RECIPIENT);
        },
    });

    const titleTextMobile = `Add ${data?.careRecipientProfile?.firstName}'s\n First Medication`;
    const titleTextDesktop = `Add ${data?.careRecipientProfile?.firstName}'s First Medication`;
    const titleText = isMobile ? titleTextMobile : titleTextDesktop;

    const subTitleTextMobile = `Keep track of medications in\n one place and set-up reminders.`;
    const subTitleTextDesktop = `Keep track of medications in one place and \nset-up reminders.`;
    const subTitleText = isMobile ? subTitleTextMobile : subTitleTextDesktop;

    const disclaimerTextMobile = `Any personal data or information about your
         loved one is secured. Only other caregivers that\n you designate will be able to access health data.`;
    const disclaimerTextDesktop = `Any personal data or information about your loved one is secured. Only other
    caregivers that you designate will be able to access health data.`;
    const disclaimerText = isMobile ? disclaimerTextMobile : disclaimerTextDesktop;

    const buttonText = 'Add medication';
    const route = RouterConfig.Medications;

    return (
        <GoalInfoLayout
            backgroundImage={medManagerBackground}
            {...{ titleText, subTitleText, disclaimerText, buttonText, themeColor, route, loading }}
            backButtonShown
        />
    );
};

export default GoalInfoMedManager;
