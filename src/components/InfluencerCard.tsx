
import React from 'react';
import { motion } from 'framer-motion';
import { Check, Star, Heart, X, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

interface InfluencerCardProps {
  id: number;
  name: string;
  image: string;
  category: string;
  followers: string;
  platform: string;
  platformIcon: React.ReactNode;
  city: string;
  tags?: string[];
  engagement?: number;
  verified?: boolean;
  bio?: string;
}

const InfluencerCard: React.FC<InfluencerCardProps> = ({
  id,
  name,
  image,
  category,
  followers,
  platform,
  platformIcon,
  city,
  tags,
  engagement,
  verified = false,
  bio
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="relative bg-white rounded-2xl overflow-hidden shadow-card border border-border/30 h-[440px]"
    >
      <div className="relative h-[280px] overflow-hidden">
        <img 
          src={image} 
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        
        {/* Follower count badge */}
        <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-sm text-white text-xs font-medium py-1 px-2 rounded-full flex items-center">
          {platformIcon}
          <span className="ml-1">{followers} followers</span>
        </div>
        
        {/* Verified badge */}
        {verified && (
          <div className="absolute top-4 left-4 bg-primary/10 backdrop-blur-sm text-white text-xs font-medium py-1 px-2 rounded-full flex items-center">
            <Check size={12} className="mr-1" />
            Verified
          </div>
        )}
        
        {/* City tag */}
        <div className="absolute bottom-4 left-4 bg-white/20 backdrop-blur-sm text-white text-xs font-medium py-1 px-2 rounded-full">
          {city}
        </div>
        
        {/* Engagement rate if available */}
        {engagement && (
          <div className="absolute bottom-4 right-4 bg-white/20 backdrop-blur-sm text-white text-xs font-medium py-1 px-2 rounded-full flex items-center">
            <Star size={12} className="mr-1 fill-yellow-400 text-yellow-400" />
            {engagement}% Engagement
          </div>
        )}
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="text-xl font-semibold mb-1">{name}</h3>
            <p className="text-sm text-foreground/70">{category}</p>
          </div>
        </div>
        
        {/* Tags */}
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-1 my-2">
            {tags.map((tag, index) => (
              <span 
                key={index} 
                className="text-xs bg-secondary text-foreground/70 px-2 py-0.5 rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
        
        {/* Bio */}
        {bio && (
          <p className="text-sm text-foreground/70 line-clamp-2 mb-3">{bio}</p>
        )}
        
        {/* Action buttons */}
        <div className="flex justify-between mt-2 pt-2 border-t border-border/30">
          <button className="w-12 h-12 rounded-full bg-red-100 text-red-500 flex items-center justify-center hover:bg-red-200 transition-colors">
            <X size={24} />
          </button>
          
          <Link to={`/influencer/${id}`} className="py-2 px-4 bg-primary/10 text-primary rounded-full text-sm font-medium hover:bg-primary/20 transition-colors">
            View Profile
          </Link>
          
          <button className="w-12 h-12 rounded-full bg-green-100 text-green-500 flex items-center justify-center hover:bg-green-200 transition-colors">
            <Heart size={24} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default InfluencerCard;
