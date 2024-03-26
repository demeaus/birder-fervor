import React, { useEffect, useState } from "react";
import { getRegionCode } from "../utils/helpers";
import { getAutocompleteSuggestions } from "../services/apiGeoapify";
import Select from "react-select";
import { useNavigate, useParams } from "react-router-dom";
import { useSpeciesCodes } from "../hooks/useSpeciesCodes";
import { useSpeciesCommonNames } from "../hooks/useSpeciesCommonNames";

const controlStyles =
  "rounded-full border-2 border-zinc-300 text-sm px-4 py-2 bg-zinc-50";
const menuStyles = "bg-zinc-100 text-sm px-2 py-1";
const optionStyles = "border-b py-1";
const placeholderStyles = "text-zinc-400";

// User can select a state/province to get relevant species for that region
function SelectRegion({
  setRegionSpecies,
  selectedRegionCode,
  setSelectedRegionCode,
}) {
  console.log("rendering SelectRegion");
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const {
    isLoading: isLoadingSpeciesCodes,
    error: errorSpeciesCodes,
    speciesCodes = [],
  } = useSpeciesCodes();
  const {
    isLoading: isLoadingSpeciesCommonNames,
    error: errorSpeciesCommonNames,
    speciesCommonNames = [],
  } = useSpeciesCommonNames(speciesCodes);
  const { regionCode: regionCodeURL } = useParams();
  const navigate = useNavigate();

  // Handle clearing or selection of input from dropdown
  function handleChange(e, { action }) {
    // Clear region and species list if region is cleared
    if (action === "clear") {
      // TODO: Display history or recent searches
      setSelectedRegionCode("");
      navigate("/");
      return;
    }
    // TODO: Consider try-catch block instead?
    // Convert option value to ISO standardized code to get region code for eBird API
    const selectedEntry = e.value;
    let regionCode = getRegionCode(
      selectedEntry?.country_code,
      selectedEntry?.state
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
    // else {
    //   navigate(`/`);
    // }
  }

  function handleOnInputChange(input) {
    if (input.length > 1) setQuery(input);

    // If there is no selected region and region being searched
    if (!selectedRegionCode && !input.length) {
      navigate(`/`);
    }
  }

  // Syncs species list with selected location
  useEffect(() => {
    async function fetchSpecies() {
      // List of species codes
      // const speciesCodes = await getSpeciesCodesByRegion(regionCodeURL);
      console.log("len", speciesCodes.length);

      // List of species options for Select (value, label)
      // const speciesList = await getSpeciesCommonNames(speciesCodes);
      console.log("speciesCommonNames len: ", speciesCommonNames.length);

      setRegionSpecies(
        speciesCommonNames.map((obj) => ({ value: obj[0], label: obj[1] }))
      );
    }
    if (regionCodeURL) {
      console.log("fetching species");
      fetchSpecies();
    }
  }, [regionCodeURL, setRegionSpecies, speciesCodes, speciesCommonNames]);

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
    if (!query) {
      navigate(`/`);
      return;
    }
    // Reduce amount of fetching by introducing delay while user enters query
    let timer = setTimeout(() => {
      if (query) {
        console.log("fetching autocomplete suggestions");
        fetchAutocompleteSuggestions();
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, [query, navigate]);

  return (
    <div className="max-w-96">
      <h1>Search for species by region</h1>
      {/* Select location (regionCodeURL) by state/province */}
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
