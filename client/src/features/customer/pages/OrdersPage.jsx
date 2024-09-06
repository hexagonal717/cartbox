import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import LoadingPage from '../../../components/common/customer/LoadingPage.jsx';
import { getOrder } from '../../../api/v1/customer/customerApi.js';
import { NavLink } from 'react-router-dom';
import OrderEmpty from '../../../components/common/customer/OrderEmpty.jsx';

const OrdersPage = () => {
  const customerId = useSelector(
    (state) => state.customerAuthSlice.accessToken?.customerId,
  );

  console.log(customerId, 'ORder');

  const [orderItems, setOrderItems] = useState([]);
  const [orders, setOrders] = useState([]);

  const {
    data: orderResult,
    isLoading: isOrderLoading,
    error: orderError,
  } = useQuery({
    queryKey: ['orderPage', customerId],
    queryFn: () => getOrder(customerId).then((data) => data.payload),
    enabled: !!customerId,
  });

  useEffect(() => {
    if (orderResult) {
      setOrderItems(orderResult.orderItems);
      setOrders(orderResult.orders);
    }
  }, [orderResult]);

  if (isOrderLoading) return <LoadingPage />;
  if (orderError) return <div>Error loading cart: {orderError.message}</div>;

  console.log(orderItems);

  if (orderItems.length === 0) {
    return <OrderEmpty />;
  }

  return (
    <div className="flex min-h-screen justify-center pt-20">
      <div className="flex w-4/5 flex-col px-3 sm:w-2/3 md:w-1/2 lg:w-2/6">
        <div className={'mb-4 text-3xl'}>My Orders</div>

        <div>
          {orders.map((order) => {
            return (
              <NavLink
                key={order._id}
                to={`/order/${order.orderNumber}`}
                state={{ order: order }}>
                <div>
                  <div
                    className="mt-3 flex flex-row justify-between gap-16 rounded-lg bg-neutral-950 px-4 py-6
                      text-right text-neutral-200 hover:bg-yellow-400/10 sm:gap-40 md:gap-28 lg:gap-56">
                    <div className="flex flex-col items-start justify-between">
                      <div className={'text-sm font-light'}>Order</div>
                      <div className="text-2xl font-bold text-yellow-400">
                        #{order?.orderNumber}
                      </div>
                    </div>
                  </div>
                </div>
              </NavLink>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;
