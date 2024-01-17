import React from 'react';
import {render, screen} from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

import LoginForm from '../LoginForm';
import store from '../../../store';

const MockLoginForm = () => {
    return (
        <Provider store={store}>
            <MemoryRouter>
                <LoginForm/>
            </MemoryRouter>
        </Provider>
    )
}

describe('LoginForm Component', () => {
    test('should render login form', () => {
        render(<MockLoginForm/>);
    
        const heading = screen.getAllByRole('heading');
        expect(heading.length).toBe(2);
        expect(screen.getByText(/netflix roulette/i)).toBeInTheDocument();
        const signin = screen.getAllByText(/sign in/i);
        expect(signin.length).toBe(2);
        const inputs = screen.getAllByRole('textbox');
        expect(inputs.length).toBe(2);
        expect(screen.getByPlaceholderText(/username/i));
        expect(screen.getByPlaceholderText(/password/i));
        expect(screen.getByRole('button', {name: 'Sign In'})).toBeInTheDocument();
        expect(screen.getByText(/Don't have an account?/i)).toBeInTheDocument();
        expect(screen.getByRole('link', {name: 'Sign up'})).toBeInTheDocument();
        expect(screen.getByAltText('background')).toBeInTheDocument();
    });

    test('the fields should work', () => {
        render(<MockLoginForm/>);

        const usernameInp = screen.getByPlaceholderText(/username/i);
        const passInp = screen.getByPlaceholderText(/password/i);
        userEvent.type(usernameInp, 'STAWR90');
        expect(usernameInp).toHaveValue('STAWR90');
        userEvent.type(passInp, '12345Stawr');
        expect(passInp).toHaveValue('12345Stawr');
    })
})

