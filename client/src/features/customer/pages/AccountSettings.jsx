import { useDispatch, useSelector } from 'react-redux';
import { deleteUser } from '../../../api/customer/customerApi.js';
import { clearAccessToken } from '../redux/customerAuthSlice.js';
import SidePanel from '../../../components/common/SidePanel.jsx';

const AccountSettings = () => {
  const token = useSelector((state) => state.customerAuthSlice.accessToken);
  const dispatch = useDispatch();

  function handleDeleteAccount() {
    deleteUser(token.customerId).then((response) => {
      console.log('delete response *******************', response);
      response.type === 'success' && dispatch(clearAccessToken());
    });
  }

  return (
    <div className="flex h-full">
      <SidePanel />
      <div className="w-40" />
      <main className="flex flex-1 flex-col items-center justify-center p-4 text-white">
        <h1 className="mb-4 text-2xl font-semibold">Account Settings</h1>
        <button
          onClick={handleDeleteAccount}
          className="mt-4 rounded-md border border-red-700 bg-red-600 px-8 py-2 text-sm font-bold
            text-white outline-none transition-colors duration-150 hover:bg-red-700">
          Delete account
        </button>
      </main>
    </div>
  );
};

export default AccountSettings;
