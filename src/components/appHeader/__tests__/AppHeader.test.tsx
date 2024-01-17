import React from 'react';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import AppHeader from '../AppHeader';
import { Provider } from 'react-redux';
import store from '../../../store';

describe('AppHeader Component', () => {
    test('header element display', () => {
        render(
            <Provider store={store}>
                <AppHeader/>
            </Provider>);

        expect(screen.getByText(/netflixroulette/i)).toBeInTheDocument();
        expect(screen.getByRole('img')).toBeInTheDocument();
        expect(screen.getByAltText(/background/i)).toBeInTheDocument();
    });    
});