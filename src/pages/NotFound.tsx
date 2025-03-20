
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center px-4 py-10 max-w-md w-full">
        <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-6">
          Oops! We couldn't find the page you're looking for.
        </p>
        <p className="text-gray-500 mb-8">
          The page at <span className="font-medium">{location.pathname}</span> doesn't exist or may have been moved.
        </p>
        <Link
          to="/"
          className="inline-flex items-center justify-center gap-2 bg-primary text-white font-medium py-3 px-6 rounded-md hover:bg-primary/90 transition-colors"
        >
          <ArrowLeft size={18} />
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
