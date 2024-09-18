import { setAccessToken } from '@/features/customer/redux/customerAuthSlice.js';
import { publicRequest, userRequest } from '../customerAxios.js';

// Sign up new user
export const signUp = async (customerInfo) => {
  try {
    const res = await publicRequest.post('/api/customer/auth/signup', customerInfo, {
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

// Login user
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const login = async (customerInfo, dispatch) => {
  try {
    const res = await publicRequest.post('/api/customer/auth/login', customerInfo);
    await delay(1250);
    dispatch(setAccessToken(res.data));
    userRequest.defaults.headers.token = res.data.tokenId;
    return res.data;
  } catch (error) {
    console.error('Login error:', error.response);
    throw error;
  }
};

//Forgot password user
export const forgotPassword = async (email) => {
  try {
    const res = await publicRequest.post(`/api/customer/auth/forgotpassword`, email);
    return res.data;
  } catch (error) {
    console.error('Forgot password error:', error.response);
    throw error;
  }
};

export const verifyOtp = async (otp) => {
  try {
    const res = await publicRequest.post('/api/customer/auth/verifyotp', otp);
    return res.data;
  } catch (error) {
    console.error('otp verification failed.', error.response);
  }
};

export const changePassword = async (email, password) => {
  try {
    const res = await publicRequest.post('/api/customer/auth/changePassword', {
      email,
      password,
    });
    return res.data;
  } catch (err) {
    console.log(err);
  }
};
