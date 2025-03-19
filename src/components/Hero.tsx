
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero: React.FC = () => {
  return (
    <section className="pt-28 pb-16 md:pt-32 md:pb-24 overflow-hidden relative">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-primary/5 rounded-full blur-3xl opacity-60" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-100/40 rounded-full blur-3xl opacity-60" />
      </div>

      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-5xl mx-auto">
          {/* Tag and Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            <span className="inline-block bg-primary/10 text-primary text-sm font-medium py-1 px-3 rounded-full mb-6">
              Influencer-Business Marketplace
            </span>
            <h1 className="font-bold text-4xl md:text-6xl lg:text-7xl tracking-tight mb-6 bg-clip-text">
              Where Influencers & Brands <span className="text-primary">Connect</span>
            </h1>
            <p className="text-lg md:text-xl text-foreground/80 max-w-3xl mx-auto mb-8">
              Our platform eliminates agency commissions, provides AI-powered matching, 
              and focuses on quality verification and local discovery.
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col sm:flex-row justify-center gap-4 mb-12"
          >
            <Link
              to="/auth/register?type=influencer"
              className="btn-primary py-3 px-6 flex items-center justify-center gap-2 group"
            >
              <span>Join as Influencer</span>
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              to="/auth/register?type=business"
              className="btn-outline border-primary/30 text-primary hover:bg-primary/5 py-3 px-6"
            >
              Join as Business
            </Link>
          </motion.div>

          {/* Features Highlights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
          >
            <div className="flex items-start gap-3">
              <CheckCircle size={20} className="text-primary mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-medium text-base">Zero Agency Fees</h3>
                <p className="text-sm text-foreground/70">Direct connections mean no middleman markup</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle size={20} className="text-primary mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-medium text-base">AI-Powered Matching</h3>
                <p className="text-sm text-foreground/70">Find your perfect partnership match</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle size={20} className="text-primary mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-medium text-base">Verified Members</h3>
                <p className="text-sm text-foreground/70">Quality verification for authentic partnerships</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Hero Image */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.6 }}
        className="mt-16 relative max-w-6xl mx-auto px-4"
      >
        <div className="aspect-[16/9] bg-gradient-to-br from-primary/5 to-primary/20 rounded-xl overflow-hidden border border-white/40 shadow-card">
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-foreground/60 px-6 text-center">
              Dashboard Preview
            </p>
          </div>
        </div>
        <div className="absolute -bottom-4 -left-4 -right-4 h-12 bg-gradient-to-t from-background to-transparent z-10"></div>
      </motion.div>
    </section>
  );
};

export default Hero;
