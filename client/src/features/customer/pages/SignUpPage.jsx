import { useState } from 'react';
import { Link } from 'react-router-dom';
import { signUp, login } from '@/api/v1/customer/customerApi';
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

const SignUpPage = () => {
  const dispatch = useDispatch();
  const [previewImage, setPreviewImage] = useState(null);
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
    signUp(customerInfo).then((signup) => {
      if (signup.status === 'success') {
        return setTimeout(() => {
          login(customerInfo, dispatch).then((login) => {
            if (login.status === 'success') {
              return login.status;
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
    <div className="flex w-full min-h-screen items-center justify-center bg-neutral-300 dark:bg-neutral-950">
      <Card className="m-4 w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">
            Create an Account
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignUp} className="space-y-4">
            <div className="flex flex-col items-center space-y-2">
              <Label
                htmlFor="upload-photo"
                className={`mb-1 flex h-36 w-36 cursor-pointer items-center justify-center rounded-full
                  bg-neutral-800 text-center`}>
                {!previewImage ? (
                  <div className={'text-white'}>Upload</div>
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
                <p className="text-sm text-gray-500">Click to upload an image</p>
              )}
              <Input
                type="file"
                name="image"
                id="upload-photo"
                onChange={handleUserInfo}
                className="hidden"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                name="firstName"
                placeholder={'Enter your first name'}
                onChange={handleUserInfo}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                name="lastName"
                placeholder={'Enter your last name'}
                onChange={handleUserInfo}
                required
              />
            </div>
            <div className="space-y-2">
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
            {/*<div className="space-y-2">*/}
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
            {/*<div className="space-y-2">*/}
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
            <div className="space-y-2">
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
            <Button type="submit" className="w-full">
              Sign Up
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col items-center space-y-2">
          <p className="text-sm text-neutral-200">Already have an account?</p>
          <Link to={`/login`}>
            <Button variant="outline" className="w-full">
              Log In
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignUpPage;
