# LogingLoadingPage Component

## Component Description

This component acts as a buffer between the return of the MSAL login redirect loop and the main dashboard.
MSAL library does not attach necessary authentication parameters before redirecting.

## Component Flow

1. Renders with default spinner.
2. Waits for authentication to load
   Note: Polls every 200 ms
3. Once authentication has loaded, sets variables pulled from authentication
   User name, profile picture uri and isAuthenticated
4. Front end updates to show user name and profile picture
5. With isAuthenticated flag set, component checks DB for care circle
6. If a care circle is not found, a backend call is made to create one.
   Note: This will change once create care circle flow is flushed out
7. After a short delay, the user is navigated to the home page
   Note: Delay is added to improve user experience, so screen is not just flashed at user

## Implementation Notes

The Sign In and Log In buttons return either a given invite code or a default invite code. This is then checked after the authentication
loop and an error is thrown if no invite code is found.

A check is done against local storage for the last user id that had given consent for MS Graph. This prevents the call from being run multiple times and possibly getting the user stuck in an infinite redirect loop if there is an error.

## TODO

Rewrite full test suite after identifying Database/Apollo pattern for app
Set up mechanism for storing careCircleId globally - https://dev.azure.com/msresearch/Project-Windcrest/_workitems/edit/160629
Error handling for auth check - https://dev.azure.com/msresearch/Project-Windcrest/_workitems/edit/158279
i18n
Apply theming
