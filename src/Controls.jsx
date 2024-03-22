import SelectMode from "./SelectMode";
import SelectRegion from "./SelectRegion";
import SelectSpecies from "./SelectSpecies";
import { useState } from "react";

function Controls() {
  const [species, setSpecies] = useState([]);
  const [regionCode, setRegionCode] = useState(null);

  return (
    <div className="">
      {/* <SelectMode /> */}
      <h1>TODO: Search for species by address</h1>
      <h1>Search for species by region</h1>
      <SelectRegion
        regionCode={regionCode}
        setRegionCode={setRegionCode}
        setSpecies={setSpecies}
      />
      {/* Display species in regioncode */}
      {/* TODO: Clear selected species when species list changes (region code changes) */}
      {/* TODO: group by species group */}
      {regionCode && species.length && <SelectSpecies species={species} />}
      {/* <Map /> */}
    </div>
  );
}

export default Controls;
