import { useQuery } from '@tanstack/react-query';
import { getProductList } from '../../../api/customer/customerApi.js';
import CategoryBar from '../../../components/common/CategoryBar.jsx';
import ProductCard from '../../../components/common/ProductCard.jsx';

const HomePage = () => {
  const {
    status,
    error,
    data: dbProduct,
  } = useQuery({
    queryKey: ['dbProductInfo'],
    queryFn: () =>
      getProductList().then((data) => {
        return data.payload;
      }),
  });

  if (status === 'loading') return <h1>Loading...</h1>;
  if (status === 'error') return <h1>{JSON.stringify(error)}</h1>;

  return (
    <>
      <div className={'box-border flex w-full flex-col items-center px-4 pt-40'}>
        <CategoryBar />
        <div className={'grid w-full max-w-screen-xl grid-cols-1'}>
          {dbProduct && dbProduct.length > 0 ? (
            dbProduct.map((product, index) => (
              <ProductCard key={index} product={product} />
            ))
          ) : (
            <h1>No products available</h1>
          )}
        </div>
      </div>
    </>
  );
};

export default HomePage;
