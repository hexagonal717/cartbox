import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { getCart, getProduct } from '../../../api/customer/customerApi.js';
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
    queryFn: () =>
      getCart(customerId).then((data) =>
        Promise.all(
          data.payload.items.map((item) =>
            getProduct(item.productId).then((product) => product.payload),
          ),
        ),
      ),
    enabled: !!customerId,
  });

  console.log(cartResult, 'CARTT');

  if (isCartLoading) return <div>Loading cart...</div>;
  if (cartError) return <div>Error loading cart: {cartError.message}</div>;
  return cartResult.map((product) => (
    <CartItemCard product={product} key={product.id} />
  ));
};

export default CartPage;
