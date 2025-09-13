import React from 'react';
import { ChefHat, Search, Heart, Sparkles, TrendingUp, Clock } from 'lucide-react';
import SearchBar from './SearchBar';
import heroImage from '../assets/hero-image.jpg';

interface HomePageProps {
  onSearch: (query: string) => void;
  onRandomRecipe: () => void;
  isLoading: boolean;
}

const HomePage: React.FC<HomePageProps> = ({ onSearch, onRandomRecipe, isLoading }) => {
  const features = [
    {
      icon: Search,
      title: "Smart Search",
      description: "Find recipes by any ingredient you have in your kitchen"
    },
    {
      icon: Heart,
      title: "Save Favorites",
      description: "Keep your favorite recipes organized and easily accessible"
    },
    {
      icon: Sparkles,
      title: "Random Discovery",
      description: "Discover new exciting recipes with our random recipe generator"
    }
  ];

  const stats = [
    { label: "Recipes Available", value: "1000+" },
    { label: "Cuisines", value: "20+" },
    { label: "Avg Cook Time", value: "30min" }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="Delicious food spread" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 py-20 md:py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="space-y-8 fade-in">
              {/* Badge */}
              <div className="inline-flex items-center space-x-2 bg-primary/20 text-white px-4 py-2 rounded-full backdrop-blur-sm">
                <ChefHat className="h-5 w-5" />
                <span className="font-medium">Recipe Ideas App</span>
              </div>

              {/* Title */}
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
                Discover Amazing
                <span className="block bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
                  Recipe Ideas
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
                Transform your ingredients into delicious meals. Search thousands of recipes 
                and find exactly what you can cook today.
              </p>

              {/* CTA Button */}
              <div className="pt-4">
                <button
                  onClick={() => document.getElementById('search-section')?.scrollIntoView({ behavior: 'smooth' })}
                  className="btn-primary text-lg px-8 py-4 shadow-glow animate-pulse-glow"
                >
                  Start Cooking Now
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="relative z-10 bg-surface-elevated/95 backdrop-blur-sm border-t border-border">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="grid grid-cols-3 gap-8 text-center">
              {stats.map((stat, index) => (
                <div key={index} className="space-y-2">
                  <div className="text-2xl md:text-3xl font-bold text-primary">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section id="search-section" className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-12 slide-up">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                What's in your kitchen?
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Tell us what ingredients you have, and we'll find the perfect recipes for you
              </p>
            </div>

            <SearchBar
              onSearch={onSearch}
              onRandomRecipe={onRandomRecipe}
              isLoading={isLoading}
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-16">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Why choose RecipeIdeas?
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Built with modern technology to make cooking easier and more enjoyable
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className="p-8 bg-card rounded-2xl shadow-soft hover:shadow-medium transition-all duration-300 group bounce-in"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className="space-y-4 text-center">
                    <div className="inline-flex p-4 bg-primary/10 rounded-2xl group-hover:bg-primary/20 transition-colors duration-300">
                      <feature.icon className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-primary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-8 text-white">
            <h2 className="text-3xl md:text-4xl font-bold">
              Ready to start your culinary journey?
            </h2>
            <p className="text-xl opacity-90 leading-relaxed">
              Join thousands of home cooks discovering new recipes every day
            </p>
            <button
              onClick={() => document.getElementById('search-section')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-white text-primary hover:bg-white/90 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 shadow-strong"
            >
              Find Your Next Recipe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;