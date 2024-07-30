import { createSlice } from '@reduxjs/toolkit';

const adminOtpSlice = createSlice({
  name: 'adminOtpSlice',
  initialState: {
    email: '',
    otpVerify: false,
  },
  reducers: {
    setEmailState: (state, action) => {
      state.email = action.payload;
    },
    setOtpVerify: (state, action) => {
      state.otpVerify = action.payload;
    },
    clearEmailState: (state) => {
      state.email = null;
    },
  },
});

export const { setEmailState, setOtpVerify, clearEmailState } =
  adminOtpSlice.actions;
export default adminOtpSlice.reducer;
