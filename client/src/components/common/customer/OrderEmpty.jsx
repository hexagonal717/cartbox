import { ShoppingBagOutlined } from '@mui/icons-material/';

const OrderEmpty = () => {
  return (
    <div
      className={
        'absolute inset-0 m-auto flex items-center justify-center bg-neutral-900 text-white'
      }>
      <div className={'flex items-center gap-4'}>
        <ShoppingBagOutlined className={'scale-150 text-purple-400'} />
        <div className={'text-2xl'}>There are no orders ¯\_(ツ)_/¯</div>
      </div>
    </div>
  );
};

export default OrderEmpty;
