# Kindred — care coordination demo

A small, independent portfolio application by Danny Byrne that brings a care overview, editable weekly calendar, and printable care plan together around one shared schedule.

All people, events, locations, and care details are fictional. This is a fresh implementation: it contains no Microsoft product source, branding, authentication, or service integrations.

## Launch

Requires Node.js 20 or newer. No installation, API keys, environment file, or backend is needed.

```bash
npm run dev
```

Open http://127.0.0.1:4173. Set `PORT` if needed, for example `PORT=4180 npm start` on macOS/Linux. Run `npm run check` for JavaScript syntax checks.

For deployment, serve the contents of `dist/` on any static host. The Node server is only a local convenience. Routes use URL hashes, so no host rewrite rules are required. Fonts load from Google Fonts; system fallbacks work without that connection.

## Try it

1. Check off a task on the overview. Pick another day to see its schedule.
2. Open Calendar. Navigate weeks and select an event to view or edit it.
3. Add an appointment: set its title, date, time, duration, category, location, care partner, and notes.
4. Refresh the browser to see persisted changes.
5. Open Care plan, navigate to the desired week, then use Print / save PDF. The landscape print stylesheet removes navigation and repeats table headers.
6. Reset demo to restore the initial synthetic schedule.

Appointment times are limited to 8 AM–7 PM, including duration, matching the visible calendar. Overlapping events use separate columns. Deleting an event is local and reversible through Reset demo; reset discards all local edits.

## Implementation

- `dist/index.html`: document shell and accessible native dialogs.
- `dist/app.js`: synthetic fixtures, local state, CRUD, completion toggles, interval layout, and views.
- `dist/styles.css`: original responsive visual design and print layout.
- `server.mjs`: dependency-free local static server bound to loopback.

One event model powers all three views. Fixtures populate the week in the visitor's local timezone on first load. Edits live in `localStorage`, not a server; the care circle is illustrative and changes are not shared between devices. There is no real sign-in, clinical guidance, medication dosing, or notification delivery.

## Portfolio story

This project demonstrates care coordination workflows relevant to my frontend experience: feature composition, calendar layout, state consistency, accessible forms, local persistence, and print presentation. It is independent of the original care-tracker product source.

Possible next steps include calendar export, automated browser regression coverage, and a backend for real collaboration. Real health data should not be entered into this demonstration.
