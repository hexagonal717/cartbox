import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { login } from '../../../api/v1/admin/adminApi.js';

const AdminLogInPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = async (event) => {
    console.log(event, 'EVENTTTTTTTT');

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
          <div className={'mb-20 text-3xl font-bold'}>Access your dashboard</div>

          <input
            className={`rounded-lg border-none bg-neutral-800 px-3 py-3 text-xs font-medium text-gray-300
              shadow-sm outline outline-1 outline-neutral-700 transition-all duration-200
              ease-in-out hover:shadow hover:shadow-indigo-500 hover:outline-yellow-600
              focus:shadow focus:shadow-yellow-800 focus:outline-yellow-600`}
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleCredentials}
          />

          <input
            className={`rounded-lg border-none bg-neutral-800 px-3 py-3 text-xs font-medium text-gray-300
              shadow-sm outline outline-1 outline-neutral-700 transition-all duration-200
              ease-in-out hover:shadow hover:shadow-indigo-500 hover:outline-yellow-600
              focus:shadow focus:shadow-yellow-800 focus:outline-yellow-600`}
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
            className={`m-4 cursor-pointer rounded-lg border-0 bg-yellow-600 px-16 py-2 text-sm font-bold
              text-yellow-950 transition-all duration-300 ease-in-out hover:bg-yellow-700
              hover:text-white`}
            type="submit">
            Log in
          </button>
          <div
            style={{
              color: '#dadada',
              fontSize: '0.8rem',
              fontWeight: 700,
            }}>
            Want to create an account?
          </div>
          <Link to={'/admin-signup'}>
            <button
              className={`m-4 cursor-pointer rounded-lg border-0 bg-springgreen-500/10 px-20 py-2.5 text-sm
                font-bold text-springgreen-500 outline outline-1 outline-springgreen-500/35
                transition-all duration-300 ease-in-out hover:bg-springgreen-500/15
                hover:text-springgreen-500`}>
              Sign up
            </button>
          </Link>
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

export default AdminLogInPage;
