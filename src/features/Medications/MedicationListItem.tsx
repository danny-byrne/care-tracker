import React, { useEffect, useState } from 'react';
import { DefaultButton, DocumentCard, Stack, Text, Image, MessageBarType } from '@fluentui/react';
import { getClassNames } from './MedicationListItem.classNames';
import { useIsMobile } from 'src/common/hooks/useMediaQueries';
import defaultMedication from 'src/assets/MedicationPage/defaultMedication.jpg';
import { trackClick } from 'src/wcpConsentInit';
import DocumentCardToast from 'src/common/components/Feedback/DocumentCardToast';
import { dateDiffInDays, getDateAtMidday, getToday } from 'src/utils/dates';
import { Provider } from 'src/types/Provider';
import { Pharmacy } from 'src/types/Pharmacy';
import { Refill } from 'src/types/Medication';
import { formatDate } from 'src/common/helpers/formatDate';
import { formatPhoneNumber } from 'src/utils/utils';
import { RecordStatus } from 'src/graphQL/serverMocks/graphQLGeneratedCode';

interface MedicationListItemProps {
    name: string;
    strength: string;
    conditionText?: string;
    refillDateText?: string;
    instructions?: string;
    onClick: (ev) => void;
    onClickRefill?: (ev) => void;
    onClickNotTaking?: (ev) => void;
    isRefillPage?: boolean;
    hideRefillButtons?: boolean;
    provider?: Provider;
    refills?: Refill[];
}

