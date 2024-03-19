import RouterConfig from 'src/app/RouterConfig';
import { AuthService } from 'src/services/AuthService';
import { DefaultButton } from '@fluentui/react';
import microsoftLogo from 'src/assets/LandingPage/MicrosoftLogo.png';
import { buttonStylesThemeOverride, getClassNames } from './LandingPage.classNames';
import { DEFAULT_INVITE_CODE } from 'src/app/Constants';
import { trackClick } from 'src/wcpConsentInit';

export const LandingWindcrestHeader = (props: ILandingWindcrestHeaderProps) => {
    const classNames = getClassNames();
    const headerText = props.careCircleName ? `Welcome to ${props.careCircleName}` : 'Welcome to Windcrest';

    return <h1 className={classNames['wc-LandingPage--landingWindcrestHeader']}>{headerText}</h1>;
};

interface ILandingWindcrestHeaderProps {
    careCircleName?: string;
}

export const LandingNotAllowedText = () => {
    const classNames = getClassNames();
    const infoText =
        // eslint-disable-next-line max-len
        'You currently do not have access to this page. Sign in with another account if you feel you have reached this page in error.';

    return <p className={classNames['wc-LandingPage--landingDescriptionText']}>{infoText}</p>;
};

export const LandingDescriptionText = (props: ILandingDescriptionTextProps) => {
    const classNames = getClassNames();
    const infoText = props.inviterName
        ? `${props.inviterName} would like you to join the Care Circle.`
        : 'Spending more time with the one you love.';

    return <p className={classNames['wc-LandingPage--landingDescriptionText']}>{infoText}</p>;
};

interface ILandingDescriptionTextProps {
    inviterName?: string;
}

export const SignInButton = (props: ILoginButtonProps) => {
    const { inviteCode } = props || null;
    const classNames = getClassNames();
    const signInButtonText = 'Sign in';
    const clickHandler = () => {
        inviteCode !== null
            ? AuthService.loginRedirectWithCustomState(RouterConfig.LoginLoadingPage, inviteCode)
            : AuthService.loginRedirectWithCustomState(RouterConfig.LoginLoadingPage, DEFAULT_INVITE_CODE);
    };

    return (
        <DefaultButton
            data-testid="signInButton"
            styles={buttonStylesThemeOverride}
            className={classNames['wc-LandingPage--signInButton']}
            onClick={() => {
                trackClick('signInButton');

                clickHandler();
            }}
        >
            <img
                aria-label="Microsoft logo"
                src={microsoftLogo}
                className={classNames['wc-LandingPage--signInButtonTextStyle']}
            />
            {signInButtonText}
        </DefaultButton>
    );
};

export const NewAccountButton = (props: ILoginButtonProps) => {
    const { inviteCode } = props || null;
    const classNames = getClassNames();
    const newAccountButtonText = 'Create a new account';
    const clickHandler = () =>
        inviteCode !== null
            ? AuthService.loginRedirectWithCustomState(RouterConfig.LoginLoadingPage, inviteCode)
            : AuthService.loginRedirectWithCustomState(RouterConfig.LoginLoadingPage, DEFAULT_INVITE_CODE);
    return (
        <DefaultButton
            data-testid="newAccountButton"
            styles={buttonStylesThemeOverride}
            className={classNames['wc-LandingPage--newAccountButton']}
            onClick={() => {
                trackClick('newAccountButton');

                clickHandler();
            }}
        >
            {newAccountButtonText}
        </DefaultButton>
    );
};

interface ILoginButtonProps {
    inviteCode?: string;
}
