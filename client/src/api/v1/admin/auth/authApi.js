import { setAccessToken } from '@/features/admin/redux/adminAuthSlice.js';
import { publicRequest, userRequest } from '../adminAxios.js';

// Admin login
export const login = async (adminInfo, dispatch) => {
  try {
    const res = await publicRequest.post('/api/admin/auth/login', adminInfo);
    dispatch(setAccessToken(res.data));
    userRequest.defaults.headers.token = res.data.tokenId;
    return res.data;
  } catch (error) {
    console.error('Login error:', error.response);
    throw error;
  }
};

// Admin signup
export const signUp = async (adminInfo) => {
  try {
    const res = await publicRequest.post('/api/admin/auth/signup', adminInfo, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return res.data;
  } catch (error) {
    console.error('Sign-up error:', error.response);
    throw error;
  }
};
