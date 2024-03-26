import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";

function Map({ pins }) {
  // TODO: Use user's current positon, or a random hotspot?
  const initalPosition = [39.75, -104.95];
  console.log(pins);

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
          <Popup>{pin.obsDt}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default Map;
