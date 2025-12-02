import { createSlice } from "@reduxjs/toolkit";

const savedTodo = JSON.parse(localStorage.getItem("redux-todo")) || [];

const todoSlice = createSlice({
    name: "todo",
    initialState: savedTodo,
    reducers: {
        setTodos: (state, action) => action.payload,

        addTodo: (state, action) => {
            state.push(action.payload);
        },

        updateTodo: (state, action) => {
            const { id, title } = action.payload;
            const todo = state.find((t) => t.id === id);
            if (todo) todo.title = title;
        },

        deleteTodo: (state, action) =>
            state.filter((todo) => todo.id !== action.payload),
    }
});

export const { setTodos, addTodo, deleteTodo, updateTodo } =
    todoSlice.actions;

export default todoSlice.reducer;
