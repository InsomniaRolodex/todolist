import Header from "../components/header";
import { render, screen } from '@testing-library/react';

describe('Component: Header', ()=> {
    it('should render correctly', () => {
        const expectedText = 'This is todo list!';

        render(<Header />);
        expect(screen.getByText(expectedText)).toBeInTheDocument();
        });
});