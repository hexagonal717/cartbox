import {setAccessToken} from "../redux/userLoginSlice.js";
import {publicRequest, userRequest} from "./axios.js";

// Sign up new user
export const signUp = async (userInfo) => {
    try {
        const res = await publicRequest.post("/api/user/auth/signup", userInfo, {
            headers: {"Content-Type": "multipart/form-data"},
        });
        return res.data;
    } catch (error) {
        console.error("Sign-up error:", error.response);
        throw error;
    }
};

// Login user
export const login = async (userInfo, dispatch) => {
    try {
        const res = await publicRequest.post("/api/user/auth/login", userInfo);
        dispatch(setAccessToken(res.data));
        userRequest.defaults.headers.token = res.data.tokenId;
    } catch (error) {
        console.error("Login error:", error.response);
        throw error;
    }
};

// Get user info by ID
export const getUserInfoByParams = async (id) => {
    try {
        const res = await userRequest.get(`/api/user/getUserInfoByParams/${id}`);
        return res.data;
    } catch (error) {
        console.error("Get user info error:", error.response);
        throw error;
    }
};

// Update user info by ID
export const putUserInfoById = async (userId, userInfo) => {
    try {
        const res = await userRequest.put(`/api/user/putUserInfoByParams/${userId}`, userInfo);
        return res.data;
    } catch (error) {
        console.error("Update user info error:", error.response);
        throw error;
    }
};

// Delete user info by ID
export const deleteUserInfoById = async (userId) => {
    try {
        const res = await userRequest.delete(`/api/user/deleteUserInfoByParams/${userId}`);
        return res.data;
    } catch (error) {
        console.error("Delete user info error:", error.response);
        throw error;
    }
};
