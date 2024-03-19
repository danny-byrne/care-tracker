import React from 'react';
import { useParams } from 'react-router-dom';
import { useFeedbackService } from 'src/services/FeedbackService';
import { useGetCareGiverAnnotationQuery } from 'src/graphQL/serverMocks/graphQLGeneratedCode';
import { MessageBar, MessageBarType, Stack, Text } from '@fluentui/react';
import SubHeaderLayout from 'src/common/components/Layout/SubHeaderLayout';
import { ERROR_MESSAGES } from 'src/app/Strings';
import { Back } from 'src/common/components';
const AnnotationView: React.FC = () => {
    const { setErrorToast } = useFeedbackService();
    const { id } = useParams();

    const { loading, error, data } = useGetCareGiverAnnotationQuery({
        variables: { id },
        onError: (err) => {
            setErrorToast(err.message);
        },
    });

    let content: JSX.Element;
    if (loading) {
        content = <Text>Loading...</Text>;
    } else if (error) {
        console.error('Error loading annotation', error.message);
        content = <MessageBar messageBarType={MessageBarType.error}>{ERROR_MESSAGES.GENERIC_ERROR}</MessageBar>;
    } else {
        const annotation = data?.careGiverAnnotations?.annotations[0];
        const textLines = annotation.text?.split('\n').map((line, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <p key={index}>{line}</p>
        ));
        content = (
            <Stack data-testid="annotationView">
                <Back />
                <Text variant="xLarge">{annotation.title}</Text>
                <Text variant="medium">{textLines}</Text>
            </Stack>
        );
    }

    return <SubHeaderLayout title={'Annotation Detail'}>{content}</SubHeaderLayout>;
};

export default AnnotationView;
