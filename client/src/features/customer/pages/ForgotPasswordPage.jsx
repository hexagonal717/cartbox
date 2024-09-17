import { useState } from 'react';
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
import { Loader2 } from 'lucide-react';

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
    <div className="flex min-h-screen w-full items-center justify-center bg-white dark:bg-neutral-950">
      <Card className="m-2 w-full max-w-md border-0 shadow-none sm:border sm:shadow-sm">
        <CardHeader>
          <CardTitle className="text-center text-xl font-bold">
            Reset your password
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-3" onSubmit={handleSubmit}>
            <div className="flex flex-col space-y-2">
              <Label className={'pl-0.5'} htmlFor="email">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email address"
                onChange={handleCredentials}
                disabled={isLoading}
              />
              {otpState.error && (
                <p className="text-sm text-red-500">Email doesn&apos;t exist</p>
              )}
            </div>
            <CardFooter className="w-full p-0">
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending OTP...
                  </>
                ) : (
                  'Send OTP'
                )}
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ForgotPasswordPage;
