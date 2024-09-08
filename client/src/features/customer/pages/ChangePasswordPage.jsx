import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { changePassword } from '../../../api/v1/customer/customerApi.js';
import { clearEmailState, setOtpVerify } from '../redux/customerOtpSlice.js';

const ChangePasswordPage = () => {
  const navigate = useNavigate();
  const email = useSelector((state) => state.customerOtpSlice.email);
  const dispatch = useDispatch();
  const [passwords, setPasswords] = useState({
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();
    if (passwords.password !== passwords.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    const response = await changePassword(email, {
      password: passwords.password,
    });

    if (response?.success) {
      dispatch(setOtpVerify(false));
      dispatch(clearEmailState());
      navigate('/loginredirectpage');
    } else {
      setError('Failed to change password');
    }
  }

  function handleCredentials(event) {
    const { name, value } = event.target;
    setPasswords({
      ...passwords,
      [name]: value,
    });
    setError(''); // Clear error when user starts typing
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <form className="flex flex-col items-center gap-3" onSubmit={handleSubmit}>
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleCredentials}
          value={passwords.password}
          className="rounded-lg border-none bg-gray-800 p-3 text-sm font-medium text-gray-300 caret-white
            shadow-sm outline outline-1 outline-gray-600 transition-all duration-300
            hover:shadow-md hover:outline-purple-600 focus:p-4 focus:outline-purple-600"
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm password"
          onChange={handleCredentials}
          value={passwords.confirmPassword}
          className="rounded-lg border-none bg-gray-800 p-3 text-sm font-medium text-gray-300 caret-white
            shadow-sm outline outline-1 outline-gray-600 transition-all duration-300
            hover:shadow-md hover:outline-purple-600 focus:p-4 focus:outline-purple-600"
        />
        {error && <div className="-mt-2 text-red-500">{error}</div>}
        <button
          type="submit"
          className="mt-4 rounded-lg bg-purple-600 p-3 text-sm font-semibold text-white transition-colors
            duration-200 hover:bg-purple-700">
          Change Password
        </button>
      </form>
    </div>
  );
};

export default ChangePasswordPage;
