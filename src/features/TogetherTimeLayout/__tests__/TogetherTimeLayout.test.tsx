import { render, screen, act } from '@testing-library/react';
import { useIsMobile } from 'src/common/hooks/useMediaQueries';

import TogetherTimeLayout from '..';
import Layout from 'src/common/components/Layout';

import { mockNavigate } from 'src/setupTests';
import { client as apolloClient } from 'src/common/helpers/ApolloHelper';
import { ApolloProvider } from '@apollo/client';
import { Roles } from 'src/graphQL/serverMocks/graphQLGeneratedCode';

beforeEach(() => {
    mockNavigate.mockReset();
});

const mockGetPermissions = jest.fn(() => Roles.Owner);
const mockGetHasAdminPermissions = jest.fn(() => true);
jest.mock('src/services/PermissionsService', () => {
    return {
        usePermissionsService: () => ({
            getPermissions: mockGetPermissions,
            getHasAdminPermissions: mockGetHasAdminPermissions,
        }),
    };
});

const COPY_BUTTON_TEXT = 'Copy Link';

describe('Together Time desktop page', () => {
    beforeAll(() => {
        useIsMobile.mockReturnValue(false);
    });

    afterAll(() => {
        useIsMobile.mockReturnValue(true);
    });

    beforeEach(async () => {
        await act(async () => {
            render(
                <ApolloProvider client={apolloClient}>
                    <TogetherTimeLayout />
                </ApolloProvider>,
            );
        });

        await act(async () => {
            await new Promise((resolve) => setTimeout(resolve, 0));
        });
    });
    // Feed and Activities buttons will not be rendered until feature
    // is implemented

    // test('includes Feed button on Desktop', async () => {
    //     const feedButton = screen.queryByText('Feed');

    //     expect(feedButton).toBeInTheDocument();
    // });
    // test('includes Activities button on Desktop', async () => {
    //     const activitiesButton = screen.queryByText('Activities');

    //     expect(activitiesButton).toBeInTheDocument();
    // });
    test('includes Care Circle button on Desktop', async () => {
        const circleButton = screen.queryByText('Care Circle');

        expect(circleButton).toBeInTheDocument();
    });
});

describe('Together Time desktop page as a reader', () => {
    beforeAll(() => {
        useIsMobile.mockReturnValue(false);
        mockGetPermissions.mockImplementation(() => Roles.Reader);
        mockGetHasAdminPermissions.mockImplementation(() => false);
    });

    afterAll(() => {
        useIsMobile.mockReturnValue(true);
        mockGetPermissions.mockImplementation(() => Roles.Owner);
        mockGetHasAdminPermissions.mockImplementation(() => true);
    });

    beforeEach(async () => {
        await act(async () => {
            render(
                <ApolloProvider client={apolloClient}>
                    <TogetherTimeLayout />
                </ApolloProvider>,
            );
        });

        await act(async () => {
            await new Promise((resolve) => setTimeout(resolve, 0));
        });
    });
    // Feed and Activities buttons will not be rendered until feature
    // is implemented

    // test('includes Feed button on Desktop', async () => {
    //     const feedButton = screen.queryByText('Feed');

    //     expect(feedButton).toBeInTheDocument();
    // });
    // test('includes Activities button on Desktop', async () => {
    //     const activitiesButton = screen.queryByText('Activities');

    //     expect(activitiesButton).toBeInTheDocument();
    // });
    test('includes Care Circle button on Desktop', async () => {
        const circleButton = screen.queryByText('Care Circle');

        expect(circleButton).toBeInTheDocument();
    });
    test('does not include a copy team link button', async () => {
        const copyTeamLink = screen.queryByText(COPY_BUTTON_TEXT);

        expect(copyTeamLink).not.toBeInTheDocument();
    });
});

describe('mobile navigation', () => {
    beforeEach(async () => {
        await act(async () => {
            render(
                <ApolloProvider client={apolloClient}>
                    <Layout title="Together Time">
                        <TogetherTimeLayout />
                    </Layout>
                </ApolloProvider>,
            );
        });

        await act(async () => {
            await new Promise((resolve) => setTimeout(resolve, 0));
        });
    });
    test('shows Together Time page title', async () => {
        const togetherTimeTitle = screen.queryByText(`Care`);

        expect(togetherTimeTitle).toBeInTheDocument();
    });
});
