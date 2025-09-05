import { JSX } from "react";
import { FilterType, useAppDispatch, useAppSelector } from "../types/types";
import { toggleFilter } from "../store/todo-slice";
import { getFilterType, getTodos } from "../selectors";
import { deleteTodo } from "../store/api-actions";
import { Filter } from "../const";


const TodoFilter = (): JSX.Element => {
    const todos = useAppSelector(getTodos);
    const activeTodos = todos.filter(todo => !todo.completed);
    const dispatch = useAppDispatch();
    const curretFilter = useAppSelector(getFilterType);
    const clearCompletedTasks = () => {
        const completedTodos = todos.filter(todo => todo.completed);
        completedTodos.forEach(todo => dispatch(deleteTodo(todo.id)));
    }
    return (
        <div className="filters">
            {Object.values(Filter).map((filter) =>
                <label className={`filters__label ${filter === curretFilter ? 'filters__label--current' : ''}`} htmlFor={filter} key={Object.values(Filter).indexOf(filter)}>
                    <input className="filters__input visually-hidden" type="radio" name="filter" value={filter} id={filter}
                        onChange={(e) => dispatch(toggleFilter(e.target.value as FilterType))}
                        checked={curretFilter === filter}
                    />
                    {filter} todos
                </label>
            )}
            <button className="filters__button" type="button"
                onClick={clearCompletedTasks}>
                Clear completed
            </button>
            <span className="filters__todos-quantity">
                <span>{activeTodos.length} </span>
                todos left
            </span>
        </div>
    )
}

export default TodoFilter;