
import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Search, MapPin, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';
import { indianInfluencers } from '@/data/indianInfluencers';
import InfluencerCard from './InfluencerCard';
import MapDiscovery from './MapDiscovery';
import { Input } from './ui/input';
import { Button } from './ui/button';

const InfluencerShowcase: React.FC = () => {
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMapVisible, setIsMapVisible] = useState(false);

  // Filter influencers based on selected city and search query
  const filteredInfluencers = indianInfluencers.filter(influencer => {
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

  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-purple-50/50 to-white">
      <div className="container mx-auto px-4 md:px-6">
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
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
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
                className="pl-10 bg-white"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
            </div>
            
            <Button
              onClick={() => setIsMapVisible(!isMapVisible)}
              variant="outline"
              className="flex items-center gap-2"
            >
              <MapPin size={18} />
              {isMapVisible ? 'Hide Map' : 'Show Map'}
            </Button>
            
            {selectedCity && (
              <Button
                onClick={clearFilters}
                variant="ghost"
                className="flex items-center gap-2"
              >
                Clear Filters
              </Button>
            )}
          </div>
          
          {selectedCity && (
            <div className="flex items-center gap-2 text-sm font-medium">
              <MapPin size={16} className="text-primary" />
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
                className="mt-4"
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
            className="inline-flex items-center text-primary font-medium px-6 py-3 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors"
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
