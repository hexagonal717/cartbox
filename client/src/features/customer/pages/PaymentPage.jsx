import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useQueries } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui-custom/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui-custom/select';
import { Button } from '@/components/ui-custom/button';
import { Loader2 } from 'lucide-react';
import {
  getProductList
} from '@/api/v1/customer/product/productApi.js';
import {
  getCart
} from '@/api/v1/customer/cart/cartApi.js';
import {
  addOrder
} from '@/api/v1/customer/order/orderApi.js';

export default function PaymentPage() {
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
      addOrder(customerId, cart?.items).then((res) => {
        if (res.status === 'success') {
          // dispatch(clearCart({customerId: customerId }))
          navigate('/order-success', { state: cart });
        }
      });
    }
  }, [cart?.items, customerId, paymentStatus, navigate]);

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
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="text-primary h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (productQuery.error || cartQuery.error) {
    return (
      <div className="flex text-red-500">
        Error loading data: {productQuery.error?.message || cartQuery.error?.message}
      </div>
    );
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>Order Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Total Items:</span>
            <span className="font-medium">{cart?.totalQuantity}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Total Amount:</span>
            <span className="font-medium">${cart?.totalPrice.toFixed(2)}</span>
          </div>
          <div className="space-y-2">
            <label
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed
                peer-disabled:opacity-70">
              Payment Method
            </label>
            <Select onValueChange={(value) => setPaymentMethod(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select a payment method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Credit Card">Credit Card</SelectItem>
                <SelectItem value="PayPal">PayPal</SelectItem>
                <SelectItem value="UPI">UPI</SelectItem>
                <SelectItem value="Cash on Delivery">Cash on Delivery</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={handlePayment}>
            {paymentStatus === 'processing' ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing
              </>
            ) : (
              'Submit Payment'
            )}
          </Button>
        </CardFooter>
      </Card>
      <div className="mt-6 text-center">
        <h3 className="text-lg font-semibold">
          Payment Status:{' '}
          <span
            className={`capitalize ${
              paymentStatus === 'completed'
                ? 'text-green-600'
                : paymentStatus === 'processing'
                  ? 'text-yellow-600'
                  : 'text-red-600'
              }`}>
            {paymentStatus}
          </span>
        </h3>
      </div>
    </div>
  );
}
