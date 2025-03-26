
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageTransition from "@/components/layout/PageTransition";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col bg-zinc-900 text-gray-100">
        <Header />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center px-4 py-10 max-w-md w-full">
            <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
            <p className="text-xl text-gray-300 mb-6">
              Oops! We couldn't find the page you're looking for.
            </p>
            <p className="text-gray-400 mb-8">
              The page at <span className="font-medium text-gray-300">{location.pathname}</span> doesn't exist or may have been moved.
            </p>
            <Button
              asChild
              className="inline-flex items-center justify-center gap-2 bg-primary text-white"
            >
              <Link to="/">
                <ArrowLeft size={18} />
                Back to Home
              </Link>
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    </PageTransition>
  );
};

export default NotFound;
