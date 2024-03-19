import { Stack, Persona, PersonaSize, Spinner, Text, Panel, PanelType, DefaultButton, Icon } from '@fluentui/react';
import React, { useEffect } from 'react';
import RouterConfig from 'src/app/RouterConfig';
import { getClassNames } from './CareRecipient.classNames';
import { useQueryStringParams } from 'src/common/hooks/useQueryStringParams';
import {
    useGetCareRecipientProfileQuery,
    useGetCareRecipientPhotoQuery,
} from 'src/graphQL/serverMocks/graphQLGeneratedCode';
import { useFeedbackService } from 'src/services/FeedbackService';
import CareRecipientEdit from './CareRecipientEdit';
import { PanelStyleOverrides } from 'src/common/components/Panel/PanelStyleOverrides';
import { usePanelWidth } from 'src/common/hooks/usePanelWidth';
import { colors } from 'src/common/styles/colors';
import defaultProfile from 'src/assets/CareRecipient/defaultProfile.jpg';
import { dateOptions, getDateAtMidday } from 'src/utils/dates';
import { locale } from '../AppProfile/constants';
import CareRecipientMedicalID from './CareRecipientMedicalID';
import { careRecipientAge } from './CareRecipientUtils';
import { Back } from 'src/common/components';
import ReusableCardList from 'src/common/components/ReusableCardList/ReusableCardList';

import SubHeaderLayout from 'src/common/components/Layout/SubHeaderLayout';
import { formatPhoneNumber } from 'src/utils/utils';
import { usePrintPanelControls } from 'src/common/hooks/usePrintPanel';
import CareRecipientPrintPanel from './CareRecipientPrintPanel';
import { PrintPanel } from 'src/common/components/Panel/PrintPanel';
import ReusablePrintButton from 'src/common/components/ReusablePrintButton/ReusablePrintButton';
import { useGetBingAddressUri } from 'src/common/hooks/useGetBingAddressUri';
import { Phone } from 'src/assets/Misc/Phone';
import { Location } from 'src/assets/Misc/Location';

