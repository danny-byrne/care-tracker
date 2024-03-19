# DashboardPage Component

## Component Description

This component acts as the main home screen. Users are directed here from the LoginLoadingPage page.

## Component Flow

1. Log access tokens.
   Note: This is done for debug purposes for integrating in with Backend. It will be removed once the integration between the two is complete.
2. Renders with default buttons.
   Note: Both buttons will be moved to the primary care circle menu once it is built out. They are currently there for debug purposes.
3. If user is not authenticated, they are navigated back to the LandingPage component.
   Note: This is done through the RequireAuth wrapping of the DashboardPage route in App.tsx.

## TODO

i18n
Apply theming
Make gray option buttons reusable - https://dev.azure.com/msresearch/Project-Windcrest/_workitems/edit/158272
Integrate backend into Clear Care Circle Data - https://dev.azure.com/msresearch/Project-Windcrest/_workitems/edit/158273
Fix gray option button text spacing - https://dev.azure.com/msresearch/Project-Windcrest/_sprints/taskboard/Red%20Team/Project-Windcrest/Milestone%206/Sprint%206.1?workitem=158274
Write tests - https://dev.azure.com/msresearch/Project-Windcrest/_workitems/edit/158275
Set close button on modal to an image with correct onHover - https://dev.azure.com/msresearch/Project-Windcrest/_workitems/edit/158281
