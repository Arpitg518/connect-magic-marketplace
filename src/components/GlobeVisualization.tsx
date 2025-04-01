import React from 'react';

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

interface GlobeVisualizationProps {
  influencers: Influencer[];
  onCitySelect: (city: string) => void;
}

const GlobeVisualization: React.FC<GlobeVisualizationProps> = ({ influencers, onCitySelect }) => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="text-center">
        <h3 className="text-xl font-semibold mb-2">Globe Visualization</h3>
        <p className="text-gray-400">Globe visualization will be available soon.</p>
      </div>
    </div>
  );
};

export default GlobeVisualization; 