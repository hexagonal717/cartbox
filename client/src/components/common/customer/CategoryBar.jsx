import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui-custom/button.jsx';

const categories = [
  'Electronics',
  'Grocery',
  'Fashion',
  'Mobiles',
  'Home Appliances',
  'Books',
];

const CategoryBar = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    if (category === 'Mobiles') {
      navigate(
        `/product-category?subCategory=${encodeURIComponent(category.toLowerCase())}`,
      );
    } else {
      navigate(
        `/product-category?category=${encodeURIComponent(category.toLowerCase())}`,
      );
    }
  };

  return (
    <div
      className="z-30 w-full border-neutral-400/30 bg-neutral-100 px-2 py-4 text-center
        dark:bg-neutral-900 sm:fixed sm:top-[4rem]">
      <ul
        className="grid list-none grid-cols-3 grid-rows-2 items-center justify-center gap-2.5
          sm:grid-cols-3 sm:grid-rows-2 md:grid-cols-3 md:grid-rows-2 md:px-20 lg:grid-cols-6
          lg:grid-rows-1 lg:px-32">
        {categories.map((category) => (
          <li key={category} onClick={() => handleCategoryClick(category)}>
            <Button
              variant={'outline'}
              className={'h-7 w-full rounded-full text-xs sm:h-8 sm:text-sm'}>
              {category}
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryBar;
