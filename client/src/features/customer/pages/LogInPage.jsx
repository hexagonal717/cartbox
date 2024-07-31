import { useState } from 'react';
import { login } from '../../../api/customer/customerApi.js';
import { useDispatch } from 'react-redux';
import { Link, NavLink, useNavigate } from 'react-router-dom';

const LogInPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await login(credentials, dispatch); // Await the login function
      navigate('/'); // Navigate only after login is successful
    } catch (error) {
      console.error('Login failed:', error);
      // Handle the error (e.g., display an error message)
    }
  };

  function handleCredentials(event) {
    const { name, value } = event.target;
    setCredentials({
      ...credentials,
      [name]: value,
    });
    console.log(credentials);
  }

  return (
    <>
      {/*<Header>*/}
      {/*  <Link to="/adminlogin">*/}
      {/*    <AdminButton>For Admins</AdminButton>*/}
      {/*  </Link>*/}
      {/*</Header>*/}

      <div
        className={
          'flex h-screen select-none flex-row items-center justify-center'
        }
      >
        <form
          className="flex flex-col items-center justify-center gap-3"
          onSubmit={handleSubmit}
        >
          <input
            className={`rounded-lg border-none bg-neutral-800 px-3 py-3 text-xs font-medium
              text-gray-300 shadow-sm outline outline-1 outline-neutral-700 transition-all
              duration-200 ease-in-out hover:shadow hover:shadow-indigo-500
              hover:outline-indigo-600 focus:shadow focus:shadow-indigo-800
              focus:outline-indigo-600`}
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleCredentials}
          />

          <input
            className={`rounded-lg border-none bg-neutral-800 px-3 py-3 text-xs font-medium
              text-gray-300 shadow-sm outline outline-1 outline-neutral-700 transition-all
              duration-200 ease-in-out hover:shadow hover:shadow-indigo-500
              hover:outline-indigo-600 focus:shadow focus:shadow-indigo-800
              focus:outline-indigo-600`}
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleCredentials}
          />

          <NavLink
            to={'/forgotpassword'}
            style={{
              textDecoration: 'none',
            }}
          >
            <div
              className={'mt-3 text-xs font-bold text-white hover:underline'}
            >
              Forgot password?
            </div>
          </NavLink>

          <button
            className={`m-4 cursor-pointer rounded-lg border-0 bg-indigo-700 px-16 py-2 text-sm
              font-bold text-indigo-950 transition-all duration-300 ease-in-out
              hover:bg-indigo-700 hover:text-white`}
            type="submit"
          >
            Log in
          </button>
          <div
            style={{
              color: '#dadada',
              fontSize: '0.8rem',
              fontWeight: 700,
            }}
          >
            Want to create an account?
          </div>
          <Link to={'/signup'}>
            <button
              className={`m-4 cursor-pointer rounded-lg border-0 bg-springgreen-500/10 px-20 py-2.5
                text-sm font-bold text-springgreen-500 outline outline-1
                outline-springgreen-500/35 transition-all duration-300 ease-in-out
                hover:bg-springgreen-500/15 hover:text-springgreen-500`}
            >
              Sign up
            </button>
          </Link>
        </form>
      </div>
    </>
  );
};

export default LogInPage;
