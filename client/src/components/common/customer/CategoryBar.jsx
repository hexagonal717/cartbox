import { useNavigate } from 'react-router-dom';

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
      className="fixed top-[4rem] z-30 w-full border-neutral-400/30 bg-neutral-100 px-2 py-5
        text-center text-xs text-white dark:bg-neutral-900">
      <ul
        className="grid list-none grid-cols-3 grid-rows-2 items-center justify-center gap-2.5
          sm:grid-cols-3 sm:grid-rows-2 md:grid-cols-3 md:grid-rows-2 md:px-20 lg:grid-cols-6
          lg:grid-rows-1 lg:px-32">
        {categories.map((category) => (
          <li
            key={category}
            className="cursor-pointer rounded-lg bg-white p-2 font-bold text-neutral-950 shadow-md
              hover:bg-neutral-100 dark:bg-neutral-800 dark:text-white dark:hover:bg-neutral-200
              dark:hover:text-black"
            onClick={() => handleCategoryClick(category)}>
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryBar;
