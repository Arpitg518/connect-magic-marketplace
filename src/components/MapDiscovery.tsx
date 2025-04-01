import React from 'react';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';

interface MapDiscoveryProps {
  onCitySelect: (city: string) => void;
}

const MapDiscovery: React.FC<MapDiscoveryProps> = ({ onCitySelect }) => {
  const cities = [
    'Mumbai',
    'Delhi',
    'Bangalore',
    'Chennai',
    'Kolkata',
    'Hyderabad',
    'Pune',
    'Ahmedabad',
    'Jaipur',
    'Surat'
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="bg-white/80 backdrop-blur-sm rounded-xl border border-primary/20 p-6 shadow-lg"
    >
      <div className="flex items-center gap-2 mb-4">
        <MapPin className="text-primary" size={20} />
        <h3 className="text-lg font-semibold text-foreground">Popular Cities</h3>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        {cities.map((city) => (
          <motion.button
            key={city}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onCitySelect(city)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/5 hover:bg-primary/10 text-primary font-medium transition-colors border border-primary/10 hover:border-primary/20"
          >
            <MapPin size={16} />
            {city}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

export default MapDiscovery;
