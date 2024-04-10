import { createContext, useContext, useEffect, useState } from "react";
import { useAddress } from "../hooks/useAddress";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

const LocationContext = createContext();

function LocationProvider({ children }) {
  const navigate = useNavigate();
  const { layer } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  const [selectedValue, setSelectedValue] = useState(null);
  const { address: location } = useAddress(
    selectedValue ?? { layer, lat, lng },
  );

  const [searchLocation, setSearchLocation] = useState(location);

  // sync location object with user-selected value or URL
  useEffect(() => {
    setSearchLocation(location);
  }, [location]);

  // location object -> URL
  useEffect(() => {
    if (!searchLocation) return;
    const { code, radius } = getParams(searchLocation);

    console.log("navigating");
    searchParams.set("lat", searchLocation.latitude);
    searchParams.set("lng", searchLocation.longitude);
    searchParams.set("radius", radius || "");
    searchParams.set("code", code || "");
    navigate(`/${searchLocation.layer}`);
    setSearchParams(searchParams, { replace: true });
  }, [searchLocation, searchParams, setSearchParams, navigate]);

  // Derive URL parameters for eBird API calls from URL
  function getParams(location) {
    let code, radius;
    if (!location?.layer) return;
    try {
      if (location.layer === "state") {
        if (!(location?.countryCode || location?.stateCode)) {
          throw new Error("Missing country code or state code for this state.");
        }
        code = `${location?.countryCode}-${location?.stateCode}`;
      } else if (location.layer === "country") {
        if (!location?.countryCode) {
          throw new Error("Missing country code for this country.");
        }
        code = location?.countryCode;
      } else {
        //TODO: make radius variable
        radius = 25;
        if (!(location?.latitude || location?.longitude || radius)) {
          throw new Error("Missing information to search by address.");
        }
      }

      return { code, radius };
    } catch (e) {
      console.error(e.message);
    }
  }

  // dropdown value -> location obj
  function handleLocationSelect(obj) {
    setSelectedValue(obj);
    setSearchLocation(location);
  }

  return (
    <LocationContext.Provider value={{ searchLocation, handleLocationSelect }}>
      {children}
    </LocationContext.Provider>
  );
}

function useLocationContext() {
  const context = useContext(LocationContext);
  if (context === undefined)
    throw new Error("LocationContext was used outside of LocationProvider");
  return context;
}

export { LocationProvider, useLocationContext };