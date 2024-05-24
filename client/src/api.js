import axios from "axios";

export const signUp = async (userInfo) => {
    const res = await axios.post("http://localhost:3000/api/user/signup", userInfo)
    console.log("final answer", res.data)
    return res.data
};

export const allUserInfo = async () => {

    const res = await axios.get("http://localhost:3000/api/user/home")
    console.log(res.data)
    return res.data


}
