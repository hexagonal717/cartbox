import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { changePassword } from '@/api/v1/customer/auth/authApi.js';
import { clearEmailState, setOtpVerify } from '../redux/customerOtpSlice.js';
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
      navigate('/change-password-success-redirect');
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
    setError('');
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center dark:bg-neutral-950">
      <Card className="m-2 w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">
            Change your Password
          </CardTitle>
        </CardHeader>
        <form className="space-y-2" onSubmit={handleSubmit}>
          <CardContent>
            <div className="flex flex-col space-y-2">
              <Label htmlFor={'password'}>Password</Label>
              <Input
                type="password"
                name="password"
                placeholder="Enter your new password"
                onChange={handleCredentials}
                value={passwords.password}
              />
              <div className="space-y-2" />
              <Label htmlFor={'confirmPassword'}>Confirm password</Label>
              <Input
                type="password"
                name="confirmPassword"
                placeholder="Confirm your new password"
                onChange={handleCredentials}
                value={passwords.confirmPassword}
              />
              {error && <div className="-mt-2 text-red-500">{error}</div>}
            </div>
          </CardContent>

          <CardFooter className={'flex flex-col items-center space-y-2'}>
            <Button className="w-full" type="submit">
              Change Password
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default ChangePasswordPage;
