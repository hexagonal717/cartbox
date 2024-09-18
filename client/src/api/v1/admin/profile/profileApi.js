import { userRequest } from '../adminAxios.js';

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

// Delete user info
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