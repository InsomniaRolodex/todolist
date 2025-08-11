import React, { JSX, useState } from "react";
import { deleteTodo, patchTodo, toggleStatus } from '../store/api-actions';
import { Todo, useAppDispatch, useAppSelector } from "../types/types";
import { toggleEditStatus } from "../store/todo-slice";
import { getEditStatus } from "../selectors";

const TodoItem = ({ id, completed, title }: Todo): JSX.Element => {
  const dispatch = useAppDispatch();
  const [todoTitle, setTodoTitle] = useState(title);
  const editId = useAppSelector(getEditStatus)

  const handleEdit = (evt: React.FormEvent) => {
    evt.preventDefault();
    dispatch(patchTodo({ id, text: todoTitle }))
  }

  return (
    <li className="todo-list__item" key={id}>
      <form className='todo-list__form todo-item' action={`https://jsonplaceholder.typicode.com/todos/${id}`} method='post' onSubmit={handleEdit}>
        <label
          className={`todo-item__label ${completed && 'todo-item__label--checked'}`}
          htmlFor={`todo-complete-${id}`}>
          <input
            className="todo-item__checkbox visually-hidden"
            name="complete-todo"
            type='checkbox'
            checked={completed}
            onChange={() => dispatch(toggleStatus(id))}
            id={`todo-complete-${id}`}
          />
        </label>
        <input
          className="todo-item__text"
          name="todo-name"
          type="text"
          value={editId ? todoTitle : title}
          onChange={(e) => setTodoTitle(e.target.value)}
          disabled={editId !== id}
          size={40}
        />
        {editId !== id ? <button className='todo-item__button todo-item__button--edit' type='button' onClick={() => dispatch(toggleEditStatus(id))}>edit todo</button> : ''}
        {editId === id ? <button className='todo-item__button todo-item__button--approve' type='submit'>approve</button> : ''}
        <button className='todo-item__button todo-item__button--delete' type='button' onClick={() => dispatch(deleteTodo(id))}>delete todo</button>
      </form>
    </li>
  )
}

export default TodoItem;