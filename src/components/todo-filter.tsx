import { JSX } from "react";
import { FilterType, useAppDispatch, useAppSelector } from "../types/types";
import { deleteTodo, toggleFilter } from "../store/todo-slice";
import { getTodos } from "../selectors";


const TodoFilter = (): JSX.Element => {
    const todos = useAppSelector(getTodos);
    const activeTodos = todos.filter(todo => !todo.completed);
    const dispatch = useAppDispatch();
    const clearCompletedTasks = () => {
        const completedTodos = todos.filter(todo => todo.completed);
        completedTodos.forEach(todo => dispatch(deleteTodo(todo.id)))
    }
    return (
        <>
            <span>{activeTodos.length} items left</span>
            <label htmlFor="all">
                <input type="radio" name="filter" value={'All'} id="all"
                    onChange={(e) => dispatch(toggleFilter(e.target.value as FilterType))}
                />
                All
            </label>
            <label htmlFor="active">
                <input type="radio" name="filter" value={'Active'} id="active"
                    onChange={(e) => dispatch(toggleFilter(e.target.value as FilterType))}
                />
                Active
            </label>
            <label htmlFor="completed">
                <input type="radio" name="filter" value={'Completed'} id="completed" 
                    onChange={(e) => dispatch(toggleFilter(e.target.value as FilterType))}
                />
                Completed
            </label>
            <button type="button"
                onClick={clearCompletedTasks}
            >Clear completed</button>
        </>
    )
}

export default TodoFilter;