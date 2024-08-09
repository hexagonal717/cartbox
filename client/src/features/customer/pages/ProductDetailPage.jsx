import { ShareOutlined } from '@mui/icons-material';
import { useQueries } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  addCartItem,
  getCart,
  getProduct,
} from '../../../api/customer/customerApi.js';
import { useState } from 'react';

const ProductDetailPage = () => {
  const { productId } = useParams();

  const token = useSelector((state) => state.customerAuthSlice.accessToken);

  // Run multiple queries in parallel
  const queries = useQueries({
    queries: [
      {
        queryKey: ['productDetailPage', productId],
        queryFn: () => getProduct(productId).then((data) => data.payload),
        enabled: !!productId,
      },
      {
        queryKey: ['productDetailCart', token?.customerId], // Include customerId to differentiate cart queries
        queryFn: () => getCart(token.customerId).then((data) => data.payload.cart),
        enabled: !!token, // Only fetch cart if customerId is available
      },
    ],
  });

  const [productQuery, cartQuery] = queries;

  console.log(productQuery?.data, 'llllllllllllll');

  if (productQuery?.isLoading || cartQuery?.isLoading) {
    return (
      <div
        className={`h-max-content fixed z-40 flex h-16 w-full select-none items-center justify-end
          bg-neutral-950 px-6 outline outline-1 outline-gray-800 backdrop-blur-sm`}
      ></div>
    );
  }

  if (productQuery?.error || cartQuery?.error) {
    return (
      <div>
        Error loading data: {productQuery?.error.message || cartQuery?.error.message}
      </div>
    );
  }

  const product = productQuery?.data;
  const cart = cartQuery?.data;
  const cartFilter = cart.some((cartItem) => cartItem?.productId === productId);

  function handleAddToCart() {
    addCartItem(productId, token.customerId, 1).then((data) => {
      if (data.status === 'success') {
        console.log(data.payload, 'ADDED ITEM');
      }
    });
  }

  return (
    <>
      <div
        className={`grid h-full w-full grid-cols-1 gap-8 px-0 py-16 sm:grid-cols-2 sm:px-8 sm:py-20
          lg:grid-cols-2 lg:px-36`}
      >
        <div className={'mx-auto w-full max-w-lg'}>
          <img
            src={product?.image}
            alt={product?.name}
            className={'h-auto w-full rounded'}
          />
        </div>
        <div className={'flex flex-col justify-start p-4'}>
          <div className={'scale-90 text-right hover:cursor-pointer'}>
            <ShareOutlined />
          </div>
          <div className={'mb-4 text-lg font-light'}>{product?.name}</div>
          <div className={'mb-4'}>{product?.description}</div>
          <div className={'text-2xl font-medium'}>${product?.price}</div>

          <div className={'mt-4'}>
            {cartFilter ? (
              <button
                className={`h-12 w-32 rounded-md border border-neutral-600 bg-yellow-400 text-xs font-bold
                  text-black transition-all`}
              >
                In Cart
              </button>
            ) : (
              <button
                onClick={() => handleAddToCart(productId, token.customerId)}
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
  );
};

export default ProductDetailPage;
