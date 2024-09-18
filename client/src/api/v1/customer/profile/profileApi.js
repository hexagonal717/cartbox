import {  userRequest } from '../customerAxios.js';

// Get user info
export const getUser = async (customerId) => {
  try {
    const res = await userRequest.get(
      `/api/customer/profile/get-user/${customerId}`,
    );

    return res.data;
  } catch (error) {
    console.error('Get customer info error:', error.response);
    throw error;
  }
};

// Update user info
export const putUser = async (customerId, customerInfo) => {
  try {
    const res = await userRequest.put(
      `/api/customer/profile/put-user/${customerId}`,
      customerInfo,
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
export const deleteUser = async (customerId) => {
  try {
    const res = await userRequest.delete(`/api/customer/delete-user/${customerId}`);
    return res.data;
  } catch (error) {
    console.error('Delete user info error:', error.response);
    throw error;
  }
};

// Get user address info
export const getAddress = async (customerId) => {
  try {
    const res = await userRequest.get(
      `/api/customer/profile/get-address/${customerId}`,
    );
    return res.data;
  } catch (error) {
    console.error('get address info error:', error.response);
    throw error;
  }
};

// Update user address info
export const putAddress = async (customerId, addressId, updatedAddress) => {
  try {
    const res = await userRequest.put(
      `/api/customer/profile/put-address/${customerId}/${addressId}`,
      updatedAddress,
    );
    return res.data;
  } catch (error) {
    console.error('put address info error:', error.response);
    throw error;
  }
};

// Add user address info
export const addAddress = async (customerId, addressInfo) => {
  try {
    const res = await userRequest.post(
      `/api/customer/profile/add-address/${customerId}`,
      addressInfo,
    );
    return res.data;
  } catch (error) {
    console.error('Add address info error:', error.response);
    throw error;
  }
};

// Delete user address info
export const deleteAddress = async (customerId, addressId) => {
  try {
    const res = await userRequest.delete(
      `/api/customer/profile/delete-address/${customerId}/${addressId}`,
    );
    return res.data;
  } catch (error) {
    console.error('Add address info error:', error.response);
    throw error;
  }
};
