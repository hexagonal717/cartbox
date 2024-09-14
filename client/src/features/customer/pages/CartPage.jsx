import { useQueries } from '@tanstack/react-query';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getCart, getProduct } from '@/api/v1/customer/customerApi.js';
import {
  decreaseCartItemQuantity,
  increaseCartItemQuantity,
  removeCartItem,
} from '@/api/v1/customer/cart/cartActions.js';
import CartEmpty from '../../../components/common/customer/CartEmpty.jsx';
import LoadingPage from '../../../components/common/customer/LoadingPage.jsx';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui-custom/button.jsx';
import { Minus, Plus } from 'lucide-react';
import {
  DecreaseItemQuantity,
  IncreaseItemQuantity,
  RemoveCartItem,
} from '@/features/customer/redux/cart/guestCartSlice.js';
import GuestRedirectModal from '@/features/customer/pages/GuestRedirectModal.jsx';
import {
  Card
} from '@/components/ui-custom/card.jsx';

const CartPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isGuestModalOpen, setIsGuestModalOpen] = useState(false);
  const customerId = useSelector(
    (state) => state.customerAuthSlice.accessToken?.customerId,
  );
  const localStorageCart = useSelector((state) => {
    if (!customerId) {
      return state.guestCartSlice.cart;
    } else if (customerId) {
      return state.cartSlice.cart;
    }
  });
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  const queries = useQueries({
    queries: [
      {
        queryKey: ['guestCartProducts'],
        queryFn: async () => {
          const items = localStorageCart.items;
          const productPromises = items.map((item) =>
            getProduct(item._id).then((response) => response.payload),
          );
          return Promise.all(productPromises);
        },
        enabled: !customerId, // Only run for guest users
      },
      {
        queryKey: ['CartPage', customerId],
        queryFn: () => getCart(customerId).then((data) => data.payload),
        enabled: !!customerId,
      },
    ],
  });

  const [guestProductQuery, cartResult] = queries;

  useEffect(() => {
    if (customerId && cartResult.data) {
      setProducts(cartResult.data?.products);
      setCart(cartResult.data);
    } else if (!customerId && guestProductQuery.data) {
      setProducts(guestProductQuery.data);
      setCart(localStorageCart);
    }
  }, [customerId, cartResult.data, guestProductQuery.data, localStorageCart]);

  if (cartResult.isLoading || guestProductQuery.isLoading) {
    return <LoadingPage />;
  }

  if (localStorageCart?.length === 0) {
    return <CartEmpty />;
  }

  function handlePlaceOrder() {
    if (localStorageCart?.customerId) {
      navigate(`/payment/${cart._id}`, {
        state: { cart:localStorageCart },
      });
    } else if (!customerId) {
      setIsGuestModalOpen(true);
      }
  }

  function handleIncreaseCartItemQuantity(productId) {
    if (customerId) {
      dispatch(
        increaseCartItemQuantity({
          productId: productId,
          customerId: customerId,
        }),
      );
    } else if (!customerId) {
      dispatch(IncreaseItemQuantity(productId));
    }
  }

  function handleDecreaseCartItemQuantity(productId) {
    if (customerId) {
      dispatch(
        decreaseCartItemQuantity({
          productId: productId,
          customerId: customerId,
        }),
      );
    } else if (!customerId) {
      dispatch(DecreaseItemQuantity(productId));
    }
  }

  function handleRemoveCartItem(productId) {
    if (customerId) {
      dispatch(
        removeCartItem({
          productId: productId,
          customerId: customerId,
        }),
      );
    } else if (!customerId) {
      dispatch(RemoveCartItem(productId));
    }
  }

  return (
    <div className="flex min-h-screen justify-center bg-neutral-200 dark:bg-neutral-900">
      <div
        className="grid w-screen grid-cols-1 grid-rows-1 gap-3 px-4 pt-20 sm:w-auto md:w-auto
          md:grid-cols-2 md:grid-rows-1 md:gap-6 lg:gap-12">
        <div>
          {localStorageCart.items?.map((cartItem, index) => {
            const product = products?.find(
              (product) =>
                product._id === cartItem._id || product._id === cartItem.productId,
            );

            return (
              <div key={product?._id || index} className="py-2">
                <Card
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
                        onClick={() => handleDecreaseCartItemQuantity(product._id)}>
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
                        onClick={() => handleIncreaseCartItemQuantity(product._id)}>
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
                      onClick={() => handleRemoveCartItem(product._id)}>
                      Remove
                    </button>
                  </div>
                </Card>
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
            {localStorageCart.items.map((cartItem, index) => {
              const product = products?.find(
                (product) =>
                  product._id === cartItem._id || product._id === cartItem.productId,
              );

              return (
                <div
                  key={product?._id || index}
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
            <div className="text-xl">${localStorageCart?.totalPrice.toFixed(2)}</div>
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
          <div className="text-xl">${localStorageCart?.totalPrice.toFixed(2)}</div>
        </div>
        <button
          onClick={() => handlePlaceOrder()}
          className="w-full rounded-lg bg-yellow-400 px-8 py-4 text-sm font-bold text-neutral-950
            hover:bg-yellow-500">
          Place Order
        </button>
      </footer>

      <GuestRedirectModal
        isOpen={isGuestModalOpen}
        onClose={() => setIsGuestModalOpen(false)}
      />
    </div>
  );
};

export default CartPage;
