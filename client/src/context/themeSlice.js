import { createSlice } from '@reduxjs/toolkit';

const themeSlice = createSlice({
  name: 'themeSlice',
  initialState: {
    darkMode: false,
  },
  reducers: {
    setDarkMode: (state, action) => {
      state.darkMode = action.payload;
    },
  },
});

export const { setDarkMode } = themeSlice.actions;
export default themeSlice.reducer;
