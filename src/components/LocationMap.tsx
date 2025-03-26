
import React, { useEffect, useRef, useState } from 'react';
import { Card } from '@/components/ui/card';
import { MapPin, Navigation } from 'lucide-react';

interface LocationProps {
  latitude: number;
  longitude: number;
  name: string;
  address?: string;
  className?: string;
}

const LocationMap: React.FC<LocationProps> = ({ 
  latitude, 
  longitude, 
  name, 
  address,
  className 
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [error, setError] = useState('');
  
  // Function to load Google Maps script
  const loadGoogleMapsScript = () => {
    // Check if script is already loaded
    if (window.google && window.google.maps) {
      initializeMap();
      return;
    }
    
    const apiKey = localStorage.getItem('googleMapsApiKey');
    
    if (!apiKey) {
      setError('Google Maps API key is missing. Please set it in the settings.');
      return;
    }
    
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap`;
    script.defer = true;
    script.async = true;
    
    // Add global function for callback
    window.initMap = () => {
      initializeMap();
    };
    
    script.onerror = () => {
      setError('Failed to load Google Maps. Please check your internet connection.');
    };
    
    document.head.appendChild(script);
  };
  
  // Function to initialize map
  const initializeMap = () => {
    if (!mapRef.current) return;
    
    try {
      const position = { lat: latitude, lng: longitude };
      
      const map = new window.google.maps.Map(mapRef.current, {
        center: position,
        zoom: 15,
        styles: [
          { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
          { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
          { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
          {
            featureType: "administrative.locality",
            elementType: "labels.text.fill",
            stylers: [{ color: "#d59563" }],
          },
          {
            featureType: "poi",
            elementType: "labels.text.fill",
            stylers: [{ color: "#d59563" }],
          },
          {
            featureType: "poi.park",
            elementType: "geometry",
            stylers: [{ color: "#263c3f" }],
          },
          {
            featureType: "poi.park",
            elementType: "labels.text.fill",
            stylers: [{ color: "#6b9a76" }],
          },
          {
            featureType: "road",
            elementType: "geometry",
            stylers: [{ color: "#38414e" }],
          },
          {
            featureType: "road",
            elementType: "geometry.stroke",
            stylers: [{ color: "#212a37" }],
          },
          {
            featureType: "road",
            elementType: "labels.text.fill",
            stylers: [{ color: "#9ca5b3" }],
          },
          {
            featureType: "road.highway",
            elementType: "geometry",
            stylers: [{ color: "#746855" }],
          },
          {
            featureType: "road.highway",
            elementType: "geometry.stroke",
            stylers: [{ color: "#1f2835" }],
          },
          {
            featureType: "road.highway",
            elementType: "labels.text.fill",
            stylers: [{ color: "#f3d19c" }],
          },
          {
            featureType: "transit",
            elementType: "geometry",
            stylers: [{ color: "#2f3948" }],
          },
          {
            featureType: "transit.station",
            elementType: "labels.text.fill",
            stylers: [{ color: "#d59563" }],
          },
          {
            featureType: "water",
            elementType: "geometry",
            stylers: [{ color: "#17263c" }],
          },
          {
            featureType: "water",
            elementType: "labels.text.fill",
            stylers: [{ color: "#515c6d" }],
          },
          {
            featureType: "water",
            elementType: "labels.text.stroke",
            stylers: [{ color: "#17263c" }],
          },
        ]
      });
      
      const marker = new window.google.maps.Marker({
        position,
        map,
        title: name,
        animation: window.google.maps.Animation.DROP
      });
      
      const infoWindow = new window.google.maps.InfoWindow({
        content: `
          <div style="color: #333; padding: 5px;">
            <h3 style="margin: 0 0 5px; font-size: 16px;">${name}</h3>
            ${address ? `<p style="margin: 0; font-size: 12px;">${address}</p>` : ''}
          </div>
        `
      });
      
      marker.addListener('click', () => {
        infoWindow.open(map, marker);
      });
      
      setMapLoaded(true);
    } catch (err) {
      console.error('Error initializing map:', err);
      setError('Failed to initialize the map. Please try again later.');
    }
  };
  
  // Load map when component mounts
  useEffect(() => {
    loadGoogleMapsScript();
    
    // Clean up
    return () => {
      // Remove global callback function
      delete window.initMap;
    };
  }, [latitude, longitude]);
  
  // Open in Google Maps
  const openInGoogleMaps = () => {
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`, '_blank');
  };
  
  return (
    <Card className={`overflow-hidden ${className || ''} bg-zinc-800 border-zinc-700`}>
      <div className="relative">
        {error ? (
          <div className="flex items-center justify-center h-64 bg-zinc-800 text-center p-4">
            <div>
              <MapPin size={32} className="mx-auto mb-2 text-gray-500" />
              <p className="text-gray-400">{error}</p>
              <div className="mt-4 text-sm flex justify-center gap-2">
                <input
                  type="text"
                  placeholder="Enter Google Maps API Key"
                  className="px-3 py-2 rounded-md border border-zinc-700 bg-zinc-800 text-gray-200 text-sm"
                  onChange={(e) => {
                    localStorage.setItem('googleMapsApiKey', e.target.value);
                  }}
                />
                <button
                  className="bg-primary text-white rounded-md px-3 py-2 text-sm"
                  onClick={loadGoogleMapsScript}
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div 
              ref={mapRef} 
              className="h-64 bg-zinc-800 w-full"
              style={{ opacity: mapLoaded ? 1 : 0.5 }}
            />
            
            {!mapLoaded && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
              </div>
            )}
            
            <button
              className="absolute bottom-3 right-3 bg-primary text-white rounded-full p-2 shadow-md hover:bg-primary/90 transition-colors"
              onClick={openInGoogleMaps}
              title="Get directions"
            >
              <Navigation size={18} />
            </button>
          </>
        )}
      </div>
      
      <div className="p-4">
        <div className="flex items-start">
          <MapPin className="text-primary mt-1 mr-2 flex-shrink-0" size={18} />
          <div>
            <h3 className="font-medium text-gray-200">{name}</h3>
            {address && <p className="text-sm text-gray-400">{address}</p>}
            <p className="text-xs text-gray-500 mt-1">
              {latitude.toFixed(6)}, {longitude.toFixed(6)}
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default LocationMap;
