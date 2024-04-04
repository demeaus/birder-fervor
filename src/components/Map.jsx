import { useEffect } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { useObservations } from "../hooks/useObservations";
import { useNavigate, useParams } from "react-router-dom";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

const initalPosition = { lat: 39.75, lng: -104.95 };

function MapComponent({ observations, selectedPin }) {
  const map = useMap();
  const { regionCode: regionCodeURL, speciesCode: speciesCodeURL } =
    useParams();
  const navigate = useNavigate();

  // Sync map view with selected pin
  useEffect(() => {
    // Set view to selectedPin, if there is one
    if (selectedPin) {
      map.setView([selectedPin.lat, selectedPin.lng]);

      // Set view to first pin, if no pin is selected yet
    } else if (observations?.length > 0) {
      map.setView([observations[0].lat, observations[0].lng]);
      navigate(`/${regionCodeURL}/${speciesCodeURL}/${observations[0].subId}`);

      // If there are no observations, default to initial position
    } else {
      map.setView([initalPosition.lat, initalPosition.lng]);
    }
  }, [map, observations, selectedPin]);
}

function Map({ selectedPin, handleSelectPin }) {
  // TODO: Fix map height/screen height being greater than the actual screen height
  // TODO: Use user's current positon, or first pin or random hotspot?
  const { observations = [] } = useObservations();

  return (
    <MapContainer
      center={initalPosition}
      zoom={13}
      className="relative z-0 h-full w-full"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {observations.map((obs) => (
        <Marker key={`${obs.obsDt}-${obs.locId}`} position={[obs.lat, obs.lng]}>
          <Popup>
            {obs.obsDt} {obs.locName}
          </Popup>
        </Marker>
      ))}
      <MapComponent observations={observations} selectedPin={selectedPin} />
    </MapContainer>
  );
}

export default Map;
