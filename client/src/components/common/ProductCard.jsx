import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <NavLink to={`/product/${product._id}`} className="no-underline">
      <div
        className="m-0.5 flex w-full transform cursor-pointer overflow-hidden rounded-lg border
          border-neutral-700 shadow-md transition-transform duration-200 hover:bg-neutral-800"
      >
        <div className="h-52 w-52 flex-none">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="flex flex-1 flex-col justify-start gap-2 p-4">
          <h2 className="text-xl text-neutral-200">{product.name}</h2>
          <p className="text-lg font-bold text-springgreen-500">${product.price}</p>
          <p className="text-base text-neutral-400">{product.description}</p>
        </div>
      </div>
    </NavLink>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    subCategory: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
};

export default ProductCard;
