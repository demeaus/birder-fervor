import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import Map from "../features/observation/Map";
import Controls from "../ui/Controls";
import Observations from "../features/observation/Observations";
import { useObservations } from "../hooks/useObservations";
import SelectLocation from "../features/controls/SelectLocation";
import SelectSpecies from "../features/controls/SelectSpecies";
import { useIPLocation } from "../hooks/useIPLocation";
import { userLocated } from "../features/controls/controlSlice";
import { LuExternalLink, LuImage } from "react-icons/lu";
import { EBIRD_SPECIES_URL } from "../utils/constants";

function Main() {
  const { layer, speciesCode } = useParams();
  const { isLoading, error, observations = [] } = useObservations();
  const [selectedPin, setSelectedPin] = useState(null);

  const dispatch = useDispatch();
  const { location: userLocation } = useIPLocation();

  useEffect(() => {
    if (!userLocation) return;
    dispatch(userLocated(userLocation));
  }, [dispatch, userLocation]);

  function handleSelectPin(pin) {
    if (!selectedPin) {
      setSelectedPin(pin);
    } else if (pin.lat === selectedPin.lat && pin.lng === selectedPin.lng) {
      return;
    } else {
      setSelectedPin(pin);
    }
  }
  return (
    <div className="h-screen">
      <div className="flex flex-col items-center lg:static lg:flex-none lg:items-start">
        <Controls>
          <SelectLocation />
          {layer && (
            <div
              className={` ${speciesCode ? "flex items-center justify-between gap-2 md:flex-col-reverse md:items-end md:gap-1" : ""}`}
            >
              <SelectSpecies />
              {speciesCode && (
                <div>
                  <Link
                    className="flex max-w-fit items-center justify-between gap-2 rounded-full bg-yellow-500 px-3 py-2 md:absolute md:right-8 md:top-3 md:px-3 md:py-1"
                    to={`${EBIRD_SPECIES_URL}/${speciesCode}`}
                    target="_blank"
                  >
                    <LuExternalLink className="shrink-0" />
                    <span className="text-xs leading-3">eBird Info</span>
                  </Link>
                </div>
              )}
            </div>
          )}
        </Controls>
        <Observations
          selectedPin={selectedPin}
          handleSelectPin={handleSelectPin}
        />
      </div>
      <Map
        observations={observations}
        selectedPin={selectedPin}
        handleSelectPin={handleSelectPin}
      />
    </div>
  );
}

export default Main;
