import { render, screen } from '@testing-library/react';
import TodoList from "../components/todo-list";
import { wrappedComponent } from './mock-components';


describe('Component: TodoList', ()=> {

    it('should render correctly', () => {
        const listContainerTestId = 'list-container';

        render(wrappedComponent(<TodoList />));
        expect(screen.getByTestId(listContainerTestId)).toBeInTheDocument();
        });
});