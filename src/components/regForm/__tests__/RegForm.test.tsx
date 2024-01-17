import React from 'react';
import {render, screen} from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

import RegForm from '../RegForm';
import store from '../../../store';

const MockRegForm = () => {
    return (
        <Provider store={store}>
            <MemoryRouter>
                <RegForm/>
            </MemoryRouter>
        </Provider>
    )
}

describe('RegForm Component', () => {
    test('should render reg form', () => {
        render(<MockRegForm/>);

        const heading = screen.getAllByRole('heading');
        expect(heading.length).toBe(2);
        expect(screen.getByText(/netflix roulette/i)).toBeInTheDocument();
        expect(screen.getByText(/create account/i)).toBeInTheDocument();
        const inputs = screen.getAllByRole('textbox');
        expect(inputs.length).toBe(4);
        expect(screen.getByPlaceholderText(/username/i));
        expect(screen.getByPlaceholderText(/email/i));
        const pass = screen.getAllByPlaceholderText(/password/i);
        expect(pass.length).toBe(2);
        expect(screen.getByRole('button', {name: 'Create'})).toBeInTheDocument();
        expect(screen.getByText('or')).toContainHTML('p');
        expect(screen.getByRole('link', {name: 'Sign in'})).toBeInTheDocument();
        expect(screen.getByAltText('background')).toBeInTheDocument();
    });

    const inpValue = (values) => {
        values.forEach(item => {
            expect(item).toHaveValue('');
        })
    };

    test('the fields should work', () => {
        render(<MockRegForm/>);

        const usernameInp = screen.getByPlaceholderText(/username/i);
        const emailInp = screen.getByPlaceholderText(/email/i);
        const passInp = screen.getAllByPlaceholderText(/password/i);
        userEvent.type(usernameInp, 'STAWR90');
        expect(usernameInp).toHaveValue('STAWR90');
        userEvent.type(emailInp, 'stars@mail.ru');
        expect(emailInp).toHaveValue('stars@mail.ru');
        userEvent.type(passInp[0], '12345Stawr');
        expect(passInp[0]).toHaveValue('12345Stawr');
        userEvent.type(passInp[1], '12345Stawr');
        expect(passInp[1]).toHaveValue('12345Stawr');
        const createButton = screen.getByRole('button');
        userEvent.click(createButton);
        expect(screen.getByText(/successfully created!/i)).toBeInTheDocument();
        inpValue([usernameInp, emailInp, passInp[0], passInp[1]]);
    });
})