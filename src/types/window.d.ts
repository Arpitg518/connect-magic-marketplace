
interface Window {
  google: typeof google;
  initMap: (() => void) | undefined;
}

declare namespace google.maps {
  interface GeocoderResponse extends Array<GeocoderResult> {}
  
  interface GeocoderResult {
    address_components: {
      long_name: string;
      short_name: string;
      types: string[];
    }[];
    formatted_address: string;
    geometry: {
      location: LatLng;
      location_type: string;
      viewport: {
        northeast: LatLng;
        southwest: LatLng;
      };
    };
    place_id: string;
    types: string[];
  }
}
