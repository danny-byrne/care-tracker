/*eslint-disable*/
import { useFeedbackService } from 'src/services/FeedbackService';
import { useGetUserInfoQuery, useClearCareCircleDataMutation } from 'src/graphQL/serverMocks/graphQLGeneratedCode';

import React, { useEffect, useState } from 'react';
import ReusableModal from '../ReusableModal';

import { ICustomModalProps } from './ReuseableModal';
import { AuthService } from 'src/services/AuthService';

import { ERROR_MESSAGES } from 'src/app/Strings';
import { Spinner } from '@fluentui/react';

const ClearCareCircleModal: React.FC<ICustomModalProps> = ({ showModal, setShowModal }) => {
    const feedbackService = useFeedbackService();
    const [careCircleName, setCareCircleName] = useState(null);

    const { data, loading } = useGetUserInfoQuery();

    useEffect(() => {
        if (data?.me) {
            setCareCircleName(data.me.careCircleName);
        }
    }, [data]);

    const [deleteCareCircle] = useClearCareCircleDataMutation({
        onCompleted: () => {
            AuthService.logout();
        },
        onError: () => {
            feedbackService.setErrorToast(ERROR_MESSAGES.DELETE_CARE_CIRCLE);
            setShowModal(false);
        },
    });

    const clearCircleProps = {
        modalTitle: 'Clear data',
        modalDescriptionText:
            'This will provide you a fresh start and remove the existing information for your care circle.',
        confirmButtonText: 'Confirm',
        confirmButtonOnClick: () => deleteCareCircle({ variables: { careCircleName: careCircleName } }),
        cancelButtonText: 'Cancel',
        cancelButtonOnClick: () => setShowModal(false),
        closeModal: () => setShowModal(false),
        modalIsOpen: showModal,
    };

    return loading ? <Spinner /> : <ReusableModal {...clearCircleProps} />;
};

export default ClearCareCircleModal;
