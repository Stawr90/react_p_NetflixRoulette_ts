import React from 'react';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchMovies, moviesList } from './moviesSlice';

import HeaderList from '../headerList/HeaderList';
import MovieCard from '../movieCard/MovieCard';

import './moviesList.scss';

const MoviesList = () => {
    const movies = useSelector(moviesList);
    const dispatch = useDispatch();
    const numMovies = movies.length;

    useEffect(() => {
        dispatch(fetchMovies() as any);
    }, []);

    return (
        <div data-testid="main-page">
            <HeaderList found={numMovies}/>
            <div className="list">
                <ul className="list__movies">
                    {movies.map(item => (
                        <MovieCard key={item.id} movie={item}/>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default MoviesList;