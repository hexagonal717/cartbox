import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { useState, useEffect, useCallback } from 'react';
import {
  decreaseCartItemQuantity,
  getCart,
  increaseCartItemQuantity,
  removeCartItem,
} from '../../../api/customer/customerApi.js';
import CartEmpty from '../../../components/common/CartEmpty.jsx';
import LoadingPage from '../../../components/common/LoadingPage.jsx';

const CartPage = () => {
  const customerId = useSelector(
    (state) => state.customerAuthSlice.accessToken?.customerId,
  );

  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);

  const updateCart = useCallback((newCart) => {
    setCart(newCart);
  }, []);

  const handleCartAction = useCallback(
    async (actionFn, product) => {
      try {
        const res = await actionFn(product._id, customerId);
        if (res.status === 'success') {
          const updatedCart = await getCart(customerId);
          updateCart(updatedCart.payload.cart);
        } else {
          console.error('Failed to update cart:', res.message);
        }
      } catch (error) {
        console.error('Cart action failed:', error);
      }
    },
    [customerId, updateCart],
  );

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
      setCart(cartResult.cart);
      setProducts(cartResult.products);
    }
  }, [cartResult]);

  if (isCartLoading) return <LoadingPage />;
  if (cartError) return <div>Error loading cart: {cartError.message}</div>;

  if (cart.length === 0) {
    return <CartEmpty />;
  }

  return (
    <div className="pt-20">
      {cart.map((cartItem) => {
        const product = products.find(
          (product) => product._id === cartItem.productId,
        );

        return (
          <div className="px-4 py-2" key={product?._id}>
            <div className="rounded-lg bg-neutral-950 p-8 text-neutral-200">
              <div className="relative block w-min">
                <img
                  src={product?.image}
                  alt=""
                  className="relative flex h-auto w-40"
                />
              </div>
              <div className="flex w-full">
                <div>
                  <div className="text-left text-xl font-bold">{product?.name}</div>
                </div>
              </div>
              <div className="flex flex-col items-end justify-between text-right text-xl">
                <div>${product?.price}&nbsp;</div>

                <div className="mt-6 flex items-center justify-between rounded-xl bg-neutral-900 p-1 font-light">
                  <button
                    className="w-7 rounded-full bg-neutral-800 text-center text-white hover:bg-neutral-700"
                    onClick={() =>
                      handleCartAction(decreaseCartItemQuantity, product)
                    }>
                    <div>-</div>
                  </button>
                  <div className="px-2 text-xs">
                    <b>Qty. {cartItem.quantity}</b>
                  </div>
                  <button
                    className="w-7 rounded-full bg-neutral-800 text-center text-white hover:bg-neutral-700"
                    onClick={() =>
                      handleCartAction(increaseCartItemQuantity, product)
                    }>
                    <div className="-translate-y-[0.05rem]">+</div>
                  </button>
                </div>
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
  );
};

export default CartPage;
