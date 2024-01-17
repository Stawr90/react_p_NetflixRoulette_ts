import React from 'react';

import { Routes, Route } from 'react-router-dom';

import AppHeader from '../appHeader/AppHeader';
import AppFooter from '../appFooter/AppFooter';
import MoviesList from '../moviesList/MoviesList';
import InfoCard from '../infoCard/InfoCard';
import Page404 from '../pages/404';

const AppContent: React.FC = () => {
    return (
      <>
        <AppHeader/>
        <main>
          <Routes>
            <Route path='/' element={<MoviesList/>}/>
            <Route path='/posts/:id' element={<InfoCard/>}/>
            <Route path='*' element={<Page404/>}/>
          </Routes>
        </main>
        <AppFooter/>
      </>
    )
}

export default AppContent;