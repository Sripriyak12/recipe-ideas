import { Recipe } from '../components/RecipeCard';

const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

export interface RecipeSearchResponse {
  meals: Recipe[] | null;
}

export interface RecipeDetailResponse {
  meals: Recipe[] | null;
}

class RecipeService {
  /**
   * Search recipes by ingredient
   */
  async searchByIngredient(ingredient: string): Promise<Recipe[]> {
    try {
      const response = await fetch(`${BASE_URL}/filter.php?i=${encodeURIComponent(ingredient)}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data: RecipeSearchResponse = await response.json();
      
      if (!data.meals) {
        return [];
      }
      
      // Get detailed information for each recipe to include instructions
      const detailedRecipes = await Promise.all(
        data.meals.slice(0, 12).map(async (recipe) => {
          try {
            const detailResponse = await fetch(`${BASE_URL}/lookup.php?i=${recipe.idMeal}`);
            const detailData: RecipeDetailResponse = await detailResponse.json();
            return detailData.meals?.[0] || recipe;
          } catch {
            return recipe; // Return basic recipe if detailed fetch fails
          }
        })
      );
      
      return detailedRecipes;
    } catch (error) {
      console.error('Error searching recipes by ingredient:', error);
      throw new Error('Failed to search recipes. Please try again.');
    }
  }

  /**
   * Get a random recipe
   */
  async getRandomRecipe(): Promise<Recipe> {
    try {
      const response = await fetch(`${BASE_URL}/random.php`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data: RecipeDetailResponse = await response.json();
      
      if (!data.meals || data.meals.length === 0) {
        throw new Error('No random recipe found');
      }
      
      return data.meals[0];
    } catch (error) {
      console.error('Error getting random recipe:', error);
      throw new Error('Failed to get random recipe. Please try again.');
    }
  }

  /**
   * Get recipe details by ID
   */
  async getRecipeById(id: string): Promise<Recipe | null> {
    try {
      const response = await fetch(`${BASE_URL}/lookup.php?i=${id}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data: RecipeDetailResponse = await response.json();
      
      return data.meals?.[0] || null;
    } catch (error) {
      console.error('Error getting recipe by ID:', error);
      throw new Error('Failed to get recipe details. Please try again.');
    }
  }

  /**
   * Search recipes by multiple criteria (future enhancement)
   */
  async searchByCategory(category: string): Promise<Recipe[]> {
    try {
      const response = await fetch(`${BASE_URL}/filter.php?c=${encodeURIComponent(category)}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data: RecipeSearchResponse = await response.json();
      
      return data.meals || [];
    } catch (error) {
      console.error('Error searching recipes by category:', error);
      throw new Error('Failed to search recipes by category. Please try again.');
    }
  }

  /**
   * Search recipes by cuisine area
   */
  async searchByArea(area: string): Promise<Recipe[]> {
    try {
      const response = await fetch(`${BASE_URL}/filter.php?a=${encodeURIComponent(area)}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data: RecipeSearchResponse = await response.json();
      
      return data.meals || [];
    } catch (error) {
      console.error('Error searching recipes by area:', error);
      throw new Error('Failed to search recipes by area. Please try again.');
    }
  }
}

export const recipeService = new RecipeService();