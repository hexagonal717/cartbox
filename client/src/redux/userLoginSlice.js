import {createSlice} from "@reduxjs/toolkit";

const userLoginSlice = createSlice({
    name: "userLoginSlice",
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

export const {setAccessToken, clearAccessToken} = userLoginSlice.actions;
export default userLoginSlice.reducer;
