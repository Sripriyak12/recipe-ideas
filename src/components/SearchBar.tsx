import React, { useState } from 'react';
import { Search, Loader2, Shuffle } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  onRandomRecipe: () => void;
  isLoading: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, onRandomRecipe, isLoading }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  const popularIngredients = [
    'chicken', 'pasta', 'salmon', 'beef', 'vegetables', 'rice',
    'cheese', 'tomato', 'mushroom', 'garlic'
  ];

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Main Search Form */}
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search recipes by ingredient (e.g., chicken, pasta, salmon...)"
            className="search-input pr-12 text-lg h-14"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !query.trim()}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-primary text-primary-foreground rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary-hover transition-colors duration-200"
          >
            {isLoading ? (
              <Loader2 className="h-6 w-6 animate-spin" />
            ) : (
              <Search className="h-6 w-6" />
            )}
          </button>
        </div>
      </form>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
        <button
          onClick={onRandomRecipe}
          disabled={isLoading}
          className="btn-accent flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Shuffle size={20} />
          <span>Get Random Recipe</span>
        </button>
      </div>

      {/* Popular Ingredients */}
      <div className="text-center">
        <p className="text-muted-foreground mb-3 font-medium">Popular Ingredients:</p>
        <div className="flex flex-wrap justify-center gap-2">
          {popularIngredients.map((ingredient) => (
            <button
              key={ingredient}
              onClick={() => {
                setQuery(ingredient);
                onSearch(ingredient);
              }}
              disabled={isLoading}
              className="px-4 py-2 bg-secondary text-secondary-foreground rounded-full text-sm font-medium hover:bg-secondary-hover transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {ingredient}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchBar;