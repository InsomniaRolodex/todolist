import { createSelector } from "@reduxjs/toolkit";
import { State } from "./types/types";
import { filterTodos } from "./utils";

export const getTodos = (state: State) => state.tasks.todos;
export const getFilterType = (state: State) => state.tasks.filterStatus;
export const getEditStatus = (state: State) => state.tasks.isEditing;
export const getSendingId = (state: State) => state.tasks.sendingId;
export const getLoadingStatus = (state: State) => state.tasks.status;

export const getFilteredTodos = createSelector(
    [getTodos, getFilterType],
    (todos, filter) => filterTodos(todos, filter)
)