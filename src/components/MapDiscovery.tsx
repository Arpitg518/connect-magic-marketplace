
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Check, Heart, X, MapPin, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { indianInfluencers } from '@/data/indianInfluencers';

interface Coordinates {
  lat: number;
  lng: number;
}

interface MapProps {
  onCitySelect: (city: string) => void;
}

const INDIA_CENTER = { lat: 22.5937, lng: 78.9629 };
const INDIAN_CITIES = [
  { name: 'Mumbai', coordinates: { lat: 19.0760, lng: 72.8777 } },
  { name: 'Delhi', coordinates: { lat: 28.6139, lng: 77.2090 } },
  { name: 'Bangalore', coordinates: { lat: 12.9716, lng: 77.5946 } },
  { name: 'Hyderabad', coordinates: { lat: 17.3850, lng: 78.4867 } },
  { name: 'Chennai', coordinates: { lat: 13.0827, lng: 80.2707 } },
  { name: 'Kolkata', coordinates: { lat: 22.5726, lng: 88.3639 } },
];

const MapDiscovery: React.FC<MapProps> = ({ onCitySelect }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [map, setMap] = useState<any>(null);
  const [markers, setMarkers] = useState<any[]>([]);

  // Initialize map
  useEffect(() => {
    if (!mapRef.current) return;

    const apiKey = "AlzaSyILn4tQ43sZeGmgDIyzbl9KLF7R8i-O2Tb";
    const mapScript = document.createElement('script');
    mapScript.src = `http://maps.gomaps.pro/maps/api/js?key=${apiKey}&libraries=places&callback=initMap`;
    mapScript.async = true;
    mapScript.defer = true;
    
    window.initMap = () => {
      const newMap = new window.google.maps.Map(mapRef.current!, {
        center: INDIA_CENTER,
        zoom: 5,
        styles: [
          {
            "featureType": "all",
            "elementType": "geometry",
            "stylers": [{"color": "#f5f5f5"}]
          },
          {
            "featureType": "water",
            "elementType": "geometry",
            "stylers": [{"color": "#c9c9c9"}]
          },
          {
            "featureType": "water",
            "elementType": "labels.text.fill",
            "stylers": [{"color": "#9e9e9e"}]
          },
          {
            "featureType": "road",
            "elementType": "geometry",
            "stylers": [{"color": "#ffffff"}]
          }
        ]
      });
      setMap(newMap);

      // Add city markers
      const cityMarkers = INDIAN_CITIES.map(city => {
        const marker = new window.google.maps.Marker({
          position: city.coordinates,
          map: newMap,
          title: city.name,
          icon: {
            path: window.google.maps.SymbolPath.CIRCLE,
            scale: 10,
            fillColor: "#9b87f5",
            fillOpacity: 0.8,
            strokeWeight: 2,
            strokeColor: "#ffffff"
          }
        });

        // Add click event to markers
        marker.addListener('click', () => {
          setSelectedCity(city.name);
          onCitySelect(city.name);
          newMap.setCenter(city.coordinates);
          newMap.setZoom(10);
        });

        return marker;
      });

      setMarkers(cityMarkers);
    };

    document.head.appendChild(mapScript);

    return () => {
      // Clean up
      document.head.removeChild(mapScript);
      window.initMap = undefined;
      markers.forEach(marker => marker.setMap(null));
    };
  }, [onCitySelect]);

  return (
    <div className="relative w-full h-[500px] rounded-xl overflow-hidden shadow-card border border-border/30 mb-10">
      <div ref={mapRef} className="absolute inset-0" />
      
      {/* Map overlay info */}
      <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-lg">
        <h3 className="text-lg font-medium mb-2 flex items-center">
          <MapPin size={18} className="mr-2 text-primary" />
          Find Influencers by Location
        </h3>
        <p className="text-sm text-foreground/70">
          Click on a city marker to discover influencers in that location
        </p>
        {selectedCity && (
          <div className="mt-2 py-1 px-2 bg-primary/10 text-primary rounded-full text-sm font-medium">
            Currently viewing: {selectedCity}
          </div>
        )}
      </div>
    </div>
  );
};

export default MapDiscovery;
