import React from 'react';
import { 
  ArrowLeft, 
  Heart, 
  Clock, 
  Users, 
  ChefHat,
  Globe,
  ExternalLink,
  Youtube,
  Share2,
  Download
} from 'lucide-react';
import { Recipe } from './RecipeCard';
import { useToast } from '@/hooks/use-toast';

interface RecipeDetailProps {
  recipe: Recipe | null;
  isFavorite: boolean;
  onToggleFavorite: (recipe: Recipe) => void;
  onBack: () => void;
}

const RecipeDetail: React.FC<RecipeDetailProps> = ({
  recipe,
  isFavorite,
  onToggleFavorite,
  onBack
}) => {
  const { toast } = useToast();

  if (!recipe) return null;

  // Parse ingredients from the recipe object
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = recipe[`strIngredient${i}` as keyof Recipe];
    const measure = recipe[`strMeasure${i}` as keyof Recipe];
    if (ingredient && ingredient.trim()) {
      ingredients.push({
        name: ingredient.trim(),
        measure: measure?.trim() || ''
      });
    }
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: recipe.strMeal,
          text: `Check out this amazing ${recipe.strMeal} recipe!`,
          url: window.location.href
        });
      } catch (error) {
        // User cancelled sharing
      }
    } else {
      // Fallback to clipboard
      await navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link copied!",
        description: "Recipe link copied to clipboard.",
      });
    }
  };

  const openYouTubeVideo = () => {
    if (recipe.strYoutube) {
      window.open(recipe.strYoutube, '_blank');
    }
  };

  const openSource = () => {
    if (recipe.strSource) {
      window.open(recipe.strSource, '_blank');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 bg-surface-elevated/95 backdrop-blur-sm border-b border-border z-40">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={onBack}
              className="flex items-center space-x-2 text-foreground hover:text-primary transition-colors duration-200"
            >
              <ArrowLeft className="h-5 w-5" />
              <span className="font-medium">Back to recipes</span>
            </button>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={handleShare}
                className="p-2 text-muted-foreground hover:text-foreground transition-colors duration-200"
                title="Share recipe"
              >
                <Share2 className="h-5 w-5" />
              </button>
              
              <button
                onClick={() => onToggleFavorite(recipe)}
                className={`p-2 rounded-lg transition-all duration-200 ${
                  isFavorite
                    ? 'text-destructive bg-destructive/10'
                    : 'text-muted-foreground hover:text-destructive hover:bg-destructive/10'
                }`}
                title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
              >
                <Heart className={`h-5 w-5 ${isFavorite ? 'fill-current' : ''}`} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        {/* Hero Section */}
        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Image */}
          <div className="relative">
            <img
              src={recipe.strMealThumb}
              alt={recipe.strMeal}
              className="w-full aspect-square object-cover rounded-2xl shadow-medium"
            />
            {recipe.strCategory && (
              <div className="absolute top-4 left-4 px-3 py-1 bg-primary text-primary-foreground rounded-full text-sm font-medium">
                {recipe.strCategory}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                {recipe.strMeal}
              </h1>
              
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                {recipe.strArea && (
                  <div className="flex items-center space-x-2">
                    <Globe className="h-4 w-4" />
                    <span>{recipe.strArea} Cuisine</span>
                  </div>
                )}
                
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4" />
                  <span>25-30 minutes</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4" />
                  <span>Serves 4</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <ChefHat className="h-4 w-4" />
                  <span>Intermediate</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              {recipe.strYoutube && (
                <button
                  onClick={openYouTubeVideo}
                  className="btn-primary flex items-center justify-center space-x-2"
                >
                  <Youtube className="h-5 w-5" />
                  <span>Watch Video</span>
                </button>
              )}
              
              {recipe.strSource && (
                <button
                  onClick={openSource}
                  className="btn-secondary flex items-center justify-center space-x-2"
                >
                  <ExternalLink className="h-5 w-5" />
                  <span>Original Source</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Ingredients */}
        <div className="bg-card rounded-2xl p-6 shadow-soft">
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center space-x-2">
            <ChefHat className="h-6 w-6 text-primary" />
            <span>Ingredients</span>
          </h2>
          
          <div className="grid sm:grid-cols-2 gap-3">
            {ingredients.map((ingredient, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-surface rounded-lg hover:bg-surface-elevated transition-colors duration-200"
              >
                <span className="font-medium text-foreground">{ingredient.name}</span>
                {ingredient.measure && (
                  <span className="text-muted-foreground text-sm">{ingredient.measure}</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-card rounded-2xl p-6 shadow-soft">
          <h2 className="text-2xl font-bold text-foreground mb-6">Instructions</h2>
          
          <div className="prose prose-lg max-w-none">
            {recipe.strInstructions?.split('\n').map((step, index) => {
              if (!step.trim()) return null;
              
              return (
                <div key={index} className="mb-4 p-4 bg-surface rounded-lg">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </div>
                    <p className="text-foreground leading-relaxed">{step.trim()}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;