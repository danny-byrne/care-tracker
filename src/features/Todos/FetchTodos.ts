import { createAsyncThunk } from '@reduxjs/toolkit';

const todoAPI = {
    get: async () => {
        const fakeTodo = { todos: [] };
        return fakeTodo;
    },
};

// createAsyncThunk will automatically generate and dispatch 3  different possible actions during the
// lifecycle of an async call: fetchTodos.pending, fetchTodos.fulfilled, fetchTodos.rejected
export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
    const response = await todoAPI.get();
    return response.todos;
});
