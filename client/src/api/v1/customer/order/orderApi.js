import { userRequest } from '../customerAxios.js';

export const getOrder = async (customerId) => {
  try {
    const res = await userRequest.get(`/api/customer/order/get-order/${customerId}`);
    return res.data;
  } catch (error) {
    console.error('order info error:', error.response);
    throw error;
  }
};

export const addOrder = async (customerId, items) => {
  try {
    const res = await userRequest.post(
      `/api/customer/order/add-order/${customerId}`,
      { items },
    );
    return res.data;
  } catch (error) {
    console.error('order info error:', error.response);
    throw error;
  }
};
