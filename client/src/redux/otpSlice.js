import { createSlice } from "@reduxjs/toolkit";

const otpSlice = createSlice({
  name: "otpSlice",
  initialState: {
    email: "",
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
  otpSlice.actions;
export default otpSlice.reducer;
