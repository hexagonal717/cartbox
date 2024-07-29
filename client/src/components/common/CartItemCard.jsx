import { RemoveShoppingCartOutlined } from '@mui/icons-material';

const CartItemCard = (product) => {
  console.log(product.product, 'PRODCT');

  return (
    <>
      <div
        className={`h-min-content border-b-0.5 border-t-0.5 grid grid-cols-[1fr_3fr_1fr] gap-8 border
          border-neutral-700 bg-yellow-100/10 p-8 text-neutral-200`}
      >
        <div className={'relative block w-min'}>
          <img
            src={product.product?.image}
            alt=""
            className={'relative flex h-auto w-40'}
          />
        </div>
        <div className={'flex w-full'}>
          <div>
            <div className={'pt-8 text-left text-xl font-bold'}>
              {`${product.product?.name}`}
            </div>
            <div className={'mt-4 flex w-60 flex-col gap-4 rounded p-4'}>
              <div className={'flex justify-between'}>
                <span>
                  <b className={'text-neutral-400'}>•&emsp;Display Size</b>
                </span>
                <span>{'5.2'} inches</span>
              </div>
              <div className={'flex justify-between'}>
                <span>
                  <b className={'text-neutral-400'}>•&emsp;RAM</b>
                </span>
                <span>{product.name} GB</span>
              </div>
              <div className={'flex justify-between'}>
                <span>
                  <b className={'text-neutral-400'}>•&emsp;Storage</b>
                </span>
                <span>{product.name} GB</span>
              </div>
              <div className={'flex justify-between'}>
                <span>
                  <b className={'text-neutral-400'}>•&emsp;Release Year</b>
                </span>
                <span>{product.name}</span>
              </div>
            </div>
          </div>
        </div>
        <div
          className={
            'flex flex-col items-end justify-between p-8 text-right text-2xl font-bold'
          }
        >
          <div>
            <div className={'m-4'}>{product.name}</div>
            <div>₹{product.price && product.price}&nbsp;</div>
          </div>
          <div
            className={`mt-8 flex h-max w-max scale-[1.5] items-center justify-between rounded-md border
              border-neutral-700 bg-neutral-900`}
          >
            <button
              className={`h-5 w-6 rounded-l-md border-r border-neutral-700 bg-yellow-400/10 text-center
                text-white hover:bg-yellow-400/20`}
              onClick={() => {}}
            >
              <div className={'translate-y-[-10%]'}>-</div>
            </button>
            <div className={'3 w-6 p-0 text-xs'}>
              <b>Qty. {product.quantity}</b>
            </div>
            <button
              className={`h-5 w-6 rounded-r-md border-l border-neutral-700 bg-yellow-400/10 text-center
                font-bold text-white hover:bg-yellow-400/20`}
              onClick={() => {}}
            >
              <div className={'translate-y-[-10%]'}>+</div>
            </button>
          </div>
          <button
            className={
              'rounded-md border border-neutral-700 px-8 py-1 text-yellow-400 hover:bg-yellow-400/20'
            }
            onClick={() => {}}
          >
            <RemoveShoppingCartOutlined />
          </button>
        </div>
      </div>
    </>
  );
};

export default CartItemCard;
