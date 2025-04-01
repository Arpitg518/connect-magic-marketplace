import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Users, TrendingUp, MapPin, Instagram, Youtube, Twitter, CheckCircle, Check } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

// Custom TikTok icon
const TikTokIcon = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="16" 
    height="16" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    className="lucide lucide-tiktok"
  >
    <path d="M9 12a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"/>
    <path d="M15 8a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"/>
    <path d="M15 8v8a4 4 0 0 1-4 4"/>
    <path d="M15 8h-4"/>
  </svg>
);

interface Influencer {
  id: number;
  name: string;
  category: string;
  city: string;
  state: string;
  country: string;
  rating: number;
  followers: number;
  price: number;
  image: string;
  description: string;
  tags: string[];
  languages: string[];
  availability: string;
  socialLinks: {
    instagram?: string;
    youtube?: string;
    twitter?: string;
  };
  portfolio: {
    title: string;
    description: string;
    metrics: {
      views: number;
      engagement: number;
    };
  }[];
  reviews: {
    id: number;
    rating: number;
    comment: string;
    author: string;
    date: string;
  }[];
  verified: boolean;
}

interface InfluencerListProps {
  influencers: Influencer[];
}

const InfluencerList: React.FC<InfluencerListProps> = ({ influencers }) => {
  const [sortBy, setSortBy] = React.useState<'followers' | 'engagement' | 'name'>('followers');
  const [sortedInfluencers, setSortedInfluencers] = React.useState<Influencer[]>(influencers);

  React.useEffect(() => {
    const sorted = [...influencers].sort((a, b) => {
      switch (sortBy) {
        case 'followers':
          return b.followers - a.followers;
        case 'engagement':
          return b.rating - a.rating;
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });
    setSortedInfluencers(sorted);
  }, [influencers, sortBy]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-white">Influencers ({sortedInfluencers.length})</h2>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-300">Sort by:</span>
          <select 
            className="text-sm bg-zinc-800 border border-zinc-700 text-white rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-primary/30"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'followers' | 'engagement' | 'name')}
          >
            <option value="followers">Followers: High to Low</option>
            <option value="engagement">Engagement: High to Low</option>
            <option value="name">Name: A to Z</option>
          </select>
        </div>
      </div>

      {sortedInfluencers.length === 0 ? (
        <div className="bg-zinc-800 rounded-xl p-8 text-center">
          <h3 className="text-lg font-medium mb-2 text-white">No influencers found</h3>
          <p className="text-gray-300">Try adjusting your search criteria or clear filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedInfluencers.map((influencer, index) => (
            <motion.div
              key={influencer.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <Card className="overflow-hidden h-full hover:shadow-md transition-shadow bg-zinc-800 border-zinc-700">
                <div className="h-40 bg-gradient-to-r from-primary/80 to-primary relative">
                  <div className="absolute bottom-0 left-0 w-full p-4 pb-0">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <img
                          src={influencer.image}
                          alt={influencer.name}
                          className="w-16 h-16 rounded-full object-cover border-2 border-primary/20"
                          loading="lazy"
                          onError={(e) => {
                            console.error('Image failed to load:', influencer.image);
                            e.currentTarget.src = "https://i.pravatar.cc/150?img=1";
                          }}
                        />
                        {influencer.verified && (
                          <div className="absolute -bottom-1 -right-1 bg-primary rounded-full p-1">
                            <Check size={12} className="text-white" />
                          </div>
                        )}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold">{influencer.name}</h3>
                        <p className="text-sm text-gray-400">{influencer.category}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <CardContent className="pt-4">
                  <div className="mb-4">
                    <div className="flex items-center text-sm text-gray-300 mt-1">
                      <MapPin size={12} className="mr-1" />
                      <span>{influencer.city}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge variant="secondary" className="font-normal bg-zinc-700 text-white">
                      {influencer.category}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    <div className="bg-zinc-700/50 p-2 rounded-md">
                      <div className="flex items-center text-xs text-gray-300">
                        <Users size={12} className="mr-1" />
                        <span>Followers</span>
                      </div>
                      <p className="text-sm font-medium text-white">{formatNumber(influencer.followers)}</p>
                    </div>
                    <div className="bg-zinc-700/50 p-2 rounded-md">
                      <div className="flex items-center text-xs text-gray-300">
                        <TrendingUp size={12} className="mr-1" />
                        <span>Engagement</span>
                      </div>
                      <p className="text-sm font-medium text-white">{influencer.rating}%</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      {Object.entries(influencer.socialLinks).map(([platform, url]) => {
                        if (url) {
                          switch (platform.toLowerCase()) {
                            case 'instagram':
                              return (
                                <a key={platform} href={url} target="_blank" rel="noopener noreferrer" className="text-pink-400 hover:text-pink-300">
                                  <Instagram size={16} />
                                </a>
                              );
                            case 'youtube':
                              return (
                                <a key={platform} href={url} target="_blank" rel="noopener noreferrer" className="text-red-400 hover:text-red-300">
                                  <Youtube size={16} />
                                </a>
                              );
                            case 'tiktok':
                              return (
                                <a key={platform} href={url} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">
                                  <TikTokIcon />
                                </a>
                              );
                            case 'twitter':
                              return (
                                <a key={platform} href={url} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">
                                  <Twitter size={16} />
                                </a>
                              );
                            default:
                              return null;
                          }
                        }
                        return null;
                      })}
                    </div>
                    <Link to={`/influencer/${influencer.id}`}>
                      <Button variant="outline" size="sm" className="border-zinc-700 text-white hover:bg-zinc-700">View Profile</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

// Helper function to format numbers (e.g., 1500000 -> 1.5M)
const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
};

export default InfluencerList;
