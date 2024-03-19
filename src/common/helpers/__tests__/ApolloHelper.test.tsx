import { ApolloLink, execute, FetchResult, gql, GraphQLRequest, Observable, Operation } from '@apollo/client';
import { withToken, resetToken } from '../ApolloHelper';
import { AuthService } from 'src/services/AuthService';

// Apollo Link test framework

const defaultFakeQuery = gql`
    query defaultFakeQuery {
        fakeQuery {
            succeeded
        }
    }
`;

interface LinkResult<T> {
    operation: Operation;
    result: FetchResult<T>;
}

// executeLink allows for testing individual Apollo links.
// You can pass in the link to test, an optional graphQL request
// that should be passing through the link, and an optional
// response that should be returning back from downstream links.
// Returns a LinkResult which can be inspected to see how the
// tested link modified the operation and result.
async function executeLink<T = any, U = any>(
    linkToTest: ApolloLink,
    request: GraphQLRequest = { query: defaultFakeQuery },
    responseToReturn: FetchResult<U> = { data: null },
) {
    const linkResult = {} as LinkResult<T>;

    return new Promise<LinkResult<T>>((resolve, reject) => {
        const terminatingLink = new ApolloLink((operation) => {
            linkResult.operation = operation;
            return Observable.of(responseToReturn);
        });

        execute(ApolloLink.from([linkToTest, terminatingLink]), request).subscribe(
            (result) => {
                linkResult.result = result as FetchResult<T>;
            },
            (error) => {
                reject(error);
            },
            () => {
                resolve(linkResult);
            },
        );
    });
}

describe(`Apollo link withToken`, () => {
    jest.mock(`AuthService`);
    AuthService.getAccessToken = jest.fn(async (): Promise<string> => `1234`);

    it(`should set bearer token in headers using AuthService`, async () => {
        const { operation, result } = await executeLink(withToken(AuthService));
        expect(operation.getContext().headers.Authorization).toBe(`bearer 1234`);
        //console.log(operation.getContext(), result.context, authService);

        // should populate token cache
        expect(false);
    });

    it(`should not set authorization header on unauthed endpoints`, async () => {
        const fakePublicQuery = gql`
            query appInvitation {
                appInvitation(inviteCode: "1234") {
                    succeeded
                }
            }
        `;
        const { operation, result } = await executeLink(withToken(AuthService), { query: fakePublicQuery });
        expect(operation.getContext().headers?.Authorization).toBe(undefined);
    });
});

// describe(`Apollo error link`, () => {
//     const fakeErrorQuery = gql`
//         query appInvitation {
//             appInvitation(inviteCode: "1234") {
//                 succeeded
//             }
//         }
//     `;

//     it(`should clear token cache with expired token`, () => {
//         expect('cache').toBe('cleared');
//     });

//     it(`should clear token cache with graphQL UNAUTHENTICATED error`, async () => {
//         const errorResult = {
//             errors: [
//                 {
//                     message: 'resolver blew up',
//                     extensions: {
//                         code: `UNAUTHENTICATED`,
//                     },
//                 },
//             ],
//         } as any;
//         const { operation, result } = await executeLink(resetToken, undefined, errorResult);
//         expect(result.errors[0].extensions.code).toBe(`UNAUTHENTICATED`);
//         expect('cache').toBe('cleared');
//     });

//     it(`should clear token cache with 401 unauthorized network error`, () => {
//         expect('cache').toBe('cleared');
//     });
// });
