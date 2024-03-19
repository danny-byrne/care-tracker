/*eslint-disable*/
import { useFeedbackService } from 'src/services/FeedbackService';
import {
    useGetProvidersQuery,
    useGetCareRecipientConditionsQuery,
    useGetPharmaciesQuery,
    useGetImmunizationsQuery,
    useGetCareTeamQuery,
    useGetAllergiesQuery,
    RecordStatus,
} from 'src/graphQL/serverMocks/graphQLGeneratedCode';
import { useNavigate, NavigateFunction } from 'react-router';

import React, { useEffect, useState } from 'react';
import { Stack, Text } from '@fluentui/react';

import Accordion from 'src/common/components/Accordion/Accordion';
import ReuseableCardButtonList from 'src/common/components/ReuseableCardButtonList';
import { Header } from 'src/common/components';

import { getClassNames } from './CarePlan.classNames';
import { ERROR_MESSAGES } from 'src/app/Strings';
import RouterConfig from 'src/app/RouterConfig';
import CareRecipientCard from '../CareRecipient/CareRecipientCard';
import { ClipboardHeartIcon } from 'src/assets/Misc/ClipboardHeart';
import { useIsMobile } from 'src/common/hooks/useMediaQueries';

const classNames = getClassNames();

interface CarePlanProps {
    name?: string;
}

