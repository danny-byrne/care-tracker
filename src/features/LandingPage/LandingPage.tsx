import { useEffect } from 'react';
import { useFeedbackService } from 'src/services/FeedbackService';
import { useSearchParams } from 'react-router-dom';

import {
    LandingWindcrestHeader,
    LandingDescriptionText,
    SignInButton,
    NewAccountButton,
    LandingNotAllowedText,
} from './LandingPage.subComponents';
import Toast from 'src/common/components/Feedback/Toast';
import FullScreenErrorModal from 'src/common/components/Feedback/FullScreenErrorModal';

import { getClassNames } from './LandingPage.classNames';

import { ERROR_MESSAGES, LOCAL_STORAGE_KEYS } from 'src/app/Strings';
import { useGetAppInvitationQuery } from 'src/graphQL/serverMocks/graphQLGeneratedCode';
import { useWindowDimensions } from 'src/common/hooks/useMediaQueries';
import { MicrosoftWhiteLogo } from 'src/assets/Misc/MicrosoftWhiteLogo';

const LandingPage = () => {
    const [searchParams] = useSearchParams();
    const { setErrorFullscreen, setErrorToast, hasToast } = useFeedbackService();
    const { height } = useWindowDimensions();

    const inviteCode = searchParams.get('inviteCode');
    const authError = localStorage.getItem(LOCAL_STORAGE_KEYS.AUTH_ERROR);

    const notAllowed = searchParams.get('notallowed');

    const signedOut = searchParams.get('signedOut');

    // Set max height when user first navigates to site
    localStorage.setItem(LOCAL_STORAGE_KEYS.MAX_HEIGHT, JSON.stringify(height));

    useEffect(() => {
        if (signedOut === 'true') {
            setErrorToast(ERROR_MESSAGES.SIGNED_OUT);
        }
    }, [signedOut]);

    if (authError) {
        setErrorToast(authError);
        localStorage.removeItem(LOCAL_STORAGE_KEYS.AUTH_ERROR);
    }

    let careCircle;
    let inviterName;

    const { data, error } = useGetAppInvitationQuery({
        skip: inviteCode === null,
        variables: { inviteCode: inviteCode },
        onError: () => {
            setErrorFullscreen(ERROR_MESSAGES.APP_INVITATION_INFO);
        },
    });

    if (data) {
        careCircle = data.appInvitation.careCircleName;
        inviterName = data.appInvitation.inviteFromName;
    }

    useEffect(() => {
        if (error) {
            setErrorFullscreen(ERROR_MESSAGES.APP_INVITATION_INFO);
        }
    }, [error]);

    const classNames = getClassNames();

    useEffect(() => {
        localStorage.removeItem(LOCAL_STORAGE_KEYS.INVITE_CODE);
        localStorage.removeItem(LOCAL_STORAGE_KEYS.HAS_REQUESTED_MS_GRAPH_CONSENT);
    });

    const keyframes = `
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        @keyframes scaleDown20 {
            from { scale: 1.2; }
            to { scale: 1.0; }
        }
        @keyframes scaleDown80 {
            from { scale: 1.8; }
            to { scale: 1.0; }
        }
        @keyframes slideUp {
            100% { transform: translateY(-10%); }
            0% { transform: translateY(0); }
        }
    `;

    const animationBGContainer = {
        animationName: ' scaleDown20',
        animationDuration: '2s',
        animationTimingFunction: 'ease-in-out',
        animationDelay: '0s',
        animationFillMode: 'forwards',
    };

    const animationLandingWindcrestLogo = {
        opacity: 0,
        animationName: 'fadeIn, scaleDown80',
        animationDuration: '1s, 1s',
        animationTimingFunction: 'ease-in-out, ease-in-out',
        animationDelay: '0.25s, 0.25s',
        animationFillMode: 'forwards, forwards',
    };

    const animationLandingWindcrestHeader = {
        opacity: 0,
        animationName: 'fadeIn, scaleDown20',
        animationDuration: '1s, 1s',
        animationTimingFunction: 'ease-in-out, ease-in-out',
        animationDelay: '0.5s, 0.5s',
        animationFillMode: 'forwards, forwards',
    };

    const animationLandingDescriptionText = {
        opacity: 0,
        animationName: 'fadeIn, scaleDown20',
        animationDuration: '1s, 1s',
        animationTimingFunction: 'ease-in-out, ease-in-out',
        animationDelay: '0.75s, 0.75s',
        animationFillMode: 'forwards, forwards',
    };

    return (
        <div className={classNames['wc-LandingPage--pageContainer']}>
            <style>{keyframes}</style>
            <div className={classNames['wc-LandingPage--bgContainer']} style={animationBGContainer} />
            <div className={classNames['wc-LandingPage--headerContainer']}>
                <div className={classNames['wc-LandingPage--logoContainer']} style={animationLandingWindcrestLogo}>
                    <MicrosoftWhiteLogo />
                </div>
                <div style={animationLandingWindcrestHeader}>
                    <LandingWindcrestHeader careCircleName={careCircle} />
                </div>

                {notAllowed && <LandingNotAllowedText />}

                <div style={animationLandingDescriptionText}>
                    {!notAllowed && <LandingDescriptionText inviterName={inviterName} />}
                </div>
            </div>

            <div className={classNames['wc-LandingPage--buttonContainer']}>
                <SignInButton inviteCode={inviteCode} />
                <NewAccountButton inviteCode={inviteCode} />
            </div>
            {hasToast && <Toast />}
            <FullScreenErrorModal />
        </div>
    );
};

export default LandingPage;
