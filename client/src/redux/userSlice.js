import {createSlice} from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "userSlice",
    initialState: {
        userDataList: [],
    },
    reducers: {
        addUserData: (state, action) => {
            state.userDataList.push(action.payload);
        },
    },
});
export const {addUserData} = userSlice.actions;
export default userSlice.reducer;
