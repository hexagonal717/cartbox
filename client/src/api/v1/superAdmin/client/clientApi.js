import {  userRequest } from '../superAdminAxios.js';

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
