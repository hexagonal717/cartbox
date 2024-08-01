import {
  useDispatch,
  useSelector,
} from 'react-redux';
import {
  addCartInfo,
  decQuantity,
  removeCartItem,
} from '../redux/cartSlice.js';
import {
  RemoveShoppingCartOutlined,
  ShoppingCartOutlined,
} from '@mui/icons-material';
import {
  Link,
} from 'react-router-dom';
import CartEmpty
  from '../../../components/common/CartEmpty.jsx';

const CartPage = () => {
  const CartData = useSelector((state) => state.cartSlice.cartInfo);
  console.log(CartData);

  const dispatch = useDispatch();

  function totalPrice() {
    const price = CartData.map((li) => {
      return li.price.inr * li.quantity;
    });

    console.log('price', price);

    return price.reduce((a, b) => {
      return a + b;
    });
  }

  function addQuantity(item) {
    dispatch(addCartInfo(item));
  }

  function subQuantity(item) {
    dispatch(decQuantity(item));
  }

  function removeItem(item) {
    dispatch(removeCartItem(item));
  }

  return CartData && CartData.length > 0 ? (
    <>
      <div className="absolute flex w-full justify-center gap-8 bg-neutral-950 p-[8%_10%_0_10%] text-white">
        <div
          className="border-t-0.5 border-l-0.5 border-r-0.5 flex min-h-screen flex-col gap-1 rounded-t-lg
            border border-neutral-700 bg-neutral-900"
        >
          <div className="m-4 text-center text-4xl font-light">Cart</div>
          {CartData !== [] &&
            CartData.map((item) => (
              <div
                key={item.id}
                className="h-min-content border-t-0.5 border-b-0.5 grid grid-cols-[1fr_3fr_1fr] gap-8 border
                  border-neutral-700 bg-yellow-100/10 p-8 text-neutral-200"
              >
                <div className="relative block w-min">
                  <img src={item.img} alt="" className="relative flex h-auto w-40" />
                </div>
                <div className="flex w-full">
                  <div>
                    <div className="pt-8 text-left text-xl font-bold">
                      {`${item.brand} ${item.model}`}
                    </div>
                    <div className="mt-4 flex w-60 flex-col gap-4 rounded p-4">
                      <div className="flex justify-between">
                        <span>
                          <b className="text-neutral-400">•&emsp;Display Size</b>
                        </span>
                        <span>{item.display_size_inches} inches</span>
                      </div>
                      <div className="flex justify-between">
                        <span>
                          <b className="text-neutral-400">•&emsp;RAM</b>
                        </span>
                        <span>{item.ram_gb} GB</span>
                      </div>
                      <div className="flex justify-between">
                        <span>
                          <b className="text-neutral-400">•&emsp;Storage</b>
                        </span>
                        <span>{item.storage_gb} GB</span>
                      </div>
                      <div className="flex justify-between">
                        <span>
                          <b className="text-neutral-400">•&emsp;Release Year</b>
                        </span>
                        <span>{item.release_year}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end justify-between p-8 text-right text-2xl font-bold">
                  <div>
                    <div className="m-4">{item.star_rating}</div>
                    <div>₹{item.price && item.price.inr}&nbsp;</div>
                  </div>
                  <div
                    className="mt-8 flex h-max w-max scale-[1.5] items-center justify-between rounded-md border
                      border-neutral-700 bg-neutral-900"
                  >
                    <button
                      className="h-5 w-6 rounded-l-md border-r border-neutral-700 bg-yellow-400/10 text-center
                        text-white hover:bg-yellow-400/20"
                      onClick={() => subQuantity(item)}
                    >
                      <div className="translate-y-[-10%]">-</div>
                    </button>
                    <div className="3 w-6 p-0 text-xs">
                      <b>Qty. {item.quantity}</b>
                    </div>
                    <button
                      className="h-5 w-6 rounded-r-md border-l border-neutral-700 bg-yellow-400/10 text-center
                        font-bold text-white hover:bg-yellow-400/20"
                      onClick={() => addQuantity(item)}
                    >
                      <div className="translate-y-[-10%]">+</div>
                    </button>
                  </div>
                  <button
                    className="rounded-md border border-neutral-700 px-8 py-1 text-yellow-400 hover:bg-yellow-400/20"
                    onClick={() => removeItem(item)}
                  >
                    <RemoveShoppingCartOutlined />
                  </button>
                </div>
              </div>
            ))}
        </div>
        <div
          className="fixed right-[min(10%,_50%)] top-[17%] flex h-fit w-[20%] flex-col justify-between
            rounded-lg border-[0.4rem] border-neutral-900/50 bg-yellow-400 p-4 text-black"
        >
          <div>
            {CartData.map((item) => {
              return (
                <div
                  key={item.id}
                  className="flex w-full justify-between p-2.5 font-light"
                >
                  <div className="mr-12">
                    {item.brand} {item.model} x {item.quantity}
                  </div>
                  <div>₹{item.price.inr * item.quantity}</div>
                </div>
              );
            })}
          </div>

          <div className="mb-4 mt-16 flex justify-between text-xl font-bold">
            <div>Total</div>
            <div>₹{totalPrice()}</div>
          </div>
          <div>
            <Link to={'/order'} className="no-underline">
              <button
                className="flex h-12 w-full items-center justify-center gap-2 rounded-md border
                  border-neutral-500 bg-neutral-900 text-lg font-bold text-white shadow-md
                  backdrop-blur-lg transition duration-200 hover:bg-white hover:text-black
                  hover:shadow-yellow-400/50"
              >
                <ShoppingCartOutlined />
                <div>Buy Now</div>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  ) : (
    <CartEmpty />
  );
};

export default CartPage;
