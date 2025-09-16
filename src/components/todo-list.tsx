import { JSX } from "react";
import { useAppSelector } from "../types/types";
import TodoItem from "./todo-item";
import { getFilteredTodos, getLoadingStatus } from "../selectors";
import Notodos from "./no-todos";

const TodoList = (): JSX.Element => {
    const filteredTodos = useAppSelector(getFilteredTodos);
    const loadingStatus = useAppSelector(getLoadingStatus);
    return (
        <>
            <ul className='todo-list' data-testid='list-container'>
                {filteredTodos.map((todo) =>
                    <TodoItem key={todo.id}
                        {...todo}
                    />)}
            {!filteredTodos.length && loadingStatus !== 'loading' ? <Notodos /> : ''}
            </ul>
        </>
    )
}

export default TodoList;