
import React, { useEffect, useRef } from 'react';
import { indianInfluencers } from '@/data/indianInfluencers';

interface MapDiscoveryProps {
  onCitySelect: (city: string) => void;
}

const MapDiscovery: React.FC<MapDiscoveryProps> = ({ onCitySelect }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);

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
    const initializeMap = () => {
      if (!mapRef.current) return;
      
      try {
        // Use the free map provider with correct API key
        const mapOptions = {
          center: { lat: 20.5937, lng: 78.9629 }, // Center of India
          zoom: 5,
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: false,
        };
        
        // Initialize the map
        mapInstanceRef.current = new window.google.maps.Map(mapRef.current, mapOptions);
        
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
            content: `
              <div class="p-2">
                <h3 class="font-semibold">${city}</h3>
                <p>${data.count} influencers available</p>
                <button id="view-${city}" class="text-xs text-primary font-medium">View Influencers</button>
              </div>
            `
          });
          
          marker.addListener('click', () => {
            infoWindow.open(mapInstanceRef.current, marker);
          });
          
          // Add event listener for the button inside info window
          window.google.maps.event.addListener(infoWindow, 'domready', () => {
            document.getElementById(`view-${city}`)?.addEventListener('click', () => {
              onCitySelect(city);
              infoWindow.close();
            });
          });
          
          markersRef.current.push(marker);
        });
      } catch (error) {
        console.error('Error initializing map:', error);
      }
    };

    // Load Google Maps API script
    if (!window.google) {
      const script = document.createElement('script');
      // Using the working API key and provider
      script.src = 'https://maps.gomaps.pro/map/lib/api?key=AlzaSyILn4tQ43sZeGmgDIyzbl9KLF7R8i-O2Tb&callback=initMap';
      script.async = true;
      script.defer = true;
      
      window.initMap = initializeMap;
      
      document.head.appendChild(script);
    } else {
      initializeMap();
    }
    
    // Cleanup
    return () => {
      markersRef.current.forEach(marker => {
        if (marker) marker.setMap(null);
      });
      markersRef.current = [];
    };
  }, [citiesWithInfluencers, onCitySelect]);

  return (
    <div className="w-full h-80 rounded-lg overflow-hidden shadow-md mb-8">
      <div ref={mapRef} className="w-full h-full"></div>
    </div>
  );
};

export default MapDiscovery;
