import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { todosAdapter, initialState, Todo } from './TodosAdapter';
import { fetchTodos } from './FetchTodos';

const todosSlice = createSlice({
    // The name given should reflect the name of the slice
    name: 'todos',
    initialState,
    reducers: {
        todoAdded: todosAdapter.addOne,
        // Actions should be typed using the PayloadAction type
        todoToggled(state, action: PayloadAction<number>) {
            const todoId = action.payload;
            const todo = state.entities[todoId];
            todo.completed = !todo.completed;
        },
        // Action does not need to be defined it if isn't used
        todosLoadingSet(state) {
            return {
                ...state,
                status: 'loading',
            };
        },
        // Adapter functions can be used to add or remove values from state
        // while maintaining state normalization
        todoRemoved: todosAdapter.removeOne,
        completedTodosCleared(state) {
            // completedTodosCleared(state, action: PayloadAction<number>) {
            const completedIds = Object.values(state.entities)
                .filter((todo) => todo.completed)
                .map((todo) => todo.id);
            // Use an adapter function as a "mutating" update helper
            todosAdapter.removeMany(state, completedIds);
        },
    },
    extraReducers: (builder) => {
        // builder callback notation allows for types to be inferred correctly in Typescript
        builder.addCase(fetchTodos.pending, (state) => {
            state.status = 'loading';
        });
        builder.addCase(fetchTodos.fulfilled, (state, action: PayloadAction<Todo[]>) => {
            todosAdapter.setAll(state, action.payload);
            state.status = 'idle';
        });
    },
});

// Action creators are automatically generated and should be exported from file
// Action creators take in one variable, which is put into action as value in action.payload
// E.g. console.log(todoAdded(42)) returns {type: todos/todoAdded, payload: 42}
export const { todoAdded, todoToggled, todosLoadingSet, todoRemoved, completedTodosCleared } = todosSlice.actions;

export default todosSlice.reducer;
