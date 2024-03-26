import SelectRegion from "./SelectRegion";
import SelectSpecies from "./SelectSpecies";
import { useEffect, useState } from "react";
import { getObservationsBySpecies } from "../services/apiEBird";
import { useParams } from "react-router-dom";
import { useObservations } from "../context/ObservationsContext";

function Controls() {
  const [species, setSpecies] = useState([]);
  const [selectedSpecies, setSelectedSpecies] = useState(null);
  const { regionCode } = useParams();
  const { setObservations } = useObservations();
  console.log(regionCode);

  // useEffect(() => {
  //   async function fetchObservations() {
  //     if (!regionCode || !selectedSpecies) {
  //       setObservations([]);
  //       return;
  //     }

  //     const obs = await getObservationsBySpecies(regionCode, selectedSpecies);
  //     setObservations(obs);
  //   }

  //   fetchObservations();
  // }, [selectedSpecies, regionCode, setObservations]);

  return (
    <div className="bg-zinc-100 px-4 py-4 ">
      {/* TODO: Search for species by address*/}
      <SelectRegion setSpecies={setSpecies} />
      {/* Display species in regioncode */}
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
