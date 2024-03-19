import { fireEvent, render, screen, act, waitFor } from '@testing-library/react';
import ClearCareCircleModal from '../ClearCareCircleModal';
import { client as apolloClient } from 'src/common/helpers/ApolloHelper';
import { ApolloProvider } from '@apollo/client';

import { getMutationSpy } from 'src/graphQL/serverMocks/server';

describe('Clear Care Circle Modal', () => {
    test('modal does not call clear data mutation if cancel is clicked', async () => {
        const spy = getMutationSpy('ClearCareCircleData');
        render(
            <ApolloProvider client={apolloClient}>
                <ClearCareCircleModal showModal setShowModal={jest.fn()} />
            </ApolloProvider>,
        );

        await act(async () => {
            await new Promise((resolve) => setTimeout(resolve, 0));
        });

        const cancelButton = await screen.findByText('Cancel');
        await fireEvent.click(cancelButton);

        expect(spy).not.toHaveBeenCalled();
    });
    test('modal calls clear data mutation if confirm is clicked', async () => {
        const spy = getMutationSpy('ClearCareCircleData');
        render(
            <ApolloProvider client={apolloClient}>
                <ClearCareCircleModal showModal setShowModal={jest.fn()} />
            </ApolloProvider>,
        );

        await act(async () => {
            await new Promise((resolve) => setTimeout(resolve, 0));
        });

        const confirmButton = await screen.findByText('Confirm');
        await fireEvent.click(confirmButton);

        // Need to add waitFor to give spy time to be called
        await waitFor(() => expect(spy).toHaveBeenCalled());
    });
});
