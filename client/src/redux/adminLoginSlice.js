import {createSlice} from "@reduxjs/toolkit";

const adminLoginSlice = createSlice({

    name: 'adminLoginSlice',
    initialState: {
        accessToken: null
    },
    reducers: {
        setAccessToken: (state, action) => {

            state.accessToken = action.payload;
        },
        clearAccessToken: (state, action) => {

            state.accessToken = action.payload;
        }

    }


})

export const {setAccessToken, clearAccessToken} = adminLoginSlice.actions;
export default adminLoginSlice.reducer;
