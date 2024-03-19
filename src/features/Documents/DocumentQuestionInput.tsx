import { IconButton, Stack, TextField } from '@fluentui/react';
import React, { useEffect, useState } from 'react';

import { useNavigate, useParams } from 'react-router';
import RouterConfig from 'src/app/RouterConfig';
import { getClassNames } from './DocumentQuestionInput.classNames';
import { useCurrentDocumentData } from 'src/common/hooks/useCurrentDocumentData';
import { EXTENSIONS_WITH_EMBEDDINGS_ENABLED, determineNewLineValuesWithinInput } from './helpers';

const DocumentQuestionInput: React.FC = () => {
    const { id } = useParams();
    const classNames = getClassNames();

    const navigate = useNavigate();

    const [textFieldValue, setTextFieldValue] = React.useState<string>('');

    const { documentExtension } = useCurrentDocumentData(id);

    const [questionInputEnabled, setQuestionInputEnabled] = useState(false);

    useEffect(() => {
        setQuestionInputEnabled(EXTENSIONS_WITH_EMBEDDINGS_ENABLED.includes(documentExtension.toLowerCase()));
    }, [documentExtension]);

    const onChangeTextFieldValue = React.useCallback(
        (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
            const inputEvent = event.nativeEvent as InputEvent;
            const inputHasTextValues = determineNewLineValuesWithinInput(newValue || '');
            if (inputEvent.inputType === 'insertLineBreak' && inputHasTextValues) {
                onSubmitTextField();
            } else {
                setTextFieldValue(newValue || '');
            }
        },
        [textFieldValue],
    );

    const onSubmitTextField = async () => {
        navigate(`${RouterConfig.DocumentAnswer(id)}?question=${textFieldValue}`);
    };

    return (
        <>
            {questionInputEnabled && (
                <Stack className={classNames['wc-DocumentQuestionInput--stack']} tokens={{ childrenGap: 10 }}>
                    <div className={classNames['wc-DocumentQuestionInput--textFieldContainer']}>
                        <TextField
                            multiline
                            maxLength={300}
                            autoAdjustHeight
                            styles={{ fieldGroup: { height: '44px' }, field: { paddingRight: '40px' } }}
                            placeholder={'Ask a question'}
                            value={textFieldValue}
                            onChange={onChangeTextFieldValue}
                        />
                        <IconButton
                            iconProps={{ iconName: 'Send' }}
                            title="Emoji"
                            ariaLabel="Emoji"
                            onClick={onSubmitTextField}
                            styles={{
                                root: {
                                    position: 'absolute',
                                    right: '4px',
                                    bottom: '4px',
                                },
                            }}
                        />
                    </div>
                </Stack>
            )}
        </>
    );
};

export default DocumentQuestionInput;
