import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
  name: "loginSlice",
  initialState: {
    accessToken: null,
  },
  reducers: {
    getAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
    removeAccessToken: (state) => {
      state.accessToken = null;
    },
  },
});

export const { getAccessToken, removeAccessToken } = loginSlice.actions;
export default loginSlice.reducer;
