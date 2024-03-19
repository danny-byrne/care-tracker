import React, { useRef, useState, useEffect } from 'react';
import { Stack } from '@fluentui/react';

import SubHeaderWithSubNavLayout from 'src/common/components/Layout/SubHeaderWithSubNavLayout';
import {
    useUploadCarePlanDocumentMutation,
    CarePlanDocumentUploadInput,
    useGetCarePlanDocumentsLazyQuery,
    useCreateDocumentEmbeddingsMutation,
} from 'src/graphQL/serverMocks/graphQLGeneratedCode';
import { useFeedbackService } from 'src/services/FeedbackService';
import { ReusableModal } from 'src/common/components';

import { Documents } from 'src/features/Documents';
import { removeExtension, makeDuplicateFileName } from '../Documents/helpers';
import { MAX_ALLOWED_SIZE, MINIMUM_UPLOAD_SIZE_TO_SHOW_UPLOAD_MODAL } from './contants';
import { carePlanSubNavigationsButtons } from './CarePlanLayout.config';
import { EXTENSIONS_WITH_EMBEDDINGS_ENABLED } from '../Documents/helpers';

interface CarePlanLayoutProps {
    children?: React.ReactNode;
}

const CarePlanLayout: React.FC<CarePlanLayoutProps> = ({ children }) => {
    const { setSuccessToast, setErrorToast } = useFeedbackService();

    const [showAddButton, setShowAddButton] = useState(false);
    const [fileIsTooBigUploadAttempt, setFileIsTooBigUploadAttempt] = useState(false);
    const [showUpLoadingModal, setShowUpLoadingModal] = useState(false);
    const [file, setFile] = useState(null);
    const [fileRenameIsOpen, setFileRenameIsOpen] = useState(false);
    const [fileExtension, setFileExtension] = useState(null);
    const [fileName, setFileName] = useState('');
    const [currentDocumentNames, setCurrentDocumentNames] = useState([]);
    const [documents, setDocuments] = useState([]);

    const documentUploader = useRef(null);

    const handleOnClick = () => {
        documentUploader.current.click();
    };

    const getCarePlanDocumentsWrapper = async () => {
        const res = await getCarePlanDocuments();
        if (res?.data?.carePlanDocuments.length) {
            const docs = [...res.data.carePlanDocuments];
            setDocuments(docs);
            const docNames = docs.map((doc) => removeExtension(doc.name).fileName);
            setCurrentDocumentNames(docNames);
            setShowAddButton(true);
        }
    };

    useEffect(() => {
        getCarePlanDocumentsWrapper();
    }, []);

    useEffect(() => {
        if (fileName && currentDocumentNames.includes(fileName)) {
            const incrementedFileName = makeDuplicateFileName(fileName);
            setFileName(incrementedFileName);
        }
    }, [fileName]);

    const [getCarePlanDocuments] = useGetCarePlanDocumentsLazyQuery({
        fetchPolicy: 'cache-and-network',
        onCompleted: () => {},
    });

    const [createDocumentEmbeddings] = useCreateDocumentEmbeddingsMutation();

    const [uploadCarePlanDocument, { loading: uploadLoading }] = useUploadCarePlanDocumentMutation({
        errorPolicy: 'all',
        refetchQueries: ['GetCarePlanDocuments'],
        onError: () => {
            setErrorToast('Something went wrong');
        },
        onCompleted: async (result) => {
            const fileId = result?.carePlanDocumentUpload?.file?.id;
            const extension = result?.carePlanDocumentUpload?.file?.extension;
            if (EXTENSIONS_WITH_EMBEDDINGS_ENABLED.includes(extension)) {
                await createDocumentEmbeddings({ variables: { input: { careCircleFileId: fileId } } });
            }
            setSuccessToast('Document Added');
            getCarePlanDocumentsWrapper();
        },
    });

    const handleDocumentChange = (e) => {
        const [file] = e.target.files;

        const fileIsTooBig = file?.size > MAX_ALLOWED_SIZE;

        if (fileIsTooBig) {
            setFileIsTooBigUploadAttempt(true);
            e.target.files = [];
            return;
        }

        if (file && !fileIsTooBig) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            handleDocumentNaming(file);
        }
    };

    const handleDocumentNaming = (file) => {
        const { extension, fileName } = removeExtension(file.name);

        setFile(file);
        setFileExtension(extension);
        setFileName(fileName);
        setFileRenameIsOpen(true);
    };

    const handleDocumentUpload = async () => {
        //snake case the file name so whitespace is not removed on the backend
        let snakeCasedFileName = fileName
            .split('')
            .map((char) => {
                return char === ' ' ? '_' : char;
            })
            .join('');

        const fileToSend = new File([file], snakeCasedFileName + fileExtension);

        const upload: CarePlanDocumentUploadInput = {
            file: fileToSend,
        };

        if (file.size > MINIMUM_UPLOAD_SIZE_TO_SHOW_UPLOAD_MODAL) {
            setShowUpLoadingModal(true);
        }

        await uploadCarePlanDocument({ variables: { input: upload } });

        if (showUpLoadingModal) {
            setShowUpLoadingModal(false);
        }
        setFile(null);
        setFileExtension(null);
    };

    const fileUploadInput = (
        <input
            type="file"
            onChange={handleDocumentChange}
            ref={documentUploader}
            style={{
                display: 'none',
            }}
        />
    );

    const documentRenameModalProps = {
        modalTitle: 'Name document',
        closeModal: () => setFileRenameIsOpen(false),
        modalIsOpen: fileRenameIsOpen,
        confirmButtonText: 'Continue',
        confirmButtonOnClick: () => {
            setFileRenameIsOpen(false);
            handleDocumentUpload();
        },
        modalIsRenameDocumentTitle: true,
        documentTitle: fileName,
        setDocumentTitle: (value) => setFileName(value),
    };

    return (
        <>
            <SubHeaderWithSubNavLayout
                title={'Care Plan'}
                actionButtonText={showAddButton && !children ? 'Upload file' : null}
                buttons={carePlanSubNavigationsButtons}
                defaultKey={carePlanSubNavigationsButtons[0].key}
                onClickActionButton={handleOnClick}
                onClickUploadDocument={handleDocumentChange}
            >
                <Stack>
                    {children ?? (
                        <Documents
                            handleOnClick={handleOnClick}
                            fileIsTooBigUploadAttempt={fileIsTooBigUploadAttempt}
                            setFileIsTooBigUploadAttempt={setFileIsTooBigUploadAttempt}
                            uploadLoading={uploadLoading}
                            fileUploadInput={fileUploadInput}
                            showUpLoadingModal={showUpLoadingModal}
                            setShowUpLoadingModal={setShowUpLoadingModal}
                            documents={documents}
                        />
                    )}
                </Stack>
            </SubHeaderWithSubNavLayout>
            <ReusableModal {...documentRenameModalProps} />
        </>
    );
};

export default CarePlanLayout;
