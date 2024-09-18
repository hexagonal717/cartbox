import { userRequest } from '../customerAxios.js';

// Get product info list
export const getProductList = async (search) => {
  try {
    const queryString = new URLSearchParams({
      search: search || '',
    }).toString();
    const res = await userRequest.get(
      `/api/customer/product/get-product-list?${queryString}`,
    );
    return res.data;
  } catch (error) {
    console.error('Get product list info error:', error.response);
    throw error;
  }
};

// Get product info list
export const getProduct = async (productId) => {
  try {
    const res = await userRequest.get(
      `/api/customer/product/get-product/${productId}`,
    );

    return res.data;
  } catch (error) {
    console.error('Get product detail error:', error.response);
    throw error;
  }
};

export const getProductListByCategory = async (category, subCategory) => {
  try {
    const queryString = new URLSearchParams({
      category: category || '',
      subCategory: subCategory || '',
    }).toString();
    const res = await userRequest.get(
      `/api/customer/product/get-product-list-by-category?${queryString}`,
    );
    return res.data;
  } catch (error) {
    console.error('Get product list by category info error:', error.response);
    throw error;
  }
};
