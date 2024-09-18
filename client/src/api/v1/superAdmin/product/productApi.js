import { userRequest } from '../superAdminAxios.js';

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

