import { IconButton, IButtonStyles, Modal, Text } from '@fluentui/react';
import React, { useEffect } from 'react';
import { getClassNames } from './FullScreenErrorModal.classNames';

import { useFeedbackService } from 'src/services/FeedbackService';
import { useBoolean } from '@fluentui/react-hooks';

const FullScreenErrorModal: React.FC = () => {
    const classNames = getClassNames();
    const feedbackService = useFeedbackService();

    const [isModalOpen, { setTrue: showModal, setFalse: hideModal }] = useBoolean(false);

    useEffect(() => {
        if (feedbackService.hasErrorFullscreen) {
            showModal();
        }
    });

    const iconButtonStyles: Partial<IButtonStyles> = {
        root: {
            marginLeft: 'auto',
            marginTop: '4px',
            marginRight: '2px',
        },
    };

    return (
        <Modal
            titleAriaId="Error Modal"
            isOpen={isModalOpen}
            onDismiss={hideModal}
            isBlocking
            containerClassName={classNames['wc-Feedback--ModalClass']}
        >
            <div className={classNames['wc-Feedback--ModalHeader']}>
                <span>Error</span>
                <IconButton
                    styles={iconButtonStyles}
                    iconProps={{ iconName: 'Cancel' }}
                    ariaLabel="Close popup modal"
                    onClick={() => {
                        hideModal();
                        feedbackService.clearErrorFullscreen();
                    }}
                />
            </div>
            <div className={classNames['wc-Feedback--ModalBody']}>
                <Text>{feedbackService.message}</Text>
            </div>
        </Modal>
    );
};

export default FullScreenErrorModal;
