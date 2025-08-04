import { JSX } from "react";
import { useAppSelector } from "../types/types";
import TodoItem from "./todo-item";
import { getFilteredTodos } from "../selectors";

const TodoList = (): JSX.Element => {
    const filteredTodos = useAppSelector(getFilteredTodos)
    return (
        <ul className='todo-list'>
            {filteredTodos.map((todo) =>
                <TodoItem key={todo.id}
                    {...todo}
                />)}
        </ul>
    )
}

export default TodoList;