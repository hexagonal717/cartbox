import { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui-custom/input.jsx';

export default function SearchBar({
                                    searchQuery,
                                    handleSearchQueryChange,
                                    handleSearchSubmit,
                                    setSuggestionWindow,
                                  }) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="relative w-full sm:w-72 md:w-72 lg:w-[40rem] xl:w-[50rem]">
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4" />
        <Input
          className="rounded-xl py-2 pl-10 pr-4 focus-visible:ring-0 border border-neutral-300 bg-neutral-200 dark:bg-neutral-900"
          type="text"
          value={searchQuery}
          onChange={handleSearchQueryChange}
          onKeyDown={handleSearchSubmit}
          onFocus={() => {
            setIsFocused(true);
            setSuggestionWindow(true);
          }}
          onBlur={() => setIsFocused(false)}
          placeholder="Search for products, brands and more..."
        />
        {isFocused && (
          <div
            className="animate-shadow-glow-light dark:animate-shadow-glow-dark pointer-events-none absolute inset-0 overflow-hidden rounded-xl
              border border-neutral-200"
          />
        )}
      </div>
    </div>
  );
}