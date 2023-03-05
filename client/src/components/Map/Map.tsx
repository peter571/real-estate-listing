import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

const center = { lat: -1.286389, lng: 36.817223 };
const zoom = 12;

const Map = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_MAP_API_KEY,
  });

  if (isLoaded) {
    return <MapContainer />;
  }
  return <>Loading Map...</>
};

const MapContainer = () => {
  return (
   
      <GoogleMap center={center} zoom={zoom} mapContainerClassName='map-container'>
        // add markers or other elements here
      </GoogleMap>
   
  );
};

export default Map;
