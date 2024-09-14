import { setAccessToken } from '@/features/superAdmin/redux/superAdminAuthSlice.js';
import { publicRequest, userRequest } from './superAdminAxios.js';

// Sign up new user
export const signUp = async (superAdminInfo) => {
  try {
    const res = await publicRequest.post(
      '/api/super-admin/auth/signup',
      superAdminInfo,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
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
      '/api/super-admin/auth/login',
      superAdminInfo,
    );

    dispatch(setAccessToken(res.data));
    userRequest.defaults.headers.token = res.data.payload.tokenId;
    return res.data;
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
    return res.data;
  } catch (error) {
    console.error('Forgot password error:', error.response);
    throw error;
  }
};

export const verifyOtp = async (otp) => {
  try {
    const res = await publicRequest.post('/api/superAdmin/auth/verifyotp', otp);
    return res.data;
  } catch (error) {
    console.error('otp verification failed.', error.response);
  }
};

export const changePassword = async (email, password) => {
  try {
    const res = await publicRequest.post('/api/superAdmin/auth/changePassword', {
      email,
      password,
    });
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

// Get user info by ID
export const getUser = async (superAdminId) => {
  try {
    const res = await userRequest.get(
      `/api/super-admin/profile/get-user/${superAdminId}`,
    );
    return res.data;
  } catch (error) {
    console.error('Get superAdmin info error:', error.response);
    throw error;
  }
};

// Update user info by ID
export const putUser = async (superAdminId, superAdminInfo) => {
  try {
    const res = await userRequest.put(
      `/api/super-admin/profile/put-user/${superAdminId}`,
      superAdminInfo,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    return res.data;
  } catch (error) {
    console.error('Update user info error:', error.response);
    throw error;
  }
};

// Delete user info by ID
export const deleteUser = async (superAdminId) => {
  try {
    const res = await userRequest.delete(
      `/api/super-admin/profile/delete-user/${superAdminId}`,
    );
    return res.data;
  } catch (error) {
    console.error('Delete user info error:', error.response);
    throw error;
  }
};

export const getProductList = async () => {
  try {
    const res = await userRequest.get(`/api/super-admin/product/get-product-list/`);
    return res.data;
  } catch (error) {
    console.error('Get product list info error:', error.response);
    throw error;
  }
};

export const putProduct = async (productId, productInfo) => {
  try {
    const res = await userRequest.put(
      `/api/super-admin/product/put-product/${productId}`,
      productInfo,
    );
    return res.data;
  } catch (error) {
    console.error('Product updating error:', error.response);
    throw error;
  }
};

export const addProduct = async (superAdminId, productInfo) => {
  try {
    const res = await userRequest.post(
      `/api/super-admin/product/add-product/${superAdminId}`,
      productInfo,
    );
    return res.data;
  } catch (error) {
    console.error('Product adding error:', error.response);
    throw error;
  }
};

export const deleteProduct = async (productId) => {
  try {
    const res = await userRequest.delete(
      `/api/super-admin/product/delete-product/${productId}`,
    );
    return res.data;
  } catch (error) {
    console.error('Delete product info error:', error.response);
    throw error;
  }
};

export const addClient = async (adminId, adminInfo) => {
  try {
    const res = await userRequest.post(
      `/api/super-admin/client/add-client/${adminId}`,
      adminInfo,
    );
    return res.data;
  } catch (error) {
    console.error('Product adding error:', error.response);
    throw error;
  }
};

export const getClientList = async () => {
  try {
    const res = await userRequest.get(`/api/super-admin/client/get-client-list/`);
    return res.data;
  } catch (error) {
    console.error('Get admin list info error:', error.response);
    throw error;
  }
};

export const deleteClient = async (adminId) => {
  try {
    const res = await userRequest.delete(
      `/api/super-admin/client/delete-client/${adminId}`,
    );
    return res.data;
  } catch (error) {
    console.error('Delete admin info error:', error.response);
    throw error;
  }
};

export const putClient = async (adminId, adminInfo) => {
  try {
    const res = await userRequest.put(
      `/api/super-admin/client/put-client/${adminId}`,
      adminInfo,
    );
    return res.data;
  } catch (error) {
    console.error('Admin updating error:', error.response);
    throw error;
  }
};