const MedicationListItem: React.FC<MedicationListItemProps> = (props) => {
    const {
        name,
        strength,
        refillDateText,
        conditionText,
        instructions,
        onClick,
        onClickRefill,
        onClickNotTaking,
        isRefillPage,
        hideRefillButtons,
        provider,
        refills,
    } = props;
    const classNames = getClassNames();
    const isMobile = useIsMobile();

    const [hasRefill, setHasRefill] = useState(false);
    const [refillDate, setRefillDate] = useState('');
    const [pharmacy, setPharmacy] = useState<Pharmacy>(undefined);

    useEffect(() => {
        const activeRefill = refills?.filter((refill) => refill.recordStatus == RecordStatus.Active);
        setHasRefill(activeRefill?.[0]?.refillDate !== undefined);
        setRefillDate(activeRefill?.[0]?.refillDate);
        setPharmacy(activeRefill?.[0]?.pharmacy);
    }, [refills]);

    const MedicationListItemView = () => {
        return (
            <div
                className={classNames['wc-MedicationListItem--itemCell']}
                data-testid="medication-item"
                data-is-focusable
                onClick={(ev) => {
                    trackClick('medication-item');
                    onClick(ev);
                }}
            >
                <DocumentCard className={classNames['wc-MedicationListItem--medicationCard']}>
                    <Stack>
                        {isRefillPage && <RefillToast />}
                        <Stack
                            horizontal
                            className={classNames['wc-MedicationListItem--container']}
                            tokens={{ childrenGap: 16 }}
                        >
                            <MedicationInfo />
                            {!isMobile && isRefillPage && <ProviderInfo />}
                            {!isMobile && isRefillPage && <PharmacyInfo />}
                            {/* 
                                These two components are conditionally rendered based on schedules and instructions
                                props
                            */}
                            {/* commenting this out until desktop view comes back */}
                            {/* {!isMobile && <ScheduleInfo />} */}
                            {!isMobile && <InstructionInfo />}
                        </Stack>
                    </Stack>
                </DocumentCard>
            </div>
        );
    };

    const RefillToast = () => {
        const parsedDate = getDateAtMidday(new Date(refillDate));
        const today = getToday();

        const daysUntilRefill = dateDiffInDays(today, parsedDate);

        // If no conditions in if/else loop are met, pass in an empty fragment
        let RefillToastToShow = () => <></>;

        if (daysUntilRefill < 0) {
            RefillToastToShow = RefillPastDueToast;
        } else if (daysUntilRefill === 0) {
            RefillToastToShow = RefillTodayToast;
        } else if (daysUntilRefill <= 7) {
            RefillToastToShow = RefillUpcomingToast;
        }
        return (
            <>
                <RefillToastToShow />
            </>
        );
    };

    const RefillUpcomingToast = () => <DocumentCardToast text={'Refill is approaching'} />;
    const RefillTodayToast = () => <DocumentCardToast text={"It's time for a refill"} />;
    const RefillPastDueToast = () => (
        <DocumentCardToast text={"It's past time for a refill"} messageBarType={MessageBarType.severeWarning} />
    );

    const MedicationInfo = () => {
        return (
            <Stack className={classNames['wc-MedicationListItem--firstSection']}>
                <Stack tokens={{ childrenGap: 16 }} horizontal>
                    <Stack>
                        {/* Image will be updated once backend allows users to include images */}
                        <Image
                            aria-label="Default medication image: purple and pink pill"
                            width={70}
                            height={70}
                            src={defaultMedication}
                        />
                    </Stack>
                    <Stack className={classNames['wc-MedicationListItem--itemContent']} tokens={{ childrenGap: 4 }}>
                        <MedicationText />
                        <MedicationMoreInfo />
                    </Stack>
                </Stack>
                {!hideRefillButtons && hasRefill && <RefillButtons />}
            </Stack>
        );
    };

    const MedicationText = () => {
        return (
            <Stack horizontal className={classNames['wc-MedicationListItem--itemHeader']} tokens={{ childrenGap: 4 }}>
                <div className={classNames['wc-MedicationListItem--nameText']} data-testid={'med-name'}>
                    {name} {strength}
                </div>
            </Stack>
        );
    };

    const MedicationMoreInfo = () => {
        const [refillText, setRefillText] = useState('');

        useEffect(() => {
            setRefillText(formatDate(refillDate));
        }, [refillDate]);

        const refillDisplayText = refillDateText ? refillDateText + ' ' + refillText : refillText;

        return (
            <>
                {refillDate ? (
                    <Text
                        className={classNames['wc-MedicationListItem--itemOverflowClass']}
                        data-testid={'med-refill-date'}
                    >
                        {refillDisplayText}
                    </Text>
                ) : (
                    <Text
                        className={classNames['wc-MedicationListItem--itemOverflowClass']}
                        data-testid={'med-condition'}
                    >
                        {conditionText}
                    </Text>
                )}
            </>
        );
    };

    const RefillButtons = () => {
        return (
            <Stack horizontal tokens={{ childrenGap: 8 }}>
                <DefaultButton
                    text={'Refilled'}
                    onClick={(ev) => {
                        trackClick('med-refill-button');
                        onClickRefill(ev);
                    }}
                    allowDisabledFocus
                    data-testid={'med-refill-button'}
                    className={classNames['wc-MedicationListItem--refilledButton']}
                />
                <DefaultButton
                    className={classNames['wc-MedicationListItem--refilledButton']}
                    text={'No Longer Taking'}
                    onClick={(ev) => {
                        trackClick('med-not-taking-button');
                        onClickNotTaking(ev);
                    }}
                    test-dataid="med-not-taking-button"
                    allowDisabledFocus
                />
            </Stack>
        );
    };

    const ProviderInfo = () => {
        const displayName = `${provider?.firstName} ${provider?.lastName}`;
        const formattedPhoneNumber = provider?.phoneNumber ? formatPhoneNumber(provider.phoneNumber) : undefined;

        return (
            <>
                {provider && (
                    <Stack className={classNames['wc-MedicationListItem--secondSection']} tokens={{ childrenGap: 4 }}>
                        <Text
                            className={classNames['wc-MedicationListItem--semiBoldText']}
                            data-testid={'provider-name'}
                        >
                            {displayName}
                        </Text>
                        <Text
                            className={classNames['wc-MedicationListItem--itemOverflowClass']}
                            data-testid={'provider-address'}
                        >
                            {provider.address?.singleLineAddress}
                        </Text>
                        <a
                            data-testid={'provider-phone'}
                            href={`tel: ${provider.phoneNumber}`}
                            className={classNames['wc-MedicationListItem--phoneNumber']}
                            // Prevent clicking phone number from navigating to next screen
                            onClick={(e) => {
                                e.stopPropagation();
                            }}
                        >
                            {formattedPhoneNumber}
                        </a>
                    </Stack>
                )}
            </>
        );
    };

    const PharmacyInfo = () => {
        const formattedPhoneNumber = pharmacy?.phoneNumber ? formatPhoneNumber(pharmacy.phoneNumber) : undefined;

        return (
            <>
                {pharmacy && (
                    <Stack className={classNames['wc-MedicationListItem--thirdSection']} tokens={{ childrenGap: 4 }}>
                        <>
                            <Text
                                className={classNames['wc-MedicationListItem--semiBoldText']}
                                data-testid={'pharmacy-name'}
                            >
                                {pharmacy.name}
                            </Text>
                            <Text
                                className={classNames['wc-MedicationListItem--itemOverflowClass']}
                                data-testid={'pharmacy-address'}
                            >
                                {pharmacy.location?.singleLineAddress}
                            </Text>
                            <a
                                data-testid={'pharmacy-phone'}
                                href={`tel: ${pharmacy.phoneNumber}`}
                                className={classNames['wc-MedicationListItem--phoneNumber']}
                                // Prevent clicking phone number from navigating to next screen
                                onClick={(e) => {
                                    e.stopPropagation();
                                }}
                            >
                                {formattedPhoneNumber}
                            </a>
                        </>
                    </Stack>
                )}
            </>
        );
    };

    const InstructionInfo = () => {
        return (
            <>
                {instructions && (
                    <Stack className={classNames['wc-MedicationListItem--thirdSection']} tokens={{ childrenGap: 4 }}>
                        <>
                            <Text className={classNames['wc-MedicationListItem--semiBoldText']}>Instructions</Text>
                            <Text className={classNames['wc-MedicationListItem--itemOverflowClass']}>
                                {instructions}
                            </Text>
                        </>
                    </Stack>
                )}
            </>
        );
    };

    return <MedicationListItemView />;
};

export default MedicationListItem;
