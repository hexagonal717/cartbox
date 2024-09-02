

const SearchBar = ({ searchQuery, handleSearchQueryChange, handleSearchSubmit, setSuggestionWindow }) => {
  return (
    <div className="relative w-full sm:w-72 md:w-72 lg:w-[40rem] xl:w-[50rem]">
      <div className="flex items-center h-10 rounded-lg bg-neutral-900 hover:bg-neutral-800">
        <span className="pl-3">
          <svg className="w-5 h-5 text-white opacity-80" fill="currentColor" viewBox="0 0 24 24">
            <path d="M10 2a8 8 0 015.293 13.707l5.657 5.657a1 1 0 01-1.414 1.414l-5.657-5.657A8 8 0 1110 2zm0 2a6 6 0 100 12 6 6 0 000-12z"></path>
          </svg>
        </span>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchQueryChange}
          onKeyDown={handleSearchSubmit}
          onFocus={() => setSuggestionWindow(true)}
          className="w-full h-full px-2 text-sm text-white bg-transparent outline-none placeholder-neutral-500"
          placeholder="Search for products, brands and more..."
        />
      </div>
    </div>
  );
};

export default SearchBar;
