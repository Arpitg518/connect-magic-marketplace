
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Instagram, Youtube, ArrowRight, Check } from 'lucide-react';
import { Link } from 'react-router-dom';

// Mock data for influencers
const influencers = [
  {
    id: 1,
    name: 'Sophia Reynolds',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80',
    category: 'Lifestyle & Travel',
    followers: '1.2M',
    platform: 'Instagram',
    platformIcon: <Instagram size={16} />,
    verified: true,
  },
  {
    id: 2,
    name: 'Marcus Chen',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80',
    category: 'Tech & Gaming',
    followers: '845K',
    platform: 'YouTube',
    platformIcon: <Youtube size={16} />,
    verified: true,
  },
  {
    id: 3,
    name: 'Zoe Martinez',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80',
    category: 'Fashion & Beauty',
    followers: '2.3M',
    platform: 'TikTok',
    platformIcon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"/><path d="M15 8a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"/><path d="M15 8v8a4 4 0 0 1-4 4"/><path d="M15 8h-4"/></svg>,
    verified: true,
  }
];

const InfluencerShowcase: React.FC = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mb-6 md:mb-0"
          >
            <span className="bg-primary/10 text-primary text-sm font-medium py-1 px-3 rounded-full mb-4 inline-block">
              Discover Creators
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Connect with Top Influencers
            </h2>
            <p className="text-foreground/70">
              Our platform hosts thousands of verified influencers across all niches and social media platforms.
              Find the perfect partners for your brand's next campaign.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Link 
              to="/influencers" 
              className="flex items-center text-primary font-medium group"
            >
              Browse all influencers
              <ArrowRight size={18} className="ml-2 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>

        {/* Influencer Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {influencers.map((influencer, index) => (
            <motion.div
              key={influencer.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onMouseEnter={() => setHoveredCard(influencer.id)}
              onMouseLeave={() => setHoveredCard(null)}
              className="bg-white rounded-xl overflow-hidden shadow-card border border-border/30 transition-all duration-300 hover:shadow-prominent"
            >
              <div className="relative aspect-[3/2] overflow-hidden">
                <img 
                  src={influencer.image} 
                  alt={influencer.name}
                  className="w-full h-full object-cover transition-transform duration-500"
                  style={{ 
                    transform: hoveredCard === influencer.id ? 'scale(1.05)' : 'scale(1)'
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div className="flex items-center justify-between">
                    <span className="bg-black/40 backdrop-blur-sm text-white text-xs font-medium py-1 px-2 rounded-full flex items-center">
                      {influencer.platformIcon}
                      <span className="ml-1">{influencer.followers}</span>
                    </span>
                    {influencer.verified && (
                      <span className="bg-primary/10 backdrop-blur-sm text-white text-xs font-medium py-1 px-2 rounded-full flex items-center">
                        <Check size={12} className="mr-1" />
                        Verified
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-lg font-medium mb-1">{influencer.name}</h3>
                <p className="text-sm text-foreground/70 mb-4">{influencer.category}</p>
                <Link
                  to={`/influencer/${influencer.id}`}
                  className="text-sm font-medium text-primary flex items-center hover:underline"
                >
                  View Profile
                  <ArrowRight size={14} className="ml-1" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InfluencerShowcase;
