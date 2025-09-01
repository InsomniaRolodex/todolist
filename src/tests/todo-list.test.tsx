import { render, screen } from '@testing-library/react';
import TodoList from "../components/todo-list";

describe('Component: Header', ()=> {
    it('should render correctly', () => {
        const listContainerTestId = 'list-container';

        render(<TodoList />);
        expect(screen.getByTestId(listContainerTestId)).toBeInTheDocument();
        });
});