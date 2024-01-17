import React from 'react';

import { Routes, Route } from 'react-router-dom';

import AppContent from '../appContent/AppContent';
import LoginForm from '../loginForm/LoginForm';
import RegForm from '../regForm/RegForm';

import PrivateRoute from '../../utils/router/privateRoute';

import './app.scss';

function App() {
  
  return (
      <div className="App">
        <Routes>
          <Route element={<PrivateRoute/>}>
            <Route path='*' element={<AppContent/>}/>
          </Route>

          <Route path='/login' element={<LoginForm/>}/>
          <Route path='/registration' element={<RegForm/>}/>
        </Routes>
      </div>
  );
}

export default App;
