import { createSlice } from "@reduxjs/toolkit";

const customerOtpSlice = createSlice({
  name: "customerOtpSlice",
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
  customerOtpSlice.actions;
export default customerOtpSlice.reducer;
