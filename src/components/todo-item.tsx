import { JSX, useState } from "react";
import { deleteTodo, patchTodo, toggleStatus } from "../store/todo-slice";
import { Todo, useAppDispatch } from "../types/types";

const TodoItem = ({id, completed, title}: Todo): JSX.Element => {
  const dispatch = useAppDispatch();
  const [todoTitle, setTodoTitle] = useState(title);

  return (
    <li key={id}>
      <input type='checkbox' checked={completed} onChange={() => dispatch(toggleStatus(id))} />
      <input type="text" 
        value={todoTitle}
        onChange={(e) => setTodoTitle(e.target.value)}
      />
      <button className='delete-button' type='button' onClick={() => dispatch(patchTodo({id, text: todoTitle}))}>edit todo</button>
      <button className='delete-button' type='button' onClick={() => dispatch(deleteTodo(id))}>delete todo</button>
    </li>
  )
}

export default TodoItem;