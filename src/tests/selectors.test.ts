import { Filter } from "../const"
import { mockState, mockTodos } from "./mock-components"
import { getEditStatus, getFilteredTodos, getFilterType, getSendingId, getTodos } from "../selectors";

describe("Todo-list selectors", () => {
  const state = mockState;

  it("should return todos", () => {
    const result = getTodos({tasks: state});

    expect(result).toBe(mockTodos);
  });
  it("should return filter status", () => {
    const result = getFilterType({tasks: state});

    expect(result).toBe(Filter.All);
  });
  it("should return edit status", () => {
    const result = getEditStatus({tasks: state});

    expect(result).toBe(null);
    
  });
  it("should return sending id", () => {
    const result = getSendingId({tasks: state});

    expect(result).toBe(null);
  });
    it("should return filtered todos", () => {
    const result = getFilteredTodos({tasks: state});

    expect(result).toStrictEqual(mockTodos);
  });
});