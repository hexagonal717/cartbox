import { userRequest } from '../customerAxios.js';

// Fetch customer cart
export const getCart = async (customerId) => {
  try {
    const res = await userRequest.get(`/api/customer/cart/get-cart/${customerId}`);
    return res.data;
  } catch (error) {
    console.error('Fetching cart data failed:', error.response);
    throw error;
  }
};

// Add item to cart
export const addCartItem = async (productId, customerId, quantity) => {
  try {
    const res = await userRequest.post(`/api/customer/cart/add-cart-item`, {
      productId,
      customerId,
      quantity,
    });
    return res.data;
  } catch (error) {
    console.error('Get product list info error:', error.response);
    throw error;
  }
};

// Remove item from cart
export const removeCartItem = async (productId, customerId) => {
  try {
    const res = await userRequest.post(`/api/customer/cart/remove-cart-item`, {
      productId,
      customerId,
    });
    return res.data;
  } catch (error) {
    console.error('Get product list info error:', error.response);
    throw error;
  }
};

export const increaseCartItemQuantity = async (productId, customerId) => {
  try {
    const res = await userRequest.patch(
      `/api/customer/cart/increase-cart-item-quantity`,
      {
        productId,
        customerId,
      },
    );
    return res.data;
  } catch (error) {
    console.error('cart item quantity error:', error.response);
    throw error;
  }
};

export const decreaseCartItemQuantity = async (productId, customerId) => {
  try {
    const res = await userRequest.patch(
      `/api/customer/cart/decrease-cart-item-quantity`,
      {
        productId,
        customerId,
      },
    );
    return res.data;
  } catch (error) {
    console.error('Get product list info error:', error.response);
    throw error;
  }
};


