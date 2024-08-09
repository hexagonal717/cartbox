import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { getCart } from '../../../api/customer/customerApi.js';
import CartItemCard from '../../../components/common/CartItemCard.jsx';
import { useState, useEffect } from 'react';
import CartEmpty from '../../../components/common/CartEmpty.jsx';
import LoadingPage
  from '../../../components/common/LoadingPage.jsx';

const CartPage = () => {
  const customerId = useSelector(
    (state) => state.customerAuthSlice.accessToken?.customerId,
  );

  const [cart, setCart] = useState([]);

  // Fetch cart items
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
    }
  }, [cartResult]);

  if (isCartLoading) return <LoadingPage/>;
  if (cartError) return <div>Error loading cart: {cartError.message}</div>;

  function updateCart(newCart) {
    setCart(newCart);
  }

  if (cartResult.cart.length === 0) {
    return <CartEmpty />;
  }

  return cart.map((item, index) => (
    <div className={'m-4'} key={index}>
      <CartItemCard
        product={cartResult.products[index]}
        cart={item}
        updateCart={updateCart}
      />
    </div>
  ));
};

export default CartPage;
