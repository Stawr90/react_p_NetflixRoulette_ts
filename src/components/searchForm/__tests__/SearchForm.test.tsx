import React from 'react';
import {render, screen} from '@testing-library/react';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';

import reducer, { searchTitleOrGenre } from '../searchSlice';
import store from '../../../store';
import SearchForm from '../SearchForm';

const MockSearchForm = () => {
    return (
        <Provider store={store}>
            <SearchForm/>
        </Provider>
    )
}

describe('SearchForm Component', () => {
    test('should render search form', () => {
        render(<MockSearchForm/>);

        expect(screen.getByText(/find your movie/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Please enter a movie')).toBeInTheDocument();
        expect(screen.getByText(/search by/i)).toBeInTheDocument();
        const radioButton = screen.getAllByRole('radio');
        expect(radioButton.length).toBe(2);
        expect(screen.getByLabelText('title')).toBeInTheDocument();
        expect(screen.getByLabelText('genre')).toBeInTheDocument();
        expect(screen.getByRole('button', {name: 'search'})).toBeInTheDocument();
    });

    test('should work input and buttons', async () => {
        render(<MockSearchForm/>);

        const inputElement = screen.getByPlaceholderText('Please enter a movie');
        const titleButton = screen.getByLabelText('title');
        const genreButton = screen.getByLabelText('genre');
        userEvent.type(inputElement, 'Pele');
        expect(inputElement).toHaveValue('Pele');
        userEvent.click(genreButton);
        const state = reducer(undefined, searchTitleOrGenre('genre'));
        expect(state.searchBtn).toContain('genre');
        expect(inputElement).toHaveValue('');
        expect(genreButton).toBeChecked();
        expect(titleButton).not.toBeChecked();
    });
})