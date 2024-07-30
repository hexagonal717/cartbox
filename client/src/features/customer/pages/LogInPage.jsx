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
    setCredentials({ ...credentials, [name]: value });
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
          'flex flex-row h-screen items-center justify-center select-none'
        }
      >
        <form
          className="flex flex-col items-center justify-center gap-3"
          onSubmit={handleSubmit}
        >
          <input
            className={
              'rounded-lg px-3 py-3 font-medium text-xs border-none outline outline-1 outline-gray-700 bg-neutral-800 text-gray-300 shadow-sm focus:outline-indigo-600 focus:shadow focus:shadow-indigo-800 hover:outline-indigo-600 hover:shadow hover:shadow-indigo-500 transition-all duration-200 ease-in-out'
            }
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleCredentials}
          />

          <input
            className={
              'rounded-lg px-3 py-3 font-medium text-xs border-none outline outline-1 outline-gray-700 bg-neutral-800 text-gray-300 shadow-sm focus:outline-indigo-600 focus:shadow focus:shadow-indigo-800 hover:outline-indigo-600 hover:shadow hover:shadow-indigo-500 transition-all duration-200 ease-in-out'
            }
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleCredentials}
          />

          <NavLink to={'/forgotpassword'} style={{ textDecoration: 'none' }}>
            <div className={'text-white font-bold mt-3 text-xs underline'}>
              Forgot password?
            </div>
          </NavLink>

          <button
            className={
              'px-16 py-2 m-4 bg-indigo-700 text-indigo-950 text-sm font-bold rounded-lg border-0 transition-all duration-300 ease-in-out hover:bg-indigo-700 hover:text-white cursor-pointer'
            }
            type="submit"
          >
            Log in
          </button>
          <div
            style={{ color: '#dadada', fontSize: '0.8rem', fontWeight: 700 }}
          >
            Want to create an account?
          </div>
          <Link to={'/signup'}>
            <button
              className={
                'py-2.5 px-20 m-4 bg-springgreen-500/10 text-springgreen-500 text-sm font-bold rounded-lg border-0 outline outline-1 outline-springgreen-500/35 transition-all duration-300 ease-in-out hover:bg-springgreen-500/15 hover:text-springgreen-500 cursor-pointer'
              }
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
