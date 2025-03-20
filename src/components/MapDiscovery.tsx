
import React, { useEffect, useRef, useState } from 'react';
import { indianInfluencers } from '@/data/indianInfluencers';
import { toast } from '@/components/ui/use-toast';
import { isGoogleMapsLoaded, generateMarkerContent } from '@/utils/mapUtils';

interface MapDiscoveryProps {
  onCitySelect: (city: string) => void;
}

const MapDiscovery: React.FC<MapDiscoveryProps> = ({ onCitySelect }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapError, setMapError] = useState<string | null>(null);

  // Group influencers by city to avoid duplicate markers
  const citiesWithInfluencers = React.useMemo(() => {
    const cities: Record<string, { coordinates: { lat: number, lng: number }, count: number }> = {};
    
    indianInfluencers.forEach(influencer => {
      if (cities[influencer.city]) {
        cities[influencer.city].count += 1;
      } else {
        cities[influencer.city] = {
          coordinates: influencer.coordinates,
          count: 1
        };
      }
    });
    
    return cities;
  }, []);

  useEffect(() => {
    // Function to initialize map after Google Maps API is loaded
    const initializeMap = () => {
      if (!mapRef.current) return;
      
      try {
        console.log("Initializing map...");
        // Initialize the map
        const mapOptions = {
          center: { lat: 20.5937, lng: 78.9629 }, // Center of India
          zoom: 5,
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: false,
        };
        
        mapInstanceRef.current = new window.google.maps.Map(mapRef.current, mapOptions);
        setMapLoaded(true);
        
        // Add markers for each city with influencers
        Object.entries(citiesWithInfluencers).forEach(([city, data]) => {
          const marker = new window.google.maps.Marker({
            position: data.coordinates,
            map: mapInstanceRef.current,
            title: `${city} (${data.count} influencers)`,
            animation: window.google.maps.Animation.DROP,
          });
          
          // Add info window for each marker
          const infoWindow = new window.google.maps.InfoWindow({
            content: generateMarkerContent(city, data.count)
          });
          
          marker.addListener('click', () => {
            infoWindow.open(mapInstanceRef.current, marker);
          });
          
          // Add event listener for the button inside info window
          window.google.maps.event.addListener(infoWindow, 'domready', () => {
            const cityId = city.replace(/\s+/g, '-');
            document.getElementById(`view-${cityId}`)?.addEventListener('click', () => {
              onCitySelect(city);
              infoWindow.close();
              toast({
                title: "City selected",
                description: `Showing influencers from ${city}`,
              });
            });
          });
          
          markersRef.current.push(marker);
        });
        
        console.log("Map initialization complete with", Object.keys(citiesWithInfluencers).length, "cities");
      } catch (error) {
        console.error('Error initializing map:', error);
        setMapError('Failed to initialize the map. Please try again.');
      }
    };

    // Function to load Google Maps API
    const loadGoogleMapsAPI = () => {
      if (isGoogleMapsLoaded()) {
        console.log("Google Maps API already loaded");
        initializeMap();
        return;
      }
      
      console.log("Loading Google Maps API...");
      
      // Define the callback for when the API loads
      window.initMap = () => {
        console.log("Google Maps API loaded successfully");
        initializeMap();
      };
      
      // Create and append the script element with the correct API key
      const script = document.createElement('script');
      // Use the API key properly
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyILn4tQ43sZeGmgDIyzbl9KLF7R8i-O2Tb&callback=initMap`;
      script.async = true;
      script.defer = true;
      
      // Handle errors in loading the script
      script.onerror = () => {
        console.error("Failed to load Google Maps API");
        setMapError('Failed to load Google Maps. Please check your internet connection and try again.');
        document.head.removeChild(script);
      };
      
      document.head.appendChild(script);
    };

    // Initialize the map component
    loadGoogleMapsAPI();
    
    // Cleanup function
    return () => {
      // Clean up markers
      markersRef.current.forEach(marker => {
        if (marker) marker.setMap(null);
      });
      markersRef.current = [];
      
      // Remove the callback from window object
      if (window.initMap) {
        window.initMap = undefined;
      }
    };
  }, [citiesWithInfluencers, onCitySelect]);

  return (
    <div className="w-full h-80 rounded-lg overflow-hidden shadow-md mb-8 relative">
      {mapError && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/90 z-10">
          <div className="text-center p-4">
            <p className="text-destructive font-medium mb-2">{mapError}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="px-4 py-2 bg-primary text-white rounded-md text-sm"
            >
              Reload Page
            </button>
          </div>
        </div>
      )}
      
      {!mapLoaded && !mapError && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/50 z-10">
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
            <p className="text-foreground/70">Loading map...</p>
          </div>
        </div>
      )}
      
      <div ref={mapRef} className="w-full h-full"></div>
    </div>
  );
};

export default MapDiscovery;
