import React from 'react';
import { MessageBar, MessageBarType, Stack, Text } from '@fluentui/react';
import SubHeaderLayout from 'src/common/components/Layout/SubHeaderLayout';
import {
    Annotation,
    RecordStatus,
    useGetCareGiverAnnotationsQuery,
} from 'src/graphQL/serverMocks/graphQLGeneratedCode';
import { useFeedbackService } from 'src/services/FeedbackService';
import { ERROR_MESSAGES } from 'src/app/Strings';
import AnnotationListItem from './AnnotationListItem';
import { DeleteDialog, Back } from 'src/common/components';
import { PagesWithDelete } from 'src/common/components/dialogs/DeleteDialog';
import { useBoolean } from '@fluentui/react-hooks';
import { useAnnotationDeleteMutation } from 'src/graphQL/serverMocks/graphQLGeneratedCode';
import AnnotationsEmptyState from './AnnotationsEmptyState';

const AnnotationList: React.FC = () => {
    const { setErrorToast } = useFeedbackService();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [selectedAnnotation, setSelectedAnnotation] = React.useState<Annotation>(undefined);

    const [hideDeleteDialog, { toggle: toggleHideDeleteDialog }] = useBoolean(true);

    const { data, loading, error } = useGetCareGiverAnnotationsQuery({
        onError: () => {
            setErrorToast(ERROR_MESSAGES.GENERIC_ERROR);
        },
        fetchPolicy: 'cache-and-network',
    });

    const [deleteAnnotation] = useAnnotationDeleteMutation({
        onError: () => {
            setErrorToast(ERROR_MESSAGES.GENERIC_ERROR);
        },
        refetchQueries: ['GetCareGiverAnnotations'], // Refetch annotations after deletion
    });

    const handleDelete = async (event) => {
        event.preventDefault();
        if (selectedAnnotation) {
            try {
                await deleteAnnotation({ variables: { input: { id: selectedAnnotation.id } } });
                toggleHideDeleteDialog();
            } catch (error) {
                console.error(error);
                setErrorToast(ERROR_MESSAGES.GENERIC_ERROR);
            }
        }
    };

    const onAnnotationDelete = (annotation: Annotation) => {
        setSelectedAnnotation(annotation);
        toggleHideDeleteDialog();
    };

    let content: JSX.Element;
    if (loading) {
        content = <Text>Loading...</Text>;
    } else if (error) {
        console.error(error.message);
        content = <MessageBar messageBarType={MessageBarType.error}>{ERROR_MESSAGES.GENERIC_ERROR}</MessageBar>;
    } else {
        const annotations = data.careGiverAnnotations.annotations
            .filter((annotation) => annotation.recordStatus == RecordStatus.Active)
            .sort((a, b) => new Date(b.createdDateTime).getTime() - new Date(a.createdDateTime).getTime());

        const annotationsContent = (
            <>
                <div>
                    <DeleteDialog
                        hidden={hideDeleteDialog}
                        toggleHideDialog={toggleHideDeleteDialog}
                        onDelete={handleDelete}
                        screen={PagesWithDelete.annotation}
                    >
                        Delete
                    </DeleteDialog>
                </div>
                <Stack>
                    {annotations.map((annotation) => {
                        return (
                            <AnnotationListItem
                                key={annotation.id}
                                annotation={annotation}
                                onDelete={onAnnotationDelete}
                            />
                        );
                    })}
                </Stack>
            </>
        );

        content = annotations.length > 0 ? annotationsContent : <AnnotationsEmptyState />;
    }
    return (
        <SubHeaderLayout title={'Notes and Question History'}>
            <Back />
            {content}
        </SubHeaderLayout>
    );
};

export default AnnotationList;
