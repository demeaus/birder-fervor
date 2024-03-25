import React, { useEffect, useState } from "react";
import { getRegionCode } from "./utils/helpers";
import { getSpeciesByRegion, getSpeciesCommonNames } from "./services/apiEBird";
import { getAutocompleteSuggestions } from "./services/apiGeoapify";
import Select from "react-select";

const controlStyles =
  "rounded-full border-2 border-zinc-300 text-sm px-4 py-2 bg-zinc-50";
const menuStyles = "bg-zinc-100 text-sm px-2 py-1";
const optionStyles = "border-b py-1";
const placeholderStyles = "text-zinc-400";

// User can select a state/province to get relevant species for that region
function SelectRegion({ regionCode, setRegionCode, setSpecies }) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  // Handle region selected by user
  function handleSelect(e) {
    console.log("handleSelect", e.value);

    // Clear species list if region is cleared
    if (!e.value) {
      setRegionCode(null);
      return;
    }

    // TODO: Consider try-catch block instead?
    // Get region code for selected state/province for API call
    const selectedEntry = e.value;

    let region = getRegionCode(
      selectedEntry?.country_code,
      selectedEntry?.state
    );

    if (typeof region != "string") {
      region = region[0];
    }

    setRegionCode(region);
  }

  // Syncs species list with selected location
  useEffect(() => {
    async function fetchSpecies() {
      // List of species codes
      const speciesValues = await getSpeciesByRegion(regionCode);

      // List of species options for Select (value, label)
      const speciesList = await getSpeciesCommonNames(speciesValues);

      setSpecies(speciesList.map((obj) => ({ value: obj[0], label: obj[1] })));
    }
    fetchSpecies();
  }, [regionCode, setSpecies]);

  // Fetches list of autocomplete suggestions for search input
  useEffect(() => {
    async function fetchAutocompleteSuggestions() {
      const suggestionsList = await getAutocompleteSuggestions(query);
      if (suggestionsList) {
        setSuggestions(
          suggestionsList.map((obj) => ({
            value: obj,
            label: obj.formatted,
          }))
        );
      }
    }
    let timer = setTimeout(() => {
      if (query) fetchAutocompleteSuggestions();
    }, 1500);

    return () => clearTimeout(timer);
  }, [query]);

  function handleOnInputChange(input) {
    if (input.length > 1) setQuery(input);
  }

  return (
    <div className="max-w-96">
      <h1>Search for species by region</h1>
      {/* Select location (regionCode) by state/province */}
      <Select
        classNames={{
          placeholder: () => placeholderStyles,
          control: () => controlStyles,
          menu: () => menuStyles,
          option: () => optionStyles,
        }}
        options={suggestions}
        onInputChange={handleOnInputChange}
        onChange={handleSelect}
        unstyled={true}
      />
    </div>
  );
}

export default SelectRegion;
