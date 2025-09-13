import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useFavorites } from '../hooks/useFavorites';
import { recipeService } from '../services/recipeService';
import { Recipe } from '../components/RecipeCard';

// Components
import Navbar from '../components/Navbar';
import HomePage from '../components/HomePage';
import RecipeList from '../components/RecipeList';
import RecipeDetail from '../components/RecipeDetail';
import FavoritesPage from '../components/FavoritesPage';

type View = 'home' | 'search' | 'favorites' | 'detail';

const Index = () => {
  const { toast } = useToast();
  const { 
    favorites, 
    toggleFavorite, 
    isFavorite, 
    clearAllFavorites, 
    favoriteCount 
  } = useFavorites();

  // State management
  const [currentView, setCurrentView] = useState<View>('home');
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  // Search recipes by ingredient
  const handleSearch = async (query: string) => {
    if (!query.trim()) return;

    setIsLoading(true);
    setError('');
    setSearchQuery(query);
    
    try {
      const results = await recipeService.searchByIngredient(query);
      setRecipes(results);
      setCurrentView('search');
      
      if (results.length === 0) {
        toast({
          title: "No recipes found",
          description: `We couldn't find any recipes with "${query}". Try different ingredients.`,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Recipes found!",
          description: `Found ${results.length} delicious recipes with "${query}".`,
        });
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to search recipes';
      setError(errorMessage);
      toast({
        title: "Search failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Get random recipe
  const handleRandomRecipe = async () => {
    setIsLoading(true);
    setError('');
    
    try {
      const randomRecipe = await recipeService.getRandomRecipe();
      setSelectedRecipe(randomRecipe);
      setCurrentView('detail');
      
      toast({
        title: "Random recipe found!",
        description: `Here's a delicious ${randomRecipe.strMeal} recipe for you.`,
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to get random recipe';
      setError(errorMessage);
      toast({
        title: "Failed to get random recipe",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle recipe click
  const handleRecipeClick = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    setCurrentView('detail');
  };

  // Handle favorite toggle with toast
  const handleToggleFavorite = (recipe: Recipe) => {
    const wasAdded = toggleFavorite(recipe);
    
    toast({
      title: wasAdded ? "Added to favorites" : "Removed from favorites",
      description: wasAdded 
        ? `${recipe.strMeal} has been added to your favorites.`
        : `${recipe.strMeal} has been removed from your favorites.`,
    });
  };

  // Handle navigation
  const handleViewChange = (view: 'home' | 'search' | 'favorites') => {
    setCurrentView(view);
    setError('');
    
    // Reset search state when going home
    if (view === 'home') {
      setRecipes([]);
      setSearchQuery('');
      setSelectedRecipe(null);
    }
  };

  // Handle back from detail view
  const handleBackFromDetail = () => {
    if (recipes.length > 0) {
      setCurrentView('search');
    } else if (favorites.length > 0 && currentView === 'detail') {
      setCurrentView('favorites');
    } else {
      setCurrentView('home');
    }
    setSelectedRecipe(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar 
        currentView={currentView === 'detail' ? 'home' : currentView}
        onViewChange={handleViewChange}
        favoriteCount={favoriteCount}
      />
      
      <main className="pb-8">
        {error && (
          <div className="bg-destructive/10 border border-destructive/20 text-destructive px-4 py-3 text-center">
            {error}
          </div>
        )}

        {currentView === 'home' && (
          <HomePage
            onSearch={handleSearch}
            onRandomRecipe={handleRandomRecipe}
            isLoading={isLoading}
          />
        )}

        {currentView === 'search' && (
          <div className="py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <RecipeList
                recipes={recipes}
                favorites={favorites}
                onToggleFavorite={handleToggleFavorite}
                onRecipeClick={handleRecipeClick}
                searchQuery={searchQuery}
                isLoading={isLoading}
              />
            </div>
          </div>
        )}

        {currentView === 'favorites' && (
          <FavoritesPage
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
            onRecipeClick={handleRecipeClick}
            onClearAllFavorites={clearAllFavorites}
          />
        )}

        {currentView === 'detail' && selectedRecipe && (
          <RecipeDetail
            recipe={selectedRecipe}
            isFavorite={isFavorite(selectedRecipe.idMeal)}
            onToggleFavorite={handleToggleFavorite}
            onBack={handleBackFromDetail}
          />
        )}
      </main>
    </div>
  );
};

export default Index;
