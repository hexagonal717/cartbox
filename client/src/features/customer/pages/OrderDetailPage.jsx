import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getOrder } from '../../../api/customer/customerApi.js';
import LoadingPage from '../../../components/common/customer/LoadingPage.jsx';

import {

  useLocation,
} from 'react-router-dom';

const OrderDetailPage = () => {
  const customerId = useSelector(
    (state) => state.customerAuthSlice.accessToken?.customerId,
  );
  const location = useLocation();

  const order = location.state.order

  const [products, setProducts] = useState([]);

  const {
    data: orderResult,
    isLoading: isOrderLoading,
    error: orderError,
  } = useQuery({
    queryKey: ['orderDetailPage', customerId],
    queryFn: () => getOrder(customerId).then((data) => data.payload),
    enabled: !!customerId,
  });

  useEffect(() => {
    if (orderResult) {

      setProducts(orderResult.products);

    }
  }, [orderResult]);

  if (isOrderLoading) return <LoadingPage />;
  if (orderError) return <div>Error loading orders: {orderError.message}</div>;


  return (
    <div className="flex min-h-screen justify-center">
      <div className="grid w-screen grid-cols-1 grid-rows-1 gap-3 px-4 pt-20 sm:w-96 md:w-96 lg:w-1/3 md:grid-cols-1 md:grid-rows-1 md:gap-6 lg:gap-12">
        <div>

            <div key={order._id} className="py-2">
              <div className="flex flex-col bg-neutral-950 p-6 text-neutral-200 rounded-lg mb-4">
                <div className="flex justify-between items-center">
                  <div className="text-sm font-light">Order Number</div>
                  <div className="text-2xl font-bold text-yellow-400">#{order?.orderNumber}</div>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <div className="text-sm font-light">Status</div>
                  <div className="text-sm first-letter:capitalize font-medium">{order?.status}</div>
                </div>
                <div className="mt-4">
                  <div className="font-semibold">Shipping Address</div>
                  <div className="text-sm">
                    {order?.shippingAddress.fullName}<br />
                    {order?.shippingAddress.addressLine1}<br />
                    {order?.shippingAddress.addressLine2 && `${order?.shippingAddress.addressLine2}`}<br />
                    {order?.shippingAddress.city}, {order?.shippingAddress.state}<br />
                    {order?.shippingAddress.zipCode}, {order?.shippingAddress.country}
                  </div>
                </div>
                <div className="mt-4">
                  <div className="font-semibold">Billing Address</div>
                  <div className="text-sm">
                    {order.billingAddress.fullName}<br />
                    {order.billingAddress.addressLine1}<br />
                    {order.billingAddress.addressLine2 && `${order?.billingAddress.addressLine2}`}<br />
                    {order.billingAddress.city}, {order?.billingAddress.state}<br />
                    {order.billingAddress.zipCode}, {order?.billingAddress.country}
                  </div>
                </div>
                <div className="mt-4">
                  <div className="font-semibold">Items</div>
                  <div className="text-sm">
                    {order.items.map((item) => {
                      const product = products.find((p) => p._id.toString() === item.productId.toString());
                      return (
                        <div key={item.productId} className="flex justify-between mt-2">
                          <div>{product ? product?.name : 'Unknown Product'}</div>
                          <div>
                            {item.quantity} x ${item.price.toFixed(2)}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="mt-4 flex justify-between">
                  <div className="font-semibold">Total Quantity</div>
                  <div>{order.totalQuantity}</div>
                </div>
                <div className="mt-2 flex justify-between">
                  <div className="font-semibold">Total Price</div>
                  <div>${order.totalPrice.toFixed(2)}</div>
                </div>
              </div>
            </div>

        </div>
      </div>
    </div>
  );
};

export default OrderDetailPage;
