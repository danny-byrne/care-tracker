import { ConfigUpdatedListener } from '@ms/centro-hvc-loader';
import { IFeedbackInitOptions } from './FeedbackTypes';
import { InitialFeedbackData as defaultFeedbackData } from 'src/userfeedback/InitParameters';
// This is the object which is used to open/close/update data to
const feedbackData = defaultFeedbackData;

export const InAppFeedbackInit = (() => {
    /*
    Register and Unregister is part of the boilerplate code to enable dynamic data passing
    */
    const register = (
        listener?: ConfigUpdatedListener<IFeedbackInitOptions>,
    ): Readonly<Partial<IFeedbackInitOptions>> => {
        if (listener) {
            listeners.push(listener);
        }
        return feedbackData;
    };

    const unregister = (listener: ConfigUpdatedListener<IFeedbackInitOptions>): void => {
        const index = listeners.indexOf(listener);
        if (index > -1) {
            listeners.splice(index, 1);
        }
    };

    const listeners: ConfigUpdatedListener<IFeedbackInitOptions>[] = [];
    /*
    This is the list of function provided to update the data passed to Feedback
    */
    const updateFeedbackObject = (updatedInAppFeedbackInitOptions: IFeedbackInitOptions) => {
        // eslint-disable-next-line no-restricted-properties
        Object.assign(feedbackData, updatedInAppFeedbackInitOptions);
        listeners.forEach((listener: ConfigUpdatedListener<IFeedbackInitOptions>) => listener(feedbackData));
    };

    const configObject = {
        register,
        unregister,
        updateFeedbackObject,
    };
    return configObject;
})();
