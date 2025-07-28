import { Todos } from "./types/types";


export const filterTodos = (todos: Todos, filterType:string):Todos => {
  switch (filterType) {
    case filterType = 'Completed':
      todos = todos.filter(todo => todo.completed);
      break;
    case filterType = 'Active':
      todos = todos.filter(todo => !todo.completed);
      break;
    case filterType = 'All':
      todos = [...todos];
      break;
  }

  return todos;
};