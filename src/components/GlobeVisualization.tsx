
import React, { useEffect, useState, useMemo } from "react";
import { World } from "@/components/Globe";
import { toast } from "@/components/ui/use-toast";

// Define the data structure for the globe
interface GlobeDataItem {
  order: number;
  color: string;
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  arcAlt: number;
}

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

// Cities for globe data
const majorIndianCities = [
  { name: "Mumbai", lat: 19.0760, lng: 72.8777, color: "#FF5733" },
  { name: "Delhi", lat: 28.6139, lng: 77.2090, color: "#33FF57" },
  { name: "Bangalore", lat: 12.9716, lng: 77.5946, color: "#3357FF" },
  { name: "Hyderabad", lat: 17.3850, lng: 78.4867, color: "#FF33E6" },
  { name: "Chennai", lat: 13.0827, lng: 80.2707, color: "#33FFF7" },
  { name: "Kolkata", lat: 22.5726, lng: 88.3639, color: "#F7FF33" },
  { name: "Jaipur", lat: 26.9124, lng: 75.7873, color: "#FF3333" },
  { name: "Ahmedabad", lat: 23.0225, lng: 72.5714, color: "#33FFB8" },
  { name: "Pune", lat: 18.5204, lng: 73.8567, color: "#9C33FF" },
  { name: "Lucknow", lat: 26.8467, lng: 80.9462, color: "#FF8D33" },
];

const GlobeVisualization: React.FC<GlobeVisualizationProps> = ({ influencers, onCitySelect }) => {
  const [selectedCity, setSelectedCity] = useState<string | null>(null);

  // Calculate connections for the globe visualization
  const globeData = useMemo(() => {
    // Create connections between major cities
    const connections: GlobeDataItem[] = [];
    
    // Group influencers by city to create connections
    const citiesWithInfluencers = majorIndianCities.filter(city => 
      influencers.some(inf => inf.city.includes(city.name))
    );
    
    // Create connections between cities that have influencers
    for (let i = 0; i < citiesWithInfluencers.length; i++) {
      for (let j = i + 1; j < citiesWithInfluencers.length; j++) {
        const city1 = citiesWithInfluencers[i];
        const city2 = citiesWithInfluencers[j];
        
        // Calculate influencers count for these cities
        const city1Count = influencers.filter(inf => inf.city.includes(city1.name)).length;
        const city2Count = influencers.filter(inf => inf.city.includes(city2.name)).length;
        
        // Only create connections if both cities have influencers
        if (city1Count > 0 && city2Count > 0) {
          const arcAlt = Math.min(0.3 + (city1Count + city2Count) / 20, 0.8);
          
          connections.push({
            order: i * 10 + j,
            color: city1.color,
            startLat: city1.lat,
            startLng: city1.lng,
            endLat: city2.lat,
            endLng: city2.lng,
            arcAlt: arcAlt,
          });
        }
      }
    }
    
    return connections;
  }, [influencers]);

  // Create globe config
  const globeConfig = {
    pointSize: 1.5,
    globeColor: "#1b1f33",
    showAtmosphere: true,
    atmosphereColor: "#ffffff",
    atmosphereAltitude: 0.1,
    emissive: "#0c0f1d",
    emissiveIntensity: 0.05,
    shininess: 0.9,
    polygonColor: "rgba(255,255,255,0.1)",
    ambientLight: "#ffffff",
    directionalLeftLight: "#ffffff",
    directionalTopLight: "#9f7bea",
    pointLight: "#ffffff",
    arcTime: 2000,
    arcLength: 0.9,
    rings: 1,
    maxRings: 3,
  };

  // Handle city selection from the globe
  useEffect(() => {
    if (selectedCity) {
      onCitySelect(selectedCity);
      toast({
        title: "City Selected",
        description: `Showing influencers from ${selectedCity}`,
      });
      setSelectedCity(null);
    }
  }, [selectedCity, onCitySelect]);

  // Add click handler for the globe
  useEffect(() => {
    const handleGlobeClick = (event: MouseEvent) => {
      // This is a simplified approach - in a real implementation,
      // you would use raycasting to detect clicks on specific parts of the globe
      const cities = majorIndianCities.filter(city => 
        influencers.some(inf => inf.city.includes(city.name))
      );
      
      if (cities.length > 0) {
        // Just as an example, we'll select a random city when globe is clicked
        const randomCity = cities[Math.floor(Math.random() * cities.length)];
        setSelectedCity(randomCity.name);
      }
    };

    // Add event listener to the canvas
    const canvas = document.querySelector('canvas');
    if (canvas) {
      canvas.addEventListener('click', handleGlobeClick);
    }

    return () => {
      if (canvas) {
        canvas.removeEventListener('click', handleGlobeClick);
      }
    };
  }, [influencers]);

  return (
    <div className="h-full w-full">
      <World 
        globeConfig={globeConfig} 
        data={globeData} 
      />
      <div className="absolute bottom-4 left-4 bg-black/70 text-white p-2 rounded text-sm">
        Click on the globe to explore influencers in different cities
      </div>
    </div>
  );
};

export default GlobeVisualization;
