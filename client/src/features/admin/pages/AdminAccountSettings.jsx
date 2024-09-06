import { useDispatch, useSelector } from 'react-redux';
import { deleteUser } from '../../../api/v1/admin/adminApi.js';
import { clearAccessToken } from '../redux/adminAuthSlice.js';

const AdminAccountSettings = () => {
  const token = useSelector((state) => state.adminAuthSlice.accessToken);
  const dispatch = useDispatch();

  function handleDeleteAccount() {
    deleteUser(token.adminId).then((response) => {
      response.status === 'success' && dispatch(clearAccessToken());
    });
  }

  return (
    <div className="flex flex-col items-center justify-center text-white">
      <h1 className="mb-4 text-center text-2xl font-semibold">Account Settings</h1>
      <button
        onClick={handleDeleteAccount}
        className="mt-4 rounded-md border border-red-700 bg-red-600 px-8 py-2 text-sm font-bold
          text-white outline-none transition-colors duration-150 hover:bg-red-700">
        Delete account
      </button>
    </div>
  );
};

export default AdminAccountSettings;
