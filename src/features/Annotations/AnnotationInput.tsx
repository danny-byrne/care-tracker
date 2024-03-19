import {
    ActionButton,
    CommandButton,
    DefaultButton,
    IconButton,
    IContextualMenuProps,
    IContextualMenuItem,
    Pivot,
    PivotItem,
    Stack,
    TextField,
    Spinner,
    ContextualMenuItemType,
} from '@fluentui/react';
import React, { useContext, useCallback } from 'react';
import {
    AnnotationCreateInput,
    AnnotationType,
    useAnnotationCreateMutation,
    useGetCareRecipientConditionsQuery,
    useGetInquiryConditionAdhocQuestionLazyQuery,
    useGetInquiryNoteParsingLazyQuery,
    RecordStatus,
} from 'src/graphQL/serverMocks/graphQLGeneratedCode';
import { getConditionActive } from '../Conditions/utils';
import { useFeedbackService } from 'src/services/FeedbackService';
import { ERROR_MESSAGES } from 'src/app/Strings';
import { useNavigate } from 'react-router';
import RouterConfig from 'src/app/RouterConfig';
import { getClassNames } from './AnnotationInput.classNames';
import NoteParsingResultModal from './NoteParsingResultModal';
import { IButtonStyles } from '@fluentui/react';
import { determineNewLineValuesWithinInput } from '../Documents/helpers';
import { SessionDataContext } from '../../common/contexts/SessionDataContext';

const buttonStyles: IButtonStyles = {
    root: {
        borderRadius: '0',
        borderColor: '#D1D1D1',
        color: '#323130',
        fontWeight: 400,
    },
    label: {
        fontWeight: 400,
    },
};

const activeConditionsMenuProps = (activeConditions: any[], onClickMenuItemCondition: any) => {
    const conditionMenuItems: IContextualMenuItem[] = [
        {
            key: 'header',
            text: 'Conditions',
            itemType: ContextualMenuItemType.Header,
        },
    ];

    if (activeConditions?.length > 0) {
        conditionMenuItems.push(
            ...activeConditions.map((condition) => ({
                key: condition.id,
                text: condition.condition.name,
            })),
        );
    }

    const menuProps: IContextualMenuProps = {
        items: conditionMenuItems ?? [],
        onItemClick: onClickMenuItemCondition,
    };

    return menuProps;
};

