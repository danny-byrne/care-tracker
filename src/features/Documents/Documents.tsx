import React, { useState, useEffect } from 'react';
import {
    CustomActionButton,
    CustomActionButtonType,
} from 'src/common/components/CustomActionButton/CustomActionButton';
import { DocumentUploadIcon } from 'src/assets/Misc/DocumentUpload';

import { useNavigate } from 'react-router-dom';

import { SearchBox, Spinner } from '@fluentui/react';
import { ReusableModal } from 'src/common/components';
import { getIcon, formatFileSize } from './helpers';
import { getDocumentCardDisplayDate } from 'src/utils/dates';
import { getClassNames } from './Documents.classNames';
import RouterConfig from 'src/app/RouterConfig';
import UploadDocumentFAB from 'src/common/components/FAB/UploadDocumentFAB';
import { useIsMobile } from 'src/common/hooks/useMediaQueries';

const MAX_ALLOWED_UPLOAD_MB_SIZE = 30;

interface DocumentsProps {
    handleOnClick?: () => void;
    fileIsTooBigUploadAttempt: boolean;
    setFileIsTooBigUploadAttempt: (boolean) => void;
    uploadLoading: boolean;
    fileUploadInput: any;
    showUpLoadingModal: boolean;
    setShowUpLoadingModal: (boolean) => void;
    documents: any;
}
const classNames = getClassNames();

const Documents: React.FC<DocumentsProps> = ({
    handleOnClick,
    fileIsTooBigUploadAttempt,
    setFileIsTooBigUploadAttempt,
    uploadLoading,
    fileUploadInput,
    showUpLoadingModal,
    setShowUpLoadingModal,
    documents,
}) => {
    const isMobile = useIsMobile();

    const [showCancelUploadDialog, setShowCancelUploadDialog] = useState(false);
    const [filteredDocuments, setFilteredDocuments] = useState([]);

    const [searchText, setSearchText] = useState('');

    useEffect(() => {
        if (searchText.length) {
            const filtered = documents.filter((document) =>
                document.name.toLowerCase().includes(searchText.toLowerCase()),
            );
            setFilteredDocuments([...filtered]);
        }
    }, [searchText]);

    const buttonProps = {
        label: 'Upload a document',
        onClick: handleOnClick,
        icon: '',
        IconObject: DocumentUploadIcon,
    };

    const cancelUpload = () => {
        console.log('cancelling');
        //TODO: Figure out what to do here
    };

    const loadingModalProps = {
        modalTitle: 'Upload in progress',
        modalDescriptionText: 'Navigating away will cancel your upload and your document will not be saved.',
        closeModal: () => setShowCancelUploadDialog(true),
        modalIsOpen: uploadLoading && showUpLoadingModal,
        cancelButtonText: 'Go back',
        cancelButtonOnClick: () => setShowCancelUploadDialog(true),
        confirmButtonText: 'Continue',
        confirmButtonOnClick: () => setShowUpLoadingModal(false),
    };

    const cancelModalProps = {
        modalTitle: 'Are you sure you want to cancel the upload?',
        modalDescriptionText: 'Your document will not be saved',
        closeModal: () => cancelUpload(),
        modalIsOpen: uploadLoading,
        cancelButtonText: 'Go back',
        cancelButtonOnClick: () => cancelUpload(),
        confirmButtonText: 'Continue',
        confirmButtonOnClick: () => cancelUpload(),
    };

    const fileIsTooBigModalProps = {
        modalTitle: 'This file is too big',
        modalDescriptionText: `Your document needs to be smaller than ${MAX_ALLOWED_UPLOAD_MB_SIZE}MB`,
        closeModal: () => setFileIsTooBigUploadAttempt(false),
        modalIsOpen: fileIsTooBigUploadAttempt,
        confirmButtonText: 'Try Again',
        confirmButtonOnClick: () => {
            setFileIsTooBigUploadAttempt(false);
            handleOnClick();
        },
    };

    const getModalProps = () => {
        if (fileIsTooBigUploadAttempt) {
            return fileIsTooBigModalProps;
        } else return showCancelUploadDialog ? cancelModalProps : loadingModalProps;
    };

    const modalProps = getModalProps();

    const uploadDocumentButton = (
        <div className={classNames['wc-Documents--button']}>
            <CustomActionButton {...buttonProps} buttonType={CustomActionButtonType.Only} />
            {fileUploadInput}
        </div>
    );

    const documentsToDisplay = searchText.length ? filteredDocuments : documents;

    const documentListView = (
        <>
            <div className={classNames['wc-Documents--documentCardList']}>
                {uploadLoading && <Spinner />}
                <SearchBox
                    placeholder="Search documents"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    onClear={() => setSearchText('')}
                />
                {documentsToDisplay.map((doc) => {
                    return <DocumentCard doc={doc} key={doc.id} />;
                })}
            </div>
            {isMobile && (
                <>
                    <UploadDocumentFAB onClick={() => handleOnClick()} disabled={false} />
                    {fileUploadInput}
                </>
            )}
        </>
    );

    const documentsContent = documents.length || searchText ? documentListView : uploadDocumentButton;

    return (
        <>
            <div className={classNames['wc-Documents--landingPage']}>
                <div className={classNames['wc-Documents--title']}>Organize Documents</div>
                <div className={classNames['wc-Documents--subTitle']}>Add any file up to 30MB</div>
                {documentsContent}
            </div>
            <ReusableModal {...modalProps} />
        </>
    );
};

interface DocumentCardProps {
    doc: {
        id: string;
        uploadDate: string;
        fileSizeKB: number;
        extension: string;
        name: string;
    };
}

const DocumentCard: React.FC<DocumentCardProps> = ({ doc }) => {
    const navigate = useNavigate();

    const { uploadDate, fileSizeKB, extension, name, id } = doc;
    const computedDate = getDocumentCardDisplayDate(uploadDate);
    const fileSize = formatFileSize(fileSizeKB);

    const icon = getIcon(extension);
    return (
        <div
            className={classNames['wc-Documents--documentCard']}
            onClick={() => navigate(RouterConfig.Document(id))}
            data-testid="document-list-item"
        >
            <div className={classNames['wc-Documents--documentIcon']}>{icon}</div>
            <div className={classNames['wc-Documents--documentDetails']}>
                <div className={classNames['wc-Documents--documentTitle']}>{name}</div>
                <div className={classNames['wc-Documents--documentSizeDate']}>{`${fileSize} • ${computedDate}`}</div>
            </div>
        </div>
    );
};

export default Documents;
