import { useGetUserAppProfileInfoQuery } from 'src/graphQL/serverMocks/graphQLGeneratedCode';
import { useQueryStringParams } from 'src/common/hooks/useQueryStringParams';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';

import React from 'react';
import {
    Panel,
    Spinner,
    Text,
    Stack,
    IPanelProps,
    PrimaryButton,
    FontIcon,
    List,
    Separator,
    DefaultButton,
    Toggle,
} from '@fluentui/react';
import Avatar, { AvatarSizes } from 'src/common/components/Avatar';
import { IRenderFunction } from '@fluentui/react/lib/Utilities';
import NotificationPreferences from './NotificationsPreference';
import FrequentlyAskedQuestions from './FrequentlyAskedQuestions';

import {
    getMenuItems,
    getDataAndStorageMenuItems,
    APP_PROFILE_PAGE_NAMES,
    DATA_STORAGE_PAGE_NAMES,
} from './MenuItemHelpers';

import { getClassNames } from './AppProfile.classNames';
import { AuthService } from 'src/services/AuthService';
import { useIsMobile } from 'src/common/hooks/useMediaQueries';
import DataProtectionNotice from './DataProtectionNotice';
import { appProfilePanelLayer } from 'src/features/Medications/zIndex';
import { PRIVACY_AND_COOKIES_URI, TERMS_OF_USE_PDF_PATH } from 'src/app/Constants';
import { colors } from 'src/common/styles/colors';

import { SUPPORT_EMAIL } from 'src/app/Constants';
import { Back } from 'src/common/components';
import { formatPhoneNumber } from 'src/utils/utils';
import { useFeatureFlags } from 'src/common/hooks/useFeatureFlags';

const panelStyleOverrides = {
    main: {
        'z-index': appProfilePanelLayer,
        'background-color': colors.windcrest.pageBackground,
    },
};

interface IAppProfileProps {
    isPanelOpen: boolean;
    hidePanel: () => void;
}

