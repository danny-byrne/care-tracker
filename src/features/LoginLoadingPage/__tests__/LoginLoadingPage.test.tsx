const mockNavigate = jest.fn();

import { render, screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import LoginLoadingPage from '..';
import { AuthService } from 'src/services/AuthService';
import { AuthStatus } from 'src/services/AuthService.status';

import { client as apolloClient } from 'src/common/helpers/ApolloHelper';
import { ApolloProvider } from '@apollo/client';

import { mockName } from 'src/graphQL/serverMocks/__mocks__/UserProfileSummary';
import { Roles } from 'src/graphQL/serverMocks/graphQLGeneratedCode';

import { getMutationSpy, getMutationSpyWithCustomMocks } from 'src/graphQL/serverMocks/server';
import { serverMocks } from 'src/graphQL/serverMocks/mocks';
import { DEFAULT_INVITE_CODE } from 'src/app/Constants';

jest.mock('src/services/AuthService');
jest.mock('src/common/hooks/useHandleAuthentication', () => {
    return {
        useHandleAuthentication: () => ({
            isAuthenticated: true,
            inviteCode: 'defaultInviteCode',
        }),
    };
});

jest.mock('react-router', () => {
    return {
        useNavigate: () => mockNavigate,
    };
});
jest.mock('src/services/AuthService');

beforeEach(() => {
    jest.resetAllMocks();
});

describe.skip('Loading page', () => {
    test('page contains phrase "Hi ${userName}!" after authentication', async () => {
        await act(async () => {
            render(
                <ApolloProvider client={apolloClient}>
                    <LoginLoadingPage />
                </ApolloProvider>,
            );
        });

        // used to wait for authentication to trigger rerender
        const userNameText = await screen.findByText(`Hi ${mockName}!`);

        expect(userNameText).toBeInTheDocument();
    });
    test('page does not contain "Hi" before authentication completes', async () => {
        await act(async () => {
            render(
                <ApolloProvider client={apolloClient}>
                    <LoginLoadingPage />
                </ApolloProvider>,
            );
        });

        const userNameText = screen.queryByText(`Hi`);

        expect(userNameText).toBeNull();
    });
    test('page does not create a care circle if the user already have one', async () => {
        const spy = getMutationSpy('CreateCareCircle');
        await act(async () => {
            render(
                <ApolloProvider client={apolloClient}>
                    <LoginLoadingPage />
                </ApolloProvider>,
            );
        });

        expect(spy).not.toHaveBeenCalled();
    });

    test(`page errors and does not create a care circle if the user does not have one and there is .
    no redirect state`, async () => {
        AuthService.getRedirectState = jest.fn().mockReturnValue(AuthStatus.NO_REDIRECT_STATE);

        serverMocks.UserProfileSummary = () => ({
            careCircleName: null,
            careCircleId: null,
            id: 1,
            role: Roles.Owner,
            imageBase64: '',
            displayName: 'mock',
        });

        const spy = getMutationSpyWithCustomMocks(serverMocks, 'CreateCareCircle');

        await act(async () => {
            render(
                <ApolloProvider client={apolloClient}>
                    <LoginLoadingPage />
                </ApolloProvider>,
            );
        });

        expect(spy).not.toHaveBeenCalled();
    });
    test(`page creates a care circle if the user does not have one and there is a default invite`, async () => {
        AuthService.getRedirectState = jest.fn().mockReturnValue(DEFAULT_INVITE_CODE);

        serverMocks.UserProfileSummary = () => ({
            careCircleName: null,
            careCircleId: null,
            id: 1,
            role: Roles.Owner,
            imageBase64: '',
            displayName: 'mock',
        });

        const spy = getMutationSpyWithCustomMocks(serverMocks, 'CreateCareCircle');

        await act(async () => {
            render(
                <ApolloProvider client={apolloClient}>
                    <LoginLoadingPage />
                </ApolloProvider>,
            );
        });

        waitFor(() => expect(spy).toHaveBeenCalled());
    });

    test(`page does not create a care circle if the user does not
    have one and there is an inviteCode`, async () => {
        AuthService.getRedirectState = jest.fn().mockReturnValue('mockInviteCode');

        serverMocks.UserProfileSummary = () => ({
            careCircleName: null,
            careCircleId: null,
            id: 1,
            role: Roles.Owner,
            imageBase64: '',
            displayName: 'mock',
        });

        const spy = getMutationSpyWithCustomMocks(serverMocks, 'CreateCareCircle');

        await act(async () => {
            render(
                <ApolloProvider client={apolloClient}>
                    <LoginLoadingPage />
                </ApolloProvider>,
            );
        });

        waitFor(() => expect(spy).toHaveBeenCalled());
    });

    test(`page adds user to another care circle if user does not have one
    and there is an invite code`, async () => {
        AuthService.getRedirectState = jest.fn().mockReturnValue('mockInviteCode');

        serverMocks.UserProfileSummary = () => ({
            careCircleName: null,
            careCircleId: null,
            id: 1,
            role: Roles.Owner,
            imageBase64: '',
            displayName: 'mock',
        });

        const spy = getMutationSpyWithCustomMocks(serverMocks, 'JoinCircleFromInviteLink');

        await act(async () => {
            render(
                <ApolloProvider client={apolloClient}>
                    <LoginLoadingPage />
                </ApolloProvider>,
            );
        });

        waitFor(() => expect(spy).toHaveBeenCalled());
    });
});
