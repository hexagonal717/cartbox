import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { signUp, login } from '@/api/v1/customer/auth/authApi.js';
import { useDispatch } from 'react-redux';
import { Button } from '@/components/ui-custom/button';
import { Input } from '@/components/ui-custom/input';
import { Label } from '@/components/ui-custom/label';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui-custom/card';
import {
  Loader2,
  User,
} from 'lucide-react';

const SignUpPage = () => {
  const dispatch = useDispatch();
  const [previewImage, setPreviewImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    age: '',
    password: '',
    image: '',
  });

  function handleUserInfo(event) {
    let { name, value } = event.target;
    if (event.target.type === 'file') {
      value = event.target.files[0];
      setPreviewImage(URL.createObjectURL(event.target.files[0]));
    }
    setCustomerInfo({
      ...customerInfo,
      [name]: value,
    });
  }

  function handleSignUp(event) {
    event.preventDefault();
    setIsLoading(true);
    signUp(customerInfo).then((signup) => {
      if (signup?.status === 'success') {
        return setTimeout(() => {
          login(customerInfo, dispatch).then((login) => {
            if (login?.status === 'success') {
              setIsLoading(false);
              return login?.status;
            }
          });
        }, 2000);
      }
    });
  }

  function removeImage() {
    setPreviewImage(false);
    setCustomerInfo({
      ...customerInfo,
      image: '',
    });
  }

  return (
    <div
      className="flex min-h-screen w-full items-center justify-center bg-white dark:bg-neutral-950
        sm:bg-neutral-50">
      <Card className="m-4 w-full max-w-md border-0 shadow-none sm:border sm:shadow-sm">
        <CardHeader>
          <CardTitle className="text-center text-xl font-bold">
            Create an Account
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignUp} className="space-y-3">
            <div className="flex flex-col items-center space-y-1">
              <Label
                htmlFor="upload-photo"
                className={`mb-1 flex h-36 w-36 cursor-pointer items-center justify-center rounded-full
                  bg-neutral-100 text-center dark:bg-neutral-900`}>
                {!previewImage ? (
                  <div className={'text-neutral-950 dark:text-white'}>
                    <User />
                  </div>
                ) : (
                  <img
                    src={previewImage}
                    alt=""
                    className={'h-full w-full rounded-full object-cover'}
                  />
                )}
              </Label>
              {previewImage ? (
                <Button variant="link" onClick={removeImage} className="text-xs">
                  Remove image
                </Button>
              ) : (
                <p className="text-sm text-neutral-500">Click to upload an image</p>
              )}
              <Input
                type="file"
                name="image"
                id="upload-photo"
                onChange={handleUserInfo}
                className="hidden"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                name="firstName"
                placeholder={'Enter your first name'}
                onChange={handleUserInfo}
                required
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                name="lastName"
                placeholder={'Enter your last name'}
                onChange={handleUserInfo}
                required
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder={'Enter your email address'}
                onChange={handleUserInfo}
                required
              />
            </div>
            {/*<div className="space-y-1">*/}
            {/*  <Label htmlFor="phone">Phone</Label>*/}
            {/*  <Input*/}
            {/*    id="phone"*/}
            {/*    name="phone"*/}
            {/*    type="tel"*/}
            {/*    placeholder={'Enter your phone number'}*/}
            {/*    onChange={handleUserInfo}*/}
            {/*    required*/}
            {/*  />*/}
            {/*</div>*/}
            {/*<div className="space-y-1">*/}
            {/*  <Label htmlFor="age">Age</Label>*/}
            {/*  <Input*/}
            {/*    id="age"*/}
            {/*    name="age"*/}
            {/*    type="number"*/}
            {/*    placeholder={'Enter your number'}*/}
            {/*    onChange={handleUserInfo}*/}
            {/*    required*/}
            {/*  />*/}
            {/*</div>*/}
            <div className="space-y-1">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder={'Enter your password'}
                onChange={handleUserInfo}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing up...
                </>
              ) : (
                'Sign Up'
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col items-center space-y-3">
          <p className="text-sm text-neutral-800 dark:text-neutral-200">
            Already have an account?
          </p>
          <Button variant="outline" className="w-full">
            <NavLink to={`/login`}> Log In</NavLink>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignUpPage;
