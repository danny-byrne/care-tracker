import React, { useEffect } from 'react';
import carePlanBackgroundMobile from 'src/assets/Goals/CP-BG-Mobile.png';
import medManagerBackgroundMobile from 'src/assets/Goals/MM-BG-Mobile.png';
import togetherTimeBackgroundMobile from 'src/assets/Goals/TT-BG-Mobile.png';
import carePlanBackgroundDesktop from 'src/assets/Goals/CP-BG-Desktop.png';
import medManagerBackgroundDesktop from 'src/assets/Goals/MM-BG-Desktop.png';
import togetherTimeBackgroundDesktop from 'src/assets/Goals/TT-BG-Desktop.png';

import { DefaultButton, Stack, Text } from '@fluentui/react';
import { colors } from 'src/common/styles/colors';
import { getClassNames } from './GoalsPage.classNames';
import { useNavigate } from 'react-router';
import RouterConfig from 'src/app/RouterConfig';
import { useIsMobile } from 'src/common/hooks/useMediaQueries';
import { useHasCurrentUserOnboarded } from 'src/common/hooks/useHasCurrentUserOnboarded';
import { LOCAL_STORAGE_KEYS } from 'src/app/Strings';

const GoalsPage = () => {
    const navigate = useNavigate();
    const classNames = getClassNames();

    const isMobile = useIsMobile();

    const HEADER_TEXT = 'Next, choose one';
    const SUBHEADER_TEXT = 'What is your main goal?';

    const { hasOnboarded, hasOnboardedLoading } = useHasCurrentUserOnboarded();

    useEffect(() => {
        // Send user to Care Plan if they've already onboarded
        if (hasOnboarded) {
            localStorage.setItem(LOCAL_STORAGE_KEYS.HAS_ONBOARDED, 'true');
            navigate(RouterConfig.CarePlan);
        }
    }, [hasOnboarded, hasOnboardedLoading]);

    const GoalStack = () => {
        const CP_TEXT = 'Organize Health \nInformation';
        const MM_TEXT = `Track \nMedications`;
        const TT_TEXT = 'Get Others to Spend \nMore Time';

        const CP_Image = isMobile ? carePlanBackgroundMobile : carePlanBackgroundDesktop;
        const MM_Image = isMobile ? medManagerBackgroundMobile : medManagerBackgroundDesktop;
        const TT_Image = isMobile ? togetherTimeBackgroundMobile : togetherTimeBackgroundDesktop;

        return (
            <Stack className={classNames['wc-GoalsPage--goalStackContainer']} tokens={{ childrenGap: 16 }}>
                <GoalChoice
                    backgroundImage={CP_Image}
                    text={CP_TEXT}
                    themeColor={colors.windcrest.goals.carePlan}
                    onClick={() => navigate(RouterConfig.GoalInfoCarePlan)}
                />
                <GoalChoice
                    backgroundImage={MM_Image}
                    text={MM_TEXT}
                    themeColor={colors.windcrest.goals.medicationManager}
                    onClick={() => navigate(RouterConfig.GoalInfoMedManager)}
                />
                <GoalChoice
                    backgroundImage={TT_Image}
                    text={TT_TEXT}
                    themeColor={colors.windcrest.goals.togetherTime}
                    onClick={() => navigate(RouterConfig.GoalInfoTogetherTimeAdmin)}
                />
            </Stack>
        );
    };

    interface IGoalChoiceProps {
        backgroundImage: string;
        text: string;
        themeColor: string;
        onClick: () => void;
    }

    const GoalChoice: React.FC<IGoalChoiceProps> = ({ backgroundImage, text, themeColor, onClick }) => {
        const BUTTON_TEXT = `Let's Go`;

        return (
            <Stack
                className={classNames['wc-GoalsPage--goalChoiceContainer']}
                style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover' }}
            >
                <Stack className={classNames['wc-GoalsPage--goalChoiceSubContainer']} tokens={{ childrenGap: '16px' }}>
                    <Text style={{ color: themeColor }} className={classNames['wc-GoalsPage--goalChoiceText']}>
                        {text}
                    </Text>
                    <DefaultButton
                        onClick={onClick}
                        className={classNames['wc-GoalsPage--goalChoiceButton']}
                        // Theming overrides need to be handled in styles prop
                        styles={{
                            root: { color: themeColor, borderColor: themeColor, background: 'white' },
                            rootHovered: {
                                borderColor: themeColor,
                                color: themeColor,
                                background: 'white',
                            },
                            rootPressed: {
                                borderColor: themeColor,
                                color: themeColor,
                                background: 'white',
                            },
                        }}
                    >
                        {BUTTON_TEXT}
                    </DefaultButton>
                </Stack>
            </Stack>
        );
    };

    return (
        <Stack className={classNames['wc-GoalsPage--container']} tokens={{ childrenGap: 4 }}>
            <Text className={classNames['wc-GoalsPage--headerText']}>{HEADER_TEXT}</Text>
            <Text className={classNames['wc-GoalsPage--subHeaderText']}>{SUBHEADER_TEXT}</Text>
            <GoalStack />
        </Stack>
    );
};

export default GoalsPage;
