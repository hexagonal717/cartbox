import { createSlice } from '@reduxjs/toolkit';

const adminAuthSlice = createSlice({
  name: 'adminAuthSlice',
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

export const { setAccessToken, clearAccessToken } = adminAuthSlice.actions;
export default adminAuthSlice.reducer;
