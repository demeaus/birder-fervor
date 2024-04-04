import { useEffect, useState } from "react";
import { getRegionCode, getRegionName } from "../utils/helpers";
import { getAutocompleteSuggestions } from "../services/apiGeoapify";
import Select from "react-select";
import { useNavigate, useParams } from "react-router-dom";

import {
  controlStyles,
  menuStyles,
  optionStyles,
  placeholderStyles,
  indicatorStyles,
} from "../utils/constants";

// User can select a state/province to get relevant species for that region
function SelectRegion() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isLoadingAutocomplete, setIsLoadingAutocomplete] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState(null);
  const { regionCode: regionCodeURL } = useParams();
  const navigate = useNavigate();

  // Handle clearing or selection of input from dropdown
  function handleChange(e, { action }) {
    // Input was cleared so clear region and species list
    if (action === "clear") {
      // TODO: Display history or recent searches
      setSelectedRegion(null);

      if (regionCodeURL) {
        navigate("/");
      }
      return;
    }

    // Region was selected
    // Convert option value to ISO standardized code to get region code for eBird API
    const selectedEntry = e.value;
    let regionCode = getRegionCode(
      selectedEntry?.country_code,
      selectedEntry?.state,
    );
    if (typeof regionCode != "string") {
      regionCode = regionCode[0];
    }

    // select -> URL
    // If no region has been previously selected, move to URL or
    // if the selected region is different from the URL, go to the new selected region
    if (!regionCodeURL || regionCodeURL !== regionCode) {
      setSelectedRegion({ value: regionCode, label: selectedEntry.formatted });
      navigate(`/${regionCode}`);
    }
  }

  // Handle typing in input of dropdown
  function handleOnInputChange(input) {
    if (input.length > 1) setQuery(input);
  }

  // Syncs URL with region selector
  // URL -> dropdown
  useEffect(() => {
    if (!suggestions.length && regionCodeURL) {
      const { name, parent } = getRegionName(regionCodeURL);
      console.log("converted: ", name, parent);
      setSelectedRegion({ value: regionCodeURL, label: `${name}, ${parent}` });
    }
  }, [regionCodeURL, suggestions.length]);

  // Fetches list of autocomplete suggestions for search input
  useEffect(() => {
    async function fetchAutocompleteSuggestions() {
      try {
        setIsLoadingAutocomplete(true);
        const suggestionsList = await getAutocompleteSuggestions(query);

        // Format suggestions for React Select component
        // TODO: reduce value size
        if (suggestionsList) {
          setSuggestions(
            suggestionsList.map((obj) => ({
              value: obj,
              label: obj.formatted,
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
    <div className="min-w-fit max-w-80 sm:w-1/2">
      {/* Select location (regionCodeURL) by state/province */}
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
        isLoading={isLoadingAutocomplete}
        value={selectedRegion || null}
        placeholder="Enter state or province..."
      />
    </div>
  );
}

export default SelectRegion;
