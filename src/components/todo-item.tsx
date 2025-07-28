import { JSX } from "react";
import { deleteTodo, toggleStatus } from "../store/todo-slice";
import { Todo, useAppDispatch } from "../types/types";

const TodoItem = ({id, completed, title}: Todo): JSX.Element => {
  const dispatch = useAppDispatch();



  return (
    <li key={id}>
      <input type='checkbox' checked={completed} onChange={() => dispatch(toggleStatus(id))} />
      <span>{title}</span>
      <button className='delete-button' type='button' onClick={() => dispatch(deleteTodo(id))}>delete todo</button>
    </li>
  )
}

export default TodoItem;