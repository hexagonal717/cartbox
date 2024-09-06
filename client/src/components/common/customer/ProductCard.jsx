import { NavLink } from 'react-router-dom';

const ProductCard = ({ product, cart }) => {
  return (
    <NavLink
      to={{
        pathname: `/product/${product._id}`,
        state: { cart },
      }}
      className="no-underline">
      <div
        className={`flex w-full transform cursor-pointer flex-row overflow-hidden rounded-lg border
          border-neutral-700 shadow-md transition-transform duration-200 hover:bg-neutral-800
          lg:flex-col`}>
        <div className="h-52 w-52 flex-none sm:w-auto">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="flex flex-col justify-between px-4 py-4 lg:ml-0 lg:mt-4">
          <h2 className="text-md text-neutral-200">{product.name}</h2>
          <p className="text-md font-bold text-springgreen-500">${product.price}</p>
        </div>
      </div>
    </NavLink>
  );
};

export default ProductCard;
