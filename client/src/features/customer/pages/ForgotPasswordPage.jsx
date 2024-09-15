import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { forgotPassword } from '@/api/v1/customer/customerApi.js';
import { setEmailState } from '../redux/customerOtpSlice.js';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui-custom/card.jsx';
import { Input } from '@/components/ui-custom/input.jsx';
import { Label } from '@/components/ui-custom/label.jsx';
import { Button } from '@/components/ui-custom/button.jsx';
import { Loader2 } from "lucide-react";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState({ email: '' });
  const [otpState, setOtpState] = useState({ error: false });
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);

    try {
      const response = await forgotPassword(email);
      dispatch(setEmailState(email));
      if (response) {
        navigate('/verify-otp');
      }
      setOtpState({ error: false });
    } catch (err) {
      setOtpState({ error: true });
    } finally {
      setIsLoading(false);
    }
  }

  function handleCredentials(event) {
    const { name, value } = event.target;
    setEmail({ ...email, [name]: value });
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center dark:bg-neutral-950">
      <Card className="m-2 w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">
            Forgot Password
          </CardTitle>
        </CardHeader>
        <form className="space-y-2" onSubmit={handleSubmit}>
          <CardContent>
            <div className="flex flex-col space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email"
                onChange={handleCredentials}
                disabled={isLoading}
              />
              {otpState.error && (
                <p className="text-sm text-red-500">Email doesn&apos;t exist</p>
              )}
            </div>
          </CardContent>

          <CardFooter className="flex flex-col items-center space-y-2">
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending OTP...
                </>
              ) : (
                "Send OTP"
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default ForgotPasswordPage;