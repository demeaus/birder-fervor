import { useEffect, useState } from "react";
import { getAutocompleteSuggestions } from "../services/apiRadar";
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

// User can select a state/province to get relevant species for that region
function SelectRegion() {
  const navigate = useNavigate();
  const { layer } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  const { isLoading: isLoadingAddress, error, address = {} } = useAddress();

  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isLoadingAutocomplete, setIsLoadingAutocomplete] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState(null);

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

    // Region was selected
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

  // Handle typing in input of dropdown
  function handleOnInputChange(input) {
    if (input.length > 1 && query !== input) setQuery(input);
  }

  // Syncs URL with region selector
  // URL -> dropdown
  useEffect(() => {
    if (!suggestions.length && address?.formattedAddress && !selectedRegion) {
      setSelectedRegion({
        value: {
          layer: layer,
          lat: lat,
          lng: lng,
        },
        label: `${address.countryFlag} ${address.formattedAddress}`,
      });
    }
  }, [
    address?.countryFlag,
    address?.formattedAddress,
    lat,
    lng,
    layer,
    selectedRegion,
    suggestions.length,
    navigate,
  ]);

  // Fetches list of autocomplete suggestions for search input
  useEffect(() => {
    async function fetchAutocompleteSuggestions() {
      try {
        setIsLoadingAutocomplete(true);
        const suggestionsList = await getAutocompleteSuggestions(query);

        // Format suggestions for React Select component
        if (suggestionsList) {
          console.log(suggestionsList);
          setSuggestions(
            suggestionsList.map((obj) => ({
              value: obj,
              label: `${obj.countryFlag} ${obj.formattedAddress}`,
            })),
          );
        }
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoadingAutocomplete(false);
      }
    }

    // Reduce amount of fetching by introducing delay while user enters query
    let timer = setTimeout(() => {
      if (query) {
        fetchAutocompleteSuggestions();
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div className="w-full">
      {/* Select location (layer) by state/province */}
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
        isLoading={isLoadingAutocomplete || isLoadingAddress}
        value={selectedRegion}
        placeholder="Enter state or province..."
      />
    </div>
  );
}

export default SelectRegion;
