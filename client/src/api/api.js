import {setAccessToken} from "../redux/userLoginSlice.js";
import {publicRequest, userRequest} from "./axios.js";

export const signUp = async (userInfo) => {

    try {


        const res = await publicRequest.post("/api/user/auth/signup", userInfo, {headers: {"Content-Type": "multipart/form-data"}});
        console.log("final answer", res.data);
        return res.data;

    } catch (error) {
        console.log(error.response)
    }

};

export const login = async (userInfo, dispatch) => {
    console.log("check ", userInfo);
    const res = await publicRequest.post("/api/user/auth/login", userInfo);
    console.log("final login", res.data);
    dispatch(setAccessToken(res.data));
    userRequest.defaults.headers.token = res.data.tokenId;

};

export const getUserInfoByParams = async (id) => {
    console.log("second check", id);
    const res = await userRequest.get(`/api/user/getUserInfoByParams/${id}`);
    console.log(res.data, "finL PROFILE");
    console.log("data")
    return res.data;
};

export const putUserInfoById = async (userId, userInfo) => {
    console.log("second check error", userInfo, userId);
    const res = await userRequest.put(
        `/api/user/putUserInfoByParams/${userId}`,
        userInfo,
    );
    console.log(res.data, "UPDATED DATA");
};

export const deleteUserInfoById = async (userId) => {
    console.log("delete user id", userId);
    const res = await userRequest.delete(
        `/api/user/deleteUserInfoByParams/${userId}`,
    );

    console.log(res.data, "Account deleted");
    return res.data;
};
