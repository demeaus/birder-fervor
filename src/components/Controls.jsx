import SelectMode from "./SelectMode";
import SelectRegion from "./SelectRegion";
import SelectSpecies from "./SelectSpecies";
import { useEffect, useState } from "react";
import { getObservationsBySpecies } from "../services/apiEBird";
import { useParams } from "react-router-dom";

function Controls({ setObservations }) {
  const [species, setSpecies] = useState([]);
  // const [regionCode, setRegionCode] = useState(null);
  const [selectedSpecies, setSelectedSpecies] = useState(null);
  const { regionCode } = useParams();
  console.log(regionCode);

  useEffect(() => {
    async function fetchObservations() {
      if (!regionCode || !selectedSpecies) return;
      const obs = await getObservationsBySpecies(regionCode, selectedSpecies);
      setObservations(obs);
    }

    fetchObservations();
  }, [selectedSpecies, regionCode, setObservations]);

  return (
    <div className="bg-zinc-100 px-4 py-4 ">
      <div className="">
        {/* <SelectMode /> */}
        {/* TODO: Search for species by address*/}
        <SelectRegion setSpecies={setSpecies} />
        {/* Display species in regioncode */}
        {/* TODO: Clear selected species when species list changes (region code changes) */}

        {regionCode && species.length && (
          <SelectSpecies
            species={species}
            setSelectedSpecies={setSelectedSpecies}
          />
        )}
      </div>
    </div>
  );
}

export default Controls;
