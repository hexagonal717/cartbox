import { getAccessToken } from "./redux/loginSlice.js";
import { publicRequest, userRequest } from "./axiosCreate.js";

export const signUp = async (userInfo) => {
  const res = await publicRequest.post("/api/auth/signup", userInfo);
  console.log("final answer", res.data);
  return res.data;
};

export const login = async (userInfo, dispatch) => {
  console.log("check ", userInfo);
  const res = await publicRequest.post("/api/auth/login", userInfo);
  console.log("final login", res.data);
  dispatch(getAccessToken(res.data));
};

export const getUserInfoByParams = async (id) => {
  console.log("second check", id);
  const res = await userRequest.get(`/api/user/getUserInfoByParams/${id}`);
  console.log(res.data, "finL PROFILE");
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
