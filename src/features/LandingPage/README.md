# LandingPage Component

## Component Description

This component acts as the first page the user sees when they are not logged in. All pages will redirect here when user is not successfully authenticated.

## Component Flow

1. Renders with default buttons.
   Note: Both buttons currently redirect to the loading page. This will change once the build care circle flow is flushed out.
2. If user is already authenticated, they are navigated straight to the dashboard page.

## TODO

i18n
Apply theming
Refactor to use fluent components - https://dev.azure.com/msresearch/Project-Windcrest/_sprints/taskboard/Red%20Team/Project-Windcrest/Milestone%206/Sprint%206.1?workitem=158276
