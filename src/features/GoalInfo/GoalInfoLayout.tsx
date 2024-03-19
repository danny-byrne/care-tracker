/*eslint-disable*/
import { useNavigate } from 'react-router';

import React from 'react';
import { Persona, PersonaSize, PrimaryButton, Spinner, SpinnerSize, Stack, Text } from '@fluentui/react';
import { BackArrow } from 'src/assets/Misc/BackArrow';

import { getClassNames } from './GoalInfoLayout.classNames';
import RouterConfig from 'src/app/RouterConfig';
import { useSetUserHasOnboardedMutation } from 'src/graphQL/serverMocks/graphQLGeneratedCode';
import { LOCAL_STORAGE_KEYS } from 'src/app/Strings';

interface IGoalInfoLayoutProps {
    backgroundImage: string;
    themeColor: string;
    titleText: string;
    subTitleText: string;
    buttonText: string;
    route: string;
    disclaimerText?: string;
    backButtonShown?: boolean;
    loading?: boolean;
    photoData?: string;
    showsPhoto?: boolean;
    photoInitials?: string;
}

const GoalInfoLayout: React.FC<IGoalInfoLayoutProps> = ({
    backgroundImage,
    themeColor,
    titleText,
    subTitleText,
    buttonText,
    route,
    disclaimerText,
    backButtonShown = false,
    loading = false,
    photoData: photoURL,
    showsPhoto = false,
    photoInitials,
}) => {
    const navigate = useNavigate();
    const classNames = getClassNames(themeColor, disclaimerText);

    const [setUserOnboarded] = useSetUserHasOnboardedMutation();
    const onClick = () => {
        localStorage.setItem(LOCAL_STORAGE_KEYS.HAS_ONBOARDED, 'true');
        setUserOnboarded();
        navigate(route);
    };

    const BackButton = () => {
        return (
            <Stack
                className={classNames['wc-GoalInfoLayout--backButtonContainer']}
                onClick={() => navigate(RouterConfig.Goals, { replace: true })}
            >
                <BackArrow color={themeColor} />
            </Stack>
        );
    };

    const InfoCard = () => {
        return (
            <Stack className={classNames['wc-GoalInfoLayout--cardContainer']}>
                {backButtonShown && <BackButton />}
                {loading ? <Spinner size={SpinnerSize.large} /> : <InfoCardContent />}
            </Stack>
        );
    };

    const InfoCardContent = () => {
        return (
            <Stack className={classNames['wc-GoalInfoLayout--contentContainer']}>
                {showsPhoto && (
                    <Persona
                        className={classNames['wc-GoalInfoLayout--persona']}
                        size={PersonaSize.size100}
                        imageUrl={photoURL}
                        initialsColor={themeColor}
                        imageInitials={photoInitials}
                    />
                )}
                <Text className={classNames['wc-GoalInfoLayout--title']}>{titleText}</Text>
                <Text className={classNames['wc-GoalInfoLayout--subtitle']}>{subTitleText}</Text>
                <PrimaryButton
                    onClick={onClick}
                    className={classNames['wc-GoalInfoLayout--button']}
                    // Theming overrides need to be handled in styles prop
                    styles={{
                        root: { color: 'white', borderColor: themeColor, background: themeColor },
                        rootHovered: {
                            borderColor: themeColor,
                            color: 'white',
                            background: themeColor,
                        },
                        rootPressed: {
                            borderColor: themeColor,
                            color: 'white',
                            background: themeColor,
                        },
                    }}
                >
                    {buttonText}
                </PrimaryButton>
                {disclaimerText && (
                    <Text className={classNames['wc-GoalInfoLayout--disclaimerText']}>{disclaimerText}</Text>
                )}
            </Stack>
        );
    };

    return (
        <Stack
            className={classNames['wc-GoalInfoLayout--pageContainer']}
            style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover' }}
        >
            {!loading && (
                <div>
                    <InfoCard />
                </div>
            )}
        </Stack>
    );
};

export default GoalInfoLayout;
