import { setAccessToken } from '../../features/admin/redux/adminAuthSlice.js';
import { publicRequest, userRequest } from './adminAxios.js';

export const signUp = async (adminInfo) => {
  const res = await publicRequest.post('/api/admin/auth/signup', adminInfo);
  console.log('final answer', res.data);
  return res.data;
};

export const login = async (adminInfo, dispatch) => {
  console.log('check ', adminInfo);
  const res = await publicRequest.post('/api/admin/auth/login', adminInfo);
  console.log('final login', res.data);
  dispatch(setAccessToken(res.data));
};

export const getAdminInfoByParams = async (adminId) => {
  console.log('second check', adminId);
  const res = await userRequest.get(
    `/api/admin/getAdminInfoByParams/${adminId}`,
  );
  console.log(res.data, 'finL PROFILE');
  console.log('data');
  return res.data;
};

export const putAdminInfoById = async (adminId, adminInfo) => {
  console.log('second check error', adminInfo, adminId);
  const res = await userRequest.put(
    `/api/admin/putAdminInfoByParams/${adminId}`,
    adminInfo,
  );
  console.log(res.data, 'UPDATED DATA');
};

export const deleteAdminInfoById = async (adminId) => {
  console.log('delete user id', adminId);
  const res = await userRequest.delete(
    `/api/admin/deleteAdminInfoByParams/${adminId}`,
  );

  console.log(res.data, 'Account deleted');
  return res.data;
};
