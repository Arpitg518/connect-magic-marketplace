import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Briefcase, 
  MessageSquare, 
  DollarSign, 
  Users, 
  ChevronRight, 
  Search, 
  BarChart3, 
  Calendar, 
  FileText, 
  CheckCircle,
  TrendingUp,
  Filter
} from 'lucide-react';
import PageTransition from '@/components/layout/PageTransition';

// Mock data for the business dashboard
const mockData = {
  activeCampaigns: 3,
  messages: 8,
  budget: {
    total: 50000,
    spent: 32450,
    remaining: 17550
  },
  pendingInfluencers: 12,
  recentInfluencers: [
    {
      id: 1,
      name: 'Emma Rodriguez',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=80&h=80&q=80',
      category: 'Beauty & Lifestyle',
      followers: '652K',
      engagement: 4.8,
      match: 95
    },
    {
      id: 2,
      name: 'David Kim',
      avatar: 'https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixlib=rb-4.0.3&auto=format&fit=crop&w=80&h=80&q=80',
      category: 'Fitness & Health',
      followers: '489K',
      engagement: 5.2,
      match: 92
    },
    {
      id: 3,
      name: 'Sarah Johnson',
      avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?ixlib=rb-4.0.3&auto=format&fit=crop&w=80&h=80&q=80',
      category: 'Fashion & Style',
      followers: '1.2M',
      engagement: 3.9,
      match: 88
    },
    {
      id: 4,
      name: 'Michael Chen',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=80&h=80&q=80',
      category: 'Technology & Gaming',
      followers: '875K',
      engagement: 4.5,
      match: 85
    }
  ],
  upcomingCampaigns: [
    {
      id: 101,
      title: 'Summer Collection Launch',
      startDate: 'Jul 15, 2023',
      endDate: 'Aug 15, 2023',
      influencers: 8,
      budget: 12000,
      status: 'Upcoming'
    },
    {
      id: 102,
      title: 'Product Review Series',
      startDate: 'Aug 1, 2023',
      endDate: 'Aug 30, 2023',
      influencers: 5,
      budget: 8500,
      status: 'Planning'
    }
  ],
  campaignPerformance: {
    impressions: 2.4,
    engagement: 165800,
    conversions: 4350,
    roi: 320
  }
};

