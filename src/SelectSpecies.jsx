import Select from "react-select";

// TODO: group by species group
function SelectSpecies({ species, setSelectedSpecies }) {
  function handleSelect(e) {
    setSelectedSpecies(e.value);
  }
  return <Select options={species} onChange={handleSelect} />;
}

export default SelectSpecies;
