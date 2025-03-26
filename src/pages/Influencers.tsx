
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, MapPin, Globe, Users, Star, TrendingUp, MessageSquare } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MapDiscovery from '@/components/MapDiscovery';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import GlobeVisualization from '@/components/GlobeVisualization';
import InfluencerList from '@/components/InfluencerList';
import { indianInfluencers } from '@/data/indianInfluencers';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useNavigate } from 'react-router-dom';
import PageTransition from '@/components/layout/PageTransition';

// Get all unique categories from influencers
const categories = Array.from(new Set(indianInfluencers.map(inf => inf.category)));
// Get all unique cities from influencers
const cities = Array.from(new Set(indianInfluencers.map(inf => inf.city)));

const InfluencersPage = () => {
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [showMap, setShowMap] = useState(true);
  const [viewMode, setViewMode] = useState<'map' | 'globe'>('map');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [filteredInfluencers, setFilteredInfluencers] = useState(indianInfluencers);
  const [isFiltering, setIsFiltering] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Filter influencers based on search query, selected city and category
    setIsFiltering(true);
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
    
    if (selectedCategory) {
      filtered = filtered.filter(inf => inf.category === selectedCategory);
    }
    
    setFilteredInfluencers(filtered);
    setIsFiltering(false);
  }, [searchQuery, selectedCity, selectedCategory]);

  const handleCitySelection = (city: string) => {
    setSelectedCity(city);
    setShowMap(false);
  };

  const clearFilters = () => {
    setSelectedCity(null);
    setSelectedCategory('');
    setSearchQuery('');
  };

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col bg-zinc-900 text-gray-200">
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
              <p className="text-gray-400">Discover and connect with top influencers across India using our interactive map.</p>
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
                      className="w-full pl-10 pr-3 py-3 border border-zinc-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary bg-zinc-800 text-gray-200"
                      placeholder="Search by name, category, or location..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  
                  <div className="flex flex-col md:flex-row gap-4">
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                      <SelectTrigger className="w-full md:w-[180px] bg-zinc-800 border-zinc-700 text-gray-200">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent className="bg-zinc-800 border-zinc-700 text-gray-200">
                        <SelectItem value="">All Categories</SelectItem>
                        {categories.map(category => (
                          <SelectItem key={category} value={category}>{category}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    
                    <Button 
                      variant="outline"
                      className="flex items-center justify-center gap-2 border-zinc-700 text-gray-200 hover:bg-zinc-700"
                      onClick={() => setShowMap(!showMap)}
                    >
                      <MapPin size={18} />
                      <span>{showMap ? 'Hide Map' : 'Show Map'}</span>
                    </Button>
                    
                    <Button className="flex items-center justify-center gap-2">
                      <Filter size={18} />
                      <span>Apply Filters</span>
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Active Filters */}
            {(selectedCity || selectedCategory || searchQuery) && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                transition={{ duration: 0.3 }}
                className="mb-4"
              >
                <div className="flex flex-wrap items-center gap-2 p-4 rounded-lg bg-zinc-800/50 border border-zinc-700/30">
                  <span className="text-sm text-gray-400">Active filters:</span>
                  
                  {selectedCity && (
                    <Badge variant="outline" className="bg-zinc-700/50 border-zinc-600 text-gray-200 pl-2 pr-1 py-1 flex items-center gap-1">
                      <MapPin size={12} className="mr-1" />
                      {selectedCity}
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-5 w-5 ml-1 text-gray-400 hover:text-gray-200" 
                        onClick={() => setSelectedCity(null)}
                      >
                        ×
                      </Button>
                    </Badge>
                  )}
                  
                  {selectedCategory && (
                    <Badge variant="outline" className="bg-zinc-700/50 border-zinc-600 text-gray-200 pl-2 pr-1 py-1 flex items-center gap-1">
                      <Filter size={12} className="mr-1" />
                      {selectedCategory}
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-5 w-5 ml-1 text-gray-400 hover:text-gray-200" 
                        onClick={() => setSelectedCategory('')}
                      >
                        ×
                      </Button>
                    </Badge>
                  )}
                  
                  {searchQuery && (
                    <Badge variant="outline" className="bg-zinc-700/50 border-zinc-600 text-gray-200 pl-2 pr-1 py-1 flex items-center gap-1">
                      <Search size={12} className="mr-1" />
                      "{searchQuery}"
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-5 w-5 ml-1 text-gray-400 hover:text-gray-200" 
                        onClick={() => setSearchQuery('')}
                      >
                        ×
                      </Button>
                    </Badge>
                  )}
                  
                  <Button 
                    variant="ghost" 
                    className="ml-auto text-sm text-gray-400 hover:text-gray-200"
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
              {isFiltering ? (
                <div className="text-center py-20">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto mb-4"></div>
                  <p className="text-gray-400">Loading influencers...</p>
                </div>
              ) : (
                <>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold text-gray-200">
                      Influencers ({filteredInfluencers.length})
                    </h2>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-400">Sort by:</span>
                      <select className="text-sm bg-zinc-800 border border-zinc-700 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-primary/30 text-gray-200">
                        <option value="followers">Followers: High to Low</option>
                        <option value="engagement">Engagement: High to Low</option>
                        <option value="name">Name: A to Z</option>
                      </select>
                    </div>
                  </div>
                  
                  {filteredInfluencers.length === 0 ? (
                    <div className="bg-zinc-800 rounded-xl p-8 text-center border border-zinc-700/30">
                      <h3 className="text-lg font-medium mb-2 text-gray-300">No influencers found</h3>
                      <p className="text-gray-400">Try adjusting your search criteria or clear filters.</p>
                      <Button 
                        variant="outline" 
                        className="mt-4 border-zinc-700 text-gray-200 hover:bg-zinc-700"
                        onClick={clearFilters}
                      >
                        Clear Filters
                      </Button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {filteredInfluencers.map((influencer, index) => (
                        <motion.div
                          key={influencer.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                        >
                          <div className="bg-zinc-800 rounded-xl overflow-hidden border border-zinc-700/30 h-full hover:shadow-lg transition-shadow">
                            <div className="h-40 bg-gradient-to-r from-primary/80 to-primary/60 relative">
                              <div className="absolute bottom-0 left-0 w-full p-4 pb-0">
                                <div className="w-20 h-20 rounded-full border-4 border-zinc-800 overflow-hidden bg-zinc-800">
                                  <img 
                                    src={influencer.profileImage} 
                                    alt={influencer.name}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="p-4 pt-6">
                              <div className="mb-4">
                                <h3 className="font-semibold text-lg text-gray-200">{influencer.name}</h3>
                                <div className="flex items-center text-sm text-gray-400 mt-1">
                                  <MapPin size={12} className="mr-1" />
                                  <span>{influencer.city}</span>
                                </div>
                              </div>
                              
                              <div className="flex flex-wrap gap-2 mb-4">
                                <Badge variant="secondary" className="font-normal bg-zinc-700/50 text-gray-200">
                                  {influencer.category}
                                </Badge>
                              </div>
                              
                              <div className="grid grid-cols-2 gap-2 mb-4">
                                <div className="bg-zinc-700/30 p-2 rounded-md">
                                  <div className="flex items-center text-xs text-gray-400">
                                    <Users size={12} className="mr-1" />
                                    <span>Followers</span>
                                  </div>
                                  <p className="text-sm font-medium text-gray-200">
                                    {new Intl.NumberFormat('en-IN', {
                                      maximumFractionDigits: 1,
                                      notation: "compact",
                                      compactDisplay: "short"
                                    }).format(influencer.followers)}
                                  </p>
                                </div>
                                <div className="bg-zinc-700/30 p-2 rounded-md">
                                  <div className="flex items-center text-xs text-gray-400">
                                    <TrendingUp size={12} className="mr-1" />
                                    <span>Engagement</span>
                                  </div>
                                  <p className="text-sm font-medium text-gray-200">{influencer.engagement}%</p>
                                </div>
                              </div>
                              
                              <div className="flex justify-between items-center">
                                <div className="flex items-center gap-2">
                                  {Object.entries(influencer.socialLinks || {}).map(([platform, link], i) => (
                                    <a 
                                      key={i}
                                      href={link} 
                                      target="_blank" 
                                      rel="noopener noreferrer" 
                                      className="text-gray-400 hover:text-gray-200"
                                    >
                                      {platform === 'instagram' && <i className="text-pink-600">Insta</i>}
                                      {platform === 'youtube' && <i className="text-red-600">YT</i>}
                                      {platform === 'tiktok' && <i className="text-gray-200">TikTok</i>}
                                      {platform === 'twitter' && <i className="text-blue-500">Twitter</i>}
                                    </a>
                                  ))}
                                </div>
                                <div className="flex gap-2">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="border-zinc-700 hover:bg-zinc-700"
                                    onClick={() => navigate(`/influencer/${influencer.id}`)}
                                  >
                                    View
                                  </Button>
                                  <Button
                                    variant="default"
                                    size="sm"
                                    className="bg-primary text-white"
                                    onClick={() => navigate(`/messages?user=${influencer.id}&type=influencer`)}
                                  >
                                    <MessageSquare size={14} className="mr-1" />
                                    Chat
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </>
              )}
            </motion.div>
          </div>
        </main>
        
        <Footer />
      </div>
    </PageTransition>
  );
};

export default InfluencersPage;
