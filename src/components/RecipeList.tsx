import React from 'react';
import { AlertCircle, ChefHat } from 'lucide-react';
import RecipeCard, { Recipe } from './RecipeCard';

interface RecipeListProps {
  recipes: Recipe[];
  favorites: Recipe[];
  onToggleFavorite: (recipe: Recipe) => void;
  onRecipeClick: (recipe: Recipe) => void;
  searchQuery?: string;
  isLoading: boolean;
}

const RecipeList: React.FC<RecipeListProps> = ({
  recipes,
  favorites,
  onToggleFavorite,
  onRecipeClick,
  searchQuery,
  isLoading
}) => {
  const isFavorite = (recipe: Recipe) => {
    return favorites.some(fav => fav.idMeal === recipe.idMeal);
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-16 space-y-4">
        <div className="loading-spinner h-12 w-12"></div>
        <p className="text-lg text-muted-foreground">Searching for delicious recipes...</p>
      </div>
    );
  }

  if (recipes.length === 0 && searchQuery) {
    return (
      <div className="flex flex-col items-center justify-center py-16 space-y-6 text-center max-w-md mx-auto">
        <div className="p-4 bg-warning/10 rounded-full">
          <AlertCircle className="h-12 w-12 text-warning" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-foreground mb-2">
            No recipes found
          </h3>
          <p className="text-muted-foreground">
            We couldn't find any recipes with "{searchQuery}". Try searching for different ingredients like chicken, pasta, or salmon.
          </p>
        </div>
        <div className="bg-secondary/50 rounded-lg p-4 space-y-2">
          <p className="font-medium text-secondary-foreground text-sm">💡 Search Tips:</p>
          <ul className="text-sm text-muted-foreground space-y-1 text-left">
            <li>• Use common ingredients (chicken, beef, pasta)</li>
            <li>• Try single words instead of phrases</li>
            <li>• Check spelling of ingredient names</li>
          </ul>
        </div>
      </div>
    );
  }

  if (recipes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 space-y-4 text-center">
        <div className="p-4 bg-primary/10 rounded-full">
          <ChefHat className="h-12 w-12 text-primary" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-foreground mb-2">
            Ready to cook?
          </h3>
          <p className="text-muted-foreground">
            Search for ingredients above to discover amazing recipes!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {searchQuery && (
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground">
            Recipes with "{searchQuery}"
          </h2>
          <p className="text-muted-foreground mt-2">
            Found {recipes.length} delicious recipe{recipes.length !== 1 ? 's' : ''}
          </p>
        </div>
      )}
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {recipes.map((recipe, index) => (
          <div 
            key={recipe.idMeal} 
            className="fade-in"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <RecipeCard
              recipe={recipe}
              isFavorite={isFavorite(recipe)}
              onToggleFavorite={onToggleFavorite}
              onClick={onRecipeClick}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipeList;