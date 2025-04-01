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
  Filter,
  Star,
  Target,
  Heart,
  Award
} from 'lucide-react';
import PageTransition from '@/components/layout/PageTransition';

// Mock data for the influencer dashboard
const mockData = {
  activeCollaborations: 3,
  messages: 8,
  earnings: {
    total: 25000,
    pending: 8500,
    available: 16500
  },
  pendingRequests: 5,
  recentBrands: [
    {
      id: 1,
      name: 'Aditi Verma',
      logo: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=256&h=256&q=80',
      category: 'Fashion & Beauty',
      followers: '320K',
      engagement: 5.2,
      match: 95,
      location: 'Mumbai',
      platform: 'Instagram',
      pricing: '₹3,000 - ₹10,000 per post',
      bio: 'Fashion enthusiast & beauty expert sharing style tips and makeup tutorials',
      contentTypes: ['Fashion Lookbooks', 'Beauty Reviews', 'Style Tips'],
      languages: ['English', 'Hindi'],
      brandCollaborations: ['Lakme', 'Myntra', 'Nykaa'],
      achievements: ['Best Fashion Influencer 2023', '100K+ Followers Milestone'],
      stats: {
        totalPosts: 450,
        averageLikes: 15000,
        averageComments: 800,
        averageShares: 300
      }
    },
    {
      id: 2,
      name: 'Rohan Kapoor',
      logo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=256&h=256&q=80',
      category: 'Fitness & Wellness',
      followers: '850K',
      engagement: 4.8,
      match: 92,
      location: 'Delhi',
      platform: 'YouTube',
      pricing: '₹8,000 - ₹25,000 per video',
      bio: 'Certified fitness trainer & wellness coach helping people transform their lives',
      contentTypes: ['Workout Routines', 'Nutrition Tips', 'Transformation Stories'],
      languages: ['English', 'Hindi'],
      brandCollaborations: ['Cult.fit', 'MyProtein', 'Under Armour'],
      achievements: ['YouTube Silver Play Button', 'Featured in Men\'s Health'],
      stats: {
        totalVideos: 200,
        averageViews: 50000,
        averageComments: 1200,
        averageShares: 500
      }
    },
    {
      id: 3,
      name: 'Meera Iyer',
      logo: 'https://images.unsplash.com/photo-1524250502761-1ac6f2e30d43?w=256&h=256&q=80',
      category: 'Travel & Lifestyle',
      followers: '500K',
      engagement: 4.5,
      match: 88,
      location: 'Bangalore',
      platform: 'Instagram',
      pricing: '₹4,000 - ₹12,000 per post',
      bio: 'Digital nomad exploring hidden gems & sharing authentic travel experiences',
      contentTypes: ['Travel Guides', 'Local Experiences', 'Lifestyle Content'],
      languages: ['English', 'Kannada'],
      brandCollaborations: ['MakeMyTrip', 'Airbnb', 'GoPro'],
      achievements: ['Featured in Travel + Leisure', 'Top Travel Influencer 2023'],
      stats: {
        totalPosts: 300,
        averageLikes: 20000,
        averageComments: 1000,
        averageShares: 400
      }
    },
    {
      id: 4,
      name: 'Siddharth Nair',
      logo: 'https://images.unsplash.com/photo-1532074205216-d0e1f4b87368?w=256&h=256&q=80',
      category: 'Tech & Gadgets',
      followers: '1.2M',
      engagement: 5.6,
      match: 85,
      location: 'Hyderabad',
      platform: 'YouTube',
      pricing: '₹10,000 - ₹30,000 per video',
      bio: 'Tech reviewer & gadget enthusiast sharing honest reviews and tech insights',
      contentTypes: ['Gadget Reviews', 'Tech News', 'Tutorial Videos'],
      languages: ['English', 'Telugu'],
      brandCollaborations: ['Amazon', 'Samsung', 'OnePlus'],
      achievements: ['YouTube Gold Play Button', 'Best Tech Channel 2023'],
      stats: {
        totalVideos: 350,
        averageViews: 80000,
        averageComments: 2000,
        averageShares: 800
      }
    },
    {
      id: 5,
      name: 'Foodie Delights',
      logo: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&auto=format&fit=crop&w=80&h=80&q=80',
      category: 'Food & Cooking',
      followers: '1.8M',
      engagement: 4.2,
      match: 90
    },
    {
      id: 6,
      name: 'Travel Explorer',
      logo: 'https://images.unsplash.com/photo-1437846972679-9e6e537be46e?ixlib=rb-4.0.3&auto=format&fit=crop&w=80&h=80&q=80',
      category: 'Travel & Adventure',
      followers: '2.5M',
      engagement: 4.7,
      match: 87
    },
    {
      id: 7,
      name: 'Home Decor Plus',
      logo: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?ixlib=rb-4.0.3&auto=format&fit=crop&w=80&h=80&q=80',
      category: 'Home & Interior',
      followers: '1.1M',
      engagement: 4.1,
      match: 93
    },
    {
      id: 8,
      name: 'Pet Paradise',
      logo: 'https://images.unsplash.com/photo-1450778869180-41d0601e046e?ixlib=rb-4.0.3&auto=format&fit=crop&w=80&h=80&q=80',
      category: 'Pets & Animals',
      followers: '950K',
      engagement: 4.9,
      match: 89
    },
    {
      id: 9,
      name: 'Art & Craft Studio',
      logo: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=80&h=80&q=80',
      category: 'Art & Creativity',
      followers: '750K',
      engagement: 4.3,
      match: 86
    },
    {
      id: 10,
      name: 'Sports Zone',
      logo: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?ixlib=rb-4.0.3&auto=format&fit=crop&w=80&h=80&q=80',
      category: 'Sports & Fitness',
      followers: '1.3M',
      engagement: 4.6,
      match: 91
    }
  ],
  upcomingCollaborations: [
    {
      id: 101,
      title: 'Summer Collection Launch',
      brand: 'Lumina Beauty',
      startDate: 'Jul 15, 2023',
      endDate: 'Aug 15, 2023',
      compensation: 5000,
      status: 'Upcoming'
    },
    {
      id: 102,
      title: 'Product Review Series',
      brand: 'TechGear',
      startDate: 'Aug 1, 2023',
      endDate: 'Aug 30, 2023',
      compensation: 3500,
      status: 'Planning'
    }
  ],
  performance: {
    reach: 2.4,
    engagement: 165800,
    conversions: 4350,
    satisfaction: 98
  }
};

