import { useState, useEffect } from 'react';
import { Recipe } from '../components/RecipeCard';

const FAVORITES_STORAGE_KEY = 'recipe-favorites';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<Recipe[]>([]);

  // Load favorites from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(FAVORITES_STORAGE_KEY);
      if (stored) {
        const parsedFavorites = JSON.parse(stored);
        setFavorites(Array.isArray(parsedFavorites) ? parsedFavorites : []);
      }
    } catch (error) {
      console.error('Error loading favorites from localStorage:', error);
      setFavorites([]);
    }
  }, []);

  // Save to localStorage whenever favorites change
  useEffect(() => {
    try {
      localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
    } catch (error) {
      console.error('Error saving favorites to localStorage:', error);
    }
  }, [favorites]);

  const addToFavorites = (recipe: Recipe) => {
    setFavorites(prev => {
      const exists = prev.some(fav => fav.idMeal === recipe.idMeal);
      if (!exists) {
        return [...prev, recipe];
      }
      return prev;
    });
  };

  const removeFromFavorites = (recipeId: string) => {
    setFavorites(prev => prev.filter(fav => fav.idMeal !== recipeId));
  };

  const toggleFavorite = (recipe: Recipe) => {
    const isCurrentlyFavorite = favorites.some(fav => fav.idMeal === recipe.idMeal);
    
    if (isCurrentlyFavorite) {
      removeFromFavorites(recipe.idMeal);
    } else {
      addToFavorites(recipe);
    }
    
    return !isCurrentlyFavorite; // Return new favorite status
  };

  const isFavorite = (recipeId: string): boolean => {
    return favorites.some(fav => fav.idMeal === recipeId);
  };

  const clearAllFavorites = () => {
    setFavorites([]);
  };

  return {
    favorites,
    addToFavorites,
    removeFromFavorites,
    toggleFavorite,
    isFavorite,
    clearAllFavorites,
    favoriteCount: favorites.length
  };
};