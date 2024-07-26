import { createSlice } from "@reduxjs/toolkit";

const superAdminOtpSlice = createSlice({
  name: "superAdminOtpSlice",
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
  superAdminOtpSlice.actions;
export default superAdminOtpSlice.reducer;
