import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { movieGetChar } from '../moviesList/moviesSlice';
import { TMovie } from 'types/TypesBase';

import './movieCard.scss';

const MovieCard = ({movie}: TMovie) => {
    const {id, img, title, genre, date} = movie;
    const dispatch = useDispatch();

    return (
        <li className="card" onClick={() => dispatch(movieGetChar(id))} data-testid={`movie-item-${id}`}>
            <Link to={`/posts/${id}`} data-testid="info-card-link">
                <div className="card__img">
                    <img src={img} alt={title} />
                </div>
                <div className="card__desc">
                    <div className="card__item">
                        <div className="card__item-title">{title}</div>
                        <div className="card__item-date">{date}</div>
                    </div>
                    <span>{genre}</span>
                </div>
            </Link>
        </li>
    )
}

export default MovieCard;