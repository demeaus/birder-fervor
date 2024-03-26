import SelectRegion from "./SelectRegion";
import SelectSpecies from "./SelectSpecies";
import { useEffect, useState } from "react";
import { getObservationsBySpecies } from "../services/apiEBird";
import { useParams } from "react-router-dom";
import { useObservations } from "../context/ObservationsContext";

function Controls() {
  console.log("rendering Controls");
  const [regionSpecies, setRegionSpecies] = useState([]);
  const [selectedSpecies, setSelectedSpecies] = useState(null);
  const [selectedRegionCode, setSelectedRegionCode] = useState("");
  const { regionCode: regionCodeURL } = useParams();
  const { observations, setObservations } = useObservations();

  // useEffect(() => {
  //   async function fetchObservations() {
  //     const obs = await getObservationsBySpecies(
  //       regionCodeURL,
  //       selectedSpecies
  //     );
  //     setObservations(obs);
  //   }

  //   if (!regionCodeURL || !selectedSpecies) {
  //     if (observations.length) {
  //       setObservations([]);
  //     }
  //     return;
  //   }

  //   if (selectedSpecies && regionCodeURL === selectedRegionCode) {
  //     console.log("fetching observations");
  //     fetchObservations();
  //   }
  // }, [
  //   selectedSpecies,
  //   selectedRegionCode,
  //   regionCodeURL,
  //   observations,
  //   setObservations,
  // ]);

  return (
    <div className="bg-zinc-100 px-4 py-4 ">
      {/* TODO: Search for species by address*/}
      <SelectRegion
        setRegionSpecies={setRegionSpecies}
        selectedRegionCode={selectedRegionCode}
        setSelectedRegionCode={setSelectedRegionCode}
      />
      {/* Display species in regioncode */}
      {regionCodeURL && regionSpecies.length && (
        <SelectSpecies
          regionSpecies={regionSpecies}
          setSelectedSpecies={setSelectedSpecies}
        />
      )}
    </div>
  );
}

export default Controls;
