import React, { useEffect } from "react";
import {
  GeoapifyGeocoderAutocomplete,
  GeoapifyContext,
} from "@geoapify/react-geocoder-autocomplete";
import "@geoapify/geocoder-autocomplete/styles/minimal.css";
import { GEOAPIFY_API_KEY } from "../secrets";
import { getRegionCode } from "./utils/helpers";
import { getSpeciesByRegion, getSpeciesCommonNames } from "./services/apiEBird";

// User can select a state/province to get relevant species for that region
function SelectRegion({ regionCode, setRegionCode, setSpecies }) {
  function onPlaceSelect(value) {
    console.log("onPlaceSelect", value);

    // Clear species list if region is cleared
    if (!value) {
      setRegionCode(null);
      return;
    }

    // TODO: Consider try-catch block instead?
    // Get region code for selected state/province
    const selectedEntry = value?.properties;

    let region = getRegionCode(
      selectedEntry?.country_code,
      selectedEntry?.state
    );

    if (typeof region != "string") {
      region = region[0];
    }

    setRegionCode(region);
  }

  function onSuggestionChange(value) {
    // console.log("onSuggestionChange");
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

  return (
    <div>
      {/* Select location (regionCode) by state/province */}
      <GeoapifyContext apiKey={GEOAPIFY_API_KEY}>
        <GeoapifyGeocoderAutocomplete
          type="state"
          placeholder="Enter state/province here"
          placeSelect={onPlaceSelect}
          suggestionsChange={onSuggestionChange}
        />
      </GeoapifyContext>
    </div>
  );
}

export default SelectRegion;
