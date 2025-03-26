
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Moon, Sun, User, LogOut, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || isMobileMenuOpen
          ? 'bg-zinc-900 backdrop-blur-lg shadow-md'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/70 rounded-md flex items-center justify-center">
              <span className="text-white font-bold text-sm">IN</span>
            </div>
            <span className="font-bold text-lg text-gray-100">InfluencerHub.in</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <Link to="/how-it-works">
              <Button
                variant={isActive('/how-it-works') ? 'default' : 'ghost'}
                className={
                  isActive('/how-it-works')
                    ? 'text-white'
                    : 'text-gray-300 hover:text-white'
                }
              >
                How it Works
              </Button>
            </Link>
            <Link to="/messages">
              <Button
                variant={isActive('/messages') ? 'default' : 'ghost'}
                className={
                  isActive('/messages')
                    ? 'text-white'
                    : 'text-gray-300 hover:text-white'
                }
              >
                Messages
              </Button>
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="rounded-full h-9 w-9 p-0 ml-2">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback className="bg-primary/10 text-primary">
                      U
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-zinc-800 border-zinc-700 text-gray-200" align="end">
                <DropdownMenuItem className="flex items-center gap-2" asChild>
                  <Link to="/profile">
                    <User size={16} /> Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center gap-2" asChild>
                  <Link to="/messages">
                    <MessageSquare size={16} /> Messages
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-zinc-700" />
                <DropdownMenuItem className="flex items-center gap-2 text-gray-400">
                  <LogOut size={16} /> Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-200"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
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
            className="md:hidden bg-zinc-900"
          >
            <div className="container mx-auto px-4 pb-4 space-y-2">
              <Link to="/how-it-works" className="block">
                <Button
                  variant={isActive('/how-it-works') ? 'default' : 'ghost'}
                  className={`w-full justify-start ${
                    isActive('/how-it-works') 
                      ? 'text-white' 
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  How it Works
                </Button>
              </Link>
              <Link to="/messages" className="block">
                <Button
                  variant={isActive('/messages') ? 'default' : 'ghost'}
                  className={`w-full justify-start ${
                    isActive('/messages') 
                      ? 'text-white' 
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  Messages
                </Button>
              </Link>
              <div className="border-t border-zinc-800 my-3"></div>
              <Link to="/profile" className="block">
                <Button
                  variant="ghost"
                  className="w-full justify-start text-gray-300 hover:text-white"
                >
                  <User size={16} className="mr-2" /> Profile
                </Button>
              </Link>
              <Button
                variant="ghost"
                className="w-full justify-start text-gray-400"
              >
                <LogOut size={16} className="mr-2" /> Logout
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
