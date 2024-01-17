import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useHttp } from "hooks/http.hook";
import { SearchBy, IStateSearch, IRootState } from "types/TypesBase";

const initialState: IStateSearch = {
    search: '',
    searchLoadingStatus: 'idle',
    searchBtn: SearchBy.TITLE,
    searchingItems: [
        {
            label: 'title',
            value: SearchBy.TITLE,
            id: 'radio-1'
        },
        {
            label: 'genre',
            value: SearchBy.GENRE,
            id: 'radio-2'
        }
    ]
}

export const fetchSearchMovies = createAsyncThunk<any, void, {state: IRootState}>(
    'search/fetchSearchMovies',
    async (_, {getState}) => {
        const {request} = useHttp();
        const state = getState();
        
        const searchBtn = state.search.searchBtn;
        const valueSearch = state.search.search;

        return await request(`http://localhost:3000/posts?${searchBtn}_like=${valueSearch}`)
    }
)

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        searchTitleOrGenre: (state, action) => {
            state.searchBtn = action.payload;
            state.search = '';
        },
        searchChange: (state, acrion) => {
            state.search = acrion.payload;
        }
    }
})

export const searchingBtn = (state) => state.search.searchingItems;
export const searchBtn = (state) => state.search.searchBtn;
export const valueSearch = (state) => state.search.search;

const {actions, reducer} = searchSlice;

export default reducer;

export const {searchTitleOrGenre, searchChange} = actions;