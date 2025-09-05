import { Filter } from "../const";
import {
  addTodo,
  editTodo,
  removeTodo,
  setSendingId,
  todoSlice,
  toggleEditStatus,
  toggleFilter,
  toggleTodoComplete,
} from "../store/todo-slice";
import { mockState } from "./mock-components";

describe("Todo Slice", () => {
  const initialState = mockState;
  it("should return initial state with empty action", () => {
    const emptyAction = { type: "" };

    const result = todoSlice.reducer(initialState, emptyAction);

    expect(result).toEqual(initialState);
  });

  it("should add new todo", () => {
    const newTodo = {
      userId: 5,
      id: 6,
      title: "todo1",
      completed: false,
    };

    const expectedState = {
      ...initialState,
      todos: [...initialState.todos, newTodo],
    };

    const result = todoSlice.reducer(initialState, addTodo(newTodo));

    expect(result).toEqual(expectedState);
  });

  it("should remove todo", () => {
    const removingTodo = initialState.todos[0];

    const expectedState = {
      ...initialState,
      todos: [initialState.todos[1]],
    };

    const result = todoSlice.reducer(initialState, removeTodo(removingTodo));

    expect(result).toEqual(expectedState);
  });

  it("should toggle todo completed status", () => {
    const expectedState = structuredClone(initialState);
    expectedState.todos[0].completed = false;
    const togglingTodo = initialState.todos[0];

    const result = todoSlice.reducer(
      initialState,
      toggleTodoComplete(togglingTodo)
    );

    expect(result).toEqual(expectedState);
  });

  it("should toggle todos filter type", () => {
    const expectedState = {
      ...initialState,
      filterStatus: Filter.Completed,
    };

    const result = todoSlice.reducer(
      initialState,
      toggleFilter(Filter.Completed)
    );
    expect(result).toEqual(expectedState);
  });

  it("should toggle Edit Status to todo's id", () => {
    const expectedState = {
      ...initialState,
      isEditing: initialState.todos[0].id,
    };

    const result = todoSlice.reducer(
      initialState,
      toggleEditStatus(initialState.todos[0].id)
    );
    expect(result).toEqual(expectedState);
  });

  it("should toggle change todo's title", () => {
    const expectedState = structuredClone(initialState);
    expectedState.todos[0].title = "test";

    const result = todoSlice.reducer(
      initialState,
      editTodo({ id: initialState.todos[0].id, text: "test" })
    );

    expect(result).toEqual(expectedState);
  });

  it("should change sending id", () => {
    const expectedState = structuredClone(initialState);
    expectedState.sendingId = initialState.todos[0].id;

    const result = todoSlice.reducer(
      initialState,
      setSendingId(initialState.todos[0].id)
    );

    expect(result).toEqual(expectedState);
  });
});
