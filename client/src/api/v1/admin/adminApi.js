import { setAccessToken } from '@/features/admin/redux/adminAuthSlice.js';
import { publicRequest, userRequest } from './adminAxios.js';

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

// Get user info
export const getUser = async (adminId) => {
  try {
    const res = await userRequest.get(`/api/admin/profile/get-user/${adminId}`);

    return res.data;
  } catch (error) {
    console.error('Get admin info error:', error.response);
    throw error;
  }
};

// Update user info
export const putUser = async (adminId, adminInfo) => {
  try {
    const res = await userRequest.put(
      `/api/admin/profile/put-user/${adminId}`,
      adminInfo,
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
export const deleteUser = async (adminId) => {
  try {
    const res = await userRequest.delete(
      `/api/admin/profile/delete-user/${adminId}`,
    );
    return res.data;
  } catch (error) {
    console.error('Delete user info error:', error.response);
    throw error;
  }
};

export const getProductList = async (adminId) => {
  try {
    const res = await userRequest.get(
      `/api/admin/product/get-product-list/${adminId}`,
    );
    return res.data;
  } catch (error) {
    console.error('Get product list info error:', error.response);
    throw error;
  }
};

export const putProduct = async (productId, productInfo) => {
  try {
    const res = await userRequest.put(
      `/api/admin/product/put-product/${productId}`,
      productInfo,
    );
    return res.data;
  } catch (error) {
    console.error('Product updating error:', error.response);
    throw error;
  }
};

export const addProduct = async (adminId, productInfo) => {
  try {
    const res = await userRequest.post(
      `/api/admin/product/add-product/${adminId}`,
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
      `/api/admin/product/delete-product/${productId}`,
    );
    return res.data;
  } catch (error) {
    console.error('Delete product info error:', error.response);
    throw error;
  }
};
