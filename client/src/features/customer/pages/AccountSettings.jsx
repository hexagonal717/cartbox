import { useDispatch, useSelector } from 'react-redux';
import { deleteUser } from '@/api/v1/customer/profile/profileApi.js';
import { clearAccessToken } from '../redux/customerAuthSlice.js';

const AccountSettings = () => {
  const token = useSelector((state) => state.customerAuthSlice.accessToken);
  const dispatch = useDispatch();

  function handleDeleteAccount() {
    deleteUser(token.customerId).then((response) => {
      response.status === 'success' && dispatch(clearAccessToken());
    });
  }

  return (
    <main
      className={'flex h-full w-screen items-center justify-center'}>
      <div
        className={'flex flex-col'}>
        <h1
          className="mb-4 text-center text-2xl font-semibold dark:text-white">
          Account
          Settings
        </h1>
        <button
          onClick={handleDeleteAccount}
          className="mt-4 rounded-md border border-red-700 bg-red-600 px-8 py-2 text-sm font-bold
            text-white outline-none transition-colors duration-150 hover:bg-red-700">
          Delete
          account
        </button>
      </div>
    </main>
  );
};

export default AccountSettings;
