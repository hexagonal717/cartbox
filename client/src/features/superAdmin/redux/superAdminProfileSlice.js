import { createSlice } from '@reduxjs/toolkit';

const superAdminProfileSlice = createSlice({
  name: 'superAdminProfileSlice',
  initialState: {
    AdminDataList: [],
  },
  reducers: {
    addSuperAdminData: (state, action) => {
      state.userDataList.push(action.payload);
    },
  },
});
export const { addSuperAdminData } = superAdminProfileSlice.actions;
export default superAdminProfileSlice.reducer;
