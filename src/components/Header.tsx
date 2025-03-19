
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, User, Building2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const headerClasses = cn(
    'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
    isScrolled 
      ? 'py-3 bg-white/80 backdrop-blur-lg shadow-subtle' 
      : 'py-5 bg-transparent'
  );

  const navLinkClasses = 'font-medium text-foreground/80 hover:text-primary transition-colors relative';
  const activeLinkClasses = 'text-primary';

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className={headerClasses}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <Link 
            to="/" 
            className="text-xl font-semibold flex items-center gap-2"
          >
            <span className="text-primary font-bold">Connect</span>
            <span className="font-light">Magic</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={cn(navLinkClasses, isActive('/') && activeLinkClasses)}
            >
              Home
            </Link>
            <Link 
              to="/influencers" 
              className={cn(navLinkClasses, isActive('/influencers') && activeLinkClasses)}
            >
              Influencers
            </Link>
            <Link 
              to="/businesses" 
              className={cn(navLinkClasses, isActive('/businesses') && activeLinkClasses)}
            >
              Businesses
            </Link>
            <div className="relative group">
              <button className="flex items-center gap-1 font-medium text-foreground/80 hover:text-primary transition-colors">
                How It Works
                <ChevronDown size={16} />
              </button>
              <div className="absolute top-full right-0 mt-2 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-right">
                <div className="py-2 bg-white rounded-lg shadow-prominent border border-border/40">
                  <Link to="/how-it-works/influencers" className="block px-4 py-2 text-sm hover:bg-secondary/50 transition-colors">
                    For Influencers
                  </Link>
                  <Link to="/how-it-works/businesses" className="block px-4 py-2 text-sm hover:bg-secondary/50 transition-colors">
                    For Businesses
                  </Link>
                </div>
              </div>
            </div>
          </nav>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/auth/login" className="px-4 py-2 text-foreground/80 hover:text-primary transition-colors">
              Log in
            </Link>
            <Link 
              to="/auth/register" 
              className="px-5 py-2 bg-primary text-white rounded-md transition-all hover:shadow-md active:scale-[0.98]"
            >
              Sign up
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white border-t border-border/30 shadow-subtle"
          >
            <div className="container mx-auto px-4 py-4">
              <nav className="flex flex-col space-y-4">
                <Link to="/" className="py-2 font-medium">
                  Home
                </Link>
                <Link to="/influencers" className="py-2 font-medium">
                  Influencers
                </Link>
                <Link to="/businesses" className="py-2 font-medium">
                  Businesses
                </Link>
                <div className="py-2">
                  <p className="font-medium mb-2">How It Works</p>
                  <div className="pl-4 flex flex-col space-y-2">
                    <Link to="/how-it-works/influencers" className="text-sm text-foreground/80">
                      For Influencers
                    </Link>
                    <Link to="/how-it-works/businesses" className="text-sm text-foreground/80">
                      For Businesses
                    </Link>
                  </div>
                </div>
                <div className="pt-4 border-t border-border/30 flex flex-col space-y-3">
                  <Link 
                    to="/auth/login" 
                    className="flex items-center justify-center py-2.5 border border-border rounded-md"
                  >
                    Log in
                  </Link>
                  <Link 
                    to="/auth/register" 
                    className="flex items-center justify-center py-2.5 bg-primary text-white rounded-md"
                  >
                    Sign up
                  </Link>
                </div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
