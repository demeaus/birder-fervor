import { useEffect, useState } from "react";
import { getRegionCode } from "../utils/helpers";
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
  const [selectedRegionCode, setSelectedRegionCode] = useState("");
  const { regionCode: regionCodeURL } = useParams();
  const navigate = useNavigate();

  // Handle clearing or selection of input from dropdown
  function handleChange(e, { action }) {
    // Clear region and species list if region is cleared
    if (action === "clear") {
      // TODO: Display history or recent searches
      setSelectedRegionCode("");

      if (regionCodeURL) {
        navigate("/");
      }
      return;
    }

    // Convert option value to ISO standardized code to get region code for eBird API
    const selectedEntry = e.value;
    let regionCode = getRegionCode(
      selectedEntry?.country_code,
      selectedEntry?.state,
    );
    if (typeof regionCode != "string") {
      regionCode = regionCode[0];
    }
    setSelectedRegionCode(regionCode);

    // If the first region is selected, move URL
    // If the selected region is different from the URL, go to the new selected region
    if (!regionCodeURL || regionCodeURL !== regionCode) {
      navigate(`/${regionCode}`);
    }
  }

  // Handle typing in input of dropdown
  function handleOnInputChange(input) {
    if (input.length > 1) setQuery(input);

    // Reset the URL if there is no selected region and no region being searched
    if (regionCodeURL && !selectedRegionCode && !input.length) {
      navigate(`/`);
    }
  }

  // Syncs URL with region selector
  useEffect(() => {
    // Handle reset of region state
    if (regionCodeURL && !query) {
      navigate(`/`);
      return;
    }
  }, [query, regionCodeURL, navigate]);

  // Fetches list of autocomplete suggestions for search input
  useEffect(() => {
    async function fetchAutocompleteSuggestions() {
      try {
        setIsLoadingAutocomplete(true);
        const suggestionsList = await getAutocompleteSuggestions(query);

        // Format suggestions for React Select component
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
      <h1>Select region:</h1>
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
      />
    </div>
  );
}

export default SelectRegion;
