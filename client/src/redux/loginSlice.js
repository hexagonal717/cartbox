import {createSlice} from "@reduxjs/toolkit";

const loginSlice = createSlice({
    name: "loginSlice",
    initialState: {
        accessTokenList: null,
    },
    reducers: {
        accessToken: (state, action) => {
            state.accessTokenList = action.payload;
        },
        removeAccessToken: (state) => {
            state.accessTokenList = null;
        },
    },
});

export const {accessToken, removeAccessToken} = loginSlice.actions;
export default loginSlice.reducer;
