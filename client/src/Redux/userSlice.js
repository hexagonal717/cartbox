import { createSlice } from "@reduxjs/toolkit";

const data = createSlice({
  name: "userData",
  initialState: {
    userDataList: [],
  },
  reducers: {
    addUserData: (state, action) => {
      state.userDataList.push(action.payload);
    },
  },
});
export const { addUserData } = data.actions;
export default data.reducer;
