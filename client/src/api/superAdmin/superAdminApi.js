import { setAccessToken } from '../../features/superAdmin/redux/superAdminAuthSlice.js';
import { publicRequest, userRequest } from './superAdminAxios.js';

// Sign up new user
export const signUp = async (superAdminInfo) => {
  try {
    const res = await publicRequest.post(
      '/api/superAdmin/auth/signup',
      superAdminInfo,
      {
        headers: { 'Content-Type': 'multipart/form-data' },
      },
    );
    return res.data;
  } catch (error) {
    console.error('Sign-up error:', error.response);
    throw error;
  }
};

// Login user
export const login = async (superAdminInfo, dispatch) => {
  try {
    const res = await publicRequest.post(
      '/api/superAdmin/auth/login',
      superAdminInfo,
    );
    dispatch(setAccessToken(res.data));
    userRequest.defaults.headers.token = res.data.tokenId;
  } catch (error) {
    console.error('Login error:', error.response);
    throw error;
  }
};

//Forgot password user
export const forgotPassword = async (email) => {
  try {
    const res = await publicRequest.post(
      `/api/superAdmin/auth/forgotpassword`,
      email,
    );
    console.log(res.data, 'forgotPassword data');
    return res.data;
  } catch (error) {
    console.error('Forgot password error:', error.response);
    throw error;
  }
};

export const verifyOtp = async (otp) => {
  try {
    const res = await publicRequest.post('/api/superAdmin/auth/verifyotp', otp);
    console.log(res.data, 'otp verify check');
    return res.data;
  } catch (error) {
    console.error('otp verification failed.', error.response);
  }
};

export const changePassword = async (email, password) => {
  try {
    const res = await publicRequest.post(
      '/api/superAdmin/auth/changePassword',
      {
        email,
        password,
      },
    );
    console.log('changePassword clientSide check:', res);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

// Get user info by ID
export const getSuperAdminInfoByParams = async (superAdminId) => {
  try {
    const res = await userRequest.get(
      `/api/superAdmin/profile/getSuperAdminInfoByParams/${superAdminId}`,
    );
    console.log('heyyyyy', res.data);
    return res.data;
  } catch (error) {
    console.error('Get customer info error:', error.response);
    throw error;
  }
};

// Update user info by ID
export const putSuperAdminInfoByParams = async (
  superAdminId,
  superAdminInfo,
) => {
  try {
    const res = await userRequest.put(
      `/api/superAdmin/profile/putSuperAdminInfoByParams/${superAdminId}`,
      superAdminInfo,
      {
        headers: { 'Content-Type': 'multipart/form-data' },
      },
    );
    return res.data;
  } catch (error) {
    console.error('Update user info error:', error.response);
    throw error;
  }
};

// Delete user info by ID
export const deleteSuperAdminInfoById = async (customerId) => {
  try {
    const res = await userRequest.delete(
      `/api/superAdmin/deleteSuperAdminInfoByParams/${customerId}`,
    );
    return res.data;
  } catch (error) {
    console.error('Delete user info error:', error.response);
    throw error;
  }
};