const CarePlan: React.FC<CarePlanProps> = ({ name }) => {
    const { setErrorToast } = useFeedbackService();
    const navigate = useNavigate();
    const [healthDetailsButtonProps, setHealthDetailsButtonProps] = useState([]);
    const [contactButtonProps, setContactButtonProps] = useState([]);
    const isMobile = useIsMobile();

    const { data: conditionData, loading: conditionDataLoading } = useGetCareRecipientConditionsQuery({
        onError: () => {
            setErrorToast(ERROR_MESSAGES.GET_CONDITIONS);
        },
    });
    const { data: providerData, loading: providerDataLoading } = useGetProvidersQuery({
        onError: () => {
            setErrorToast(ERROR_MESSAGES.GET_PROVIDERS);
        },
    });
    const { data: pharmacyData, loading: pharmacyDataLoading } = useGetPharmaciesQuery({
        onError: () => {
            setErrorToast(ERROR_MESSAGES.GET_PHARMACIES);
        },
    });
    const { data: immunizationData, loading: immunizationDataLoading } = useGetImmunizationsQuery({
        onError: () => {
            setErrorToast(ERROR_MESSAGES.GET_IMMUNIZATIONS);
        },
    });
    const { data: allergyData, loading: allergyDataLoading } = useGetAllergiesQuery({
        onError: () => {
            setErrorToast(ERROR_MESSAGES.GET_ALLERGIES);
        },
    });
    const { data: careCircleData } = useGetCareTeamQuery({
        onError: () => {
            setErrorToast(ERROR_MESSAGES.GET_CARE_CIRCLE);
        },
    });

    useEffect(() => {
        const numberOfActiveAndNoLongerExperiencingConditions =
            conditionData?.careRecipientConditions?.conditions?.filter(
                (condition) => condition.recordStatus == RecordStatus.Active,
            ).length;

        const conditionsAlreadyAdded =
            !conditionDataLoading && conditionData ? numberOfActiveAndNoLongerExperiencingConditions : 0;

        const activeConditions = conditionData?.careRecipientConditions?.conditions?.filter(
            (condition) => condition.recordStatus == RecordStatus.Active && condition.current,
        ).length;

        const activeImmunizations =
            !immunizationDataLoading && immunizationData
                ? immunizationData?.careRecipientImmunizations?.immunizations.filter(
                      (immunization) => immunization.recordStatus == RecordStatus.Active,
                  ).length
                : 0;

        const activeAllergies =
            !allergyDataLoading && allergyData
                ? allergyData?.careRecipientAllergies?.allergies.filter(
                      (allergy) => allergy.recordStatus == RecordStatus.Active,
                  ).length
                : 0;

        const emergencyContacts = careCircleData
            ? careCircleData.usersCareCircle?.careCircleMembers?.filter((member) => member.isEmergencyContact).length
            : 0;

        const healthDetailsbuttons = getHealthDetailsButtonProps(
            conditionsAlreadyAdded,
            activeConditions,
            activeImmunizations,
            activeAllergies,
            navigate,
        );
        setHealthDetailsButtonProps(healthDetailsbuttons);

        const activeProviders =
            !providerDataLoading && providerData
                ? providerData?.careRecipientProviders?.providers.filter(
                      (provider) => provider.recordStatus == RecordStatus.Active,
                  ).length
                : 0;
        const activePharmacies =
            !pharmacyDataLoading && pharmacyData
                ? pharmacyData?.careRecipientPharmacies?.pharmacies.filter(
                      (pharmacy) => pharmacy.recordStatus == RecordStatus.Active,
                  ).length
                : 0;
        const contactsButtons = getContactsButtonProps(activeProviders, activePharmacies, emergencyContacts, navigate);

        setContactButtonProps(contactsButtons);
    }, [
        pharmacyData,
        providerData,
        conditionData,
        allergyData,
        pharmacyDataLoading,
        providerDataLoading,
        allergyDataLoading,
        immunizationDataLoading,
        conditionDataLoading,
    ]);

    const navigateToHealthInfo = () => navigate(RouterConfig.CarePlan);
    const navigateToMedManager = () => navigate(RouterConfig.Medications, { state: { mode: 'add' } });
    const navigateToMembers = () => navigate(RouterConfig.Members);

    const setupButtonProps = [
        {
            label: `Organize Health Info`,
            onClick: navigateToHealthInfo,
            icon: 'ClipboardHeart',
            IconObject: ClipboardHeartIcon,
        },
        {
            label: `Create a Medication List`,
            onClick: navigateToMedManager,
            icon: 'Pill',
        },
        {
            label: `Invite others to join`,
            onClick: navigateToMembers,
            icon: 'Family',
        },
    ];

    const displayHealthButtons = !allergyDataLoading && !conditionDataLoading && !immunizationDataLoading;
    const displayContactButtons = !providerDataLoading && !pharmacyDataLoading;
    const CarePlanInfo = () => {
        return (
            <>
                {displayHealthButtons && (
                    <Accordion
                        className={classNames['wc-CarePlan--accordion']}
                        collapsed={false}
                        onToggle={() => {}}
                        header={<Header text="Health Information" />}
                    >
                        <ReuseableCardButtonList buttonPropsList={healthDetailsButtonProps} />
                    </Accordion>
                )}

                {displayContactButtons && (
                    <Accordion
                        className={classNames['wc-CarePlan--accordion']}
                        collapsed={false}
                        onToggle={() => {}}
                        header={<Header text="Contacts" />}
                    >
                        <ReuseableCardButtonList buttonPropsList={contactButtonProps} />
                    </Accordion>
                )}
            </>
        );
    };

    return (
        <>
            {!name && (
                <>
                    <Stack
                        tokens={{ childrenGap: 23 }}
                        horizontalAlign="center"
                        className={classNames['wc-CarePlan--landingPage']}
                    >
                        <CareRecipientCard />
                        <Stack
                            horizontalAlign="start"
                            horizontal={!isMobile}
                            className={classNames['wc-CarePlan--Stack']}
                        >
                            {isMobile ? (
                                <div className={classNames['wc-CarePlan--accordionContainer']}>
                                    <CarePlanInfo />
                                </div>
                            ) : (
                                <CarePlanInfo />
                            )}
                        </Stack>
                    </Stack>
                </>
            )}
            {name && (
                <>
                    <Stack
                        tokens={{ childrenGap: 0 }}
                        horizontalAlign="center"
                        className={classNames['wc-CarePlan--landingPage']}
                    >
                        <Text className={classNames['wc-CarePlan--title']}> Welcome to {name}&apos;s Care Circle</Text>
                        <div className={classNames['wc-CarePlan--accordionContainer']}>
                            <Accordion
                                className={classNames['wc-CarePlan--accordion']}
                                collapsed={false}
                                onToggle={() => {}}
                                header={<Header text="Your Setup" />}
                            >
                                <ReuseableCardButtonList buttonPropsList={setupButtonProps} />
                            </Accordion>
                        </div>
                    </Stack>
                </>
            )}
        </>
    );
};

