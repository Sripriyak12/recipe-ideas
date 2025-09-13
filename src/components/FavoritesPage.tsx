import React from 'react';
import { Heart, ChefHat, Trash2 } from 'lucide-react';
import RecipeCard, { Recipe } from './RecipeCard';
import { useToast } from '@/hooks/use-toast';

interface FavoritesPageProps {
  favorites: Recipe[];
  onToggleFavorite: (recipe: Recipe) => void;
  onRecipeClick: (recipe: Recipe) => void;
  onClearAllFavorites: () => void;
}

const FavoritesPage: React.FC<FavoritesPageProps> = ({
  favorites,
  onToggleFavorite,
  onRecipeClick,
  onClearAllFavorites
}) => {
  const { toast } = useToast();

  const handleClearAll = () => {
    if (favorites.length === 0) return;
    
    const confirmed = window.confirm(
      `Are you sure you want to remove all ${favorites.length} favorite recipes?`
    );
    
    if (confirmed) {
      onClearAllFavorites();
      toast({
        title: "Favorites cleared",
        description: "All favorite recipes have been removed.",
        variant: "destructive",
      });
    }
  };

  if (favorites.length === 0) {
    return (
      <div className="min-h-screen bg-background py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8">
            {/* Empty State */}
            <div className="flex flex-col items-center space-y-6">
              <div className="p-6 bg-primary/10 rounded-full">
                <Heart className="h-16 w-16 text-primary" />
              </div>
              
              <div className="space-y-4">
                <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                  No favorites yet
                </h1>
                <p className="text-xl text-muted-foreground max-w-md mx-auto leading-relaxed">
                  Start exploring recipes and save your favorites by clicking the heart icon on any recipe card.
                </p>
              </div>

              {/* Tips Card */}
              <div className="bg-card rounded-2xl p-6 shadow-soft max-w-md mx-auto space-y-4">
                <h3 className="font-semibold text-foreground flex items-center space-x-2">
                  <ChefHat className="h-5 w-5 text-primary" />
                  <span>How to add favorites:</span>
                </h3>
                <ul className="text-sm text-muted-foreground space-y-2 text-left">
                  <li className="flex items-start space-x-2">
                    <span className="text-primary">1.</span>
                    <span>Search for recipes using ingredients</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-primary">2.</span>
                    <span>Click the heart icon on recipe cards</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-primary">3.</span>
                    <span>Find them here in your favorites</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground flex items-center space-x-3">
                <Heart className="h-8 w-8 text-destructive fill-current" />
                <span>My Favorites</span>
              </h1>
              <p className="text-muted-foreground mt-2">
                You have {favorites.length} saved recipe{favorites.length !== 1 ? 's' : ''}
              </p>
            </div>

            {/* Clear All Button */}
            <button
              onClick={handleClearAll}
              className="flex items-center space-x-2 px-4 py-2 text-destructive hover:bg-destructive/10 rounded-lg transition-colors duration-200 font-medium"
            >
              <Trash2 className="h-4 w-4" />
              <span>Clear All</span>
            </button>
          </div>

          {/* Favorites Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {favorites.map((recipe, index) => (
              <div 
                key={recipe.idMeal}
                className="fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <RecipeCard
                  recipe={recipe}
                  isFavorite={true}
                  onToggleFavorite={onToggleFavorite}
                  onClick={onRecipeClick}
                />
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="bg-card rounded-2xl p-6 shadow-soft">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div className="space-y-2">
                <div className="text-2xl font-bold text-primary">{favorites.length}</div>
                <div className="text-sm text-muted-foreground">Total Favorites</div>
              </div>
              
              <div className="space-y-2">
                <div className="text-2xl font-bold text-primary">
                  {new Set(favorites.map(recipe => recipe.strCategory)).size}
                </div>
                <div className="text-sm text-muted-foreground">Categories</div>
              </div>
              
              <div className="space-y-2">
                <div className="text-2xl font-bold text-primary">
                  {new Set(favorites.map(recipe => recipe.strArea)).size}
                </div>
                <div className="text-sm text-muted-foreground">Cuisines</div>
              </div>
              
              <div className="space-y-2">
                <div className="text-2xl font-bold text-primary">
                  {Math.round(favorites.length * 30)}min
                </div>
                <div className="text-sm text-muted-foreground">Cook Time</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FavoritesPage;