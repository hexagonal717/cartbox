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
          className="p-3 rounded-lg border-none outline outline-1 outline-gray-600 bg-gray-800 text-gray-300 shadow-sm text-sm font-medium caret-white focus:outline-purple-600 focus:p-4 transition-all duration-300 hover:outline-purple-600 hover:shadow-md"
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm password"
          onChange={handleCredentials}
          value={passwords.confirmPassword}
          className="p-3 rounded-lg border-none outline outline-1 outline-gray-600 bg-gray-800 text-gray-300 shadow-sm text-sm font-medium caret-white focus:outline-purple-600 focus:p-4 transition-all duration-300 hover:outline-purple-600 hover:shadow-md"
        />
        {error && <div className="text-red-500 -mt-2">{error}</div>}
        <button
          type="submit"
          className="p-3 mt-4 bg-purple-600 text-white rounded-lg font-semibold text-sm transition-colors duration-200 hover:bg-purple-700"
        >
          Change Password
        </button>
      </form>
    </div>
  );
};

export default ChangePasswordPage;
