import React, { JSX, useCallback, useEffect, useRef, useState } from "react";
import { deleteTodo, patchTodo, toggleStatus } from '../store/api-actions';
import { Todo, useAppDispatch, useAppSelector } from "../types/types";
import { toggleEditStatus } from "../store/todo-slice";
import { getEditStatus, getSendingId } from "../selectors";

type TodoItemProps = Omit<Todo, 'userId'>

const TodoItem = ({ id, completed, title }: TodoItemProps): JSX.Element => {
  const dispatch = useAppDispatch();
  const [todoTitle, setTodoTitle] = useState(title);
  const todoRef= useRef<HTMLLIElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const editId = useAppSelector(getEditStatus);
  const isSending = useAppSelector(getSendingId);

  const editTodo = () => {
    dispatch(toggleEditStatus(id));
  }

  const cancelEdition = useCallback(() => {
    dispatch(toggleEditStatus(null));
    setTodoTitle(title);
  }, [dispatch, title])

  const handleClickOutside = useCallback((e: MouseEvent) => {
      if (todoRef.current && !todoRef.current.contains(e.target as Node)) {
        cancelEdition();
      }
    }, [cancelEdition])

  const handleEdit = (evt: React.FormEvent) => {
    evt.preventDefault();
    dispatch(patchTodo({ id, text: todoTitle }))
  }


  useEffect(() => {

    if (editId !== id) {
      setTodoTitle(title);
    }

    if (editId === id) {
      inputRef.current?.focus();
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    }

  }, [editId, id, title, handleClickOutside]); 

  return (
    <li className="todo-list__item"
      key={id}
      ref={todoRef}
      data-testid='list-item'
    >
      <form className='todo-list__form todo-item' action={`https://jsonplaceholder.typicode.com/todos/${id}`} method='post' onSubmit={handleEdit}>
        <label
          className={`todo-item__label ${completed && 'todo-item__label--checked'} ${isSending === id ? 'todo-item__label--sending' : ''}`}
          htmlFor={`todo-complete-${id}`}>
          <input
            className="todo-item__checkbox visually-hidden"
            name="complete-todo"
            type='checkbox'
            checked={completed}
            onChange={() => dispatch(toggleStatus(id))}
            id={`todo-complete-${id}`}
          />
          <span className="visually-hidden">complete todo</span>
        </label>
        <input
          className="todo-item__text"
          name="todo-name"
          type="text"
          value={editId ? todoTitle : title}
          onChange={(e) => setTodoTitle(e.target.value)}
          disabled={editId !== id}
          size={48}
          ref={inputRef}
        />
        {editId !== id ? <button className='todo-item__button todo-item__button--edit' type='button' onClick={editTodo}>
          <span className="visually-hidden">edit todo</span>
        </button> : ''}
        {editId === id ? <button className='todo-item__button todo-item__button--approve' type='submit'>
          <span className="visually-hidden">approve todo</span>
        </button> : ''}
        {editId !== id ? <button className='todo-item__button todo-item__button--delete' type='button' onClick={() => dispatch(deleteTodo(id))}>
          <span className="visually-hidden">delete todo</span>
        </button> : ''}
        {editId === id ? <button className='todo-item__button todo-item__button--cancel' type='button' onClick={() => cancelEdition()}>
          <span className="visually-hidden">cancel</span>
        </button> : ''}
      </form>
    </li>
  )
}

export default TodoItem;