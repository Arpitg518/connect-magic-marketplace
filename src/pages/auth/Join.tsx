import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Building2 } from 'lucide-react';
import InfluencerPortfolio from '@/components/profile/InfluencerPortfolio';
import BusinessPortfolio from '@/components/profile/BusinessPortfolio';

const Join: React.FC = () => {
  const [selectedType, setSelectedType] = useState<'influencer' | 'business' | null>(null);

  if (!selectedType) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4">
        <div className="max-w-4xl w-full">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-white mb-4">Join Our Platform</h1>
            <p className="text-gray-400 text-lg">Choose how you want to connect with others</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedType('influencer')}
              className="bg-zinc-900 rounded-xl p-8 text-left border border-zinc-800 hover:border-primary/50 transition-colors"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <User className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-2xl font-semibold text-white">Influencer</h2>
              </div>
              <p className="text-gray-400 mb-6">
                Showcase your content, connect with brands, and grow your audience.
              </p>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                  Create your portfolio
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                  Connect with brands
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                  Showcase your work
                </li>
              </ul>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedType('business')}
              className="bg-zinc-900 rounded-xl p-8 text-left border border-zinc-800 hover:border-primary/50 transition-colors"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <Building2 className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-2xl font-semibold text-white">Business</h2>
              </div>
              <p className="text-gray-400 mb-6">
                Find influencers, manage collaborations, and grow your brand.
              </p>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                  Create your business profile
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                  Find influencers
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                  Manage collaborations
                </li>
              </ul>
            </motion.button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-white">
            {selectedType === 'influencer' ? 'Influencer Profile' : 'Business Profile'}
          </h1>
          <button
            onClick={() => setSelectedType(null)}
            className="text-gray-400 hover:text-white transition-colors"
          >
            Change Type
          </button>
        </div>

        {selectedType === 'influencer' ? (
          <InfluencerPortfolio />
        ) : (
          <BusinessPortfolio />
        )}
      </div>
    </div>
  );
};

export default Join; 