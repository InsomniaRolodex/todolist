import todoReducer from "../store/todo-slice";
import {
  addNewTodo,
  deleteTodo,
  fetchTodos,
  patchTodo,
} from "../store/api-actions";
import { mockState, mockTodos } from "./mock-components";

describe("Async actions", () => {
  it("should handle fetchTodos.fulfilled", () => {
    const action = fetchTodos.fulfilled(mockTodos, "requestId");
    const state = todoReducer(mockState, action);

    expect(state.todos).toEqual(mockTodos);
    expect(state.status).toBe("fulfilled");
  });

  it("should handle fetchTodos.rejected", () => {
    const action = fetchTodos.rejected(
      new Error("Unknown error"),
      "requestId",
      undefined,
      "Unknown error"
    );
    const state = todoReducer(mockState, action);

    expect(state.status).toBe("rejected");
    expect(state.error).toBe("Unknown error");
  });

  it("should handle deleteTodo.fullfiled", () => {
    const action = deleteTodo.fulfilled(
      undefined,
      "requestId",
      mockState.todos[1].id
    );
    const state = todoReducer(mockState, action);

    expect(state.todos).toEqual(mockTodos);
    expect(state.status).toBe("fulfilled");
  });

  it("should handle deleteTodo.rejected", () => {
    const action = deleteTodo.rejected(
      new Error("Unknown error"),
      "requestId",
      mockState.todos[1].id,
      "Unknown error"
    );
    const state = todoReducer(mockState, action);

    expect(state.status).toBe("rejected");
    expect(state.error).toBe("Unknown error");
  });

  it("should handle toggleStatus.fullfiled", () => {
    const action = deleteTodo.fulfilled(
      undefined,
      "requestId",
      mockState.todos[1].id
    );
    const state = todoReducer(mockState, action);

    expect(state.todos).toEqual(mockTodos);
    expect(state.status).toBe("fulfilled");
  });

  it("should handle toggleStatus.rejected", () => {
    const action = deleteTodo.rejected(
      new Error("Server error"),
      "requestId",
      mockState.todos[1].id,
      "Server error"
    );
    const state = todoReducer(mockState, action);

    expect(state.status).toBe("rejected");
    expect(state.error).toBe("Server error");
  });

  it("should handle addNewTodo.fullfiled", () => {
    const action = addNewTodo.fulfilled(undefined, "requestId", "test");
    const state = todoReducer(mockState, action);

    expect(state.todos).toEqual(mockTodos);
    expect(state.status).toBe("fulfilled");
  });

  it("should handle addNewTodo.rejected", () => {
    const action = addNewTodo.rejected(
      new Error("Server error"),
      "requestId",
      "test",
      "Server error"
    );
    const state = todoReducer(mockState, action);

    expect(state.status).toBe("rejected");
    expect(state.error).toBe("Server error");
  });
  it("should handle patchTodo.fullfiled", () => {
    const action = patchTodo.fulfilled(undefined, "requestId", {
      id: mockTodos[0].id,
      text: "test",
    });
    const state = todoReducer(mockState, action);

    expect(state.todos).toEqual(mockTodos);
    expect(state.status).toBe("fulfilled");
  });

  it("should handle patchTodo.rejected", () => {
    const action = patchTodo.rejected(
      new Error("Server error"),
      "requestId",
      { id: mockTodos[0].id, text: "test" },
      "Server error"
    );
    const state = todoReducer(mockState, action);

    expect(state.status).toBe("rejected");
    expect(state.error).toBe("Server error");
  });
});
