
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Users, TrendingUp, MapPin, Instagram, Youtube, Twitter } from 'lucide-react';
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
  followers: number;
  engagement: number;
  category: string;
  city: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  profileImage: string;
  socialLinks: {
    instagram?: string;
    youtube?: string;
    tiktok?: string;
    twitter?: string;
  };
}

interface InfluencerListProps {
  influencers: Influencer[];
}

const InfluencerList: React.FC<InfluencerListProps> = ({ influencers }) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Influencers ({influencers.length})</h2>
        <div className="flex items-center gap-2">
          <span className="text-sm text-foreground/70">Sort by:</span>
          <select className="text-sm bg-white border border-border/50 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-primary/30">
            <option value="followers">Followers: High to Low</option>
            <option value="engagement">Engagement: High to Low</option>
            <option value="name">Name: A to Z</option>
          </select>
        </div>
      </div>

      {influencers.length === 0 ? (
        <div className="bg-white rounded-xl p-8 text-center">
          <h3 className="text-lg font-medium mb-2">No influencers found</h3>
          <p className="text-foreground/70">Try adjusting your search criteria or clear filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {influencers.map((influencer, index) => (
            <motion.div
              key={influencer.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <Card className="overflow-hidden h-full hover:shadow-md transition-shadow">
                <div className="h-40 bg-gradient-to-r from-primary/80 to-primary relative">
                  <div className="absolute bottom-0 left-0 w-full p-4 pb-0">
                    <div className="w-20 h-20 rounded-full border-4 border-white overflow-hidden bg-white">
                      <img 
                        src={influencer.profileImage} 
                        alt={influencer.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
                <CardContent className="pt-4">
                  <div className="mb-4">
                    <h3 className="font-semibold text-lg">{influencer.name}</h3>
                    <div className="flex items-center text-sm text-foreground/70 mt-1">
                      <MapPin size={12} className="mr-1" />
                      <span>{influencer.city}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge variant="secondary" className="font-normal">
                      {influencer.category}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    <div className="bg-secondary/30 p-2 rounded-md">
                      <div className="flex items-center text-xs text-foreground/70">
                        <Users size={12} className="mr-1" />
                        <span>Followers</span>
                      </div>
                      <p className="text-sm font-medium">{formatNumber(influencer.followers)}</p>
                    </div>
                    <div className="bg-secondary/30 p-2 rounded-md">
                      <div className="flex items-center text-xs text-foreground/70">
                        <TrendingUp size={12} className="mr-1" />
                        <span>Engagement</span>
                      </div>
                      <p className="text-sm font-medium">{influencer.engagement}%</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      {influencer.socialLinks.instagram && (
                        <a href={influencer.socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="text-pink-600 hover:text-pink-800">
                          <Instagram size={16} />
                        </a>
                      )}
                      {influencer.socialLinks.youtube && (
                        <a href={influencer.socialLinks.youtube} target="_blank" rel="noopener noreferrer" className="text-red-600 hover:text-red-800">
                          <Youtube size={16} />
                        </a>
                      )}
                      {influencer.socialLinks.tiktok && (
                        <a href={influencer.socialLinks.tiktok} target="_blank" rel="noopener noreferrer" className="text-black hover:text-gray-800">
                          <TikTokIcon />
                        </a>
                      )}
                      {influencer.socialLinks.twitter && (
                        <a href={influencer.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700">
                          <Twitter size={16} />
                        </a>
                      )}
                    </div>
                    <Link to={`/influencer/${influencer.id}`}>
                      <Button variant="outline" size="sm">View Profile</Button>
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
