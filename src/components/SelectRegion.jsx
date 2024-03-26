import React, { useEffect, useState } from "react";
import { getRegionCode } from "../utils/helpers";
import { getAutocompleteSuggestions } from "../services/apiGeoapify";
import Select from "react-select";
import { useNavigate, useParams } from "react-router-dom";

const controlStyles =
  "rounded-full border-2 border-zinc-300 text-sm px-4 py-2 bg-zinc-50";
const menuStyles = "bg-zinc-100 text-sm px-2 py-1";
const optionStyles = "border-b py-1";
const placeholderStyles = "text-zinc-400";

// User can select a state/province to get relevant species for that region
function SelectRegion() {
  console.log("rendering SelectRegion");
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
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
  }

  // Handle typing in input of dropdown
  function handleOnInputChange(input) {
    if (input.length > 1) setQuery(input);

    // Reset the URL if there is no selected region and no region being searched
    if (regionCodeURL && !selectedRegionCode && !input.length) {
      navigate(`/`);
    }
  }

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
    if (regionCodeURL && !query) {
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
  }, [query]);

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
