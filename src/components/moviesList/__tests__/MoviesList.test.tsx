import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import * as reduxHooks from 'react-redux';
import * as actions from '../moviesSlice';

import MoviesList from '../MoviesList';

const MockMoviesList = () => {
    return (
        <MemoryRouter>
            <MoviesList/>
        </MemoryRouter>
    )
}

const movieCards = [
    {
        "id": 1,
        "img": "https://i.pinimg.com/564x/4c/fd/d0/4cfdd0f9d131a56ed5280d213fd33a47.jpg",
        "title": "Pele",
        "genre": "Documentary",
        "date": 2021,
        "timer": 141,
        "descr": "Looks back at the extraordinary 12-year period in which Pelé, the only man to win three World Cup titles, went from young superstar in 1958 to national hero in 1970; a radical yet turbulent era in Brazil is history."
    },
    {
      "id": 2,
      "img": "https://i.pinimg.com/736x/bb/06/83/bb0683bca41055875a456851f6d99422.jpg",
      "title": "Platform",
      "genre": "Fantasy & Thriller & Drama",
      "date": 2019,
      "timer": 157,
      "descr": "A vertical prison with one cell per level. Two people per cell. Only one food platform and two minutes per day to feed. An endless nightmare trapped in The Hole."
    }
];

jest.mock('react-redux');
const mockedUseSelector = jest.spyOn(reduxHooks, 'useSelector');
const mockedUseDispatch = jest.spyOn(reduxHooks, 'useDispatch');

describe('MoviesList Component', () => {
    beforeAll(() => {
        mockedUseSelector.mockReturnValue(movieCards);
    })

    test('should dispatch action', async () => {
        const dispatch = jest.fn();
        mockedUseDispatch.mockReturnValue(dispatch);
        const mockedfetchMovies = jest.spyOn(actions, 'fetchMovies');

        render(<MockMoviesList/>);

        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(mockedfetchMovies).toHaveBeenCalledTimes(1);
    });

    test('should render one movies card', async () => {
        render(<MockMoviesList/>);
        
        const movieDivElement = await screen.findByTestId('movie-item-1');
        expect(movieDivElement).toBeInTheDocument();
    });

    test('should render all movies', async () => {
        render(<MockMoviesList/>);
        
        const movieDivElements = await screen.findAllByTestId(/movie-item/i);
        expect(movieDivElements.length).toBe(2); 
    });
});