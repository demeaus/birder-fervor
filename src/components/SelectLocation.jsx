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

function getParams(address) {
  let code, radius;
  if (!address?.layer) return;
  try {
    if (address.layer === "state") {
      if (!(address?.countryCode || address?.stateCode)) {
        throw new Error("Missing country code or state code for this state.");
      }
      code = `${address?.countryCode}-${address?.stateCode}`;
    } else if (address.layer === "country") {
      if (!address?.countryCode) {
        throw new Error("Missing country code for this country.");
      }
      code = address?.countryCode;
    } else {
      //TODO: make radius variable
      radius = 25;
      if (!(address?.latitude || address?.longitude || radius)) {
        throw new Error("Missing information to search by address.");
      }
    }
    return { code, radius };
  } catch (e) {
    console.error(e.message);
  }
}

/**
 * User can select a location to populate list of species recently observed near the location or in the region
 */
function SelectLocation() {
  const navigate = useNavigate();
  const { layer } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState("");
  const [selectedRegion, setSelectedRegion] = useState(null);
  const {
    isLoading: isLoadingAddress,
    error,
    address,
  } = useAddress(selectedRegion?.value);

  const {
    isLoading: isLoadingSuggestions,
    error: errorAutocomplete,
    suggestions,
  } = useAddressAutocomplete(query);

  // address object -> URL
  useEffect(() => {
    if (!selectedRegion || !address?.latitude) return;

    const { code, radius } = getParams(address);

    navigate(`/${address.layer}`);
    searchParams.set("lat", address.latitude);
    searchParams.set("lng", address.longitude);
    searchParams.set("radius", radius || "");
    searchParams.set("code", code || "");
    setSearchParams(searchParams);
  }, [selectedRegion, address, searchParams, setSearchParams, navigate]);

  // address object -> dropdown
  useEffect(() => {
    if (!suggestions.length && !selectedRegion && address?.layer) {
      setSelectedRegion({
        value: {
          layer: address.layer,
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
