
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
