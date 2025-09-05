import { createSlice } from "@reduxjs/toolkit";
import { Todos, FilterType } from "../types/types";
import { Filter } from "../const";
import { deleteTodo, fetchTodos, toggleStatus } from "./api-actions";

const setError = (
  state: todosProcess,
  action: {
    payload: any;
    type: string;
  }
) => {
  state.status = "rejected";
  state.error = action.payload;
};

export type todosProcess = {
  todos: Todos;
  status: string | null;
  error: boolean;
  filterStatus: FilterType;
  isEditing: null | number;
  sendingId: null | number;
};

const initialState: todosProcess = {
  todos: [],
  status: null,
  error: false,
  filterStatus: Filter.All,
  isEditing: null,
  sendingId: null
};

export const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo(state, action) {
      state.todos.push(action.payload);
    },
    removeTodo(state, action) {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload.id);
    },
    toggleTodoComplete(state, action) {
      const toggledTodo = state.todos.find(
        (todo) => todo.id === action.payload.id
      );
      if (toggledTodo) {
        toggledTodo.completed = !toggledTodo.completed;
      }
    },
    toggleFilter(state, action) {
      state.filterStatus = action.payload;
    },
    toggleEditStatus(state, action) {
      state.isEditing = action.payload;
    },
    editTodo(state, action) {
      const currentTodo = state.todos.find(
        (todo) => todo.id === action.payload.id
      );
      if (currentTodo) {
        currentTodo.title = action.payload.text;
        state.isEditing = null;
      } else {
        throw new Error("Can not edit todo for some reason");
      }
    },
    setSendingId(state, action) {
      state.sendingId = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.status = "loading";
        state.error = false;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.todos = action.payload;
      })
      .addCase(toggleStatus.fulfilled, (state) => {
        state.sendingId = null;
      })
      .addCase(fetchTodos.rejected, setError)
      .addCase(deleteTodo.rejected, setError)
      .addCase(toggleStatus.rejected, setError);
  },
});

export const { addTodo, removeTodo, toggleTodoComplete, toggleFilter, editTodo, toggleEditStatus, setSendingId } = todoSlice.actions;

export default todoSlice.reducer;
