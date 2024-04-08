import Select from "react-select";
import { useSpecies } from "../hooks/useSpecies";
import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

import {
  controlStyles,
  menuStyles,
  optionStyles,
  placeholderStyles,
  indicatorStyles,
} from "../utils/constants";

// TODO: group by species group
function SelectSpecies() {
  const navigate = useNavigate();
  const { layer, speciesCode: speciesCodeURL } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  const {
    status: statusSpecies,
    error: errorSpecies,
    species = [],
  } = useSpecies();

  // Syncs speciesCodeURL with dropdown
  // useEffect(() => {
  //   // Validate speciesCodeURL
  //   function isValidSpeciesCode(speciesCode) {
  //     if (
  //       speciesCommonNames.filter((species) => species[0] === speciesCode)
  //         .length
  //     )
  //       return true;
  //     return false;
  //   }

  //   if (!speciesCommonNames.length) return;

  //   if (speciesCodeURL && !isValidSpeciesCode(speciesCodeURL)) {
  //     navigate("..");
  //     // navigate(`/${layer}?lat=${lat}&lng=${lng}`);
  //   }
  // }, [speciesCodeURL, navigate, speciesCommonNames]);

  // TODO: Clear selected species when region is cleared or changed
  function handleChange(e, { action }) {
    // Clear region and species list if region is cleared
    // TODO: handle differently for if just the selected species is cleared
    if (action === "clear") {
      navigate("..");
      return;
    }
    navigate(`/${layer}/${e.value.speciesCode}`);
    setSearchParams({ lat: lat, lng: lng }, { replace: true });
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
        options={species.map((species) => ({
          value: species,
          label: species.comName,
        }))}
        onChange={handleChange}
        unstyled={true}
        backspaceRemovesValue={true}
        isClearable={true}
        isLoading={statusSpecies === "pending"}
        placeholder="Enter species..."
        // value={
        //   speciesCodeURL
        //     ? {
        //         value: speciesCodeURL,
        //         label: speciesCommonNames
        //           .filter((species) => species[0] === speciesCodeURL)
        //           ?.at(0)
        //           ?.at(1),
        //       }
        //     : null
        // }
      />
    </div>
  );
}

export default SelectSpecies;
