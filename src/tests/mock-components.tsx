import { Filter } from "../const";
import { todosProcess } from "../store/todo-slice";
import { Todos } from "../types/types";

export const mockTodos: Todos = [{
    userId: 1,
    id: 2,
    title: 'todo1',
    completed: true
},
{
    userId: 3,
    id: 4,
    title: 'todo2',
    completed: false
},]

export const mockState: todosProcess = {
    todos: mockTodos,
    status: "fulfilled",
    error: false,
    filterStatus: Filter.All,
    isEditing: null,
    sendingId: null,
  };