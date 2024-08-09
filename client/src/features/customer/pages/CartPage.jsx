import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { getCart } from '../../../api/customer/customerApi.js';
import CartItemCard from '../../../components/common/CartItemCard.jsx';

const CartPage = () => {
  const customerId = useSelector(
    (state) => state.customerAuthSlice.accessToken.customerId,
  );

  // Fetch cart items
  const {
    data: cartResult,
    isLoading: isCartLoading,
    error: cartError,
  } = useQuery({
    queryKey: ['cart', customerId],
    queryFn: () => getCart(customerId).then((data) => data.payload),
    enabled: !!customerId,
  });

  if (isCartLoading) return <div>Loading cart...</div>;
  if (cartError) return <div>Error loading cart: {cartError.message}</div>;

  return cartResult.products.map((product, index) => {
    const cart = cartResult.cart[index];
    return (

        <div
          className={'m-4'}
          key={index}>
        <CartItemCard product={product} cart={cart} />
        </div>

    );
  });
};

export default CartPage;
