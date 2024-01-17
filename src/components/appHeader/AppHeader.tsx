import React from 'react';

import SearchForm from '../searchForm/SearchForm';

import netflixBg from '../../resources/img/netflix_bg.jpg';
import './appHeader.scss';

const AppHeader = () => {

    return (
        <header className="app__header">
            <div className="app__header-wrapper">
                <h1 className="app__title">
                    <span>netflixroulette</span>
                </h1>
            </div>
            <SearchForm/>
            <div className="app__img">
                <img src={netflixBg} alt='background'/>
            </div>
        </header>
    )
}

export default AppHeader;