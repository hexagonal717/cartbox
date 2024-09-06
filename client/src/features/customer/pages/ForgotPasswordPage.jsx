import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { forgotPassword } from '../../../api/v1/customer/customerApi.js';
import { setEmailState } from '../redux/customerOtpSlice.js';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState({
    email: '',
  });
  const [otpState, setOtpState] = useState({
    error: false,
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const response = await forgotPassword(email);
      dispatch(setEmailState(email));
      if (response) {
        navigate('/verifycode');
      }
      setOtpState({
        error: false,
      });
    } catch (err) {
      setOtpState({
        error: true,
      });
    }
  }

  function handleCredentials(event) {
    const { name, value } = event.target;
    setEmail({
      ...email,
      [name]: value,
    });
    console.log(email);
  }

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center user-select-none">
        <form
          className="flex flex-col items-center gap-3"
          onSubmit={handleSubmit}
        >
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleCredentials}
            className="px-3 py-2 rounded-md border-none outline outline-gray-600 bg-gray-900 text-gray-200 shadow-md text-sm font-medium caret-white focus:outline-purple-600 focus:py-3 focus:px-4 focus:shadow-lg transition-all"
          />
          {otpState.error && (
            <div>
              <span className="text-red-500">Email doesn’t exist</span>
            </div>
          )}
          <button
            type="submit"
            className="px-8 py-2 my-4 bg-purple-700 text-blue-900 rounded-md font-bold hover:bg-purple-600 hover:text-white transition-colors"
          >
            <span>Send OTP</span>
          </button>
        </form>
      </div>
    </>
  );
};

export default ForgotPasswordPage;
