
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import FeatureShowcase from '@/components/FeatureShowcase';
import InfluencerShowcase from '@/components/InfluencerShowcase';
import BrandShowcase from '@/components/BrandShowcase';
import TestimonialSection from '@/components/TestimonialSection';

const Index = () => {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <Hero />
        
        {/* Feature Showcase */}
        <FeatureShowcase />
        
        {/* Influencer Showcase */}
        <InfluencerShowcase />
        
        {/* Brand Showcase */}
        <BrandShowcase />
        
        {/* Testimonials */}
        <TestimonialSection />
        
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
