import { useState } from 'react';
import { signUp } from '../../../api/customer/customerApi.js';
import { Link } from 'react-router-dom';

const SignUpPage = () => {
  const [previewImage, setPreviewImage] = useState(null);
  const [customerInfo, setCustomerInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: Number,
    age: Number,
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
    console.log(customerInfo);
    signUp(customerInfo).then((data) => {
      console.log('User created successfully.', data.success);
    });
  }

  function removeImage() {
    setPreviewImage(null);
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <form
        action="/"
        onSubmit={handleSignUp}
        method="post"
        encType="multipart/form-data"
        className="flex flex-col items-center gap-4"
      >
        <label
          htmlFor="upload-photo"
          className="mb-1 flex h-48 w-48 cursor-pointer items-center justify-center rounded-full border-2
            border-neutral-500 text-center"
        >
          {!previewImage ? (
            <div className="text-xs font-light text-white">Upload an image</div>
          ) : (
            <img
              src={previewImage}
              alt=""
              className="h-full w-full rounded-full object-cover"
            />
          )}
        </label>

        {previewImage ? (
          <div
            className={'text-xs underline hover:cursor-pointer'}
            onClick={removeImage}
          >
            Remove image
          </div>
        ) : null}

        <input
          type="file"
          name="image"
          id="upload-photo"
          onChange={handleUserInfo}
          className="hidden"
        />

        <input
          type="text"
          placeholder="First Name"
          name="firstName"
          onChange={handleUserInfo}
          className="mt-4 rounded-lg border-none bg-neutral-800 px-3 py-3 text-xs font-medium
            text-gray-300 shadow-sm outline outline-1 outline-neutral-700 transition-all
            duration-200 ease-in-out hover:shadow hover:shadow-green-500 hover:outline-green-500
            focus:shadow focus:shadow-green-500 focus:outline-green-500 focus:transition"
        />
        <input
          type="text"
          placeholder="Last Name"
          name="lastName"
          onChange={handleUserInfo}
          className="rounded-lg border-none bg-neutral-800 px-3 py-3 text-xs font-medium text-gray-300
            shadow-sm outline outline-1 outline-neutral-700 transition-all duration-200
            ease-in-out hover:shadow hover:shadow-green-500 hover:outline-green-500 focus:shadow
            focus:shadow-green-500 focus:outline-green-500 focus:transition"
        />
        <input
          aria-autocomplete="none"
          type="email"
          placeholder="Email"
          name="email"
          onChange={handleUserInfo}
          className="rounded-lg border-none bg-neutral-800 px-3 py-3 text-xs font-medium text-gray-300
            shadow-sm outline outline-1 outline-neutral-700 transition-all duration-200
            ease-in-out hover:shadow hover:shadow-green-500 hover:outline-green-500 focus:shadow
            focus:shadow-green-500 focus:outline-green-500 focus:transition"
        />
        <input
          type="tel"
          placeholder="Phone"
          name="phone"
          onChange={handleUserInfo}
          className="rounded-lg border-none bg-neutral-800 px-3 py-3 text-xs font-medium text-gray-300
            shadow-sm outline outline-1 outline-neutral-700 transition-all duration-200
            ease-in-out hover:shadow hover:shadow-green-500 hover:outline-green-500 focus:shadow
            focus:shadow-green-500 focus:outline-green-500 focus:transition"
        />
        <input
          type="number"
          placeholder="Age"
          name="age"
          onChange={handleUserInfo}
          className="rounded-lg border-none bg-neutral-800 px-3 py-3 text-xs font-medium text-gray-300
            shadow-sm outline outline-1 outline-neutral-700 transition-all duration-200
            ease-in-out hover:shadow hover:shadow-green-500 hover:outline-green-500 focus:shadow
            focus:shadow-green-500 focus:outline-green-500 focus:transition"
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          onChange={handleUserInfo}
          className="rounded-lg border-none bg-neutral-800 px-3 py-3 text-xs font-medium text-gray-300
            shadow-sm outline outline-1 outline-neutral-700 transition-all duration-200
            ease-in-out hover:shadow hover:shadow-green-500 hover:outline-green-500 focus:shadow
            focus:shadow-green-500 focus:outline-green-500 focus:transition"
        />

        <button
          type="submit"
          className={`m-4 cursor-pointer rounded-lg border-0 bg-springgreen-700 px-16 py-2 text-sm
            font-bold text-springgreen-950 transition-all duration-300 ease-in-out
            hover:bg-springgreen-700 hover:text-white`}
        >
          Sign Up
        </button>
        <div className="text-xs font-bold text-neutral-200">
          Already have an account?
        </div>
        <Link to="/">
          <button
            className={`m-2 cursor-pointer rounded-lg border-0 bg-indigo-500/10 px-20 py-2.5 text-sm
              font-bold text-indigo-500 outline outline-1 outline-indigo-500/35 transition-all
              duration-300 ease-in-out hover:bg-indigo-500/15 hover:text-indigo-500`}
          >
            Log In
          </button>
        </Link>
      </form>
    </div>
  );
};

export default SignUpPage;
