import {createSlice} from "@reduxjs/toolkit";

const adminSlice = createSlice({
    name: "adminSlice",
    initialState: {
        AdminDataList: [],
    },
    reducers: {
        addAdminData: (state, action) => {
            state.userDataList.push(action.payload);
        },
    },
});
export const {addAdminData} = adminSlice.actions;
export default adminSlice.reducer;
