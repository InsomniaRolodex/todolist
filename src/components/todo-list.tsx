import { JSX } from "react";
import { useAppSelector } from "../types/types";
import TodoItem from "./todo-item";
import { getFilteredTodos } from "../selectors";
import Notodos from "./no-todos";

const TodoList = (): JSX.Element => {
    const filteredTodos = useAppSelector(getFilteredTodos)
    return (
        <>
            <ul className='todo-list'>
                {filteredTodos.map((todo) =>
                    <TodoItem key={todo.id}
                        {...todo}
                    />)}
            {!filteredTodos.length && <Notodos />}
            </ul>
        </>
    )
}

export default TodoList;