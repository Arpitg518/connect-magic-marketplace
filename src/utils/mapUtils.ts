
// Check if Google Maps API is loaded
export const isGoogleMapsLoaded = (): boolean => {
  return typeof window !== 'undefined' && 
         typeof window.google !== 'undefined' && 
         typeof window.google.maps !== 'undefined';
};

// Create a safe function to get URL parameters
export const getUrlParam = (name: string): string | null => {
  if (typeof window === 'undefined') return null;
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
};

// Helper function for generating marker content
export const generateMarkerContent = (city: string, count: number): string => {
  return `
    <div class="p-2">
      <h3 class="font-semibold">${city}</h3>
      <p>${count} influencers available</p>
      <button id="view-${city.replace(/\s+/g, '-')}" class="text-xs text-primary font-medium py-1 px-2 bg-primary/10 rounded-md">
        View Influencers
      </button>
    </div>
  `;
};

// Convert coordinates to address (for future use)
export const reverseGeocode = async (lat: number, lng: number): Promise<string> => {
  try {
    if (!isGoogleMapsLoaded()) {
      throw new Error("Google Maps API not loaded");
    }
    
    const geocoder = new window.google.maps.Geocoder();
    const response = await new Promise<google.maps.GeocoderResponse>((resolve, reject) => {
      geocoder.geocode({ location: { lat, lng } }, (results, status) => {
        if (status === "OK" && results && results.length > 0) {
          resolve(results);
        } else {
          reject(new Error(`Geocoder failed: ${status}`));
        }
      });
    });
    
    // Find city from address components
    const addressComponents = response[0].address_components;
    const cityComponent = addressComponents.find(
      component => component.types.includes("locality") || component.types.includes("administrative_area_level_2")
    );
    
    return cityComponent ? cityComponent.long_name : "Unknown location";
  } catch (error) {
    console.error("Error in reverseGeocode:", error);
    return "Unknown location";
  }
};
