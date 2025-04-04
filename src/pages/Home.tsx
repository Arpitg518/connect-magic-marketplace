import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Users, Target, DollarSign, BarChart, Check, Play, Pause } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { indianBusinesses } from '@/data/indianBusinesses';
import { indianInfluencers } from '@/data/indianInfluencers';
import PageTransition from '@/components/layout/PageTransition';

const Home: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoError, setVideoError] = useState<string | null>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoEnded, setVideoEnded] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      console.log("Video element initialized");
      
      videoRef.current.addEventListener('loadedmetadata', () => {
        console.log("Video metadata loaded");
        setVideoLoaded(true);
      });
      
      videoRef.current.addEventListener('canplay', () => {
        console.log("Video can play");
      });
      
      videoRef.current.addEventListener('playing', () => {
        console.log("Video is playing");
        setVideoEnded(false);
      });
      
      videoRef.current.addEventListener('pause', () => {
        console.log("Video is paused");
      });
      
      videoRef.current.addEventListener('ended', () => {
        console.log("Video has ended");
        setIsPlaying(false);
        setVideoEnded(true);
      });
    }
    
    return () => {
      if (videoRef.current) {
        videoRef.current.removeEventListener('loadedmetadata', () => {});
        videoRef.current.removeEventListener('canplay', () => {});
        videoRef.current.removeEventListener('playing', () => {});
        videoRef.current.removeEventListener('pause', () => {});
        videoRef.current.removeEventListener('ended', () => {});
      }
    };
  }, []);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(error => {
          console.error("Error playing video:", error);
          setVideoError("Failed to play video. Please try again.");
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVideoError = () => {
    console.error("Video error occurred");
    setVideoError("There was an error loading the video. Please try refreshing the page.");
  };

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col bg-zinc-900 text-gray-200">
        {/* Hero Section */}
        <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/80 to-zinc-900/60 z-10" />
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80"
              alt="Hero background"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Connect with the Perfect Influencers for Your Brand
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed">
              Find, collaborate, and grow with influencers who align with your brand values and target audience.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/influencers">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-white font-semibold">
                  Find Influencers
                </Button>
              </Link>
              <Link to="/pricing">
                <Button size="lg" className="bg-white text-zinc-900 hover:bg-gray-100 font-semibold">
                  View Pricing
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Video Section */}
        <section className="py-20 bg-zinc-900">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                See Connect Magic in Action
              </h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Watch how our platform helps businesses connect with the right influencers.
              </p>
            </div>
            
            <div className="max-w-4xl mx-auto rounded-xl overflow-hidden shadow-2xl relative">
              {videoError ? (
                <div className="bg-zinc-800 p-8 rounded-xl text-center">
                  <p className="text-red-400 mb-4">{videoError}</p>
                  <Button onClick={() => window.location.reload()}>Refresh Page</Button>
                </div>
              ) : (
                <>
                  <video 
                    ref={videoRef}
                    className="w-full h-auto"
                    controls
                    preload="metadata"
                    poster="/collabx-logo.svg"
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                    onError={handleVideoError}
                  >
                    <source src="/videos/demo.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  
                  {!videoLoaded && !isPlaying && (
                    <div className="absolute inset-0 flex items-center justify-center bg-zinc-800/50">
                      <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto mb-4"></div>
                        <p className="text-white">Loading video...</p>
                      </div>
                    </div>
                  )}
                  
                  {videoEnded && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-900/90">
                      <img src="/collabx-logo.svg" alt="CollabX Logo" className="w-32 h-32 mb-4" />
                      <h3 className="text-2xl font-bold text-white mb-2">Thanks for watching!</h3>
                      <p className="text-gray-300 mb-4">Connect with the perfect influencers for your brand</p>
                      <Button 
                        onClick={() => {
                          if (videoRef.current) {
                            videoRef.current.currentTime = 0;
                            videoRef.current.play();
                          }
                        }}
                        className="bg-primary hover:bg-primary/90"
                      >
                        Watch Again
                      </Button>
                    </div>
                  )}
                  
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    {!isPlaying && videoLoaded && !videoEnded && (
                      <Button 
                        size="lg" 
                        className="bg-primary/80 hover:bg-primary text-white rounded-full p-4 pointer-events-auto"
                        onClick={togglePlay}
                      >
                        <Play className="h-8 w-8" />
                      </Button>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-zinc-900">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
              Why Choose Connect Magic?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Card className="bg-zinc-800 border-zinc-700 hover:border-primary/50 transition-colors">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4">
                      <Sparkles className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">AI-Powered Matchmaking</h3>
                    <p className="text-gray-300 leading-relaxed">
                      Our advanced AI algorithm analyzes multiple factors to find the perfect 
                      influencer matches for your brand.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Card className="bg-zinc-800 border-zinc-700 hover:border-primary/50 transition-colors">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4">
                      <Target className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">Smart Targeting</h3>
                    <p className="text-gray-300 leading-relaxed">
                      Reach your target audience with precision using our data-driven 
                      influencer selection process.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <Card className="bg-zinc-800 border-zinc-700 hover:border-primary/50 transition-colors">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4">
                      <BarChart className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">Analytics & Insights</h3>
                    <p className="text-gray-300 leading-relaxed">
                      Track campaign performance and get detailed insights to optimize 
                      your influencer marketing strategy.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-20 bg-zinc-800">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Simple, Transparent Pricing
              </h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Choose the plan that works best for your business needs. All plans include a 14-day money-back guarantee.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-zinc-900 rounded-lg border border-zinc-700 overflow-hidden"
              >
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2">Basic</h3>
                  <div className="mb-4">
                    <span className="text-3xl font-bold text-white">₹999</span>
                    <span className="text-gray-400">/month</span>
                  </div>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300">Up to 5 active campaigns</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300">Basic analytics</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300">Email support</span>
                    </li>
                  </ul>
                  <Link to="/pricing">
                    <Button className="w-full bg-zinc-700 text-white hover:bg-zinc-600">
                      Get Started
                    </Button>
                  </Link>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="bg-zinc-900 rounded-lg border border-primary overflow-hidden relative"
              >
                <div className="absolute top-0 left-0 right-0 bg-primary text-white text-center py-1 text-sm font-medium">
                  Most Popular
                </div>
                <div className="p-6 pt-8">
                  <h3 className="text-xl font-bold text-white mb-2">Pro</h3>
                  <div className="mb-4">
                    <span className="text-3xl font-bold text-white">₹1999</span>
                    <span className="text-gray-400">/month</span>
                  </div>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300">Up to 20 active campaigns</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300">Advanced analytics</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300">Priority support</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300">AI-powered matching</span>
                    </li>
                  </ul>
                  <Link to="/pricing">
                    <Button className="w-full bg-primary text-white hover:bg-primary/90">
                      Get Started
                    </Button>
                  </Link>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="bg-zinc-900 rounded-lg border border-zinc-700 overflow-hidden"
              >
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2">Enterprise</h3>
                  <div className="mb-4">
                    <span className="text-3xl font-bold text-white">₹4999</span>
                    <span className="text-gray-400">/month</span>
                  </div>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300">Unlimited campaigns</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300">Custom analytics</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300">Dedicated support</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300">API access</span>
                    </li>
                  </ul>
                  <Link to="/pricing">
                    <Button className="w-full bg-zinc-700 text-white hover:bg-zinc-600">
                      Get Started
                    </Button>
                  </Link>
                </div>
              </motion.div>
            </div>
            
            <div className="text-center mt-12">
              <Link to="/pricing">
                <Button size="lg" className="bg-primary text-white hover:bg-primary/90">
                  View All Plans
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 bg-zinc-900">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="bg-zinc-800 p-8 rounded-xl shadow-xl relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20"></div>
                <div className="relative z-10">
                  <div className="text-7xl font-black mb-2 text-blue-400" style={{ textShadow: '0 0 15px rgba(59, 130, 246, 0.7)' }}>
                    10,000+
                  </div>
                  <div className="text-xl text-gray-300 font-medium">Active Influencers</div>
                </div>
              </div>
              <div className="bg-zinc-800 p-8 rounded-xl shadow-xl relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-teal-500/20"></div>
                <div className="relative z-10">
                  <div className="text-7xl font-black mb-2 text-green-400" style={{ textShadow: '0 0 15px rgba(52, 211, 153, 0.7)' }}>
                    5,000+
                  </div>
                  <div className="text-xl text-gray-300 font-medium">Businesses</div>
                </div>
              </div>
              <div className="bg-zinc-800 p-8 rounded-xl shadow-xl relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20"></div>
                <div className="relative z-10">
                  <div className="text-7xl font-black mb-2 text-purple-400" style={{ textShadow: '0 0 15px rgba(168, 85, 247, 0.7)' }}>
                    15,000+
                  </div>
                  <div className="text-xl text-gray-300 font-medium">Successful Collaborations</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-primary/20 to-primary/10">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Transform Your Influencer Marketing?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of businesses already using Connect Magic to find the perfect influencers for their brand.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/pricing">
                <Button size="lg" className="bg-primary text-white hover:bg-primary/90 font-semibold">
                  View Pricing Plans
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/join">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 font-semibold">
                  Create Free Account
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
};

export default Home; 