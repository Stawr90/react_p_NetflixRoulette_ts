import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { useHttp } from "hooks/http.hook";
import { fetchSearchMovies } from "../searchForm/searchSlice";
import { SortBy, IStateMovies, IRootState } from "types/TypesBase";

const initialState: IStateMovies = {
    movies: [],
    moviesLoadingStatus: 'idle',
    movieCard: undefined,
    sortBtn: null,
    sortingItems: [
        {
            label: 'release date',
            value: SortBy.RELEASE_DATE
        },
        {
            label: 'movie title',
            value: SortBy.MOVIE_TITLE
        }
    ]
};

export const fetchMovies = createAsyncThunk(
    'movies/fetchMovies',
    async () => {
        const {request} = useHttp();
        return await request("http://localhost:3000/posts");
    } 
);

export const fetchSortMovies = createAsyncThunk<any, void, {state: IRootState}>(
    'movies/fetchSortMovies',
    async (_, {getState}) => {
        const {request} = useHttp();
        const state = getState();
        
        const sortBtn = state.movies.sortBtn;
        const sortOrder = sortBtn === SortBy.RELEASE_DATE ? 'desc' : 'asc';
        
        return await request(`http://localhost:3000/posts?_sort=${sortBtn}&_order=${sortOrder}`);
    }
);

export const moviesSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {
        movieGetChar: (state, action) => {
            state.movieCard = state.movies.find(item => item.id === action.payload);
        },
        movieGetSerch: (state, action) => {
            state.movieCard = action.payload;
        },
        moviesSorted: (state, action) => {
            state.sortBtn = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            // first request
            .addCase(fetchMovies.pending, state => {state.moviesLoadingStatus = 'loading'})
            .addCase(fetchMovies.fulfilled, (state, action: PayloadAction<any>) => {
                state.moviesLoadingStatus = 'succeeded';
                state.movies = action.payload;
            })
            .addCase(fetchMovies.rejected, state => {state.moviesLoadingStatus = 'error'})

            // sort movies
            .addCase(fetchSortMovies.pending, state => {state.moviesLoadingStatus = 'loading'})
            .addCase(fetchSortMovies.fulfilled, (state, action: PayloadAction<any>) => {
                state.moviesLoadingStatus = 'succeeded';
                state.movies = action.payload;
            })
            .addCase(fetchSortMovies.rejected, state => {state.moviesLoadingStatus = 'error'})

            // search movies
            .addCase(fetchSearchMovies.pending, state => {state.moviesLoadingStatus = 'loading'})
            .addCase(fetchSearchMovies.fulfilled, (state, action: PayloadAction<any>) => {
                state.moviesLoadingStatus = 'succeeded';
                state.movies = action.payload;
                state.sortBtn = null;
            }) 
            .addCase(fetchSearchMovies.rejected, state => {state.moviesLoadingStatus = 'error'})

            .addDefaultCase(() => {})
    }
});

export const moviesList = (state) => state.movies.movies;
export const sortingBtn = (state) => state.movies.sortingItems;
export const sortBtn = (state) => state.movies.sortBtn;
export const movieCard = (state) => state.movies.movieCard;

const {actions, reducer} = moviesSlice;

export default reducer;

export const {movieGetChar, movieGetSerch, moviesSorted} = actions;