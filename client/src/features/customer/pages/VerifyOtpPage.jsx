import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { verifyOtp } from '@/api/v1/customer/customerApi.js';
import { setOtpVerify } from '../redux/customerOtpSlice.js';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui-custom/card.jsx';
import {
  Button
} from '@/components/ui-custom/button.jsx';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '@/components/ui-custom/input-otp.jsx';
import { Loader2 } from "lucide-react";

const VerifyOtpPage = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await verifyOtp({ otp });

      if (response?.success) {
        setOtpVerify(true);
        navigate('/change-password');
      } else {
        setError('Invalid OTP. Please try again.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }

  function handleOtpChange(value) {
    setOtp(value);
    setError('');
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center dark:bg-neutral-950">
      <Card className="m-2 w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">
            Verify your OTP
          </CardTitle>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="flex flex-col items-center space-y-2">
            <InputOTP
              value={otp}
              onChange={handleOtpChange}
              maxLength={4}
              disabled={isLoading}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
              </InputOTPGroup>
            </InputOTP>
            {error && (
              <p className="text-sm text-red-500">{error}</p>
            )}
          </CardContent>
          <CardFooter className="flex flex-col items-center space-y-2">
            <Button
              type="submit"
              className="w-full"
              disabled={otp.length !== 4 || isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Verifying...
                </>
              ) : (
                "Verify OTP Code"
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default VerifyOtpPage;