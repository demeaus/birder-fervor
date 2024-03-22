import Select from "react-select";
const modes = [
  { value: "species", label: "All regional species" },
  { value: "notable", label: "Notable species" },
];

function SelectMode() {
  return <Select options={modes} />;
}

export default SelectMode;
