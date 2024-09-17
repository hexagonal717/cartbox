import { NavLink } from 'react-router-dom';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';

const ProductCard = ({ product, cart }) => {
  return (
    <NavLink
      to={{
        pathname: `/product/${product._id}`,
        state: { cart },
      }}
      className="no-underline">
      <Card
        className="flex h-full w-full flex-col overflow-hidden rounded-lg border p-2 shadow-md
          transition-transform duration-300 hover:scale-[101%] hover:shadow-lg
          dark:border-neutral-800 dark:bg-neutral-950/50 lg:max-w-sm">
        {' '}
        {/* Product Image */}
        <CardHeader className="p-0">
          <div className="relative h-48 w-full rounded-sm overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-cover"
            />
          </div>
        </CardHeader>
        {/* Product Details */}
        <CardContent className="flex flex-grow flex-col justify-between px-4 py-4 lg:mt-4">
          <CardTitle className="text-sm">{product.name}</CardTitle>
          <CardDescription className="text-sm text-springgreen-700 dark:text-springgreen-400">
            ${product.price}
          </CardDescription>
        </CardContent>
        {/* Card Footer */}
        {/*<CardFooter className="flex justify-end px-4 py-4">*/}
        {/*  <Button variant="default" className="flex items-center gap-2">*/}
        {/*    <ShoppingCart className="w-4 h-4" />*/}
        {/*    Add to Cart*/}
        {/*  </Button>*/}
        {/*</CardFooter>*/}
      </Card>
    </NavLink>
  );
};

export default ProductCard;
