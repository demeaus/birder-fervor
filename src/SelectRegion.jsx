import Select from "react-select";
import React, { useEffect, useState } from "react";
import {
  GeoapifyGeocoderAutocomplete,
  GeoapifyContext,
} from "@geoapify/react-geocoder-autocomplete";
import "@geoapify/geocoder-autocomplete/styles/minimal.css";
import { GEOAPIFY_API_KEY } from "../secrets";
import { getRegionCode } from "./utils/helpers";
import { getSpeciesByRegion } from "./services/apiEBird";

function SelectRegion() {
  const [species, setSpecies] = useState([]);
  const [regionCode, setRegionCode] = useState(null);

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
      console.log(region);
      region = region[0];
    }
    console.log("region", region);

    setRegionCode(region);
  }

  function onSuggestionChange(value) {
    // console.log("onSuggestionChange");
  }

  // Syncs species list with selected location
  useEffect(() => {
    async function fetchSpecies() {
      const speciesValues = await getSpeciesByRegion(regionCode);
      // TODO: species labels should use common species name
      setSpecies(speciesValues.map((val) => ({ value: val, label: val })));
    }
    fetchSpecies();
  }, [regionCode]);

  return (
    <div>
      {/* Select location (regionCode) by state/province */}
      <GeoapifyContext apiKey={GEOAPIFY_API_KEY}>
        <GeoapifyGeocoderAutocomplete
          type="state"
          placeholder="Enter address here"
          placeSelect={onPlaceSelect}
          suggestionsChange={onSuggestionChange}
        />
      </GeoapifyContext>
      {/* Display species in regioncode */}
      {/* TODO: Clear selected species when species list changes (region code changes) */}
      {regionCode && species.length && <Select options={species} />}
    </div>
  );
}

export default SelectRegion;
