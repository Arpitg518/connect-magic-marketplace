
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Bell, 
  User, 
  MessageSquare, 
  FileText, 
  DollarSign, 
  Briefcase, 
  BarChart3, 
  ChevronRight, 
  Check, 
  Star, 
  Users, 
  TrendingUp,
  Instagram,
  Youtube,
  Twitter,
  MapPin,
  Sparkles
} from 'lucide-react';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MapDiscovery from '@/components/MapDiscovery';
import AIMatchmaking from '@/components/AIMatchmaking';
import { indianBusinesses } from '@/data/indianInfluencers';

// Custom TikTok icon since it's not available in lucide-react
const TikTokIcon = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="20" 
    height="20" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M9 12a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"/>
    <path d="M15 8a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"/>
    <path d="M15 8v8a4 4 0 0 1-4 4"/>
    <path d="M15 8h-4"/>
  </svg>
);

// Mock data for the influencer dashboard
const mockData = {
  pendingCampaigns: 3,
  messages: 5,
  profileCompleteness: 85,
  earnings: {
    total: 12580,
    pending: 2400,
    thisMonth: 3200
  },
  campaignOpportunities: [
    {
      id: 1,
      company: 'Nykaa',
      logo: 'https://images.unsplash.com/photo-1598257006626-48b0c252070d?ixlib=rb-4.0.3&auto=format&fit=crop&w=60&h=60&q=80',
      title: 'Beauty Products Review Series',
      budget: '₹150,000 - ₹250,000',
      matchScore: 95,
      dueDate: '2 weeks'
    },
    {
      id: 2,
      company: 'Boat Lifestyle',
      logo: 'https://images.unsplash.com/photo-1511300636408-a63a89df3482?ixlib=rb-4.0.3&auto=format&fit=crop&w=60&h=60&q=80',
      title: 'Audio Product Launch Campaign',
      budget: '₹200,000 - ₹300,000',
      matchScore: 89,
      dueDate: '3 weeks'
    },
    {
      id: 3,
      company: 'FabIndia',
      logo: 'https://images.unsplash.com/photo-1516762689617-e1cffcef479d?ixlib=rb-4.0.3&auto=format&fit=crop&w=60&h=60&q=80',
      title: 'Sustainable Fashion Collection',
      budget: '₹120,000 - ₹180,000',
      matchScore: 82,
      dueDate: '1 month'
    }
  ],
  activeCampaigns: [
    {
      id: 101,
      company: 'Mamaearth',
      logo: 'https://images.unsplash.com/photo-1526947425960-945c6e72858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=60&h=60&q=80',
      title: 'Natural Skincare Series',
      progress: 65,
      dueDate: 'Jun 28, 2023',
      status: 'In Progress'
    },
    {
      id: 102,
      company: 'Urban Company',
      logo: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=60&h=60&q=80',
      title: 'Home Services Promotion',
      progress: 30,
      dueDate: 'Jul 15, 2023',
      status: 'In Progress'
    }
  ],
  analytics: {
    followers: 57800,
    engagement: 4.8,
    growth: 12.5
  }
};

