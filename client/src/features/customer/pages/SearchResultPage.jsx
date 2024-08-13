import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useQueries } from '@tanstack/react-query';
import { getCart, getProductList } from '../../../api/customer/customerApi.js';
import { ArrowBackIos } from '@mui/icons-material';
import ProductCard from '../../../components/common/customer/ProductCard.jsx';

const SearchResultPage = () => {
  const navigate = useNavigate();
  const customerId = useSelector(
    (state) => state.customerAuthSlice.accessToken?.customerId,
  );

  // Get query parameters from URL
  const queryParams = new URLSearchParams(window.location.search);

  // Extract specific query parameters
  const search = queryParams.get('search');

  // Run multiple queries in parallel
  const queries = useQueries({
    queries: [
      {
        queryKey: ['productListBySearch'],
        queryFn: () => getProductList(search).then((data) => data.payload),
      },
      {
        queryKey: ['cart', customerId],
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

  // const capitalizeFirstLetter = (string) => {
  //   return string?.charAt(0).toUpperCase() + string?.slice(1);
  // };

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div>
      <div
        className={
          'box-border flex w-full flex-col items-center px-4 py-8 lg:py-16'
        }>
        <div className={'grid w-full max-w-screen-xl grid-cols-1'}>
          <div className={'flex items-center pb-10 pt-14'}>
            <button onClick={() => handleBack()} className={'scale-90'}>
              <ArrowBackIos />
            </button>
            <div className={'lg:px-74 px-1 text-xs font-bold'}>
              search results for
            </div>
          </div>
          {productList && productList.length > 0 ? (
            productList.flatMap((product) => {
              return (
                <ProductCard key={product._id} product={product} cart={cartList} />
              );
            })
          ) : (
            <h1 className={'px-10'}>No products available</h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchResultPage;
