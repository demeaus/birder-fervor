import { useEffect } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";

const initalPosition = { lat: 39.75, lng: -104.95 };

function MapComponent({ pins, selectedPin }) {
  const map = useMap();

  // Sync map view with selected pin
  useEffect(() => {
    // Set view to selectedPin, if there is one
    if (selectedPin) {
      map.setView([selectedPin.lat, selectedPin.lng]);

      // Set view to first pin, if no pin is selected yet
    } else if (pins?.length > 0) {
      map.setView([pins[0].lat, pins[0].lng]);

      // If there are no pins, default to initial position
    } else {
      map.setView([initalPosition.lat, initalPosition.lng]);
    }
  }, [map, pins, selectedPin]);
}

function Map({ pins, selectedPin }) {
  // TODO: Use user's current positon, or first pin or random hotspot?
  return (
    <MapContainer
      center={initalPosition}
      zoom={13}
      className="fixed top-0 z-0 h-full w-full"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {pins.map((pin) => (
        <Marker key={`${pin.obsDt}-${pin.locId}`} position={[pin.lat, pin.lng]}>
          <Popup>
            {pin.obsDt} {pin.locName}
          </Popup>
        </Marker>
      ))}
      <MapComponent pins={pins} selectedPin={selectedPin} />
    </MapContainer>
  );
}

export default Map;
