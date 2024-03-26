import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";

function Map({ pins }) {
  // TODO: Use user's current positon, or a random hotspot?
  const initalPosition = [39.75, -104.95];
  console.log(pins);

  return (
    <MapContainer
      center={initalPosition}
      zoom={13}
      className="h-full w-full z-0 fixed top-0"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={initalPosition}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
}

export default Map;