const InfluencerDashboard: React.FC = () => {
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [showMap, setShowMap] = useState(false);
  
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleCitySelection = (city: string) => {
    setSelectedCity(city);
    setShowMap(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-purple-50/50 to-white">
      <Header />
      
      <main className="flex-grow pt-28 pb-16">
        <div className="container mx-auto px-4 md:px-6">
          {/* Welcome Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h1 className="text-3xl font-bold mb-2">Welcome back, Komal</h1>
            <p className="text-foreground/70">Here's what's happening with your creator account today.</p>
          </motion.div>
          
          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8"
          >
            <div className="bg-white rounded-xl shadow-card border border-border/30 p-5">
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Briefcase size={22} className="text-primary" />
                </div>
                <span className="text-sm font-medium bg-primary/10 text-primary px-2 py-0.5 rounded">
                  Active
                </span>
              </div>
              <h3 className="text-lg font-medium mb-1">Campaigns</h3>
              <div className="flex justify-between items-end">
                <p className="text-2xl font-bold">{mockData.pendingCampaigns}</p>
                <Link to="/campaigns" className="text-sm text-primary flex items-center">
                  <span>View all</span>
                  <ChevronRight size={16} />
                </Link>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-card border border-border/30 p-5">
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <MessageSquare size={22} className="text-blue-600" />
                </div>
                {mockData.messages > 0 && (
                  <span className="text-sm font-medium bg-blue-100 text-blue-600 px-2 py-0.5 rounded">
                    New
                  </span>
                )}
              </div>
              <h3 className="text-lg font-medium mb-1">Messages</h3>
              <div className="flex justify-between items-end">
                <p className="text-2xl font-bold">{mockData.messages}</p>
                <Link to="/messages" className="text-sm text-blue-600 flex items-center">
                  <span>Open inbox</span>
                  <ChevronRight size={16} />
                </Link>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-card border border-border/30 p-5">
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                  <DollarSign size={22} className="text-green-600" />
                </div>
                <span className="text-sm font-medium bg-green-100 text-green-600 px-2 py-0.5 rounded">
                  This month
                </span>
              </div>
              <h3 className="text-lg font-medium mb-1">Earnings</h3>
              <div className="flex justify-between items-end">
                <p className="text-2xl font-bold">₹{(mockData.earnings.thisMonth).toLocaleString()}</p>
                <Link to="/earnings" className="text-sm text-green-600 flex items-center">
                  <span>View all</span>
                  <ChevronRight size={16} />
                </Link>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-card border border-border/30 p-5">
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                  <User size={22} className="text-purple-600" />
                </div>
                {mockData.profileCompleteness < 100 && (
                  <span className="text-sm font-medium bg-purple-100 text-purple-600 px-2 py-0.5 rounded">
                    Incomplete
                  </span>
                )}
              </div>
              <h3 className="text-lg font-medium mb-1">Profile</h3>
              <div className="flex justify-between items-end">
                <div className="flex flex-col">
                  <p className="text-2xl font-bold">{mockData.profileCompleteness}%</p>
                  <div className="w-24 h-1.5 bg-gray-200 rounded-full mt-1">
                    <div 
                      className="h-1.5 bg-purple-600 rounded-full" 
                      style={{ width: `${mockData.profileCompleteness}%` }} 
                    />
                  </div>
                </div>
                <Link to="/profile" className="text-sm text-purple-600 flex items-center">
                  <span>Complete</span>
                  <ChevronRight size={16} />
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Location-based Discovery */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-8"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <MapPin size={20} className="text-primary" />
                <h2 className="text-xl font-semibold">Location-based Discovery</h2>
              </div>
              <button 
                onClick={() => setShowMap(!showMap)}
                className="text-sm text-primary flex items-center hover:underline"
              >
                {showMap ? 'Hide Map' : 'Show Map'}
                <ChevronRight size={16} />
              </button>
            </div>
            
            {showMap && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mb-6"
              >
                <MapDiscovery onCitySelect={handleCitySelection} />
              </motion.div>
            )}
            
            {selectedCity && (
              <div className="flex items-center gap-2 bg-primary/10 py-2 px-4 rounded-lg text-primary mb-4">
                <MapPin size={16} />
                <span className="font-medium">Current location filter: {selectedCity}</span>
                <button 
                  onClick={() => setSelectedCity(null)}
                  className="ml-auto text-xs bg-white rounded-full px-2 py-0.5"
                >
                  Clear
                </button>
              </div>
            )}
          </motion.div>
          
          {/* Main Dashboard Sections */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Campaign Opportunities */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:col-span-2"
            >
              <div className="bg-white rounded-xl shadow-card border border-border/30 overflow-hidden">
                <div className="flex justify-between items-center p-5 border-b border-border/30">
                  <h2 className="text-xl font-semibold">Campaign Opportunities</h2>
                  <Link to="/opportunities" className="text-sm text-primary flex items-center">
                    <span>View all</span>
                    <ChevronRight size={16} />
                  </Link>
                </div>
                
                <div className="divide-y divide-border/30">
                  {mockData.campaignOpportunities.map((opportunity) => (
                    <div key={opportunity.id} className="p-5 hover:bg-secondary/30 transition-colors">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-lg overflow-hidden border border-border flex-shrink-0">
                          <img 
                            src={opportunity.logo} 
                            alt={opportunity.company}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-grow">
                          <div className="flex justify-between items-start mb-1">
                            <div>
                              <h3 className="font-medium">{opportunity.title}</h3>
                              <p className="text-sm text-foreground/70">{opportunity.company}</p>
                            </div>
                            <span className="text-sm font-medium bg-primary/10 text-primary px-2 py-0.5 rounded-full flex items-center">
                              <Sparkles size={12} className="mr-1" />
                              {opportunity.matchScore}% Match
                            </span>
                          </div>
                          <div className="flex items-center justify-between mt-3">
                            <div className="flex items-center gap-4">
                              <span className="text-sm text-foreground/70">
                                {opportunity.budget}
                              </span>
                              <span className="text-sm text-foreground/70">
                                Due: {opportunity.dueDate}
                              </span>
                            </div>
                            <Link 
                              to={`/opportunity/${opportunity.id}`} 
                              className="text-sm font-medium text-primary hover:underline"
                            >
                              View Details
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="p-5 bg-secondary/30 border-t border-border/30">
                  <button className="w-full py-2.5 text-center text-foreground font-medium bg-white border border-border rounded-md hover:bg-secondary/50 transition-colors">
                    Find More Opportunities
                  </button>
                </div>
              </div>
            </motion.div>
            
            {/* Analytics Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="bg-white rounded-xl shadow-card border border-border/30 overflow-hidden">
                <div className="flex justify-between items-center p-5 border-b border-border/30">
                  <h2 className="text-xl font-semibold">Your Metrics</h2>
                  <Link to="/analytics" className="text-sm text-primary flex items-center">
                    <span>Details</span>
                    <ChevronRight size={16} />
                  </Link>
                </div>
                
                <div className="p-5 space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <Users size={16} className="text-foreground/70 mr-2" />
                        <span className="text-sm font-medium">Total Followers</span>
                      </div>
                      <div className="flex items-center text-green-600 text-sm">
                        <TrendingUp size={14} className="mr-1" />
                        {mockData.analytics.growth}%
                      </div>
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold">{mockData.analytics.followers.toLocaleString()}</span>
                      <span className="text-xs text-foreground/60">across platforms</span>
                    </div>
                    <div className="flex items-center gap-3 mt-3">
                      <div className="flex items-center gap-1 text-sm">
                        <Instagram size={16} className="text-pink-600" />
                        <span>42.3K</span>
                      </div>
                      <div className="flex items-center gap-1 text-sm">
                        <Youtube size={16} className="text-red-600" />
                        <span>10.5K</span>
                      </div>
                      <div className="flex items-center gap-1 text-sm">
                        <TikTokIcon />
                        <span>5.0K</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-border/30">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <Star size={16} className="text-foreground/70 mr-2" />
                        <span className="text-sm font-medium">Engagement Rate</span>
                      </div>
                    </div>
                    <span className="text-2xl font-bold">{mockData.analytics.engagement}%</span>
                    <div className="mt-2 bg-gray-100 h-2 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${
                          mockData.analytics.engagement > 4 
                            ? 'bg-green-500' 
                            : mockData.analytics.engagement > 2 
                              ? 'bg-yellow-500' 
                              : 'bg-red-500'
                        }`}
                        style={{ width: `${mockData.analytics.engagement * 10}%` }}
                      />
                    </div>
                    <p className="text-sm text-green-600 mt-1">
                      Above industry average
                    </p>
                  </div>
                </div>
                
                <div className="p-5 bg-secondary/30 border-t border-border/30">
                  <Link 
                    to="/analytics/insights" 
                    className="block w-full py-2.5 text-center text-foreground font-medium bg-white border border-border rounded-md hover:bg-secondary/50 transition-colors"
                  >
                    View Analytics Dashboard
                  </Link>
                </div>
              </div>
              
              {/* AI Matchmaking */}
              <div className="bg-white rounded-xl shadow-card border border-border/30 overflow-hidden mt-6 p-5">
                <AIMatchmaking influencerId={1} />
              </div>
            </motion.div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default InfluencerDashboard;
