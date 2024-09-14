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
      <div className="user-select-none fixed inset-0 flex items-center justify-center">
        <form className="flex flex-col items-center gap-3" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleCredentials}
            className="rounded-md border-none bg-gray-900 px-3 py-2 text-sm font-medium text-gray-200
              caret-white shadow-md outline outline-gray-600 transition-all focus:px-4 focus:py-3
              focus:shadow-lg focus:outline-purple-600"
          />
          {otpState.error && (
            <div>
              <span className="text-red-500">Email doesn’t exist</span>
            </div>
          )}
          <button
            type="submit"
            className="my-4 rounded-md bg-purple-700 px-8 py-2 font-bold text-blue-900 transition-colors
              hover:bg-purple-600 hover:text-white">
            <span>Send OTP</span>
          </button>
        </form>
      </div>
    </>
  );
};

export default ForgotPasswordPage;
