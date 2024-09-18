import {  userRequest } from '../adminAxios.js';

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
