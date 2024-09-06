import { useQueries } from '@tanstack/react-query';
import { getCart, getProductList } from '../../../api/v1/customer/customerApi.js';
import CategoryBar from '../../../components/common/customer/CategoryBar.jsx';
import ProductCard from '../../../components/common/customer/ProductCard.jsx';
import { useSelector } from 'react-redux';
import Carousel from '../../../components/common/customer/Carousel.jsx';

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
    <div className="box-border flex w-full flex-col items-center py-[11.1rem] lg:py-40">
      <CategoryBar />
      <Carousel />
      <div
        className="grid w-full max-w-screen-xl grid-cols-1 gap-1 p-2 md:grid-cols-2 lg:grid-cols-3
          xl:grid-cols-4">
        {productList && productList.length > 0 ? (
          productList.map((product) => (
            <ProductCard key={product._id} product={product} cart={cartList} />
          ))
        ) : (
          <h1 className="col-span-full text-center">No products available</h1>
        )}
      </div>
    </div>
  );
};

export default HomePage;
