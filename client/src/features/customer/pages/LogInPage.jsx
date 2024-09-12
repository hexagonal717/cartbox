import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { login } from '@/api/v1/customer/customerApi.js';
import { addCartItem } from '@/api/v1/customer/cart/cartActions.js';
import {
  ClearGuestCart
} from '@/features/customer/redux/cart/guestCartSlice.js';

const LogInPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const guestCart = useSelector((state) => state.guestCartSlice.cart);

  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const transferGuestCart = async (customerId) => {
    if (guestCart?.items?.length > 0) {
      try {
        const addItemPromises = guestCart.items.map((item) => {
          return dispatch(addCartItem({
            productId: item._id,
            customerId: customerId,
            quantity: item.quantity,
          }));
        });

        await Promise.all(addItemPromises);
        } catch (error) {
        console.error('Error while transferring guest cart items:', error);
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const res = await login(credentials, dispatch);
      if (res?.status === 'success' && res && res.customerId) {
        await transferGuestCart(res.customerId);
        dispatch(ClearGuestCart())
        navigate('/');
      } else {
        console.error('Login successful but customerId not received');
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
          <input
            className={`rounded-lg border-none bg-neutral-800 px-3 py-3 text-xs font-medium text-gray-300
              shadow-sm outline outline-1 outline-neutral-700 transition-all duration-200
              ease-in-out hover:shadow hover:shadow-indigo-500 hover:outline-indigo-600
              focus:shadow focus:shadow-indigo-800 focus:outline-indigo-600`}
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleCredentials}
          />

          <input
            className={`rounded-lg border-none bg-neutral-800 px-3 py-3 text-xs font-medium text-gray-300
              shadow-sm outline outline-1 outline-neutral-700 transition-all duration-200
              ease-in-out hover:shadow hover:shadow-indigo-500 hover:outline-indigo-600
              focus:shadow focus:shadow-indigo-800 focus:outline-indigo-600`}
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleCredentials}
          />

          <NavLink
            to={`/forgotpassword`}
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
            className={`m-4 cursor-pointer rounded-lg border-0 bg-indigo-600 px-16 py-2 text-sm font-bold
              text-indigo-950 transition-all duration-300 ease-in-out hover:bg-indigo-700
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
          <Link to={`/signup`}>
            <button
              className={`m-4 cursor-pointer rounded-lg border-0 bg-springgreen-500/10 px-20 py-2.5 text-sm
                font-bold text-springgreen-500 outline outline-1 outline-springgreen-500/35
                transition-all duration-300 ease-in-out hover:bg-springgreen-500/15
                hover:text-springgreen-500`}>
              Sign up
            </button>
          </Link>
          <Link to={`/admin-login`}>
            <div className={'text-xs'}>
              Are you an{' '}
              <span
                className={
                  'text-sm font-bold text-yellow-400 hover:text-yellow-500'
                }>
                admin
              </span>
              ?
            </div>
          </Link>
        </form>
      </div>
    </>
  );
};

export default LogInPage;
