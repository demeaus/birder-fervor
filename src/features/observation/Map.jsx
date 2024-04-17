import { useEffect } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { useSelector, useDispatch } from "react-redux";
import { useObservations } from "../../hooks/useObservations";
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { formatDate } from "../../utils/helpers";
import { useIPLocation } from "../../hooks/useIPLocation";

function MapComponent({ observations, selectedPin, initialPosition }) {
  const map = useMap();
  const { layer, speciesCode } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  // Sync map view with selected pin
  useEffect(() => {
    // Set view to selectedPin, if there is one
    if (selectedPin) {
      map.setView([selectedPin.lat, selectedPin.lng]);

      // Set view to first pin, if no pin is selected yet
    } else if (observations?.length > 0) {
      map.setView([observations[0].lat, observations[0].lng]);
      navigate(`/${layer}/${speciesCode}/${observations[0].subId}`);
      // setSearchParams(searchParams);
      setSearchParams(searchParams, { replace: true });

      // If there are no observations, default to initial position
    } else {
      map.setView([initialPosition.lat, initialPosition.lng]);
    }
  }, [
    initialPosition.lat,
    initialPosition.lng,
    map,
    observations,
    selectedPin,
    layer,
    navigate,
    speciesCode,
    searchParams,
    setSearchParams,
  ]);
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
  // const { location = {} } = useIPLocation();
  const userLocation = useSelector((state) => state.control.userLocation);

  const initialPosition = {
    lat: userLocation.latitude || 50,
    lng: userLocation.longitude || -100,
  };

  return (
    <MapContainer
      center={initialPosition}
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
      <MapComponent
        observations={observations}
        selectedPin={selectedPin}
        initialPosition={initialPosition}
      />
    </MapContainer>
  );
}

export default Map;
