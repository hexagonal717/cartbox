import { userRequest } from '../superAdminAxios.js';

// Get user info by ID
export const getUser = async (superAdminId) => {
  try {
    const res = await userRequest.get(
      `/api/super-admin/profile/get-user/${superAdminId}`,
    );
    return res.data;
  } catch (error) {
    console.error('Get superAdmin info error:', error.response);
    throw error;
  }
};

// Update user info by ID
export const putUser = async (superAdminId, superAdminInfo) => {
  try {
    const res = await userRequest.put(
      `/api/super-admin/profile/put-user/${superAdminId}`,
      superAdminInfo,
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
export const deleteUser = async (superAdminId) => {
  try {
    const res = await userRequest.delete(
      `/api/super-admin/profile/delete-user/${superAdminId}`,
    );
    return res.data;
  } catch (error) {
    console.error('Delete user info error:', error.response);
    throw error;
  }
};
