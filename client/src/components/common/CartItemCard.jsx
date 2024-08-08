import { useSelector } from 'react-redux';
import {
  decreaseCartItemQuantity,
  getCart,
  increaseCartItemQuantity,
  removeCartItem,
} from '../../api/customer/customerApi.js';

const CartItemCard = ({ product, cart, updateCart }) => {
  const customerId = useSelector(
    (state) => state.customerAuthSlice.accessToken?.customerId,
  );

  function handleIncreaseCartItemQuantity() {
    increaseCartItemQuantity(product._id, customerId)
      .then((res) => {
        if (res.status === 'success') {
          getCart(customerId).then((res) => {
            updateCart(res.payload.cart);
          });
        } else {
          // Handle failure, e.g., show an error message
        }
      })
      .catch((error) => {
        console.error('Failed to increase cart quantity:', error);
      });
  }

  function handleDecreaseCartItemQuantity() {
    decreaseCartItemQuantity(product._id, customerId)
      .then((res) => {
        if (res.status === 'success') {
          getCart(customerId).then((res) => {
            updateCart(res.payload.cart);
          });
        } else {
          // Handle failure, e.g., show an error message
        }
      })
      .catch((error) => {
        console.error('Failed to decrease cart quantity:', error);
      });
  }

  function handleRemoveCartItem() {
    removeCartItem(product._id, customerId)
      .then((res) => {
        if (res.status === 'success') {
          getCart(customerId).then((res) => {
            updateCart(res.payload.cart);
          });
        } else {
          // Handle failure, e.g., show an error message
        }
      })
      .catch((error) => {
        console.error('Failed to remove cart item:', error);
      });
  }

  return (
    <div className={'rounded-lg bg-neutral-950 p-8 text-neutral-200'}>
      <div className={'relative block w-min'}>
        <img src={product.image} alt="" className={'relative flex h-auto w-40'} />
      </div>
      <div className={'flex w-full'}>
        <div>
          <div className={'text-left text-xl font-bold'}>{`${product.name}`}</div>
        </div>
      </div>
      <div className={'flex flex-col items-end justify-between text-right text-xl'}>
        <div>${product.price && product.price}&nbsp;</div>

        <div
          className={
            'mt-6 flex items-center justify-between rounded-xl bg-neutral-900 p-1 font-light'
          }>
          <button
            className={
              'w-7 rounded-full bg-neutral-800 text-center text-white hover:bg-neutral-700'
            }
            onClick={handleDecreaseCartItemQuantity}>
            <div>-</div>
          </button>
          <div className={'px-2 text-xs'}>
            <b>Qty. {cart.quantity}</b>
          </div>
          <button
            className={
              'w-7 rounded-full bg-neutral-800 text-center text-white hover:bg-neutral-700'
            }
            onClick={handleIncreaseCartItemQuantity}>
            <div className={'-translate-y-[0.05rem]'}>+</div>
          </button>
        </div>
        <button
          className={`mt-8 rounded-full border-neutral-700 px-2.5 py-1.5 text-xs text-yellow-400
            hover:underline`}
          onClick={handleRemoveCartItem}>
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItemCard;
