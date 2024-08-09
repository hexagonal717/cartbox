import {
  useQueries,
} from '@tanstack/react-query';
import {
  getCart,
  getProductList,
} from '../../../api/customer/customerApi.js';
import CategoryBar
  from '../../../components/common/CategoryBar.jsx';
import ProductCard
  from '../../../components/common/ProductCard.jsx';
import {
  useSelector,
} from 'react-redux';

const HomePage = () => {
  const customerId = useSelector(
    (state) => state.customerAuthSlice.accessToken.customerId,
  );

  // Run multiple queries in parallel
  const queries = useQueries({
    queries: [
      {
        queryKey: ['productList'],
        queryFn: () => getProductList().then((data) => data.payload),
      },
      {
        queryKey: ['cartList', customerId], // Include customerId to differentiate cart queries
        queryFn: () => getCart(customerId).then((data) => data.payload.cart),
        enabled: !!customerId, // Only fetch cart if customerId is available
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

  const def = productList.flatMap((product) => {
    return cartList.filter((cartItem) => cartItem.productId === product._id);
  });

  console.log(def, "DEFFFFFFFFFF");


  return (
    <>
      <div className={'box-border flex w-full flex-col items-center px-4 pt-40'}>
        <CategoryBar />
        <div className={'grid w-full max-w-screen-xl grid-cols-1'}>
          {productList && productList.length > 0 ? (
            productList.map((product, index) => {

              const cartL = cartList.filter((cartItem) => cartItem?.productId === product._id);



              return (



                <ProductCard key={index} product={product} cart={cartL} />
              )


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
