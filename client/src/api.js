import axios from "axios";
import {accessToken} from "./Redux/loginSlice.js";

export const signUp = async (userInfo) => {
    const res = await axios.post("http://localhost:3000/auth/signup", userInfo);
    console.log("final answer", res.data);
    return res.data;
};

export const login = async (userInfo, dispatch) => {
    console.log("check ", userInfo);
    const res = await axios.post("http://localhost:3000/auth/login", userInfo);
    console.log("final login", res.data);
    dispatch(accessToken(res.data));

};

export const allUserInfo = async () => {
    const res = await axios.get("http://localhost:3000/api/user/getAllUserInfo");
    console.log(res.data);
    return res.data;
};