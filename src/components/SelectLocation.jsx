import { useEffect, useState } from "react";
import Select from "react-select";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import {
  controlStyles,
  menuStyles,
  optionStyles,
  placeholderStyles,
  indicatorStyles,
} from "../utils/constants";
import { useAddressAutocomplete } from "../hooks/useAddressAutocomplete";
import { useLocationContext } from "../context/LocationContext";

/**
 * User can select a location to populate list of species recently observed near the location or in the region
 */
function SelectLocation() {
  const navigate = useNavigate();
  const { layer, speciesCode } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState("");
  const { searchLocation, handleLocationSelect, handleLocationClear } =
    useLocationContext();
  // For initial selected region, attempt to get it from searchLocation, which attempts to get it from the URL
  const [selectedRegion, setSelectedRegion] = useState(
    searchLocation
      ? {
          value: {
            layer: searchLocation.layer,
            lat: searchLocation.latitude,
            lng: searchLocation.longitude,
          },
          label: `${searchLocation.countryFlag} ${searchLocation.formattedAddress}`,
        }
      : null,
  );

  const {
    isLoading: isLoadingSuggestions,
    error: errorAutocomplete,
    suggestions,
  } = useAddressAutocomplete(query);

  // location object -> dropdown
  useEffect(() => {
    if (!suggestions.length && !selectedRegion && searchLocation?.layer) {
      setSelectedRegion({
        value: {
          layer: searchLocation.layer,
          lat: searchLocation.latitude,
          lng: searchLocation.longitude,
        },
        label: `${searchLocation.countryFlag} ${searchLocation.formattedAddress}`,
      });
    }
  }, [
    searchLocation?.countryFlag,
    searchLocation?.formattedAddress,
    searchLocation?.latitude,
    searchLocation?.longitude,
    searchLocation?.layer,
    selectedRegion,
    suggestions.length,
  ]);

  // Handle typing in input of dropdown
  function handleOnInputChange(input) {
    if (input.length > 1 && query !== input) setQuery(input);
  }

  // Handle clearing or selection of input from dropdown
  function handleChange(e, { action }) {
    // Input was cleared so clear region and species list
    if (action === "clear") {
      // TODO: Display history or recent searches
      setSelectedRegion(null);
      handleLocationClear();

      if (layer) {
        navigate("/");
      }
      return;
    }

    // Option was selected
    const selected = {
      value: {
        layer: e.value.layer,
        lat: e.value.latitude,
        lng: e.value.longitude,
      },
      label: `${e.value.countryFlag} ${e.value.formattedAddress}`,
    };
    console.log(selected);
    setSelectedRegion(selected);
    handleLocationSelect(selected.value);

    // If the selected location changed and there is a selected species, the species list should be reset and the currently selected species is invalid
    if (speciesCode) {
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
