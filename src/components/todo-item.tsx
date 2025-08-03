import React, { JSX, useState } from "react";
import { deleteTodo, patchTodo, toggleStatus } from '../store/api-actions';
import { Todo, useAppDispatch, useAppSelector } from "../types/types";
import { toggleEditStatus } from "../store/todo-slice";
import { getEditStatus } from "../selectors";

const TodoItem = ({id, completed, title}: Todo): JSX.Element => {
  const dispatch = useAppDispatch();
  const [todoTitle, setTodoTitle] = useState(title);
  const editId = useAppSelector(getEditStatus)

  const handleEscDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      dispatch(toggleEditStatus(null));
      setTodoTitle(title)
    }
  };

  return (
    <li key={id}>
      <input type='checkbox' checked={completed} onChange={() => dispatch(toggleStatus(id))}/>
      <input type="text" 
        value={todoTitle}
        onChange={(e) => setTodoTitle(e.target.value)}
        disabled={editId !== id}
        onKeyDown={handleEscDown}
      />
      {editId !== id ? <button className='delete-button' type='button' onClick={() => dispatch(toggleEditStatus(id))}>edit todo</button> : ''}
      {editId === id ? <button className='delete-button' type='button' onClick={() => dispatch(patchTodo({id, text: todoTitle}))}>approve</button> : ''}
      <button className='delete-button' type='button' onClick={() => dispatch(deleteTodo(id))}>delete todo</button>
    </li>
  )
}

export default TodoItem;