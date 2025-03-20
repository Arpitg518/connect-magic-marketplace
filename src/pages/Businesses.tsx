
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { Briefcase, Filter, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { indianBusinesses } from '@/data/indianInfluencers';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageTransition from '@/components/layout/PageTransition';

const Businesses = () => {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  // Get unique categories
  const categories = Array.from(new Set(indianBusinesses.map(business => business.category)));

  // Filter businesses based on search and category
  const filteredBusinesses = indianBusinesses.filter(business => {
    const matchesSearch = searchQuery 
      ? business.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        business.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        business.category.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    
    const matchesCategory = selectedCategory 
      ? business.category === selectedCategory 
      : true;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-grow pb-16 pt-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <section className="mb-10">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div>
                  <h1 className="text-3xl font-bold">Discover Businesses</h1>
                  <p className="text-foreground/70 mt-1">Connect with brands looking for influencer partnerships</p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative">
                    <Input
                      type="text"
                      placeholder="Search businesses..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 w-full"
                    />
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-foreground/50" size={18} />
                  </div>
                  
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="px-3 py-2 rounded-md border border-border bg-white text-sm"
                  >
                    <option value="">All Categories</option>
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              {/* Filters display */}
              {selectedCategory && (
                <div className="flex items-center gap-2 mb-4">
                  <Badge variant="outline" className="pl-2 pr-1 py-1 flex items-center gap-1">
                    {selectedCategory}
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-5 w-5 ml-1" 
                      onClick={() => setSelectedCategory('')}
                    >
                      ×
                    </Button>
                  </Badge>
                  
                  {searchQuery && (
                    <Badge variant="outline" className="pl-2 pr-1 py-1 flex items-center gap-1">
                      Search: {searchQuery}
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-5 w-5 ml-1" 
                        onClick={() => setSearchQuery('')}
                      >
                        ×
                      </Button>
                    </Badge>
                  )}
                </div>
              )}
              
              {/* Businesses grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredBusinesses.length > 0 ? (
                  filteredBusinesses.map((business) => (
                    <motion.div
                      key={business.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Card className="overflow-hidden h-full hover:shadow-md transition-shadow">
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
                                <h3 className="font-semibold text-lg">{business.name}</h3>
                                <p className="text-sm text-foreground/70">{business.city}</p>
                              </div>
                            </div>
                            
                            <div>
                              <Badge variant="secondary" className="mb-3">
                                {business.category}
                              </Badge>
                              <p className="text-sm text-foreground/80 line-clamp-3">{business.description}</p>
                            </div>
                            
                            <div className="space-y-2 pt-2">
                              <p className="text-sm font-medium">Looking for:</p>
                              <div className="flex flex-wrap gap-1">
                                {business.lookingFor.map((tag, index) => (
                                  <Badge key={index} variant="outline" className="font-normal">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            
                            <div className="pt-2">
                              <p className="text-sm text-foreground/70">Budget: {business.budget}</p>
                            </div>
                            
                            <Button className="w-full mt-2">View Profile</Button>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))
                ) : (
                  <div className="col-span-full text-center py-12">
                    <p className="text-lg text-foreground/70">No businesses found matching your criteria</p>
                    <Button 
                      onClick={() => {
                        setSearchQuery('');
                        setSelectedCategory('');
                      }}
                      variant="outline" 
                      className="mt-4"
                    >
                      Clear Filters
                    </Button>
                  </div>
                )}
              </div>
            </section>
          </div>
        </main>
        
        <Footer />
      </div>
    </PageTransition>
  );
};

export default Businesses;
