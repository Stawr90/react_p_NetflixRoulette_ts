import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { useHttp } from "hooks/http.hook";
import { IFormData, InputItems } from 'types/TypesBase';

interface IStateReg {
    user: {},
    reg: boolean,
    regLoadingStatus: 'idle' | 'loading' | 'succeeded' | 'error',
    inputItems: { name: InputItems, placeholder: string}[]
}

const initialState: IStateReg = {
    user: {},
    reg: false,
    regLoadingStatus: 'idle',
    inputItems: [
        {
            name: InputItems.USER_NAME,
            placeholder: 'Username'
        },
        {
            name: InputItems.EMAIL,
            placeholder: 'Email'
        },
        {
            name: InputItems.PASSWORD,
            placeholder: 'Password'
        },
        {
            name: InputItems.CONFIRM_PASS,
            placeholder: 'Confirm Password'
        }
    ]
}

export const fetchRegUser = createAsyncThunk(
    'reg/fetchRegUser',
    async (data: IFormData) => {
        const {request} = useHttp();
        return await request("http://localhost:3000/profile", 'POST', JSON.stringify(data));
    } 
);

export const regSlice = createSlice({
    name: 'reg',
    initialState,
    reducers: {
        regCreateAccount: (state) => {
            state.reg = !state.reg;
        },
    },
    extraReducers: (builder) => {
        builder
            // Profile registration
            .addCase(fetchRegUser.pending, state => {state.regLoadingStatus = 'loading'})
            .addCase(fetchRegUser.fulfilled, (state, action: PayloadAction<any>) => {
                state.regLoadingStatus = 'succeeded';
                state.user = action.payload;
            })
            .addCase(fetchRegUser.rejected, state => {state.regLoadingStatus = 'error'})

            .addDefaultCase(() => {})
    }
})

export const inpItems = (state) => state.reg.inputItems;
export const useReg = (state) => state.reg.reg;

const {reducer, actions} = regSlice;

export default reducer;

export const {regCreateAccount} = actions;