import Select from "react-select";

const controlStyles =
  "rounded-full border-2 border-zinc-300 text-sm px-4 py-2 bg-zinc-50";
const menuStyles = "bg-zinc-100 text-sm px-2 py-1";
const optionStyles = "border-b py-1";
const placeholderStyles = "text-zinc-400";

// TODO: group by species group
function SelectSpecies({ species, setSelectedSpecies }) {
  function handleSelect(e) {
    setSelectedSpecies(e.value);
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
        options={species}
        onChange={handleSelect}
        unstyled={true}
      />
    </div>
  );
}

export default SelectSpecies;
