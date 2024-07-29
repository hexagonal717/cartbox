const CategoryBar = () => {
  return (
    <div
      className={`fixed top-14 z-30 w-full border-y border-neutral-600 bg-neutral-900/20 py-6 text-sm
        backdrop-blur-2xl`}
    >
      <ul className={'m-0 flex list-none justify-center p-0'}>
        <li className={'mx-4 cursor-pointer font-bold text-white hover:underline'}>
          Electronics
        </li>
        <li className={'mx-4 cursor-pointer font-bold text-white hover:underline'}>
          Grocery
        </li>
        <li className={'mx-4 cursor-pointer font-bold text-white hover:underline'}>
          Fashion
        </li>
        <li className={'mx-4 cursor-pointer font-bold text-white hover:underline'}>
          Mobiles
        </li>
        <li className={'mx-4 cursor-pointer font-bold text-white hover:underline'}>
          Home Appliances
        </li>
        <li className={'mx-4 cursor-pointer font-bold text-white hover:underline'}>
          Books
        </li>
      </ul>
    </div>
  );
};

export default CategoryBar;
