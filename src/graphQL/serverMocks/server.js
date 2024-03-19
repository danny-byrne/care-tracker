import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { gql } from '@apollo/client';

import { buildClientSchema, execute } from 'graphql';
import { addMocksToSchema } from '@graphql-tools/mock';

import introspection from './introspection.json';
import { serverMocks } from './mocks';

// Custom function to generate responses for Mock Service Worker using schema mocks from
// introspection file.

// Aditional operationToSpy and mockFn inputs allow for getMutationSpy function to easily
// check operationName and compare if a specific mutation was called
const generateServerResponses = (mocks, operationToSpy = null, mockFn = null) => {
    // Build a schema using the introspection
    const schema = buildClientSchema(introspection);

    const mockedSchema = addMocksToSchema({
        schema,
        mocks,
    });

    return rest.post('https://localhost:7110/graphql', async (req, res, ctx) => {
        // Optional check for a specific mutation to have been run
        if (operationToSpy && req.body.operationName === operationToSpy) {
            mockFn();
        }

        const result = await execute(
            mockedSchema,
            gql`
                ${req.body.query}
            `,
            null,
            null,
            req.body.variables,
        );

        return res(ctx.json(result));
    });
};

const postRequest = generateServerResponses(serverMocks);

// Set up a server that reads a GraphQL document and returns the data for it
export const server = setupServer(postRequest);

export const connectMocksToServer = (mocks) => {
    const postRequest = generateServerResponses(mocks);
    server.use(postRequest);
};

export const getMutationSpy = (operationToSpy) => {
    const mockFn = jest.fn();

    const requestWithMutation = generateServerResponses(serverMocks, operationToSpy, mockFn);
    server.use(requestWithMutation);

    return mockFn;
};

export const getMutationSpyWithCustomMocks = (mocks, operationToSpy) => {
    const mockFn = jest.fn();

    const requestWithMutation = generateServerResponses(mocks, operationToSpy, mockFn);
    server.use(requestWithMutation);

    return mockFn;
};
