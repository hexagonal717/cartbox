import axios from "axios";

export const signUp = (userInfo) => {
  axios.post("http://localhost:3000/api/user/signup", userInfo);
};
