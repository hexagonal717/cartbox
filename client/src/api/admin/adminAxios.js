import axios from 'axios';

const baseUrl = 'http://localhost:3000';

export const publicRequest = axios.create({
  baseURL: baseUrl,
});

let token = null;

if (localStorage.getItem('persist:hexagonal717-cartbox')) {
  const data = JSON.parse(localStorage.getItem('persist:hexagonal717-cartbox'));
  const adminAuthSlice = JSON.parse(data.adminAuthSlice);
  if (adminAuthSlice && adminAuthSlice.accessToken) {
    token = adminAuthSlice.accessToken.tokenId;
  }
}

console.log('token', token);

export const userRequest = axios.create({
  baseURL: baseUrl,
  headers: token
    ? {
        token: token,
      }
    : {},
});
