// import { useState, useEffect } from 'react';

// import { AuthService } from 'src/services/AuthService';
// import { HubConnectionBuilder } from '@microsoft/signalr';
// import { NavigateFunction, useNavigate } from 'react-router';
// import RouterConfig from 'src/app/RouterConfig';
// import { client } from 'src/common/helpers/ApolloHelper';
// import { IFeedbackService, useFeedbackService } from 'src/services/FeedbackService';
// import { isNotRunningInJest } from 'src/utils/utils';

// import { SIGNALR_URI } from 'src/app/Constants';
// import { LOCAL_STORAGE_KEYS } from 'src/app/Strings';

// export const useConnectToSignalR = () => {
//     const [connection, setConnection] = useState(null);
//     const navigate = useNavigate();
//     const feedbackService = useFeedbackService();

//     useEffect(() => {
//         // SignalR code is causing failures in test suite, websocket should not be opened if running in Jest
//         if (isNotRunningInJest()) {
//             const newConnection = new HubConnectionBuilder()
//                 .withUrl(SIGNALR_URI, { accessTokenFactory: AuthService.getAccessToken })
//                 .build();

//             setConnection(newConnection);
//         }
//     }, []);

//     useEffect(() => {
//         if (connection) {
//             connection
//                 .start()
//                 .then(() => {
//                     connection.on('PushToast', (message) => {
//                         handlePushToast(message, navigate, feedbackService);
//                     });
//                 })
//                 .catch((e) => console.log('Connection failed: ', e));
//         }
//     }, [connection]);
// };

// const handlePushToast = (message: string, navigate: NavigateFunction, feedbackService: IFeedbackService) => {
//     const notificationInfo = JSON.parse(message);
//     if (notificationInfo.Type === 'AppInviteAccepted') {
//         let invitesPending = parseInt(localStorage.getItem(LOCAL_STORAGE_KEYS.INVITES_PENDING));
//         if (isNaN(invitesPending)) invitesPending = 0;

//         const toastTitle =
//             invitesPending !== 0
//                 ? `${invitesPending + 1} people are waiting`
//                 : notificationInfo.Data.CareGiverDisplayName;
//         const toastMessage = invitesPending !== 0 ? `to join the circle.` : 'wants to join the circle.';

//         const actionButtonText = 'Review';
//         const actionButtonOnClick =
//             invitesPending !== 0
//                 ? () => navigate(RouterConfig.TogetherTimeLayout)
//                 : () =>
//                       navigate(RouterConfig.TogetherTimeLayout, {
//                           state: { careGiverId: notificationInfo.Data.CareGiverId },
//                       });

//         // Refresh care team to pull in new info
//         client.refetchQueries({ include: ['GetCareTeam'] });

//         feedbackService.setInfoToast(toastMessage, toastTitle, actionButtonText, actionButtonOnClick);
//     }
// };
