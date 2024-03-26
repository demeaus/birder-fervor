import SelectRegion from "./SelectRegion";
import SelectSpecies from "./SelectSpecies";
import { useState } from "react";
import { useParams } from "react-router-dom";

function Controls() {
  console.log("rendering Controls");

  const [selectedRegionCode, setSelectedRegionCode] = useState("");
  const { regionCode: regionCodeURL } = useParams();

  return (
    <div className="bg-zinc-100 px-4 py-4 ">
      {/* TODO: Search for species by address*/}
      <SelectRegion
        selectedRegionCode={selectedRegionCode}
        setSelectedRegionCode={setSelectedRegionCode}
      />
      {/* Display species in regioncode */}
      {regionCodeURL && <SelectSpecies />}
    </div>
  );
}

export default Controls;
