import React from 'react';
import ReusableModal from '../ReusableModal';
import { ICustomModalProps } from './ReuseableModal';

const ComingSoonModal: React.FC<ICustomModalProps> = ({ showModal, setShowModal }) => {
    const clearCircleProps = {
        modalTitle: 'Coming Soon',
        modalDescriptionText: 'Feature Coming Soon!',
        closeModal: () => setShowModal(false),
        modalIsOpen: showModal,
    };

    return <ReusableModal {...clearCircleProps} />;
};

export default ComingSoonModal;
