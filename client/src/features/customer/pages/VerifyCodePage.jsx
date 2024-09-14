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
          className="rounded-lg border-none bg-gray-800 p-3 text-sm font-medium text-gray-300 caret-white
            shadow-sm outline outline-1 outline-gray-600 transition-all duration-300
            hover:shadow-md hover:outline-purple-600 focus:p-4 focus:outline-purple-600"
        />

        <button
          type="submit"
          className="mt-4 rounded-lg bg-purple-600 p-3 text-sm font-semibold text-white transition-colors
            duration-200 hover:bg-purple-700">
          Verify Code
        </button>
      </form>
    </div>
  );
};

export default VerifyCodePage;
