/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PrimaryButton, IconButton, TextField, Separator } from '@fluentui/react';
import { ReusableModal } from 'src/common/components';

import {
    useGetCarePlanDocumentsQuery,
    useRenameCarePlanDocumentMutation,
    CarePlanDocumentRenameInput,
    useDeleteCarePlanDocumentMutation,
    CarePlanDocumentDeleteInput,
} from 'src/graphQL/serverMocks/graphQLGeneratedCode';
import { useFeedbackService } from 'src/services/FeedbackService';
import { AuthService } from 'src/services/AuthService';

import { getClassNames } from './DocumentDetails.classNames';
import SubHeaderLayout from 'src/common/components/Layout/SubHeaderLayout';
import RouterConfig from 'src/app/RouterConfig';
import { formatFileSize } from './helpers';
import { getDocumentDetailDisplayDate } from 'src/utils/dates';
import { DocumentEditPanelContainerWithHeader } from 'src/common/components/Panel/DocumentEditPanelContainerWithHeader';

import { BACKEND_API_URI } from 'src/app/Constants';

const { getAccessToken } = AuthService;

const DocumentDetails: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { setSuccessToast } = useFeedbackService();

    const classNames = getClassNames();
    const [currentDocument, setCurrentDocument] = useState(null);
    const [isEditView, setIsEditView] = useState(false);
    const [documentName, setDocumentName] = useState('');
    const [deleteDocumentModalVisible, setDeleteDocumentModalVisible] = useState(false);
    const [token, setToken] = useState(null);

    const { data } = useGetCarePlanDocumentsQuery({ fetchPolicy: 'cache-and-network' });

    const [renameCarePlanDocument] = useRenameCarePlanDocumentMutation({
        errorPolicy: 'all',
        refetchQueries: ['GetCarePlanDocuments'],
        onCompleted: () => {
            setSuccessToast('', 'Document Renamed');
            navigate(RouterConfig.Documents, { replace: true });
        },
    });

    const [deleteCarePlanDocument] = useDeleteCarePlanDocumentMutation({
        errorPolicy: 'all',
        refetchQueries: ['GetCarePlanDocuments'],
        onCompleted: () => {
            setSuccessToast('', 'Document Deleted');
            const route = RouterConfig.Documents;
            navigate(route, { replace: true });
        },
    });

    useEffect(() => {
        if (data?.carePlanDocuments) {
            const [doc] = data.carePlanDocuments.filter((currentDocument) => currentDocument.id === id);

            setCurrentDocument(doc);
            if (doc?.name) {
                setDocumentName(doc.name);
            }
        }
    }, [data, id]);

    const handleRenameCarePlanDocument = async () => {
        const input: CarePlanDocumentRenameInput = {
            id: currentDocument.id,
            name: documentName.replace(' ', '_'),
        };
        await renameCarePlanDocument({ variables: { input } });
    };

    const handleDeleteCarePlanDocument = async () => {
        const input: CarePlanDocumentDeleteInput = {
            id: currentDocument.id,
        };
        await deleteCarePlanDocument({ variables: { input } });
    };

    const deleteModalProps = {
        modalTitle: 'Delete Document',
        modalDescriptionText: 'Are you sure you like to delete this document from Connected Care?',
        closeModal: () => navigate(RouterConfig.Documents),
        modalIsOpen: deleteDocumentModalVisible,
        cancelButtonText: 'Cancel',
        cancelButtonOnClick: () => setDeleteDocumentModalVisible(false),
        confirmButtonText: 'Delete',
        confirmButtonOnClick: () => handleDeleteCarePlanDocument(),
    };

    const getBackendApiWIthGQLExtensionRemoved = () => {
        const toBeRemoved = '/graphql/';
        const subStringDeliniator = BACKEND_API_URI.length - toBeRemoved.length;
        const subStringed = BACKEND_API_URI.substring(0, subStringDeliniator);
        return subStringed;
    };

    const backendAPIwithGraphQLRemoved = getBackendApiWIthGQLExtensionRemoved();

    const docUri = backendAPIwithGraphQLRemoved + currentDocument?.downloadUri;

    useEffect(() => {
        const retrieveAccessToken = async () => {
            const token = await getAccessToken().then((value) => {
                return value;
            });

            setToken(token);
        };
        retrieveAccessToken();
    }, []);

    const getFile = async () => {
        await fetch(docUri, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: `application/json`,
                'Content-Type': 'application/json',
                responseType: 'blob',
            },
        })
            /**These are solution investigations into viewing a download in the browser, I will leave them here
             * for when we pick this functionality up in a future sprint. I have a threat on Stack Overflow here
             // eslint-disable-next-line max-len
             * https://stackoverflow.com/questions/75291937/downloading-from-the-server-and-launching-a-preview-of-a-pdf-or-doc-in-a-new-bro?noredirect=1#comment132859063_75291937
             */

            // eslint-disable-next-line max-len
            //solution attempt #1 from https://stackoverflow.com/questions/41561884/how-to-open-a-pdf-in-new-tab-in-reactjs
            //throws error with response.data

            //Create a Blob from the PDF Stream
            // .then((response) => {
            //     const file = new Blob([response.data], { type: `application/${currentDocument.extension}` });
            //     //Build a URL from the file
            //     const fileURL = URL.createObjectURL(file);
            //     //Open the URL on new Window
            //     const pdfWindow = window.open();
            //     pdfWindow.location.href = fileURL;
            // });

            //necessary step for the rest, pull the blog from the res
            .then((res) => {
                return res.blob();
            })

            //from Open AI Codex, downloads a blank file, does not open a new browser window
            // .then((blob) => {
            //     const href = URL.createObjectURL(blob);
            //     window.open(href, '_blank');
            // });

            //#2 / modify the above to resolve errors
            //opens a new tab and downloads something, but both are blank

            // .then((res) => {
            //     //Build a URL from the file
            //     const fileURL = URL.createObjectURL(res);
            //     //Open the URL on new Window
            //     const pdfWindow = window.open();
            //     pdfWindow.location.href = fileURL;
            // });

            // #3 different approach, trying to get reader.result but it's coming back null

            // .then((blob) => {
            //     // based on this https://stackoverflow.com/questions/61402550/react-js-i-need-to-open-file-in-chrome-browser-instead-downloading-for-ex-oncl & https://stackoverflow.com/questions/52955710/type-string-arraybuffer-is-not-assignable-to-type-string

            //     let csv = null;

            //     const promise = new Promise((resolve) => {
            //         const reader = new FileReader();

            //         reader.readAsDataURL(blob);
            //         resolve(reader.result);
            //     });

            //     promise.then((res) => {
            //         csv = res;
            //     });

            //     console.log({ csv }); // this is null still

            //     setTimeout(() => {
            //         window.open(csv);
            //     }, 500);
            // });

            //most recent solution for downloading file to computer, works

            .then((blob) => {
                const href = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = href;
                link.setAttribute('download', currentDocument.name + currentDocument.extension);
                link.click();
            });
    };

    const uploadedBy = currentDocument?.createdBy?.displayName;
    const displayDate = getDocumentDetailDisplayDate(currentDocument?.uploadDate);
    const fileSize = formatFileSize(currentDocument?.fileSizeKB) ?? '';

    const documentDetailsView = (
        <>
            <SubHeaderLayout title={'Document Details'}>
                <div className={classNames['wc-DocumentDetails--landingPage']}>
                    <div className={classNames['wc-DocumentDetails--title']}>
                        {currentDocument?.name + currentDocument?.extension}
                    </div>
                    <div className={classNames['wc-DocumentDetails--subTitle']}>Uploaded by: {uploadedBy}</div>
                    <div className={classNames['wc-DocumentDetails--buttonRow']}>
                        <PrimaryButton text="Download" onClick={() => getFile()} />

                        <IconButton
                            data-testid={'document-rename'}
                            className={classNames['wc-DocumentDetails--button']}
                            iconProps={{ iconName: 'Edit' }}
                            onClick={() => setIsEditView(true)}
                        />
                        <IconButton
                            data-testid={'document-delete'}
                            className={classNames['wc-DocumentDetails--button']}
                            iconProps={{ iconName: 'Delete' }}
                            onClick={() => setDeleteDocumentModalVisible(true)}
                        />
                    </div>
                    <div className={classNames['wc-DocumentDetails--details']}>
                        <div className={classNames['wc-DocumentDetails--detailsText']}>Details:</div>
                        <div className={classNames['wc-DocumentDetails--documentCard']}>
                            <div className={classNames['wc-DocumentDetails--detail']}>{fileSize}</div>
                            <Separator className={classNames['wc-DocumentDetails--divider']} />
                            <div className={classNames['wc-DocumentDetails--detail']}>{displayDate}</div>
                        </div>
                    </div>
                </div>
            </SubHeaderLayout>
            <ReusableModal {...deleteModalProps} />
        </>
    );

    const isActionButtonDisabled = !documentName.length;

    const documentEditView = (
        <DocumentEditPanelContainerWithHeader
            title={'Edit Document'}
            actionButtonText={'Save'}
            actionButtonDisabled={isActionButtonDisabled}
            onClickActionButton={handleRenameCarePlanDocument}
            onClose={() => {
                setIsEditView(false);
                setDocumentName(currentDocument.name);
            }}
        >
            <TextField
                label="Rename"
                required
                value={documentName}
                onChange={(e, value) => setDocumentName(value)}
                componentRef={(input) => input && input.focus()}
            />
        </DocumentEditPanelContainerWithHeader>
    );

    return isEditView ? documentEditView : documentDetailsView;
};

export default DocumentDetails;
