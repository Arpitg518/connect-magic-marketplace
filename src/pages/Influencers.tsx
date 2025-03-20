
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, MapPin, Globe, Users, Star, TrendingUp } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MapDiscovery from '@/components/MapDiscovery';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import GlobeVisualization from '@/components/GlobeVisualization';
import InfluencerList from '@/components/InfluencerList';
import { indianInfluencers } from '@/data/indianInfluencers';

const InfluencersPage = () => {
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [showMap, setShowMap] = useState(true);
  const [viewMode, setViewMode] = useState<'map' | 'globe'>('map');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredInfluencers, setFilteredInfluencers] = useState(indianInfluencers);

  useEffect(() => {
    // Filter influencers based on search query and selected city
    let filtered = indianInfluencers;
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        inf => 
          inf.name.toLowerCase().includes(query) || 
          inf.category.toLowerCase().includes(query) || 
          inf.city.toLowerCase().includes(query)
      );
    }
    
    if (selectedCity) {
      filtered = filtered.filter(inf => inf.city === selectedCity);
    }
    
    setFilteredInfluencers(filtered);
  }, [searchQuery, selectedCity]);

  const handleCitySelection = (city: string) => {
    setSelectedCity(city);
    setShowMap(false);
  };

  const clearCityFilter = () => {
    setSelectedCity(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-purple-50/50 to-white">
      <Header />
      
      <main className="flex-grow pt-28 pb-16">
        <div className="container mx-auto px-4 md:px-6">
          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h1 className="text-3xl font-bold mb-2">Find Influencers</h1>
            <p className="text-foreground/70">Discover and connect with influencers across India using our interactive map.</p>
          </motion.div>
          
          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-8"
          >
            <div className="bg-white rounded-xl shadow-md border border-border/30 p-5">
              <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4">
                <div className="flex-grow relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search size={18} className="text-foreground/50" />
                  </div>
                  <input
                    type="text"
                    className="w-full pl-10 pr-3 py-3 border border-border/50 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                    placeholder="Search by name, category, or location..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button variant="outline" className="flex items-center justify-center gap-2">
                  <Filter size={18} />
                  <span>Filters</span>
                </Button>
                <Button className="flex items-center justify-center gap-2">
                  <Users size={18} />
                  <span>Find Influencers</span>
                </Button>
              </div>
            </div>
          </motion.div>
          
          {selectedCity && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.3 }}
              className="mb-4"
            >
              <div className="flex items-center gap-2 bg-primary/10 py-2 px-4 rounded-lg text-primary">
                <MapPin size={16} />
                <span className="font-medium">Showing influencers in {selectedCity}</span>
                <button 
                  onClick={clearCityFilter}
                  className="ml-auto text-xs bg-white rounded-full px-2 py-0.5"
                >
                  Clear
                </button>
              </div>
            </motion.div>
          )}
          
          {/* Visualization Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-8"
          >
            <Tabs defaultValue="map" className="w-full" onValueChange={(value) => setViewMode(value as 'map' | 'globe')}>
              <div className="flex justify-between items-center mb-4">
                <TabsList>
                  <TabsTrigger value="map" className="flex items-center gap-2">
                    <MapPin size={16} />
                    <span>Map View</span>
                  </TabsTrigger>
                  <TabsTrigger value="globe" className="flex items-center gap-2">
                    <Globe size={16} />
                    <span>Globe View</span>
                  </TabsTrigger>
                </TabsList>
                
                {viewMode === 'map' && (
                  <button 
                    onClick={() => setShowMap(!showMap)}
                    className="text-sm text-primary flex items-center hover:underline"
                  >
                    {showMap ? 'Hide Map' : 'Show Map'}
                  </button>
                )}
              </div>
              
              <TabsContent value="map" className="mt-0">
                {showMap && (
                  <div className="mb-8">
                    <MapDiscovery onCitySelect={handleCitySelection} />
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="globe" className="mt-0">
                <div className="w-full h-[500px] bg-[#06001a] rounded-lg overflow-hidden mb-8">
                  <GlobeVisualization influencers={indianInfluencers} onCitySelect={handleCitySelection} />
                </div>
              </TabsContent>
            </Tabs>
          </motion.div>
          
          {/* Influencer List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <InfluencerList influencers={filteredInfluencers} />
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default InfluencersPage;
