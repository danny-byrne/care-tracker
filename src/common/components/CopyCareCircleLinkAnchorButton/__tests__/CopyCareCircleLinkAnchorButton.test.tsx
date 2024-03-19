const mockWriteToBuffer = jest.fn();

import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { CopyCareCircleLinkAnchorButton } from '../CopyCareCircleLinkAnchorButton';

import { client as apolloClient } from 'src/common/helpers/ApolloHelper';
import { ApolloProvider } from '@apollo/client';

jest.mock('detect-browser', () => ({
    detect: jest.fn(() => ({
        name: 'chrome',
    })),
}));

Object.assign(navigator, {
    clipboard: {
        writeText: mockWriteToBuffer,
        write: mockWriteToBuffer,
    },
});

describe.skip('Copy Team Link Anchor Button', () => {
    beforeEach(async () => {
        await act(async () => {
            render(
                <ApolloProvider client={apolloClient}>
                    <CopyCareCircleLinkAnchorButton />
                </ApolloProvider>,
            );
        });

        await act(async () => {
            await new Promise((resolve) => setTimeout(resolve, 0));
        });
    });

    test('pressing the button writes the invite link to the buffer', async () => {
        // // This is determined by base url and auth service mocks
        const mockInviteLink = 'https://localhost:443/landing/?inviteCode=test';

        const copyCareCircleLink = screen.queryByText('Copy Link');
        await act(async () => {
            fireEvent.click(copyCareCircleLink);
        });
        await waitFor(() => expect(mockWriteToBuffer).toHaveBeenCalledWith(mockInviteLink));
    });
});
