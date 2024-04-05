import { useEffect, useMemo, useRef } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { useObservations } from "../hooks/useObservations";
import { Link, useNavigate, useParams } from "react-router-dom";
import { formatDate } from "../utils/helpers";

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

function ObservationMarker({ obs, idx, onSelectPin }) {
  const eventHandlers = {
    click: () => {
      onSelectPin({ idx: idx, lat: obs.lat, lng: obs.lng });
    },
  };

  return (
    <Marker position={[obs.lat, obs.lng]} eventHandlers={eventHandlers}>
      <Popup>
        <div className="flex flex-col">
          <span className="text-sm font-semibold">
            {idx + 1}. {formatDate(obs.obsDt)}
          </span>
          <Link
            target="_blank"
            to={`https://www.google.com/maps/dir/?api=1&travelmode=driving&layer=traffic&destination=${obs.lat},${obs.lng}`}
            className="font-semibold"
          >
            <span className="text-sm">Directions</span>
          </Link>
        </div>
      </Popup>
    </Marker>
  );
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
      {observations.map((obs, idx) => (
        <ObservationMarker
          key={`${obs.obsDt}-${obs.locId}`}
          obs={obs}
          idx={idx}
          onSelectPin={handleSelectPin}
        />
      ))}
      <MapComponent observations={observations} selectedPin={selectedPin} />
    </MapContainer>
  );
}

export default Map;
