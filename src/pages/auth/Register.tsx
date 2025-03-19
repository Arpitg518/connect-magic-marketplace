
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, User, Building2, ArrowLeft, Check, ChevronRight } from 'lucide-react';

import Header from '@/components/Header';
import Footer from '@/components/Footer';

type UserType = 'influencer' | 'business';

const Register = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get the user type from URL query params
  const queryParams = new URLSearchParams(location.search);
  const typeFromQuery = queryParams.get('type') as UserType | null;
  
  const [userType, setUserType] = useState<UserType>(typeFromQuery || 'influencer');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    if (typeFromQuery && (typeFromQuery === 'influencer' || typeFromQuery === 'business')) {
      setUserType(typeFromQuery);
    }
  }, [typeFromQuery]);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Basic validation
    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    if (password.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }
    
    // Simulate registration process
    setIsLoading(true);
    
    // This is a mock implementation. In a real app, you would call your auth API here.
    setTimeout(() => {
      setIsLoading(false);
      // Navigate to dashboard (this is just for demo - you'd navigate based on user type in a real app)
      navigate(userType === 'influencer' ? '/dashboard/influencer' : '/dashboard/business');
    }, 1500);
  };

  const switchUserType = (type: UserType) => {
    setUserType(type);
    // Update URL
    navigate(`/auth/register?type=${type}`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow flex items-center justify-center py-16 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="bg-white rounded-xl shadow-card border border-border/30 overflow-hidden">
            <div className="p-8">
              {/* Header */}
              <div className="text-center mb-8">
                <h1 className="text-2xl font-bold mb-2">Create your account</h1>
                <p className="text-foreground/70">Join our community today</p>
              </div>
              
              {/* Account Type Selector */}
              <div className="flex bg-secondary/50 p-1 rounded-lg mb-8">
                <button
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-md transition-all ${
                    userType === 'influencer' 
                      ? 'bg-white text-primary shadow-subtle' 
                      : 'text-foreground/70 hover:text-foreground'
                  }`}
                  onClick={() => switchUserType('influencer')}
                >
                  <User size={18} />
                  <span>Influencer</span>
                </button>
                <button
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-md transition-all ${
                    userType === 'business' 
                      ? 'bg-white text-primary shadow-subtle' 
                      : 'text-foreground/70 hover:text-foreground'
                  }`}
                  onClick={() => switchUserType('business')}
                >
                  <Building2 size={18} />
                  <span>Business</span>
                </button>
              </div>
              
              {/* Social Signup Buttons */}
              <div className="mb-6">
                <button 
                  className="w-full flex items-center justify-center gap-2 border border-border rounded-md py-2.5 px-4 text-foreground font-medium mb-3 hover:bg-secondary/50 transition-colors"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                  Continue with Google
                </button>
              </div>
              
              {/* Divider */}
              <div className="flex items-center mb-6">
                <div className="flex-grow h-px bg-border"></div>
                <span className="px-3 text-foreground/60 text-sm">or</span>
                <div className="flex-grow h-px bg-border"></div>
              </div>
              
              {/* Registration Form */}
              <form onSubmit={handleRegister}>
                {error && (
                  <div className="mb-4 p-3 bg-destructive/10 text-destructive rounded-md text-sm">
                    {error}
                  </div>
                )}
                
                <div className="space-y-4 mb-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-foreground/80 mb-1.5">
                      {userType === 'influencer' ? 'Full Name' : 'Business Name'}
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        {userType === 'influencer' ? (
                          <User size={18} className="text-foreground/50" />
                        ) : (
                          <Building2 size={18} className="text-foreground/50" />
                        )}
                      </div>
                      <input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="input-primary pl-10"
                        placeholder={userType === 'influencer' ? 'John Doe' : 'Acme Inc.'}
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-foreground/80 mb-1.5">
                      Email
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail size={18} className="text-foreground/50" />
                      </div>
                      <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="input-primary pl-10"
                        placeholder="name@example.com"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-foreground/80 mb-1.5">
                      Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock size={18} className="text-foreground/50" />
                      </div>
                      <input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="input-primary pl-10 pr-10"
                        placeholder="••••••••"
                        required
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff size={18} className="text-foreground/50" />
                        ) : (
                          <Eye size={18} className="text-foreground/50" />
                        )}
                      </button>
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-foreground/80 mb-1.5">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock size={18} className="text-foreground/50" />
                      </div>
                      <input
                        id="confirmPassword"
                        type={showPassword ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="input-primary pl-10"
                        placeholder="••••••••"
                        required
                      />
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start mb-6">
                  <div className="flex items-center h-5">
                    <input
                      id="terms"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary"
                      required
                    />
                  </div>
                  <label htmlFor="terms" className="ml-2 text-sm text-foreground/70">
                    I agree to the{' '}
                    <Link to="/terms" className="text-primary hover:underline">
                      Terms of Service
                    </Link>{' '}
                    and{' '}
                    <Link to="/privacy" className="text-primary hover:underline">
                      Privacy Policy
                    </Link>
                  </label>
                </div>
                
                <button
                  type="submit"
                  className="w-full btn-primary py-2.5 flex items-center justify-center gap-2"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Creating account...
                    </div>
                  ) : (
                    <>
                      Create account
                      <ChevronRight size={18} />
                    </>
                  )}
                </button>
              </form>
              
              {/* Sign in link */}
              <div className="mt-6 text-center">
                <p className="text-foreground/70">
                  Already have an account?{' '}
                  <Link to="/auth/login" className="text-primary font-medium hover:underline">
                    Sign in
                  </Link>
                </p>
              </div>
            </div>
          </div>
          
          {/* Back to home */}
          <div className="mt-8 text-center">
            <Link to="/" className="inline-flex items-center text-foreground/70 hover:text-primary">
              <ArrowLeft size={16} className="mr-1" />
              Back to home
            </Link>
          </div>
        </motion.div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Register;
