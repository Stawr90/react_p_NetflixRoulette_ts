import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { movieCard } from '../moviesList/moviesSlice';

import './infoCard.scss';

const InfoCard = () => {
    const card = useSelector(movieCard);
    const {img, title, date, timer, descr} = card;

    return (
        <div className='info' data-testid="info-card-page">
            <div className="info__img">
                <img src={img} alt={title}/>
            </div>
            <div className="info__text">
                <div className="info__title">{title}</div>
                <div className="info__char">
                    <span className='info__char-year'>{date}</span>
                    <span className='info__char-time'>{timer} min</span>
                </div>
                <div className="info__descr">{descr}</div>
                <Link to='/' data-testid="main-link"><button className="info__btn">Films</button></Link>
            </div>
        </div>
    )
}

export default InfoCard;