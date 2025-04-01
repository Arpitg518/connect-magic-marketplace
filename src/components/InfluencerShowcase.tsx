import React, { useState, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Search, MapPin, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';
import { mockUsers } from '@/services/mockData';
import InfluencerCard from './InfluencerCard';
import MapDiscovery from './MapDiscovery';
import { Input } from './ui/input';
import { Button } from './ui/button';

const InfluencerShowcase: React.FC = () => {
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMapVisible, setIsMapVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Filter influencers from mock users
  const influencers = mockUsers
    .filter(user => user.type === 'influencer')
    .map(user => ({
      id: user.id,
      name: user.name,
      followers: user.stats?.followers || 0,
      engagement: user.stats?.engagement || 0,
      category: user.categories?.[0] || 'General',
      city: user.location || 'Unknown',
      coordinates: {
        lat: 0,
        lng: 0
      },
      profileImage: user.avatar,
      socialLinks: {
        instagram: user.socialLinks?.find(link => link.platform.toLowerCase() === 'instagram')?.url,
        youtube: user.socialLinks?.find(link => link.platform.toLowerCase() === 'youtube')?.url,
        tiktok: user.socialLinks?.find(link => link.platform.toLowerCase() === 'tiktok')?.url,
        twitter: user.socialLinks?.find(link => link.platform.toLowerCase() === 'twitter')?.url
      },
      tags: user.categories || [],
      bio: user.bio || ''
    }));

  // Filter influencers based on selected city and search query
  const filteredInfluencers = influencers.filter(influencer => {
    const matchesCity = selectedCity ? influencer.city === selectedCity : true;
    const matchesSearch = searchQuery 
      ? influencer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        influencer.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (influencer.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ?? false)
      : true;
    
    return matchesCity && matchesSearch;
  });

  const handleCitySelection = useCallback((city: string) => {
    setSelectedCity(city);
  }, []);

  const clearFilters = () => {
    setSelectedCity(null);
    setSearchQuery('');
  };

  if (!mounted) return null;

  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-purple-50/50 to-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mb-12 md:mb-16"
        >
          <span className="bg-primary/10 text-primary text-sm font-medium py-1 px-3 rounded-full mb-4 inline-block">
            Discover Creators
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
            Connect with Top Indian Influencers
          </h2>
          <p className="text-foreground/70">
            Our platform hosts thousands of verified Indian influencers across all niches and social media platforms.
            Find the perfect partners for your brand's next campaign.
          </p>
        </motion.div>

        {/* Search & Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="relative flex-grow">
              <Input
                type="text"
                placeholder="Search by name, category, or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white/80 backdrop-blur-sm border-primary/20 focus:border-primary/40"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary/60" size={18} />
            </div>
            
            <Button
              onClick={() => setIsMapVisible(!isMapVisible)}
              variant="outline"
              className="flex items-center gap-2 border-primary/20 hover:border-primary/40"
            >
              <MapPin size={18} className="text-primary/60" />
              {isMapVisible ? 'Hide Map' : 'Show Map'}
            </Button>
            
            {selectedCity && (
              <Button
                onClick={clearFilters}
                variant="ghost"
                className="flex items-center gap-2 text-primary hover:text-primary/80"
              >
                Clear Filters
              </Button>
            )}
          </div>
          
          {selectedCity && (
            <div className="flex items-center gap-2 text-sm font-medium text-primary">
              <MapPin size={16} />
              <span>Showing influencers in {selectedCity}</span>
            </div>
          )}
        </motion.div>
        
        {/* Map Discovery */}
        {isMapVisible && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-8"
          >
            <MapDiscovery onCitySelect={handleCitySelection} />
          </motion.div>
        )}

        {/* Influencer Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredInfluencers.length > 0 ? (
            filteredInfluencers.map((influencer, index) => (
              <InfluencerCard
                key={influencer.id}
                {...influencer}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-lg text-foreground/70">No influencers found matching your criteria</p>
              <Button 
                onClick={clearFilters}
                variant="outline" 
                className="mt-4 border-primary/20 hover:border-primary/40"
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
        
        {/* View All Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-12"
        >
          <Link 
            to="/influencers" 
            className="inline-flex items-center text-primary font-medium px-6 py-3 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors group"
          >
            Browse all influencers
            <ArrowRight size={18} className="ml-2 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default InfluencerShowcase;
