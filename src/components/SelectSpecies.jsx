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

/**
 * User can select a species to view observations of that species near the location or in the region
 */
// TODO: group by species group
function SelectSpecies() {
  const navigate = useNavigate();
  const { layer, speciesCode } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedSpecies, setSelectedSpecies] = useState();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  const {
    status: statusSpecies,
    error: errorSpecies,
    species = [],
  } = useSpecies();

  // URL -> dropdown
  useEffect(() => {
    // Validate speciesCodeURL
    function isValidSpeciesCode(speciesCode) {
      const match = species
        .filter((specie) => specie.speciesCode === speciesCode)
        ?.at(0);
      if (match) return match;
      return false;
    }

    if (!species.length) return;

    const speciesMatch = isValidSpeciesCode(speciesCode);

    // If there is an invalid species code in the URL, remove it, otherwise sync the dropdown with the species code
    if (speciesCode && !speciesMatch) {
      navigate(`/${layer}`);
      setSearchParams(searchParams);
      // setSearchParams(searchParams, { replace: true });
    } else {
      setSelectedSpecies({
        value: speciesMatch,
        label: speciesMatch.comName,
      });
    }
  }, [speciesCode, navigate, layer, species, searchParams, setSearchParams]);

  // TODO: Clear selected species when region is cleared or changed
  function handleChange(e, { action }) {
    // Clear region and species list if region is cleared
    // TODO: handle differently for if just the selected species is cleared
    if (action === "clear") {
      navigate(`/${layer}`);
      setSearchParams(searchParams);
      // setSearchParams(searchParams, { replace: true });
      return;
    }

    console.log(searchParams);
    navigate(`/${layer}/${e.value.speciesCode}`);
    setSearchParams(searchParams);
    // setSearchParams(searchParams, { replace: true });
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
        // TODO: actually set selectedSpecies to something
        value={speciesCode ? selectedSpecies : null}
      />
    </div>
  );
}

export default SelectSpecies;
