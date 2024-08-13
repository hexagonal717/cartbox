import { NavLink } from 'react-router-dom';

const ProductCard = ({ product, cart }) => {
  return (
    <NavLink
      to={{
        pathname: `/product/${product._id}`,
        state: { cart },
      }}
      className={'no-underline'}>
      <div
        className={`m-0.5 flex w-full transform cursor-pointer overflow-hidden rounded-lg border
          border-neutral-700 shadow-md transition-transform duration-200 hover:bg-neutral-800`}>
        <div className={'h-52 w-52 flex-none'}>
          <img
            src={product.image}
            alt={product.name}
            className={'h-full w-full object-cover'}
          />
        </div>
        <div className={'flex flex-1 flex-col justify-between p-4'}>
          <div>
            <h2 className={'text-md text-neutral-200'}>{product.name}</h2>
            <p className={'text-md font-bold text-springgreen-500'}>
              ${product.price}
            </p>
          </div>
          <p className={'text-base text-neutral-400'}>{product.description}</p>
        </div>
      </div>
    </NavLink>
  );
};

export default ProductCard;
