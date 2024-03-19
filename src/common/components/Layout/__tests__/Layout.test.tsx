import { render, screen, act } from '@testing-library/react';
import { mockNavigate } from 'src/setupTests';
import { useIsMobile } from 'src/common/hooks/useMediaQueries';

import Layout from '..';
import { client as apolloClient } from 'src/common/helpers/ApolloHelper';
import { ApolloProvider } from '@apollo/client';

const testTitle = 'Test Title';

beforeEach(() => {
    mockNavigate.mockReset();
});

describe('desktop page', () => {
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
                    <Layout title={testTitle}>hi</Layout>
                </ApolloProvider>,
            );
        });

        await act(async () => {
            await new Promise((resolve) => setTimeout(resolve, 0));
        });
    });

    test('does not show Hamburger', async () => {
        const hamburgerButton = screen.queryByLabelText(`Hamburger`);

        expect(hamburgerButton).not.toBeInTheDocument();
    });
    test('shows side menu', async () => {
        const sideMenu = screen.queryByTestId(`SideMenu`);

        expect(sideMenu).toBeInTheDocument();
    });
});

describe('mobile navigation', () => {
    beforeEach(async () => {
        await act(async () => {
            render(
                <ApolloProvider client={apolloClient}>
                    <Layout title={testTitle}>hi</Layout>
                </ApolloProvider>,
            );
        });

        await act(async () => {
            await new Promise((resolve) => setTimeout(resolve, 0));
        });
    });

    test('does not show side menu', async () => {
        const sideMenu = screen.queryByTestId(`SideMenu`);

        expect(sideMenu).not.toBeInTheDocument();
    });
});