const AppProfile: React.FC<IAppProfileProps> = ({ isPanelOpen, hidePanel }) => {
    const SIGN_OUT_BUTTON_TEXT = 'Sign Out';
    const isMobile = useIsMobile();
    const navigate = useNavigate();

    const { addSearchParam, getSearchParam } = useQueryStringParams();
    const [panelToShow, setPanelToShow] = useState(getSearchParam('appProfile'));

    const classNames = getClassNames();
    const isTopLevelMenu = panelToShow === 'menu';

    const navigateToMenuItem = (menuItem: string) => addSearchParam({ appProfile: menuItem });
    const menuItems = getMenuItems(navigateToMenuItem);
    const dataStorageMenuItems = getDataAndStorageMenuItems(navigateToMenuItem, isMobile, navigate);
    const {
        annotationState,
        setAnnotationEnabled,
        welcomeMessageState,
        setWelcomeMessageEnabled,
        todayViewState,
        setTodayViewEnabled,
        sixMonthToolkitState,
        setSixMonthToolkitEnabled,
        suggestedArticleState,
        setSuggestedArticleEnabled,
        positivitySlotState,
        setPositivitySlotEnabled,
    } = useFeatureFlags();

    useEffect(() => {
        const panelName = getSearchParam('appProfile');
        setPanelToShow(panelName);
    });

    const onRenderNavigationContent: IRenderFunction<IPanelProps> = React.useCallback(
        (props, defaultRender) => {
            return (
                <>
                    {isTopLevelMenu ? (
                        <AppProfileMenu {...{ props, defaultRender }} />
                    ) : (
                        <AppProfileSubMenu {...{ props, defaultRender, addSearchParam, panelToShow }} />
                    )}
                </>
            );
        },
        [panelToShow],
    );

    const onRenderFooterContent = () => (
        <>
            {isTopLevelMenu && (
                <>
                    <PrimaryButton className={classNames['wc-AppProfile--footerButton']} onClick={AuthService.logout}>
                        {SIGN_OUT_BUTTON_TEXT}
                    </PrimaryButton>
                    <Stack
                        horizontal
                        verticalAlign="center"
                        tokens={{ childrenGap: 5 }}
                        className={classNames['wc-AppProfile--copyrightContainer']}
                    >
                        <div>&copy;</div>
                        <div>Microsoft 2023</div>
                    </Stack>
                </>
            )}
        </>
    );

    const supportEmailElement = (
        <a href={`mailto:${SUPPORT_EMAIL}`} className={classNames['wc-AppProfile--link']}>
            {SUPPORT_EMAIL}
        </a>
    );

    const dataAndStorageContent = (
        <Stack className={classNames['wc-AppProfile--subMenuContent']} tokens={{ childrenGap: 12 }}>
            <div className={classNames['wc-AppProfile--boldedText']}>Accessing Care Circle Data</div>
            <Stack>
                <span>Please contact</span>
                {supportEmailElement}
            </Stack>
            <div className={classNames['wc-AppProfile--boldedText']}>Download Data</div>
            <Stack>
                <span>You can copy and paste your data at any time or email</span>
                {supportEmailElement}
            </Stack>
            <div className={classNames['wc-AppProfile--boldedText']}>Archive Care Circle</div>
            <div>
                Archiving the Care Circle will store the data up to 30 days, including all of the profile and health
                data. To archive your Care Circle and for more information: {supportEmailElement}
            </div>
        </Stack>
    );

    const privacyAndTermsContent = (
        <Stack tokens={{ childrenGap: 20 }} className={classNames['wc-AppProfile--subMenuContent']}>
            {/* <div className={classNames['wc-AppProfile--boldedText']}>Microsoft Privacy Statement</div>
            <Stack tokens={{ childrenGap: 10 }}>
                <div>
                    We gather required diagnostic data to keep Windcrest secure, up-to-date and performing as expected.
                    This data doesn’t include your name, messages or other personal content.
                </div>
                <div>To opt-out at any time please contact: {supportEmailElement}</div>
            </Stack> */}

            <div>
                <a
                    className={classNames['wc-AppProfile--link']}
                    href={PRIVACY_AND_COOKIES_URI}
                    target="_blank"
                    rel="noreferrer"
                >
                    Privacy & Cookies
                </a>
            </div>
            <div>
                <a
                    className={classNames['wc-AppProfile--link']}
                    href={TERMS_OF_USE_PDF_PATH}
                    target="_blank"
                    rel="noreferrer"
                >
                    Terms of Use
                </a>
            </div>
        </Stack>
    );

    const featureFlagsContent = (
        <Stack tokens={{ childrenGap: 20 }} className={classNames['wc-AppProfile--subMenuContent']}>
            <Stack horizontal tokens={{ childrenGap: 10 }}>
                <Text>Annotations</Text>
                <Toggle defaultChecked={annotationState} onChange={(_ev, checked) => setAnnotationEnabled(checked)} />
            </Stack>
            <Stack horizontal tokens={{ childrenGap: 10 }}>
                <Text>Welcome Message</Text>
                <Toggle
                    defaultChecked={welcomeMessageState}
                    onChange={(_ev, checked) => setWelcomeMessageEnabled(checked)}
                />
            </Stack>
            <Stack horizontal tokens={{ childrenGap: 10 }}>
                <Text>Today View</Text>
                <Toggle defaultChecked={todayViewState} onChange={(_ev, checked) => setTodayViewEnabled(checked)} />
            </Stack>
            <Stack horizontal tokens={{ childrenGap: 10 }}>
                <Text>Six Month Toolkit</Text>
                <Toggle
                    defaultChecked={sixMonthToolkitState}
                    onChange={(_ev, checked) => setSixMonthToolkitEnabled(checked)}
                />
            </Stack>
            <Stack horizontal tokens={{ childrenGap: 10 }}>
                <Text>Suggested Article</Text>
                <Toggle
                    defaultChecked={suggestedArticleState}
                    onChange={(_ev, checked) => setSuggestedArticleEnabled(checked)}
                />
            </Stack>
            <Stack horizontal tokens={{ childrenGap: 10 }}>
                <Text>Positivity Message</Text>
                <Toggle
                    defaultChecked={positivitySlotState}
                    onChange={(_ev, checked) => setPositivitySlotEnabled(checked)}
                />
            </Stack>
        </Stack>
    );

    const MenuContent = () => {
        return (
            <>
                {panelToShow === 'menu' && <List items={menuItems} onRenderCell={onRenderCell} />}
                {panelToShow === 'notifications' && <NotificationPreferences />}
                {panelToShow === 'dataStorage' && (
                    <>
                        <List items={dataStorageMenuItems} onRenderCell={onRenderCell} />
                        {dataAndStorageContent}
                    </>
                )}
                {panelToShow === DATA_STORAGE_PAGE_NAMES.faq && <FrequentlyAskedQuestions />}
                {panelToShow === DATA_STORAGE_PAGE_NAMES.dataProtectionNotice && <DataProtectionNotice />}
                {panelToShow === 'privacy' && privacyAndTermsContent}
                {panelToShow === 'featureFlags' && featureFlagsContent}
            </>
        );
    };

    const onRenderCell = React.useCallback((item: IAppProfileMenuItemProps) => {
        return <AppProfileMenuItem {...item} />;
    }, []);

    return (
        <Panel
            onRenderNavigation={onRenderNavigationContent}
            onRenderFooterContent={onRenderFooterContent}
            isOpen={isPanelOpen}
            isLightDismiss
            onDismiss={hidePanel}
            closeButtonAriaLabel="Close"
            isFooterAtBottom
            data-testid="appProfilePanel"
            styles={panelStyleOverrides}
            allowTouchBodyScroll
        >
            <MenuContent />
        </Panel>
    );
};

interface IAppProfileMenuProps {
    props: IPanelProps;
    defaultRender: (props?: IPanelProps) => JSX.Element;
}

