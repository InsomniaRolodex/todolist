import { render, screen } from '@testing-library/react';
import { WrappedInputField } from './mock-components';

describe('Component: InputField', () => {

    it('should render correctly1', () => {
        const inputFormTestId = 'input-form';

        render(<WrappedInputField />);

        expect(screen.getByTestId(inputFormTestId)).toBeInTheDocument();
    });
});