import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { login } from '../../../api/v1/superAdmin/superAdminApi.js';

const SuperAdminLogInPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = async (event) => {
    console.log(event, 'SuperAdmin login');

    event.preventDefault();

    try {
      const res = await login(credentials, dispatch); // Await the login function

      if (res.status === 'success') {
        navigate('/');
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  function handleCredentials(event) {
    const { name, value } = event.target;
    setCredentials({
      ...credentials,
      [name]: value,
    });
  }

  return (
    <>
      <div
        className={'flex h-screen select-none flex-row items-center justify-center'}>
        <form
          className={'flex flex-col items-center justify-center gap-3'}
          onSubmit={handleSubmit}>
          <div className={'mb-20 text-3xl font-bold'}>Manage your clients</div>

          <input
            className={`rounded-lg border-none bg-neutral-800 px-3 py-3 text-xs font-medium text-neutral-300
              shadow-sm outline outline-1 outline-neutral-700 transition-all duration-200
              ease-in-out hover:shadow hover:shadow-orange-500 hover:outline-orange-600
              focus:shadow focus:shadow-orange-800 focus:outline-orange-600`}
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleCredentials}
          />

          <input
            className={`rounded-lg border-none bg-neutral-800 px-3 py-3 text-xs font-medium text-neutral-300
              shadow-sm outline outline-1 outline-neutral-700 transition-all duration-200
              ease-in-out hover:shadow hover:shadow-orange-500 hover:outline-orange-600
              focus:shadow focus:shadow-orange-800 focus:outline-orange-600`}
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleCredentials}
          />

          <NavLink
            to={'/forgotpassword'}
            style={{
              textDecoration: 'none',
            }}>
            <div
              className={
                'mt-2 flex flex-row text-xs font-bold text-white hover:underline'
              }>
              Forgot password?
            </div>
          </NavLink>

          <button
            className={`m-4 cursor-pointer rounded-lg border-0 bg-orange-600 px-16 py-2 text-sm font-bold
              text-orange-950 transition-all duration-300 ease-in-out hover:bg-orange-700
              hover:text-white`}
            type="submit">
            Log in
          </button>

          <Link to={'/login'}>
            <div className={'text-xs'}>
              Are you a{' '}
              <span
                className={
                  'text-sm font-bold text-indigo-400 hover:text-indigo-500'
                }>
                customer
              </span>
              ?
            </div>
          </Link>
        </form>
      </div>
    </>
  );
};

export default SuperAdminLogInPage;
