import React from 'react';
import { DefaultButton, Text, Modal, Icon, PrimaryButton, TextField } from '@fluentui/react';
import { getClassNames } from './ReuseableModal.classNames';

const ReusableModal = (props: IReusableModalProps) => {
    const {
        modalDescriptionText,
        closeModal,
        modalIsOpen,
        modalIsRenameDocumentTitle = false,
        documentTitle = '',
        setDocumentTitle,
    } = props;
    const classNames = getClassNames();

    return (
        <Modal
            isOpen={modalIsOpen}
            onDismiss={closeModal}
            containerClassName={classNames['wc-ReuseableModal--modalContainer']}
        >
            <div className={classNames['wc-ReuseableModal--modalContentContainer']}>
                <ModalTitleRow {...props} />

                {modalIsRenameDocumentTitle ? (
                    <>
                        <TextField
                            componentRef={(input) => input && input.focus()}
                            label="Rename"
                            required
                            value={documentTitle}
                            onChange={(e, value) => setDocumentTitle(value)}
                        />
                    </>
                ) : (
                    <Text className={classNames['wc-ReuseableModal--modalInfoText']}>{modalDescriptionText}</Text>
                )}

                <ModalButtonRow {...props} />
            </div>
        </Modal>
    );
};

interface IReusableModalProps {
    modalTitle: string;
    modalDescriptionText?: string;
    confirmButtonText?: string;
    confirmButtonOnClick?: () => void;
    cancelButtonText?: string;
    cancelButtonOnClick?: () => void;
    closeModal: () => void;
    modalIsOpen: boolean;
    modalIsRenameDocumentTitle?: boolean;
    documentTitle?: string;
    setDocumentTitle?: (string) => void;
}

const ModalTitleRow = (props: IModalTitleRowProps) => {
    const { modalTitle, closeModal } = props;
    const classNames = getClassNames();

    return (
        <div className={classNames['wc-ReuseableModal--modalTextContainer']}>
            <Text className={classNames['wc-ReuseableModal--modalTitleText']}>{modalTitle}</Text>
            <DefaultButton className={classNames['wc-ReuseableModal--closeButton']}>
                <Icon iconName="ChromeClose" onClick={closeModal} />
            </DefaultButton>
        </div>
    );
};

interface IModalTitleRowProps {
    modalTitle: string;
    closeModal: () => void;
}

const ModalButtonRow = (props: IModalButtonRowProps) => {
    const { confirmButtonOnClick, confirmButtonText, cancelButtonOnClick, cancelButtonText } = props;
    const classNames = getClassNames();
    return (
        <div className={classNames['wc-ReuseableModal--modalButtonRow']}>
            {cancelButtonText && <DefaultButton onClick={cancelButtonOnClick}>{cancelButtonText}</DefaultButton>}
            {confirmButtonText && (
                <PrimaryButton
                    onClick={confirmButtonOnClick}
                    className={classNames['wc-ReuseableModal--confirmButton']}
                >
                    {confirmButtonText}
                </PrimaryButton>
            )}
        </div>
    );
};

interface IModalButtonRowProps {
    confirmButtonText?: string;
    confirmButtonOnClick?: () => void;
    cancelButtonText?: string;
    cancelButtonOnClick?: () => void;
}

export interface ICustomModalProps {
    showModal: boolean;
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export default ReusableModal;