const BusinessDashboard: React.FC = () => {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col bg-zinc-900 text-gray-200">
        <main className="flex-grow pt-28 pb-16">
          <div className="container mx-auto px-4 md:px-6">
            {/* Welcome Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <h1 className="text-3xl font-bold mb-2">Welcome back, Lumina Beauty</h1>
              <p className="text-gray-400">Here's what's happening with your business account today.</p>
            </motion.div>
            
            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8"
            >
              <div className="bg-zinc-800 rounded-xl shadow-card border border-zinc-700/30 p-5">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center">
                    <Briefcase size={22} className="text-purple-400" />
                  </div>
                  <span className="text-sm font-medium bg-purple-500/10 text-purple-400 px-2 py-0.5 rounded">
                    Active
                  </span>
                </div>
                <h3 className="text-lg font-medium mb-1">Campaigns</h3>
                <div className="flex justify-between items-end">
                  <p className="text-2xl font-bold">{mockData.activeCampaigns}</p>
                  <Link to="/business/campaigns" className="text-sm text-purple-400 flex items-center">
                    <span>View all</span>
                    <ChevronRight size={16} />
                  </Link>
                </div>
              </div>
              
              <div className="bg-zinc-800 rounded-xl shadow-card border border-zinc-700/30 p-5">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center">
                    <MessageSquare size={22} className="text-blue-400" />
                  </div>
                  {mockData.messages > 0 && (
                    <span className="text-sm font-medium bg-blue-500/10 text-blue-400 px-2 py-0.5 rounded">
                      New
                    </span>
                  )}
                </div>
                <h3 className="text-lg font-medium mb-1">Messages</h3>
                <div className="flex justify-between items-end">
                  <p className="text-2xl font-bold">{mockData.messages}</p>
                  <Link to="/business/messages" className="text-sm text-blue-400 flex items-center">
                    <span>Open inbox</span>
                    <ChevronRight size={16} />
                  </Link>
                </div>
              </div>
              
              <div className="bg-zinc-800 rounded-xl shadow-card border border-zinc-700/30 p-5">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center">
                    <DollarSign size={22} className="text-green-400" />
                  </div>
                  <span className="text-sm font-medium bg-green-500/10 text-green-400 px-2 py-0.5 rounded">
                    Budget
                  </span>
                </div>
                <h3 className="text-lg font-medium mb-1">Remaining</h3>
                <div className="flex justify-between items-end">
                  <p className="text-2xl font-bold">${mockData.budget.remaining.toLocaleString()}</p>
                  <Link to="/business/budget" className="text-sm text-green-400 flex items-center">
                    <span>Manage</span>
                    <ChevronRight size={16} />
                  </Link>
                </div>
              </div>
              
              <div className="bg-zinc-800 rounded-xl shadow-card border border-zinc-700/30 p-5">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-12 h-12 rounded-full bg-yellow-500/10 flex items-center justify-center">
                    <Users size={22} className="text-yellow-400" />
                  </div>
                  {mockData.pendingInfluencers > 0 && (
                    <span className="text-sm font-medium bg-yellow-500/10 text-yellow-400 px-2 py-0.5 rounded">
                      Pending
                    </span>
                  )}
                </div>
                <h3 className="text-lg font-medium mb-1">Applications</h3>
                <div className="flex justify-between items-end">
                  <p className="text-2xl font-bold">{mockData.pendingInfluencers}</p>
                  <Link to="/business/influencers/pending" className="text-sm text-yellow-400 flex items-center">
                    <span>Review</span>
                    <ChevronRight size={16} />
                  </Link>
                </div>
              </div>
            </motion.div>
            
            {/* Influencer Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-8"
            >
              <div className="bg-zinc-800 rounded-xl shadow-card border border-zinc-700/30 p-5">
                <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4">
                  <div className="flex-grow relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Search size={18} className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      className="w-full pl-10 pr-3 py-3 border border-zinc-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-500 bg-zinc-900 text-gray-200"
                      placeholder="Search for influencers by name, category, or location..."
                    />
                  </div>
                  <button className="flex items-center justify-center gap-2 bg-zinc-700 text-gray-200 font-medium py-3 px-5 rounded-md hover:bg-zinc-600 transition-colors">
                    <Filter size={18} />
                    <span>Filters</span>
                  </button>
                  <button className="flex items-center justify-center bg-purple-500 text-white font-medium py-3 px-5 rounded-md hover:bg-purple-600 transition-colors">
                    Find Influencers
                  </button>
                </div>
              </div>
            </motion.div>
            
            {/* Main Dashboard Sections */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Recent Influencer Matches */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="lg:col-span-2"
              >
                <div className="bg-zinc-800 rounded-xl shadow-card border border-zinc-700/30 overflow-hidden">
                  <div className="flex justify-between items-center p-5 border-b border-zinc-700/30">
                    <h2 className="text-xl font-semibold">Recommended Influencers</h2>
                    <Link to="/business/influencers" className="text-sm text-purple-400 flex items-center">
                      <span>View all</span>
                      <ChevronRight size={16} />
                    </Link>
                  </div>
                  
                  <div className="divide-y divide-zinc-700/30">
                    {mockData.recentInfluencers.map((influencer) => (
                      <div key={influencer.id} className="p-5 hover:bg-zinc-700/30 transition-colors">
                        <div className="flex items-start gap-4">
                          <div className="w-14 h-14 rounded-full overflow-hidden border border-zinc-700 flex-shrink-0">
                            <img 
                              src={influencer.avatar} 
                              alt={influencer.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-grow">
                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
                              <div>
                                <h3 className="font-medium">{influencer.name}</h3>
                                <p className="text-sm text-gray-400">{influencer.category}</p>
                              </div>
                              <span className="text-sm font-medium bg-purple-500/10 text-purple-400 px-2 py-0.5 rounded-full mt-1 sm:mt-0 inline-flex items-center">
                                <CheckCircle size={12} className="mr-1" />
                                {influencer.match}% Match
                              </span>
                            </div>
                            <div className="flex flex-wrap gap-x-4 gap-y-2 mt-3">
                              <div className="flex items-center">
                                <Users size={14} className="text-gray-400 mr-1" />
                                <span className="text-sm">{influencer.followers}</span>
                              </div>
                              <div className="flex items-center">
                                <TrendingUp size={14} className="text-gray-400 mr-1" />
                                <span className="text-sm">{influencer.engagement}% Engagement</span>
                              </div>
                            </div>
                            <div className="flex items-center justify-between mt-3 pt-2">
                              <Link 
                                to={`/business/influencer/${influencer.id}`} 
                                className="text-sm font-medium text-purple-400 hover:underline"
                              >
                                View Profile
                              </Link>
                              <button className="text-sm bg-purple-500 text-white px-3 py-1.5 rounded-md hover:bg-purple-600 transition-colors">
                                Invite to Campaign
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="p-5 bg-zinc-700/30 border-t border-zinc-700/30">
                    <Link 
                      to="/business/influencers/discover" 
                      className="block w-full py-2.5 text-center text-gray-200 font-medium bg-zinc-800 border border-zinc-700 rounded-md hover:bg-zinc-700/50 transition-colors"
                    >
                      Discover More Influencers
                    </Link>
                  </div>
                </div>
              </motion.div>
              
              {/* Campaign Performance & Upcoming Campaigns */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                {/* Campaign Performance */}
                <div className="bg-zinc-800 rounded-xl shadow-card border border-zinc-700/30 overflow-hidden mb-6">
                  <div className="flex justify-between items-center p-5 border-b border-zinc-700/30">
                    <h2 className="text-xl font-semibold">Campaign Performance</h2>
                    <Link to="/business/analytics" className="text-sm text-purple-400 flex items-center">
                      <span>Details</span>
                      <ChevronRight size={16} />
                    </Link>
                  </div>
                  
                  <div className="p-5 grid grid-cols-2 gap-4">
                    <div className="p-3 bg-zinc-700/30 rounded-lg">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-gray-400">Impressions</span>
                        <TrendingUp size={14} className="text-green-400" />
                      </div>
                      <p className="text-lg font-semibold">{mockData.campaignPerformance.impressions}M</p>
                    </div>
                    
                    <div className="p-3 bg-zinc-700/30 rounded-lg">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-gray-400">Engagement</span>
                        <TrendingUp size={14} className="text-green-400" />
                      </div>
                      <p className="text-lg font-semibold">{mockData.campaignPerformance.engagement.toLocaleString()}</p>
                    </div>
                    
                    <div className="p-3 bg-zinc-700/30 rounded-lg">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-gray-400">Conversions</span>
                        <TrendingUp size={14} className="text-green-400" />
                      </div>
                      <p className="text-lg font-semibold">{mockData.campaignPerformance.conversions.toLocaleString()}</p>
                    </div>
                    
                    <div className="p-3 bg-zinc-700/30 rounded-lg">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-gray-400">ROI</span>
                        <TrendingUp size={14} className="text-green-400" />
                      </div>
                      <p className="text-lg font-semibold">{mockData.campaignPerformance.roi}%</p>
                    </div>
                  </div>
                  
                  <div className="p-5 bg-zinc-700/30 border-t border-zinc-700/30">
                    <Link 
                      to="/business/analytics/details" 
                      className="block w-full py-2.5 text-center text-gray-200 font-medium bg-zinc-800 border border-zinc-700 rounded-md hover:bg-zinc-700/50 transition-colors"
                    >
                      View Full Analytics
                    </Link>
                  </div>
                </div>
                
                {/* Upcoming Campaigns */}
                <div className="bg-zinc-800 rounded-xl shadow-card border border-zinc-700/30 overflow-hidden">
                  <div className="flex justify-between items-center p-5 border-b border-zinc-700/30">
                    <h2 className="text-xl font-semibold">Upcoming Campaigns</h2>
                    <Link to="/business/campaigns/calendar" className="text-sm text-purple-400 flex items-center">
                      <span>Calendar</span>
                      <ChevronRight size={16} />
                    </Link>
                  </div>
                  
                  <div className="divide-y divide-zinc-700/30">
                    {mockData.upcomingCampaigns.map((campaign) => (
                      <div key={campaign.id} className="p-5 hover:bg-zinc-700/30 transition-colors">
                        <div>
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="font-medium">{campaign.title}</h3>
                            <span className={`text-xs px-2 py-0.5 rounded-full ${
                              campaign.status === 'Upcoming' 
                                ? 'bg-blue-500/10 text-blue-400' 
                                : 'bg-yellow-500/10 text-yellow-400'
                            }`}>
                              {campaign.status}
                            </span>
                          </div>
                          <div className="flex items-center gap-3 text-sm text-gray-400 mb-3">
                            <div className="flex items-center">
                              <Calendar size={14} className="mr-1" />
                              <span>{campaign.startDate} - {campaign.endDate}</span>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="flex items-center">
                                <Users size={14} className="text-gray-400 mr-1" />
                                <span className="text-sm">{campaign.influencers} Influencers</span>
                              </div>
                              <div className="flex items-center">
                                <DollarSign size={14} className="text-gray-400 mr-1" />
                                <span className="text-sm">${campaign.budget.toLocaleString()}</span>
                              </div>
                            </div>
                            <Link 
                              to={`/business/campaign/${campaign.id}`} 
                              className="text-sm font-medium text-purple-400 hover:underline"
                            >
                              Manage
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="p-5 bg-zinc-700/30 border-t border-zinc-700/30">
                    <Link 
                      to="/business/campaigns/create" 
                      className="block w-full py-2.5 text-center text-purple-400 font-medium bg-zinc-800 border border-purple-500/30 rounded-md hover:bg-purple-500/10 transition-colors"
                    >
                      Create New Campaign
                    </Link>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </main>
      </div>
    </PageTransition>
  );
};

export default BusinessDashboard; 