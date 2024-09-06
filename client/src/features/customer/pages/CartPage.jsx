import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { useState, useEffect, useCallback } from 'react';
import {
  decreaseCartItemQuantity,
  getCart,
  increaseCartItemQuantity,
  removeCartItem,
} from '../../../api/v1/customer/customerApi.js';
import CartEmpty from '../../../components/common/customer/CartEmpty.jsx';
import LoadingPage from '../../../components/common/customer/LoadingPage.jsx';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
  const navigate = useNavigate();

  const customerId = useSelector(
    (state) => state.customerAuthSlice.accessToken?.customerId,
  );

  const localCart = useSelector((state) => state.cartSlice.items);

  console.log(localCart, 'LOCAAAAAAAAAAAAA');

  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  const {
    data: cartResult,
    isLoading: isCartLoading,
    error: cartError,
  } = useQuery({
    queryKey: ['cartPage', customerId],
    queryFn: () => getCart(customerId).then((data) => data.payload),
    enabled: !!customerId,
  });

  useEffect(() => {
    if (cartResult) {
      setCartItems(cartResult.cartItems);
      setProducts(cartResult.products);
      setCart(cartResult.cart);
    }
  }, [cartResult]);

  const updateCart = useCallback((newCart) => {
    setCartItems(newCart);
  }, []);

  const handleCartAction = useCallback(
    async (actionFn, product) => {
      try {
        const res = await actionFn(product._id, customerId);
        if (res.status === 'success') {
          const updatedCart = await getCart(customerId);
          updateCart(updatedCart.payload.cartItems);
        } else {
          console.error('Failed to update cart:', res.message);
        }
      } catch (error) {
        console.error('Cart action failed:', error);
      }
    },
    [customerId, updateCart],
  );

  const calculateTotalPrice = useCallback(() => {
    return cartItems.reduce((total, cartItem) => {
      const product = products.find((product) => product._id === cartItem.productId);
      return total + (product?.price || 0) * cartItem.quantity;
    }, 0);
  }, [cartItems, products]);

  if (isCartLoading) return <LoadingPage />;
  if (cartError) return <div>Error loading cart: {cartError.message}</div>;

  if (cartItems.length === 0) {
    return <CartEmpty />;
  }

  function handlePlaceOrder() {
    if (cart?.customerId) {
      navigate(`/payment/${cart._id}`, {
        state: { cart },
      });
    }
  }

  return (
    <div className="flex min-h-screen justify-center">
      <div
        className="grid w-screen grid-cols-1 grid-rows-1 gap-3 px-4 pt-20 sm:w-auto md:w-auto
          md:grid-cols-2 md:grid-rows-1 md:gap-6 lg:gap-12">
        <div>
          {cartItems.map((cartItem) => {
            const product = products.find(
              (product) => product._id === cartItem.productId,
            );

            return (
              <div className="py-2" key={product?._id}>
                <div
                  className="flex flex-row justify-between gap-16 rounded-lg bg-neutral-950 p-6 text-right
                    text-neutral-200 sm:gap-40 md:gap-28 lg:gap-56">
                  <div className="relative block w-32">
                    <img
                      src={product?.image}
                      alt=""
                      className="relative flex h-auto"
                    />

                    <div
                      className="mt-6 flex w-32 items-center justify-between rounded-full bg-neutral-800 p-1
                        text-center font-light">
                      <button
                        className="h-7 w-7 rounded-full bg-neutral-800 text-center text-white hover:bg-neutral-700"
                        onClick={() =>
                          handleCartAction(decreaseCartItemQuantity, product)
                        }>
                        <div>-</div>
                      </button>
                      <div className="px-2 text-xs">
                        <b>Qty. {cartItem.quantity}</b>
                      </div>
                      <button
                        className="h-7 w-7 rounded-full bg-neutral-800 text-center text-white hover:bg-neutral-700"
                        onClick={() =>
                          handleCartAction(increaseCartItemQuantity, product)
                        }>
                        <div className="-translate-y-[0.05rem]">+</div>
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col items-end justify-between">
                    <div className="text-sm">{product?.name}</div>

                    <div>${product?.price}&nbsp;</div>

                    <button
                      className="mt-8 rounded-full border-neutral-700 px-2.5 py-1.5 text-xs text-yellow-400
                        hover:underline"
                      onClick={() => handleCartAction(removeCartItem, product)}>
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className={'mt-40 md:hidden'}></div>

        <div
          className={
            'mt-2 hidden w-full flex-col rounded-lg bg-neutral-950 p-8 text-neutral-200 md:flex'
          }>
          <div className="mb-10 flex flex-col justify-between gap-1">
            {cartItems.map((cartItem) => {
              const product = products.find(
                (product) => product._id === cartItem.productId,
              );

              return (
                <div
                  key={product._id}
                  className={
                    'flex flex-row justify-between text-sm text-neutral-300'
                  }>
                  <div>{product?.name}</div>
                  <div className={'font-semibold'}>{product?.price}</div>
                </div>
              );
            })}
          </div>

          <div className="mb-4 flex w-full justify-between">
            <div className="text-xl font-bold">Total:</div>
            <div className="text-xl">${calculateTotalPrice().toFixed(2)}</div>
          </div>
          <button
            onClick={() => handlePlaceOrder()}
            className="rounded-lg bg-yellow-400 px-8 py-4 text-sm font-bold text-neutral-950
              hover:bg-yellow-500">
            Place Order
          </button>
        </div>
      </div>

      <footer
        className="fixed bottom-0 flex w-full flex-col rounded-lg bg-neutral-950 p-8 text-neutral-200
          sm:w-auto md:hidden">
        <div className="mb-4 flex w-full justify-between sm:gap-72">
          <div className="text-xl font-bold">Total:</div>
          <div className="text-xl">${calculateTotalPrice().toFixed(2)}</div>
        </div>
        <button
          onClick={() => handlePlaceOrder()}
          className="w-full rounded-lg bg-yellow-400 px-8 py-4 text-sm font-bold text-neutral-950
            hover:bg-yellow-500">
          Place Order
        </button>
      </footer>
    </div>
  );
};

export default CartPage;
