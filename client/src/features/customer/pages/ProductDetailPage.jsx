import { useParams } from 'react-router-dom';
import { getProductDetailByParams } from '../../../api/customer/customerApi.js';
import { useQuery } from '@tanstack/react-query';
import { useDispatch, useSelector } from 'react-redux';
import { ShareOutlined } from '@mui/icons-material';

const ProductDetailPage = () => {
  const { productId } = useParams();
  const cartData = useSelector((state) => state.cartSlice.cartInfo);
  const dispatch = useDispatch();

  const {
    status,
    error,
    data: product,
  } = useQuery({
    queryKey: ['productDetail', productId],
    queryFn: () =>
      getProductDetailByParams(productId).then((data) => data.payload[0]),
    enabled: !!productId,
  });

  if (status === 'loading')
    return <p className="mt-8 text-center text-xl">Loading...</p>;
  if (status === 'error')
    return <p className="mt-8 text-center text-xl">{JSON.stringify(error)}</p>;

  if (!product) {
    return <p className="mt-8 text-center text-xl">Product not found</p>;
  }

  function addToCart() {

    dispatch()

  }

  const findData = cartData.some((li) => li.id === productId);

  return (
    <>
      <div
        className="grid h-full w-full grid-cols-1 gap-8 px-0 py-16 sm:grid-cols-2 sm:px-8 sm:py-20 lg:grid-cols-2
          lg:px-36"
      >
        <div className="mx-auto w-full max-w-lg">
          <img
            src={product.image}
            alt={product.name}
            className="h-auto w-full rounded"
          />
        </div>
        <div className="flex flex-col p-4 justify-start">
          <div className="scale-90 text-right hover:cursor-pointer">
            <ShareOutlined />
          </div>
          <div className="mb-4 text-lg font-light">{product.name}</div>
          <div className="mb-4">{product.description}</div>
          <div className="text-2xl font-medium">${product.price}</div>

          <div className="mt-4">
            {findData ? (
              <button
                className="h-12 w-32 rounded-md border border-neutral-600 bg-yellow-400 text-lg font-bold
                  text-black shadow-lg backdrop-blur-md"
              >
                In Cart
              </button>
            ) : (
              <button
                onClick={() => addToCart()}
                className="h-12 w-32 rounded-md border border-neutral-600 bg-black text-xs font-bold text-white
                  transition-all hover:bg-yellow-400 hover:text-black"
              >
                Add to Cart
              </button>
            )}
          </div>
        </div>
      </div>
      {/*<Footer />*/}
    </>
  );
};

export default ProductDetailPage;
