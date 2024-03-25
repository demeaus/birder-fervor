import React, { useEffect, useState } from "react";
import { getRegionCode } from "../utils/helpers";
import {
  getSpeciesCodesByRegion,
  getSpeciesCommonNames,
} from "../services/apiEBird";
import { getAutocompleteSuggestions } from "../services/apiGeoapify";
import Select from "react-select";
import { useNavigate, useParams } from "react-router-dom";
// import { useSpeciesCodes } from "../hooks/useSpeciesCodes";

const controlStyles =
  "rounded-full border-2 border-zinc-300 text-sm px-4 py-2 bg-zinc-50";
const menuStyles = "bg-zinc-100 text-sm px-2 py-1";
const optionStyles = "border-b py-1";
const placeholderStyles = "text-zinc-400";

// User can select a state/province to get relevant species for that region
function SelectRegion({ setSpecies }) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  // const { isLoading, error, speciesCodes } = useSpeciesCodes();
  const { regionCode } = useParams();
  const navigate = useNavigate();

  // Handle clearing or selection of input from dropdown
  function handleChange(e, { action }) {
    // Clear region and species list if region is cleared
    if (action === "clear") {
      navigate("/");
      return;
    }
    // TODO: Consider try-catch block instead?
    // Get region code for selected state/province for API call
    const selectedEntry = e.value;

    // Convert option value to ISO standaradized code
    let region = getRegionCode(
      selectedEntry?.country_code,
      selectedEntry?.state
    );

    if (typeof region != "string") {
      region = region[0];
    }

    if (!regionCode || regionCode !== region) {
      navigate(`/${region}`);
    }
  }

  // Syncs species list with selected location
  useEffect(() => {
    async function fetchSpecies() {
      // List of species codes
      const speciesCodes = await getSpeciesCodesByRegion(regionCode);
      console.log(speciesCodes.length);

      // List of species options for Select (value, label)
      const speciesList = await getSpeciesCommonNames(speciesCodes);

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
        onChange={handleChange}
        unstyled={true}
        backspaceRemovesValue={true}
        isClearable={true}
      />
    </div>
  );
}

export default SelectRegion;
