import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, MapPin, Globe, Users, TrendingUp, Instagram, Youtube, Facebook, Twitter } from 'lucide-react';
import MapDiscovery from '@/components/MapDiscovery';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import GlobeVisualization from '@/components/GlobeVisualization';
import InfluencerList from '@/components/InfluencerList';
import { mockInfluencers } from '@/services/mockData';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import PageTransition from '@/components/layout/PageTransition';
import { Link } from 'react-router-dom';

const InfluencersPage: React.FC = () => {
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [showMap, setShowMap] = useState(true);
  const [viewMode, setViewMode] = useState<'map' | 'globe'>('map');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter influencers based on search and category
  const filteredInfluencers = mockInfluencers.filter(influencer => {
    const matchesSearch = influencer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      influencer.city.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCity = !selectedCity || influencer.city.toLowerCase() === selectedCity.toLowerCase();
    return matchesSearch && matchesCity;
  });

  const handleCitySelection = (city: string) => {
    setSelectedCity(city);
    setShowMap(false);
  };

  const clearFilters = () => {
    setSelectedCity(null);
    setSearchQuery('');
  };

  // Add this constant for Indian states
  const INDIAN_STATES = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
    "Delhi", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jammu and Kashmir",
    "Jharkhand", "Karnataka", "Kerala", "Ladakh", "Lakshadweep", "Madhya Pradesh",
    "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha",
    "Puducherry", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana",
    "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"
  ];

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col bg-zinc-900 text-gray-200">
        <main className="flex-grow pt-28 pb-16">
          <div className="container mx-auto px-4 md:px-6">
            {/* Page Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <h1 className="text-3xl font-bold mb-2 text-white">Find Influencers</h1>
              <p className="text-gray-300">Discover and collaborate with top influencers across India using our interactive map.</p>
            </motion.div>
            
            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-8"
            >
              <div className="bg-zinc-800 rounded-xl shadow-md border border-zinc-700/30 p-5">
                <div className="flex flex-col lg:flex-row items-stretch gap-4">
                  <div className="flex-grow relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Search size={18} className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      className="w-full pl-10 pr-3 py-3 border border-zinc-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary bg-zinc-800 text-white"
                      placeholder="Search by name, category, or location..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex flex-col gap-4">
                      <div className="flex flex-col md:flex-row gap-4">
                        <Button 
                          variant="outline"
                          className="flex items-center justify-center gap-2 border-zinc-700 text-white hover:bg-zinc-700 hover:text-white"
                          onClick={() => setShowMap(!showMap)}
                        >
                          <MapPin size={18} />
                          <span>{showMap ? 'Hide Map' : 'Show Map'}</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Active Filters */}
            {(selectedCity || searchQuery) && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                transition={{ duration: 0.3 }}
                className="mb-4"
              >
                <div className="flex flex-wrap items-center gap-2 p-4 rounded-lg bg-zinc-800/50 border border-zinc-700/30">
                  <span className="text-sm text-gray-300">Active filters:</span>
                  
                  {selectedCity && (
                    <Badge variant="outline" className="bg-zinc-700/50 border-zinc-600 text-white pl-2 pr-1 py-1 flex items-center gap-1">
                      <MapPin size={12} className="mr-1" />
                      {selectedCity}
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-5 w-5 ml-1 text-gray-300 hover:text-white" 
                        onClick={() => setSelectedCity(null)}
                      >
                        ×
                      </Button>
                    </Badge>
                  )}
                  
                  {searchQuery && (
                    <Badge variant="outline" className="bg-zinc-700/50 border-zinc-600 text-white pl-2 pr-1 py-1 flex items-center gap-1">
                      <Search size={12} className="mr-1" />
                      "{searchQuery}"
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-5 w-5 ml-1 text-gray-300 hover:text-white" 
                        onClick={() => setSearchQuery('')}
                      >
                        ×
                      </Button>
                    </Badge>
                  )}
                  
                  <Button 
                    variant="ghost" 
                    className="ml-auto text-sm text-gray-300 hover:text-white"
                    onClick={clearFilters}
                  >
                    Clear all
                  </Button>
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
                  <TabsList className="bg-zinc-800 border border-zinc-700/30">
                    <TabsTrigger value="map" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-white">
                      <MapPin size={16} />
                      <span>Map View</span>
                    </TabsTrigger>
                    <TabsTrigger value="globe" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-white">
                      <Globe size={16} />
                      <span>Globe View</span>
                    </TabsTrigger>
                  </TabsList>
                </div>
                
                <TabsContent value="map" className="mt-0">
                  {showMap && (
                    <div className="mb-8 rounded-lg overflow-hidden border border-zinc-700/30">
                      <MapDiscovery onCitySelect={handleCitySelection} />
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="globe" className="mt-0">
                  <div className="w-full h-[500px] bg-[#061022] rounded-lg overflow-hidden mb-8 border border-zinc-700/30">
                    <GlobeVisualization influencers={mockInfluencers} onCitySelect={handleCitySelection} />
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
      </div>
    </PageTransition>
  );
};

export default InfluencersPage;
