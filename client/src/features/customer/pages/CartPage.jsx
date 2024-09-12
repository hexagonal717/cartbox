import { useQuery } from '@tanstack/react-query';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect} from 'react';
import { getCart } from '@/api/v1/customer/customerApi.js';
import {
  removeCartItem,
  increaseCartItemQuantity,
  decreaseCartItemQuantity,
} from '@/api/v1/customer/cart/cartActions.js';
import CartEmpty from '../../../components/common/customer/CartEmpty.jsx';
import LoadingPage from '../../../components/common/customer/LoadingPage.jsx';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui-custom/button.jsx';
import { Minus, Plus } from 'lucide-react';

const CartPage = () => {
  const navigate = useNavigate();

  const customerId = useSelector(
    (state) => state.customerAuthSlice.accessToken?.customerId,
  );

  const localCart = useSelector((state) => state.cartSlice.cart);
  const localCartItems = useSelector((state) => state.cartSlice.cart?.items);
  const dispatch = useDispatch();

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


  if (isCartLoading) return <LoadingPage />;
  if (cartError) return <div>Error loading cart: {cartError.message}</div>;

  if (localCartItems.length === 0) {
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
    <div className="flex min-h-screen justify-center bg-neutral-200 dark:bg-neutral-900">
      <div
        className="grid w-screen grid-cols-1 grid-rows-1 gap-3 px-4 pt-20 sm:w-auto md:w-auto
          md:grid-cols-2 md:grid-rows-1 md:gap-6 lg:gap-12">
        <div>
          {localCartItems?.map((cartItem) => {
            const product = products.find(
              (product) => product._id === cartItem.productId,
            );

            return (
              <div className="py-2" key={cartItem?.productId}>
                <div
                  className="flex flex-row justify-between gap-16 rounded-lg bg-neutral-100 p-6 text-right shadow
                    dark:bg-neutral-950 sm:gap-40 md:gap-28 lg:gap-56">
                  <div className="relative block w-32">
                    <img
                      src={product?.image}
                      alt=""
                      className="relative flex h-auto"
                    />

                    <div className="mt-6 flex w-36 items-center justify-between rounded-full text-center font-light">
                      <Button
                        variant={'outline'}
                        size={'xs'}
                        className={'rounded-full'}
                        onClick={() =>
                          dispatch(decreaseCartItemQuantity({
                            productId: product._id,
                            customerId: customerId,
                          }))
                        }>
                        <Minus className={'m-0.5 scale-75'} />
                      </Button>
                      <div
                        className="rounded p-1.5 px-3 text-xs outline outline-1 outline-neutral-300 dark:bg-neutral-950
                          dark:outline-neutral-800">
                        <b>Qty. {cartItem.quantity}</b>
                      </div>
                      <Button
                        variant={'outline'}
                        size={'xs'}
                        className={'rounded-full'}
                        onClick={() =>
                          dispatch(
                            increaseCartItemQuantity({
                              productId: product._id,
                              customerId: customerId,
                            }),
                          )
                        }>
                        <Plus className={'m-0.5 scale-75'} />
                      </Button>
                    </div>
                  </div>

                  <div className="flex flex-col items-end justify-between">
                    <div className="text-sm">{product?.name}</div>

                    <div>${product?.price}&nbsp;</div>

                    <button
                      className="mt-8 rounded-full border-neutral-700 px-2.5 py-1.5 text-xs text-yellow-400
                        hover:underline"
                      onClick={() => dispatch(
                        removeCartItem({
                          productId: product._id,
                          customerId: customerId,
                        }),
                      )}>
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
            <div className="text-xl">${localCart?.totalPrice.toFixed(2)}</div>
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
          <div className="text-xl">${localCart?.totalPrice.toFixed(2)}</div>
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