const AppProfileMenu: React.FC<IAppProfileMenuProps> = ({ props, defaultRender }) => {
    const classNames = getClassNames();

    return (
        <>
            <Stack className={classNames['wc-AppProfile--menuHeaderContainer']}>
                <UserInfoCard />
                {
                    // This custom navigation still renders the close button (defaultRender).
                    // If you don't use defaultRender,
                    // be sure to provide some other way to close the panel.
                    defaultRender!(props)
                }
            </Stack>
            <Separator styles={{ root: { backgroundColor: colors.windcrest.pageBackground } }} />
        </>
    );
};

const UserInfoCard: React.FC = () => {
    const classNames = getClassNames();

    const MSA_URL = 'https://myaccount.microsoft.com/?ref=MeControl';

    const { data, loading } = useGetUserAppProfileInfoQuery();

    let displayName;
    let imageBase64;
    let email;
    let mobile;

    if (data) {
        displayName = data.me.displayName;
        imageBase64 = data.me.imageBase64;
        email = data.me.email;
        mobile = data.me.mobile;
    }

    const formattedPhoneNumber = mobile ? formatPhoneNumber(mobile) : undefined;

    return (
        <>
            {loading && <Spinner />}
            {data && (
                <a href={MSA_URL} className={classNames['wc-AppProfile--msaLink']}>
                    <Stack className={classNames['wc-AppProfile--userInfoCard']}>
                        <Avatar
                            className={classNames['wc-AppProfile--profilePicture']}
                            name={displayName}
                            size={AvatarSizes.small}
                            base64={imageBase64}
                        />
                        <Stack className={classNames['wc-AppProfile--userInformation']}>
                            <Text className={classNames['wc-AppProfile--boldedText']}>{displayName}</Text>
                            {formattedPhoneNumber && <Text>{formattedPhoneNumber}</Text>}
                            {email && <Text>{email}</Text>}
                        </Stack>
                    </Stack>
                </a>
            )}
        </>
    );
};

interface IAppProfileSubMenuProps {
    props: IPanelProps;
    defaultRender: (props?: IPanelProps) => JSX.Element;
    panelToShow: string;
    addSearchParam: (Object: any) => void;
}

const AppProfileSubMenu: React.FC<IAppProfileSubMenuProps> = ({
    props,
    defaultRender,
    panelToShow,
    addSearchParam,
}) => {
    const classNames = getClassNames();

    const returnToTopLevel = () => addSearchParam({ appProfile: 'menu' });
    const returnToDataStorage = () => addSearchParam({ appProfile: 'dataStorage' });

    //TODO: change these based on subMenus ot data storage/FAQ being shown
    let subMenuTitle, appSettingsText, menuTitleOnClick;
    if (Object.values(DATA_STORAGE_PAGE_NAMES).includes(panelToShow)) {
        appSettingsText = 'Data & Storage';
        subMenuTitle = panelToShow;
        menuTitleOnClick = returnToDataStorage;
    } else {
        appSettingsText = 'Settings';
        subMenuTitle = APP_PROFILE_PAGE_NAMES[panelToShow];
        menuTitleOnClick = returnToTopLevel;
    }

    return (
        <>
            <Stack className={classNames['wc-AppProfile--menuHeaderContainer']}>
                <Stack className={classNames['wc-AppProfile--subMenuTitleContainer']} tokens={{ childrenGap: 5 }}>
                    <Back title={appSettingsText} onClick={menuTitleOnClick} />
                    <Text className={classNames['wc-AppProfile--subMenuTitleText']}>{subMenuTitle}</Text>
                </Stack>

                {
                    // This custom navigation still renders the close button (defaultRender).
                    // If you don't use defaultRender,
                    // be sure to provide some other way to close the panel.
                    defaultRender!(props)
                }
            </Stack>
        </>
    );
};

interface IAppProfileMenuItemProps {
    iconName: string;
    title: string;
    onClick: () => void;
}

const AppProfileMenuItem: React.FC<IAppProfileMenuItemProps> = ({ iconName, title, onClick }) => {
    const classNames = getClassNames();

    const chevronLabel = `${title} chevron`;
    const iconLabel = `${title} icon`;

    return (
        <DefaultButton onClick={onClick} className={classNames['wc-AppProfile--buttonWithHoverColor']}>
            <Stack
                horizontal
                horizontalAlign="space-between"
                verticalAlign="center"
                className={classNames['wc-AppProfile--menuItemContainer']}
            >
                <div className={classNames['wc-AppProfile--iconTextContainer']}>
                    {iconName && (
                        <FontIcon
                            className={classNames['wc-AppProfile--iconClass']}
                            role="img"
                            aria-label={iconLabel}
                            iconName={iconName}
                        />
                    )}
                    <Text className={classNames['wc-AppProfile--menuItemTitle']}>{title}</Text>
                </div>
                <FontIcon
                    role="img"
                    aria-label={chevronLabel}
                    iconName="ChevronRightMed"
                    className={classNames['wc-AppProfile--menuItemChevron']}
                />
            </Stack>
        </DefaultButton>
    );
};

export default AppProfile;
