const CategoryBar = () => {
  return (
    <div
      className={`fixed top-[4rem] z-30 w-full rounded-b-lg border border-neutral-400/30 bg-neutral-900
        py-6 text-center text-xs text-white`}>
      <ul className={'flex list-none justify-between px-20'}>
        <li className={'mx-4 cursor-pointer font-bold hover:underline'}>
          Electronics
        </li>
        <li className={'mx-4 cursor-pointer font-bold hover:underline'}>Grocery</li>
        <li className={'mx-4 cursor-pointer font-bold hover:underline'}>Fashion</li>
        <li className={'mx-4 cursor-pointer font-bold hover:underline'}>Mobiles</li>
        <li className={'mx-4 cursor-pointer font-bold hover:underline'}>
          Home Appliances
        </li>
        <li className={'mx-4 cursor-pointer font-bold hover:underline'}>Books</li>
      </ul>
    </div>
  );
};

export default CategoryBar;