const CareRecipient: React.FC = () => {
    const classNames = getClassNames();
    const { setErrorToast, setSuccessToast } = useFeedbackService();
    const { getSearchParam, addSearchParam, removeSearchParam } = useQueryStringParams();
    const status = getSearchParam('status');
    const { showPrintPanel, hidePrintPanel } = usePrintPanelControls();

    useEffect(() => {
        if (status === 'updated') {
            removeSearchParam('status');
            setSuccessToast('Admins can view changes', `Profile ${status}`);
        }
    }, [status]);

    const { data, loading } = useGetCareRecipientProfileQuery({
        onError: (error) => {
            setErrorToast(error.message);
        },
    });

    const { data: photoData, loading: photoLoading } = useGetCareRecipientPhotoQuery({
        errorPolicy: 'all',
        onError: (error) => {
            if (
                error.message !== 'Response not successful: Received status code 500' &&
                error.message !== 'Not Found'
            ) {
                setErrorToast(error.message);
            }
        },
    });
    const photoURL = photoData?.careRecipientPhoto?.careRecipientImageURL
        ? photoData?.careRecipientPhoto?.careRecipientImageURL
        : defaultProfile;

    const dataProfile = data?.careRecipientProfile;

    const showEdit = getSearchParam('mode') === 'edit';
    const showEditPanel = () => addSearchParam({ mode: 'edit' });
    const hideEditPanel = () => removeSearchParam('mode');
    const customWidth = usePanelWidth();
    const birthday = dataProfile?.dOB
        ? getDateAtMidday(new Date(dataProfile?.dOB)).toLocaleDateString(locale, dateOptions)
        : '';
    const age = dataProfile?.dOB ? careRecipientAge(dataProfile?.dOB) : '';
    const birthDateString = `${birthday} (${age} years old)`;

    const careRecipientFormattedPhoneNumber = formatPhoneNumber(dataProfile?.phone);

    const careRecipientPhoneNumberCard = {
        clickableContent: (
            <Stack horizontal tokens={{ childrenGap: 10 }} verticalAlign="center">
                <Phone />
                {dataProfile?.phone ? (
                    <a
                        href={`tel:${dataProfile?.phone}`}
                        style={{ textDecoration: 'none' }}
                        className={classNames['wc-ProviderView--clickableLinkText']}
                        data-testid={'provider-phone'}
                    >
                        {careRecipientFormattedPhoneNumber}
                    </a>
                ) : (
                    'Not set'
                )}
            </Stack>
        ),
    };

    const careRecipientAddress = dataProfile?.address?.singleLineAddress ?? null;

    const { mapsUri } = useGetBingAddressUri(careRecipientAddress);

    const careRecipientAddressCard = {
        clickableContent: (
            <Stack horizontal tokens={{ childrenGap: 10 }} verticalAlign="center">
                <Location />
                {careRecipientAddress ? (
                    <a
                        href={mapsUri}
                        style={{ textDecoration: 'none' }}
                        target="_blank"
                        rel="noreferrer"
                        data-testid={'provider-address'}
                    >
                        {careRecipientAddress}
                    </a>
                ) : (
                    'Not set'
                )}
            </Stack>
        ),
    };
    const careRecipientEmailCard = {
        clickableContent: (
            <Stack horizontal tokens={{ childrenGap: 10 }} verticalAlign="center">
                <Icon iconName={'Mail'} />
                {dataProfile?.email ? (
                    <a
                        href={`mailto:${dataProfile?.email}`}
                        style={{ textDecoration: 'none' }}
                        className={classNames['wc-ProviderView--clickableLinkText']}
                        data-testid={'provider-phone'}
                    >
                        {dataProfile?.email}
                    </a>
                ) : (
                    'Not set'
                )}
            </Stack>
        ),
    };

    const careRecipientCardsList = [careRecipientPhoneNumberCard, careRecipientAddressCard, careRecipientEmailCard];

    return (
        <>
            <SubHeaderLayout title={'Care Recipient'}>
                <Stack tokens={{ childrenGap: 15 }}>
                    <Stack.Item>
                        <Back href={RouterConfig.CarePlan} />
                    </Stack.Item>
                    <Stack.Item align="center">
                        {!photoLoading && (
                            <Persona
                                className={classNames['wc-CareRecipient--Persona']}
                                size={PersonaSize.size120}
                                imageUrl={photoURL}
                                initialsColor={colors.fabric.neutrals.WCprimary}
                                data-testid="careRecipient-photo"
                            />
                        )}
                        {photoLoading && <Spinner />}
                    </Stack.Item>
                    <Stack.Item align="center">
                        <Stack.Item align="center">
                            {loading && <Spinner />}
                            {!loading && (
                                <>
                                    <Stack horizontal horizontalAlign="center" data-testid="careRecipient-name">
                                        <Text className={classNames['wc-CareRecipient--Name']}>
                                            {dataProfile?.firstName}
                                        </Text>
                                        {dataProfile?.lastName && (
                                            <Text className={classNames['wc-CareRecipient--Name']}>
                                                &nbsp;{dataProfile?.lastName}
                                            </Text>
                                        )}
                                    </Stack>
                                </>
                            )}
                            {dataProfile?.dOB && (
                                <Stack.Item align="center" data-testid="careRecipient-dOB">
                                    <Text className={classNames['wc-CareRecipient--DetailLabels']}>
                                        {birthDateString}
                                    </Text>
                                </Stack.Item>
                            )}
                        </Stack.Item>
                    </Stack.Item>
                    <Stack verticalAlign="center" horizontal horizontalAlign="center" tokens={{ childrenGap: 10 }}>
                        <DefaultButton
                            className={classNames['wc-CareRecipient--editButton']}
                            text="Edit"
                            onClick={showEditPanel}
                        />
                        <div className={classNames['wc-CareRecipient--printButton']}>
                            <ReusablePrintButton onClick={showPrintPanel} />
                        </div>
                    </Stack>
                    <CareRecipientMedicalID />
                    <Text className={classNames['wc-CareRecipient--SecondaryDetails']}>Contact Information</Text>
                    <Stack className={classNames['wc-CareRecipient--Stack']}>
                        <ReusableCardList buttonPropsList={careRecipientCardsList} />
                    </Stack>
                </Stack>
                <Panel
                    isOpen={showEdit}
                    isLightDismiss
                    hasCloseButton
                    onDismiss={hideEditPanel}
                    data-testid="editPanel"
                    onRenderNavigation={() => null}
                    onRenderHeader={() => null}
                    styles={PanelStyleOverrides}
                    type={PanelType.custom}
                    customWidth={customWidth}
                    allowTouchBodyScroll
                >
                    <CareRecipientEdit onDismiss={hideEditPanel} />
                </Panel>
                <PrintPanel>
                    <CareRecipientPrintPanel onDismiss={hidePrintPanel} />
                </PrintPanel>
            </SubHeaderLayout>
        </>
    );
};

export default CareRecipient;
