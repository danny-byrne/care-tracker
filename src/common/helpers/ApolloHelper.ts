import { ApolloClient, ApolloLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { AuthService, IAuthService } from 'src/services/AuthService';
import { BACKEND_API_URI } from 'src/app/Constants';
import fetch from 'cross-fetch';
import { createUploadLink } from 'apollo-upload-client';
import { capitalizeFirstLetterOfEachWord, formatZip } from './textFormatting';

// References:
// - https://www.apollographql.com/docs/react/api/link/introduction
// -

// Almost every GraphQL endpoint will need to be authenticated. We will specify the few operations
// that don't need an Authorization header.
const UNAUTHENTICATED_OPERATIONS = ['appInvitation'];

export const withToken = (authService: IAuthService) =>
    setContext(async ({ operationName }, { headers }) => {
        if (UNAUTHENTICATED_OPERATIONS.includes(operationName)) {
            return headers;
        }
        const userToken = await authService.getAccessToken();
        return {
            headers: {
                ...headers,
                Authorization: userToken ? `bearer ${userToken}` : '',
            },
        };
    });

/* Error link
// See:
// - https://www.apollographql.com/docs/react/data/error-handling/
// - https://www.apollographql.com/docs/react/api/link/apollo-link-error/
// - https://www.apollographql.com/blog/graphql/error-handling/full-stack-error-handling-with-graphql-apollo/
//
// HttpLink distinguishes between client errors, server errors, and GraphQL errors. It may send back
// any of the following errors:
//
// - Client Parse: ClientParseError. The request body is not serializable, for example due to a
//   circular reference.
// - Server Parse: ServerParseError. The server's response cannot be parsed (response.json()).
// - Server Network: ServerError. The server responded with a non-2xx HTTP code. When a network
//   error occurs, Apollo Client adds it to the error.networkError field returned by your useQuery
//   call (or whichever operation hook you used).
// - Server Data: ServerError. The server's response didn't contain data or errors.
// - GraphQL Error: (not an error). Resolving the GraphQL operation resulted in at least one error,
//   which is present in the errors array of the response. If a GraphQL error occurs, your server
//   includes it in the errors array of its response to Apollo Client. Apollo Client then adds those
//   errors to the error.graphQLErrors array returned by your useQuery call (or whichever operation
//   hook you used).
*/
export const resetToken = onError(({ graphQLErrors, networkError, operation }) => {
    if (graphQLErrors) {
        for (let err of graphQLErrors) {
            switch (err.extensions?.code) {
                // Apollo Server sets code to UNAUTHENTICATED when an AuthenticationError is thrown
                // in a resolver. This includes when old tokens expire.
                // We should really never get here because withToken uses AuthService which should
                // be handling setting up the right Authorization header. But let's log this just
                // in case. When we start pushing client-side logs to the server, we can replace
                // this so operators will know if this is happening in the wild.
                case 'UNAUTHENTICATED':
                    console.log(`UNAUTHENTICATED`, err);
                    break;
                case 'AUTH_NOT_AUTHENTICATED':
                    // Not authenticated so redirect to auth page, then back to this location.
                    window.location.href = window.location.origin + '/landing?signedOut=true';
                    console.log(`AUTH_NOT_AUTHENTICATED`, err);
                    break;
            }
        }
    }
    // Consider exposing GraphQL errors to the UI globaly vs in every React component like we are
    // doing now.
    console.warn(
        'GraphQL errors in operation:',
        operation.operationName,
        graphQLErrors,
        networkError ? 'Network errors:' : undefined,
        networkError,
    );
});

const containsNull = (value) => {
    if (value === null || value === undefined || value === 'null' || value === '') {
        return true;
    }
    return false;
};

const typePolicies = {
    Location: {
        fields: {
            singleLineAddress: {
                read(_, { readField }) {
                    const addressLine1: string = readField('addressLine1');
                    const addressLine2: string = readField('addressLine2');
                    const city: string = readField('city');
                    const state: string = readField('state');
                    const zip: string = readField('zipCode');

                    const streetAddress = addressLine2 ? `${addressLine1}, ${addressLine2}` : addressLine1;

                    let address = [];

                    if (!containsNull(streetAddress)) {
                        address.push(capitalizeFirstLetterOfEachWord(streetAddress));
                    }

                    if (!containsNull(city)) {
                        address.push(capitalizeFirstLetterOfEachWord(city));
                    }

                    if (!containsNull(state)) {
                        address.push(state);
                    }

                    if (!containsNull(zip)) {
                        address.push(formatZip(zip));
                    }

                    return address.join(', ');
                },
            },
        },
    },
};

export const apolloCache = new InMemoryCache({
    typePolicies,
});

export const client = new ApolloClient({
    link: ApolloLink.from([resetToken, withToken(AuthService), new createUploadLink({ uri: BACKEND_API_URI, fetch })]),
    cache: apolloCache,
});
