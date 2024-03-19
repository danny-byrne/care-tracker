# TogetherTimeLayout Component

## Component Description

This component acts as the main container screen for the together time feature. The shell includes either a hamburger menu (mobile) or a side menu (desktop), as well as an outlet to the currently selected screen. The selected screen will default to the CareCirclePage.

The desktop page has a separate side menu directly to the right of the side menu, which acts as the primary dashboard for the together time page.

## TODO

Abstract out care circle call into top level together time page to prevent multiple calls for desktop and mobile (care circle page is currently also making this call).
