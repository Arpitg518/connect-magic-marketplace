import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Briefcase, Filter, Search, MapPin, MessageSquare, ArrowRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { indianBusinesses } from '@/data/indianBusinesses';
import PageTransition from '@/components/layout/PageTransition';
import MapDiscovery from '@/components/MapDiscovery';

const Businesses = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [showMap, setShowMap] = useState(false);

  // Get unique categories
  const categories = Array.from(new Set(indianBusinesses.map(business => business.category)));

  // Filter businesses based on search, category and city
  const filteredBusinesses = indianBusinesses.filter(business => {
    const matchesSearch = searchQuery 
      ? business.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        business.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        business.category.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    
    const matchesCategory = selectedCategory 
      ? business.category === selectedCategory 
      : true;
    
    const matchesCity = selectedCity
      ? business.location === selectedCity
      : true;
    
    return matchesSearch && matchesCategory && matchesCity;
  });

  const handleCitySelection = (city: string) => {
    setSelectedCity(city);
    setShowMap(false);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('');
    setSelectedCity(null);
  };

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col bg-zinc-900 text-gray-200">
        <main className="flex-grow pb-16 pt-28">
          <div className="container mx-auto px-4">
            <section className="mb-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-8"
              >
                <h1 className="text-3xl font-bold mb-2 text-white">Discover Businesses</h1>
                <p className="text-gray-300">Connect with brands looking for influencer partnerships across India</p>
              </motion.div>
              
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
                        placeholder="Search businesses..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                    
                    <div className="flex flex-col md:flex-row gap-4">
                      <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="px-3 py-2 rounded-md border border-zinc-700 bg-zinc-800 text-gray-200"
                      >
                        <option value="">All Categories</option>
                        {categories.map(category => (
                          <option key={category} value={category}>{category}</option>
                        ))}
                      </select>
                      
                      <Button 
                        variant="outline"
                        className="flex items-center justify-center gap-2 border-zinc-700 text-white hover:bg-zinc-700"
                        onClick={() => setShowMap(!showMap)}
                      >
                        <MapPin size={18} className="text-white" />
                        <span>{showMap ? 'Hide Map' : 'Show Map'}</span>
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
              
              {/* Map View (if enabled) */}
              {showMap && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mb-8 rounded-lg overflow-hidden border border-zinc-700/30"
                >
                  <MapDiscovery onCitySelect={handleCitySelection} />
                </motion.div>
              )}
              
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
              
              {/* Businesses grid */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-white">
                    Businesses ({filteredBusinesses.length})
                  </h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredBusinesses.length > 0 ? (
                    filteredBusinesses.map((business) => (
                      <motion.div
                        key={business.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Card className="overflow-hidden h-full hover:shadow-md transition-shadow bg-zinc-800 border-zinc-700">
                          <CardContent className="p-0">
                            <div className="p-6 space-y-4">
                              <div className="flex items-center gap-4">
                                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden">
                                  {business.logo ? (
                                    <img src={business.logo} alt={business.name} className="w-full h-full object-cover" />
                                  ) : (
                                    <Briefcase className="h-6 w-6 text-primary" />
                                  )}
                                </div>
                                
                                <div>
                                  <h3 className="font-semibold text-lg text-white">{business.name}</h3>
                                  <div className="flex items-center text-sm text-gray-300">
                                    <MapPin size={12} className="mr-1" />
                                    <span>{business.location}</span>
                                  </div>
                                </div>
                              </div>
                              
                              <div>
                                <Badge variant="secondary" className="mb-3 bg-zinc-700 text-gray-200">
                                  {business.category}
                                </Badge>
                                <p className="text-sm text-gray-200 line-clamp-3">{business.description}</p>
                              </div>
                              
                              <div className="space-y-2 pt-2">
                                <p className="text-sm font-medium text-gray-200">Looking for:</p>
                                <div className="flex flex-wrap gap-1">
                                  {business.marketingGoals.map((goal, index) => (
                                    <Badge key={index} variant="outline" className="font-normal border-zinc-600 bg-zinc-700/50 text-white">
                                      {goal}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                              
                              <div className="pt-2">
                                <p className="text-sm text-gray-300">
                                  Budget: <span className="text-white">₹{business.budget.preferred.toLocaleString()}</span>
                                </p>
                              </div>
                              
                              <div className="flex gap-2 pt-2">
                                <Button 
                                  variant="outline" 
                                  className="w-full"
                                  asChild
                                >
                                  <Link to={`/business/${business.id}`}>
                                    View Profile
                                  </Link>
                                </Button>
                                <Button 
                                  variant="outline" 
                                  className="border-zinc-700 hover:bg-zinc-700 text-white"
                                  onClick={() => navigate(`/messages?user=${business.id}&type=business`)}
                                >
                                  <MessageSquare size={16} />
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))
                  ) : (
                    <div className="col-span-full text-center py-12 bg-zinc-800 rounded-xl border border-zinc-700/30">
                      <p className="text-lg text-gray-300 mb-4">No businesses found matching your criteria</p>
                      <Button 
                        onClick={clearFilters}
                        variant="outline" 
                        className="border-zinc-700 hover:bg-zinc-700 text-gray-200"
                      >
                        Clear Filters
                      </Button>
                    </div>
                  )}
                </div>
              </motion.div>
            </section>
          </div>
        </main>
      </div>
    </PageTransition>
  );
};

export default Businesses;
