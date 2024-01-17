import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';

import reducer, { moviesSorted } from '../../moviesList/moviesSlice';
import HeaderList from '../HeaderList';
import store from '../../../store';

const MockHeaderList = () => {
    return (
        <Provider store={store}>
            <HeaderList found={7}/>
        </Provider>
    )
}

describe('HeaderList Component', () => {
    test('should render header list', () => {
        render(<MockHeaderList/>);
    
        expect(screen.getByText(/7 movies found/i)).toBeInTheDocument();
        expect(screen.getByText('Sort by')).toBeInTheDocument();
        const radioButton = screen.getAllByRole('radio');
        expect(radioButton.length).toBe(2);
        expect(screen.getByLabelText(/release date/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/movie title/i)).toBeInTheDocument();
    });

    test('should work buttons', () => {
        render(<MockHeaderList/>);

        const date = screen.getByLabelText(/release date/i);
        const title = screen.getByLabelText(/movie title/i);
        userEvent.click(date);
        const store = reducer(undefined, moviesSorted('date'));
        expect(store.sortBtn).toContain('date');
        expect(date).toBeChecked();
        userEvent.click(title);
        expect(title).toBeChecked();
        expect(date).not.toBeChecked();
    });
})
