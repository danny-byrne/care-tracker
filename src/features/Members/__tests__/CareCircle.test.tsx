import { render, screen, act } from '@testing-library/react';

import { CareCircle } from '..';
import { useIsMobile } from 'src/common/hooks/useMediaQueries';

import { mockNavigate } from 'src/setupTests';
import { client as apolloClient } from 'src/common/helpers/ApolloHelper';
import { ApolloProvider } from '@apollo/client';
import { Roles } from 'src/graphQL/serverMocks/graphQLGeneratedCode';

jest.mock('src/common/hooks/useMediaQueries', () => ({
    useIsMobile: jest.fn(() => true),
}));

// Tests default to mobile screens
const mockWindowDimensions = {
    width: 1000,
    height: 1000,
};
jest.mock('src/common/hooks/useMediaQueries', () => ({
    useIsMobile: jest.fn(() => true),
    useWindowDimensions: jest.fn(() => mockWindowDimensions),
}));

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

Object.assign(navigator, {
    clipboard: {
        writeText: () => {},
    },
});

const mockUserName1 = 'Mock User 1';

beforeEach(() => {
    mockNavigate.mockReset();
});

describe('Care Team desktop page with one care member', () => {
    beforeEach(async () => {
        await act(async () => {
            render(
                <ApolloProvider client={apolloClient}>
                    <CareCircle />
                </ApolloProvider>,
            );
        });

        await act(async () => {
            await new Promise((resolve) => setTimeout(resolve, 0));
        });
    });

    beforeAll(() => {
        useIsMobile.mockReturnValue(false);
    });

    afterAll(() => {
        useIsMobile.mockReturnValue(true);
    });

    test('Care Team member list renders on desktop with one care member', async () => {
        const careGiver1 = await screen.findByText(mockUserName1);

        expect(careGiver1).toBeInTheDocument();
    });
});

// This test is being affected by the way that @graphql-tools/mock works. Going to come
// back to it while the PR is up.

// describe('Care Team mobile view with more than one team member', () => {
//     beforeEach(async () => {
//         await act(async () => {
//             render(
//                 <ApolloProvider client={apolloClient}>
//                     <CareCircle />
//                 </ApolloProvider>,
//             );
//         });

//         await act(async () => {
//             await new Promise((resolve) => setTimeout(resolve, 0));
//         });
//     });

//     test('team members render on screen when there is more than one', async () => {
//         const careGiver = screen.queryByText('Care Giver 2');

//         expect(careGiver).toBeInTheDocument();
//     });
// });
