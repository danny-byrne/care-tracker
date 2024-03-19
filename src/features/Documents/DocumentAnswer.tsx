import { Spinner, Stack, Text } from '@fluentui/react';
import React, { useEffect, useState } from 'react';
import { useGetDocumentQuestionAnswerQuery } from 'src/graphQL/serverMocks/graphQLGeneratedCode';
import { useLocation, useParams } from 'react-router';
import { getClassNames } from './DocumentAnswer.classNames';
import { Back, GrayLine } from 'src/common/components';
import SubHeaderLayout from 'src/common/components/Layout/SubHeaderLayout';
import { useCurrentDocumentData } from 'src/common/hooks/useCurrentDocumentData';

const DocumentAnswer: React.FC = () => {
    const classNames = getClassNames();
    const { id } = useParams();
    const { documentName, documentLoading } = useCurrentDocumentData(id);

    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const question = params.get('question');

    const { data: answerData, loading: answerLoading } = useGetDocumentQuestionAnswerQuery({
        variables: { input: { careCircleFileId: id, question: question } },
    });

    const [answerText, setAnswerText] = useState('');
    const [contextText, setContextText] = useState('');
    useEffect(() => {
        if (answerData) {
            const result = answerData?.documentQuestionAnswer?.result;
            const answer = result?.answer;
            const context = result?.context;

            setAnswerText(answer);
            setContextText(context);
        }
    }, [answerData]);

    return (
        <SubHeaderLayout>
            <Stack tokens={{ childrenGap: 10 }}>
                <Back />
                {answerLoading || documentLoading ? (
                    <Spinner />
                ) : (
                    <Stack tokens={{ childrenGap: 10 }}>
                        <Text className={classNames['wc-DocumentAnswer--questionText']}>{question}</Text>
                        <Text className={classNames['wc-DocumentAnswer--answerText']}>{answerText}</Text>
                        {/* Removing 'Explain This' and 'Is this answer helpful' buttons until
                            functionality is developed */}
                        {/* eslint-disable-next-line */}
                        {/* <DefaultButton text="Explain this" className={classNames['wc-DocumentAnswer--explainButton']} /> */}
                        {/* <Stack horizontal className={classNames['wc-DocumentAnswer--helpfulStack']}>
                            <Text className={classNames['wc-DocumentAnswer--helpfulText']}>
                                Is this answer helpful?
                            </Text>
                            <Stack horizontal tokens={{ childrenGap: 12 }}>
                                <IconButton iconProps={{ iconName: 'like' }} />
                                <IconButton iconProps={{ iconName: 'dislike' }} />
                            </Stack>
                        </Stack> */}
                        <div className={classNames['wc-DocumentAnswer--lineContainer']}>
                            <GrayLine />
                        </div>
                        <Stack horizontal className={classNames['wc-DocumentAnswer--foundInStack']}>
                            <Text className={classNames['wc-DocumentAnswer--foundInTitleText']}>
                                This was found in{' '}
                            </Text>
                            <Text className={classNames['wc-DocumentAnswer--foundInDocumentTitle']}>
                                {' '}
                                {documentName}:
                            </Text>
                        </Stack>
                        <Text className={classNames['wc-DocumentAnswer--foundInText']}>{contextText}</Text>
                    </Stack>
                )}
            </Stack>
        </SubHeaderLayout>
    );
};

export default DocumentAnswer;
