import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import uniqid from "uniqid";
import { State, Todos, FilterType } from "../types/types";
import { Filter } from "../const";

export const fetchTodos = createAsyncThunk<
  Todos,
  void,
  { rejectValue: string }
>("todos/fetchTodos", async function (_, { rejectWithValue }) {
  try {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/todos?_limit=10"
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
  { rejectValue: string }
>("todos/deleteTodo", async function (id, { rejectWithValue, dispatch }) {
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

type todosProcess = {
  todos: Todos;
  status: string | null;
  error: boolean;
  filterStatus: FilterType;
};

const initialState: todosProcess = {
  todos: [],
  status: null,
  error: false,
  filterStatus: Filter.All
};

const todoSlice = createSlice({
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
      .addCase(fetchTodos.rejected, setError)
      .addCase(deleteTodo.rejected, setError)
      .addCase(toggleStatus.rejected, setError);
  },
});

export const { addTodo, removeTodo, toggleTodoComplete, toggleFilter } = todoSlice.actions;

export default todoSlice.reducer;
