# General

These toasts are used to display messages to the user. They work in conjunction with the FeedbackService to display information to users.

# Toast

The Toast component displays as either a success toast or an error toast, depending on whether feedbackService.hasErrorToast or feedbackService.hasSuccessToast is set. The FeedbackService is written in such a way that only one can be true at a time.
Toast components are used to show temporary data to users, e.g. a successfully added medication or a failed network call. The toast will display for 5 seconds and then call feedbackService.clearFeedback() to clear the toast.
In order to show toasts on a component, the <Toast /> component should be rendered conditionally based on whether or not feedbackService.hasToast() returns true.

Toasts can be triggered by calling feedbackService.setSuccessToast() or feedbackService.setErrorToast() with the message to display.

Because the FeedbackService is implemented using a useReducer hook, the toast will be cleared if the user refreshes.

Toasts are currently rendered in the top level Layout component.

# FullScreenErrorModal

The FullScreenErrorModal component fully blocks the screen to display an error message. This is meant for errors that break the experience of the app, like an authentication failure.

Modals can be triggered by calling feedbackService.setErrorFullscreen() with the message to display.

Because the FeedbackService is implemented using a useReducer hook, the modal will be cleared if the user refreshes.

# TODO:

-   run accessibility tool to make sure toast can be picked up by screen readers.
