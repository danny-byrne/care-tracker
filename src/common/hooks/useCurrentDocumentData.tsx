import { useEffect, useState } from 'react';
import { useGetCarePlanDocumentsQuery } from 'src/graphQL/serverMocks/graphQLGeneratedCode';

export const useCurrentDocumentData = (id) => {
    const { data, loading: documentLoading } = useGetCarePlanDocumentsQuery();

    const [documentName, setDocumentName] = useState('');
    const [documentExtension, setDocumentExtension] = useState('');

    useEffect(() => {
        if (data) {
            const filteredDocumentArray = data?.carePlanDocuments?.filter((doc) => doc.id === id);
            const currentDocument = filteredDocumentArray[0];
            const { name, extension } = currentDocument;
            setDocumentName(`${name}${extension}`);
            setDocumentExtension(extension);
        }
    }, [data, id]);

    return { documentName, documentExtension, documentLoading };
};
