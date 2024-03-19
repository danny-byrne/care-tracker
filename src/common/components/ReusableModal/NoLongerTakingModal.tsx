import React from 'react';
import { useEndMedicationMutation } from 'src/graphQL/serverMocks/graphQLGeneratedCode';
import ReusableModal from '.';

import { ICustomModalProps } from './ReuseableModal';

interface INoLongerTakingModalProps {
    text: string;
    id: string;
}

const NoLongerTakingModal: React.FC<ICustomModalProps & INoLongerTakingModalProps> = ({
    showModal,
    setShowModal,
    text,
    id,
}) => {
    const [moveMedicationToNoLongerTaking] = useEndMedicationMutation({
        variables: { id: id },
        refetchQueries: ['GetPrescriptionsWithSchedule', 'GetMedication'],
    });

    const noLongerTakingProps = {
        modalTitle: 'Move to No longer taking',
        modalDescriptionText: text,
        confirmButtonText: 'Save',
        confirmButtonOnClick: () => moveMedicationToNoLongerTaking(),
        cancelButtonText: 'Cancel',
        cancelButtonOnClick: () => setShowModal(false),
        closeModal: () => setShowModal(false),
        modalIsOpen: showModal,
    };

    return <ReusableModal {...noLongerTakingProps} />;
};

export default NoLongerTakingModal;
