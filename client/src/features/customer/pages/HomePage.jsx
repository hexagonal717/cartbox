import { useQueries } from '@tanstack/react-query';
import { getCart, getProductList } from '../../../api/customer/customerApi.js';
import CategoryBar from '../../../components/common/CategoryBar.jsx';
import ProductCard from '../../../components/common/ProductCard.jsx';
import { useSelector } from 'react-redux';
import Carousel from '../../../components/common/Carousel.jsx';

const HomePage = () => {
  const customerId = useSelector(
    (state) => state.customerAuthSlice.accessToken?.customerId,
  );

  // Run multiple queries in parallel
  const queries = useQueries({
    queries: [
      {
        queryKey: ['homePageProductList'],
        queryFn: () => getProductList().then((data) => data.payload),
      },
      {
        queryKey: ['homePageCart', customerId],
        queryFn: () => getCart(customerId).then((data) => data.payload.cart),
        enabled: !!customerId,
      },
    ],
  });

  const [productQuery, cartQuery] = queries;

  if (productQuery.isLoading || cartQuery.isLoading) {
    return <div>Loading...</div>;
  }

  if (productQuery.error || cartQuery.error) {
    return (
      <div>
        Error loading data: {productQuery.error?.message || cartQuery.error?.message}
      </div>
    );
  }

  const productList = productQuery.data;
  const cartList = cartQuery.data;

  return (
    <>
      <div
        className={
          'box-border flex w-full flex-col items-center px-4 py-40 lg:py-36'
        }>
        <CategoryBar />
        <Carousel></Carousel>
        <div className={'grid w-full max-w-screen-xl grid-cols-1'}>
          {productList && productList.length > 0 ? (
            productList.flatMap((product) => {
              return (
                <ProductCard key={product._id} product={product} cart={cartList} />
              );
            })
          ) : (
            <h1>No products available</h1>
          )}
        </div>
      </div>
    </>
  );
};

export default HomePage;
