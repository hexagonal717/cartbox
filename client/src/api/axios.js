import axios from "axios";

const baseUrl = "http://localhost:3000";

export const publicRequest = axios.create({
    baseURL: baseUrl,
});

let token = null;

if (localStorage.getItem("persist:calvinmern")) {
    const data = JSON.parse(localStorage.getItem("persist:calvinmern"));
    const userLoginSlice = JSON.parse(data.userLoginSlice);
    if (userLoginSlice && userLoginSlice.accessToken) {
        token = userLoginSlice.accessToken.tokenId;
    }
}

export const userRequest = axios.create({
    baseURL: baseUrl,
});

if (token) {
    userRequest.defaults.headers.token = token;
}
