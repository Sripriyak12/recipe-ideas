import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { ChefHat, Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center space-y-8 max-w-md mx-auto px-4">
        {/* Icon */}
        <div className="p-6 bg-primary/10 rounded-full inline-block">
          <ChefHat className="h-16 w-16 text-primary" />
        </div>
        
        {/* Content */}
        <div className="space-y-4">
          <h1 className="text-6xl font-bold text-foreground">404</h1>
          <h2 className="text-2xl font-semibold text-foreground">
            Recipe Not Found
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Oops! It looks like this page doesn't exist. The recipe you're looking for might have been moved or deleted.
          </p>
        </div>

        {/* Action Button */}
        <a 
          href="/" 
          className="btn-primary inline-flex items-center space-x-2 no-underline"
        >
          <Home className="h-5 w-5" />
          <span>Back to Kitchen</span>
        </a>
      </div>
    </div>
  );
};

export default NotFound;
