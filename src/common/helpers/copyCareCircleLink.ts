import { useState } from 'react';
import { useFeedbackService } from 'src/services/FeedbackService';
import { useCreateInviteMutation } from 'src/graphQL/serverMocks/graphQLGeneratedCode';
import { useIsMobile } from '../hooks/useMediaQueries';

import { BASE_REDIRECT_URI } from 'src/app/Constants';
import { USER_MESSAGES } from 'src/app/Strings';
import { useGetUserInfoQuery } from 'src/graphQL/serverMocks/graphQLGeneratedCode';

const { detect } = require('detect-browser');
const browser = detect();

export const useCopyLink = () => {
    const feedbackService = useFeedbackService();
    const [safariMobileCareCircleLink, setSafariMobileCareCircleLink] = useState(null);

    const { data } = useGetUserInfoQuery();
    const isMobile = useIsMobile();

    let careCircleId;

    if (data) {
        careCircleId = data.me.careCircleId.toString();
    }

    const { setErrorToast, setSuccessToast } = feedbackService;

    const [createInviteLink, { loading }] = useCreateInviteMutation({
        variables: { careCircleId: careCircleId },
        onError: (error) => {
            setErrorToast(error.message);
        },
    });

    const generateLink = async () => {
        const { data } = await createInviteLink();

        if (data) {
            const inviteCode = data.createInvite.result.inviteCode;
            const inviteUrl = `${BASE_REDIRECT_URI}/landing/?inviteCode=${inviteCode}`;

            setSafariMobileCareCircleLink(inviteUrl);
        }
    };

    const copyLink = async () => {
        // clipboard API is handled differently in Safari vs other browsers,
        //commenting this out until we can figure this out
        //DANNY NOTE: safari detection not working in mobile, browser.name coming back as
        //'ios' on safari and chrome in responsive desktop
        if (!isMobile && browser.name.includes('safari')) {
            let inviteCode;

            // Current version of Typescript doesn't include default interface for ClipboardItem
            // eslint-disable-next-line
            const clipboardItem = new ClipboardItem({
                'text/plain': createInviteLink().then((response) => {
                    if (response.data) {
                        inviteCode = response.data.createInvite.result.inviteCode;
                        if (!inviteCode) {
                            return new Promise((resolve) => {
                                resolve(new Blob[``]());
                            });
                        }
                        const inviteUrl = `${BASE_REDIRECT_URI}/landing/?inviteCode=${inviteCode}`;
                        return new Promise((resolve) => {
                            resolve(new Blob([inviteUrl]));
                        });
                    }
                }),
            });

            try {
                await navigator.clipboard.write([clipboardItem]);
                if (!inviteCode) {
                    setErrorToast('Error getting invite code');
                } else {
                    setSuccessToast(USER_MESSAGES.COPY_LINK_SUCCESS);
                }
            } catch (err) {
                setErrorToast(err.message);
            }
        } else {
            if (isMobile) {
                try {
                    await navigator.clipboard.writeText(safariMobileCareCircleLink);
                    setSafariMobileCareCircleLink(null);
                    setSuccessToast(USER_MESSAGES.COPY_LINK_SUCCESS, USER_MESSAGES.COPY_LINK_TITLE);
                } catch (err) {
                    setErrorToast(err.message);
                }
                return;
            } else {
                const { data } = await createInviteLink();

                if (data) {
                    const inviteCode = data.createInvite.result.inviteCode;
                    const inviteUrl = `${BASE_REDIRECT_URI}/landing/?inviteCode=${inviteCode}`;

                    try {
                        await navigator.clipboard.writeText(inviteUrl);
                        if (!inviteCode) {
                            setErrorToast('Error getting invite code');
                        } else {
                            setSuccessToast(USER_MESSAGES.COPY_LINK_SUCCESS, USER_MESSAGES.COPY_LINK_TITLE);
                        }
                    } catch (err) {
                        setErrorToast(err.message);
                    }
                }
            }
        }
    };

    return { copyLink, loading, generateLink };
};
