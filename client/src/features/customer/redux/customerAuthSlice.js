import {createSlice} from "@reduxjs/toolkit";

const customerAuthSlice = createSlice({
    name: "customerAuthSlice",
    initialState: {
        accessToken: null,
    },
    reducers: {
        setAccessToken: (state, action) => {
            state.accessToken = action.payload;
        },
        clearAccessToken: (state) => {
            state.accessToken = null;
        },
    },
});

export const {setAccessToken, clearAccessToken} = customerAuthSlice.actions;
export default customerAuthSlice.reducer;
