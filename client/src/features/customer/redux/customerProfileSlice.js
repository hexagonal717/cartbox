import { createSlice } from '@reduxjs/toolkit';

const customerProfileSlice = createSlice({
  name: 'customerProfileSlice',
  initialState: {
    userDataList: [],
  },
  reducers: {
    addCustomerData: (state, action) => {
      state.userDataList.push(action.payload);
    },
  },
});
export const { addCustomerData } = customerProfileSlice.actions;
export default customerProfileSlice.reducer;
