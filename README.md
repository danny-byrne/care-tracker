# Care Tracker

A React and TypeScript care coordination frontend, shared as a portfolio sample representing work I did for Microsoft.

The source covers caregiver workflows including care plans, medication schedules, calendars, activities, and care circle membership. It demonstrates feature-based UI organization, Fluent UI components, Redux state, and typed GraphQL operations.

**Status:** this checkout is an incomplete frontend extraction. Dependency installation works, but the current application does not render successfully and its production build fails. The steps below reproduce the development environment; they are not a working demo claim.

## Engineering highlights

- Feature folders that keep screens, styles, helpers, and local documentation together.
- Care scheduling and printable views spanning appointments, medications, and activities.
- GraphQL schema, generated query hooks, and server-side test mocks.
- Shared layouts, form controls, feedback context, and permission-oriented route components.

## Local setup

Prerequisites: Git, Node.js and npm. Installation was checked with Node.js 22.9.0; dependencies are pinned by `package-lock.json`.

```bash
git clone https://github.com/danny-byrne/care-tracker.git
cd care-tracker
npm ci
npm run dev
```

Vite normally starts at `http://localhost:5173`; follow the terminal URL if that port is occupied. The currently enabled screens are `/home` and `/calendar`, plus a fallback page. Most routes in `src/App.tsx` are commented out, including the original dashboard route at `/`.

No `.env` template or complete standalone backend configuration is supplied. Adding credentials alone does not resolve the current source integration errors.

## Launch blockers

A clean-checkout review on October 29, 2026 found:

- Browser startup fails because `src/wcpConsentInit.ts` does not export `trackFieldChanged`, which medication components import.
- `npm run build` fails with TypeScript errors across the extracted source, including unused declarations, unresolved types, and incomplete integrations.
- The entry point imports authentication and Apollo code while their providers are commented out.
- Authentication source references MSAL symbols whose imports are commented out; `@azure/msal-react` is imported by the entry point but absent from the package manifest.
- The GraphQL mock server is a Node test helper, not a browser demo backend launched by `npm run dev`.

The Vite server reporting “ready” therefore does not mean the application is usable. Before presenting a live demo, finish a synthetic-data mode, remove dependencies on the original service integrations, and verify both active routes in the browser.

## Commands

| Command | Purpose | Current status |
| --- | --- | --- |
| `npm ci` | Install locked dependencies | Verified |
| `npm run dev` | Start Vite | Starts; browser rendering blocked |
| `npm run build` | Type-check and build `dist/` | Fails on existing source errors |
| `npm run lint` | Run ESLint | Available; not validated in this review |
| `npm run preview` | Serve a successful build | Requires resolving build failures first |

There is no `npm test` script, although test source files are present.

## Code walkthrough

| Location | What to inspect |
| --- | --- |
| `src/App.tsx` | Active routes and extracted route structure |
| `src/features/Home/` | Care plan and suggested content composition |
| `src/features/Calendar/` | Appointment and calendar workflows |
| `src/features/Medications/` | Medication forms and schedule logic |
| `src/features/PrintableContent/` | Printable care information |
| `src/common/` | Shared components, hooks, contexts, and helpers |
| `src/graphQL/` | Schema, operations, generated types, and mocks |
| `src/services/` | Authentication, permission, and feedback boundaries |

## Stack

React 18 · TypeScript · Vite · Fluent UI 8 · Redux Toolkit / Redux Persist · Apollo Client · React Router · Formik · Sass.

## Portfolio scope

This repository is a code sample of care coordination workflows. Its included screens and integrations should be evaluated against the current source status above. A runnable demo remains the next milestone.