const InfluencerDashboard: React.FC = () => {
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
              <h1 className="text-3xl font-bold mb-2">Welcome back, Sarah Johnson</h1>
              <p className="text-gray-400">Here's what's happening with your influencer account today.</p>
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
                <h3 className="text-lg font-medium mb-1">Collaborations</h3>
                <div className="flex justify-between items-end">
                  <p className="text-2xl font-bold">{mockData.activeCollaborations}</p>
                  <Link to="/influencer/collaborations" className="text-sm text-purple-400 flex items-center">
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
                  <Link to="/influencer/messages" className="text-sm text-blue-400 flex items-center">
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
                    Earnings
                  </span>
                </div>
                <h3 className="text-lg font-medium mb-1">Available</h3>
                <div className="flex justify-between items-end">
                  <p className="text-2xl font-bold">${mockData.earnings.available.toLocaleString()}</p>
                  <Link to="/influencer/earnings" className="text-sm text-green-400 flex items-center">
                    <span>Withdraw</span>
                    <ChevronRight size={16} />
                  </Link>
                </div>
              </div>
              
              <div className="bg-zinc-800 rounded-xl shadow-card border border-zinc-700/30 p-5">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-12 h-12 rounded-full bg-yellow-500/10 flex items-center justify-center">
                    <Star size={22} className="text-yellow-400" />
                  </div>
                  {mockData.pendingRequests > 0 && (
                    <span className="text-sm font-medium bg-yellow-500/10 text-yellow-400 px-2 py-0.5 rounded">
                      New
                    </span>
                  )}
                </div>
                <h3 className="text-lg font-medium mb-1">Requests</h3>
                <div className="flex justify-between items-end">
                  <p className="text-2xl font-bold">{mockData.pendingRequests}</p>
                  <Link to="/influencer/requests" className="text-sm text-yellow-400 flex items-center">
                    <span>Review</span>
                    <ChevronRight size={16} />
                  </Link>
                </div>
              </div>
            </motion.div>
            
            {/* Brand Search Bar */}
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
                      placeholder="Search for brands by name, category, or location..."
                    />
                  </div>
                  <button className="flex items-center justify-center gap-2 bg-zinc-700 text-gray-200 font-medium py-3 px-5 rounded-md hover:bg-zinc-600 transition-colors">
                    <Filter size={18} />
                    <span>Filters</span>
                  </button>
                  <button className="flex items-center justify-center bg-purple-500 text-white font-medium py-3 px-5 rounded-md hover:bg-purple-600 transition-colors">
                    Find Brands
                  </button>
                </div>
              </div>
            </motion.div>
            
            {/* Main Dashboard Sections */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Recent Brand Matches */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="lg:col-span-2"
              >
                <div className="bg-zinc-800 rounded-xl shadow-card border border-zinc-700/30 overflow-hidden">
                  <div className="flex justify-between items-center p-5 border-b border-zinc-700/30">
                    <h2 className="text-xl font-semibold">Recommended Brands</h2>
                    <Link to="/influencer/brands" className="text-sm text-purple-400 flex items-center">
                      <span>View all</span>
                      <ChevronRight size={16} />
                    </Link>
                  </div>
                  
                  <div className="divide-y divide-zinc-700/30">
                    {mockData.recentBrands.map((brand) => (
                      <div key={brand.id} className="p-5 hover:bg-zinc-700/30 transition-colors">
                        <div className="flex items-start gap-4">
                          <div className="w-14 h-14 rounded-full overflow-hidden border border-zinc-700 flex-shrink-0">
                            <img 
                              src={brand.logo} 
                              alt={brand.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-grow">
                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
                              <div>
                                <h3 className="font-medium">{brand.name}</h3>
                                <p className="text-sm text-gray-400">{brand.category}</p>
                              </div>
                              <span className="text-sm font-medium bg-purple-500/10 text-purple-400 px-2 py-0.5 rounded-full mt-1 sm:mt-0 inline-flex items-center">
                                <CheckCircle size={12} className="mr-1" />
                                {brand.match}% Match
                              </span>
                            </div>
                            <div className="flex flex-wrap gap-x-4 gap-y-2 mt-3">
                              <div className="flex items-center">
                                <Users size={14} className="text-gray-400 mr-1" />
                                <span className="text-sm">{brand.followers}</span>
                              </div>
                              <div className="flex items-center">
                                <TrendingUp size={14} className="text-gray-400 mr-1" />
                                <span className="text-sm">{brand.engagement}% Engagement</span>
                              </div>
                            </div>
                            <div className="flex items-center justify-between mt-3 pt-2">
                              <Link 
                                to={`/influencer/brand/${brand.id}`} 
                                className="text-sm font-medium text-purple-400 hover:underline"
                              >
                                View Profile
                              </Link>
                              <button className="text-sm bg-purple-500 text-white px-3 py-1.5 rounded-md hover:bg-purple-600 transition-colors">
                                Start Collaboration
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="p-5 bg-zinc-700/30 border-t border-zinc-700/30">
                    <Link 
                      to="/influencer/brands/discover" 
                      className="block w-full py-2.5 text-center text-gray-200 font-medium bg-zinc-800 border border-zinc-700 rounded-md hover:bg-zinc-700/50 transition-colors"
                    >
                      Discover More Brands
                    </Link>
                  </div>
                </div>
              </motion.div>
              
              {/* Performance & Upcoming Collaborations */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                {/* Performance Stats */}
                <div className="bg-zinc-800 rounded-xl shadow-card border border-zinc-700/30 overflow-hidden mb-6">
                  <div className="flex justify-between items-center p-5 border-b border-zinc-700/30">
                    <h2 className="text-xl font-semibold">Performance</h2>
                    <Link to="/influencer/analytics" className="text-sm text-purple-400 flex items-center">
                      <span>Details</span>
                      <ChevronRight size={16} />
                    </Link>
                  </div>
                  
                  <div className="p-5 grid grid-cols-2 gap-4">
                    <div className="p-3 bg-zinc-700/30 rounded-lg">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-gray-400">Reach</span>
                        <TrendingUp size={14} className="text-green-400" />
                      </div>
                      <p className="text-lg font-semibold">{mockData.performance.reach}M</p>
                    </div>
                    
                    <div className="p-3 bg-zinc-700/30 rounded-lg">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-gray-400">Engagement</span>
                        <TrendingUp size={14} className="text-green-400" />
                      </div>
                      <p className="text-lg font-semibold">{mockData.performance.engagement.toLocaleString()}</p>
                    </div>
                    
                    <div className="p-3 bg-zinc-700/30 rounded-lg">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-gray-400">Conversions</span>
                        <TrendingUp size={14} className="text-green-400" />
                      </div>
                      <p className="text-lg font-semibold">{mockData.performance.conversions.toLocaleString()}</p>
                    </div>
                    
                    <div className="p-3 bg-zinc-700/30 rounded-lg">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-gray-400">Satisfaction</span>
                        <Heart size={14} className="text-red-400" />
                      </div>
                      <p className="text-lg font-semibold">{mockData.performance.satisfaction}%</p>
                    </div>
                  </div>
                  
                  <div className="p-5 bg-zinc-700/30 border-t border-zinc-700/30">
                    <Link 
                      to="/influencer/analytics/details" 
                      className="block w-full py-2.5 text-center text-gray-200 font-medium bg-zinc-800 border border-zinc-700 rounded-md hover:bg-zinc-700/50 transition-colors"
                    >
                      View Full Analytics
                    </Link>
                  </div>
                </div>
                
                {/* Upcoming Collaborations */}
                <div className="bg-zinc-800 rounded-xl shadow-card border border-zinc-700/30 overflow-hidden">
                  <div className="flex justify-between items-center p-5 border-b border-zinc-700/30">
                    <h2 className="text-xl font-semibold">Upcoming Collaborations</h2>
                    <Link to="/influencer/calendar" className="text-sm text-purple-400 flex items-center">
                      <span>Calendar</span>
                      <ChevronRight size={16} />
                    </Link>
                  </div>
                  
                  <div className="divide-y divide-zinc-700/30">
                    {mockData.upcomingCollaborations.map((collab) => (
                      <div key={collab.id} className="p-5 hover:bg-zinc-700/30 transition-colors">
                        <div>
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="font-medium">{collab.title}</h3>
                            <span className={`text-xs px-2 py-0.5 rounded-full ${
                              collab.status === 'Upcoming' 
                                ? 'bg-blue-500/10 text-blue-400' 
                                : 'bg-yellow-500/10 text-yellow-400'
                            }`}>
                              {collab.status}
                            </span>
                          </div>
                          <div className="flex items-center gap-3 text-sm text-gray-400 mb-3">
                            <div className="flex items-center">
                              <Calendar size={14} className="mr-1" />
                              <span>{collab.startDate} - {collab.endDate}</span>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="flex items-center">
                                <Target size={14} className="text-gray-400 mr-1" />
                                <span className="text-sm">{collab.brand}</span>
                              </div>
                              <div className="flex items-center">
                                <DollarSign size={14} className="text-gray-400 mr-1" />
                                <span className="text-sm">${collab.compensation.toLocaleString()}</span>
                              </div>
                            </div>
                            <Link 
                              to={`/influencer/collaboration/${collab.id}`} 
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
                      to="/influencer/collaborations/create" 
                      className="block w-full py-2.5 text-center text-purple-400 font-medium bg-zinc-800 border border-purple-500/30 rounded-md hover:bg-purple-500/10 transition-colors"
                    >
                      Create New Collaboration
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

export default InfluencerDashboard; 