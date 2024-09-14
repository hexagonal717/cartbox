const SearchBar = ({
  searchQuery,
  handleSearchQueryChange,
  handleSearchSubmit,
  setSuggestionWindow,
}) => {
  return (
    <div className="relative w-full sm:w-72 md:w-72 lg:w-[40rem] xl:w-[50rem]">
      <div
        className="flex h-10 items-center rounded-lg bg-neutral-200 hover:bg-neutral-300
          dark:bg-neutral-900 dark:hover:bg-neutral-800">
        <span className="pl-3">
          <svg
            className="h-5 w-5 text-neutral-950 opacity-80 dark:text-white"
            fill="currentColor"
            viewBox="0 0 24 24">
            <path d="M10 2a8 8 0 015.293 13.707l5.657 5.657a1 1 0 01-1.414 1.414l-5.657-5.657A8 8 0 1110 2zm0 2a6 6 0 100 12 6 6 0 000-12z"></path>
          </svg>
        </span>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchQueryChange}
          onKeyDown={handleSearchSubmit}
          onFocus={() => setSuggestionWindow(true)}
          className="h-full w-full bg-transparent px-2 text-sm text-neutral-950 placeholder-neutral-500
            outline-none dark:text-white"
          placeholder="Search for products, brands and more..."
        />
      </div>
    </div>
  );
};

export default SearchBar;
