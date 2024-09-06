import { useQueries } from '@tanstack/react-query';
import {
  getCart,
  getProductListByCategory,
} from '../../../api/customer/customerApi.js';
import { useSelector } from 'react-redux';
import ProductCard from '../../../components/common/customer/ProductCard.jsx';
import { ArrowBackIos } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const CategoryPage = () => {
  const navigate = useNavigate();
  const customerId = useSelector(
    (state) => state.customerAuthSlice.accessToken?.customerId,
  );

  // Get query parameters from URL
  const queryParams = new URLSearchParams(window.location.search);

  // Extract specific query parameters
  const category = queryParams.get('category');
  const subCategory = queryParams.get('subCategory');

  // Run multiple queries in parallel
  const [productQuery, cartQuery] = useQueries({
    queries: [
      {
        queryKey: ['productListByCategory', category, subCategory],
        queryFn: () =>
          getProductListByCategory(category, subCategory).then(
            (data) => data.payload,
          ),
        enabled: !!category || !!subCategory, // Only fetch products if category or subCategory is defined
      },
      {
        queryKey: ['cart', customerId],
        queryFn: () => getCart(customerId).then((data) => data.payload.cart),
        enabled: !!customerId, // Only fetch cart if customerId is defined
      },
    ],
  });

  // Handle loading states
  if (productQuery.isLoading || cartQuery.isLoading) {
    return <div>Loading...</div>;
  }

  // Handle error states
  if (productQuery.error || cartQuery.error) {
    return (
      <div>
        Error loading data: {productQuery.error?.message || cartQuery.error?.message}
      </div>
    );
  }

  // Extract data from queries
  const productList = productQuery.data || [];
  const cartList = cartQuery.data || [];

  // Helper function to capitalize the first letter
  const capitalizeFirstLetter = (string) =>
    string.charAt(0).toUpperCase() + string.slice(1);

  // Handle back button click
  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className="flex w-full flex-col items-center px-4 py-8 lg:py-16">
      <div className="flex w-full max-w-screen-xl flex-col">
        <div className="flex items-center pb-10 pt-14">
          <button onClick={handleBack} className="scale-90">
            <ArrowBackIos />
          </button>
          <div className="lg:px-74 px-1 text-3xl font-bold">
            {capitalizeFirstLetter(category || subCategory || 'Category')}
          </div>
        </div>

        <div className="grid w-full grid-cols-1 gap-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {productList.length > 0 ? (
            productList.map((product) => (
              <ProductCard key={product._id} product={product} cart={cartList} />
            ))
          ) : (
            <h1 className="col-span-full px-10 text-center">
              No products available
            </h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
