import { render, screen, fireEvent } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import AppProfile from '..';
import { AuthService } from 'src/services/AuthService';
import { client as apolloClient } from 'src/common/helpers/ApolloHelper';
import { ApolloProvider } from '@apollo/client';

import {
    mockName,
    mockEmail,
    mockMobile,
    UserProfileSummary,
} from 'src/graphQL/serverMocks/__mocks__/UserProfileSummary';
import { connectMocksToServer } from 'src/graphQL/serverMocks/server';
import { serverMocks } from 'src/graphQL/serverMocks/mocks';
import { mockGetSearchParam } from 'src/setupTests';
import { formatPhoneNumber } from 'src/utils/utils';

mockGetSearchParam.mockImplementation((key: string) => {
    if (key === 'appProfile') return 'menu';
});

describe('panel with email and phone number given', () => {
    beforeEach(async () => {
        await act(async () => {
            render(
                <ApolloProvider client={apolloClient}>
                    <AppProfile isPanelOpen hidePanel={() => null} />
                </ApolloProvider>,
            );
        });

        await act(async () => {
            await new Promise((resolve) => setTimeout(resolve, 0));
        });
    });

    test('contains a profile picture"', async () => {
        const profilePic = screen.getByTestId(`avatar`);

        expect(profilePic).toBeInTheDocument();
    });
    test('shows shows user name', async () => {
        const name = screen.getByText(mockName);

        expect(name).toBeInTheDocument();
    });
    test('shows email address', async () => {
        const email = screen.getByText(mockEmail);

        expect(email).toBeInTheDocument();
    });
    test('shows phone number', async () => {
        const mobile = screen.getByText(formatPhoneNumber(mockMobile));

        expect(mobile).toBeInTheDocument();
    });
});

describe('no email given', () => {
    beforeEach(async () => {
        serverMocks.UserProfileSummary = () => ({
            ...UserProfileSummary(),
            email: null,
        });
        connectMocksToServer(serverMocks);

        await act(async () => {
            render(
                <ApolloProvider client={apolloClient}>
                    <AppProfile isPanelOpen hidePanel={() => null} />
                </ApolloProvider>,
            );
        });

        await act(async () => {
            await new Promise((resolve) => setTimeout(resolve, 0));
        });
    });

    test('does not show email address', async () => {
        const email = screen.queryByText(mockEmail);

        expect(email).not.toBeInTheDocument();
    });
    test('still shows phone number', async () => {
        const mobile = screen.getByText(formatPhoneNumber(mockMobile));

        expect(mobile).toBeInTheDocument();
    });
});

describe('no phone given', () => {
    beforeEach(async () => {
        serverMocks.UserProfileSummary = () => ({
            ...UserProfileSummary(),
            mobile: null,
        });
        connectMocksToServer(serverMocks);

        await act(async () => {
            render(
                <ApolloProvider client={apolloClient}>
                    <AppProfile isPanelOpen hidePanel={() => null} />
                </ApolloProvider>,
            );
        });

        await act(async () => {
            await new Promise((resolve) => setTimeout(resolve, 0));
        });
    });

    test('still shows email address', async () => {
        const email = screen.getByText(mockEmail);

        expect(email).toBeInTheDocument();
    });
    test('does not show phone number', async () => {
        const mobile = screen.queryByText(formatPhoneNumber(mockMobile));

        expect(mobile).not.toBeInTheDocument();
    });
});

describe('Sign out button', () => {
    test('logs user out', async () => {
        const signOutSpy = jest.spyOn(AuthService, 'logout');
        await act(async () => {
            render(
                <ApolloProvider client={apolloClient}>
                    <AppProfile isPanelOpen hidePanel={() => null} />
                </ApolloProvider>,
            );
        });

        await act(async () => {
            await new Promise((resolve) => setTimeout(resolve, 0));
        });

        const signOutButton = screen.getByText(`Sign Out`);
        fireEvent.click(signOutButton);

        expect(signOutSpy).toHaveBeenCalled();
    });
});

describe('Menu buttons', () => {
    beforeEach(async () => {
        await act(async () => {
            render(
                <ApolloProvider client={apolloClient}>
                    <AppProfile isPanelOpen hidePanel={() => null} />
                </ApolloProvider>,
            );
        });

        await act(async () => {
            await new Promise((resolve) => setTimeout(resolve, 0));
        });
    });
    //bypass until we bring back notifications
    // test('contains a Notifications menu button', async () => {
    //     const notifications = screen.getByText('Notifications');

    //     expect(notifications).toBeInTheDocument();
    // });
    test('contains a Data & Storage menu button', async () => {
        const data = screen.getByText('Data & Storage');

        expect(data).toBeInTheDocument();
    });
});
