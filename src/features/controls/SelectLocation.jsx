import { useEffect, useMemo, useState } from "react";
import Select from "react-select";
import {
  useNavigate,
  useParams,
  useSearchParams,
  useLocation,
} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  controlStyles,
  menuStyles,
  optionStyles,
  placeholderStyles,
  indicatorStyles,
  menuListStyles,
} from "../../utils/constants";
import { useAddressAutocomplete } from "../../hooks/useAddressAutocomplete";
import { locationCleared, locationSelected } from "./controlSlice";
import { useAddress } from "../../hooks/useAddress";

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

/**
 * User can select a location to populate list of species recently observed near the location or in the region
 */
function SelectLocation() {
  const dispatch = useDispatch();
  const selectedLocation = useSelector(
    (state) => state.control.selectedLocation,
  );
  const navigate = useNavigate();
  const { state } = useLocation();
  const { layer, speciesCode } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  const [query, setQuery] = useState("");
  const { address } = useAddress(
    selectedLocation
      ? {
          layer: selectedLocation.layer,
          lat: selectedLocation.latitude,
          lng: selectedLocation.longitude,
        }
      : { layer, lat, lng },
  );

  console.log("selectedLocation", selectedLocation);

  const selectedRegion = useMemo(
    () =>
      selectedLocation
        ? {
            value: {
              layer: selectedLocation.layer,
              lat: selectedLocation.latitude,
              lng: selectedLocation.longitude,
            },
            label: `${selectedLocation.countryFlag} ${selectedLocation.formattedAddress}`,
          }
        : null,
    [selectedLocation],
  );

  const {
    isLoading: isLoadingSuggestions,
    error: errorAutocomplete,
    suggestions,
  } = useAddressAutocomplete(query);

  // location object -> URL
  useEffect(() => {
    if (!selectedLocation) return;

    console.log("navigating");
    const { code, radius } = getParams(selectedLocation);
    searchParams.set("lat", selectedLocation.latitude);
    searchParams.set("lng", selectedLocation.longitude);
    searchParams.set("radius", radius || "");
    searchParams.set("code", code || "");
    if (speciesCode) {
      navigate(`/${selectedLocation.layer}/${speciesCode}`, {
        state: { clear: false },
      });
    } else {
      navigate(`/${selectedLocation.layer}`, { state: { clear: false } });
    }
    setSearchParams(searchParams, { replace: true });
  }, [selectedLocation, searchParams, setSearchParams, navigate, speciesCode]);

  // (URL -> location object) -> dropdown
  useEffect(() => {
    if (!suggestions.length && !selectedRegion && address) {
      dispatch(
        locationSelected({
          ...address,
          lat: address.latitude,
          lng: address.longitude,
        }),
      );
    }
  }, [state, address, dispatch, selectedRegion, suggestions.length]);

  // Handle typing in input of dropdown
  function handleOnInputChange(input) {
    if (input.length > 1 && query !== input) setQuery(input);
  }

  // Handle clearing or selection of input from dropdown
  function handleChange(e, { action }) {
    // Input was cleared so clear region and species list
    if (action === "clear") {
      // TODO: Display history or recent searches
      dispatch(locationCleared());

      if (layer) {
        navigate("/");
      }
      return;
    }

    // Option was selected
    dispatch(locationSelected(e.value));

    // If the selected location changed and there is a selected species, the species list should be reset and the currently selected species is invalid
    if (speciesCode) {
      console.log("clear speciesCode");
      navigate(`/${layer}`);
      setSearchParams(searchParams);
    }
  }

  return (
    <div className="w-full">
      <Select
        classNames={{
          placeholder: () => placeholderStyles,
          control: () => controlStyles,
          menu: () => menuStyles,
          menuList: () => menuListStyles,
          option: () => optionStyles,
          dropdownIndicator: () => indicatorStyles,
          loadingIndicator: () => indicatorStyles,
          clearIndicator: () => indicatorStyles,
        }}
        options={suggestions}
        onInputChange={handleOnInputChange}
        onChange={handleChange}
        unstyled={true}
        backspaceRemovesValue={true}
        isClearable={true}
        isLoading={isLoadingSuggestions}
        value={selectedRegion}
        placeholder="Enter location..."
        maxMenuHeight={160}
        noOptionsMessage={() => "No matching location found."}
      />
    </div>
  );
}

export default SelectLocation;
