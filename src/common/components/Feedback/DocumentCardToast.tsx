import React from 'react';

import { getClassNames } from './DocumentCardToast.classNames';
import { Stack, Text, MessageBar, MessageBarType } from '@fluentui/react';

interface IDocumentCardToastProps {
    messageBarType?: MessageBarType;
    text: string;
}

const DocumentCardToast: React.FC<IDocumentCardToastProps> = ({ messageBarType = MessageBarType.info, text }) => {
    const classNames = getClassNames();

    return (
        <div className={classNames['wc-DocumentCardToast--toastWrapper']}>
            <MessageBar aria-label="Action Feedback" messageBarType={messageBarType} isMultiline={false}>
                <Stack horizontal>
                    <Stack>
                        <Text className={classNames['wc-DocumentCardToast--textContainer']}>{text}</Text>
                    </Stack>
                </Stack>
            </MessageBar>
        </div>
    );
};

export default DocumentCardToast;
