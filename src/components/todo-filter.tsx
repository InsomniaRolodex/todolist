import { JSX } from "react";
import { FilterType, useAppDispatch, useAppSelector } from "../types/types";
import { toggleFilter } from "../store/todo-slice";
import { getFilterType, getTodos } from "../selectors";
import { deleteTodo } from "../store/api-actions";


const TodoFilter = (): JSX.Element => {
    const todos = useAppSelector(getTodos);
    const activeTodos = todos.filter(todo => !todo.completed);
    const dispatch = useAppDispatch();
    const filterType = useAppSelector(getFilterType);
    const clearCompletedTasks = () => {
        const completedTodos = todos.filter(todo => todo.completed);
        completedTodos.forEach(todo => dispatch(deleteTodo(todo.id)));
    }
    return (
        <div className="filters">
            <span className="filters__todos-quantity">{activeTodos.length} items left</span>
            <label className="filters__label" htmlFor="all">
                <input className="filters__input" type="radio" name="filter" value={'All'} id="all"
                    onChange={(e) => dispatch(toggleFilter(e.target.value as FilterType))}
                    checked={filterType === 'All'}
                />
                All
            </label>
            <label className="filters__label" htmlFor="active">
                <input className="filters__input" type="radio" name="filter" value={'Active'} id="active"
                    onChange={(e) => dispatch(toggleFilter(e.target.value as FilterType))}
                    checked={filterType === 'Active'}
                />
                Active
            </label>
            <label className="filters__label" htmlFor="completed">
                <input className="filters__input" type="radio" name="filter" value={'Completed'} id="completed" 
                    onChange={(e) => dispatch(toggleFilter(e.target.value as FilterType))}
                    checked={filterType === 'Completed'}
                />
                Completed
            </label>
            <button className="filters__button" type="button"
                onClick={clearCompletedTasks}
            >Clear completed</button>
        </div>
    )
}

export default TodoFilter;