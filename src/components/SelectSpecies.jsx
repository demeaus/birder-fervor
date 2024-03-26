import Select from "react-select";
import { useSpeciesCodes } from "../hooks/useSpeciesCodes";
import { useSpeciesCommonNames } from "../hooks/useSpeciesCommonNames";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const controlStyles =
  "rounded-full border-2 border-zinc-300 text-sm px-4 py-2 bg-zinc-50";
const menuStyles = "bg-zinc-100 text-sm px-2 py-1";
const optionStyles = "border-b py-1";
const placeholderStyles = "text-zinc-400";

// TODO: group by species group
function SelectSpecies() {
  console.log("rendering SelectSpecies");
  const [regionSpeciesList, setRegionSpeciesList] = useState([]);
  const { regionCode: regionCodeURL } = useParams();
  const navigate = useNavigate();

  const {
    status: statusSpeciesCodes,
    error: errorSpeciesCodes,
    speciesCodes = [],
  } = useSpeciesCodes();
  const {
    status: statusSpeciesCommonNames,
    error: errorSpeciesCommonNames,
    speciesCommonNames = [],
  } = useSpeciesCommonNames(speciesCodes);

  // Syncs list of species in the selected region with loaded species codes and species common names
  useEffect(() => {
    if (statusSpeciesCommonNames === "success") {
      setRegionSpeciesList(
        speciesCommonNames.map((obj) => ({ value: obj[0], label: obj[1] }))
      );
    }
  }, [speciesCommonNames, statusSpeciesCommonNames]);

  if (!regionSpeciesList.length)
    return <div>TODO: Empty Message; no species for selected region</div>;

  // TODO: Clear selected species when region is cleared or changed
  function handleChange(e, { action }) {
    console.log("handleChange", e, action);

    // Clear region and species list if region is cleared
    // TODO: handle differently for if just the selected species is cleared
    if (action === "clear") {
      navigate("..");
      return;
    }
    navigate(`/${regionCodeURL}/${e.value}`);
  }

  return (
    <div className="max-w-96">
      <h1>Select species</h1>
      <Select
        classNames={{
          placeholder: () => placeholderStyles,
          control: () => controlStyles,
          menu: () => menuStyles,
          option: () => optionStyles,
        }}
        className="select"
        options={regionSpeciesList}
        onChange={handleChange}
        unstyled={true}
        backspaceRemovesValue={true}
        isClearable={true}
      />
    </div>
  );
}

export default SelectSpecies;
