import { createAsyncThunk } from "@reduxjs/toolkit";
import { State, Todos } from "../types/types";
import { addTodo, editTodo, removeTodo, setSendingId, toggleFilter, toggleTodoComplete } from "./todo-slice";
import uniqid from "uniqid";

export const fetchTodos = createAsyncThunk<
  Todos,
  void,
  { rejectValue: string }
>("todos/fetchTodos", async function (_, { rejectWithValue }) {
  try {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/todos?_limit=20"
    );
    if (!response.ok) {
      throw new Error("Server error");
    }

    const data: Todos = await response.json();

    return data;
  } catch (err) {
    if (err instanceof Error) {
      return rejectWithValue(err.message);
    }

    return rejectWithValue("Unknown error");
  }
});

export const deleteTodo = createAsyncThunk<
  void,
  number,
  { state: State; rejectValue: string }
>("todos/deleteTodo", async function (id, { rejectWithValue, dispatch, getState }) {
  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/todos/${id}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      throw new Error("Can not delete todo for some reason");
    }

    dispatch(removeTodo({ id }));

    const completedFilter = getState().tasks.filterStatus;
    const completedTodo = getState().tasks.todos.find(todo => todo.completed);

    if (completedFilter === 'Completed' && !completedTodo) {
      dispatch(toggleFilter('All'))
    };

  } catch (err) {
    if (err instanceof Error) {
      return rejectWithValue(err.message);
    }

    return rejectWithValue("Unknown error");
  }
});

export const toggleStatus = createAsyncThunk<
  void,
  number,
  { state: State; rejectValue: string }
>(
  "todos/toggleStatus",
  async function (id, { rejectWithValue, dispatch, getState }) {
    const todo = getState().tasks.todos.find((todo) => todo.id === id);

    if (!todo) {
      return rejectWithValue("Todo not found");
    }

    try {
      dispatch(setSendingId(id))
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/todos/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            completed: !todo.completed,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Can  todo status for some reason");
      }

      dispatch(toggleTodoComplete({ id }));
    } catch (err) {
      if (err instanceof Error) {
        return rejectWithValue(err.message);
      }

      return rejectWithValue("Unknown error");
    }
  }
);

export const addNewTodo = createAsyncThunk<void, string, { rejectValue: string }>(
  "todos/addNewTodo",
  async function (text, { rejectWithValue, dispatch }) {
    try {
      const todo = {
        title: text,
        userId: uniqid(),
        completed: false,
      };

      const response = await fetch(
        `https://jsonplaceholder.typicode.com/todos/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(todo),
        }
      );

      if (!response.ok) {
        throw new Error("Can not add todo for some reason");
      }

      const data = await response.json();

      dispatch(addTodo(data));
    } catch (err) {
      if (err instanceof Error) {
        return rejectWithValue(err.message);
      }

      return rejectWithValue("Unknown error");
    }
  }
);

export const patchTodo = createAsyncThunk<
  void,
  {id: number, text: string},
  { rejectValue: string }
>("todos/editTodo", async function ({id, text}, { rejectWithValue, dispatch }) {
  try {
    const todo = {
      title: text,
    };
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/todos/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(todo)
      }
    );

    if (!response.ok) {
      throw new Error("Can not edit todo for some reason");
    }

    dispatch(editTodo({ id, text }));
  } catch (err) {
    if (err instanceof Error) {
      return rejectWithValue(err.message);
    }

    return rejectWithValue("Unknown error");
  }
});