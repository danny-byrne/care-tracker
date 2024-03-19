import React from 'react';
import { useEffect } from 'react';
import { useFeedbackService } from 'src/services/FeedbackService';
import { useIsMobile, useWindowDimensions } from 'src/common/hooks/useMediaQueries';

import { getClassNames, CLOSE_BUTTON_PADDING } from './Feedback.classNames';
import { Stack, Text, MessageBar, MessageBarType, DefaultButton } from '@fluentui/react';

import { colors } from 'src/common/styles/colors';

// Figma Link: https://www.figma.com/file/iKU0KE0nZ14MqB6oBFw99c/MEDMGR%2FMedication-List?node-id=278%3A213573
const Toast: React.FC = () => {
    const classNames = getClassNames();
    const feedbackService = useFeedbackService();

    useEffect(() => {
        // Clear the toast after 3 seconds
        setTimeout(() => {
            feedbackService.clearFeedback();
        }, 3000);
    }, []);

    let messageBarType = MessageBarType.info;
    let textColor = colors.windcrest.info;
    let iconName = 'ToastInfo';
    if (feedbackService.hasErrorToast) {
        messageBarType = MessageBarType.error;
        textColor = colors.windcrest.error;
        iconName = 'ToastError';
    } else if (feedbackService.hasSuccessToast) {
        messageBarType = MessageBarType.success;
        textColor = colors.windcrest.success;
        iconName = 'ToastCheck';
    }

    const { width } = useWindowDimensions();
    const isMobile = useIsMobile();

    // Variable toast width depending on screen size and if mobile
    const PADDING_RIGHT = 20;
    const PADDING_LEFT = isMobile ? 16 : 81;

    const toastWidth = width - PADDING_LEFT - PADDING_RIGHT - CLOSE_BUTTON_PADDING;

    return (
        <div
            className={classNames['wc-Feedback--toastWrapper']}
            style={{ width: toastWidth, paddingLeft: PADDING_LEFT, paddingRight: PADDING_RIGHT }}
        >
            <MessageBar
                aria-label="Action Feedback"
                className={classNames['wc-Feedback--ToastClass']}
                messageBarType={messageBarType}
                isMultiline={false}
                onDismiss={feedbackService.clearFeedback}
                dismissButtonAriaLabel="Close"
                messageBarIconProps={{ iconName: iconName }}
            >
                <Stack horizontal className={classNames['wc-Feedback--toastContentContainer']}>
                    <Stack>
                        {feedbackService.title && (
                            <Text style={{ color: textColor }} className={classNames['wc-Feedback--headerText']}>
                                {feedbackService.title}
                            </Text>
                        )}

                        <Text style={{ color: textColor }} className={classNames['wc-Feedback--messageText']}>
                            {feedbackService.message}
                        </Text>
                    </Stack>
                    {feedbackService.actionText && feedbackService.actionOnClick && (
                        <DefaultButton
                            style={{ color: textColor }}
                            className={classNames['wc-Feedback--actionButton']}
                            onClick={feedbackService.actionOnClick}
                        >
                            {feedbackService.actionText}
                        </DefaultButton>
                    )}
                </Stack>
            </MessageBar>
        </div>
    );
};

export default Toast;
