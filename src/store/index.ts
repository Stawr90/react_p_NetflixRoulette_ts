import { configureStore } from "@reduxjs/toolkit";
import movies from '../components/moviesList/moviesSlice';
import search from '../components/searchForm/searchSlice';
import login from '../components/loginForm/loginSlice';
import reg from '../components/regForm/regSlice';

const stringMiddleware = () => (next) => (action) => {
    if (typeof action === 'string') {
        return next({
            type: action
        })
    }
    return next(action)
};

const store = configureStore({
    reducer: {movies, search, login, reg},
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(stringMiddleware),
    devTools: process.env.NODE_ENV !== 'production'
});

export default store;