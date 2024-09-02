import axios from 'axios';

const baseUrl = 'http://localhost:3000';

export const publicRequest = axios.create({
  baseURL: baseUrl,
});

let token = null;

if (localStorage.getItem('persist:hexagonal717-cartbox')) {
  const data = JSON.parse(localStorage.getItem('persist:hexagonal717-cartbox'));
  const superAdminAuthSlice = JSON.parse(data.superAdminAuthSlice);
  if (superAdminAuthSlice && superAdminAuthSlice.accessToken) {
    token = superAdminAuthSlice.accessToken.payload.tokenId;
  }
}

export const userRequest = axios.create({
  baseURL: baseUrl,
});

if (token) {
  userRequest.defaults.headers.token = token;
}
