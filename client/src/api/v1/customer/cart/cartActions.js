import { createAsyncThunk } from '@reduxjs/toolkit';
import { userRequest } from '@/api/v1/customer/customerAxios.js';

// Add item to cart
export const addCartItem = createAsyncThunk(
  'cart/addCartItem',
  async ({ productId, customerId, quantity }, { rejectWithValue }) => {
    try {
      const res = await userRequest.post(`/api/customer/cart/add-cart-item`, {
        productId,
        customerId,
        quantity,
      });
      return res.data;
    } catch (error) {
      console.error('Add cart item error:', error.response);
      return rejectWithValue(error.response.data);
    }
  },
);

// Remove item from cart
export const removeCartItem = createAsyncThunk(
  'cart/removeCartItem',
  async ({ productId, customerId }, { rejectWithValue }) => {
    try {
      const res = await userRequest.post(`/api/customer/cart/remove-cart-item`, {
        productId,
        customerId,
      });
      return res.data;
    } catch (error) {
      console.error('Remove cart item error:', error.response);
      return rejectWithValue(error.response.data);
    }
  },
);

// Increase item quantity
export const increaseCartItemQuantity = createAsyncThunk(
  'cart/increaseCartItemQuantity',
  async ({ productId, customerId }, { rejectWithValue }) => {
    try {
      const res = await userRequest.patch(
        `/api/customer/cart/increase-cart-item-quantity`,
        { productId, customerId },
      );
      return res.data;
    } catch (error) {
      console.error('Increase cart item quantity error:', error.response);
      return rejectWithValue(error.response.data);
    }
  },
);

// Decrease item quantity
export const decreaseCartItemQuantity = createAsyncThunk(
  'cart/decreaseCartItemQuantity',
  async ({ productId, customerId }, { rejectWithValue }) => {
    try {
      const res = await userRequest.patch(
        `/api/customer/cart/decrease-cart-item-quantity`,
        { productId, customerId },
      );
      return res.data;
    } catch (error) {
      console.error('Decrease cart item quantity error:', error.response);
      return rejectWithValue(error.response.data);
    }
  },
);

// Fetch customer cart
export const getCart = createAsyncThunk(
  'cart/getCart',
  async ({ customerId }, { rejectWithValue }) => {
    try {
      const res = await userRequest.get(`/api/customer/cart/get-cart/${customerId}`);
      return res.data;
    } catch (error) {
      console.error('Fetching cart data failed:', error.response);
      return rejectWithValue(error.response.data);
    }
  },
);


// clear cart
export const clearCart = createAsyncThunk(
  'cart/clearCart',
  async ({ customerId }, { rejectWithValue }) => {
    try {
      const res = await userRequest.delete(`/api/customer/cart/clear-cart/${customerId}`);
      return res.data;
    } catch (error) {
      console.error('Fetching cart data failed:', error.response);
      return rejectWithValue(error.response.data);
    }
  },
);
