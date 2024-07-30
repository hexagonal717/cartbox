import { createSlice } from '@reduxjs/toolkit';

const superAdminAuthSlice = createSlice({
  name: 'superAdminAuthSlice',
  initialState: {
    accessToken: null,
  },
  reducers: {
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
    clearAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
  },
});

export const { setAccessToken, clearAccessToken } = superAdminAuthSlice.actions;
export default superAdminAuthSlice.reducer;
