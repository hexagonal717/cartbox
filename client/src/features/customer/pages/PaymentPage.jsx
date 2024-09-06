import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  addOrder,
  getCart,
  getProductList,
} from '../../../api/v1/customer/customerApi.js';
import { useQueries } from '@tanstack/react-query';
import { useSelector } from 'react-redux';

const PaymentPage = () => {
  const customerId = useSelector(
    (state) => state.customerAuthSlice.accessToken?.customerId,
  );

  const [paymentMethod, setPaymentMethod] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('pending');

  const location = useLocation();
  const { cart } = location.state;
  const navigate = useNavigate();

  const handlePayment = () => {
    if (!paymentMethod) {
      alert('Please select a payment method');
      return;
    }

    setPaymentStatus('processing');

    setTimeout(() => {
      const isSuccess = Math.random() > 0.5;
      setPaymentStatus(isSuccess ? 'completed' : 'failed');
    }, 2000);
  };

  useEffect(() => {
    if (paymentStatus === 'completed') {
      addOrder(customerId, cart.items).then((res) => {
        if (res.status === 'success') {
          navigate('/order-success', { state: cart });
        }
      });
    }
  }, [cart.items, customerId, paymentStatus]);

  const queries = useQueries({
    queries: [
      {
        queryKey: ['customerPaymentPage'],
        queryFn: () => getProductList().then((data) => data.payload),
      },
      {
        queryKey: ['paymentPageCart', customerId],
        queryFn: () => getCart(customerId).then((data) => data.payload.cartItems),
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

  return (
    <div className="flex h-screen flex-col items-center px-4 pt-32">
      <div className="mb-6 w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-2xl font-semibold text-neutral-900">
          Order Summary
        </h2>
        <div className="mb-4 text-sm">
          <div className="mb-2 flex justify-between">
            <span className="font-medium text-neutral-700">Total Items:</span>
            <span className="font-bold text-neutral-900">{cart?.totalQuantity}</span>
          </div>
          <div className="mb-2 flex justify-between">
            <span className="font-medium text-neutral-700">Total Amount:</span>
            <span className="font-bold text-neutral-900">
              ${cart?.totalPrice.toFixed(2)}
            </span>
          </div>
        </div>
        <div className="w-full">
          <label className="mb-2 block text-sm font-bold text-neutral-600">
            Payment Method
          </label>
          <select
            value={paymentMethod}
            className="w-full rounded-md border border-r-8 border-neutral-900 py-2 pl-3 pr-10 text-sm
              shadow-sm outline-none transition duration-150 ease-in-out"
            onChange={(e) => setPaymentMethod(e.target.value)}>
            <option disabled hidden value="">
              Select a payment method
            </option>
            <option value="Credit Card">Credit Card</option>
            <option value="PayPal">PayPal</option>
            <option value="UPI">UPI</option>
            <option value="Cash on Delivery">Cash on Delivery</option>
          </select>
        </div>
        <button
          className="mt-6 w-full rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white
            shadow-sm transition duration-150 ease-in-out hover:bg-green-700 focus:outline-none"
          onClick={handlePayment}>
          Submit Payment
        </button>
      </div>
      <div className="mt-6">
        <h3 className="text-lg font-semibold">
          Payment Status:{' '}
          <span
            className={`capitalize
              ${paymentStatus === 'completed' ? 'text-green-600' : paymentStatus === 'processing' ? 'text-yellow-600' : 'text-red-600'}`}>
            {paymentStatus}
          </span>
        </h3>
      </div>
    </div>
  );
};

export default PaymentPage;
