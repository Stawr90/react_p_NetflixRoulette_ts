import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {MemoryRouter} from "react-router-dom";
import { Provider } from 'react-redux';

import App from '../App';
import AppContent from '../../appContent/AppContent';
import store from '../../../store';

describe('App Component test router', () => {
    test('Router test login-registration', () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <App/>
                </MemoryRouter>
            </Provider>
        );

        const regLink = screen.getByTestId('registration-link');
        userEvent.click(regLink);
        expect(screen.getByTestId('registration-page')).toBeInTheDocument();
        
        const loginLink = screen.getByTestId('login-link');
        userEvent.click(loginLink);
        expect(screen.getByTestId('login-page')).toBeInTheDocument();
    });

    test('Router test AppContent', () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <AppContent/>
                </MemoryRouter>
            </Provider>
        );

        const mainPage = screen.getByTestId('main-page');
        expect(mainPage).toBeInTheDocument();
    });

    test('Router test Error page', () => {
        render(
            <Provider store={store}>
                <MemoryRouter initialEntries={['/asfasfafasf']}>
                    <AppContent/>
                </MemoryRouter>
            </Provider>
            
        );

        expect(screen.getByTestId('not-found-page')).toBeInTheDocument();
        const mainLink = screen.getByTestId('main-link');
        userEvent.click(mainLink);
        expect(screen.getByTestId('main-page')).toBeInTheDocument();
    });
});