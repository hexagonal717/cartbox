import { setAccessToken } from "../redux/userLoginSlice.js";
import { publicRequest, userRequest } from "./axios.js";

// Sign up new user
export const signUp = async (userInfo) => {
  try {
    const res = await publicRequest.post("/api/user/auth/signup", userInfo, {
      headers: { "Content-Type": "multipart/form-data" },
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

//Forgot password user
export const forgotPassword = async (email) => {
  try {
    const res = await publicRequest.post(
      `/api/user/auth/forgotpassword`,
      email,
    );
    console.log(res.data, "forgotPassword data");
    return res.data;
  } catch (error) {
    console.error("Forgot password error:", error.response);
    throw error;
  }
};

export const verifyOtp = async (otp) => {
  try {
    const res = await publicRequest.post("/api/user/auth/verifyotp", otp);
    console.log(res.data, "otp verify check");
    return res.data;
  } catch (error) {
    console.error("otp verification failed.", error.response);
  }
};

export const changePassword = async (email, password) => {
  try {
    const res = await publicRequest.post("/api/user/auth/changePassword", {
      email,
      password,
    });
    console.log("changePassword clientSide check:", res);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

// Get user info by ID
export const getUserInfoByParams = async (id) => {
  try {
    const res = await userRequest.get(`/api/user/getUserInfoByParams/${id}`);
    console.log("heyyyyy", res.data);
    return res.data;
  } catch (error) {
    console.error("Get user info error:", error.response);
    throw error;
  }
};

// Update user info by ID
export const putUserInfoByParams = async (userId, userInfo) => {
  try {
    const res = await userRequest.put(
      `/api/user/putUserInfoByParams/${userId}`,
      userInfo,
      {
        headers: { "Content-Type": "multipart/form-data" },
      },
    );
    return res.data;
  } catch (error) {
    console.error("Update user info error:", error.response);
    throw error;
  }
};

// Delete user info by ID
export const deleteUserInfoById = async (userId) => {
  try {
    const res = await userRequest.delete(
      `/api/user/deleteUserInfoByParams/${userId}`,
    );
    return res.data;
  } catch (error) {
    console.error("Delete user info error:", error.response);
    throw error;
  }
};
