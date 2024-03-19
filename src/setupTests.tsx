import 'regenerator-runtime/runtime';

import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import { useQueryStringParamsReturn } from 'src/common/hooks/useQueryStringParams';
import { initializeIcons, setIconOptions } from '@fluentui/react';

import { server } from './graphQL/serverMocks/server';
import { client as apolloClient } from 'src/common/helpers/ApolloHelper';

initializeIcons(undefined, { disableWarnings: true });

// Suppress icon warnings.
setIconOptions({
    disableWarnings: true,
});

jest.mock('src/services/AuthService');

jest.mock('react-router', () => {
    return {
        useNavigate: () => mockNavigate,
        useLocation: mockLocation,
        // Outlets are automatically set up as a blank div
        // The actual outlet screens should have their own test suites
        Outlet: () => {
            return <div />;
        },
    };
});

jest.mock('react-router-dom', () => {
    return {
        useNavigate: () => mockNavigate,
        navigate: () => mockNavigate(),
        useSearchParams: () => [mockSearchParams(), jest.fn()],
        useParams: () => mockParams(),
    };
});

jest.mock('src/common/hooks/useQueryStringParams', () => {
    return {
        useQueryStringParams: (): useQueryStringParamsReturn => {
            return {
                searchParams: mockParams(),
                getSearchParam: mockGetSearchParam,
                addSearchParam: mockAddSearchParam,
                removeSearchParam: mockRemoveSearchParam,
            };
        },
    };
});

// Tests default to mobile screens
const mockWindowDimensions = {
    width: 1000,
    height: 1000,
};
jest.mock('src/common/hooks/useMediaQueries', () => ({
    useIsMobile: jest.fn(() => true),
    useWindowDimensions: jest.fn(() => mockWindowDimensions),
}));

// This sets a clipboard object for copying links
Object.assign(navigator, {
    clipboard: {
        writeText: () => {},
    },
});

// These functions can be imported into test suites and checked for execution
// e.g. expect(mockNavigate).toHaveBeenCalledWith(RouterConfig.DashboardPage);
export const mockNavigate = jest.fn();
export const mockLocation = jest.fn().mockImplementation(() => ({
    pathname: 'mockPath',
}));
export const mockSearchParams = jest.fn(() => {
    return {
        get: (param: string) => {
            return null;
        },
    };
});
export const mockParams = jest.fn(() => {
    return {};
});
export const mockGetSearchParam = jest.fn((key: string) => {
    return undefined;
});
export const mockAddSearchParam = jest.fn();
export const mockRemoveSearchParam = jest.fn();

// Establish API mocking before all tests.
beforeAll(() => server.listen());

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.

// Also clearing Apollo cache after each test.
afterEach(() => {
    server.resetHandlers();
    apolloClient.clearStore();
});

// Clean up after the tests are finished.
afterAll(() => server.close());
