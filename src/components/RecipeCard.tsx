import React from 'react';
import { Heart, Clock, Users, ChefHat } from 'lucide-react';

export interface Recipe {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strCategory?: string;
  strArea?: string;
  strInstructions?: string;
  strYoutube?: string;
  strSource?: string;
}

interface RecipeCardProps {
  recipe: Recipe;
  isFavorite: boolean;
  onToggleFavorite: (recipe: Recipe) => void;
  onClick: (recipe: Recipe) => void;
}

const RecipeCard: React.FC<RecipeCardProps> = ({
  recipe,
  isFavorite,
  onToggleFavorite,
  onClick
}) => {
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleFavorite(recipe);
  };

  return (
    <div 
      className="recipe-card cursor-pointer group"
      onClick={() => onClick(recipe)}
    >
      {/* Image Container */}
      <div className="relative overflow-hidden h-48 sm:h-56">
        <img
          src={recipe.strMealThumb}
          alt={recipe.strMeal}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          loading="lazy"
        />
        
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Favorite Button */}
        <button
          onClick={handleFavoriteClick}
          className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-200 ${
            isFavorite
              ? 'bg-destructive text-destructive-foreground shadow-glow'
              : 'bg-surface-elevated/90 text-foreground hover:bg-surface-elevated'
          } backdrop-blur-sm`}
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <Heart 
            className={`h-4 w-4 transition-all duration-200 ${
              isFavorite ? 'fill-current' : 'hover:fill-current hover:text-destructive'
            }`} 
          />
        </button>

        {/* Category Badge */}
        {recipe.strCategory && (
          <div className="absolute top-3 left-3 px-2 py-1 bg-primary/90 text-primary-foreground text-xs font-medium rounded-full backdrop-blur-sm">
            {recipe.strCategory}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        <h3 className="font-semibold text-lg text-foreground line-clamp-2 group-hover:text-primary transition-colors duration-200">
          {recipe.strMeal}
        </h3>
        
        {/* Meta Information */}
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center space-x-4">
            {recipe.strArea && (
              <div className="flex items-center space-x-1">
                <ChefHat className="h-4 w-4" />
                <span>{recipe.strArea}</span>
              </div>
            )}
            
            <div className="flex items-center space-x-1">
              <Clock className="h-4 w-4" />
              <span>25-30 min</span>
            </div>
            
            <div className="flex items-center space-x-1">
              <Users className="h-4 w-4" />
              <span>4 serves</span>
            </div>
          </div>
        </div>

        {/* Action Area */}
        <div className="pt-2">
          <button className="w-full btn-secondary text-sm py-2 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
            View Recipe
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;