const AnnotationInput: React.FC = () => {
    const classNames = getClassNames();

    const { setErrorToast } = useFeedbackService();
    const navigate = useNavigate();

    const [textFieldValue, setTextFieldValue] = React.useState<string>('');
    const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false);
    const [noteParsingResult, setNoteParsingResult] = React.useState<{ noteId: string; parseResult: any }>(undefined);

    const { data: conditionsData } = useGetCareRecipientConditionsQuery({
        onError: () => {
            setErrorToast(ERROR_MESSAGES.GET_CONDITIONS);
        },
    });

    const [getInquiryConditionAdhocQuestion] = useGetInquiryConditionAdhocQuestionLazyQuery();
    const [getInquiryNoteParsing] = useGetInquiryNoteParsingLazyQuery();

    const [createAnnotation] = useAnnotationCreateMutation({
        refetchQueries: ['GetCareGiverAnnotations'],
        onCompleted: async (data) => {
            const type = data.annotationCreate.result.type;
            const id = data.annotationCreate.result.id;

            switch (type) {
                case AnnotationType.Question:
                    {
                        navigate(RouterConfig.Annotation(id));
                    }
                    break;
                case AnnotationType.Note:
                    {
                        await parseNote(id);
                    }
                    break;
            }

            setIsSubmitting(false);
        },
        onError: (error) => {
            console.error('Error creating annotation', error.message);
            setIsSubmitting(false);
            setErrorToast(ERROR_MESSAGES.GENERIC_ERROR);
        },
    });

    const { annotationType, updateAnnotationType, annotationSelectedCondition, updateAnnotationSelectedCondition } =
        useContext(SessionDataContext);

    const parseNote = useCallback(
        async (noteId: string) => {
            const result = await getInquiryNoteParsing({
                variables: {
                    text: textFieldValue,
                },
            });

            const data = result.data?.inquiryNoteParsing.result;
            const shouldShowParsingResult =
                data &&
                (data.allergies?.length > 0 ||
                    data.conditions?.length > 0 ||
                    data.immunizations?.length > 0 ||
                    data.medications?.length > 0);

            if (shouldShowParsingResult) {
                setNoteParsingResult({ noteId: noteId, parseResult: data });
            } else {
                if (result.error?.message) {
                    console.error('Error parsing note: ', result.error?.message);
                } else {
                    console.info('Note parsing success with empty results');
                }

                navigate(RouterConfig.Annotation(noteId));
            }
        },
        [getInquiryNoteParsing, navigate, textFieldValue],
    );

    const onClickMenuItemCondition = useCallback(
        (ev?: React.MouseEvent<HTMLElement>, item?: IContextualMenuItem) => {
            updateAnnotationSelectedCondition(item.text);
        },
        [updateAnnotationSelectedCondition],
    );

    const onSubmitTextField = useCallback(async () => {
        if (textFieldValue.length == 0) {
            return;
        }
        setIsSubmitting(true);

        switch (annotationType) {
            case AnnotationType.Question:
                {
                    const result = await getInquiryConditionAdhocQuestion({
                        variables: {
                            input: { condition: annotationSelectedCondition, questionText: textFieldValue },
                        },
                    });
                    const answer = result?.data?.inquiryConditionAdhocQuestion?.result.choices?.[0].text;
                    const input: AnnotationCreateInput = {
                        type: annotationType,
                        title: `${annotationSelectedCondition}: ${textFieldValue}`,
                        text: answer,
                    };
                    await await createAnnotation({ variables: { input } });
                }
                break;
            case AnnotationType.Note:
                {
                    const input: AnnotationCreateInput = {
                        type: annotationType,
                        text: textFieldValue,
                    };
                    await createAnnotation({ variables: { input } });
                }
                break;
        }
    }, [
        annotationSelectedCondition,
        annotationType,
        createAnnotation,
        getInquiryConditionAdhocQuestion,
        textFieldValue,
    ]);

    const onChangeTextFieldValue = useCallback(
        (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
            const inputEvent = event.nativeEvent as InputEvent;
            const inputHasTextValues = determineNewLineValuesWithinInput(newValue || '');
            if (inputEvent.inputType === 'insertLineBreak' && inputHasTextValues) {
                onSubmitTextField();
            } else {
                setTextFieldValue(newValue);
            }
        },
        [onSubmitTextField],
    );

    const activeConditions = conditionsData?.careRecipientConditions?.conditions
        ?.filter((condition) => getConditionActive(condition) && condition.recordStatus == RecordStatus.Active)
        .sort((c1, c2) => c1.condition.name.localeCompare(c2.condition.name));

    if (activeConditions?.length > 0 && !annotationSelectedCondition) {
        const activeCondition = activeConditions[0].condition?.name;
        updateAnnotationSelectedCondition(activeCondition);

        if (annotationType != AnnotationType.Question) {
            updateAnnotationType(AnnotationType.Question);
        }
    } else if (activeConditions?.length == 0) {
        if (annotationType != AnnotationType.Note) {
            updateAnnotationType(AnnotationType.Note);
        }
    }

    const menuProps: IContextualMenuProps = activeConditionsMenuProps(activeConditions, onClickMenuItemCondition);

    const handleSubmit = useCallback(
        async (text: string) => {
            if (text.length == 0) {
                return;
            }

            setIsSubmitting(true);

            const result = await getInquiryConditionAdhocQuestion({
                variables: {
                    input: { condition: annotationSelectedCondition, questionText: text },
                },
            });
            const answer = result?.data?.inquiryConditionAdhocQuestion?.result.choices?.[0].text;
            const input: AnnotationCreateInput = {
                type: annotationType,
                title: `${annotationSelectedCondition}: ${text}`,
                text: answer,
            };
            await createAnnotation({ variables: { input } });

            setIsSubmitting(false);
        },
        [annotationSelectedCondition, annotationType, createAnnotation, getInquiryConditionAdhocQuestion],
    );

    const noteParsingResultModal = noteParsingResult ? (
        <NoteParsingResultModal noteId={noteParsingResult.noteId} noteParsingResult={noteParsingResult.parseResult} />
    ) : null;

    return (
        <>
            {noteParsingResultModal ?? noteParsingResultModal}

            <Stack className={classNames['wc-AnnotationInput--stack']} tokens={{ childrenGap: 10 }}>
                <Stack horizontal horizontalAlign="space-between" verticalAlign="center">
                    <Pivot
                        selectedKey={annotationType}
                        linkFormat="tabs"
                        onLinkClick={(item) => updateAnnotationType(item.props.itemKey as AnnotationType)}
                    >
                        {annotationSelectedCondition && (
                            <PivotItem itemKey={AnnotationType.Question} headerText="Ask a Question" />
                        )}

                        <PivotItem itemKey={AnnotationType.Note} headerText="Take a Note" />
                    </Pivot>

                    <ActionButton
                        className={classNames['wc-AnnotationInput--historyButton']}
                        allowDisabledFocus
                        onClick={() => navigate(RouterConfig.Annotations)}
                    >
                        See History
                    </ActionButton>
                </Stack>
                <Stack tokens={{ childrenGap: 10 }} className={classNames['wc-AnnotationInput--inputContainer']}>
                    {annotationType === AnnotationType.Question && annotationSelectedCondition && (
                        <CommandButton
                            className="ms-motion-fadeIn"
                            text={annotationSelectedCondition}
                            menuProps={menuProps}
                            data-testid="condition-select"
                        />
                    )}
                    <div className={classNames['wc-AnnotationInput--textFieldContainer']}>
                        <TextField
                            multiline
                            maxLength={300}
                            autoAdjustHeight
                            styles={{ fieldGroup: { height: 'auto' }, field: { paddingRight: '40px' } }}
                            placeholder={
                                annotationType === AnnotationType.Question
                                    ? 'Ask a question about the condition'
                                    : 'Add a note'
                            }
                            value={textFieldValue}
                            onChange={onChangeTextFieldValue}
                        />

                        {isSubmitting ? (
                            <Spinner
                                styles={{
                                    root: {
                                        position: 'absolute',
                                        right: '10px',
                                        bottom: '10px',
                                    },
                                }}
                            />
                        ) : (
                            <IconButton
                                iconProps={{ iconName: 'Send' }}
                                disabled={isSubmitting}
                                title="Submit"
                                ariaLabel="Submit"
                                onClick={onSubmitTextField}
                                styles={{
                                    root: {
                                        position: 'absolute',
                                        right: '4px',
                                        bottom: '4px',
                                    },
                                }}
                            />
                        )}
                    </div>

                    {annotationType === AnnotationType.Question && (
                        <Stack
                            className={classNames['wc-AnnotationInput--pills']}
                            tokens={{ childrenGap: 8 }}
                            enableScopedSelectors
                            horizontal
                            wrap
                        >
                            <DefaultButton
                                text="What do I ask a clinician?"
                                onClick={() => handleSubmit('What do I ask a clinician?')}
                                styles={buttonStyles}
                            />

                            <DefaultButton
                                text="Is it reversible?"
                                onClick={() => handleSubmit('Is it reversible?')}
                                styles={buttonStyles}
                            />
                        </Stack>
                    )}
                </Stack>
            </Stack>
        </>
    );
};

export default AnnotationInput;
