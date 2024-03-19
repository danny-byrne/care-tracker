import { fireEvent, render, screen, act } from '@testing-library/react';
import LandingPage from '..';
import { AuthService } from 'src/services/AuthService';
import RouterConfig from 'src/app/RouterConfig';

import { mockSearchParams } from 'src/setupTests';
import { DEFAULT_INVITE_CODE } from 'src/app/Constants';
import { client as apolloClient } from 'src/common/helpers/ApolloHelper';
import { ApolloProvider } from '@apollo/client';

const mockInviteCode = 'mockInvite';

beforeEach(() => {
    AuthService.getIsAuthenticated = jest.fn().mockReturnValue(false); // Testing unauthenticated pages
});

describe('Landing page', () => {
    beforeEach(async () => {
        await act(async () => {
            render(
                <ApolloProvider client={apolloClient}>
                    <LandingPage />
                </ApolloProvider>,
            );
        });
    });

    test('contains a sign in button', async () => {
        const signInButton = screen.getByText(/Sign in/i);

        expect(signInButton).toBeInTheDocument();
    });
    test('contains a Create a new account button', async () => {
        const newAccountButton = screen.getByText(/Create a new account/i);

        expect(newAccountButton).toBeInTheDocument();
    });
});

describe('invite code given', () => {
    beforeAll(() => {
        mockSearchParams.mockImplementation(() => {
            return {
                get: (param: string) => {
                    return mockInviteCode;
                },
            };
        });
    });

    beforeEach(async () => {
        await act(async () => {
            render(
                <ApolloProvider client={apolloClient}>
                    <LandingPage />
                </ApolloProvider>,
            );
        });

        await act(async () => {
            await new Promise((resolve) => setTimeout(resolve, 0));
        });
    });

    test('shows care circle name when an invite code is given', async () => {
        const careCircleName = screen.getByText('Mock Care Circle', { exact: false });

        expect(careCircleName).toBeInTheDocument();
    });
    test('does not show Project Windcrest when an invite code is given', async () => {
        const windcrestBanner = screen.queryByText('Project Windcrest');

        expect(windcrestBanner).not.toBeInTheDocument();
    });
    test('does not show info text when invite code is given', async () => {
        const infoText = screen.queryByText('Manage medications,', { exact: false });

        expect(infoText).not.toBeInTheDocument();
    });
    test('new account button calls loginRedirectWithCustomState function', async () => {
        const spy = jest.spyOn(AuthService, 'loginRedirectWithCustomState');

        const newAccountButton = screen.getByText(/Create a new account/i);
        fireEvent.click(newAccountButton);

        expect(spy).toHaveBeenCalledWith(RouterConfig.LoginLoadingPage, mockInviteCode);
    });

    afterAll(() => {
        mockSearchParams.mockImplementation(() => {
            return {
                get: (param: string) => {
                    return null;
                },
            };
        });
    });
});

describe('no invite code given', () => {
    beforeEach(async () => {
        await act(async () => {
            render(
                <ApolloProvider client={apolloClient}>
                    <LandingPage />
                </ApolloProvider>,
            );
        });

        await act(async () => {
            await new Promise((resolve) => setTimeout(resolve, 0));
        });
    });

    test('shows Project Windcrest when no invite code is given', async () => {
        const windcrestBanner = screen.getByText('Welcome to Windcrest');

        expect(windcrestBanner).toBeInTheDocument();
    });
    test('shows info text when no invite code is given', async () => {
        const infoText = screen.getByText('Spending', { exact: false });

        expect(infoText).toBeInTheDocument();
    });
    test('sign in button calls loginRedirect function pointing to loading page with default invite code', async () => {
        const spy = jest.spyOn(AuthService, 'loginRedirectWithCustomState');

        const signInButton = screen.getByText(/Sign in/i);
        fireEvent.click(signInButton);

        expect(spy).toHaveBeenCalledWith(RouterConfig.LoginLoadingPage, DEFAULT_INVITE_CODE);
    });
    test('new account button calls loginRedirect function pointing to loading page', async () => {
        const spy = jest.spyOn(AuthService, 'loginRedirectWithCustomState');

        const newAccountButton = screen.getByText(/Create a new account/i);
        fireEvent.click(newAccountButton);

        expect(spy).toHaveBeenCalledWith(RouterConfig.LoginLoadingPage, DEFAULT_INVITE_CODE);
    });
});
