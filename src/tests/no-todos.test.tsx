import { render, screen } from '@testing-library/react';
import Notodos from "../components/no-todos";

describe('Component: Header', ()=> {
    it('should render correctly', () => {
        const expectedText = 'Oops, there\'s no todos!';

        render(<Notodos />);
        expect(screen.getByText(expectedText)).toBeInTheDocument();
        });
});