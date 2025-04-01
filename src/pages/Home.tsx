import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Users, Target, DollarSign, BarChart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { indianBusinesses } from '@/data/indianBusinesses';
import { indianInfluencers } from '@/data/indianInfluencers';
import PageTransition from '@/components/layout/PageTransition';

const Home: React.FC = () => {
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
              <Link to="/learn">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 font-semibold">
                  Learn More
                </Button>
              </Link>
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
                    <h3 className="text-xl font-semibold text-white mb-2">Performance Analytics</h3>
                    <p className="text-gray-300 leading-relaxed">
                      Track and optimize your campaigns with detailed analytics and 
                      performance insights.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 bg-zinc-900 border-t border-zinc-800">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="text-center bg-zinc-800/50 p-6 rounded-lg border border-zinc-700 hover:border-primary/50 transition-colors"
              >
                <div className="text-5xl font-bold text-white mb-3">500+</div>
                <div className="text-xl text-gray-200 font-semibold">Active Businesses</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                className="text-center bg-zinc-800/50 p-6 rounded-lg border border-zinc-700 hover:border-primary/50 transition-colors"
              >
                <div className="text-5xl font-bold text-white mb-3">1000+</div>
                <div className="text-xl text-gray-200 font-semibold">Verified Influencers</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="text-center bg-zinc-800/50 p-6 rounded-lg border border-zinc-700 hover:border-primary/50 transition-colors"
              >
                <div className="text-5xl font-bold text-white mb-3">95%</div>
                <div className="text-xl text-gray-200 font-semibold">Match Success Rate</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.9 }}
                className="text-center bg-zinc-800/50 p-6 rounded-lg border border-zinc-700 hover:border-primary/50 transition-colors"
              >
                <div className="text-5xl font-bold text-white mb-3">24/7</div>
                <div className="text-xl text-gray-200 font-semibold">AI Support</div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-zinc-900 border-t border-zinc-800">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Start Your Influencer Journey?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of brands and influencers who are already growing their presence on Connect Magic.
            </p>
            <Link to="/join">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white font-semibold">
                Get Started Now
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </PageTransition>
  );
};

export default Home; 