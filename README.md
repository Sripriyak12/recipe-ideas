# 🍳 RecipeIdeas - Professional Recipe Discovery App

A modern, responsive React application for discovering recipes by ingredients. Built with React, TypeScript, Tailwind CSS, and TheMealDB API.

![RecipeIdeas App](https://img.shields.io/badge/Built%20with-React-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

## 🌟 Features

### ✅ Core Features
- **🔍 Ingredient Search**: Search recipes by any ingredient using TheMealDB API
- **📱 Recipe Cards**: Beautiful, interactive recipe cards with images and details
- **📄 Recipe Details**: Complete recipe information with ingredients, instructions, and cooking videos
- **❤️ Favorites System**: Save and manage favorite recipes with localStorage
- **🎲 Random Recipe**: Discover new recipes with the random recipe generator
- **📱 Responsive Design**: Mobile-first design that works on all devices

### 🚀 Advanced Features
- **⚡ Modern UI/UX**: Professional design with smooth animations and transitions
- **🎨 Custom Design System**: Consistent theming with food-inspired color palette
- **📊 Smart Error Handling**: Graceful error messages and loading states
- **🔗 External Links**: Direct links to recipe videos and original sources
- **📱 Mobile Navigation**: Optimized navigation for mobile devices
- **💾 Local Storage**: Persistent favorites across browser sessions

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS + Custom Design System
- **State Management**: React Hooks (useState, useEffect, custom hooks)
- **API**: TheMealDB API
- **Storage**: LocalStorage for favorites
- **Icons**: Lucide React
- **UI Components**: Custom components with shadcn/ui base

## 🎨 Design System

### Color Palette
```css
/* Primary Colors - Warm Orange/Red Food Theme */
--primary: 15 85% 55%        /* Warm Orange */
--secondary: 35 35% 92%      /* Cream */
--accent: 45 95% 68%         /* Golden Yellow */

/* Gradients */
--gradient-hero: linear-gradient(135deg, hsl(15, 85%, 55%), hsl(25, 80%, 60%), hsl(35, 75%, 65%))
--gradient-primary: linear-gradient(135deg, hsl(15, 85%, 55%), hsl(25, 80%, 60%))
```

### Typography & Animations
- **Font**: System fonts for optimal performance
- **Animations**: Smooth transitions with CSS custom properties
- **Responsive**: Mobile-first approach with Tailwind breakpoints

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd recipe-ideas-app
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm run dev
```

4. **Open your browser**
Navigate to `http://localhost:8080`

### Build for Production
```bash
npm run build
```

## 📁 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── Navbar.tsx       # Main navigation
│   ├── SearchBar.tsx    # Ingredient search
│   ├── RecipeCard.tsx   # Recipe display cards
│   ├── RecipeList.tsx   # Recipe grid layout
│   ├── RecipeDetail.tsx # Full recipe view
│   ├── HomePage.tsx     # Landing page
│   └── FavoritesPage.tsx# Favorites management
├── hooks/               # Custom React hooks
│   ├── useFavorites.ts  # Favorites management
│   └── use-mobile.tsx   # Mobile detection
├── services/            # API services
│   └── recipeService.ts # TheMealDB API calls
├── assets/              # Images and static files
├── pages/               # Main app pages
│   ├── Index.tsx        # Main app component
│   └── NotFound.tsx     # 404 page
└── lib/                 # Utility functions
    └── utils.ts         # Helper functions
```

## 🔌 API Integration

### TheMealDB API Endpoints Used
```typescript
// Search by ingredient
GET https://www.themealdb.com/api/json/v1/1/filter.php?i={ingredient}

// Get recipe details
GET https://www.themealdb.com/api/json/v1/1/lookup.php?i={id}

// Random recipe
GET https://www.themealdb.com/api/json/v1/1/random.php
```

### Error Handling
- Network error handling
- Empty results messaging
- Loading states with spinners
- Toast notifications for user feedback

## 💡 Usage Examples

### Searching for Recipes
1. Enter an ingredient (e.g., "chicken", "pasta", "salmon")
2. Click search or press Enter
3. Browse through recipe cards
4. Click any recipe for detailed view

### Managing Favorites
1. Click the heart icon on any recipe card
2. Access favorites through the navigation
3. Remove favorites by clicking the heart again
4. Clear all favorites with the "Clear All" button

### Random Recipe Discovery
1. Click "Get Random Recipe" button
2. Discover new cuisines and dishes
3. Save interesting recipes to favorites

## 🎯 Performance Optimizations

- **Lazy Loading**: Images load on demand
- **Debounced Search**: Prevents excessive API calls
- **Memoization**: Optimized re-renders with React hooks
- **Bundle Optimization**: Tree-shaking and code splitting
- **Responsive Images**: Optimized image sizes for different devices

## 🔧 Customization

### Adding New Features
1. **Custom Hooks**: Add to `src/hooks/`
2. **API Services**: Extend `src/services/recipeService.ts`
3. **Components**: Create in `src/components/`
4. **Styling**: Update design system in `src/index.css`

### Theme Customization
Edit `src/index.css` and `tailwind.config.ts` to customize:
- Colors and gradients
- Typography scales
- Animation timings
- Component variants

## 📱 Browser Support

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 🚀 Deployment

### Option 1: Netlify (Recommended)
1. Build the project: `npm run build`
2. Drag `dist` folder to [Netlify Drop](https://app.netlify.com/drop)
3. Configure custom domain (optional)

### Option 2: Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow deployment prompts

### Option 3: GitHub Pages
1. Install gh-pages: `npm install --save-dev gh-pages`
2. Add to package.json:
```json
{
  "scripts": {
    "deploy": "gh-pages -d dist"
  },
  "homepage": "https://yourusername.github.io/recipe-ideas-app"
}
```
3. Run: `npm run build && npm run deploy`

## 🔮 Future Enhancements

### Planned Features
- [ ] **Meal Planning**: Weekly meal planner
- [ ] **Shopping Lists**: Auto-generate shopping lists
- [ ] **Nutrition Info**: Calorie and nutrition data
- [ ] **Recipe Ratings**: User rating system
- [ ] **Social Sharing**: Share recipes on social media
- [ ] **Dietary Filters**: Vegetarian, vegan, gluten-free filters
- [ ] **Cooking Timers**: Built-in cooking timers
- [ ] **Recipe Collections**: Curated recipe collections

### Technical Improvements
- [ ] **PWA Support**: Offline functionality
- [ ] **Dark Mode**: System theme detection
- [ ] **Search History**: Recently searched ingredients
- [ ] **Advanced Filtering**: Multiple ingredient search
- [ ] **Recipe Caching**: Improved performance with caching

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [TheMealDB](https://www.themealdb.com/) - Amazing free recipe API
- [Lucide Icons](https://lucide.dev/) - Beautiful icon library
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [React](https://reactjs.org/) - UI library
- [Vite](https://vitejs.dev/) - Lightning fast build tool

---

## 👨‍💻 Developer Notes

This project demonstrates:
- ✅ **Modern React Patterns**: Hooks, functional components, custom hooks
- ✅ **TypeScript Best Practices**: Strong typing, interfaces, error handling
- ✅ **Responsive Design**: Mobile-first approach with Tailwind CSS
- ✅ **API Integration**: RESTful API consumption with error handling
- ✅ **State Management**: Local state with React hooks and localStorage
- ✅ **Component Architecture**: Reusable, maintainable component design
- ✅ **Performance**: Optimized loading, caching, and bundle size
- ✅ **User Experience**: Smooth animations, loading states, error handling
- ✅ **Accessibility**: Semantic HTML, ARIA labels, keyboard navigation
- ✅ **SEO Optimization**: Meta tags, structured data, semantic markup

**Built with ❤️ for the Aganita Cognitive Solutions interview process**

---

*For questions or support, please open an issue in this repository.*