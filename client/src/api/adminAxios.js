import axios from "axios";

const baseUrl = "http://localhost:3000";

export const publicRequest = axios.create({
    baseURL: baseUrl,
});

let token = null;

if (localStorage.getItem("persist:calvinmern")) {
    const data = JSON.parse(localStorage.getItem("persist:calvinmern"));
    const adminLoginSlice = JSON.parse(data.adminLoginSlice);
    if (adminLoginSlice && adminLoginSlice.accessToken) {
        token = adminLoginSlice.accessToken.tokenId;
    }
}

console.log("token", token);

export const userRequest = axios.create({
    baseURL: baseUrl,
    headers: token ? {token: token} : {},
});
