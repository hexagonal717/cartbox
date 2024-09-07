import axios from 'axios';

const baseUrl = import.meta.env.VITE_CARTBOX_LOCALHOST_API_BASE_URL;

console.log(baseUrl);

export const publicRequest = axios.create({
  baseURL: baseUrl,
});

let token = null;

if (localStorage.getItem('persist:hexagonal717-cartbox')) {
  const data = JSON.parse(localStorage.getItem('persist:hexagonal717-cartbox'));
  const customerAuthSlice = JSON.parse(data.customerAuthSlice);
  if (customerAuthSlice && customerAuthSlice.accessToken) {
    token = customerAuthSlice.accessToken.tokenId;
  }
}

export const userRequest = axios.create({
  baseURL: baseUrl,
});

if (token) {
  userRequest.defaults.headers.token = token;
}
