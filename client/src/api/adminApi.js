import {setAccessToken} from "../redux/adminLoginSlice.js";
import {publicRequest, userRequest} from "./adminAxios.js";

export const signUp = async (userInfo) => {
    const res = await publicRequest.post("/api/admin/auth/signup", userInfo);
    console.log("final answer", res.data);
    return res.data;
};

export const login = async (userInfo, dispatch) => {
    console.log("check ", userInfo);
    const res = await publicRequest.post("/api/admin/auth/login", userInfo);
    console.log("final login", res.data);
    dispatch(setAccessToken(res.data));
};

export const getUserInfoByParams = async (id) => {
    console.log("second check", id);
    const res = await userRequest.get(`/api/admin/getUserInfoByParams/${id}`);
    console.log(res.data, "finL PROFILE");
    console.log("data")
    return res.data;
};

export const putUserInfoById = async (userId, userInfo) => {
    console.log("second check error", userInfo, userId);
    const res = await userRequest.put(
        `/api/admin/putUserInfoByParams/${userId}`,
        userInfo,
    );
    console.log(res.data, "UPDATED DATA");
};

export const deleteUserInfoById = async (userId) => {
    console.log("delete user id", userId);
    const res = await userRequest.delete(
        `/api/admin/deleteUserInfoByParams/${userId}`,
    );

    console.log(res.data, "Account deleted");
    return res.data;
};
