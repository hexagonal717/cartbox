import { ShareOutlined } from '@mui/icons-material';
import { useQueries } from '@tanstack/react-query';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useEffect, useState} from 'react';
import {
  getCart,
  getProduct,
} from '@/api/v1/customer/customerApi.js';

import { addCartItem } from '@/api/v1/customer/cart/cartActions.js';

const ProductDetailPage = () => {
  const { productId } = useParams();
  const token = useSelector((state) => state.customerAuthSlice.accessToken);
  const customerId = token?.customerId;
  const dispatch = useDispatch();

  const [cartInProduct, setCartInProduct] = useState(false);
  const [product, setProduct] = useState(null);

  const [productQuery, cartQuery] = useQueries({
    queries: [
      {
        queryKey: ['productDetailPage', productId],
        queryFn: () => getProduct(productId).then((data) => data.payload),
        enabled: !!productId,
      },
      {
        queryKey: ['productDetailCart', customerId],
        queryFn: () => getCart(customerId).then((data) => data.payload.cartItems),
        enabled: !!customerId,
      },
    ],
  });

  useEffect(() => {
    if (productQuery.data) setProduct(productQuery.data);
    if (cartQuery.data) {
      const productInCart = cartQuery.data.some(
        (cartItem) => cartItem.productId === productId,
      );
      setCartInProduct(productInCart);
    }
  }, [productQuery.data, cartQuery.data, productId]);

  if (productQuery.isLoading || cartQuery.isLoading) {
    return (
      <div
        className="h-max-content fixed z-40 flex h-16 w-full select-none items-center justify-end
          bg-neutral-950 px-6 outline outline-1 outline-gray-800 backdrop-blur-sm"></div>
    );
  }

  if (productQuery.error || cartQuery.error) {
    return (
      <div>
        Error loading data: {productQuery.error?.message || cartQuery.error?.message}
      </div>
    );
  }

  return (
    <div
      className="grid h-screen w-full grid-cols-1 gap-8 px-0 py-16 sm:grid-cols-2 sm:px-8 sm:py-20
        lg:grid-cols-2 lg:px-36">
      <div className="mx-auto w-full max-w-lg">
        <img
          src={product?.image}
          alt={product?.name}
          className="h-auto w-full rounded"
        />
      </div>
      <div className="flex flex-col justify-start p-4">
        <div className="scale-90 text-right hover:cursor-pointer dark:text-white">
          <ShareOutlined />
        </div>
        <div className="mb-4 text-lg font-semibold dark:text-white">
          {product?.name}
        </div>
        <div className="mb-4 dark:text-white">{product?.description}</div>
        <div className="text-2xl font-medium dark:text-white">${product?.price}</div>

        <div className="mt-4">
          <button
            onClick={()=> dispatch(addCartItem({productId:productId,customerId: customerId,quantity:1}))}
            className={`h-12 w-32 rounded-md border border-neutral-600 text-xs font-bold transition-all ${
              cartInProduct
                ? 'bg-yellow-400 text-black'
                : 'bg-black text-white hover:bg-yellow-400 hover:text-black'
              }`}>
            {cartInProduct ? 'In Cart' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
