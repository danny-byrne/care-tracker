import { createEntityAdapter } from '@reduxjs/toolkit';

// An interface is required to type the EntityAdapter.
// As features scale, this interface can be moved outside of the adapter file.
export interface Todo {
    todo: string;
    id: number;
    completed: boolean;
}

// Entity adapter used to import prebuilt functions to add or remove entities from
// state while retaining normalization.
// E.g. todosAdapter.removeOne(), todosAdapter.addMany()
export const todosAdapter = createEntityAdapter<Todo>();

// getInitialState() can be used to add extra fields into state
export const initialState = todosAdapter.getInitialState({
    status: 'idle',
});
