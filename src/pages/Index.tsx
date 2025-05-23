
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import FeatureShowcase from '@/components/FeatureShowcase';
import InfluencerShowcase from '@/components/InfluencerShowcase';
import BrandShowcase from '@/components/BrandShowcase';
import TestimonialSection from '@/components/TestimonialSection';
import SupabaseSetup from '@/components/SupabaseSetup';

const Index = () => {
  const [showSupabaseSetup, setShowSupabaseSetup] = useState(false);
  const [isSupabaseConfigured, setIsSupabaseConfigured] = useState(false);

  // Check if Supabase is configured
  useEffect(() => {
    const supabaseUrl = localStorage.getItem('supabaseUrl');
    const supabaseAnonKey = localStorage.getItem('supabaseAnonKey');
    setIsSupabaseConfigured(Boolean(supabaseUrl && supabaseAnonKey));
    
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);

  const handleSupabaseSetup = (url: string, anonKey: string) => {
    // This function would trigger recreation of the Supabase client with the new credentials
    setIsSupabaseConfigured(true);
    // In a real app, you would reinitialize the Supabase client here
    setShowSupabaseSetup(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <Hero />
        
        {/* Feature Showcase */}
        <FeatureShowcase />
        
        {/* Quick Access Links */}
        <section className="py-12 bg-secondary/20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Search className="text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">Find Influencers</h3>
                </div>
                <p className="text-foreground/70 mb-6">
                  Discover and connect with top influencers across India. Filter by location, category, and engagement rates.
                </p>
                <Link to="/influencers" className="flex items-center text-primary font-medium hover:underline group">
                  <span>Explore Influencers</span>
                  <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
                </Link>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                    <Search className="text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold">Find Businesses</h3>
                </div>
                <p className="text-foreground/70 mb-6">
                  Connect with businesses looking for influencer collaborations. Filter by industry, budget, and campaign types.
                </p>
                <Link to="/businesses" className="flex items-center text-blue-600 font-medium hover:underline group">
                  <span>Explore Businesses</span>
                  <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
                </Link>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Supabase Setup Modal */}
        {showSupabaseSetup && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="max-w-md w-full">
              <SupabaseSetup 
                onSetup={handleSupabaseSetup} 
                isConfigured={isSupabaseConfigured} 
              />
              <button 
                className="mt-4 text-white hover:underline w-full text-center"
                onClick={() => setShowSupabaseSetup(false)}
              >
                Close
              </button>
            </div>
          </div>
        )}
        
        {/* Influencer Showcase */}
        <InfluencerShowcase />
        
        {/* Brand Showcase */}
        <BrandShowcase />
        
        {/* Testimonials */}
        <TestimonialSection />
        
        {/* Supabase Integration CTA */}
        <section className="py-12 bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h3 className="text-2xl font-bold mb-4">Enable Real-time Data with Supabase</h3>
              <p className="text-muted-foreground mb-6">
                Connect your app to Supabase to enable real-time data, authentication, and more powerful features.
              </p>
              <Button
                onClick={() => setShowSupabaseSetup(true)}
                variant={isSupabaseConfigured ? "outline" : "default"}
                className="mx-auto"
              >
                {isSupabaseConfigured ? "Supabase Connected ✓" : "Configure Supabase"}
              </Button>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-r from-primary/90 to-primary rounded-2xl overflow-hidden relative"
            >
              <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.5))]"></div>
              <div className="relative px-6 py-12 md:p-16 text-white">
                <div className="max-w-3xl mx-auto text-center">
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    Ready to Transform Your Collaborations?
                  </h2>
                  <p className="text-white/80 text-lg md:text-xl mb-8">
                    Join thousands of influencers and businesses creating authentic partnerships 
                    that drive real results.
                  </p>
                  <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <Link
                      to="/auth/register"
                      className="bg-white text-primary font-medium py-3 px-6 rounded-md shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 group"
                    >
                      <span>Get Started Today</span>
                      <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                    </Link>
                    <Link
                      to="/how-it-works"
                      className="bg-white/10 backdrop-blur-sm text-white font-medium py-3 px-6 rounded-md hover:bg-white/20 transition-colors"
                    >
                      Learn How It Works
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
