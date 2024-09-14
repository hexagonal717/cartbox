import { ShoppingBagOutlined } from '@mui/icons-material/';

const CartEmpty = () => {
  return (
    <div
      className={`absolute inset-0 m-auto flex items-center justify-center bg-neutral-200
        dark:bg-neutral-900`}>
      <div className={'flex items-center gap-4'}>
        <ShoppingBagOutlined
          className={'scale-150 text-purple-700 dark:text-purple-400'}
        />
        <div className={'text-2xl dark:text-white'}>is empty ¯\_(ツ)_/¯</div>
      </div>
    </div>
  );
};

export default CartEmpty;
