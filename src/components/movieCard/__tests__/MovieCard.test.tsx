import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import * as reduxHooks from 'react-redux';
import * as actions from '../../moviesList/moviesSlice';
import userEvent from '@testing-library/user-event';

import MoviesCard from '../MovieCard';

const movieCard = {
    "id": 3,
    "img": "https://i.pinimg.com/564x/e7/ee/67/e7ee67dd19556aa9027a4205aaf89585.jpg",
    "title": "Irishman",
    "genre": "Crime & Drama & Biography",
    "date": 2019,
};

const MockMoviesCard = () => {
    return (
        <MemoryRouter>
            <MoviesCard movie={movieCard}/>
        </MemoryRouter>
    )
}

jest.mock('react-redux');
const mockedUseDispatch = jest.spyOn(reduxHooks, 'useDispatch');

describe('MoviesCard Component', () => {
    test('should dispatch action', async () => {
        const dispatch = jest.fn();
        mockedUseDispatch.mockReturnValue(dispatch);
        const mockedMovieGetChar = jest.spyOn(actions, 'movieGetChar');

        render(<MockMoviesCard/>);

        userEvent.click(screen.getByTestId('movie-item-3'))
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(mockedMovieGetChar).toHaveBeenCalledWith(3);
    });

    test('should render movies card', () => {
        render(<MockMoviesCard/>);

        expect(screen.getByAltText(/irishman/i)).toBeInTheDocument();
        expect(screen.getByText(/irishman/i)).toBeInTheDocument();
        expect(screen.getByText(/2019/i)).toBeInTheDocument();
        expect(screen.getByText(/Crime & Drama & Biography/i)).toContainHTML('span')
    });
});