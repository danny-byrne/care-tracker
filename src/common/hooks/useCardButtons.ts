import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useFeedbackService } from 'src/services/FeedbackService';
import { useGetPrescriptionsQuery } from 'src/graphQL/serverMocks/graphQLGeneratedCode';
import { usePermissionsService } from 'src/services/PermissionsService';

import RouterConfig from 'src/app/RouterConfig';
import { Roles } from 'src/graphQL/serverMocks/graphQLGeneratedCode';
import { trackClick } from 'src/wcpConsentInit';

export const useCardButtons = () => {
    const [buttonPropsList, setButtonPropsList] = useState([]);
    const { getPermissions, getHasAdminPermissions } = usePermissionsService();
    const feedbackService = useFeedbackService();
    const navigate = useNavigate();

    const careTeamButton = {
        label: 'Build your care circle',
        onClick: () => {
            trackClick('build-care-circle');
            navigate(RouterConfig.TogetherTimeLayout);
        },
    };
    const medicationButton = {
        label: 'Add your first medication',
        onClick: () => {
            trackClick('add-first-medication');

            navigate(RouterConfig.Medications + '?mode=add');
        },
    };

    const { loading, error, data } = useGetPrescriptionsQuery({
        skip: !getHasAdminPermissions(),
        onError: () => {
            feedbackService.setErrorToast(error.message);
        },
    });

    useEffect(() => {
        const addCareTeamButtonToList = () => {
            const canAddToCareTeam = getPermissions() === Roles.Owner;

            let arr = [];
            if (canAddToCareTeam) arr.push(careTeamButton);

            return arr;
        };

        const addMedicationsButtonToList = (arr) => {
            let medications = data?.careRecipientMedicationPrescriptions?.prescriptions?.filter(
                (prescriptions) => prescriptions.medication?.name !== undefined,
            );

            if (medications?.length === 0) {
                arr.push(medicationButton);
            }

            return arr;
        };

        if (!loading) {
            let buttonArr = addCareTeamButtonToList();

            if (getHasAdminPermissions()) buttonArr = addMedicationsButtonToList(buttonArr);

            setButtonPropsList(buttonArr);
        }
    }, [loading]);

    return buttonPropsList;
};
