import SelectMode from "./SelectMode";
import SelectRegion from "./SelectRegion";
import SelectSpecies from "./SelectSpecies";
import { useEffect, useState } from "react";
import { getObservationsBySpecies } from "./services/apiEBird";

function Controls({ setObservations }) {
  const [species, setSpecies] = useState([]);
  const [regionCode, setRegionCode] = useState(null);
  const [selectedSpecies, setSelectedSpecies] = useState(null);

  useEffect(() => {
    async function fetchObservations() {
      if (!regionCode || !selectedSpecies) return;
      const obs = await getObservationsBySpecies(regionCode, selectedSpecies);
      setObservations(obs);
    }

    fetchObservations();
  }, [selectedSpecies, regionCode, setObservations]);

  return (
    <div className="px-2">
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

      {regionCode && species.length && (
        <SelectSpecies
          species={species}
          setSelectedSpecies={setSelectedSpecies}
        />
      )}
    </div>
  );
}

export default Controls;
