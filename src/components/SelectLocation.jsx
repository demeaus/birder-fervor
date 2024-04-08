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
import { useAddress } from "../hooks/useAddress";
import { useAddressAutocomplete } from "../hooks/useAddressAutocomplete";

/**
 * User can select a location to populate list of species recently observed near the location or in the region
 */
function SelectLocation() {
  const navigate = useNavigate();
  const { layer } = useParams();
  const [setSearchParams] = useSearchParams();
  const [query, setQuery] = useState("");
  const [selectedRegion, setSelectedRegion] = useState(null);
  const { isLoading: isLoadingAddress, error, address = {} } = useAddress();
  const {
    isLoading: isLoadingSuggestions,
    error: errorAutocomplete,
    suggestions,
  } = useAddressAutocomplete(query);

  // Syncs URL with region selector dropdown
  useEffect(() => {
    if (!suggestions.length && !selectedRegion && address?.formattedAddress) {
      setSelectedRegion({
        value: {
          layer: address?.layer,
          lat: address.latitude,
          lng: address.longitude,
        },
        label: `${address.countryFlag} ${address.formattedAddress}`,
      });
    }
  }, [
    address?.countryFlag,
    address?.formattedAddress,
    address?.latitude,
    address?.longitude,
    address?.layer,
    selectedRegion,
    suggestions.length,
    navigate,
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

      if (layer) {
        navigate("/");
      }
      return;
    }

    // Option was selected
    const selected = e.value;
    console.log(selected);
    setSelectedRegion({
      value: {
        layer: selected.layer,
        lat: selected.latitude,
        lng: selected.longitude,
      },
      label: `${selected.countryFlag} ${selected.formattedAddress}`,
    });
    navigate(`/${selected.layer}`);
    setSearchParams(
      { lat: selected.latitude, lng: selected.longitude },
      { replace: true },
    );
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
        isLoading={isLoadingSuggestions || isLoadingAddress}
        value={selectedRegion}
        placeholder="Enter location..."
      />
    </div>
  );
}

export default SelectLocation;
