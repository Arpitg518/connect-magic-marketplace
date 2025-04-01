import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Users, TrendingUp, MapPin, Instagram, Youtube, Twitter, Star } from 'lucide-react';
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

interface InfluencerCardProps {
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
  tags?: string[];
  bio?: string;
}

const InfluencerCard: React.FC<InfluencerCardProps> = ({
  id,
  name,
  followers,
  engagement,
  category,
  city,
  profileImage,
  socialLinks,
  tags,
  bio
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="group"
    >
      <Card className="overflow-hidden h-full hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20">
        <div className="h-48 bg-gradient-to-br from-primary/90 via-primary/80 to-primary relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
          <div className="absolute bottom-0 left-0 w-full p-4 pb-0">
            <div className="w-24 h-24 rounded-full border-4 border-white overflow-hidden bg-white shadow-lg transform group-hover:scale-105 transition-transform duration-300">
              <img 
                src={profileImage} 
                alt={name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="absolute top-4 right-4 flex items-center gap-1 bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full">
            <Star size={14} className="text-yellow-400 fill-yellow-400" />
            <span className="text-white text-sm font-medium">{engagement}%</span>
          </div>
        </div>
        <CardContent className="pt-6">
          <div className="mb-4">
            <h3 className="font-semibold text-xl group-hover:text-primary transition-colors">{name}</h3>
            <div className="flex items-center text-sm text-foreground/70 mt-1">
              <MapPin size={12} className="mr-1 text-primary" />
              <span>{city}</span>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge variant="secondary" className="font-normal bg-primary/10 text-primary hover:bg-primary/20">
              {category}
            </Badge>
            {tags?.map((tag, index) => (
              <Badge key={index} variant="outline" className="font-normal hover:bg-primary/5">
                {tag}
              </Badge>
            ))}
          </div>
          
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="bg-gradient-to-br from-primary/5 to-primary/10 p-3 rounded-lg border border-primary/10">
              <div className="flex items-center text-xs text-foreground/70 mb-1">
                <Users size={12} className="mr-1 text-primary" />
                <span>Followers</span>
              </div>
              <p className="text-sm font-medium">{formatNumber(followers)}</p>
            </div>
            <div className="bg-gradient-to-br from-primary/5 to-primary/10 p-3 rounded-lg border border-primary/10">
              <div className="flex items-center text-xs text-foreground/70 mb-1">
                <TrendingUp size={12} className="mr-1 text-primary" />
                <span>Engagement</span>
              </div>
              <p className="text-sm font-medium">{engagement}%</p>
            </div>
          </div>
          
          {bio && (
            <p className="text-sm text-foreground/70 mb-4 line-clamp-2">
              {bio}
            </p>
          )}
          
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              {socialLinks.instagram && (
                <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="text-pink-600 hover:text-pink-800 transition-colors">
                  <Instagram size={18} />
                </a>
              )}
              {socialLinks.youtube && (
                <a href={socialLinks.youtube} target="_blank" rel="noopener noreferrer" className="text-red-600 hover:text-red-800 transition-colors">
                  <Youtube size={18} />
                </a>
              )}
              {socialLinks.tiktok && (
                <a href={socialLinks.tiktok} target="_blank" rel="noopener noreferrer" className="text-black hover:text-gray-800 transition-colors">
                  <TikTokIcon />
                </a>
              )}
              {socialLinks.twitter && (
                <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700 transition-colors">
                  <Twitter size={18} />
                </a>
              )}
            </div>
            <Link to={`/influencer/${id}`}>
              <Button variant="outline" size="sm" className="hover:bg-primary hover:text-white transition-colors">
                View Profile
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </motion.div>
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

export default InfluencerCard;
