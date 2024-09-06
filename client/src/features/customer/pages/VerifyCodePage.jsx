import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { verifyOtp } from '../../../api/v1/customer/customerApi.js';
import { setOtpVerify } from '../redux/customerOtpSlice.js';

const VerifyCodePage = () => {
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    otp: '',
  });

  async function handleSubmit(event) {
    event.preventDefault();
    const response = await verifyOtp(credentials);

    if (response?.success) {
      setOtpVerify(true);
      navigate('/changepassword');
    }
  }

  function handleCredentials(event) {
    const { name, value } = event.target;
    setCredentials({
      ...credentials,
      [name]: value,
    });
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <form className="flex flex-col items-center gap-3" onSubmit={handleSubmit}>
        <input
          type="number"
          name="otp"
          placeholder="OTP Code"
          onChange={handleCredentials}
          className="p-3 rounded-lg border-none outline outline-1 outline-gray-600 bg-gray-800 text-gray-300 shadow-sm text-sm font-medium caret-white focus:outline-purple-600 focus:p-4 transition-all duration-300 hover:outline-purple-600 hover:shadow-md"
        />

        <button
          type="submit"
          className="p-3 mt-4 bg-purple-600 text-white rounded-lg font-semibold text-sm transition-colors duration-200 hover:bg-purple-700"
        >
          Verify Code
        </button>
      </form>
    </div>
  );
};

export default VerifyCodePage;
