import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { InputItems } from "types/TypesBase";
import { useHttp } from "hooks/http.hook";

interface IFetchLogin {
    username?: string,
    password?: string
}

interface IStateLogin {
    profile: IFetchLogin,
    login: boolean,
    loginLoadingStatus: 'idle' | 'loading' | 'succeeded' | 'error',
    inputItems: { name: InputItems, placeholder: string}[]
}

const initialState: IStateLogin = {
    profile: {},
    login: false,
    loginLoadingStatus: 'idle',
    inputItems: [
        {
            name: InputItems.USER_NAME,
            placeholder: 'Username'
        },
        {
            name: InputItems.PASSWORD,
            placeholder: 'Password'
        }
    ]
}

export const fetchLoginUser = createAsyncThunk(
    'login/fetchLoginUser',
    async () => {
        const {request} = useHttp();
        return await request("http://localhost:3000/profile");
    } 
);

export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        loginGetChar: (state, action) => {
            state.profile = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchLoginUser.pending, state => {state.loginLoadingStatus = 'loading'})
            .addCase(fetchLoginUser.fulfilled, (state: IStateLogin, action: PayloadAction<any>) => {
                state.loginLoadingStatus = 'succeeded';
                if (state.profile.username === action.payload.username && state.profile.password === action.payload.password) {
                    state.profile = {};
                    state.login = true;

                    localStorage.setItem('isAuthenticated', 'true');
                } else {
                    alert('Error username or password');
                }
            })
            .addCase(fetchLoginUser.rejected, state => {state.loginLoadingStatus = 'error'})

            .addDefaultCase(() => {})
    }
    
})

export const useLog = (state) => state.login.login;
export const profile = (state) => state.login.profile;
export const inpItems = (state) => state.login.inputItems;

const {actions, reducer} = loginSlice;

export default reducer;

export const {loginGetChar} = actions;