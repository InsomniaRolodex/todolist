import { render, screen } from '@testing-library/react';
import TodoFilter from "../components/todo-filter";
import { wrappedComponent } from './mock-components';


describe('Component: TodoFilter', ()=> {

    it('should render correctly', () => {
        const filterElementTestId = 'filter-element';

        render(wrappedComponent(<TodoFilter />));
        expect(screen.getByTestId(filterElementTestId)).toBeInTheDocument();
        });
});