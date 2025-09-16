import { render, screen } from '@testing-library/react';
import TodoItem from "../components/todo-item";
import { mockState, wrappedComponent } from './mock-components';


describe('Component: TodoItem', ()=> {

    it('should render correctly', () => {
        const todo = mockState.todos[0];
        const listItemTestId = 'list-item';

        render(wrappedComponent(<TodoItem id={todo.id} completed={todo.completed} title={todo.title}/>));
        expect(screen.getByTestId(listItemTestId)).toBeInTheDocument();
        });
});