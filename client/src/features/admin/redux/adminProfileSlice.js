import { createSlice } from '@reduxjs/toolkit';

const adminProfileSlice = createSlice({
  name: 'adminProfileSlice',
  initialState: {
    AdminDataList: [],
  },
  reducers: {
    addAdminData: (state, action) => {
      state.userDataList.push(action.payload);
    },
  },
});
export const { addAdminData } = adminProfileSlice.actions;
export default adminProfileSlice.reducer;
