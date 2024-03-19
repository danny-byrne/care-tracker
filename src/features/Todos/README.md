# General

This folder is set up as an example to demonstrate the basic patterns of using React Redux.
All files in the folder act as examples of different features of Redux. They should not be referenced outside of this folder.

# Components

todosReducer: Slice reducer example. Illustrates setting up reducer functions and integration with adapter functions.
todosAdapter: Entity adapter example. Demonstrates setting up an adapter for normalizing state and setting up an initial state.
fetchTodos: Async thunk example. Demonstrates setting up an async call and processing it inside of todosReducer.
TodoActions: Example component integrating into Redux Store. Shows a simple action dispatch and provides a playground for Redux DevTools and understanding redux-persist.

# Persistance

Due to the use of the redux-persist library, Redux Store state will remain consistent across refreshes of the app.
If you need to purge the state of your Redux Store, you can call the function 'persistor.purge()' after the persistor definition in index.tsx.

# Demo Configuration

The TodoActions component functions as a light demo to learn how Redux and Redux DevTools works. The demo consists of a simple form that dispatches an action to add a ToDo item to the Redux Store, and then displays it in a list below.
There are 2 steps required for setting up the demo:

1. Update App.tsx to import the ToDoActions component and display it in a div.
2. Import the todosReducer in store.ts and add the line 'todos: todosReducer' inside of the combineReducers() function.

# Redux DevTools

Once installed, Redux DevTools can be opened by right clicking on the page and selecting Redux DevTools.
Redux DevTools allows for advanced tracking of Redux State and provides a number of helpful tools for debugging:

- A history of dispatched Redux actions
- Tracking of payload for each action
- Tracking of state after each action and differences from before and after
- The ability to automatically "Time Travel" and walk through the action history and observe the effect they have on UI.
  Time Travel speed can be set as Live (real time speed), 1x (consistent period of time per action) or 2x (twice as fast as 1x)
  Note: The first 2 actions that occur after a refresh will always be 'persist/PERSIST' and 'persist/REHYDRATE' due to the use of the redux-persist library.
  Note: Resetting state in Redux DevTools will not persist reset after refreshing page. In order to fully reset store, 'persistor.purge()' function described above must be called.

# Useful Links

Redux Patterns Wiki: https://wiki.connected-care-team.org/display/PROD/React+Redux+Patterns?src=contextnavpagetreemode
Redux Fundamentals Wiki: https://wiki.connected-care-team.org/display/PROD/Redux+Fundamentals
