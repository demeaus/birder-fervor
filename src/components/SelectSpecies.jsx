import Select from "react-select";
import { useSpeciesCodes } from "../hooks/useSpeciesCodes";
import { useSpeciesCommonNames } from "../hooks/useSpeciesCommonNames";
import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

import {
  controlStyles,
  menuStyles,
  optionStyles,
  placeholderStyles,
  indicatorStyles,
} from "../utils/constants";
import { useGetSpeciesCodesFunction } from "../hooks/useGetSpeciesCodesFunction";

// TODO: group by species group
function SelectSpecies() {
  const [regionSpeciesList, setRegionSpeciesList] = useState([]);
  const [isLoadingSpecies, setIsLoadingSpecies] = useState(false);
  const navigate = useNavigate();
  const { layer, speciesCode: speciesCodeURL } = useParams();
  const [searchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  const res = useGetSpeciesCodesFunction(layer, lat, lng);
  console.log(res);

  const {
    status: statusSpeciesCodes,
    error: errorSpeciesCodes,
    speciesCodes = [],
  } = useSpeciesCodes(res);

  const {
    status: statusSpeciesCommonNames,
    error: errorSpeciesCommonNames,
    speciesCommonNames = [],
  } = useSpeciesCommonNames(speciesCodes);

  // Syncs speciesCodeURL with dropdown
  useEffect(() => {
    // Validate speciesCodeURL
    function isValidSpeciesCode(speciesCode) {
      if (
        speciesCommonNames.filter((species) => species[0] === speciesCode)
          .length
      )
        return true;
      return false;
    }

    if (!speciesCommonNames.length) return;

    if (speciesCodeURL && !isValidSpeciesCode(speciesCodeURL)) {
      navigate("..");
      // navigate(`/${layer}?lat=${lat}&lng=${lng}`);
    }
  }, [speciesCodeURL, navigate, speciesCommonNames]);

  // Syncs list of species in the selected region with loaded species codes and species common names
  useEffect(() => {
    if (
      statusSpeciesCodes === "pending" ||
      statusSpeciesCommonNames === "pending"
    ) {
      setIsLoadingSpecies(true);
    } else {
      setIsLoadingSpecies(false);
    }

    if (statusSpeciesCommonNames === "success") {
      setRegionSpeciesList(
        speciesCommonNames.map((obj) => ({ value: obj[0], label: obj[1] })),
      );
    }
  }, [speciesCommonNames, statusSpeciesCommonNames, statusSpeciesCodes]);

  // TODO: Clear selected species when region is cleared or changed
  function handleChange(e, { action }) {
    // Clear region and species list if region is cleared
    // TODO: handle differently for if just the selected species is cleared
    if (action === "clear") {
      navigate("..");
      return;
    }
    navigate(`${e.value}`);
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
        className="select"
        options={regionSpeciesList}
        onChange={handleChange}
        unstyled={true}
        backspaceRemovesValue={true}
        isClearable={true}
        isLoading={isLoadingSpecies}
        placeholder="Enter species..."
        value={
          speciesCodeURL
            ? {
                value: speciesCodeURL,
                label: speciesCommonNames
                  .filter((species) => species[0] === speciesCodeURL)
                  ?.at(0)
                  ?.at(1),
              }
            : null
        }
      />
    </div>
  );
}

export default SelectSpecies;