const getContactsButtonProps = (
    activeProviders: number,
    activePharmacies: number,
    emergencyContacts: number,
    navigate: NavigateFunction,
) => {
    const navigateToProviders = () => navigate(RouterConfig.Providers);
    const navigateToProvidersAndLaunchAdd = () => navigate(RouterConfig.Providers, { state: { mode: 'add' } });

    const navigateToPharmacies = () => navigate(RouterConfig.Pharmacies);
    const navigateToPharmaciesAndLaunchAdd = () => navigate(RouterConfig.Pharmacies, { state: { mode: 'add' } });

    const navigateToEmergencyContacts = () => navigate(RouterConfig.EmergencyContacts);

    const providerButton = activeProviders
        ? {
              label: `Providers (${activeProviders})`,
              onClick: navigateToProviders,
              icon: 'Stethoscope',
          }
        : {
              label: 'Add Health Providers',
              onClick: navigateToProvidersAndLaunchAdd,
              icon: 'Stethoscope',
          };

    const pharmacyButton = activePharmacies
        ? {
              label: `Pharmacies (${activePharmacies})`,
              onClick: navigateToPharmacies,
              icon: 'PersonPill',
          }
        : {
              label: 'Add Pharmacies',
              onClick: navigateToPharmaciesAndLaunchAdd,
              icon: 'PersonPill',
          };

    const emergencyContactButton = {
        label: `Emergency Contacts (${emergencyContacts})`,
        onClick: navigateToEmergencyContacts,
        icon: 'PersonCard',
    };

    const contactButtonProps = [providerButton, pharmacyButton];

    // Only show emergency contact if there are some present
    if (emergencyContacts !== 0) contactButtonProps.unshift(emergencyContactButton);

    return contactButtonProps;
};

const getHealthDetailsButtonProps = (
    conditionsAlreadyAdded: number,
    activeConditions: number,
    activeImmunizations: number,
    activeAllergies: number,
    navigate: NavigateFunction,
) => {
    const navigateToConditions = () => navigate(RouterConfig.Conditions);
    const navigateToConditionsAndLaunchAdd = () => navigate(RouterConfig.Conditions, { state: { mode: 'add' } });

    const navigateToImmunizations = () => navigate(RouterConfig.Immunizations);
    const navigateToImmunizationsAndLaunchAdd = () => navigate(RouterConfig.Immunizations, { state: { mode: 'add' } });

    const navigateToAllergies = () => navigate(RouterConfig.Allergies);
    const navigateToAllergiesAndLaunchAdd = () => navigate(RouterConfig.Allergies, { state: { mode: 'add' } });

    const allergiesButton = activeAllergies
        ? {
              label: `Allergies (${activeAllergies})`,
              onClick: navigateToAllergies,
              icon: 'AllergiesIcon',
          }
        : {
              label: 'Add Allergies',
              onClick: navigateToAllergiesAndLaunchAdd,
              icon: 'AllergiesIcon',
          };

    const conditionsButton = conditionsAlreadyAdded
        ? {
              label: `Conditions (${
                  activeConditions ? `${activeConditions} active, ` : ''
              }${conditionsAlreadyAdded} total)`,
              onClick: navigateToConditions,
              icon: 'ClipboardConditions',
          }
        : {
              label: 'Add Conditions',
              onClick: navigateToConditionsAndLaunchAdd,
              icon: 'ClipboardConditions',
          };

    const immunizationsButton = activeImmunizations
        ? {
              label: `Immunizations (${activeImmunizations})`,
              onClick: navigateToImmunizations,
              icon: 'Immunization',
          }
        : {
              label: 'Add Immunizations',
              onClick: navigateToImmunizationsAndLaunchAdd,
              icon: 'Immunization',
          };

    const healthDetailsButtonProps = [allergiesButton, conditionsButton, immunizationsButton];

    return healthDetailsButtonProps;
};

export default CarePlan;
