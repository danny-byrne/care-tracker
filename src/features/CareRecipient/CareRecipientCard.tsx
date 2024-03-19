import {
    DocumentCard,
    DocumentCardImage,
    ImageFit,
    Stack,
    Persona,
    PersonaSize,
    Text,
    Spinner,
    PrimaryButton,
} from '@fluentui/react';
import { getClassNames, coverPhotoStyle } from './CareRecipient.classNames';
import {
    useGetCareRecipientProfileQuery,
    useGetCareRecipientPhotoQuery,
} from 'src/graphQL/serverMocks/graphQLGeneratedCode';
import { ERROR_MESSAGES } from 'src/app/Strings';
import { useFeedbackService } from 'src/services/FeedbackService';
import { useNavigate } from 'react-router';
import RouterConfig from 'src/app/RouterConfig';
import { colors } from 'src/common/styles/colors';
import defaultProfile from 'src/assets/CareRecipient/defaultProfile.jpg';
import { dateOptions, getDateAtMidday } from 'src/utils/dates';
import { locale } from '../AppProfile/constants';
import { useIsMobile } from 'src/common/hooks/useMediaQueries';
import BackgroundPhoto from 'src/assets/CareRecipient/BackgroundPhoto.svg';
import BackgroundPhotoMobile from 'src/assets/CareRecipient/BackgroundPhotoMobile.svg';
import { careRecipientAge } from './CareRecipientUtils';

const CareRecipientCard = () => {
    const isMobile = useIsMobile();
    const classNames = getClassNames();
    const { setErrorToast } = useFeedbackService();
    const navigate = useNavigate();
    const { data, loading } = useGetCareRecipientProfileQuery({
        onError: () => {
            setErrorToast(ERROR_MESSAGES.GET_CARE_RECIPIENT);
        },
    });

    const { data: photoData, loading: photoLoading } = useGetCareRecipientPhotoQuery({
        onError: (error) => {
            if (
                error.message !== 'Response not successful: Received status code 500' &&
                error.message !== 'Not Found'
            ) {
                setErrorToast(error.message);
            }
        },
    });

    const recipientData = data?.careRecipientProfile;
    const photoURL = photoData?.careRecipientPhoto?.careRecipientImageURL
        ? photoData?.careRecipientPhoto?.careRecipientImageURL
        : defaultProfile;
    const hasProfileLinkData = data?.careRecipientProfile?.dOB != null && data?.careRecipientProfile?.phone != '';
    const handleDetailsLinkClick = () => {
        if (hasProfileLinkData) {
            navigate(RouterConfig.RecipientProfile);
        } else {
            navigate(RouterConfig.RecipientProfile + '?mode=edit');
        }
    };

    const birthday = recipientData?.dOB
        ? getDateAtMidday(new Date(recipientData?.dOB)).toLocaleDateString(locale, dateOptions)
        : null;
    const age = recipientData?.dOB ? careRecipientAge(recipientData?.dOB) : null;
    const careRecipientAgeString = `${birthday} (${age} years old)`;
    const CareRecipientDetails = () => {
        return (
            <>
                <Stack horizontal className={classNames['wc-CareRecipientCard--DetailsContainer']}>
                    <Stack horizontalAlign={profileAlignment} className={classNames['wc-CareRecipient--Stack']}>
                        <Stack.Item>
                            <Stack
                                className={classNames['wc-CareRecipientCard--FullName']}
                                horizontal
                                horizontalAlign={profileAlignment}
                                onClick={handleDetailsLinkClick}
                            >
                                <Text className={classNames['wc-CareRecipientCard--Name']}>
                                    {recipientData?.firstName}
                                </Text>
                                {recipientData?.lastName && (
                                    <Text className={classNames['wc-CareRecipientCard--Name']}>
                                        &nbsp;{recipientData?.lastName}
                                    </Text>
                                )}
                            </Stack>
                            <Stack.Item>
                                {!hasProfileLinkData && isMobile && (
                                    <Text
                                        onClick={handleDetailsLinkClick}
                                        className={classNames['wc-CareRecipientCard--DetailButton']}
                                    >
                                        Add Details
                                    </Text>
                                )}
                            </Stack.Item>
                        </Stack.Item>
                        <Stack.Item>
                            {hasProfileLinkData && (
                                <>
                                    <Text
                                        onClick={handleDetailsLinkClick}
                                        className={classNames['wc-CareRecipientCard--SecondaryDetails']}
                                    >
                                        {careRecipientAgeString}
                                    </Text>
                                </>
                            )}
                        </Stack.Item>
                    </Stack>
                    <Stack.Item align="end">
                        {!hasProfileLinkData && !isMobile && (
                            <PrimaryButton
                                onClick={handleDetailsLinkClick}
                                className={classNames['wc-CareRecipientCard--DetailButton']}
                            >
                                Add Details
                            </PrimaryButton>
                        )}
                    </Stack.Item>
                </Stack>
            </>
        );
    };
    const profileAlignment = isMobile ? 'center' : 'start';
    return (
        <>
            {!loading && !photoLoading && (
                <DocumentCard className={classNames['wc-CareRecipientCard--Card']} onClick={handleDetailsLinkClick}>
                    <DocumentCardImage
                        imageFit={ImageFit.cover}
                        imageSrc={isMobile ? BackgroundPhotoMobile : BackgroundPhoto}
                        styles={coverPhotoStyle}
                    />
                    <Stack horizontalAlign={profileAlignment} tokens={{ childrenGap: 20 }}>
                        {!photoLoading && (
                            <Persona
                                onClick={handleDetailsLinkClick}
                                className={classNames['wc-CareRecipientCard--Persona']}
                                size={PersonaSize.size120}
                                imageUrl={photoURL}
                                initialsColor={colors.fabric.neutrals.WCprimary}
                            />
                        )}
                        <Stack
                            horizontalAlign={profileAlignment}
                            className={classNames['wc-CareRecipientCard--Details']}
                        >
                            <CareRecipientDetails />
                        </Stack>
                    </Stack>
                </DocumentCard>
            )}
            {(loading || photoLoading) && <Spinner />}
        </>
    );
};

export default CareRecipientCard;
