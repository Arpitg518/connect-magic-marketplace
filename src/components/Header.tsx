import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MessageSquare, Users, Building2, Home, Sparkles, LogIn, CreditCard, X } from 'lucide-react';

const Header: React.FC = () => {
  const location = useLocation();
  const [showFloatingButton, setShowFloatingButton] = useState(false);

  useEffect(() => {
    // Show floating button after scrolling down 300px and hide on pricing page
    const handleScroll = () => {
      if (location.pathname !== '/pricing') {
        setShowFloatingButton(window.scrollY > 300);
      } else {
        setShowFloatingButton(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <>
      <header className="bg-zinc-900 border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link to="/" className="text-xl font-bold text-white">
                CollabX
              </Link>
            </div>

            <nav className="flex items-center space-x-6">
              <Link
                to="/"
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                  isActive('/')
                    ? 'text-white bg-zinc-800'
                    : 'text-gray-300 hover:text-white hover:bg-zinc-800'
                }`}
              >
                <Home className="w-4 h-4 mr-2" />
                Home
              </Link>

              <Link
                to="/influencers"
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                  isActive('/influencers')
                    ? 'text-white bg-zinc-800'
                    : 'text-gray-300 hover:text-white hover:bg-zinc-800'
                }`}
              >
                <Users className="w-4 h-4 mr-2" />
                Influencers
              </Link>

              <Link
                to="/businesses"
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                  isActive('/businesses')
                    ? 'text-white bg-zinc-800'
                    : 'text-gray-300 hover:text-white hover:bg-zinc-800'
                }`}
              >
                <Building2 className="w-4 h-4 mr-2" />
                Businesses
              </Link>

              <Link
                to="/ai-matchmaking"
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                  isActive('/ai-matchmaking')
                    ? 'text-white bg-zinc-800'
                    : 'text-gray-300 hover:text-white hover:bg-zinc-800'
                }`}
              >
                <Sparkles className="w-4 h-4 mr-2" size={16} />
                AI Matchmaking
              </Link>

              <Link
                to="/messages"
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                  isActive('/messages')
                    ? 'text-white bg-zinc-800'
                    : 'text-gray-300 hover:text-white hover:bg-zinc-800'
                }`}
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                Messages
              </Link>

              <Link
                to="/pricing"
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                  isActive('/pricing')
                    ? 'text-white bg-primary'
                    : 'text-white bg-primary hover:bg-primary/90'
                }`}
              >
                <CreditCard className="w-4 h-4 mr-2" />
                Pricing
              </Link>

              <div className="flex items-center space-x-3 ml-4">
                <Link
                  to="/login"
                  className="flex items-center px-4 py-2 rounded-md text-sm font-medium text-white bg-zinc-800 hover:bg-zinc-700 transition-colors"
                >
                  <LogIn className="w-4 h-4 mr-2" />
                  Login
                </Link>
                <Link
                  to="/join"
                  className="px-4 py-2 rounded-md text-sm font-medium text-white bg-primary hover:bg-primary/90 transition-colors"
                >
                  Join
                </Link>
              </div>
            </nav>
          </div>
        </div>
      </header>

      {/* Floating Pricing Button */}
      {showFloatingButton && (
        <Link
          to="/pricing"
          className="fixed bottom-8 right-8 bg-primary text-primary-foreground px-6 py-3 rounded-full shadow-lg hover:bg-primary/90 transition-colors animate-fade-in"
        >
          View Pricing Plans
        </Link>
      )}
    </>
  );
};

export default Header;
