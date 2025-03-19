
import React from 'react';
import { motion } from 'framer-motion';
import { Search, Sparkles, Shield, MessageCircle, DollarSign, BarChart } from 'lucide-react';

const features = [
  {
    icon: <Search size={24} />,
    title: 'Intelligent Discovery',
    description: 'Find influencers and businesses that align perfectly with your brand using our AI-powered search and filtering system.'
  },
  {
    icon: <Sparkles size={24} />,
    title: 'AI Matching',
    description: 'Our advanced algorithms analyze content and engagement patterns to recommend optimal partnerships.'
  },
  {
    icon: <Shield size={24} />,
    title: 'Verified Profiles',
    description: 'Every member undergoes a multi-tiered verification process ensuring you connect with legitimate partners.'
  },
  {
    icon: <MessageCircle size={24} />,
    title: 'In-Platform Communication',
    description: 'Negotiate, collaborate, and manage projects all in one place with our comprehensive messaging system.'
  },
  {
    icon: <DollarSign size={24} />,
    title: 'Secure Payments',
    description: 'Our escrow system ensures both parties are protected throughout the collaboration process.'
  },
  {
    icon: <BarChart size={24} />,
    title: 'Campaign Analytics',
    description: 'Track performance metrics and ROI with our detailed analytics dashboard for data-driven decisions.'
  }
];

const FeatureShowcase: React.FC = () => {
  return (
    <section className="py-20 md:py-32 bg-secondary/30 relative">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="bg-primary/10 text-primary text-sm font-medium py-1 px-3 rounded-full mb-4 inline-block">
              Platform Features
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-foreground/70 max-w-2xl mx-auto">
              Our platform provides all the tools necessary for influencers and businesses 
              to create meaningful partnerships that drive results.
            </p>
          </motion.div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-xl p-6 shadow-card border border-border/30 hover:shadow-prominent transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-5">
                {feature.icon}
              </div>
              <h3 className="text-xl font-medium mb-3">{feature.title}</h3>
              <p className="text-foreground/70">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureShowcase;
