import React from 'react';
import { ChefHat, Heart, Home } from 'lucide-react';

interface NavbarProps {
  currentView: 'home' | 'favorites';
  onViewChange: (view: 'home' | 'favorites') => void;
  favoriteCount: number;
}

const Navbar: React.FC<NavbarProps> = ({ currentView, onViewChange, favoriteCount }) => {
  return (
    <nav className="bg-surface-elevated shadow-soft border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-gradient-primary rounded-lg">
              <ChefHat className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">RecipeIdeas</span>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => onViewChange('home')}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg font-medium transition-all duration-200 ${
                currentView === 'home'
                  ? 'bg-primary text-primary-foreground'
                  : 'text-foreground hover:bg-secondary hover:text-secondary-foreground'
              }`}
            >
              <Home size={20} />
              <span>Home</span>
            </button>

            <button
              onClick={() => onViewChange('favorites')}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg font-medium transition-all duration-200 relative ${
                currentView === 'favorites'
                  ? 'bg-primary text-primary-foreground'
                  : 'text-foreground hover:bg-secondary hover:text-secondary-foreground'
              }`}
            >
              <Heart size={20} />
              <span>Favorites</span>
              {favoriteCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                  {favoriteCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={() => onViewChange('home')}
              className={`p-2 rounded-lg transition-all duration-200 ${
                currentView === 'home'
                  ? 'bg-primary text-primary-foreground'
                  : 'text-foreground hover:bg-secondary'
              }`}
            >
              <Home size={24} />
            </button>

            <button
              onClick={() => onViewChange('favorites')}
              className={`p-2 rounded-lg transition-all duration-200 relative ${
                currentView === 'favorites'
                  ? 'bg-primary text-primary-foreground'
                  : 'text-foreground hover:bg-secondary'
              }`}
            >
              <Heart size={24} />
              {favoriteCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                  {favoriteCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
