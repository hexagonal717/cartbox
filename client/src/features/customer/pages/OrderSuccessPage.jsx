import { Link } from 'react-router-dom';

const OrderSuccessPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-900 p-4">
      <div className="w-full max-w-lg rounded-lg bg-neutral-950 p-6 shadow-lg">
        <h1 className="mb-4 text-2xl font-bold">Order Successfully Placed!</h1>
        <p className="mb-4 text-lg text-neutral-400">
          Thank you for your purchase! Your order has been successfully placed.
        </p>

        <div className="flex justify-end gap-2">
          <Link
            to={'/'}
            className="inline-block text-black rounded-md bg-yellow-500 px-4 py-2  hover:bg-yellow-600">
            Go home
          </Link>
          <Link
            to={'/orders'}
            className="inline-block rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
            View Orders
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccessPage;
