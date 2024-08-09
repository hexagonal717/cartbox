import { ShareOutlined } from '@mui/icons-material';
import {

  useQuery,
} from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  addCartItem,
  getCart,
  getProduct,
} from '../../../api/customer/customerApi.js';

const ProductDetailPage = () => {
  const { productId } = useParams();
  const {cart} = location.state || {}

  console.log(cart,'PPPPPPPPPPP');

  const customerId = useSelector(
    (state) => state.customerAuthSlice.accessToken?.customerId,
  );

  const {
    data: product,
    isLoading: isCartLoading,
    error: cartError,
  } = useQuery({
    queryKey: ['product', productId],
    queryFn: () => getProduct(productId).then((data) => data.payload),
    enabled: !!customerId,
  });

  if (isCartLoading) return <div>Loading product...</div>;
  if (cartError) return <div>Error loading cart: {cartError.message}</div>;

  function handleAddToCart() {
    addCartItem(productId, customerId).then((data) => {

      if (data.success) {
        getCart().then((data) => {
          return console.log(data, 'Manual');

          // if(data.success){
          //   setCartInfo(true);
          //
          // } else {
          //   setCartInfo(false)
          // }
        });
      }
    });
  }


  return(<>
    <div
      className={`grid h-full w-full grid-cols-1 gap-8 px-0 py-16 sm:grid-cols-2 sm:px-8 sm:py-20
          lg:grid-cols-2 lg:px-36`}
    >
      <div className={'mx-auto w-full max-w-lg'}>
        <img
          src={product.image}
          alt={product.name}
          className={'h-auto w-full rounded'}
        />
      </div>
      <div className={'flex flex-col justify-start p-4'}>
        <div className={'scale-90 text-right hover:cursor-pointer'}>
          <ShareOutlined />
        </div>
        <div className={'mb-4 text-lg font-light'}>{product.name}</div>
        <div className={'mb-4'}>{product.description}</div>
        <div className={'text-2xl font-medium'}>${product.price}</div>

        <div className={'mt-4'}>
          {product ? (
            <button
              className={`h-12 w-32 rounded-md border border-neutral-600 bg-yellow-400 text-lg font-bold
                  text-black shadow-lg backdrop-blur-md`}
            >
              In Cart
            </button>
          ) : (
            <button
              onClick={() => handleAddToCart()}
              className={`h-12 w-32 rounded-md border border-neutral-600 bg-black text-xs font-bold text-white
                  transition-all hover:bg-yellow-400 hover:text-black`}
            >
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </div>
    {/*<Footer />*/}
  </>

  )
};

export default ProductDetailPage;
